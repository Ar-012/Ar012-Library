# 网站使用体验审计 · 第一阶段

审计日期：2026-10-07。范围：当前代码与实际页面交互；只新增本报告，不实施优化。

## 1. 执行摘要

当前网站适合“知道资源大致属于哪个领域，再按分组打开”的使用方式。20 个 view 都能正常访问，实体共享与外链打开方式清楚，数据规模本身没有导致页面不可使用。主要短板是“只记得资源名称时找得慢”和“窄内容区、长页面及授权跳转打断浏览”。无需重新调整资源分类或重写网站。

本轮识别 P0：0 项；P1：4 项；P2：5 项；P3：0 项。P1 中搜索属于有价值的新功能候选，不是已有功能故障。

方法与边界：

- 阅读 library、首页、14 个 legacy 入口、授权页、404 页，以及全部运行 JS 和三份实际加载 CSS；数据只用于确认结构、规模和实例。
- 原始 localhost 页面实测未授权访问会转到 password.html。经用户明确允许，在独立 localhost 端口模拟已授权会话；测试服务器仅替换响应中的 auth.js，不修改任何项目文件。正式授权跳转另以原代码核对，未提交密码、未猜测凭据。
- 用真实浏览器遍历全部 20 个导航入口，检查 domain、section、旧 hash、刷新、前进后退、兼容页、未知 view、关联展开、键盘操作与六种窗口宽度。
- 未打开资源外链，未重做外链审计。字体和图标可能按页面原有设置请求 CDN；未进行搜索或资源身份核验。
- 事实分为浏览器实测、代码确定行为及体验判断；没有把布局判断当成用户行为统计。未做完整 WCAG、真机触控或跨浏览器兼容测试。

## 2. 当前页面架构

项目根目录有 18 个 HTML：index.html、library.html、password.html、404.html，以及 14 个旧入口。

| 入口 | 当前角色 |
| --- | --- |
| index.html | 首页，展示网站定位、更新时间、AR Art Notes 外链、音乐资源入口；完整侧边栏是主要导航 |
| library.html?view=... | 统一资源展示页；query 选择 20 个 view，读取同一 catalog，以 section 组织卡片 |
| password.html | 当天访问授权；授权标记存 localStorage，成功后跳首页 |
| 404.html | 独立错误页，侧边栏及返回首页链接；本地静态服务器不等于线上 404 路由配置 |
| 14 个 legacy HTML | 旧书签兼容页，仍显示对应历史集合中的当前实体，不自动重定向；section 标题可进入新目录 |

旧页为：3d-art、ai-art、concept-art、costume-fashion-design、daily-essentials、development、game-design、games、gun-design-reference、history、installation-software、video-film、visual-communication、work-tools-collaboration，各加 .html。

library 的运行链是 navigation / pages → catalog / legacy → catalog-view → render-resources。catalog-view 解析 ID，renderer 建 DOM，不需要后端、框架或 fetch 数据接口。

实测旧 3d-art.html 显示兼容提示，44 个当前实体，分类标题包含“区域 / view / section”路径并能链接新页。旧页没有当前 view 高亮，符合它横跨多个新 view 的现状，但用户需要读兼容提示才能理解。

证据：library.html；js/catalog-view.js:23、40；js/navigation.js:24；docs/architecture.md。

## 3. 当前导航模型与 20 个 view

四大区域在侧边栏中呈现为始终展开的分组标题，不是四个可切换的顶层 tab。切换区域实际是点击另一区域下面的 view 链接。不存在独立的 area query 或区域落地页。

| 区域 | view 参数 | UI 名称 | section 数 | view 内实体数 |
| --- | --- | --- | --- | --- |
| 创作与工作 | art | 美术与设计 | 21 | 165 |
| 创作与工作 | 3d | 3D | 5 | 47 |
| 创作与工作 | game-production | 游戏制作 | 5 | 23 |
| 创作与工作 | ai | AI | 6 | 23 |
| 创作与工作 | development | 开发 | 4 | 21 |
| 创作与工作 | av | 音频与视频 | 4 | 17 |
| 创作与工作 | work | 工作与协作 | 5 | 31 |
| 学习与研究 | art-study | 美术 | 3 | 5 |
| 学习与研究 | game-study | 游戏设计 | 1 | 5 |
| 学习与研究 | history | 历史 | 4 | 32 |
| 学习与研究 | music-study | 音乐 | 4 | 12 |
| 学习与研究 | code-study | 开发学习 | 1 | 4 |
| 学习与研究 | research | 学习资源 | 3 | 6 |
| 日常与生活 | games | 游戏 | 8 | 28 |
| 日常与生活 | film | 影视 | 5 | 10 |
| 日常与生活 | music | 音乐 | 1 | 2 |
| 日常与生活 | daily | 日常工具 | 6 | 26 |
| 设备与环境 | software | 软件 | 8 | 38 |
| 设备与环境 | extensions | 插件与扩展 | 2 | 6 |
| 设备与环境 | system | 系统与设备 | 2 | 5 |

