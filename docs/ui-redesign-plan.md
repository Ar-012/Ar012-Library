# AR Library 新版 UI 架构方案审计

日期：2026-10-08。依据：当前正式代码、`docs/ui-ux-audit.md`、`docs/ui-ux-improvements-batch-1.md`、`docs/ui-ux-search-batch-2.md`。

推荐采用已确定的“深色一级图标栏 + 浅色二级导航栏 + 浅色主内容 + 深色紧凑 Header”。核心结构改为纵向 section、section 内资源 Grid。保留原生 HTML/CSS/JS、正式数据和现有 URL 模型。

本轮只分析并新增本报告。以下尺寸、交互与拆批均为未来实施建议，没有修改页面或制作运行原型；宽度是设计估算，实施时仍须浏览器验证。

## 1. 当前结构与新版目标

当前桌面：260px 单侧栏（≤1024px 为 240px），长期列出四区的 20 个 view；正文大 Header、页内目录、多个 section-card 横向 Grid，每个 section 内纵向资源链接。art 只渲染当前 domain，在正文提供 domain、group、section 入口。

当前手机：≤768px 固定 56px 顶栏，导航默认收起，搜索直接可达。全局搜索原生 dialog 已完成。第一批已移除 resize 重建资源 DOM，保持 section 顺序和容器驱动列数。

新版分工：一级栏表达 area；二级栏表达当前 area 的 view 和当前页面目录；正文表达内容。资源 Grid 从 section 容器下移到每个 section 的资源集合，不再用横向大 section 卡片承载纵向小卡片。

## 2. 四区、20 view 的真实映射

一级区域来自 AR_NAVIGATION；view 链接、顺序来自各区域 items；view 的 area、sections、domains 来自 AR_VIEWS。以下是审计快照，不是待新增的第二份导航配置。

| 一级区域 / ID | 二级 view，按现有顺序 | view 数 |
| --- | --- | --- |
| 创作与工作 / create | 美术与设计 art；3D 3d；游戏制作 game-production；AI ai；开发 development；音频与视频 av；工作与协作 work | 7 |
| 学习与研究 / learn | 美术 art-study；游戏设计 game-study；历史 history；音乐 music-study；开发学习 code-study；学习资源 research | 6 |
| 日常与生活 / life | 游戏 games；影视 film；音乐 music；日常工具 daily | 4 |
| 设备与环境 / setup | 软件 software；插件与扩展 extensions；系统与设备 system | 3 |

合计 20。学习区“音乐”与生活区“音乐”分别为 music-study、music，不能按名称推断 active 或合并。

当前 view 由 AR_ACTIVE_VIEW / 已解析的 view key 确定，当前 area 由该 view.area 确定。链接仍使用 items.href，不手写 20 个 href，不修改数据结构。

## 3. 一级图标栏与首页入口

推荐固定宽 68px，背景 #20242C，顶部放独立首页入口，下方四个 area 图标。沿用现有 Font Awesome，不增加图标框架；四区域的图标选择属于 UI 展示映射，不复制 view 数据。

area 入口采用普通站内链接，指向该区域 items 的第一个现有 view。点击即进入该区域真实页面，因此 area 高亮、view 高亮与正文始终一致；不增加 area 路由，不维护“导航浏览 area 与正文 area 不同”的额外状态，不加入最近 view 记忆。后续若想返回上次 view，应另行讨论。

当前 area 使用浅金图标、细侧标及深色底块共同指示。首页单独高亮首页，不伪造当前区域。图标入口具备完整 accessible name；hover 和键盘 focus 显示可见名称，不能只依赖 aria-label 或用户记忆。浮层放在滚动裁切之外，触屏展开菜单直接显示文字。

推荐点击目标约 44×44px；首页与四区视觉分隔，避免被理解为第五个区域。

## 4. 二级导航栏与长页滚动

≥1200px 固定在一级栏右侧，宽 220px，浅色背景。顺序：搜索 → 当前区域标题 → 当前区域 view 列表 → 分隔线 → 当前页面目录。

固定比 sticky 更适合当前站点：已有 sidebar 为 fixed，正文由 document 滚动；双栏高度与位置无需依赖正文容器，也不容易被现有祖先 overflow / transform 影响。

