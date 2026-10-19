# AR Library 项目结构审查与 Photobash 独立目录接入评估

审查日期：2026-10-17（Asia/Shanghai）。依据当前工作区文件，不以历史报告代替代码。

## 1. 审查范围、工作区与结论

实际 Git 仓库根目录为 `/Users/archt/AR 个人网站/Ar012-Library`，不是外层 `/Users/archt/AR 个人网站`。当前分支为 `main`，HEAD 为 `f747a47`（提交标题 `261011`）；origin 为 `https://github.com/Ar-012/Ar012-Library.git`。报告中的代码路径均相对此仓库根目录，行号对应审查时工作区。

审查前已有以下未提交内容，全部保留，结论包含这些工作区改动的实际状态：

| 状态 | 路径 |
| --- | --- |
| 已修改 | `data/catalog.js` |
| 已修改 | `data/navigation.js` |
| 已修改 | `docs/migration-map.json` |
| 已修改 | `scripts/validate.mjs` |
| 未跟踪 | `assets/icons/z-anatomy.ico` |

本轮仅新增本报告。未修改业务代码、导航或既有文档；未下载图片、安装依赖、创建页面、commit 或 push。执行了读取文件、搜索、Git 状态检查及无写入的 `node scripts/validate.mjs`。未执行会访问外网并覆盖报告的 `scripts/check-links.py`。

**推荐 C：导航入口复用现有系统，Photobash 目录数据及业务逻辑独立维护。** 使用根目录独立 `photobash.html`，作为「创作与工作」下与「美术与设计」等并列的二级导航入口；不要将素材包插入现有 `AR_CATALOG`、美术 section 或旧资源快照。复用站点布局、主题与导航交互，单独实现封面网格、双语搜索及多分类筛选。

当前导航能够打开任意 `href`，但区域识别和高亮仍依赖 `AR_ACTIVE_VIEW → AR_VIEWS.area`，因此**首次接入需要小幅适配共享导航，不能声称只改导航数组就完整接入**。适配后可做到将入口对象移至另一个一级分类的 `items` 即完成位置调整。

## 2. 当前真实目录与技术栈

以下为当前结构；图标、审计文档和截图按集合展开说明，不逐一列出：

```text
/Users/archt/AR 个人网站/
├── .DS_Store
├── .playwright-cli/                 # 外层历史浏览器日志、快照及其他文件；不在本仓库内
└── Ar012-Library/                   # 实际 Git 仓库
    ├── .git/
    ├── .gitignore                  # .DS_Store
    ├── index.html
    ├── library.html                # 当前分类共用的 HTML 外壳
    ├── password.html
    ├── 404.html
    ├── 3d-art.html
    ├── ai-art.html
    ├── concept-art.html
    ├── costume-fashion-design.html
    ├── daily-essentials.html
    ├── development.html
    ├── game-design.html
    ├── games.html
    ├── gun-design-reference.html
    ├── history.html
    ├── installation-software.html
    ├── video-film.html
    ├── visual-communication.html
    ├── work-tools-collaboration.html
    ├── css/
    │   ├── styles.css
    │   ├── resource-page.css
    │   └── theme-arc.css
    ├── js/
    │   ├── navigation.js
    │   ├── catalog-view.js
    │   ├── render-resources.js
    │   ├── resource-search.js
    │   ├── theme.js
    │   └── auth.js
    ├── data/
    │   ├── navigation.js
    │   ├── catalog.js
    │   ├── legacy.js
    │   ├── pages.js
    │   ├── configuration.schema.json
    │   └── resources/
    │       ├── README.md
    │       └── 14 个旧资源 JS 快照（文件名与上述 14 个兼容页面对应）
    ├── assets/
    │   └── icons/                  # 当前 98 个文件，含未跟踪的 z-anatomy.ico
    ├── scripts/
    │   ├── validate.mjs
    │   └── check-links.py
    ├── output/
    │   └── playwright/             # 5 张既有浏览器检查 PNG
    └── docs/                       # 架构、迁移映射、历次审计与验证记录；本报告在此
```

