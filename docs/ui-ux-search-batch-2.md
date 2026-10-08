# UI / UX 优化 · 第二批：轻量全局搜索

执行日期：2026-10-08。依据：`docs/ui-ux-audit.md`、`docs/ui-ux-improvements-batch-1.md`。

本轮仅实现纯前端全局资源搜索。匹配、位置跳转、键盘交互、五种窗口尺寸、授权回归和数据不变性检查均通过。

## 1. 搜索实现结构

新增 `js/resource-search.js`，使用现有 `window.AR_CATALOG`、`window.AR_VIEWS` 和 `window.AR_NAVIGATION`。没有复制搜索数据库或创建手工索引 JSON。

现有导航初始化完成且页面受保护、具有今日授权后，加载搜索脚本。资源页面复用已经加载的 catalog；首页在首次打开搜索时加载原有 `data/catalog.js`，同一次加载 Promise 复用。加载失败显示重试提示，关闭再打开可重试。

共享导航的已授权页面均使用同一实现，不需要修改各 HTML 文件。未改变每日授权规则、密码、授权返回机制或资源渲染器。

## 2. 搜索入口与 UI

桌面在侧栏 logo 下方增加“搜索资源…”按钮，随原侧栏滚动。手机 ≤768px 使用同一个按钮，移动至折叠菜单外并固定在顶部右侧；左侧保留“当前 view · 导航”，顶部仍为 56px。

使用原生 dialog，包含标题、关闭按钮、搜索输入、结果数量和独立滚动的结果列表。宽度最多 680px，窄屏保留两侧间距，高度不超出可见窗口。配色沿用现有主题。

结果显示当前正式名称、原 description、可点击的位置路径。有主 URL 的名称使用正常外链，target="_blank"、rel="noopener noreferrer"。不复制完整 section 卡片，不展示 secondary、reviewNotes、relatedResources、type 或 tags。

## 3. 匹配字段与规则

只匹配 name、description，以及存在时的 previousTitles。输入 trim，英文统一转小写，中文直接进行连续 substring 匹配。

不搜索 URL、sourceKey、migration、corrections、retired、reviewNotes、关联名称、tags、type 或 secondary label。没有拼音、编辑距离、自动纠错、同义词、AI 或 embedding。

空输入不列出全部资源，显示“输入名称或用途搜索资源”。无结果显示“没有找到匹配的资源，尝试更短的关键词”。不会联网搜索。

## 4. 排序规则

优先级依次为：

1. name 完全匹配。
2. name 前缀匹配。
3. name 包含。
4. previousTitles 包含。
5. description 包含。

同级沿用 catalog 原始顺序，使用原数组位置明确作为次排序条件。没有复杂 relevance score。临时测试数据确认五个等级顺序正确；真实数据的 Blender 完全匹配排第一。

## 5. 实体去重与历史实体

按 resourceId 去重，再排序。多个 placement 不会复制结果卡片。

输入数据仅为当前 470 个 catalog 实体，不读取 migration、mergedSources 或 retired 记录。因此 17 个退休实体及历史 source 不作为独立搜索结果。

Blender 查询找到 8 个不同实体；其中 Blender 本体仅显示一条，其他结果为手册、插件平台等当前独立实体。

## 6. navigation placement 反向解析

遍历 AR_VIEWS 的 sections / resourceIds，为每个 ID 收集位置。大区名称来自 AR_NAVIGATION，view / section 标题来自 AR_VIEWS；含 domains 的 view 同时解析所属 domain 和 group。路径省略空标题和相邻重复标题。

每条路径链接使用现有形式：`library.html?view=...#section-id`，没有新增 placement 字段、路由、query 搜索状态或 hash 搜索状态。全部 470 个实体均找到现有位置；同一 section 的重复路径会去重。

实测字由的美术路径进入 `library.html?view=art#art-visual-type`，自动显示视觉设计 domain 与字体 section。初始 `library.html?view=art#art-visual-color` 的原 domain / hash 也正常保留。

## 7. 多位置实体

Blender 的两条路径由数据动态生成：

