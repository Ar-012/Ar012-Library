# Costumers Guide 重复实体合并报告

日期：2026-10-06（Asia/Shanghai）。本轮仅处理最终审计 P2-01。网站身份和 About 页面用途依据用户明确确认，全程未联网；未处理其他 P2，未 commit，未 push。

## 1. 合并前两个实体

| 角色 | ID | 名称 | 主 URL | sourceKey |
| --- | --- | --- | --- | --- |
| 保留 | `res-fde13a4c0113` | costumers guide | `http://www.costumersguide.com/` | `concept-art:3:3` |
| 退休 | `res-cdd92d2a8693` | Costumers Guide | `http://www.costumersguide.com/about.shtml` | `costume-fashion-design:3:2` |

用户确认两个记录属于同一个网站，`about.shtml` 仅为 About 子页面，不再作为独立 catalog 实体。

## 2. 合并后的保留实体

- ID：`res-fde13a4c0113`。
- 名称：`The Costumer's Guide to Movie Costumes`。
- 主 URL：`http://www.costumersguide.com/`，原样保留。
- description：`电影服装设计参考`，原样保留。
- type：`website`，原样保留。
- sources：`concept-art:3:3`、`costume-fashion-design:3:2`。
- links：只保留原主入口；其 label 同步为新的实体名称。

当前该名称仅对应一个 catalog 实体。退休 ID 已退出当前 catalog。

## 3. catalog 修改

保留实体仅修改 `name`、主入口 `links[0].label` 和 `sources`，其余字段全部不变。删除退休实体的当前 catalog 对象。

没有合并或改写退休实体的 description、icon、tags 等字段；这些原始来源事实仍保存在 migration/original 和原始资源快照中。除这两个实体外，其余 486 个实体完整对象不变，包括上一轮已修正的三个 P1。

## 4. navigation 修改

两条记录原本都位于：

`art` → `art-reference-fashion-style` → `风格与题材`。

保留实体原引用位置不变；仅删除退休 ID 的重复引用。该 section 引用数由 13 变为 12，art 引用数及唯一 ID 数由 168 变为 167。

没有新增 placement，没有同 view 重复卡片；其他资源的相对顺序、section 名称、section 顺序、domains、分组、previousTitles 和顶层导航均不变。

## 5. source / migration 处理

- 两个 sourceKey 均保留，catalog sources 总数仍为 498，唯一 sourceKey 仍为 498。
- migration 的 `concept-art:3:3` 行保持不变。
- migration 的 `costume-fashion-design:3:2` 行仅将当前 `resourceId` 从退休 ID 改为保留 ID。
- 两行的 `original`、`destinations`、来源位置及其他字段均保持不变。原 About URL 仍在 `original.url` 中。
- `migration.resourceCount` 由 488 改为 487。
- 向既有 `deduplicated` 数组追加一条合并记录；原 10 条记录完全不变。

新记录沿用 Google Maps 合并的现有字段结构，没有新增 schema 字段：

```json
{
  "name": "Costumers Guide",
  "sourceKey": "costume-fashion-design:3:2",
  "resourceId": "res-fde13a4c0113",
  "retiredResourceId": "res-cdd92d2a8693",
  "retainedName": "The Costumer's Guide to Movie Costumes",
  "url": "http://www.costumersguide.com/about.shtml",
  "retainedURL": "http://www.costumersguide.com/",
  "discardOriginalURL": true,
  "reason": "duplicate entity / same Costumers Guide website；用户确认 about.shtml 仅为 About 子页面；合并 concept-art:3:3 与 costume-fashion-design:3:2 两个历史 source；保留原 HTTP 主入口，不保留 About 页面为 active link"
}
```

两个旧 migration section 标题仍通过现有 `previousTitles` 解析至同一当前 section。未改迁移目标或 previousTitles。

## 6. legacy 与 corrections

`data/legacy.js` 中 `costume-fashion-design` 的退休 ID 在原位置替换为保留 ID，该页没有产生重复或悬空 ID；concept-art 及其他 legacy 页面映射不变。legacyPages 仍为 14。

现有 corrections 不包含这两个实体，没有同步需求或冲突；`docs/phase-3-corrections.json` 未修改。

## 7. relatedResources 检查

两个实体均未声明 relatedResources，也没有任何实体通过 relatedResources 引用它们。

因此没有修改任何 relatedResources。仍为 11 个源实体、22 条边、22 个唯一目标；Blender 等其他关联完全不变。

## 8. URL / links 处理

主 URL 保持原 HTTP 地址，没有升级 HTTPS 或修改域名。