- 根目录共 18 个 HTML；采用原生 HTML、CSS、浏览器 JavaScript，无 React/Vue 组件系统、后端或数据库。
- 浏览器数据通过普通 `<script src>` 挂载到 `window.AR_*`，没有 ES module 导入，也不要求运行时 JSON fetch（`library.html:43–50`）。
- Node.js 只用于本地校验，`validate.mjs` 使用 Node 内置模块；Python 脚本使用标准库并调用系统 curl。没有发现 `package.json`、依赖锁文件、Vite/Webpack 配置或构建命令。catalog 中的 Vite 是被收录的网站资源，不是本项目构建工具。
- Font Awesome 6.4.0 和 Google Fonts 由外部 CDN 加载（`library.html:10–11`）。已有字体、图标在离线时存在可用性限制，不应据此引入新框架。
- 没有发现 `AGENTS.md` 对本轮另作规定。

### GitHub Pages 与路径

仓库可直接作为静态站点源部署；HTML 使用同层相对路径，如 `css/styles.css`、`data/navigation.js`、`library.html?view=art`，未发现 base URL、路由前缀或 SPA history fallback 配置。`404.html` 是独立静态错误页，不是路由转发器。

**部署事实的边界：** Git remote 可确认托管仓库，但本地没有 `.github/workflows/`、`CNAME`、`.nojekyll` 或 Pages 构建配置；仅凭仓库不能确认 GitHub Settings 中实际启用的是哪个分支、目录或 Actions 发布方式，也不能确认线上状态。`docs/` 是审计输出目录，不是当前页面源码根目录。未来实施前应只读确认 Pages 设置，不能把“main 根目录发布”当作已证实事实。本轮未查询远端 Pages 设置。

若使用常见项目站点路径 `/Ar012-Library/`，同层相对链接兼容该前缀；新页面应保持在仓库根目录，避免 `/assets/...` 这类从域名根目录开始的路径。若将来嵌套页面目录，现有导航链接和动态脚本地址也需统一处理，不能只调整封面路径。

## 3. 现有导航系统

### 3.1 一级分类及入口

唯一活动导航定义位于 `data/navigation.js:2–122` 的 `window.AR_NAVIGATION`。一级为四个区域，二级为入口对象 `{ label, href, icon }`。

| 一级 ID / 名称 | 二级入口与 view key |
| --- | --- |
| `create` / 创作与工作 | 美术与设计 `art`、3D `3d`、游戏制作 `game-production`、AI `ai`、开发 `development`、音频与视频 `av`、工作与协作 `work` |
| `learn` / 学习与研究 | 美术 `art-study`、游戏设计 `game-study`、历史 `history`、音乐 `music-study`、开发学习 `code-study`、学习资源 `research` |
| `life` / 日常与生活 | 游戏 `games`、影视 `film`、音乐 `music`、日常工具 `daily` |
| `setup` / 设备与环境 | 软件 `software`、系统与设备 `system` |

当前这 19 个入口全部指向 `library.html?view=<key>`，不是 19 个独立页面文件。

### 3.2 「创作与工作」具体结构

`data/navigation.js:3–43` 的实际结构为：

```javascript
{
  id: "create",
  label: "创作与工作",
  items: [
    { label: "美术与设计", href: "library.html?view=art", icon: "fas fa-bookmark" },
    { label: "3D", href: "library.html?view=3d", icon: "fas fa-bookmark" },
    { label: "游戏制作", href: "library.html?view=game-production", icon: "fas fa-bookmark" },
    { label: "AI", href: "library.html?view=ai", icon: "fas fa-bookmark" },
    { label: "开发", href: "library.html?view=development", icon: "fas fa-bookmark" },
    { label: "音频与视频", href: "library.html?view=av", icon: "fas fa-bookmark" },
    { label: "工作与协作", href: "library.html?view=work", icon: "fas fa-bookmark" }
  ]
}
```

同一文件 `:124` 开始定义 `window.AR_VIEWS`。例如 `AR_VIEWS.art.area === 'create'`，其 `sections` 用 `resourceIds` 引用实体；`art` 另外有 `domains → groups → sectionIds` 层级。当前创作区分布：

