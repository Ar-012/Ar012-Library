# 资源图标规范化 · Phase 3 第一批

核实日期：2026-10-09。依据 `docs/resource-icon-audit.md`、`docs/resource-icon-normalization-phase-1.md`、`docs/resource-icon-priority-audit.md` 和本轮开始时的正式 catalog / navigation。

## 结果与范围

- 首轮筛选 45 个 A 类候选；因部分来源受限或小尺寸不适用，在同一批内补充 5 个 A 类候选，共核实 50 个。实际接入 35 个专属图片图标，15 个保留 Font Awesome。没有进入第二批，没有处理 B 类，没有重新分类。
- 已有准确、清晰的品牌 Font Awesome 项保持原样；本轮不为图片化而替换它们。Google Maps、Google Docs、Gemini、Teams 原来的母公司字体标识则改用具体产品标识。
- 本轮仅在 35 个既有实体增加 `iconImage`，原 `icon` class 全部保留。其余 435 个实体完全不变；59 个原有图片图标实体及所有原有图片文件保持不变。
- 图片实体 59 → 94；仅使用 Font Awesome 的实体 411 → 376。新增本地文件 35 个（PNG 16、ICO 9、SVG 9、WebP 1）。

## 实际接入清单

下表的官方页面用于确认品牌及素材归属；素材链接指向实际取得的原始文件。CDN 素材须有官方网站 HTML 引用或官方产品页证据，不采用第三方 Logo 聚合站。

