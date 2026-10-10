# 资源图标纠正 · D 类 6 项

核实日期：2026-10-09。依据 `docs/resource-icon-priority-audit.md`、`docs/resource-icon-normalization-phase-3.md`、本轮开始时的 catalog 和图标文件。本轮只处理指定的 6 个 D 类实体，没有继续第二批 A 类或重新分类。

## 最终处理

| resourceId | 名称 | 原 icon / iconImage | 新 icon / iconImage | 联网核实 | 原因 / 新增文件 |
| --- | --- | --- | --- | --- | --- |
| res-e7d6b67f4a2c | 古墓仙女汉服入门穿搭手册汇总大全 | `fab fa-sourcetree`；无 iconImage | `fas fa-shirt`；无 iconImage | 仅核实项目使用的 Font Awesome 6.4.0 CSS | 服饰语义对应汉服穿搭，不使用开发工具品牌或搜狐母站 Logo；不新增图片 |
| res-f6712a9ddb32 | 科普 \| 被遗忘的传统——交窬裁剪的裙子 | `fab fa-sourcetree`；无 iconImage | `fas fa-scissors`；无 iconImage | 仅核实项目使用的 Font Awesome 6.4.0 CSS | 剪裁语义对应文章内容，不使用 Sourcetree 或搜狐品牌；不新增图片 |
| res-751a6d512a90 | PCGamingWiki | `fab fa-wikipedia-w`；无 iconImage | `fas fa-screwdriver-wrench`；无 iconImage | 是，官方首页、正式 Home 入口及默认 favicon | 官方首页和 `/wiki/Home` 返回 403，默认 `/favicon.ico` 也返回 403，无法取得可验证的官方品牌素材；改用故障排查 / 工具语义型 Font Awesome，不再显示 Wikipedia；不新增图片 |
| res-b2d8bb124ac1 | 爱给网_音效配乐 | `fab fa-soundcloud`；无 iconImage | `fas fa-music`；无 iconImage | 是，官网与默认 favicon | 官网返回 403，默认 `/favicon.ico` 返回 404；无法可靠确认官方素材，改用音频 / 配乐语义型 Font Awesome，不再显示 SoundCloud；不新增图片 |
| res-97cbe37bc82d | Gun Wiki | `fab fa-wikipedia-w`；无 iconImage | `fas fa-crosshairs`；无 iconImage | 是，Gun Wiki 官方 community 入口 | Web 读取返回 402，直接读取该页面超时，无法确认 community 自身标识；改用枪械参考语义型 Font Awesome，不用 Wikipedia，也不自动换成 Fandom；不新增图片 |
| res-7b921cd30d30 | Superhive | `fas fa-link`；`assets/icons/blender-market.png` | `fas fa-link` 不变；`assets/icons/superhive.png` | 是，官网 HTML 和其当前声明的 favicon | 官网当前仍沿用与旧文件可见像素一致的蜂形 favicon。新增旧文件的原字节副本，采用准确的 Superhive 文件名；旧文件不删除 |

访问受限仅表示本次素材核实未成功，不据此认定网站失效，也没有修改资源 URL、名称或描述。没有从聚合站、未知图片或非官方重绘素材补图。

## 官方来源与 Superhive 判定