采用 flex 纵向布局：搜索与区域标题保持可见；view 列表和页面目录处于同一个可滚动主体，避免两层嵌套滚动。深页仍可搜索，并可在独立导航滚动区访问 view / section，不必将正文滚回顶部。view 列表不承诺永久占住屏幕上半部，以免 7 个 view 挤掉 art 目录。

导航主体使用 min-height:0、overflow-y:auto、100dvh 高度约束。滚动边界不带动正文。更新 active 样式不重建整条 sidebar，不因 hash 改变重置其 scrollTop；新页面正常初始化。没有自动 scroll spy。

## 5. 普通 view 的页面目录

普通 view 直接从当前 sections 生成目录，按原顺序显示 section 标题，可附资源数量。链接仍为 #section.id，名称、顺序及资源归属均不变。

例如 music-study 实际为：乐谱资源 4、音乐探索 2、音乐学习 4、音乐社区 2，共 12 个实体。生活区 music 则只有 1 个 section、2 个实体。

目录移到二级栏后，桌面正文删除重复的普通 section 目录行。手机统一菜单也包含该目录；正文保留 section 标题。目录可按明确 hash 标示目标，但不依据滚动自动高亮。无 hash 时不把第一个 section 假定为正在阅读。

## 6. art：只展开当前 domain

art 有 165 个映射、21 个 section。三个 domain：概念设计 6 sections；视觉设计 6 sections；设计参考 9 sections，其中服装与时尚 4、武器 5。

推荐二级栏“当前页面”始终列出三个 domain 标题，仅当前 domain 展开子项。非当前 domain 只保留一行链接，不展示所有 21 个 section。

概念设计、视觉设计的 group.title 为空，目录直接显示 section，不暴露 art-concept-group / art-visual-group 这类技术名称。设计参考展开后显示“服装与时尚”“武器”两行 group 标题，下面分别缩进 4 / 5 个 section。最多两层缩进，不再给 group 加第二套折叠状态；9 项可由 sidebar 独立滚动承载。

点击 domain：沿用现有 tab 语义，更新 domain hash 并切换正文，不产生默认锚点跳动。点击 group / section：由原 hash 解析找到所属 domain，渲染后定位对应节点。只有显式 domain 切换改变展示领域，不在页面目录里偷偷过滤资源。

推荐最终桌面和手机均以导航菜单中的 domain 入口为主，正文保留当前 domain / group 标题，移除重复 domain tabs、group 和 section 目录行。实施过渡批次可暂时保留正文 domain tabs，待导航事件迁移和 history 回归通过后再删除。

active domain 必须由现有 hash + sectionAliases 解析规则统一推导；hash 是 section / group 时也展开其所属 domain。无 hash 与未知 hash 继续使用现有默认概念设计规则。

## 7. 浅色主题与色彩关系

推荐暖灰正文，与现有暖金体系一致；避免将旧深色变量全部机械翻转。

| 用途 | 建议色值 | 使用原则 |
| --- | --- | --- |
| 一级栏 | #20242C | 深灰，承载区域图标 |
| 二级栏 | #ECEDEA | 比正文略深，轻边界分区 |
| 主背景 | #F5F4F1 | 暖白，去除全屏深色光斑与网格 |
| 资源表面 | #FFFFFF | 白色小卡，正文背景仍为暖灰 |
| 边线 | #D7DAD6 | section 分隔、卡片轻边框 |
| 正文标题 | #252B33 | 接近黑色 |
| 说明文字 | #59616B | 中灰，保留可读对比 |
| 浅色面链接 / 强调 | #86601F | 较深金棕，少量使用 |
| Header | #252D38 | 深灰蓝视觉锚点 |
| Header 标题 | #F4F1EA | 暖白 |
| Header 说明 | #BBC1CA | 较亮灰 |
| 深色面强调 | #D8B46A | 保留原金色 |

按上述不透明色计算：正文标题 / 暖灰约 12.97:1；说明 / 白约 6.27:1，说明 / 二级栏约 5.34:1；深金链接 / 白约 5.67:1；Header 标题约 12.32:1、说明约 7.67:1。实际 hover、透明度与图标仍需实施时核验。原 #D8B46A 不建议直接作浅色背景的小字号链接文字。

为深色 rail / Header 和浅色内容分别设置表面、文字、边框语义，避免一个 --arc-text 同时控制两种表面。js/theme.js 当前固定设置 obsidian；未来应使用明确的页面布局作用域，防止原 body[data-arc-theme="obsidian"] 覆盖新版 token。无需增加主题切换系统。