| resourceId | name | 原 icon class | 新 iconImage | 官方来源 | 来源类型 | 原始尺寸 / 格式 |
| --- | --- | --- | --- | --- | --- | --- |
| `res-8089d1901b4f` | Poly Haven | `fas fa-mountain` | `assets/icons/poly-haven.ico` | [官方页面](<https://polyhaven.com/>) · [原始素材](<https://polyhaven.com/favicon.ico>) | favicon | 48×48 / ICO |
| `res-05a5769075d9` | ambientCG | `fas fa-cloud` | `assets/icons/ambientcg.png` | [官方页面](<https://ambientcg.com/>) · [原始素材](<https://acg-media.struffelproductions.com/file/ambientCG-Web/media/icon/favicon-32x32.png>) | favicon | 32×32 / PNG |
| `res-7ea330ae999c` | Deepseek | `fas fa-brain` | `assets/icons/deepseek.svg` | [官方页面](<https://chat.deepseek.com/>) · [原始素材](<https://fe-static.deepseek.com/chat/favicon.svg>) | favicon | 50.000000×50.000000 / SVG |
| `res-28b57dad1491` | 豆包 | `fas fa-comment` | `assets/icons/doubao.png` | [官方页面](<https://www.doubao.com/chat/>) · [原始素材](<https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/chat/favicon-doubao.png>) | favicon | 76×76 / PNG |
| `res-110680f9c634` | 即梦 | `fas fa-comment` | `assets/icons/jimeng.ico` | [官方页面](<https://jimeng.jianying.com/ai-tool/home>) · [原始素材](<https://lf3-lv-buz.vlabstatic.com/obj/image-lvweb-buz/common/images/dreamina-v5.ico>) | favicon | 64×64 / ICO |
| `res-dcbda8c01446` | Runway | `fas fa-film` | `assets/icons/runway.ico` | [官方页面](<https://app.runwayml.com/login>) · [原始素材](<https://app.runwayml.com/favicon.ico>) | favicon | 32×32 / ICO |
| `res-b04d19f21678` | Notion | `fas fa-cube` | `assets/icons/notion.ico` | [官方页面](<https://www.notion.com/>) · [原始素材](<https://www.notion.com/front-static/favicon.ico>) | favicon | 64×64 / ICO |
| `res-45d5192022e4` | 钉钉 | `fas fa-bell` | `assets/icons/dingtalk.png` | [官方页面](<https://www.dingtalk.com/>) · [原始素材](<https://gw.alicdn.com/imgextra/i3/O1CN014ZbI6ZTEhdC0ttN2_!!6000000003783-2-tps-444-444.png>) | favicon | 444×444 / PNG |
| `res-0625bbe4ab49` | 企业微信 | `fab fa-weixin` | `assets/icons/wecom.png` | [官方页面](<https://work.weixin.qq.com/>) · [原始素材](<https://wwcdn.weixin.qq.com/node/wwnl/wwnl/style/images/independent/favicon/favicon_32h$a41a4426.png>) | favicon | 32×32 / PNG |
| `res-976eeac66264` | Zoom | `fas fa-video` | `assets/icons/zoom.ico` | [官方页面](<https://www.zoom.com/>) · [原始素材](<https://st1.zoom.us/homepage/20260930-1234/primary/favicon.ico>) | favicon | 32×32 / ICO |
| `res-02a7cca093b2` | Sketch | `fas fa-vector-square` | `assets/icons/sketch.png` | [官方页面](<https://www.sketch.com/>) · [原始素材](<https://www.sketch.com/images/metadata/icon-32.png>) | favicon | 32×32 / PNG |
| `res-eb640f905ca9` | Miro | `fas fa-chalkboard` | `assets/icons/miro.png` | [官方页面](<https://miro.com/>) · [原始素材](<https://framerusercontent.com/images/6FBG66PBxjV2QFaDfIdUi5mi9A.png>) | favicon | 128×128 / PNG |
| `res-0769dc5c4e2e` | Whimsical | `fas fa-brain` | `assets/icons/whimsical.png` | [官方页面](<https://whimsical.com/>) · [原始素材](<https://whimsical.com/_next_public/favicon-32.png>) | favicon | 32×32 / PNG |
| `res-85794320b9fe` | Excalidraw | `fas fa-pencil-alt` | `assets/icons/excalidraw.png` | [官方页面](<https://excalidraw.com/>) · [原始素材](<https://excalidraw.com/favicon-32x32.png>) | favicon | 32×32 / PNG |
| `res-d37be745462e` | diagrams.net | `fas fa-project-diagram` | `assets/icons/diagrams-net.png` | [官方页面](<https://www.draw.io/>) · [原始素材](<https://app.diagrams.net/images/apple-touch-icon.png>) | favicon | 180×180 / PNG |
| `res-41531850c10d` | Supabase | `fas fa-database` | `assets/icons/supabase.png` | [官方页面](<https://supabase.com/>) · [原始素材](<https://supabase.com/favicon/favicon-32x32.png>) | favicon | 32×32 / PNG |
| `res-a6ad87b96b6f` | Cloudflare | `fas fa-shield-alt` | `assets/icons/cloudflare.png` | [官方页面](<https://www.cloudflare.com/>) · [原始素材](<https://www.cloudflare.com/favicon.ico>) | favicon | 99×96 / PNG |
| `res-b8dc840fe342` | Replit | `fas fa-terminal` | `assets/icons/replit.png` | [官方页面](<https://replit.com/>) · [原始素材](<https://replit.com/public/icons/favicon-prompt-192-rebrand.png>) | favicon | 192×192 / PNG |
| `res-6d5a929c971e` | StackBlitz | `fas fa-bolt` | `assets/icons/stackblitz.svg` | [官方页面](<https://stackblitz.com/>) · [原始素材](<https://stackblitz.com/_astro/favicon.svg>) | favicon | 16×16 / SVG |
| `res-0fb5b5874dd8` | Vite | `fas fa-bolt` | `assets/icons/vite.svg` | [官方页面](<https://vite.dev/>) · [原始素材](<https://vite.dev/logo-without-border.svg>) | favicon | 48×46 / SVG |
| `res-5c6453057fed` | HowLongToBeat | `fas fa-clock` | `assets/icons/howlongtobeat.png` | [官方页面](<https://howlongtobeat.com/>) · [原始素材](<https://howlongtobeat.com/img/icons/favicon-32x32.png>) | favicon | 32×32 / PNG |
| `res-08761e40b186` | Metacritic | `fas fa-chart-bar` | `assets/icons/metacritic.svg` | [官方页面](<https://www.metacritic.com/>) · [原始素材](<https://www.metacritic.com/a/img/favicon.svg>) | favicon | 88×88 / SVG |
| `res-ef0272e776f4` | Koodo Reader | `fas fa-tablet-alt` | `assets/icons/koodo-reader.ico` | [官方页面](<https://www.koodoreader.com/zh>) · [原始素材](<https://www.koodoreader.com/favicon.ico>) | favicon | 48×48 / ICO |
| `res-5cc0e67257c0` | OBS Studio | `fas fa-video` | `assets/icons/obs-studio.png` | [官方页面](<https://obsproject.com/>) · [原始素材](<https://obsproject.com/favicon-32x32.png>) | favicon | 32×32 / PNG |
| `res-d130cc2e9c59` | Audacity | `fas fa-scissors` | `assets/icons/audacity.svg` | [官方页面](<https://www.audacityteam.org/>) · [原始素材](<https://www.audacityteam.org/favicon.svg>) | favicon | 41×42 / SVG |
| `res-af8ef348cd3d` | MuseScore | `fas fa-music` | `assets/icons/musescore.ico` | [官方页面](<https://musescore.org/zh-hant>) · [原始素材](<https://musescore.org/themes/musescore_theme/favicon.ico>) | favicon | 32×32 / ICO |
| `res-b939645bed96` | Ableton Live | `fas fa-table-cells` | `assets/icons/ableton-live.ico` | [官方页面](<https://www.ableton.com/>) · [原始素材](<https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/images/favicon.f83afbda6c78.ico>) | favicon | 16×16 / ICO |
| `res-f1f736c6c199` | 谷歌地图 | `fab fa-google` | `assets/icons/google-maps.webp` | [官方页面](<https://www.google.com/maps/about/>) · [原始素材](<https://www.gstatic.com/marketing-cms/assets/images/1b/21/a9543d8e4eb694200ddba538d536/googlemaps-pin.webp=n-w64-h73-fcrop64=1,0000110cffffeef4-rw>) | official logo | 64×64 / WEBP |
| `res-045262fdb9df` | Google Docs | `fab fa-google` | `assets/icons/google-docs.svg` | [官方页面](<https://workspace.google.com/products/docs/>) · [原始素材](<https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-3NvcfDZBvEe364AXmDNx1t-d15c6829ff4184fee4d09e1cd08db2df-docs_2026-192px.optimized.svg>) | official logo | 192×192 / SVG |
| `res-380e7aa25639` | Google Gemini | `fab fa-google` | `assets/icons/google-gemini.svg` | [官方页面](<https://gemini.google/about/>) · [原始素材](<https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/c546a20243c57b297546630cf76e417a2483acb8.svg>) | official logo | 66×66 / SVG |
| `res-75ae98f287b2` | REAPER | `fas fa-wave-square` | `assets/icons/reaper.ico` | [官方页面](<https://www.reaper.fm/>) · [原始素材](<https://www.reaper.fm/favicon.ico>) | official asset | 32×32 / ICO |
| `res-cf41e9dd33e5` | Iconfont | `fas fa-font` | `assets/icons/iconfont.svg` | [官方页面](<https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2>) · [原始素材](<https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg>) | favicon | 83×82 / SVG |
| `res-5154a7315483` | KitBash 3d | `fas fa-cubes` | `assets/icons/kitbash-3d.png` | [官方页面](<https://kitbash3d.com/collections>) · [原始素材](<https://cdn.shopify.com/s/files/1/2316/3287/files/k_icon_3.png?crop=center&height=32&v=1639462240&width=32>) | favicon | 32×32 / PNG |
| `res-f056c4fec3a2` | Microsoft Teams | `fab fa-microsoft` | `assets/icons/microsoft-teams.svg` | [官方页面](<https://www.microsoft.com/en-us/microsoft-teams/group-chat-software>) · [原始素材](<https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/Teams-Icon-FY26?op_usm=1.5%2C0.65%2C15%2C0&qlt=100&resMode=sharp2>) | official logo | 48×48 / SVG |
| `res-920e46e0b7d8` | CloudConvert | `fas fa-cloud-upload-alt` | `assets/icons/cloudconvert.png` | [官方页面](<https://cloudconvert.com/>) · [原始素材](<https://cloudconvert.com/build/assets/favicon-144-Cew_0rgK.png>) | favicon | 144×144 / PNG |

### 来源与素材处理说明

- 通常采用官网声明的 favicon / App Icon，因为其品牌符号适合小尺寸。Google Maps 使用 Maps Pin，Google Docs 使用 Docs 产品图标，Gemini 使用官网 Gemini-app 标识，Teams 使用 Teams 产品标识。没有将 Google / Microsoft 公司 Logo 批量代替独立产品。
- REAPER 使用官方同域默认 `/favicon.ico`：请求成功、图片解码成功，并人工核对 REAPER 应用标识；不是把它写成官网 HTML 明确声明的图标。
- diagrams.net 的灰色 favicon 对比不佳，改选同一官网 HTML 声明的 180×180 Apple Touch Icon；实际显示 16px 为清晰的橙色节点符号。
- Cloudflare 的源 URL 以 `.ico` 结尾，但实际响应编码为 PNG，新增文件按真实编码命名为 `cloudflare.png`。没有改动第一阶段保留的 7 个历史扩展名异常文件。
- 35 个文件全部保留官方响应的原始字节；逐文件 SHA-256 与取得的原素材一致。未重新压缩、重绘、染色、修改品牌比例或将 SVG 栅格化。部分官方 CDN URL 自带尺寸参数，保存的是官网本身提供的响应。
- SVG 已检查可解析及自包含性，未发现 script / foreignObject 或外部图像依赖。Ableton 官方 ICO 原生 16×16，按原尺寸保存，不放大生成新像素。
- 所有新文件名唯一、扩展名对应实际编码，正式路径真实存在；未覆盖任何已有图标。

## 保留 Font Awesome 的候选

以下判断仅针对本轮获取及 16px 显示结果，不表示资源已失效。没有因此修改名称、URL 或其他数据。

| resourceId | name | 保留 icon class | 原因 |
| --- | --- | --- | --- |
| `res-80dd5275c945` | Gumroad | `fas fa-store` | 官方入口及官网重试超时，未获得可验证的官方素材。 |
| `res-5d9354f7cb0e` | Chat GPT | `fas fa-comment` | 产品入口超时，OpenAI 官方 ChatGPT 产品页返回 403；未取得已核实的产品图标。 |
| `res-b9db5bd74bbc` | Midjourney页面端 | `fas fa-comment` | 官网返回 403 / 访问挑战，未取得可信素材；没有绕过访问挑战。 |
| `res-509d57a3ae8c` | Suno | `fas fa-headphones` | 官方入口请求超时，未取得可信图标。 |
| `res-51a9f53ce4dd` | Outlook | `fab fa-microsoft` | Outlook 入口返回 417，微软产品页超时；没有用 Microsoft 公司 Logo 代替 Outlook。 |
| `res-4f1bcebf4af3` | Microsoft 365 | `fab fa-microsoft` | 现有官方入口显示 Microsoft 365 / Copilot 登录页面，favicon 为 Copilot 标识；与 catalog 实体的品牌范围存在歧义，保留现状。 |
| `res-ee76fbba7792` | Canva | `fas fa-palette` | 官网及其声明的 favicon 返回 403，无法可靠取得官方素材。 |
| `res-9dbc2f574fa5` | Adobe XD | `fas fa-vector-square` | Adobe / 官方帮助页返回 403，未取得明确的 XD 产品素材。 |
| `res-fc646e755422` | CodeSandbox | `fas fa-code` | 官方首页正常，但首页声明的 favicon 资源返回 403。 |
| `res-904869b055cb` | Steam Database | `fas fa-database` | 可取得官网声明的内嵌 SVG favicon，但它在系统深色偏好下显示白色，与当前暖白资源卡对比不足；16px 实测不合适，未修改 SVG 颜色或 CSS 来强行接入。 |
| `res-c93e7faa4f75` | OpenCritic | `fas fa-star-half-alt` | 官方请求发生 HTTP/2 错误，HTTP/1.1 重试超时，未取得可靠素材。 |
| `res-9f9c9e89ce78` | FMOD | `fas fa-broadcast-tower` | 官网 favicon 正常，但为细小的 FMOD 文字标识，16px 下辨识度不足。 |
| `res-b88617d2ae76` | adobe color | `fas fa-palette` | 当前官方入口跳转到 Adobe Express 色轮工具，页面 favicon 为 data:, 空值；产品身份和素材均不足以确认，未使用母公司 / Express 标识替换。 |
| `res-1a40669e664e` | coolors | `fas fa-palette` | 官网及默认 favicon 返回 403，未取得可验证素材。 |
| `res-bb69c3a20418` | Poliigon | `fas fa-photo-video` | 官网及默认 favicon 返回 403，未取得可验证素材。 |

Microsoft 365 和 adobe color 的跳转 / 品牌差异仅记录为后续核实事项，本轮未处理其数据。所有访问受限候选均采用保留现有图标的处理，不从未知图片、聚合站或非官方重绘素材补足数量。

## 显示规则与 fallback

- 沿用 `assets/icons/`、`iconImage` 和第一阶段 renderer；没有建立第二套机制。
- icon slot 20×20px，图片显示区域 16×16px，`object-fit: contain`；字体图标仍使用现有 slot 居中规则，间距和卡片布局不变。
- 图片加载失败仍触发现有 `fas fa-link` fallback。以仅在本机测试响应中给 Metacritic 设置不存在图片的方式验证：图片被移除，fallback 正常显示，slot 保持 20×20px，标题偏移保持原值，没有破图标记。正式 catalog 未写入测试路径。
- 原字体图标修复全部保留；本轮没有改 CSS、JS、renderer、搜索、导航、URL/history 或 auth。

## 浏览器回归

使用仅绑定 127.0.0.1 的独立测试端口及此前获准的本机测试会话；正式 auth 文件和授权逻辑没有修改。对比页面读取本轮开始前的 catalog 快照，新增图标页面读取最终 catalog。临时响应、素材预览及故障注入均在项目外的临时目录中完成。

| 宽度 | 覆盖页面 | 结果 |
| --- | --- | --- |
| 1366px 桌面 | 3D、AI、开发、工作与协作、美术与设计、游戏、软件（设备与环境）、日常工具、音频与视频，以及美术视觉设计 section | 正常，无横向溢出；Grid 列数及卡片几何值与补图前一致 |
| 768px 平板 | 同上 | 正常，无横向溢出；Grid 列数及卡片几何值与补图前一致 |
| 390px 手机 | 同上 | 正常，无横向溢出；单列布局、长标题和图片 / 字体对齐保持原样 |

- 共 30 组前后页面度量，覆盖全部 35 个新增图标实体；已加载图像的 naturalWidth 均大于 0，没有缺失路径或图标 404。所有图片 slot / display 分别为 20×20 / 16×16。
- 按 resourceId 比对各页面卡片顺序、卡片高度和标题横向偏移，前后差异均为 0；各页面 Grid columns 和溢出状态不变。没有通过改布局掩盖图标尺寸问题。
- 人工检查七个重点领域页面截图，并检查全部 35 个图标在 16px 和较大预览下的品牌符号。新 PNG / ICO / SVG / WebP 均可显示；已有 JPG 图标继续正常。
- Blender 的 10 个 relatedResources 在桌面以 Enter 展开、Space 收起正常；手机 Midjourney 的 3 个 relatedResources 展开正常。未改任何关联边或关联资源渲染。
- 软件页面的 8 个无 URL 卡片正常显示“暂未记录链接”，没有添加假链接；全站 NO_ACTIVE_URL 仍为 11。
- 搜索 CloudConvert 得到 1 个结果，点击“查看所在位置”到工作与协作 / 文件处理，资源卡显示新的 CloudConvert 图标。现有搜索结果面板本身是纯文字列表，没有图片图标；本轮保持该行为，未重构搜索。
- 正常页面不会进入图片失败 fallback；故障注入页单独验证 fallback，不混入正常页面统计。

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

- 按 ID 和对象字段逐项比对：470 个实体顺序一致；只有清单中的 35 个实体新增 `iconImage`。所有实体的 id、name、url、description、type、icon、links、topics、contexts、tags、sources、relatedResources 等其他字段完全不变。
- 原 59 个图片实体的 `iconImage` 及所有旧素材文件完全不变；第一阶段 16 个空字形、2 个前缀错配的修复没有撤销。
- `data/navigation.js`、legacy、migration、corrections、retired 数据、art mappings、全部 CSS / JS / HTML 及既有 docs 与本轮开始前逐文件 SHA-256 一致。
- 本轮开始时工作区已有第一阶段修改（`css/resource-page.css`、`js/render-resources.js`、`data/catalog.js`）及审计报告；本轮保留这些状态，不将它们误算为本轮新增修改。

## 实际修改文件

- `data/catalog.js`：35 处 `iconImage` 新增。
- `docs/resource-icon-normalization-phase-3.md`：本报告。
- 新增下列 35 个素材文件：

  - `assets/icons/poly-haven.ico`
  - `assets/icons/ambientcg.png`
  - `assets/icons/deepseek.svg`
  - `assets/icons/doubao.png`
  - `assets/icons/jimeng.ico`
  - `assets/icons/runway.ico`
  - `assets/icons/notion.ico`
  - `assets/icons/dingtalk.png`
  - `assets/icons/wecom.png`
  - `assets/icons/zoom.ico`
  - `assets/icons/sketch.png`
  - `assets/icons/miro.png`
  - `assets/icons/whimsical.png`
  - `assets/icons/excalidraw.png`
  - `assets/icons/diagrams-net.png`
  - `assets/icons/supabase.png`
  - `assets/icons/cloudflare.png`
  - `assets/icons/replit.png`
  - `assets/icons/stackblitz.svg`
  - `assets/icons/vite.svg`
  - `assets/icons/howlongtobeat.png`
  - `assets/icons/metacritic.svg`
  - `assets/icons/koodo-reader.ico`
  - `assets/icons/obs-studio.png`
  - `assets/icons/audacity.svg`
  - `assets/icons/musescore.ico`
  - `assets/icons/ableton-live.ico`
  - `assets/icons/google-maps.webp`
  - `assets/icons/google-docs.svg`
  - `assets/icons/google-gemini.svg`
  - `assets/icons/reaper.ico`
  - `assets/icons/iconfont.svg`
  - `assets/icons/kitbash-3d.png`
  - `assets/icons/microsoft-teams.svg`
  - `assets/icons/cloudconvert.png`

## 验证与交付状态

- `node scripts/validate.mjs`：PASS，正式数量指标与上表一致。
- `git diff --check`：PASS。
- 全部新图标路径、原素材字节哈希、catalog 字段变化范围、navigation / legacy 不变性和 30 组浏览器前后度量：PASS。
- 未 commit，未 push；第一批到此停止，等待报告审核。