主入口 label 随唯一授权的名称修改同步。没有把 `about.shtml` 加为 secondary link；当前 active links 不再包含该 About URL，但 migration/original 及 deduplicated 仍保留它。

其他实体的 URL 和 links 完全不变，包括字由次入口、11 个无 URL 实体及所有未确认入口。

## 9. 数量变化

| 指标 | 合并前 | 合并后 |
| --- | --- | --- |
| catalog 实体 | 488 | 487 |
| sources / 唯一 sourceKey | 498 / 498 | 498 / 498 |
| mergedSources | 10 | 11 |
| views | 20 | 20 |
| legacyPages | 14 | 14 |
| activeURLs | 481 | 480 |
| art 引用数 / 唯一 ID | 168 / 168 | 167 / 167 |
| 风格与题材引用数 | 13 | 12 |
| urlLessRecords | 11 | 11 |
| relatedResources 边数 | 22 | 22 |

## 10. validator 与必要例外同步

初始要求禁止修改 validator，但现有 validator 硬编码要求 catalog=488、art 引用数=168、art 唯一 ID=168，与本次合并后的数量冲突。

在说明冲突并提出最小同步方案后，用户回复“允许合并”。按该补充授权，仅同步：

- `assert.equal(catalog.length, 488)` → `487`。
- `assert.equal(artIds.length, 168)` → `167`。
- `assert.equal(new Set(artIds).size, 168)` → `167`。
- validator 读取的 `docs/art-regrouping.json`：删除退休实体的当前归组行，`resourceCount` 由 168 改为 167；其他行及字段不变。

归组清单不是原始 source 存档。退休实体原始来源仍完整保留在 migration/original 和原始资源快照中。没有更改其他校验逻辑或新增校验豁免。

执行 `node scripts/validate.mjs`，退出码 0：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 487,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 480,
  "confirmedCorrections": 9,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

## 11. git diff --check

执行 `git diff --check`，退出码 0，无输出，通过。报告新增后再次运行 validator 和此检查，均通过。

另对本轮修改及新增文件检查行尾空白，结果通过，覆盖既有未跟踪文件。

## 12. 实际修改文件

修改：

- `data/catalog.js`：唯一名称、主入口 label、sources，以及退休实体移除。
- `data/navigation.js`：删除同 section 的退休 ID 引用。
- `data/legacy.js`：替换 costume-fashion-design 的退休 ID。
- `docs/migration-map.json`：一行当前 resourceId、resourceCount，以及追加一条既有格式的 merge 记录。
- `docs/art-regrouping.json`：按补充授权移除退休实体归组行并更新计数。
- `scripts/validate.mjs`：按补充授权仅更新三个数量断言。

新增：`docs/costumers-guide-merge-report.md`。

删除文件：无。

旧 `docs/final-data-quality-audit.md`、上一轮 P1 修正报告及其他现有文件保持不变。工作区既有未提交修改不计为本轮修改。

## 13. 不变性验证

修改前在仓库外保存完整数据快照及现有项目文件 SHA-256 清单。修改后执行精确预期对象比较和文件校验。

| 检查 | 结果 |
| --- | --- |
| entities / sources / mergedSources / views | 487 / 498 / 11 / 20，符合预期 |
| 退休 ID | 当前 catalog、navigation、legacy 均不引用；仅在新增历史 merge 的 retiredResourceId 中保留 |
| 两个历史 source | 均映射至 `res-fde13a4c0113`，无 sourceKey 丢失 |
| 原 About URL | 历史 original / merge 中保留；active links 中不存在 |
| 新名称 | 仅对应一个 catalog 实体 |
| 保留实体其他字段 | 除 name、主 label、sources 外完全不变 |
| 其他 486 个 catalog 实体 | 完整对象比较，完全不变 |
| navigation | 仅删除指定退休 ID；其他资源、顺序及结构完全不变 |
| migration | 其他 497 行完全不变；全部 original 和 destinations 不变；原 10 条 merge 不变 |
| legacy | 仅指定一处 ID 替换，其余完全不变 |
| relatedResources | 全部完全不变，无自引用、重复目标或悬空关系 |
| art-regrouping | 仅删除指定退休行及更新计数，其他行完全不变 |
| validator | 仅三个数量断言变化，其余原字节不变 |
| 其他项目文件 | SHA-256 不变，无意外新增或删除 |

本轮只完成 Costumers Guide 重复合并及其必需同步，没有处理其他 P2 或调整信息架构。未联网，未 commit，未 push。