- 创作与工作 → 3D → 软件与工具。
- 设备与环境 → 软件 → 3D创作。

两条路径分别指向 `view=3d#section-09d0e478dd` 和 `view=software#software-3d-creation`。实测点击第二条正常进入软件 view 的对应 section。

路径本身就是“查看所在位置”入口，并以 aria-label 明确用途；没有下拉菜单或弹窗选择器。

## 8. 无 URL 实体

全部 11 个 NO_ACTIVE_URL 实体均在浏览器中按当前名称查到：hdrlabs、Atomic Jane Clothing、世界历史地图、Microsoft Office、Xmind、Honeyview、Adobe Creative Cloud、App Cleaner & Uninstaller、Scroll Reverser、Picsee、IINA。

名称均为 span，未伪装为外链；显示轻量“暂无链接”，仍有可点击的位置路径。多位置的无 URL 实体也只显示一条结果。

## 9. previousTitles

当前正式 catalog 没有 previousTitles 实例，因此没有修改数据来制造示例。

实现支持该可选字段：命中时仍显示当前 name，仅在该匹配等级生效时显示真正命中的一条“曾用名”。如果 name 已匹配，不附加曾用名提示。临时 fixture 验证曾用名匹配排在 name 包含之后、description 包含之前。

实际查询“Blender Market”找到 Superhive，是通过现有 description 匹配；报告不将它误记为 previousTitles 测试。

## 10. 键盘、Escape 与焦点

按钮点击后 showModal，输入自动获得焦点。dialog 使用 aria-labelledby / aria-modal；原生 dialog 管理模态背景和 Tab 范围，没有自写复杂 focus trap。

输入框 Enter 被阻止默认行为，实测 URL 不变、面板仍打开，没有自动打开外部资源。Tab 可进入正常结果链接，实测首个结果焦点为 Blender。

搜索框的原生 Escape 可能先清空文本，因此 dialog 统一处理 Escape：直接关闭并恢复原搜索按钮焦点。输入框、结果链接中的 Escape 和关闭按钮均实测通过。搜索关闭不会改变手机导航的展开状态。

搜索不写 URL、history 或 localStorage。刷新后面板关闭、关键词为空，已在首页实测。

## 11. 手机与五种窗口尺寸

以“资源”查询得到 56 条结果，五种尺寸均显示可见搜索入口、无 document 横向溢出，结果区高度受限且可以滚动。桌面实际滚动后结果区 scrollTop=433，正文没有承担结果滚动。更换关键词时结果滚动回到顶部。

| 窗口 | 搜索入口 | 面板横向溢出 | 结果区可滚动 | Escape / 焦点返回 |
| --- | --- | --- | --- | --- |
| 1920×1080 | 侧栏顶部 | 无 | 是 | PASS |
| 1366×768 | 侧栏顶部 | 无 | 是 | PASS |
| 1024×768 | 侧栏顶部 | 无 | 是 | PASS |
| 768×1024 | 顶部右侧 | 无 | 是 | PASS |
| 390×844 | 顶部右侧 | 无 | 是 | PASS |

手机导航默认收起时可以直接搜索；实测展开后仍保留全部 20 个 view 链接，也能直接打开搜索。导航按钮右边界与搜索按钮左边界相接，没有互相遮挡。

跨桌面 / 手机断点时同一个搜索按钮在 sidebar 内外移动，不复制入口。没有调整 section sticky、scroll spy 或原有锚点滚动偏移；手机定位继续遵循既有行为。

桌面实测截图：

![1366px 桌面搜索：Blender 唯一实体与多位置路径](/tmp/ui-ux-search-batch-2/desktop.jpg)

手机实测截图：

![390px 手机搜索：紧凑结果与独立滚动](/tmp/ui-ux-search-batch-2/mobile.jpg)

## 12. 搜索关键词实测

以下均实际操作浏览器搜索输入，与临时 Node 匹配测试结果一致：

