# 第二阶段：美术与设计整理报告

本阶段在第一阶段架构上增加美术与设计内部层级。489 个实体、20 个视图、14 个旧 HTML、168 项美术资源保持完整。未 commit、未 push。

## 1–4. 最终实际层级与资源数量

继续使用 `library.html?view=art`。页面顶部只有概念设计、视觉设计、设计参考三个领域链接；点击后显示当前领域的细分导航和资源。URL hash 保存领域/section，刷新和前进后退可恢复。设计参考内部再显示服装与时尚、武器两个分组及各自的细分导航。没有新增 HTML。

### 概念设计（35 项）

| Section | 资源数 |
| --- | ---: |
| 图片与素材 | 3 |
| 综合参考 | 6 |
| 人体参考 | 6 |
| 影视与摄影参考 | 9 |
| 艺术家与社区 | 8 |
| 工具 | 3 |

### 视觉设计（47 项）

| Section | 资源数 |
| --- | ---: |
| 配色 | 11 |
| 字体与文字 | 9 |
| 图形与素材 | 7 |
| 灵感与案例 | 3 |
| 社区与趋势 | 4 |
| 工具 | 13 |

### 设计参考（86 项）

**服装与时尚**

| Section | 资源数 |
| --- | ---: |
| 现代时装 | 8 |
| 历史服装 | 14 |
| 风格与题材 | 13 |
| 设计资料 | 11 |

**武器**

| Section | 资源数 |
| --- | ---: |
| 品牌与官方 | 9 |
| 结构与术语 | 6 |
| 弹药 | 2 |
| 社区与资料库 | 16 |
| 商城与拍卖参考 | 7 |

共 21 个短标题 section，取代原 38 个平铺的长标题 section；顶部不会同时列出所有 21 个细分链接。左侧仍是四大区域，以及创作区原有的七个领域。学习区 research 的展示标题已改为“学习资源”，view key 不变。

## 5. 存在交叉含义的资源

| 资源 | 本次落点 | 判断与保留边界 |
| --- | --- | --- |
| MFD设计师导航 / 刺猬星球 | 概念设计 / 工具 | 同时覆盖字体、配色、摄影，但继续使用第一阶段合并的唯一实体，不在视觉设计重复展示 |
| PureRef | 概念设计 / 工具 | 根据参考图管理用途从视觉设计工具移入；设备与环境的软件引用保留 |
| Artchips艺术碎片 | 视觉设计 / 工具 | 原描述只有“艺术创作和灵感工具”，不足以细分其功能，暂保留工具用途 |
| this person does not exist | 概念设计 / 人体参考 | 虽由 AI 生成，但当前收藏用途是人脸参考，未改成 AI 视图 |
| Vertugadins | 设计参考 / 服装与时尚 / 风格与题材 | 原描述明确不限于西方古代，避免武断归入单一历史时期 |
| Stonefinder | 设计参考 / 服装与时尚 / 设计资料 | 描述为珠宝参考，缺乏历史年代依据，作为配饰资料保留 |
| Yumeyakata、Kimonomachi | 设计参考 / 服装与时尚 / 风格与题材 | 按现有和服题材保留，不因传统服饰外观断言为历史资料 |
| Popular Mechanics | 设计参考 / 武器 / 社区与资料库 | 综合机械杂志，仍按原武器参考收藏语境保留，本阶段不移往其他用途 |
| List of Telescope Parts and Construction | 设计参考 / 武器 / 结构与术语 | 光学零件参考，保留原收藏语境，不删除 |

Costumers Guide 首页与 about 页面沿用第一阶段的两个实体；本次只归入影视服装题材，没有重新合并或拆分。Adobe 原微博入口等第一阶段待确认问题不在本阶段修复。

## 6. 用途是否变化

没有资源跨出或新增到其他一级区域或其他 view；168 项的集合完全一致。仅细化美术内部用途：

- Flickr、国家地理、AirPano → 影视与摄影参考；大都会博物馆 → 综合参考。
- PureRef → 概念设计工具；字由 → 字体与文字；Iconfont 与图虫创意 → 图形与素材；设计癖 → 灵感与案例。
- Costumers Guide 两个入口、Recycled Movie Costumes → 风格与题材，未机械沿用“西方古代”。
- 联合国的原 URL 明确指向 parts-and-components → 结构与术语。
- 原美术学习、Neil Blevins 教程等已在学习区的条目未复制回来。

逐条对照见 [art-regrouping.json](art-regrouping.json)，包含每项原 section、新 section 和判断原因。catalog 仍是唯一实体库；本次仅更改 research 相关 6 个实体的 topics 展示名称，以及其中 2 条提示文字，未改变任何 ID、URL、名称、描述或去重结果。

