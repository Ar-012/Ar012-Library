# 「学习与研究 → 历史」重组实施报告

实施日期：2026-10-04  
依据：`docs/history-resource-audit.md` 及本轮用户确认的最终结构。  
实施范围：只修改 `history` view 的 section 结构，并为“全历史”增加一个单向 `relatedResources`。  
限制：未联网，未新增或删除资源，未修改其他 view，未提交，未推送。

## 1. 修改前结构

修改前 `history` view 共 5 个 section、32 次引用、32 个唯一 catalog ID：

| 顺序 | section | 数量 |
|---:|---|---:|
| 1 | 历史地图 | 8 |
| 2 | 维基百科类别 | 5 |
| 3 | 欧洲历史 | 9 |
| 4 | 其他地区历史 | 5 |
| 5 | 历史学习网站 | 5 |
| **合计** | — | **32** |

修改前状态：

- Library of Congress 位于“历史地图”。
- 4 个 Wikipedia category 和 Human History 位于“维基百科类别”。
- 14 个具体 Wikipedia 历史主题分散在“欧洲历史”和“其他地区历史”。
- 全历史与其他 4 个学习入口位于“历史学习网站”。
- 全历史没有 `relatedResources`。

## 2. 修改后四组结构

修改后 `history` view 保持原 key、area 和 title 不变，只调整内部 section：

| 顺序 | section | section ID | 数量 | 迁移兼容 previousTitles |
|---:|---|---|---:|---|
| 1 | 地图与历史可视化 | `section-69324106cd` | 7 | 历史地图 |
| 2 | 历史主题与百科 | `section-a2c1857991` | 19 | 维基百科类别、欧洲历史、其他地区历史 |
| 3 | 学习与内容 | `section-746159982e` | 5 | 历史学习网站 |
| 4 | 资料与馆藏 | `section-7946c9a0ab` | 1 | 历史地图 |
| **合计** | — | — | **32** | — |

`previousTitles` 只用于让现有 migration 校验继续确认每个旧来源分组仍有目标落点，不改变 UI 显示名称，也不修改任何资源 tag。

## 3. 四组完整资源清单与 ID

### 3.1 地图与历史可视化（7）

1. 历史地图（全历史）— `res-8a5ad8ede2e1`
2. 国学导航－中国历史地图集 — `res-59d18d3be24a`
3. 地图窝 中国历史地图 — `res-df82b0297031`
4. 世界历史地图 — `res-362623d636fc`
5. 中国古代史地图 — `res-29b208b30ff4`
6. Old Maps Online — `res-9936eee67cba`
7. 知乎文章：历史爱好者福利 — `res-33669263358e`

说明：知乎文章继续与地图资源同组；世界历史地图继续保持 `url: null`、`links: []`，没有恢复旧 URL。

### 3.2 历史主题与百科（19）

1. Category: History — `res-a69a9e6403ca`
2. Category: Regions — `res-e50118dbd004`
3. Category: History by Ethnic Group — `res-a9448363a385`
4. Category: History by Location — `res-83e60682465b`
5. Human History — `res-26db60028f7d`
6. History of England — `res-490b867ae53f`
7. Vikings — `res-fce4787393ff`
8. History of France — `res-42e8acd0b6b6`
9. History of Germany — `res-04ccde1c97ee`
10. Ancient Greece — `res-fef2c5cffb67`
11. Ancient Rome — `res-c36f7ac645fa`
12. Byzantine Empire — `res-ad625dc4781b`
13. History of Italy — `res-ec3ef8eaed78`
14. Crusades — `res-7ef042574726`
15. Ancient Egypt — `res-a6f1dae2decd`
16. History of the Middle East — `res-445c76b4243c`
17. History of the United States — `res-4a613a2c251e`
18. History of China — `res-9526c09484d9`
19. History of Japan — `res-f99220ed7088`

说明：不再通过 section 区分“维基百科类别 / 欧洲历史 / 其他地区历史”。Category: Regions 按要求保留在本组。

### 3.3 学习与内容（5）

1. 全历史 — `res-664260a4c584`
2. Khan Academy World History — `res-e2d4099d5637`
3. History Channel — `res-c03a94b59c8a`
4. Encyclopedia Britannica — `res-d49532172dad`
5. National Geographic History — `res-1f258605e5e0`

说明：五项全部保留，Britannica 没有因其根入口性质被移动。

### 3.4 资料与馆藏（1）

1. Library of Congress — `res-dc7d34fff586`

说明：允许单项 section；没有并回其他组。

## 4. 32 项集合完整性验证

使用修改前本地快照与修改后运行时数据逐 ID 比较，结果如下：

| 验证项 | 结果 |
|---|---|
| 修改后引用数 | 32，PASS |
| 修改后唯一 ID 数 | 32，PASS |
| 四组数量 | 7 / 19 / 5 / 1，PASS |
| 修改前后 ID 集合 | 完全一致，PASS |
| 新增资源 | 0 |
| 删除资源 | 0 |
| 重复资源 | 0 |
| 世界历史地图 | `url: null`、`links: []`，PASS |
| Library of Congress | 只在“资料与馆藏”，PASS |
| Category: Regions | 位于“历史主题与百科”，PASS |
| catalog 实体总数 | 489，PASS |
| view 总数 | 20，PASS |
| legacy 入口数 | 14，PASS |

原 32 个 ID 集合没有增加、减少或替换。

## 5. 全历史 relatedResources 修改

唯一 catalog 实体修改：

```js
{
  "id": "res-664260a4c584",
  "relatedResources": [
    "res-8a5ad8ede2e1"
  ],
  "name": "全历史"
}
```