| view | section 数 | 资源引用数（各 view 内不重复，跨 view 可共享） |
| --- | ---: | ---: |
| art | 21 | 162 |
| 3d | 5 | 44 |
| game-production | 5 | 23 |
| ai | 6 | 23 |
| development | 4 | 21 |
| av | 4 | 17 |
| work | 5 | 31 |

Photobash 应作为 `create.items` 的一个新入口，与这些 view 入口并列；不添加到 `AR_VIEWS.art.sections` 或某个现有 `resourceIds` 中。“导航标签页”在本项目里应理解为侧栏独立入口及整页跳转，不是新增站内标签管理系统。

### 3.3 生成与跳转流程

1. `catalog-view.js:3–10,40–55` 根据 `?view=` 解析 `AR_VIEWS`，建立实体 Map，设置 `AR_ACTIVE_VIEW` 和 `AR_RESOURCE_SECTIONS`；未传 view 时默认 `art`。
2. `navigation.js:22–38` 的 `renderNavigation()` 在 DOMContentLoaded 时读取这些全局变量，创建左侧区域图标栏。
3. `:35–36,56–57` 每个一级区域的入口取 `items[0].href`，没有独立区域落地页。未来新增 Photobash 宜追加到列表合适位置，不要无意改为区域第一项。
4. `:66–72` 绘制当前区域的全部二级入口；`iconLink()` 创建原生 `<a href>`，浏览器执行页面跳转。section 用 `#id`；美术领域额外使用 hash、history 与 `ar:domain-rendered` 同步（`render-resources.js:235–243,300–322`）。
5. 旧页面通过 `AR_LEGACY` 还原资源集合，并提供新分类链接；它们不是一级导航的主入口。

### 3.4 独立页面的限制与移动能力

只添加 `{ label: 'Photobash', href: 'photobash.html', icon: ... }`，从现有分类页点击能打开页面；但新页若不运行 catalog-view，就没有 `AR_ACTIVE_VIEW`。当前 `navigation.js:25–30` 因而无法识别所属区域，侧栏退回四大区域目录，标题可能退回“分类”。`:68` 的当前入口比较只看 `view` 查询参数，也不能正确区分独立页。

建议首次接入时为二级入口引入稳定 `id: 'photobash'`；共享导航保留原有 view 分支，同时增加独立页匹配：通过 `body.dataset.page` 与条目 ID 或规范化文件路径识别当前项，并从**该项所在的 AR_NAVIGATION 父对象**取得 area 和标题。独立页匹配应限于独立入口，避免把所有 `library.html?view=...` 按 pathname 当成同一项。

这样导航位置只由 `AR_NAVIGATION` 的父子关系决定，Photobash 脚本和页面不硬编码 `create`；移动时只把这一入口对象从一个 `items` 数组移到另一个。面包屑、所属区域标题也应由同一次导航查找结果派生，避免另存一份 area 配置。**此能力属于推荐的后续适配，当前尚未实现。**

不要创建空的 `AR_VIEWS.photobash` 伪装现有目录：现有校验器要求每个 view 有非空 sections 和有效实体引用，搜索也假定所有 view 都是资源 section（`validate.mjs:57–71`；`resource-search.js:5–17`）。

## 4. 页面布局与样式复用

### 4.1 已有基础设施

- `library.html` 是当前视图的共用外壳，14 个兼容 HTML 复制了相近骨架；没有模板编译器或跨 HTML 的头部/页脚 include。
- `#sidebar` 是实际共享组件挂载点。`navigation.js:2,188` 添加 `library-shell` 并将挂载点替换为区域栏、工具栏、侧栏；包含移动端展开、Escape、焦点恢复及媒体查询处理。
- `.main-content`、`.container`、`.content-header`、`.page-title`、`.page-subtitle`、`.breadcrumb`、`.simple-footer` 可直接沿用（`library.html:18–40`）。顶部标题是页面 HTML 骨架加脚本更新，不是独立可导入组件。
- CSS 加载顺序为 `styles.css → resource-page.css → theme-arc.css`；`styles.css:8` 起定义基础变量，`theme-arc.css:2–9` 在 `.library-shell` 上覆盖为当前米白、灰色侧栏、深色标题区与金色强调的视觉体系。
- `styles.css:475–522` 提供布局及响应式；JS 也使用 1200px / 768px 断点（`navigation.js:176–177`）。`theme.js` 只固定写入 `data-arc-theme='obsidian'`，不代表有完整主题切换机制。