## 8. 紧凑 Header

保留 .content-header、.container、#page-title、#page-subtitle、#breadcrumb，以及 renderPageMeta 的内容填充。层级仍为标题、说明、面包屑。

目前最终主题为 padding 34px 0、标题 clamp(2.4rem,5vw,4.8rem)、大阴影和光斑。推荐桌面标题约 32–40px、上下 padding 20–24px、说明 / 面包屑间距 8–10px，整体高度目标约 140–170px；手机标题约 28–32px，允许换行，不设截断高度。

圆角约 16px、阴影极弱，保留小面积暖金装饰即可。取消大光斑、重模糊和夸张标题字距。Header 不 sticky，不覆盖内容；catalog-notice 保持正文中的简短统计 / 兼容说明。

## 9. Section 纵向流

#resource-root 改为普通纵向容器；每个 section 保留原 id，标题 + 当前资源数量 + 轻分隔线，然后是资源 Grid。section 之间约 28–36px 间距。

createSection 可以继续创建独立 section 容器，逐步换成语义 section 标签；不必先改所有 class 名。去除 .section-card 的表面、边框、阴影、整块 hover 和大内边距，使它成为内容分组而非大卡片。

Grid 应放在现有 .link-group 上，不再放在 .right-panel。保持 sections 顺序、resources 顺序和 DOM / Tab 顺序；不使用 dense、瀑布流重排或 resize 重新渲染。

art 的 domain-group 仍纵向组织，内部每个 section 同样使用资源 Grid；不把其内部 .right-panel 留成旧 section 横向 Grid。

## 10. Resource Grid 与卡片

推荐资源最小宽度 280px、间距 16px，沿用 repeat(auto-fit,minmax(min(100%,280px),1fr)) 原则，但应用层级换到资源集合。正文内容最大宽约 1440px，少量资源的 section Grid 可按当前实际资源自然展开；暂不引入额外列数算法。

卡片白色、1px 轻边框、10–12px 圆角、无阴影或极弱阴影。标题深灰、说明中灰，建议标题约 15–16px、描述约 13–14px、行高 1.45；不再在手机上缩到 .75rem 描述。

保留名称 / 描述原文、长文本 title、键盘 focus 时解除 clamp 的现有能力。Hover 只改变边框 / 背景，删除 translateX / translateY 动画。卡片高度随内容或展开区域变化，不固定高度截掉关系内容。

普通资源直接 a / div，附加信息资源用 resource-entry 包装。Grid 的直接子项可能是二者之一，因此外边框只能有一层：无包装时在 resource-link，有包装时在 resource-entry，内部主链接取消重复边框。不能把整张包装卡变成 a，也不能在主链接里嵌入关联按钮或 secondary 链接。

## 11. relatedResources、secondary、reviewNotes、无 URL

relatedResources 保留现有按钮、aria-expanded / aria-controls、hidden 面板和关系顺序。展开区放在卡片内部轻分隔线下，以 #F1F2EF 浅灰子区域承载标题和链接，避免第二层大卡片。保持普通卡片布局，不新增数量、关系逻辑、路由或弹窗。

secondary 保持现有“其他原始入口”文字和行为，放在主内容下方较小链接行；reviewNotes 保持原文，以中灰小字号换行展示，不做新的状态或警告体系。

无 URL 继续 div，不伪装外链，现有“暂未记录链接”照常显示；浅色边框和说明色即可。此轮方案不重新设计无 URL 语义或补链接。

展开一个关联卡片会增加该 Grid 行高度，同行短卡下方可能留空；接受普通 Grid 的取舍，不为此增加 Masonry。21 条关系全部保留。

## 12. 搜索复用

完整保留 js/resource-search.js 的匹配字段、排序、去重、placement 解析、catalog 按需加载、dialog、Enter / Escape 和焦点返回。

桌面按钮放在二级栏顶部固定区域。窄桌面二级栏收起时，按钮移到内容顶部工具条；手机继续顶栏直接可达。移动同一个 button，不复制第二个搜索入口或 dialog。

当前 placeTrigger 依赖 #library-sidebar、.logo-area，断点只区分 ≤768px。未来需要把“入口挂载位置”改为接收桌面搜索槽、窄屏工具条搜索槽，集中处理三个布局模式；dialog 仍挂在 body。不能移除原节点后继续让旧查询失败，也不能在每次 hashchange 重载搜索脚本。