实体可在不同 view 共享，同表数量不可相加当作 catalog 总数。art 的 21 个 section 不会同时显示；当前 domain 只显示其子集。

实际遍历 20 个入口全部正常渲染，均有且只有一个 sidebar-link.active，未出现资源加载失败提示。页面标题、副标题和面包屑提供区域 / view 信息。

桌面侧边栏固定宽 260px；≤1024px 为 240px，独立纵向滚动。全部导航高度约 1448px，因此普通笔记本需要滚动侧栏才能访问靠下区域。优点是导航不随正文消失；缺点是四组与 20 个入口不能在普通首屏同时看到。

当前层级是区域 → view → domain（仅 art）→ group（设计参考）→ section → 资源。面包屑只显示区域 / view，domain 用选中样式及正文标题表达；group / section 没有持续当前位置提示。进入长页深处后，桌面仍知道所属 view，但 domain / section 导航已滚出视口。

证据：data/navigation.js；js/navigation.js:7、37；css/styles.css:34、351。

## 4. view / domain / section 行为

view 链接是普通 a，进入 library 新文档，通常从页顶开始；不是客户端保留所有页内状态的 SPA。

美术与设计顶部三个 domain 入口为：

| domain | hash | 实体数 | section 数 |
| --- | --- | --- | --- |
| 概念设计 | #art-concept | 34 | 6 |
| 视觉设计 | #art-visual | 47 | 6 |
| 设计参考 | #art-reference | 84 | 9 |

设计参考另有“服装与时尚 / 武器”group 锚点；各 group 下再列 section 锚点和数量。其他 view 顶部直接列 section 锚点，通常不显示各 section 数量。

domain 入口虽然是带 hash 的 a，但普通点击被 preventDefault，使用 pushState 更新 hash，再重建当前 domain 内容。实测从顶部切到视觉设计：URL 更新为 #art-visual，scrollY 保持 0，没有跳到 domain 标题。符合此前“像 tab 切换、不是原生 anchor 跳转”的要求。hash 仍是 URL 状态载体，不应误认为“没有 hash”。

domain 切换不主动设置 scrollY；内容高度缩短时浏览器可能夹紧滚动值，因此不保证任意深度都能逐像素保持。导航本身不 sticky，深处操作前通常需要先返回顶部。再次点击已选 domain 也会重建内容，没有无变化短路。

section 是整组卡片容器，始终显示，不支持展开 / 折叠。普通页面 section 标题只是 heading，不是按钮；legacy 标题才是链接。顶部目录承担 anchor 导航。section 有稳定 ID 和 scroll-margin-top:20px；手动滚动不会更新 hash 或目录高亮。

实测点击“配色 (11)”后，#art-visual-color 对应 section 顶部约在视口 20px；刷新仍恢复该 section 与视觉设计 domain。旧 #section-0cbda6d3e3 被 replaceState 规范化为 #art-concept-images，没有新加历史步骤。

存在长页面：1366px 宽度下设计参考约 3611px 高，3D 约 2185px；手机 3D 约 4883px。没有回顶控件、固定页内目录或 section 折叠，不影响访问正确性，但连续浏览成本较高。

证据：js/render-resources.js:188、252、308；css/resource-page.css:294、302。

## 5. 资源卡片

普通实体是整张 a.resource-link：图标 → name → description。外部主链接 target=_blank、rel=noopener noreferrer。点击卡片主体打开主入口；无须寻找单独的小图标。

type、tags、sources 不显示，不存在类型 badge。不能把“数据有 type”理解成“UI 有 type 筛选”。普通卡片不展示 URL 字符串。