### 4.2 独立页面做法

新页面可复制精简外壳，保留 `#sidebar` 及通用结构，在已有三份 CSS 后加载 `css/photobash.css`。页面根节点使用 `.photobash-page` 等作用域，卡片使用 `.photobash-card`、`.photobash-cover` 等专属类，通过现有变量继承颜色、边线、圆角。不要修改共享 `.resource-link`、`.link-group` 来容纳大封面，以免影响原目录。

可以加载独立 `js/photobash.js` 和 `data/photobash/*.js`；不加载 `catalog-view.js`、`render-resources.js`、`data/legacy.js`、旧资源快照，也不要创建 `#resource-root` 让旧渲染器接管。独立页的标题可静态声明，所属区域面包屑由导航匹配结果生成；`data/pages.js` 当前主要保存旧入口元信息，单独加载它不会自动更新 DOM（更新函数在 renderer 内部，未导出）。

现有 `createResource()`（`render-resources.js:48–87`）渲染小图标、单标题、描述与链接；是 IIFE 内部函数，没有公共组件导出。`makeIcon()` 处理的是 `iconImage` 小图标，不是素材预览封面。适合复用视觉规范和 DOM 安全写入方式，不适合直接套用成封面卡片。

### 4.3 搜索与筛选的复用边界

- 全站搜索由 `navigation.js:189–192` 在已有当日访问权限时动态注入；`resource-search.js` 按需加载 catalog。可以保留在 Photobash 页作为原站搜索，目录内另设明确标为“搜索 Photobash 素材包”的搜索框。
- 现有公开对象 `ARResourceSearch` 包含 `placementsFor()` / `matchResources()`，但依赖 catalog 的 `name/description/previousTitles` 与 view 的 section 结构。它不搜索 `titleEn/titleZh/categories/tags`，也不是本页网格过滤器（`:22–37`）。不能直接接上新字段就宣称支持双语搜索。
- 当前分类多数是跳转 section 锚点；美术领域是切换领域内容。没有通用多标签筛选组件。Photobash 的搜索、分类状态、结果数、空状态需独立实现。
- 推荐首版为单分类选择（“全部”或一个分类），每包的 `categories` 可含多个 ID；查询与分类条件用 AND 组合。日后如启用多分类多选，再明确分类之间采用 OR 还是 AND，不必首版引入额外复杂交互。

## 5. 资源数据系统

| 文件 / 全局变量 | 当前实际作用 |
| --- | --- |
| `data/catalog.js` / `AR_CATALOG` | 唯一活动通用资源实体表；当前 465 项 |
| `data/navigation.js` / `AR_NAVIGATION` | 区域和二级入口配置 |
| 同文件 / `AR_VIEWS` | 19 个 view 的 area、标题、sections、resourceIds；美术额外含 domains 和 aliases |
| `data/legacy.js` / `AR_LEGACY` | 14 个旧页面到资源 ID 集合的映射 |
| `data/pages.js` / `AR_PAGES` | 兼容页面元信息；当前 view 元信息会由 catalog-view 写入 |
| `data/resources/` | 14 份迁移前快照，不参与 HTML 运行时加载；README 明确禁止作为新版活动源维护 |
| `data/configuration.schema.json` | 未来配置记录的 JSON Schema；不是 catalog 或 Photobash 素材包 schema |
| `docs/migration-map.json` 等 | 审计、来源覆盖与校验依据；不是浏览器活动资源表 |

### 字段、分类和索引

catalog 的基础字段是 `id/name/description/url/icon/type/topics/contexts/tags/links/sources`，另有 `iconImage/alt/previousTitles/reviewNotes/relatedResources` 等可选信息（例：`catalog.js:2–29`；必填检查见 `validate.mjs:124–144`）。

