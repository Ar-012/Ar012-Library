# AR Library 新版 UI · 第一批实施

执行日期：2026-10-08。依据：`docs/ui-redesign-plan.md` 及前三份 UI / UX 审计、改进报告。

第一批已完成：双层导航外壳、三档响应式、搜索入口适配、基础浅色主题、紧凑深色 Header、首页 / legacy 兼容和普通页面目录。浏览器回归、数据不变性、validator、JS 语法与 diff 检查均通过。

## 1. 实际修改范围

修改四个既有文件：js/navigation.js、js/resource-search.js、css/styles.css、css/theme-arc.css；新增本报告。

未修改 HTML、css/resource-page.css、js/catalog-view.js、js/render-resources.js、auth、password 或任何 data / migration / validator 文件。

section 与 resource 的布局层级、DOM 顺序和 Grid 所属层级保持原样。本轮资源内容仅做基础浅色兼容。

## 2. 一级 area rail

使用 AR_NAVIGATION 动态生成四个区域，href 取各区域 items[0].href；顶部另有首页入口。没有硬编码 20 个 view，没有新增 area query、页面或记忆状态。

rail 固定宽 68px、背景 #20242C。主要点击目标 44×44px，图标沿用 Font Awesome；图标选择是 UI 映射，不写入数据。

当前 area 具有暖金图标、较亮底色、左侧细标记。链接有完整 aria-label，hover / keyboard focus 显示区域名称；实测键盘焦点下“学习与研究”名称可见。首页只高亮首页。

## 3. 二级导航

桌面固定在 x=68，宽 220px，高 100dvh，背景 #ECEDEA。

顶部搜索槽固定在导航滚动主体之外；主体依次显示当前区域标题、该区域 view 列表、当前页面目录。主体使用 flex、min-height:0、overflow-y:auto、overscroll-behavior:contain，只有一个主要导航滚动区。

不再同时堆叠全部四区 20 个 view。当前 view 使用白色底、小面积金棕侧标和较粗文字。普通 hash 点击不重建 sidebar 或资源 DOM。

## 4. 普通 view 的 section 目录

从现有 AR_RESOURCE_SECTIONS 读取 section ID、标题和资源数量，生成本页 #section-id 链接。

目录挂载成功后，通过页面 class 与 CSS 隐藏正文 #section-index，保留其原 DOM 和全部 section 标题 / target。没有为删除重复目录改写 catalog-view 或 renderer。

窄桌面 / 手机点击 section 会收起菜单，然后继续浏览器原有 hash 定位。已有目标使用 scroll-margin-top:72px，避免被 56px 工具条覆盖。实测 1024 / 820 的教程与社区目标顶部约72px；390px 受页面末尾可滚动距离限制约127px，均在工具条下方。

## 5. art 第一批兼容

art 二级栏只显示“当前领域：概念设计 / 视觉设计 / 设计参考”，没有完整目录树。

提示直接观察已渲染的 domain 标题，不新增 hash 解析器。正文三 domain tabs、group / section 目录全部保留。

未修改 domain click handler、history、sectionAliases 或 art renderer。二级栏状态跟随实际渲染结果，包括 section、group 和旧 alias 进入的领域。

## 6. 三档响应式

- ≥1200px：68px rail + 220px 固定二级栏，正文 x=288，无顶部工具条。
- 769–1199px：保留 rail，正文 x=68；56px 顶部工具条含导航按钮和搜索。二级栏默认收起，展开为 rail 右侧、工具条下方的 232px 覆盖面板。
- ≤768px：隐藏固定 rail，正文 x=0；保留56px顶栏。展开同一个导航面板，显示首页、四区文字入口、当前区域 view、当前页面目录。

首页 / legacy 的手机面板使用其四区资源目录，隐藏重复区域列表，仍保留首页入口。

覆盖面板不推挤正文。跨断点重置展开状态，不改 URL、不重建资源。Escape 关闭导航并返回导航按钮；正常 view 跳转后新页默认收起。

## 7. 搜索入口适配

搜索脚本只修改按钮挂载位置：≥1200px 放 navigation-search-slot，其余尺寸放 toolbar-search-slot。通过 DOM 移动同一个按钮。

匹配、排序、去重、placement、catalog loading、dialog、Escape 和焦点返回语义保持。始终只有一个 trigger、一个 dialog。

实测 dialog 打开时跨1366→1024→390，关闭后焦点返回当前可见的工具条搜索按钮。搜索不要求先展开菜单。

## 8. 浅色主题与 CSS 作用域

正文 #F5F4F1；二级栏 #ECEDEA；资源表面白色 / 极浅灰；标题 #252B33；说明 #59616B；浅色链接金棕 #86601F。深色 rail 为 #20242C，Header 为 #252D38，深色面金色 #D8B46A。