有 secondary、reviewNotes 或 relatedResources 时使用外层 resource-entry。related 资源的主 a 与展开 button 是同级，不存在 button 嵌套在 a 的问题。secondary 在卡片下面常驻，文本为“label · 其他原始入口”。

主要判断：

- name 较亮且加粗，description 较暗，视觉层级清楚；图标较小，不支配内容。
- 主链接整卡点击符合资源导航用途，hover 有背景 / 边框变化；active 没有专门自定义样式，普通 a 的 focus 依赖浏览器默认样式。
- name 和 description 均最多两行，超出截断；没有 title 或全文展开入口。布局不会轻易被长内容撑破，但完整说明可能无法在视觉界面读取。
- 1366px 的 3D 页面实测 Quixel Bridge 长描述被截断；这会遮住描述后段，不能假设弃用 / 迁移信息一定可见。未修改其 description。
- secondary 常驻能访问，但“其他原始入口”表达迁移来源，不表达“下载页 / 官网”等使用目的。字由、Steam、百度网盘尤其需要先打开链接才容易判断区别。
- 当前有 4 个实体带 secondary，9 个实体带 reviewNotes；不是每张卡都有大量说明。
- 11 个无 URL 实体用 div.resource-link，显示“（暂未记录链接）”，不参与链接 Tab 顺序，不会误开空地址。它沿用普通卡片 hover，视觉上仍像可点击项；部分还重复显示历史 reviewNotes。

密度的关键是内容区，而非窗口宽度。固定 sidebar、容器 padding、section padding 与关联按钮都会挤占资源正文。四列在大屏尚可，在普通笔记本明显偏窄；建议后续按可用内容宽度或最小卡片宽度优化，不动资源顺序或分类数据。

证据：js/render-resources.js:22–140；css/resource-page.css:140–172；css/theme-arc.css:300。

## 6. relatedResources 专项

当前 10 个实体有关系，共 21 条边；Blender 为 10 条，Midjourney页面端为 3 条，其余各 1 条。当前没有恰好 2 条的实例；对“1～2 条”的评价以 1 条实测及相同列表结构判断。

展开按钮在主卡片最右侧，只在解析到有效关系目标时出现。可见内容仅为 ⌄，没有数量；aria-label 明确说明展开哪个资源的相关资源。

按钮实测为 40px 宽、44px 高，aria-expanded、aria-controls 与 hidden 面板一致。Enter 可展开，Space 可收起，focus-visible 有金色 2px outline。主卡片与按钮互不抢点击。

展开后为“相关资源”标题加 ul 名称列表；关联目标有 URL 时直接外链打开，没有 URL 时是 span。不展示 description、type、图标或关系用途，也不递归展示关联。

适用性：

- 1～2 条：紧凑卡内列表足够，展开成本低，不需要弹窗或详情页。
- 10 条：仍能使用，但识别目标较依赖名称。1366px 下 Blender 整个展开项约 388px，面板约 308px；连续浏览时会显著拉长所在列。建议先显示数量、改善列表阅读及按需提供简短用途，不急于换成复杂面板系统。

可以同时展开多张卡，实测 Blender 与 Gaea 同时展开正常，无覆盖或嵌套浮层；高度在各自列内增长。展开后不重新平衡瀑布流列，所以会出现列高度差，不是内容丢失。

状态：普通非 art 的 section 锚点切换保留展开；再次点击可收起；刷新、切换 view 或跨列数断点会重建 DOM，展开归零。实测 3D 从四列到两列后，原来两张展开项都收起。当前不持久化此状态，刷新重置合理；resize 导致重置则是值得修复的打断。

当前 art 三个 domain 没有 related 资源，不能把 domain 切换时“关联状态丢失”写成已发生的实例；其重建 DOM 机制已确认。

证据：js/render-resources.js:58–119、166、326；css/resource-page.css:311–324。

## 7. URL / history / scroll