搜索样式改用浅色 dialog 表面、深色文本和深金位置链接，仍限定宽高、结果区独立滚动。关闭后的按钮必须处于当前可见挂载位置；跨断点时也检查该条件。

## 13. 桌面与可用宽度

推荐 ≥1200px：一级 68px + 二级 220px，总占 288px。正文边距建议每侧 24px，Header 和资源共用同一内容宽度，不叠加目前 main padding 与 container padding 的多重缩进。

下面暂不扣浏览器滚动条，资源列数是宽度估算，不是 viewport 固定列数：

| 窗口宽 | 常驻导航 | 估算资源可用宽 | 280px 最小资源估算列数 |
| --- | --- | --- | --- |
| 1920 | 288 | 最大内容 1440 | 4 |
| 1366 | 288 | 1030 | 3 |
| 1200 | 288 | 864 | 2 |
| 1024 | 68 | 908 | 3 |
| 820 | 68 | 704 | 2 |
| 768 | 无，顶栏 | 736（每侧16） | 2 |
| 390 | 无，顶栏 | 358（每侧16） | 1 |

每个 section 少于列数时结果不同。最终列数由容器宽度和资源数量决定，实际卡片、图标与 disclosure 占用都需实测。

## 14. 1024 / 820 中间宽度

推荐 769–1199px：只常驻 68px 一级栏，二级栏默认收起。内容顶部保留紧凑“当前 view · 导航”和搜索入口；打开二级栏时在 rail 右侧覆盖正文，不挤压 / 重排资源 Grid。

1024px 如果常驻 288px 双栏，正文约 688px，通常仅两列；收起二级栏约 908px，可容纳三列约 292px 卡片。820px 常驻双栏正文约 484px，通常仅一列；收起后约 704px，可容纳两列约 344px 卡片。因此推荐 1200px 而非 1024px 作为完整双栏起点。

覆盖面板宽约 232px，顶部工具条可访问，Escape / 关闭按钮可关闭；view 跳转后新页默认收起，section 点击后关闭并再定位目标。初期不必引入遮罩模态或复杂焦点锁，但需明确展开按钮的 aria-expanded / aria-controls。

窄桌面工具条建议 sticky、约 56px，属于导航入口而非 sticky section 目录。定位锚点时需要考虑它的遮挡。断点切换只调整展示状态，不修改 URL，不重新创建资源 DOM。

## 15. 手机

≤768px 不保留固定图标 rail；沿用 56px 顶栏“当前 view · 导航 + 搜索”。菜单收起时正文占全宽。

同一个展开面板依次显示：首页入口、四区文字化入口、当前区域 view、当前页面目录。选其他 area 的入口仍进入其第一个 view；不另建 area 状态。art 目录仍只展开当前 domain，设计参考保留 group 层级。

面板最大高度 calc(100dvh - 56px)，只有一个纵向导航滚动主体；搜索继续在顶栏，不埋进菜单。Escape 关闭、焦点返回原导航按钮。section 链接关闭菜单后定位，不使目标落在顶部 56px 下方。

资源 Grid 继续由可用宽度决定，390px 一列，768px 可两列。若实测长名和关联按钮影响阅读，再调整资源最小宽度，不因“手机”标签强制恢复全站 4/3/2/1 规则。

## 16. 首页

桌面显示一级栏，首页入口高亮。二级栏顶部搜索，其下“资源目录”列四个带名称的 area 入口，均由 AR_NAVIGATION 生成；没有当前 view 或当前页面 section 时，不伪造 active 和目录。

首页搜索保持原按需加载 catalog。窄桌面 / 手机仍能从工具条直接打开搜索，菜单提供首页与区域入口。

现有首页标题、笔记、日期统计和快捷链接不改内容或顺序。未来仅把这些现有表面同步为浅色卡片，标题块可使用紧凑深色锚点；不增加推荐列表或重做首页布局。404 可复用无 active 的目录模式，不增加受保护搜索旁路；密码页不加载新版导航。

## 17. legacy 页面

推荐 A：14 个 legacy HTML 共用新版导航外壳和浅色资源布局，保留兼容提示与现有 canonical section 标题链接。避免维护另一套旧 sidebar / 主题。