theme-arc.css 改为新版表面与视觉规则，使用 library-shell 作用域；去除旧全屏网格、深色光斑和重阴影。没有 filter / invert，没有 !important。

styles.css 承担新版 shell 的固定位置、尺寸、滚动和断点；resource-page.css 保持原资源结构；theme-arc.css 负责颜色与基础视觉。保留未影响新版的旧基础 / 首页规则，通过明确作用域覆盖冲突，没有为清理代码扩大重写范围。

js/theme.js 仍设置原 obsidian 属性；新版表面由 library-shell 定义，不再被旧 obsidian 视觉覆盖。密码页没有此 shell class。

## 9. 紧凑 Header

保留 .content-header、.container、#page-title、#page-subtitle、#breadcrumb 和 renderPageMeta。

Header 使用深灰蓝、16px圆角、桌面上下22px padding；标题32–40px、手机30px，正常换行。去掉大光斑、重 blur、巨大字距和重阴影。

实测3D Header：桌面约150–154px，窄桌面约145px，手机约138px。Header没有固定高度或文本裁切，也不 sticky。

## 10. 旧资源布局浅色兼容

section-card 继续参与外层 Grid；link-group 继续纵向资源排列。没有把 Grid 下移到资源集合。

旧 section 卡片与资源链接改为浅色表面、轻边框、深色标题、中灰说明、小面积金棕图标。Hover 只改变背景 / 边框，不再 translateX / translateY、强 glow 或重 shadow。

原名称 / 描述、长文本 title、键盘 focus 全文、资源顺序、外链与附加入口结构均保持。relatedResources 仅调整浅色对比。

## 11. 首页

桌面 rail 只首页 active；二级栏为搜索 +“资源目录”四区入口，没有假的当前 view。

四区 href 分别从正式 navigation 首项生成：首页搜索按需加载 catalog，实测 Blender 得到8条结果。

首页现有标题、笔记、日期和快捷链接未改内容、顺序或模块；仅同步浅色卡片及紧凑深色标题区域。

## 12. legacy

全部14个legacy页面共用新版shell与主题，均无假area / view active。二级栏显示四区资源目录和当前兼容页面目录。

浏览器逐页采集当前资源ID及canonical标题链接，再与AR_LEGACY和现有view遍历 / 去重规则精确比较，全部一致。兼容提示仍在，canonical链接均保留。

| legacy 页面 | 实体数 | canonical / 本页目录数 |
| --- | --- | --- |
| 3d-art | 44 | 7 |
| ai-art | 20 | 6 |
| concept-art | 46 | 14 |
| costume-fashion-design | 44 | 4 |
| daily-essentials | 35 | 12 |
| development | 19 | 5 |
| game-design | 23 | 6 |
| games | 27 | 7 |
| gun-design-reference | 40 | 5 |
| history | 35 | 6 |
| installation-software | 35 | 17 |
| video-film | 9 | 4 |
| visual-communication | 39 | 8 |
| work-tools-collaboration | 42 | 9 |

AR_LEGACY、allowed / seen、资源集合及旧HTML均未修改。

## 13. password / auth

password.html和auth.js逐字节不变。密码页未加载新版shell，背景仍为原深色，搜索入口为0；没有被浅色token破坏。

使用已授权的独立localhost测试会话和临时凭据，正式密码hash不变。实测未授权进入3D以及art section，完成测试授权后恢复原站内地址。

art返回结果为 library.html?view=art#art-visual-color，视觉设计领域、二级栏提示与目标section均正确，手机目标顶部约72px。每日授权、returnTo安全校验与白名单均未修改。

## 14. 七种窗口实测

下表测量3D页面，Header约数单位px；正文x为main-content左边界。资源列数仍由原section Grid容器决定。

| 窗口 | rail | 二级栏初始状态 | 工具条 / 搜索 | 正文x | Header高 | section列数 | 横向溢出 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1920×1080 | 68px | 固定220px | 无工具条；搜索在二级栏 | 288 | 154 | 4 | 无 |
| 1366×768 | 68px | 固定220px | 无工具条；搜索在二级栏 | 288 | 154 | 3 | 无 |
| 1200×800 | 68px | 固定220px | 无工具条；搜索在二级栏 | 288 | 150 | 2 | 无 |
| 1024×768 | 68px | 收起，展开232px覆盖 | 56px；搜索在工具条 | 68 | 145 | 3 | 无 |
| 820×1024 | 68px | 收起，展开232px覆盖 | 56px；搜索在工具条 | 68 | 145 | 2 | 无 |
| 768×1024 | 隐藏 | 收起，展开全宽 | 56px；搜索在工具条 | 0 | 138 | 1 | 无 |
| 390×844 | 隐藏 | 收起，展开全宽 | 56px；搜索在工具条 | 0 | 138 | 1 | 无 |

七尺寸均实际打开搜索、查询Blender、Escape关闭：trigger与dialog各1，结果8，面板无横向溢出，焦点返回搜索按钮。