- PCGamingWiki：[当前正式入口](https://www.pcgamingwiki.com/wiki/Home)、[官方首页](https://www.pcgamingwiki.com/)、[默认 favicon](https://www.pcgamingwiki.com/favicon.ico)。无法取得可信图片，采用语义图标。
- 爱给网：[官网](https://www.aigei.com/)、[默认 favicon](https://www.aigei.com/favicon.ico)。无法取得可信图片，采用语义图标。catalog 中带参数的原 URL 保持不变。
- Gun Wiki：[官方 community 页面](https://guns.fandom.com/wiki/Main_Page)。无法确认自身 favicon，采用语义图标。
- Superhive：[当前官网](https://superhivemarket.com/) 返回 200，HTML 的 `link rel=icon sizes=32x32` 明确引用 [官方 favicon](https://assets.superhivemarket.com/site_assets/images/favicon/favicon-32x32.png)，该文件返回 200，可正常解码为 32×32 PNG。页面还引用官方 `superhive-logo.png?v4`，因此品牌归属依据当前官网，未根据旧文件名猜测。

对比官方 favicon 与旧 `blender-market.png`：32×32 尺寸一致，所有 alpha 值一致，所有 alpha > 0 的像素 RGB 完全相同。两文件字节哈希不同的差异仅涉及完全透明像素的 RGB 等文件编码内容，不影响可见图形。人工查看也确认两者是同一视觉标识。因此不需要更换图形，按用户允许的方式新增旧文件的原字节副本 `superhive.png` 并更新引用。

新副本与旧文件 SHA-256 完全相同：

`ad0ea4f1a4d88cc7d3bdf25122046f802458f31d30cf4237620c717cd82ace86`

官网下载核实素材的 SHA-256：

`49281f08532e4e5d2c0cf7c70e27c2eeee05cb94ca8a15f6ab2d857718c3fce6`

没有压缩、重绘、染色或覆盖原素材。Superhive 的旧 `alt` 字段按本轮只允许修改 icon / iconImage 的范围保留；它不参与品牌图形选择，renderer 的整个 icon slot 为 aria-hidden。本轮没有改 renderer 或其他字段。

## Font Awesome 6.4.0 验证

`library.html` 实际引用 [Font Awesome 6.4.0 CSS](https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css)。读取该确切版本，确认如下 class 存在；浏览器检查字体已加载、伪元素字形非空、字体 family 与 weight 正确，并人工检查实际图形。

| class | glyph | 浏览器 family / weight | fallback |
| --- | --- | --- | --- |
| `fas fa-shirt` | U+F553 | Font Awesome 6 Free / 900 | 未触发 |
| `fas fa-scissors` | U+F0C4 | Font Awesome 6 Free / 900 | 未触发 |
| `fas fa-screwdriver-wrench` | U+F7D9 | Font Awesome 6 Free / 900 | 未触发 |
| `fas fa-music` | U+F001 | Font Awesome 6 Free / 900 | 未触发 |
| `fas fa-crosshairs` | U+F05B | Font Awesome 6 Free / 900 | 未触发 |

五项均使用 solid 前缀 `fas`，没有品牌前缀错配。Superhive 正常显示本地图片，没有进入其 `fa-link` 加载失败 fallback。

## 浏览器验证

采用仅绑定 127.0.0.1 的隔离测试端口，沿用此前获准的本机测试会话。修改前页面读取本轮 catalog 快照，修改后页面读取最终 catalog；正式 auth 文件未改。

在 1366×900 桌面分别检查以下五个场景，并保存、人工检查截图：

1. 美术与设计 → 设计参考 → 服装与时尚 → 设计资料：两篇汉服文章分别显示衣服和剪刀图标，长标题正常。
2. 美术与设计 → 设计参考 → 武器 → 社区与资料库：Gun Wiki 显示准星语义图标。
3. 游戏 → 资料与查询：PCGamingWiki 显示故障排查工具图标。
4. 音频与视频 → 音频素材：爱给网显示音符图标。
5. 3D → 模型与素材：Superhive 图片正常加载，新路径对应原来的可见标识。

五组页面前后逐卡片比较：resourceId 顺序、卡片高度、标题横向偏移和 Grid columns 完全一致，无横向溢出。slot 仍为 20×20px；Superhive 图片显示 16×16px，继续使用现有 `object-fit: contain`。

六个目标全部覆盖，五个字体图标 glyph 非空且视觉正常。检查页面中的图片均加载成功，无 broken image，没有正常页面触发 fallback。其他资源的图标和布局没有变化。

Blender 的 10 个 relatedResources 用 Enter 展开、Space 收起正常，其中 Superhive 关联入口仍存在。关联数据、链接和渲染机制未修改。

## 数据基线与不变性

| 指标 | 本轮前 | 本轮后 |
| --- | ---: | ---: |
| entities | 470 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 17 | 17 |
| views | 20 | 20 |
| legacyPages | 14 | 14 |
| activeURLs | 463 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 43 | 43 |
| art mappings | 165 | 165 |
| relatedResources edges | 21 | 21 |
| internalLinks | 209 | 209 |
| 图片图标实体 | 94 | 94 |

逐实体字段比较：仅指定的五项修改 `icon`，Superhive 修改 `iconImage`；其余 464 个实体完全不变，六项的其他字段及 catalog 顺序不变。navigation、legacy、migration、corrections、retired、relatedResources 和正式数据结构不变。

按本轮开始时的全文件 SHA-256 核对：既有文件中只有 `data/catalog.js` 发生本轮变化。所有旧图片、CSS / JS / HTML、前置报告、Phase 1 修复和 Phase 3 第一批 35 个图片引用都保持原样。工作区此前已有的修改及未跟踪文件没有撤销或提交。

## 实际修改文件

- `data/catalog.js`：5 个 icon class 与 1 个 iconImage 路径。
- `assets/icons/superhive.png`：新增旧文件的原字节副本；不删除 `blender-market.png`。
- `docs/resource-icon-correction-d-batch.md`：本报告。

## 验证结果

- `node scripts/validate.mjs`：PASS，正式指标保持上述基线。
- `git diff --check`：PASS。
- 6 个目标的精确字段范围、其余 464 个实体不变性、旧文件字节不变性、新图片存在及原字节副本检查：PASS。
- 浏览器字形、正常图片加载、无 fallback、卡片几何值和 relatedResources：PASS。

本轮到此停止。未 commit，未 push，没有进入下一批 A 类。