- 当前 ID 外观为 `res-` 加哈希式后缀；ID 已固定存储，改名或改 URL 不应重算。仓库没有当前可复用的 ID 自动生成器，不应从外观推定生成算法。
- `topics` 描述领域，`contexts` 描述用途区域，`type` 描述资源类型，`tags` 是描述标签；**实际页面位置由 AR_VIEWS 的 resourceIds 决定**，并非自动按这些字段分类。
- `links` 保留主/次入口，`sources` 关联迁移来源；`relatedResources` 是资源间 ID 引用。
- `catalog-view.js:4` 建立 `Map(id → resource)`，`resource-search.js:3–19` 建立 `Map(id → placements)`；搜索逐次扫描实体、按匹配等级排序，没有全文索引库或持久索引。
- `validate.mjs:34,61–69,123–140` 检查重复实体 ID、同一 view 的重复卡片、链接重复和悬空引用；搜索 `:25–28` 也按 ID 排除重复结果。这是校验/检索去重，不是后台自动合并服务；相同站点不同 URL 的语义去重仍需人工判断。

### A / B / C 比较

| 方案 | 代价与适用性 | 结论 |
| --- | --- | --- |
| A：每个素材包进入通用资源库 | 需扩展实体字段、封面布局、双语搜索和筛选；牵涉迁移计数、来源覆盖与 view 去重约束；现有 renderer 不直接支持 | 不推荐 |
| B：页面、导航、数据全部自建 | 业务隔离充分，但会复制导航、响应式和视觉维护逻辑，移动入口仍需同步多处 | 不推荐完全割裂 |
| C：复用导航外壳，独立素材数据与逻辑 | 首次小改导航匹配；原 catalog、搜索与迁移机制可保持原状；适合多分类、大封面和批量更新 | 推荐 |

独立素材包默认不进入原全站搜索。原搜索继续只查询 `AR_CATALOG`；Photobash 页内搜索覆盖全部 Photobash 包。这是明确的首版范围，未来若要求全站联搜，再设计独立数据适配器，无需现在把素材包混入通用库。

## 6. 推荐数据模型与未来采集机制

### 6.1 独立数据模块

建议 `data/photobash/packs.js` 暴露 `window.AR_PHOTOBASH_PACKS`，保留需求中的七个字段：

```javascript
// 字段契约示意，非已采集记录。
{
  id: "",          // 稳定包 ID；优先关联官方稳定产品 ID
  titleEn: "",     // 官方英文标题
  titleZh: "",     // 本地中文译名
  categories: [],  // 官方分类 ID，可有多个
  image: "",       // assets/photobash/covers/ 下的站内相对路径
  sourceUrl: "",   // 规范化后的官方素材包地址
  tags: []         // 将来增加的更细本地分类标签
}
```

另用 `categories.js` 暴露 `AR_PHOTOBASH_CATEGORIES`，字段建议 `id/labelEn/labelZh/sourceUrl`，将官方分类定义与包的分类引用分开维护。官方分类即使暂时无包也保留；不要从“已抓到的包”反推全部官方分类。未来层级分类可增可选 `parentId`，细粒度本地标签放 `tags`，避免混淆官方分类。

本轮未访问 Photobash 官方网站、未抓取包或分类，因此不列出未经核验的分类名称、数量、分页规则或 API 地址，也不承诺既有技术方案可直接覆盖全部官方目录。

### 6.2 搜索、去重与本地图片

- 页面初始化时预计算检索文本：`titleEn + titleZh`（可附 tags），执行 Unicode NFKC、英文小写、首尾/连续空白归一化。查询也用相同规则；中文采用子串匹配，不自动承诺拼音、繁简转换或模糊搜索。
- 一个包只有一个稳定 ID 和一条实体记录，多分类合并到去重后的 `categories`；筛选时不会因为分类数重复显示卡片。
- 优先使用官方不可变产品标识生成本地 ID；若官方无稳定 ID，则以规范化 sourceUrl 首次分配 ID，并记录映射。后续改标题不改 ID，URL 迁移也应保留 ID；不要仅按标题或封面地址判重。
- URL 规范化规则需基于官方实际地址确认，过滤追踪参数，但保留区分产品所需参数。多分类遍历遇到同一包时合并分类；不同包即使同封面或同名也不自动合并。
- 图片放 `assets/photobash/covers/<稳定ID>.<ext>`，记录原始封面 URL 和校验信息到采集 manifest；避免用中英文标题直接作为文件名。渲染设置尺寸/宽高比、`loading='lazy'`、可读 alt 和加载失败占位。
- 素材量尚未测量，首版可本地数组筛选，之后按真实体量决定分页/渐进渲染；本地图片采用受控尺寸和压缩，避免原图体积扩大 Git 历史和首次加载量。

