// Run from any directory: node scripts/validate.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
vm.createContext(context);
for (const file of ['catalog', 'navigation', 'legacy', 'pages']) {
  vm.runInContext(fs.readFileSync(path.join(root, `data/${file}.js`), 'utf8'), context);
}
const { AR_CATALOG: catalog, AR_VIEWS: views, AR_NAVIGATION: nav, AR_LEGACY: legacy } = context.window;
const corrections = JSON.parse(fs.readFileSync(path.join(root, 'docs/phase-3-corrections.json')));
const correctionById = new Map(corrections.changes.map(change => [change.resourceId, change]));
const migration = JSON.parse(fs.readFileSync(path.join(root, 'docs/migration-map.json')));
const resources = new Map(catalog.map(resource => [resource.id, resource]));
const retired = new Map((migration.retired || []).map(record => [record.resourceId, record]));
assert.equal(retired.size, (migration.retired || []).length, 'Duplicate retired IDs');
for (const [id, record] of retired) {
  assert(!resources.has(id), `Retired entity still active: ${id}`);
  assert.equal(record.entity.id, id, 'Retired snapshot ID mismatch');
  for (const link of record.entity.links) assert(!catalog.some(resource => resource.url === link.url || resource.links.some(active => active.url === link.url)), `Retired URL still active: ${link.url}`);
  assert(typeof record.reason === 'string' && record.reason.trim(), `Missing retirement reason: ${id}`);
  assert(Array.isArray(record.placements) && record.placements.length, `Missing historical placements: ${id}`);
  assert.equal(new Set(record.entity.sources).size, record.entity.sources.length, 'Duplicate retired source');
  assert.deepEqual([...record.entity.sources].sort(), migration.rows.filter(row => row.status === 'retired' && row.retiredResourceId === id).map(row => row.sourceKey).sort(), `Lost retired sources: ${id}`);
  for (const placement of record.placements) {
    // A removed view remains valid in historical retirement/source snapshots.
    assert(views[placement.view] || migration.rows.some(row => row.status === 'retired' && row.retiredResourceId === id && row.destinations.some(target => target.view === placement.view)), `Unknown retired view: ${id}`);
    assert(typeof placement.sectionId === 'string' && typeof placement.section === 'string', `Invalid retired placement: ${id}`);
  }
}
assert.equal(resources.size, catalog.length, 'Duplicate entity IDs');
assert.equal(catalog.length, migration.resourceCount);
assert.deepEqual(Array.from(nav, area => area.label), ['创作与工作', '学习与研究', '日常与生活', '设备与环境']);
const regrouping = JSON.parse(fs.readFileSync(path.join(root, 'docs/art-regrouping.json')));
assert.equal(catalog.length, 464);
assert.equal(Object.keys(views).length, 19);
assert.equal(Object.keys(legacy).length, 14);
const artIds = views.art.sections.flatMap(section => section.resourceIds);
assert.equal(artIds.length, 162);
assert.equal(regrouping.resourceCount, artIds.length);
assert.deepEqual([...artIds].sort(), regrouping.rows.map(row => row.resourceId).sort());
assert.equal(new Set(artIds).size, 162);
assert.deepEqual(Array.from(views.art.domains, domain => domain.title), ['概念设计', '视觉设计', '设计参考']);
const grouped = views.art.domains.flatMap(domain => domain.groups.flatMap(group => group.sectionIds));
assert.equal(new Set(grouped).size, grouped.length);
assert.deepEqual(Array.from(grouped).sort(), Array.from(views.art.sections, section => section.id).sort());
for (const row of regrouping.rows) {
  assert(views.art.sections.some(section => section.id === row.sectionId && section.resourceIds.includes(row.resourceId)));
  assert(views.art.sectionAliases[row.previousSectionId]);
}
for (const id of Object.values(views.art.sectionAliases)) assert(grouped.includes(id));
assert.equal(views.research.title, '学习资源');
const shown = new Set();
for (const [key, view] of Object.entries(views)) {
  assert(view.sections.length, `${key}: empty view`);
  assert(nav.some(area => area.id === view.area));
  assert(nav.flatMap(area => area.items).some(item => item.href === `library.html?view=${key}`));
  const seen = new Set();
  for (const section of view.sections) {
    assert(section.resourceIds.length, `${key}: empty section`);
    assert(!section.title.includes('配乐参考'));
    for (const id of section.resourceIds) {
      assert(resources.has(id), `${key}: dangling ID ${id}`);
      assert(!seen.has(id), `${key}: duplicate card ${id}`);
      seen.add(id); shown.add(id);
    }
  }
}
assert.equal(shown.size, catalog.length, 'Unreachable entities');
// Match changed secondary links by label after removing exact unchanged pairs.
// Repeated labels are allowed only when the remaining correspondence is unique.
function approvedSecondaryLinkCorrection(change, resource, oldUrl) {
  if (!change || change.resourceId !== resource.id || oldUrl === resource.url || oldUrl === change.before.url) return false;
  const before = change.before.links;
  const after = change.after.links;
  if (!Array.isArray(before) || !Array.isArray(after) || before.length !== after.length) return false;
  if (JSON.stringify(after) !== JSON.stringify(resource.links)) return false;
  if (![...before, ...after].every(link => link && typeof link.label === 'string' && link.label.trim() && typeof link.url === 'string' && link.url)) return false;
  if (before.filter(link => link.url === oldUrl).length !== 1) return false;
  if (!before.some(link => link.url === resource.url)) return false;
  const remainingAfter = [...after];
  const remainingBefore = before.filter(link => {
    const index = remainingAfter.findIndex(candidate => JSON.stringify(candidate) === JSON.stringify(link));
    if (index < 0) return true;
    remainingAfter.splice(index, 1);
    return false;
  });
  let approved = false;
  for (const link of remainingBefore) {
    const matches = remainingAfter.filter(candidate => candidate.label === link.label);
    if (remainingBefore.filter(candidate => candidate.label === link.label).length !== 1 || matches.length !== 1) return false;
    const replacement = matches[0];
    const metadata = value => Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'url').sort(([a], [b]) => a.localeCompare(b)));
    if (JSON.stringify(metadata(link)) !== JSON.stringify(metadata(replacement)) || replacement.url === link.url) return false;
    if (!resource.links.some(candidate => candidate.url === replacement.url)) return false;
    if (link.url === oldUrl) approved = true;
  }
  return approved;
}
// Historical migration URLs remain in the audit, but confirmed bad URLs must not be live links.
assert.equal(correctionById.size, corrections.changes.length);
for (const change of corrections.changes) {
  const resource = resources.get(change.resourceId);
  assert(resource, `Lost corrected entity ${change.resourceId}`);
  for (const [key, value] of Object.entries(change.after)) {
    assert.equal(JSON.stringify(resource[key]), JSON.stringify(value), `Correction regressed: ${change.resourceId}.${key}`);
  }
  if ('url' in change.after && change.before.url !== change.after.url) {
    assert(!catalog.some(item => item.url === change.before.url || item.links.some(link => link.url === change.before.url)), `Retired URL still active: ${change.before.url}`);
    assert(migration.rows.some(row => row.resourceId === change.resourceId && row.original.url === change.before.url), `Missing original URL audit: ${change.resourceId}`);
  }
}
const deepseek = catalog.find(resource => resource.url === 'https://chat.deepseek.com/');
const hunyuan = catalog.find(resource => resource.url === 'https://3d.hunyuan.tencent.com/');
assert.equal(deepseek.name, 'Deepseek');
assert.equal(hunyuan.name, '腾讯混元3D');
assert.notEqual(deepseek.id, hunyuan.id);
assert(views.ai.sections.find(section => section.title === '助手与问答').resourceIds.includes(deepseek.id));
assert(views.ai.sections.find(section => section.title === '音频、视频与3D生成').resourceIds.includes(hunyuan.id));
const urls = new Map();
for (const resource of catalog) {
  for (const field of ['id', 'name', 'description', 'url', 'icon', 'topics', 'contexts', 'type', 'tags', 'sources', 'links']) {
    assert(field in resource, `${resource.id}: missing ${field}`);
  }
  if (resource.relatedResources !== undefined) {
    assert(Array.isArray(resource.relatedResources), `${resource.id}: relatedResources must be an ID array`);
    assert.equal(new Set(resource.relatedResources).size, resource.relatedResources.length, 'Duplicate relation');
    for (const id of resource.relatedResources) {
      assert(typeof id === 'string' && resources.has(id), `${resource.id}: unknown related ID ${id}`);
      assert.notEqual(id, resource.id, 'Self relation');
    }
  }
  if (resource.iconImage) assert(fs.existsSync(path.join(root, resource.iconImage)), `Missing icon ${resource.iconImage}`);
  for (const link of resource.links) {
    assert(/^https?:\/\//.test(link.url), `Unexpected URL ${link.url}`);
    assert(!urls.has(link.url) || urls.get(link.url) === resource.id, `Duplicate URL ${link.url}`);
    urls.set(link.url, resource.id);
  }
  assert(resource.url === null || (typeof resource.url === 'string' && /^https?:\/\//.test(resource.url)), `Invalid primary URL: ${resource.id}`);
  if (resource.url) assert(resource.links.some(link => link.url === resource.url));
  else assert.equal(resource.links.length, 0, `URL-less record must not expose alternate links: ${resource.id}`);
}
assert.equal(new Set(migration.rows.map(row => row.sourceKey)).size, 498);
for (const [project, count] of Object.entries(migration.sourceCounts)) {
  assert.equal(migration.rows.filter(row => row.project === project).length, count);
}
for (const row of migration.rows) {
  if (row.status === 'retired') {
    assert.equal(row.resourceId, null, `Retired source has active resourceId: ${row.sourceKey}`);
    const record = retired.get(row.retiredResourceId);
    assert(record, `Unknown retired source: ${row.sourceKey}`);
    assert(record.entity.sources.includes(row.sourceKey), `Retired source mismatch: ${row.sourceKey}`);
    if (row.original.url) assert(record.entity.links.some(link => link.url === row.original.url), `Lost retired URL: ${row.sourceKey}`);
    for (const target of row.destinations) {
      assert(record.placements.some(placement => placement.view === target.view && (placement.section === target.section || (placement.previousTitles || []).includes(target.section))), `Lost historical placement: ${row.sourceKey}`);
    }
  } else {
    assert(row.status === undefined && row.retiredResourceId === undefined, `Invalid active source state: ${row.sourceKey}`);
    const resource = resources.get(row.resourceId);
    assert(resource, `Lost source ${row.sourceKey}`);
    assert(resource.sources.includes(row.sourceKey));
    if (row.original.url && !resource.links.some(link => link.url === row.original.url)) {
      const change = correctionById.get(resource.id);
      const deduplication = migration.deduplicated.find(item => item.sourceKey === row.sourceKey && item.resourceId === resource.id && item.url === row.original.url && item.discardOriginalURL === true && item.retainedURL === resource.url);
      assert((change && 'url' in change.after && change.before.url === row.original.url && resource.url === change.after.url) || approvedSecondaryLinkCorrection(change, resource, row.original.url) || deduplication, `Unapproved lost URL ${row.sourceKey}`);
    }
    for (const target of row.destinations) {
      assert(views[target.view].sections.some(section => (section.title === target.section || (section.previousTitles || []).includes(target.section)) && section.resourceIds.includes(resource.id)), `Lost placement ${row.sourceKey}`);
    }
  }
}
for (const [page, ids] of Object.entries(legacy)) {
  const source = { window: {} }; vm.createContext(source);
  vm.runInContext(fs.readFileSync(path.join(root, `data/resources/${page}.js`), 'utf8'), source);
  const originals = source.window.AR_RESOURCE_SECTIONS.flatMap(group => group.resources);
  const mapped = migration.rows.filter(row => row.project === 'Ar012-Library' && row.page === page);
  assert.equal(originals.length, mapped.length);
  originals.forEach((original, index) => assert.equal(JSON.stringify(original), JSON.stringify(mapped[index].original), `${page}: changed source`));
  assert.deepEqual([...new Set(mapped.filter(row => row.status !== 'retired').map(row => row.resourceId))].sort(), Array.from(ids).sort());
  const html = fs.readFileSync(path.join(root, `${page}.html`), 'utf8');
  assert(html.includes('data/catalog.js'));
  assert(!html.includes(`src="data/resources/`));
}
// Static local file checks across every top-level HTML, preserving external/data/fragment links.
let internalLinks = 0;
for (const filename of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, filename), 'utf8');
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:|#)/.test(value)) continue;
    const local = value.split(/[?#]/)[0];
    if (!local) continue;
    assert(fs.existsSync(path.resolve(root, local)), `${filename}: missing file ${value}`);
    internalLinks++;
  }
}
console.log(JSON.stringify({ result: 'PASS', sources: 498, entities: catalog.length, mergedSources: migration.deduplicated.length, views: Object.keys(views).length, legacyPages: Object.keys(legacy).length, activeURLs: urls.size, confirmedCorrections: corrections.changes.length, urlLessRecords: catalog.filter(resource => !resource.url).length, internalLinks }, null, 2));