| 状态 | 当前实现与判断 |
| --- | --- |
| ?view= | 唯一被 catalog-view 消费的 query；没有 view 时默认 art |
| 其他 query | 没有当前搜索、筛选或 domain 的 query 逻辑；传入参数不代表有对应能力 |
| domain hash | 选择 art 内部 domain；普通点击 pushState，阻止原生跳转 |
| group / section hash | 锚点定位；art 会先选择包含目标的 domain |
| replaceState | 将已有 sectionAliases 的旧 hash 规范化，不增加一次历史步骤 |
| back / forward | art 监听 popstate 与 hashchange，重绘匹配 domain；普通文档导航由浏览器处理 |
| 刷新 / 复制 URL | 已授权状态可恢复 view、domain、section；不保存 related 展开、sidebar scroll 或任意正文浏览进度 |
| 未授权打开深链接 | 跳 password.html 时没有保存 return URL；成功后只到 index.html |

实测视觉设计 → 配色 section → 后退 → 前进 → 刷新，domain 和 section 均正确；后退一次的 scrollY 为 77，前进并刷新 section 后为 451，section 顶部约 20px。不能据此承诺后退始终恢复原先的逐像素 scrollY；浏览器恢复与重绘都参与。

刷新不带 section hash 的任意滚动位置，没有应用层保存保证；浏览器可能自行恢复。复制链接到新标签不会携带这种任意位置。手动滚动到其他 section 不更新 hash，复制链接表达的是上次锚点 / domain 状态，而非视口所在资源。

未授权深链接丢失是确定问题：原始 localhost 浏览器实测 library?view=art 转为 password.html；auth.js:40 不带返回地址；password.html:317 成功后固定 index.html。跨天或新浏览器打开收藏的精确 URL，会多一次重新寻找。

未知 view 实测显示“未找到分类 / 该分类不存在或尚未建立”，资源区空，仍可使用侧边栏；没有误显示错误 view。未知 hash 代码回退默认概念设计或不定位，缺少专门反馈。数据加载失败有可见提示，内容为“请检查当前页面的数据文件”，没有用户级重试动作；当前正常基线未触发此异常。

## 8. 搜索 / 筛选 / 收藏现状

| 能力 | 当前状态 |
| --- | --- |
| 全局搜索 | 当前不存在 |
| 当前 view 搜索 | 当前不存在 |
| tag 筛选 | 当前不存在 |
| type 筛选 | 当前不存在 |
| 收藏 | 当前不存在 |
| 常用列表 | 当前不存在 |
| 最近访问 | 当前不存在 |
| 搜索历史 | 当前不存在 |

现有 localStorage 只服务每日授权，不是收藏或搜索。首页音乐快捷入口是固定链接，不是动态常用列表。浏览器 Ctrl/Cmd+F 可以查当前已渲染文本，但不能搜索其他 view、未显示的 art domain 或折叠关联内容。

对 470 个资源，最高价值的新功能候选是轻量跨 view 名称 / 描述搜索，结果提供当前位置和直接打开能力；应直接用现有 catalog，不复制资源或引入搜索后端。当前 view 搜索可作为同一能力的范围选项，无须做两套系统。

type / tag 筛选只有在搜索结果仍难缩小时才值得做，不能因为字段存在就暴露全部标签。收藏、常用、最近访问和搜索历史先验证真实频率；当前网站本身就是精选收藏库，再加完整收藏系统可能增加维护成本。可以讨论少量个人常用入口，但本轮不实现。

## 9. 响应式

CSS 资源列数按整个 viewport 断点：>1200px 四列，993～1200px 三列，769～992px 两列，≤768px 一列。每个 group 的列数还不超过其 section 数。

以 3D 为统一实例，调整 viewport 后刷新，确认初次渲染已使用正确断点；单位 px，数值为当前浏览器近似值：

| 窗口 | 列数 | sidebar 宽 / 高 | section 宽 | Blender 主链接宽 | 首个资源距文档顶部 |
| --- | --- | --- | --- | --- | --- |
| 1920×1080 | 4 | 260 / 1080 | 330 | 246 | 444 |
| 1366×768 | 4 | 260 / 768 | 233 | 149 | 436 |
| 1024×768 | 3 | 240 / 768 | 210 | 126 | 419 |
| 820×1024 | 2 | 240 / 1024 | 223 | 139 | 410 |
| 768×1024 | 1 | 全宽 / 512 | 673 | 593 | 917 |
| 390×844 | 1 | 全宽 / 422 | 295 | 221 | 853 |

Blender 主链接宽还包含图标与内边距，实际正文更窄。普通笔记本四列与 1024px 三列的可读性明显比列数暗示的差；这不是所有资源都能在两行中充分表达的布局。