## 7. 本阶段修改文件

以下是相对本阶段开始时的工作区，而非相对 Git HEAD：

- `css/resource-page.css`
- `data/catalog.js`
- `data/navigation.js`
- `docs/architecture.md`
- `js/catalog-view.js`
- `js/render-resources.js`
- `scripts/validate.mjs`

- navigation：层级、resourceIds 归并、旧锚点别名、research 显示名称。
- catalog：仅学习资源名称对应元数据。
- catalog-view / renderer / CSS：页内领域选择、局部分组、旧入口分类路径，保持其他视图原布局。
- validate：覆盖 168 项集合、三个内部领域、层级引用、旧锚点和历史映射兼容。
- architecture：追加第二阶段维护说明。

## 8. 新增与删除

新增：

- `docs/art-regrouping.json`
- `docs/phase-2-browser-check.json`
- `docs/phase-2-report.md`
- `output/playwright/phase2-desktop-concept.png`

删除：无。
没有新增资源文件副本、框架、HTML 页面、搜索或配置实例。浏览器工具在仓库外的工作区 `.playwright-cli/` 继续产生临时运行日志。

## 9. 验证结果

- `node scripts/validate.mjs`：通过，489 个实体、168 项美术资源、20 个视图、14 个旧入口、486 个原始 URL 全部保留；美术内无重复卡片。
- 比较本阶段开始时的模型：其他 19 个视图除 research 标题外完全相同；侧栏结构不变；catalog 仅有声明的显示元数据变化。
- Playwright：72 组页面/宽度组合通过（19 个其他视图 + 14 个旧页 + 3 个内部领域，各测 1440px 和 390px）；卡片 ID 集合匹配，无横向溢出，手机保持单列。
- 浏览器验证顶部始终只有三个领域入口，跨领域资源并集为 168，且无重复。
- 实际点击领域/section、刷新、返回均通过；38 个旧美术 section 锚点全部能打开有效的新分组。旧分组拆分时，旧锚点定位到包含其首项的分组，其他条目仍可通过领域导航找到。
- 浏览器无 JavaScript pageerror；桌面截图已复核。移动端截图工具多次超时，未获得截图；390px 的资源集合、切换交互、单列布局和横向溢出检查均已通过，不能将这些检查表述为移动端截图复核。
- 第一阶段 migration-map.json、legacy.js、14 个旧 HTML、全部旧数据快照没有变化。
- SHA-256 比较：Art Notes 194 个文件和 Music Library 11 个文件均未改动，Music Library 原 6 个未提交文件保持原状态。
- `git diff --check` 通过。

功能结果见 [phase-2-browser-check.json](phase-2-browser-check.json)。

## 10. Git 状态与 diff 摘要

本阶段：修改 7 个既有工作区文件，新增 4 个文件，删除 0 个。第一阶段未提交内容保留，因此 git diff 是两阶段累计结果，并非本阶段单独 diff。

累计已跟踪文件统计：

```text
3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   19 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1563 +++++++++++++++++++++++++++++++++++++++--
 data/pages.js                 |   28 +-
 development.html              |    7 +-
 game-design.html              |    7 +-
 games.html                    |    7 +-
 gun-design-reference.html     |    7 +-
 history.html                  |    7 +-
 index.html                    |   22 +-
 installation-software.html    |    7 +-
 js/navigation.js              |    8 +-
 js/render-resources.js        |  131 +++-
 video-film.html               |    7 +-
 visual-communication.html     |    7 +-
 work-tools-collaboration.html |    7 +-
 20 files changed, 1775 insertions(+), 94 deletions(-)
```

累计主站状态：

```text
M 3d-art.html
 M ai-art.html
 M concept-art.html
 M costume-fashion-design.html
 M css/resource-page.css
 M daily-essentials.html
 M data/navigation.js
 M data/pages.js
 M development.html
 M game-design.html
 M games.html
 M gun-design-reference.html
 M history.html
 M index.html
 M installation-software.html
 M js/navigation.js
 M js/render-resources.js
 M video-film.html
 M visual-communication.html
 M work-tools-collaboration.html
?? data/catalog.js
?? data/configuration.schema.json
?? data/legacy.js
?? data/resources/README.md
?? docs/
?? js/catalog-view.js
?? library.html
?? output/
?? scripts/
```

Art Notes 仍干净；Music Library 保留原有 about.html、index.html、listening-notes.html、playlists.html、resources.html、tutorials.html 六项修改。本阶段未暂存、未提交、未推送，也未修改远程设置。
