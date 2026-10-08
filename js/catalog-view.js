/* Resolve navigation references into the existing card renderer. No fetch/build required. */
(function () {
    const views = window.AR_VIEWS;
    const entities = new Map((window.AR_CATALOG || []).map(resource => [resource.id, resource]));
    const params = new URLSearchParams(window.location.search);
    const pageKey = document.body.dataset.page;
    const legacyIds = window.AR_LEGACY && window.AR_LEGACY[pageKey];
    const selectedKey = params.get('view') || 'art';
    const selected = views && views[selectedKey];
    const groups = window.AR_NAVIGATION || [];
    const areaTitle = area => (groups.find(group => group.id === area) || {}).label || area;
    function sectionPath(view, section) {
        for (const domain of view.domains || []) {
            const group = domain.groups.find(group => group.sectionIds.includes(section.id));
            if (group) return [domain.title, group.title, section.title].filter(Boolean).join(' / ');
        }
        return section.title;
    }
    const sections = [];
    const notice = document.getElementById('catalog-notice');
    if (!views || !entities.size) return; // Existing renderer reports missing data.

    if (legacyIds) {
        const allowed = new Set(legacyIds);
        const seen = new Set();
        Object.entries(views).forEach(([key, view]) => {
            view.sections.forEach(section => {
                const ids = section.resourceIds.filter(id => allowed.has(id) && !seen.has(id));
                if (!ids.length) return;
                ids.forEach(id => seen.add(id));
                sections.push({
                    ...section,
                    title: `${areaTitle(view.area)} / ${view.title} / ${sectionPath(view, section)}`,
                    href: `library.html?view=${key}#${section.id}`,
                    resources: ids.map(id => entities.get(id))
                });
            });
        });
        if (notice) notice.textContent = '这是旧书签的兼容入口，资源已按新用途分组。点击分类标题可前往新目录。';
    } else if (selected) {
        window.AR_ACTIVE_VIEW = selectedKey;
        if (selected.domains) {
            window.AR_RESOURCE_DOMAINS = selected.domains;
            window.AR_SECTION_ALIASES = selected.sectionAliases || {};
        }
        window.AR_PAGES = window.AR_PAGES || {};
        window.AR_PAGES[pageKey] = {
            title: selected.title,
            subtitle: `${areaTitle(selected.area)} · 个人资源与配置库`,
            breadcrumb: `${areaTitle(selected.area)} / ${selected.title}`,
            footer: 'AR 个人资源与配置库'
        };
        selected.sections.forEach(section => sections.push({
            ...section, resources: section.resourceIds.map(id => entities.get(id))
        }));
        if (notice) notice.textContent = `${new Set(selected.sections.flatMap(section => section.resourceIds)).size} 项资源`;
    } else {
        window.AR_PAGES = window.AR_PAGES || {};
        window.AR_PAGES[pageKey] = { title: '未找到分类', subtitle: '请从左侧导航选择已有分类。' };
        if (notice) notice.textContent = '该分类不存在或尚未建立。';
    }
    // Fail visibly instead of silently dropping dangling IDs.
    if (sections.some(section => section.resources.some(resource => !resource))) {
        console.error('Catalog contains an unresolved resource ID.');
        return;
    }
    window.AR_RESOURCE_SECTIONS = sections;
    const index = document.getElementById('section-index');
    if (index && window.AR_RESOURCE_DOMAINS) {
        index.classList.add('domain-index');
        index.setAttribute('aria-label', '美术与设计内部领域');
    }
    if (index) (window.AR_RESOURCE_DOMAINS || sections).forEach(section => {
        const link = document.createElement('a');
        link.href = `#${section.id}`;
        link.textContent = section.title;
        index.appendChild(link);
    });
})();