但 legacy 可能跨多个新 area / view，当前 catalog-view 分支也没有 AR_ACTIVE_VIEW，因此不能根据旧文件名或第一个资源强行点亮某个 area。默认采用类似首页的四区目录，增加“当前兼容页面”目录；各 section 仍保留原 id 与进入正式 library view 的现有 href。

legacy 当前内容集合继续由 AR_LEGACY、allowed / seen 逻辑生成，不改去重、来源或数据。导航里的当前页定位链接指向本页 section，正文标题的 canonical 链接仍进入正式 view，两者用途清楚区分。

## 18. URL / history 与事件边界

必须保持：library.html?view、art domain / group / section hash、38 条 sectionAliases、back / forward、刷新、复制 URL、auth returnTo 和搜索 placement 跳转。

重要耦合：renderer 的 domain click 委托目前只识别 #section-index a，domain active 更新也查询这个节点。单纯把新链接放进 sidebar 不会复用现有 tab 行为。未来应迁移为明确的 domain 入口标记，并让正文过渡 tabs 与导航链接调用同一现有 domain 切换路径；不能复制第二份 hash 解析器。

domain 点击保持 preventDefault + 必要时 pushState + renderDomain，不触发原生锚点滚动；group / section 继续 hashchange 解析并先渲染所属 domain 再定位。保留 popstate 与 hashchange 的职责，避免新 click handler 再写一次 history。

aliases 继续 replaceState 规范化，不增加历史项。所有原 domain、group、section 目标节点必须继续存在。新增手机 / 窄桌面工具条后，统一给实际目标适当 scroll-margin-top：常规桌面约20px，顶栏模式约72px；不改 hash 名称。

授权脚本、密码 hash 和安全 return URL 白名单不应修改。站内导航仍是现有 HTML + query + hash。没有新页面，因此不需要扩大授权白名单。

## 19. 七个文件的复用与调整

| 文件 | 可复用 | 未来需要调整 / 可删除 | 不应动 |
| --- | --- | --- | --- |
| js/navigation.js | 数据迭代、createLink、普通 href、active 属性、移动开关基础 | 双栏 DOM、当前区域过滤、页内目录挂载、首页 / legacy 无 active 模式；删除永久堆叠四区20项的旧展示 | view ID、链接模型、导航数据顺序、受保护搜索加载条件 |
| js/render-resources.js | createResource、图标、外链、附加入口、关系按钮、page meta、hash / aliases / history | createSection 去大卡片视觉并增加数量；资源集合 Grid；domain 目录入口迁移；最终删除正文重复目录 | 关系数据及行为、目标ID、资源顺序、alias规范化、既有history语义 |
| js/catalog-view.js | catalog Map、selected view、areaTitle、legacy allowed / seen、悬空ID检查、AR_RESOURCE_SECTIONS | 目录生成从正文挂载移向导航；可传递派生目录模型；删除最终不再需要的正文目录 DOM生成 | data解析、view默认值、legacy集合、section.href、数据结构 |
| js/resource-search.js | 匹配、排序、去重、placement、catalog加载、结果DOM、dialog和键盘 | 单按钮三种布局挂载槽；更新依赖logo的placeTrigger和对应样式 | 搜索范围、排序规则、auth检查、无URL处理、现有placement URL |
| css/styles.css | reset、字体、基础布局、首页原内容类 | 双栏宽度 / main偏移、断点；删除冲突的旧单sidebar规则和位移动效 | 不改变首页内容，不为布局引入框架 |
| css/resource-page.css | 文本结构、图标、focus全文、关系面板、hash目标 | right-panel纵向、link-group Grid、统一卡片表面、浅色关系区域、scroll-margin；删除section-card旧卡片装饰及失效列规则 | 关系hidden/expanded可用性、长文本可读性 |
| css/theme-arc.css | 深色Header/rail设计语言、圆角、现有金色和搜索尺寸约束 | 拆分深浅表面token、浅色导航/内容；去全屏网格/光斑/重阴影；清理重复覆盖和旧手机规则 | 不扩展主题系统、搜索和手机入口可达性 |

CSS 当前加载为 styles → resource-page（资源页）→ theme-arc，三处存在重复 .content-header / .sidebar / .resource-link 规则。实施应明确每类规则的归属并清理冲突，不在末尾无限叠加覆盖。password 的全局主题引用也须做隔离回归，不能让新增浅色 token 损坏授权页。

## 20. 三个文本 wireframe