### 6.3 当前工具盘点

- 有 Python：`scripts/check-links.py`。它从 catalog 提取 URL，并发调用 curl 进行 HEAD/小范围 GET 检测，最后写 `docs/link-check.json`（`:8–27`）。它不是目录采集器、图片下载器或数据生成器，也不会验证页面正文语义。
- 有数据校验：`scripts/validate.mjs`，使用 Node vm 读取活动数据和审计映射，进行本地断言，不访问网络、不写入文件。
- 未发现仓库内独立网页采集器、封面下载脚本、可重跑的 catalog 生成脚本、定时更新配置或 GitHub Actions 工作流。
- `output/playwright/` 与外层 `.playwright-cli/` 说明保留了历史浏览器检查产物，不等于本仓库已配置可运行的 Playwright 采集工程或安装了对应依赖。

### 6.4 未来独立采集脚本

建议新增 `scripts/photobash/collect.py`，只操作 Photobash 专属数据与图片，禁止重建/覆盖 catalog 或旧快照。实施前先核验官方公开目录结构、可用接口、分类和分页方式以及公开预览图的使用条件；优先读取公开结构化接口或 HTML，只有实际需要客户端渲染时再评估浏览器工具依赖。

采集流程建议：

1. 获取官方分类定义，再遍历各分类全部分页，记录覆盖情况和错误；商品详情若仅为补齐元数据可按需读取，但本站不建立素材详情页。
2. 按官方产品 ID / 规范化 sourceUrl 汇总包，合并 categories，保留来源和首次分配 ID。
3. 将官方元数据与本地人工翻译覆盖表合并。`translations.json` 按稳定 ID 存中文名与人工 tags，重复采集不覆盖这些人工内容；未翻译可暂显英文并计入待办，最终双语验收再补齐。
4. 提供 dry-run（只列计划差异）、仅元数据、按需下载封面等模式；下载设置限速、超时、重试与断点记录，校验响应类型和实际文件后缀。
5. 在临时目录生成结果并校验后替换目标；输出新增、变更、缺图、未知分类和抓取失败摘要。不因某次分页失败将未出现记录自动删除，删除应经完整抓取比对后确认。
6. 固定排序、确定性序列化，二次无变化执行不产生数据差异；manifest 记录采集时间、schema 版本、产品标识、封面源 URL/校验值和失败记录。
7. 首期手动运行并审阅 diff；以后有明确需求再加入独立更新工作流。本轮不新增调度或自动提交机制。

建议另加只读 `scripts/photobash/validate.mjs` 检查字段、稳定 ID/URL 唯一性、分类引用有效性、本地图存在、路径不越界、数组去重及人工翻译覆盖情况。分类“全收录”的验证应对照官方分类快照和完整分页记录，不能只检查本地字段非空。

## 7. 预计新增文件（后续实施，当前均未创建）

| 路径 | 用途 / 阶段 |
| --- | --- |
| `photobash.html` | 根目录独立页面，复用公共外壳，不建详情页 |
| `css/photobash.css` | 带页面作用域的封面网格、筛选和搜索样式 |
| `js/photobash.js` | 独立渲染、双语搜索、分类筛选、计数和空状态 |
| `data/photobash/packs.js` | 独立包记录 |
| `data/photobash/categories.js` | 全部官方分类及双语标签 |
| `assets/photobash/covers/*` | 后续确认并采集的本地预览图 |
| `scripts/photobash/collect.py` | 后续手动采集与增量更新入口 |
| `scripts/photobash/validate.mjs` | Photobash 专属本地数据校验 |
| `data/photobash/translations.json` | 采集阶段的人工译名/标签覆盖表，不必由页面加载 |
| `data/photobash/manifest.json` | 采集阶段的来源、ID 映射与更新记录，不必由页面加载 |