| 关键词 | 结果数量 | 结果与检查 |
| --- | --- | --- |
| Blender | 8 | Blender 第一；本体唯一，提供两条位置 |
| blender | 8 | ID 与顺序同 Blender |
| BLENDER | 8 | ID 与顺序同 Blender |
| 字体 | 10 | 字体传奇网前缀、中文字体包含优先于用途匹配 |
| 地形生成 | 2 | gaea Guide、Gaea；名称均不含该词，通过 description 匹配 |
| Blender Market | 1 | 当前名称 Superhive，通过 description 匹配 |
| zzzz不存在987 | 0 | 明确无结果提示 |
| 空输入 | 0 | 提示输入名称或用途，无推荐列表 |
| 前后空格的 Blender | 8 | ID 与顺序同无空格查询 |
| hdrlabs | 1 | 无 URL，名称为 span，提供位置 |
| HTML 样式输入 | 0 | 当作普通文本，不生成 HTML 节点 |

所有查询确认 ID 去重、排序稳定。另用临时 fixture 验证 previousTitles，测试脚本和测量记录仅放在 /tmp。

DOM 使用 createElement / textContent，不将用户输入拼进 innerHTML。本版没有关键词高亮。

## 13. 授权与页面回归

回归 `library.html?view=3d`、`library.html?view=art#art-visual-color` 和 `index.html`。3D 资源正常显示，art domain / section 正常解析；首页首次打开搜索按需加载正式 catalog 并找到 8 条 Blender 结果。

未授权进入 art section 时正常转入 password.html，密码页面搜索按钮数量为 0。完成本机测试授权后完整恢复 `view=art#art-visual-color`，搜索入口数量为 1。打开搜索时再次使用现有 checkAuth 检查今日授权。

沿用已授权的独立 localhost 测试端口和临时测试凭据，正式 auth 文件与密码 hash 均未修改。没有搜索授权旁路。

## 14. 数据不变性

修改前保存全部既有文件 SHA-256，完成后逐文件对比。仅 `js/navigation.js` 和 `css/theme-arc.css` 两个既有文件变化；新增搜索脚本与本报告。其他既有文件逐字节不变。

catalog、navigation 数据、legacy、migration、corrections、retired、relatedResources 和 URL 均不变；旧审计与第一批报告不变；validator 不变。

| 指标 | 修改前 | 修改后 |
| --- | --- | --- |
| entities | 470 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired | 17 | 17 |
| views | 20 | 20 |
| activeURLs | 463 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| corrections | 43 | 43 |
| relatedResources edges | 21 | 21 |
| legacyPages | 14 | 14 |
| art mappings | 165 | 165 |
| internalLinks | 209 | 209 |

## 15. 验证结果

`node scripts/validate.mjs`：PASS，退出码 0。

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 470,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 463,
  "confirmedCorrections": 43,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

`git diff --check`：PASS，退出码 0。新增文件另检查行尾空白。

`node --check js/navigation.js`、`node --check js/resource-search.js`：均 PASS。

匹配 / 五级排序 / 去重 / 全部实体位置的临时 Node 验证，以及浏览器关键词、无 URL、键盘、五尺寸、位置跳转、首页和授权回归均通过。

## 16. 实际修改文件

修改：

- `js/navigation.js`：已授权导航初始化后接入共享搜索脚本。
- `css/theme-arc.css`：搜索入口、dialog 和结果样式，以及手机顶部两个按钮布局。

新增：

- `js/resource-search.js`：匹配、位置解析、dialog 交互与结果渲染。
- `docs/ui-ux-search-batch-2.md`：本报告。

没有修改 HTML、catalog、navigation 数据、auth、资源 renderer 或 validator。截图及测试脚本仅保存于 /tmp。

## 17. 明确未实现的功能

未实现高级筛选、标签浏览器、收藏、最近访问、搜索历史、分页、无限加载、虚拟列表、拼音、模糊匹配、自动纠错、同义词、语义搜索或关键词高亮。

未调整信息架构、relatedResources 数量 / UI、secondary 文案、reviewNotes、无 URL 原卡片 hover、section sticky、scroll spy、skip link、sidebar landmark、主题、动画或首页设计。

搜索纯前端；未引入搜索库；未增加后端；未修改资源数据；未实现筛选 / 收藏 / 最近访问 / 搜索历史；未 commit；未 push。