手机已做到单列、卡片换行、domain tabs 自动折行，内容不是桌面固定宽度硬缩小。六种尺寸中 document scrollWidth 均未超过 viewport，未实测到整页横向滚动；正文有 overflow-wrap，related / secondary 也能断行。theme 的 body overflow-x:hidden 会隐藏溢出，因此“没滚动条”不能替代全部元素检查。

≤768px sidebar 变为正文前的相对定位区域，最多 50vh，内部仍要滚动，不是抽屉或收起菜单。390×844 首次进入 3D 时第一张资源位于约 853px，首屏主要是导航和页头。浏览资源到深处后，导航也不再固定；换 view 需要回到顶部。这是当前手机适配的主要效率问题。

标题实际由最后加载的 theme-arc.css 覆盖，仍使用 clamp(2.4rem,5vw,4.8rem)，不会简单采用 resource-page.css 中手机 1.5rem 的规则。页面开头留白和大标题也占用可用于资源的高度。

项目文档没有明确承诺移动端优先；现状是桌面为主、手机可用的自适应实现。本轮不将移动端优先设为目标，只建议把现有手机入口做得更省空间。

## 10. 可访问性与基本交互质量

已有的正确做法：

- 外链主卡片和 secondary 使用 a；related 展开使用原生 button；无 URL 资源用非交互 div / span，没有需要模拟点击的 div。
- 关联按钮 aria-expanded / aria-controls / 动态 aria-label 一致；隐藏列表不参与可见浏览，键盘 Enter / Space 均可操作。
- domain 链接有 aria-current 和 focus-visible；view 有 aria-current=page；所有 HTTP(S) 资源外链均设置 target / rel。
- 当前主要信息不依赖 hover 才出现，名称和描述常驻；没有要求鼠标悬停才能发现所有功能。

值得改善的地方：

- sidebar 是 div 而非有标签的 nav；无跳到主要内容的 skip link。键盘进入正文前要经过 logo 和 20 个 view，重复导航较长。
- logo 与正文各有 h1，sidebar 分组使用 h3；整体 heading 层次能读，但不够利于快速按主内容浏览。
- domain 的行为像 tab，语义仍是普通链接。链接语义本身不是不可访问，不应只加 role=tab 而不补键盘和 panel 关联。
- 普通资源 a 没有统一自定义 focus-visible，但浏览器默认 focus 未被全局清除；不能报告“完全没有键盘焦点”。
- 长名称 / description 截断后没有视觉全文入口；屏幕阅读器仍可读 DOM 文本，视觉用户却不能完整展开。
- related 按钮只有箭头，不显示“相关 10 项”等数量；新使用者不容易预估展开后内容。
- 无 URL 卡片沿用 hover 效果；reviewNotes 有时与无链接提示重复。secondary 的“其他原始入口”是维护视角文案。

暗色主题主标题和金色链接能识别，描述较小且较淡。未发现足以判为 P0 的明显对比度问题；不声称通过完整对比度或 WCAG 检测。资源图标 alt 会与名称重复进入可访问名称，属于可后续精简的小项。

## 11. 问题分级

### P0：0 项

正常基线下未发现页面不可使用、view 错配或资源打不开的 UI 功能错误。此结论不包括未访问的外部网站可用性，也不保证所有异常环境。

### P1：4 项

| 编号 | 问题与触发 | 日常影响 | 性质 / 证据 |
| --- | --- | --- | --- |
| P1-01 | 每日授权失效后打开具体 view/domain/section，返回地址丢失 | 授权后回首页，重新找原目标 | 现有状态问题；原始浏览器跳转、auth.js:40、password.html:317 |
| P1-02 | 记得资源名字但忘记分类，当前没有跨 view 搜索 | 470 个资源需靠分类记忆逐页寻找，浏览器查找覆盖不全 | 效率能力缺口；新功能候选，非已有功能故障 |
| P1-03 | 普通笔记本 / 窄内容区仍按 viewport 维持四 / 三列 | 卡片正文窄，长名称和关键描述截断且无全文入口 | 浏览器尺寸实测；resource-page.css:193、theme-arc.css:300 |
| P1-04 | 小屏 sidebar 占半屏，长页页内导航不持续可达 | 首屏看不到资源，深处换 view/domain/section 需回顶 | 390×844 实测及 CSS；不要求改分类 |