示意名称来自真实数据；[资源]不代表新增或修改实体。

### A. 普通桌面：学习与研究 / 音乐

```text
┌──────┬────────────────────┬─────────────────────────────────┐
│ 首页 │ 搜索资源…          │ 深色 Header                     │
│      │ 学习与研究         │ 音乐                            │
│ 创作 │ 美术               │ 学习与研究 · 个人资源与配置库    │
│ 学习*│ 游戏设计           │ 首页 / 学习与研究 / 音乐        │
│ 生活 │ 历史               ├─────────────────────────────────┤
│ 设备 │ 音乐 *             │ 浅色正文                        │
│      │ 开发学习           │ 乐谱资源 · 4 ──────────────     │
│      │ 学习资源           │ [资源] [资源] [资源]            │
│      │ ─────────────────  │ [资源]                          │
│      │ 当前页面           │                                 │
│      │ 乐谱资源           │ 音乐探索 · 2 ──────────────     │
│      │ 音乐探索           │ [资源] [资源]                   │
│      │ 音乐学习           │                                 │
│      │ 音乐社区           │ 音乐学习 · 4 …                  │
└──────┴────────────────────┴─────────────────────────────────┘
  深色    浅色 / 独立滚动        section纵向，资源横向Grid
```

### B. art：当前设计参考

```text
┌──────┬────────────────────┬─────────────────────────────────┐
│ 首页 │ 搜索资源…          │ 深色 Header：美术与设计         │
│ 创作*│ 创作与工作         ├─────────────────────────────────┤
│ 学习 │ 美术与设计 *       │ 设计参考（当前domain）          │
│ 生活 │ 3D / 游戏制作 …    │ 服装与时尚（group）             │
│ 设备 │ ─────────────────  │ 现代时装 · 数量 ───────────     │
│      │ 当前页面           │ [资源] [资源] [资源]            │
│      │ 概念设计           │ 历史服装 · 数量 ───────────     │
│      │ 视觉设计           │ [资源] [资源] …                 │
│      │ 设计参考 *         │ 风格与题材 … / 设计资料 …       │
│      │   服装与时尚       │                                 │
│      │     现代时装       │ 武器（group）                   │
│      │     历史服装       │ 品牌与官方 · 数量 ───────────     │
│      │     风格与题材     │ [资源] [资源] …                 │
│      │     设计资料       │ 其余武器sections纵向继续        │
│      │   武器             │                                 │
│      │     品牌与官方 …     │                                 │
└──────┴────────────────────┴─────────────────────────────────┘
  其他domain仅一行；当前domain展开；菜单可滚动，无全量树平铺
```

### C. 手机：默认收起 / 展开

```text
默认                           展开同一个导航面板
┌────────────────────────┐     ┌────────────────────────┐
│ 音乐 · 导航  │ 搜索    │     │ 音乐 · 导航  │ 搜索    │ 56px
├────────────────────────┤     ├────────────────────────┤
│ 深色紧凑Header         │     │ 首页                   │
│ 音乐 / 说明 / 面包屑   │     │ 区域：创作 学习*       │
├────────────────────────┤     │       生活 设备        │
│ 浅色正文               │     │ 学习与研究：           │
│ 乐谱资源 · 4 ──────    │     │ 美术 / 游戏设计 /历史  │
│ [资源]                 │     │ 音乐* / 开发学习 /资源 │
│ [资源]                 │     │ 当前页面：             │
│ …                      │     │ 乐谱资源 / 音乐探索    │
│ 音乐探索 · 2 ──────    │     │ 音乐学习 / 音乐社区    │
│ [资源] …               │     │ 独立滚动，点击后收起   │
└────────────────────────┘     └────────────────────────┘
  不常驻一级图标栏；搜索始终直接可达；390px资源一列
```

## 21. 实施风险与验证重点