运行时文件和采集维护文件分离。首版不必添加索引服务、数据库、构建工具、收藏、下载按钮、账户系统或详情路由。

## 8. 预计修改现有文件与应保持不变的文件

### 必需或按既有访问策略处理

| 现有文件 | 预计改动 | 范围控制 |
| --- | --- | --- |
| `data/navigation.js` | 在 `create.items` 新增带稳定 ID 的 Photobash 入口 | 不改现有 AR_VIEWS/资源引用；该文件当前已有未提交修改，必须基于工作区追加 |
| `js/navigation.js` | 补充独立页识别、所属 area 和高亮匹配；提供由当前入口派生区域标题的方式 | 保留原有 view 与兼容页面逻辑；不添加 Photobash 专属业务 |
| `js/auth.js` | 若沿用现有站点访问门禁，将 `photobash.html` 加入 `RETURN_PAGES` | 只增加返回目标白名单，避免访问验证后返回首页；不新增登录系统 |

现有首页与资源页有 `data-auth='protected'`，`auth.js:3–20,63–76` 限制访问验证后的返回页。需求“不需要登录功能”可以由“不新增 Photobash 登录功能，沿用站点已有访问方式”满足。建议沿用现有门禁；若后续明确要求 Photobash 无门禁公开访问，则新页不挂 protected 标记，也不需要改 auth 白名单，且当前共享导航不会注入全站搜索按钮，但本页独立搜索仍可工作。不要擅自删除现有门禁。

### 原则上保持不变

- `data/catalog.js`、`data/legacy.js`、`data/pages.js`、`data/resources/*`、`data/configuration.schema.json`：独立素材系统不需要修改通用实体、旧入口或配置 schema。
- `js/catalog-view.js`、`js/render-resources.js`、`js/resource-search.js`：保留通用渲染与全站搜索行为。
- `css/styles.css`、`css/resource-page.css`、`css/theme-arc.css`、`js/theme.js`：复用其现有能力，新增样式写在独立文件。
- 既有 HTML（含 `library.html`、14 个旧页面、`password.html`、`404.html`）：无需逐页添加入口，因为都读取共享导航。
- `docs/migration-map.json` 与既有历史审计记录：Photobash 不属于旧迁移来源，不应往其中补造素材包来源。
- `scripts/check-links.py`：继续检查原 catalog，不让本次功能扩大其覆盖或写入行为。
- `scripts/validate.mjs`：按推荐方案无需改变 465 实体 / 19 view 的基线；Photobash 采用单独校验。当前脚本虽会检查新增顶层 HTML 的静态 href/src，但**不检查导航数组中任意独立 href 是否存在，也不验证运行时图片路径**；新增校验应补上这些范围。只有未来选择将新校验统一调度时才另行评估此文件修改。

“可安全修改”指未来确认实施后的最小合理范围，不代表共享导航改动免回归；本轮没有修改上述文件。

## 9. 原有功能影响与风险

| 内容 | 预期影响 / 风险 | 控制与验证 |
| --- | --- | --- |
| 原导航 | 新增同级入口；共享识别逻辑改动可能造成错误区域、高亮、移动端标题 | 原 view 分支优先，独立页单独匹配；覆盖首页、19 个 view、兼容页及 404 |
| 区域第一入口 | 一级区域始终跳 items[0] | Photobash 不无意插到首项；未来移动明确保留顺序 |
| 原资源列表 | C 方案不增加实体、section 或原卡片 | 原 catalog、legacy、迁移映射不改；保留现有校验通过 |
| 全站搜索 | 仍只检索原 catalog；Photobash 包不在结果中 | 本页搜索单独标注范围，保留公共搜索入口；不污染 AR_CATALOG |
| 分类筛选 | 原站主要为锚点/领域切换，新页是实际过滤 | 独立 DOM/状态，不占用 AR_RESOURCE_SECTIONS/DOMAINS 等全局变量 |
| 样式 | 公共 CSS 中存在全局规则，新增通用类易相互覆盖 | 独立类名/页面作用域，专属 CSS 最后加载；检查桌面、平板、手机 |
| 访问返回 | 新页不在 RETURN_PAGES 时，验证后退回首页 | 沿用保护策略则补白名单，检查带 query/hash 的 returnTo |
| 静态路径 | 域名根路径或嵌套目录会破坏项目站点路径 | 根目录 HTML、同层相对引用，检查带项目名前缀的访问 |
| 图片 | 图片过大、失败或名称冲突会拖慢/破坏目录 | 本地受控封面、稳定 ID 文件名、延迟加载及占位 |
| 数据更新 | 分类遍历重复、译名被覆盖、部分抓取被当作删除 | ID 汇总合并分类、人工覆盖表、完整性记录与差异审查 |
| Pages | 源码兼容静态托管；实际发布源未知 | 确认 Pages 设置及新增目录随同发布，无需为功能本身引入构建 |
| 当前未提交改动 | 直接替换 navigation 或重建 catalog 会覆盖已有工作 | 保留工作区，只进行最小增量修改；本轮已列出基线 |