### P2：5 项

| 编号 | 问题 | 判断与证据 |
| --- | --- | --- |
| P2-01 | 关联入口只有箭头，10 项列表仅名称 | 1～2 项设计合适；Blender 10 项能用但缺数量和用途，展开较长；实测面板约 308px |
| P2-02 | 跨列数断点重建 DOM，清空展开 / 可能丢失焦点与位置上下文 | 展开重置已实测；精确 focus / scroll 恢复无实现保证；不要求刷新后永久保存全部状态 |
| P2-03 | 瀑布流的 DOM / Tab 顺序与顶部 section 目录顺序不同 | 分配后按列遍历，例如 3D“软件与工具 → 教程与社区 → 手册与插件”；对键盘和从目录转正文扫描不够直观 |
| P2-04 | secondary / reviewNotes / 无 URL 的表达偏维护视角 | “其他原始入口”不表达用途，无链接卡片 hover 类似可点击；可改渲染文案与样式，不改实体数据 |
| P2-05 | 主内容快捷跳转、当前位置与异常反馈不充分 | 缺 skip link / sidebar nav landmark，section 滚动不高亮，未知 hash 默默回退，加载失败提示面向维护者 |

### P3：0 项

不为装饰性修改凑问题数量。主题、动画、图标和首页视觉不作为本轮优先事项。

## 12. 候选优化方向

| 类别 | 候选方向 | 范围限制 |
| --- | --- | --- |
| A 修复现有问题 | 授权流程保留安全的站内 return URL；跨断点重排保留展开与可解释的位置 | 不改变资源数据、密码规则或外链 |
| B 小幅体验优化 | 按正文可用宽度设置最小卡片宽度；提供全文阅读；小屏导航可收起；页内目录保持可达 | 保留 20 view、domain 和 section 的现有模型 |
| B 小幅体验优化 | 关联按钮显示数量；长列表增强可读性；优化 secondary 和无链接状态；skip link | 使用现有实体字段，先处理当前明确实例 |
| C 新功能候选 | 轻量跨 view 搜索，名称 / description 匹配，结果附位置路径 | 直接复用 catalog，暂不增加后端、搜索库或复合筛选 |
| C 待观察候选 | 少量常用入口、type 筛选 | 有持续使用证据后再决定，不自动连带收藏 / 最近访问 / 历史 |
| D 不建议做 | 为此更换框架、引入 SPA / 后端 / 数据库 / 登录系统，或重新调整信息架构 | 当前可用性瓶颈并不需要这些投入 |

## 13. 明确不建议做的事情

不重新分资源、改 migration / corrections / retired、补空 URL、重做外链审计；不把 UI 反馈问题转成数据清洗任务。

不一次性上全套收藏、标签、常用、最近访问、搜索历史和高级筛选；不要同时制造多个找资源入口再要求用户学习。

不把所有 section 默认折叠来压缩长页，那会把浏览变成连续点开；不为 10 项关联立即引入详情路由或大型弹窗；不把 hover 动画和主题更换当作效率优化。

不让 domain 点击重新变成原生锚点跳转，也不为了 tab 外观删除可复制的 URL 状态。保持现有简单静态架构。

## 14. 推荐下一步与不变性

建议下一轮先处理范围明确的现有交互问题，再单独评审轻量搜索；实施前确定成功标准：授权后回到原站内地址、笔记本卡片能读清名称和说明、小屏一次操作即可访问导航。不要把本报告全部候选自动视为实施授权。

本轮只新增 docs/ui-ux-audit.md。修改前后全部既有项目文件 SHA-256 对照一致，没有修改代码、样式、HTML 或数据。catalog、navigation、legacy、migration、corrections、retired、relatedResources 与此前报告完整不变。

正式基线保持：470 entities、498 sources、11 mergedSources、17 retired、20 views、463 activeURLs、11 NO_ACTIVE_URL、43 corrections、21 关系边、14 legacyPages；art mappings 165、internalLinks 209。node scripts/validate.mjs 为 PASS，git diff --check 为 PASS。未 commit，未 push。

如果只允许先改 3 件事：**保留授权后的原目标地址；改善卡片可读性与导航可达性；增加轻量跨 view 搜索。**