验证结果：

- 全历史 `res-664260a4c584` 的 `relatedResources` 严格等于 `["res-8a5ad8ede2e1"]`。
- 历史地图（全历史）`res-8a5ad8ede2e1` 没有反向 `relatedResources`。
- 没有修改任何其他实体的 `relatedResources`。
- 其他 488 个 catalog 实体逐字段不变。
- 全历史除新增该字段外，其他字段逐字段不变。

## 6. 未处理的数据质量问题

以下问题按要求保持原样：

1. 世界历史地图继续为 `url: null`、`links: []`，没有恢复旧 URL。
2. 国学导航－中国历史地图集、地图窝 中国历史地图、中国古代史地图继续使用原 HTTP URL。
3. Library of Congress 继续使用 `https://www.loc.gov/` 根入口。
4. Encyclopedia Britannica 继续使用 `https://www.britannica.com/` 根入口。
5. Category: Regions 继续保留在 history。
6. Wikipedia 英文名称没有修改。
7. 所有 description 保持原样。
8. 所有 type 保持原样。
9. 所有 tags、topics、contexts、sources、links 及其他资源字段保持原样。

## 7. 其他 view 未变化验证

修改前已在仓库外的临时文件保存完整 `AR_CATALOG`、`AR_VIEWS`、`AR_NAVIGATION` 和 `AR_LEGACY` 快照。修改后进行了深度比较：

- `AR_VIEWS` 中只有 `history` 发生变化。
- 其余 19 个 view 逐字段不变。
- 「学习与研究」其他 5 个 view 逐字段不变：
  - `art-study`
  - `game-study`
  - `music-study`
  - `code-study`
  - `research`
- 「创作与工作」「日常与生活」「设备与环境」全部 view 逐字段不变。
- `AR_NAVIGATION` 顶层区域及导航 item 完全不变。
- `AR_LEGACY` 完全不变，14 个 legacy 入口仍完整。
- catalog 中只有 `res-664260a4c584` 发生变化，且变化内容仅为新增确认的单向 `relatedResources`。

## 8. 浏览器验证

### 可用性检查

- `npx`：可用。
- 全局 `playwright-cli`：未安装。
- `@playwright/cli` 离线缓存：不存在。
- 仓库中没有可直接执行的 Playwright 测试脚本或本地 Playwright 依赖。

使用 `npx --offline --package @playwright/cli playwright-cli --help` 检查时返回 `ENOTCACHED`。由于本轮明确要求不要联网，没有下载或安装 Playwright 依赖。

### 本轮结果

以下 1440px / 390px 浏览器项目本轮**未执行**，不能声称通过：

- 四组顶部快速导航视觉与点击检查；
- 32 张卡片实际渲染计数；
- 横向溢出；
- JavaScript `pageerror`；
- 全历史关联按钮展开交互。

现有 UI 使用通用 section 渲染机制，本轮没有修改 HTML、CSS、JS 或新增组件；静态数据和现有校验均通过，但这不替代浏览器验证。仓库中的旧截图和旧验证 JSON 没有被当成本轮结果，也没有改写。

## 9. validate 与静态验证结果

### `node scripts/validate.mjs`

结果：PASS

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 489,
  "mergedSources": 9,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 482,
  "confirmedCorrections": 9,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

为保持 migration 校验通过：

- “地图与历史可视化”记录 `previousTitles: ["历史地图"]`。
- “历史主题与百科”记录原三个 section 标题。
- “学习与内容”记录 `previousTitles: ["历史学习网站"]`。
- “资料与馆藏”也记录 `previousTitles: ["历史地图"]`，因为 Library of Congress 的原始迁移来源属于旧“历史地图”分组。

### `git diff --check`

结果：PASS，无空白错误。

### 自定义不变性验证

结果：PASS

- history 数量：7 / 19 / 5 / 1。
- history 引用数：32。
- history 唯一 ID：32。
- 修改的 catalog 实体：仅 `res-664260a4c584`。
- 未修改的 catalog 实体：488。
- 修改的 view：仅 `history`。
- 未修改的 view：19。
- catalog 实体：489。
- view：20。
- legacy 页面：14。

## 10. 本轮文件变更

本轮任务实际修改：

1. `data/navigation.js`
   - 只修改 `AR_VIEWS.history`。
   - 5 个 section 重组为 4 个 section。
   - ID 集合保持不变。

2. `data/catalog.js`
   - 只为 `res-664260a4c584` 增加单向 `relatedResources`。

3. `docs/history-regrouping-report.md`
   - 新增本实施报告。

本轮未修改：

- 其他 19 个 view；
- 其他 488 个 catalog 实体；
- `data/legacy.js`；
- `data/pages.js`；
- `data/resources/*`；
- `scripts/validate.mjs`；
- HTML、CSS、JS；
- Art Notes；
- Music Library；
- 既有 Playwright 产物。

## 11. Git diff/status 摘要

仓库在本轮开始前已经存在大量未提交修改和未跟踪文件，包含 `data/navigation.js` 的既有修改以及未跟踪的 `data/catalog.js`、`data/legacy.js`、`docs/`、`scripts/` 等。因此普通 Git diff/status 会同时显示先前工作，不能把它们全部归因于本轮。

本轮通过实施前完整数据快照确认，任务级差异严格为：

- `history` view section 结构变化；
- `res-664260a4c584.relatedResources` 新增一个 ID；
- 新增 `docs/history-regrouping-report.md`。

当前 Git 状态仍显示原有工作区修改；本轮没有清理、覆盖、暂存或提交任何既有改动。

本轮未执行 `git commit`，未执行 `git push`。