桌面固定栏与正文不重叠；中等宽度与手机只有展开的菜单按设计覆盖正文，关闭后没有残留遮挡。菜单展开前后正文x和Grid列宽一致。

测试初始旧端口曾命中旧styles.css缓存；换用未缓存的独立8768端口后完成正式测量，没有为测试缓存问题改资源URL或HTML引用。

桌面实测：

![1366px：双层导航、紧凑Header和Blender关联展开](/tmp/ui-redesign-batch-1/desktop.jpg)

窄桌面覆盖导航：

![1024px：导航覆盖正文，资源列宽保持不变](/tmp/ui-redesign-batch-1/tablet.jpg)

手机实测：

![390px：导航收起、搜索直接可达、学习区音乐页面](/tmp/ui-redesign-batch-1/mobile.jpg)

## 15. 20 view 回归

在1366、1024、390三档逐一遍历全部20view，共60次检查。每页rail中的正确area active恰1、当前区域view active恰1；手机区域列表标识与当前view一致。无资源加载错误或横向溢出。

二级view数量按区域分别为7、6、4、3。music-study高亮学习与研究 / 音乐（6项view）；music高亮日常与生活 / 音乐（4项view），三档均未混淆。

## 16. art URL / history 回归

实测三个domain、服装与时尚和武器两个group、art-visual-color section、旧section-2dbbd8e1b3 alias，全部进入正确领域与原目标。alias继续规范化为art-visual-color。

正文domain点击仍作为tab更新hash，实测切视觉设计时scrollY=0；点击配色section、back、forward、refresh均正常。刷新后桌面目标顶部20px；手机授权返回后约72px。

正文domain tabs仍为3个，设计参考仍有2个group，art二级栏完整section树数量为0。未增加第二套事件或路由，复制URL仍为原query+hash形式。

## 17. 搜索与导航交互回归

在桌面、窄桌面、手机分别实际测试：Blender8条、字体10条、地形生成2条、无结果0条、空输入0条、hdrlabs1条。无URL名称仍为span，提示和结果语义保持。

三档Escape与搜索焦点返回通过；dialog跨断点关闭也返回可见入口。首页搜索与catalog loading通过。

1024、820、390分别检查：展开菜单→Escape→重开→点击section；重开→点击最后一个当前区域view“工作与协作”。菜单均关闭，URL / hash正常，新页默认收起，没有资源重排。

手机菜单实际滚动后导航主体scrollTop变化，正文scrollY保持0；末尾view / section可访问。点击“设备与环境”进入其首view软件，active与正文同步。

## 18. relatedResources / secondary / 无 URL 回归

Blender展开准确显示10条关联，跨1366→1024后仍展开。菜单开关也保持展开状态，没有resize重建。

软件页面的secondary、reviewNotes、无URL资源正常显示：secondary使用深金棕、review使用中灰；原文与链接未变。软件页实测8个无URL主资源节点保持非a结构，7条review正常呈现。

关系按钮、aria-expanded、hidden面板、secondary和review渲染逻辑均来自未改的renderer。没有增加数量或新文案。

## 19. 数据与文件不变性

实施前保存全部既有文件SHA-256。最终比较仅第21节四个既有UI文件变化，新增仅本报告；其余既有文件逐字节一致。

catalog、navigation数据、legacy、migration、corrections、retired、relatedResources、全部资源字段和URL完整不变。前三轮报告与新版方案报告不变，validator不变。

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

## 20. 验证结果

node scripts/validate.mjs：PASS，退出码0。

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

node --check js/navigation.js、node --check js/resource-search.js：均PASS。

七尺寸、60次view检查、art、搜索、首页、全部legacy、关联资源、授权与文件范围验证均通过。截图、测量JSON和测试服务器仅位于/tmp；测试会话未改正式凭据。

## 21. 实际修改文件

- js/navigation.js：动态rail、当前区域二级导航、本页目录、三档开关、art渲染状态提示与搜索挂载槽。
- js/resource-search.js：同一搜索按钮在二级栏 / 工具条搜索槽间移动；其他搜索语义不变。
- css/styles.css：导航shell尺寸、固定位置、滚动主体、断点、普通正文目录隐藏与工具条锚点间距。
- css/theme-arc.css：新版深浅表面、Header、旧资源与首页浅色兼容、搜索视觉。
- docs/ui-redesign-batch-1.md：本报告，唯一新增项目文件。

未修改其他项目文件，没有新增运行时库、框架、后端或数据索引。

## 22. 第二、第三批仍未实施

尚未实施Section纵向 + Resource Grid；section仍是现有外层Grid中的卡片。没有下移Grid层级、重排DOM或重做资源卡片结构。

尚未迁移art完整目录；正文tabs、group / section目录及原history运行链继续保留。未实现scroll spy、完整art sidebar tree或第二套路由。

未修改资源数据；未commit；未push。