| 风险 | 等级 | 触发点与验证 |
| --- | --- | --- |
| art domain / aliases / history | 高 | 新导航链接不再命中#section-index；验证3 domain、2有名group、21 section、全部38 aliases及back/forward/刷新 |
| 搜索按钮移动 | 高 | 旧logo查询失效、重复加载、关闭后焦点落在隐藏菜单；验证单button/dialog、三断点和跨断点焦点 |
| navigation active | 高 | 首页/legacy伪造区域、两个音乐混淆；遍历20view，每页恰一view及其area active，无active页单独验证 |
| mobile menu / hash目标 | 高 | 收起时序、56px遮挡、Escape冲突；深页导航/搜索、section定位、菜单收起和焦点返回 |
| CSS主题作用域 | 高 | obsidian强覆盖、浅色文字进入深色面、密码页连带变化；分别验证正文/rail/Header/dialog/首页/授权页 |
| resource Grid / DOM | 中 | Grid放错层、双边框、长名挤压、Tab错序；五尺寸加820、资源/section顺序、展开关系后尺寸 |
| relatedResources | 中 | 整卡a嵌套链接、按钮误开外站、hidden失效；Blender10条、Midjourney及无URL关系、resize状态 |
| sidebar scroll | 中 | 每次hash重建、目录太长、滚动穿透；深页切domain和菜单滚动，搜索保持可达 |
| legacy | 中 | 跨view来源误选active、丢canonical链接；14页资源集合/提示/标题链接/本地目录回归 |
| auth return URL | 中 | 新入口遗漏query/hash或搜索初始化提前；未授权view/domain/section回跳，不改白名单 |
| Header / hover | 低 | 紧凑高度截断、颜色对比或装饰冲突；长标题换行、focus、各表面色值回归 |

没有 scroll spy；active section 仅根据明确链接目标，不承诺随滚动更新。完整视觉与交互验收必须在未来实施后做，本报告不是已通过新版浏览器测试的证明。

## 22. 实施拆批与回退

推荐三批，art / 手机不是最后补丁，每批都覆盖其兼容路径。

**第一批：导航外壳与基础深浅表面。** 建立一级rail、二级当前区域view、三断点、首页/legacy无active模式、单搜索入口新挂载槽；设置浅色正文/导航和紧凑深色Header，给现有卡片最小浅色适配。普通section目录移入导航；art第一批保留正文原目录，二级栏显示当前domain提示，暂不迁移domain入口及事件。资源仍用现有section布局。

验证：20view、三断点+五指定窗口、首页/14legacy、搜索/授权、现有art全部hash回归，数据不变。该批可独立交付新版导航且旧内容仍可用。回退仅该批UI文件，不恢复或覆盖此前数据清理。

**第二批：纵向section与资源Grid。** 普通与art内部group一起切换到纵向section；统一有/无wrapper资源表面、关系/secondary/review样式、全文focus。保留第一批art正文目录。验证资源集合、顺序、容器列数、21关系、无URL和legacy；回退renderer及资源样式即可恢复第一批内容布局。

**第三批：art目录与导航入口收尾。** 新二级栏只展开当前domain、设计参考分group，迁移明确domain入口标记与现有renderer事件，统一active同步；删除正文重复tabs/目录。手机与窄桌面同步完成菜单关闭后的定位、scroll-margin、sidebar滚动和搜索跨断点焦点。验证38aliases、所有domain/group/section、history与搜索placement；回退本批目录/事件变更即可回到第二批稳定状态。

每批开始记录既有文件哈希/差异边界；每批运行validator、git diff --check、修改JS的node --check及实际浏览器回归。只允许UI实现变化，数据始终保持正式基线。不用全站重写或跨批修改数据换取通过。

## 23. 推荐第一批实际范围

优先批准导航外壳、基础浅色表面、Header与搜索入口适配这一个闭环。预计主要涉及 js/navigation.js、js/resource-search.js、js/catalog-view.js 的普通目录挂载，以及三个CSS文件；如确需页面级作用域，可最小调整HTML标记，但不重写页面模板。

art首次仅显示当前domain提示、保留旧正文tab运行链，不在同批新增第二套domain入口、改变资源布局或删除其原目录。renderer的domain事件迁移、资源Grid和最终去重目录留给后两批。

该范围的批准不代表批准后续批次，也不授权任何资源数据变化。本轮没有实施以上建议。

## 24. 数据不变性与本轮验证

本轮修改前保存全部既有项目文件SHA-256。完成后逐文件比对，既有文件无变化，唯一新增为 docs/ui-redesign-plan.md。既有未提交改动完整保留。

| 指标 | 本轮前 | 本轮后 |
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

node scripts/validate.mjs：PASS，退出码0。输出：

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

git diff --check：PASS，退出码0；新增报告另检查无行尾空白。

本轮未修改UI；未修改数据；未实施新版；未commit；未push。