当前基线校验结果（只读运行）：

```json
{
  "result": "PASS",
  "sources": 499,
  "entities": 465,
  "mergedSources": 11,
  "views": 19,
  "legacyPages": 14,
  "activeURLs": 457,
  "confirmedCorrections": 43,
  "urlLessRecords": 11,
  "internalLinks": 208
}
```

这证明现有校验所覆盖的本地引用和迁移约束通过，不等于浏览器交互、官方数据完整性或线上部署已通过。本轮没有运行浏览器回归或远端发布验证，也没有对尚不存在的新页面进行测试。

## 10. 历史描述与当前代码差异

- `docs/architecture.md` 第一阶段写有 498 个来源映射为 489 个实体；当前工作区校验结果为 **499 来源、465 实体**。历史阶段数字不能当作当前总量。
- 同文第二阶段提及“其他 19 个视图”，即当时共 20 个；当前 `Object.keys(AR_VIEWS).length` 为 **19**。美术历史记录写 168 项，当前为 **162**。
- 同文第三阶段记载“7 个无 URL 记录”，当前为 **11**。`data/resources/README.md` 的 474 条是旧快照规模，不是活动资源规模。
- 架构文档提到“Art Notes、Photobash 保持原状”，但本仓库运行文件中未发现 Photobash 独立页面、数据模块或对应素材目录；不能据此认定已有可接入的实现。本轮只对当前仓库作结论，不推测其他项目目录。
- 历史“无构建、单实体库、旧资源快照不参与运行”的方向与当前代码一致。必须区分历史阶段统计和仍有效的架构规则。

## 11. 后续实施顺序

1. **先确认方案与边界。** 后续代码实施前提交简要理解及最小文件清单，等用户确认；本报告不视为实施授权。确认独立 `photobash.html`、C 方案、本页双语搜索范围、沿用站点访问门禁及默认单分类筛选。
2. **确认实际部署和官方数据结构。** 只读核验 Pages 发布源；探查官方分类、产品稳定 ID、分页和封面形式，形成字段/采集契约。
3. **最小导航适配。** 增加独立入口识别并以导航父关系派生区域；验证移动入口仅需调整一个配置对象，不影响现有 view。
4. **建立页面外壳与独立渲染。** 复用主题和移动导航，在独立 CSS/JS 中实现封面卡片、双语标题、搜索、分类与空状态；不新增素材详情页。
5. **建立数据校验和采集维护分层。** 明确 packs/categories/翻译覆盖表/manifest 的唯一写入职责；先 dry-run，再小批量验证去重、译名保留、本地图路径及失败恢复。
6. **完整收录与验证。** 按官方分类与完整分页记录核对覆盖，补译名、缺图；重复运行应保持 ID 稳定且无无意义 diff。
7. **回归并按现有发布流程交付。** 执行原只读校验与 Photobash 专属校验；浏览器检查原导航/搜索/兼容入口、新页直接打开、门禁返回、分类与搜索组合、空结果、封面失败、手机布局、项目路径及前进后退。是否发布或提交遵循届时用户授权，本轮不执行。
