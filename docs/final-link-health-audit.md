# 最终外链健康审计

审计日期：2026-10-07（Asia/Shanghai）。基线：当前 `data/catalog.js`。本轮只新增本报告，未替换 URL、修改数据、删除实体、提交或推送。

## 1. 执行摘要

480 个 active URL 已全部进行在线 GET 检查。需要先处理的是 3 个明确失效入口、3 个身份不匹配入口，以及 4 个明显异常异域跳转。另有同品牌迁移和用途改变的入口，列为后续人工决定项。191 个被拦截或无法确认的入口不能据此删除。

本报告中的“失效”指当前 URL，不表示整个服务永久关闭；“身份不匹配”指当前入口内容与实体描述不符，不代表已证实域名被接管。没有仅凭 HTTP 200 判为正常，也没有仅凭 DNS 失败或超时判为永久失效。

## 2. 检查覆盖率与方法

| 项目 | 结果 |
| --- | --- |
| catalog entities | 487 |
| sources / mergedSources | 498 / 11 |
| views / legacyPages | 20 / 14 |
| 非空主 URL | 476 |
| secondary URL | 4 |
| active URL | 480；480 个不同 URL，覆盖率 100% |
| HTTP / HTTPS 基线 | 39 / 441 |
| NO_ACTIVE_URL | 11；未请求、未搜索补充网址 |

主要请求窗口为 2026-10-07 00:46–00:57；随后进行少量内容、协议及 DNS 复核。时间以本机请求记录为准。旧 2026-09-26 结果仅用于对照，没有沿用旧状态。

采用 GET，通常请求前 128 KiB，提取 title、meta description 和少量正文；部分站点忽略 Range，设置 2 MiB 下载上限，分析最多前 256 KiB。连接超时 8 秒、总超时通常 20 秒、最多 10 次 HTTP 跳转。后期 Wikipedia 请求总超时缩短为 8 秒。全局并发最多 6，同域最多 2，同域请求启动间隔约 1 秒；失败请求一般间隔至少 2 秒、最多追加一次复核。少量异常使用无 Range / HTTP/1.1 GET，避免把范围请求和 HTTP/2 错误当死链。User-Agent 为 `Mozilla/5.0 (compatible; PersonalLibraryLinkAudit/1.0)`。

记录 HTTP 状态、最终地址、可取得的 Location 链、域名变化、标题和 curl 错误。HTTP 入口另检查 HTTPS；已跳到正常 HTTPS 的响应复用为证据。未绕过 TLS 验证、Cloudflare、登录或验证码；未执行可疑路由页脚本，未播放视频、登录、下载资源或验证付费功能。健康分类表示入口身份基本符合，不能证明其内容价值、所有下级功能或资源安全性。

临时请求记录及脚本仅放在 `/tmp`。7 个 DNS 失败站点另尝试 Google / Cloudflare DNS-over-HTTPS，均遭超时或 TLS 限制，未取得可用 DNS 答案，因此没有 NXDOMAIN 证据。

## 3. 分类统计

| 类别 | 数量 | 含义 |
| --- | --- | --- |
| A. HEALTHY | 230 | 入口与身份基本正常 |
| B. HEALTHY_REDIRECT | 46 | 跳转后仍可确认同一网站或服务 |
| C. REVIEW_REDIRECT | 7 | 跳转后的域名或页面身份需要人工判断 |
| D. BLOCKED_OR_UNCONFIRMED | 191 | 拦截、验证、登录、网络错误或内容不足 |
| E. BROKEN | 3 | 当前入口失效证据明确 |
| F. IDENTITY_MISMATCH | 3 | 页面可访问但资源身份明显不匹配 |

合计 480，每个 active URL 只计入一个类别。HTTPS 试探和重复请求不另计实体或 active URL；同一资源的 secondary URL 单独计数。A 类不逐项展开。B 类包括 1 个经 HTML refresh 及目标 GET 确认的 Git 文档跳转，其余为 HTTP 跳转。

## 4. BROKEN：3 项，L1

| 实体 / ID | 当前入口 | 证据与建议 |
| --- | --- | --- |
| screenmusings / res-519d07baf26a | [screenmusings.org/](https://screenmusings.org/) | 206；无 Range 复核 200。标题 screenmusings.org is almost here!，DreamHost 默认待建页面，未见原电影剧照库。建议停用当前入口并人工找回原资源；不是仅凭状态码判定。 |
| 最U导航 / res-8824cf5d312a | [www.zuh8.com/](https://www.zuh8.com/) | 两次 GET 均 404，另一个在线读取客户端也返回 404。当前入口应处理；未搜索替代地址。 |
| LIBVIO / res-07222493760e | [libvio.art/](https://libvio.art/) | 200，但标题与正文明确“本域名已停止使用”“当前网址已不再提供服务”，引导去发布页。当前入口失效，不等于 LIBVIO 整体关闭。 |

## 5. IDENTITY_MISMATCH：3 项，L1

| 实体 / ID | 当前与最终入口 | 当前身份 / 原描述 / 建议 |
| --- | --- | --- |
| 好猫字幕组_语雀 / res-40c5ab9202a0 | [www.yuque.com/ue4y5t](https://www.yuque.com/ue4y5t) → [www.yuque.com/jx](https://www.yuque.com/jx) | 302 → 200；标题“可视化VIP课程 · 语雀”，meta 为从零创建汽车可视化作品集课程。原描述“游戏开发知识库”。当前课程页不能确认仍是原字幕组知识库，人工决定替换或删除候选。 |
| Loveblush Bridal / res-df5f19bf8bfd | [www.loveblushbridal.com/](http://www.loveblushbridal.com/) | 初次 200，未取得标题，页面为广告/隐私壳，广告资源指向 findsearchresultsnow.net，未见婚礼高定商城；追加 GET 为 502。原描述“婚礼高定服装，商城”。建议人工复核并列删除候选；尚未证实接管主体或永久停站。 |
| Quixel Bridge / res-5ee7019b67b3 | [quixel.com/](https://quixel.com/) | 200；当前 Quixel Megascans 扫描资产库，提供 Browse on Fab 等入口。原描述“素材管理工具”，实体为 Bridge 软件。仍属 Quixel 品牌，但这个首页不能作为 Bridge 工具的准确入口。应后续找适合的 Bridge 说明/下载入口或决定退休；未推断 Bridge 已关闭。 |

## 6. REVIEW_REDIRECT：7 项

| 实体 / 原 URL | HTTP 链 / 最终 URL | 判断与优先级 |
| --- | --- | --- |
| lughertexture；[www.lughertexture.com/](https://www.lughertexture.com/) | 301 → 403；[elchiraemprende.pe/papercraft-del-chira-un…](https://elchiraemprende.pe/papercraft-del-chira-uniendo-el-arte-y-dedicacion-en-figuras-3d/) | 异域纸艺路径；Cloudflare 显示疑似钓鱼警告。C/L1，停止将其当纹理库入口，接管原因未确认。 |
| JAY仓库；[www.likejay.cn/](https://www.likejay.cn/) | 302 → 206；[202608.urldance.com/7d/](https://202608.urldance.com/7d/?likejay.cn#others) | 第三方 urldance 路由页，非原资源站；C/L1。 |
| 我的书签；[it-cxy.top/](https://it-cxy.top/) | 302 → 206；[202608.urldance.com/8d/](https://202608.urldance.com/8d/?it-cxy.top#others) | 第三方 urldance 路由页，非原书签页；C/L1。 |
| 555电影；[www.55boy.wiki/](https://www.55boy.wiki/) | 302 → 206；[202608.urldance.com/6d/](https://202608.urldance.com/6d/?55boy.wiki#others) | 第三方 urldance 路由页，非原影视入口；C/L1。 |
| 臭蛋蛋影视；[cddys.vip/](https://cddys.vip/) | 301 → 200；[cddtongxue.vip/](https://cddtongxue.vip/) | 变成地址发布页，C/L2；是否用作资料库入口需决定。 |
| Color Claim；[vanschneider.com/colors](https://vanschneider.com/colors) | 301 → 200；[access.mymind.com/colors](https://access.mymind.com/colors) | mymind 配色组合页面，C/L2；原 Color Claim 品牌及功能描述需复核。 |
| Spitfire LABS；[labs.spitfireaudio.com/](https://labs.spitfireaudio.com/) | 301 → 200；[splice.com/instrument/labs-instrument](https://splice.com:443/instrument/labs-instrument) | 官方说明 LABS 迁入 Splice INSTRUMENT，C/L2；产品与付费方案变化。 |

JAY仓库、我的书签、555电影均落到同一 urldance 路由体系，标题 welcome，仅有加载/脚本路由信息；不能据 206 确认原站健康。未继续运行其脚本，也未将后续脚本目标作为已核验入口。lughertexture 的最终页显示 Cloudflare 的 Suspected Phishing 警告，未绕过，也未断言已经证实劫持。

Spitfire LABS 的目标页明确说明 LABS 的新归属为 Splice INSTRUMENT，并包含试用/订阅信息；这是有官方内容支持的产品迁移，但原“免费音源”定位需要人工核对，因此归 C 而不是仅因同品牌迁移归 B。[迁移页面](https://splice.com/instrument/labs-instrument)。Color Claim 目标仍是设计配色内容，但变成 mymind 的配色组合；臭蛋蛋变成地址发布页，二者也需人工决定保留方式。

## 7. HEALTHY_REDIRECT 与跨域跳转专项

B 类共 46 项。全部 29 个跨 host 跳转的分类为：B 18、C 7、D 4。跨 host 按 hostname 判断，包含 www 和子域变化；同 host 路径或协议跳转另列。

下表列出全部跨 host 跳转。标题较长时以省略号截断；description 为 catalog 原文。状态链按实际响应记录，未完成目标请求不补写最终 200。

| 实体 / description | 原入口 → 最终入口；HTTP 链 | 最终 title / 分类与判断 |
| --- | --- | --- |
| Blender Market；Blender专用资源商店 | [blendermarket.com/](https://blendermarket.com/) → [superhivemarket.com/](https://superhivemarket.com/)；301 → 200 | Superhive (formerly Blender Market) \| A Unique Market for Creators that lov…；官方页面明确原名 Blender Market；同品牌更名，L1 更新入口候选。 |
| lughertexture；贴图网站，高质量纹理素材 | [www.lughertexture.com/](https://www.lughertexture.com/) → [elchiraemprende.pe/papercraft-del-chira-un…](https://elchiraemprende.pe/papercraft-del-chira-uniendo-el-arte-y-dedicacion-en-figuras-3d/)；301 → 403 | Suspected Phishing \| Cloudflare；异域纸艺路径；Cloudflare 显示疑似钓鱼警告。C/L1，停止将其当纹理库入口，接管原因未确认。 |
| Flim；电影剧照参考网站 | [beta.flim.ai/](https://beta.flim.ai/) → [app.flim.ai/](https://app.flim.ai/)；301 → 200 | Flim – Image Database and Screencap Search Engine for Creative People；Flim 应用入口迁移，B/L2。 |
| Art Of Soulburn；Neil Blevins的个人网站，包含大量CG教程 | [www.neilblevins.com/](http://www.neilblevins.com/) → [artofsoulburn.com/](https://artofsoulburn.com/)；301 → 403 | Just a moment...；个人域名跳到 Art Of Soulburn，但最终 Cloudflare 拦截；D/L3。 |
| 汉服荟商城；包含大量品牌汉服，非常好 | [m.hanfuhui.com/](https://m.hanfuhui.com/) → [www.hanfuhui.com/](https://www.hanfuhui.com/)；301 → 500 | 远程服务器返回错误: (500) 内部服务器错误。；移动入口跳官网后 500；D/L3。 |
| JAY仓库；综合资源导航网站 | [www.likejay.cn/](https://www.likejay.cn/) → [202608.urldance.com/7d/](https://202608.urldance.com/7d/?likejay.cn#others)；302 → 206 | welcome；第三方 urldance 路由页，非原资源站；C/L1。 |
| 我的书签；综合资源导航网站 | [it-cxy.top/](https://it-cxy.top/) → [202608.urldance.com/8d/](https://202608.urldance.com/8d/?it-cxy.top#others)；302 → 206 | welcome；第三方 urldance 路由页，非原书签页；C/L1。 |
| Kimi AI；AI对话助手 | [kimi.moonshot.cn/](https://kimi.moonshot.cn/?ref=qinggongju.com) → [www.kimi.com/](https://www.kimi.com/?ref=qinggongju.com)；302 → 200 | Kimi AI 官网 - K3 上线，专为智能体编程与知识工作打造；Kimi 官网新域名，B/L1。 |
| Vite；轻量快速的前端构建工具，适合现代Web项目 | [vitejs.dev/](https://vitejs.dev/) → [vite.dev/](https://vite.dev/)；301 → 206 | Vite \| Next Generation Frontend Tooling；Vite 官网新域名，B/L1。 |
| Origin/EA App；EA游戏平台 | [www.origin.com/](https://www.origin.com/) → [www.ea.com/games/library/pc-download](https://www.ea.com/games/library/pc-download)；301 → 206 | PC Games and Computer Video Games for Download - Electronic Arts；EA 官方 PC 下载页，B/L2；旧 Origin 品牌入口已改变。 |
| ISSC；国际体育射击公司官方网站 | [issc.at/](https://issc.at/) → [www.issc.at/](https://www.issc.at/)；301 → 206 | HOME \| ISSC - Precision & more；www 规范化，B/L2。 |
| Gunworld；枪支销售商城 | [www.gunworld.com.au/](https://www.gunworld.com.au/) → [gunworld.com.au/](https://gunworld.com.au/)；302 → 200 | Gun World Australia；去除 www，同品牌，B/L2。 |
| Only Airsoft；气枪专门商城 | [www.onlyairsoft.com/](https://www.onlyairsoft.com/) → [onlyairsoft.com/](https://onlyairsoft.com/)；301 → 200 | Home - OnlyAirsoft – Trusted Airsoft Specialists Since 2010；去除 www，同品牌，B/L2。 |
| 555电影；在线影视观看网站 | [www.55boy.wiki/](https://www.55boy.wiki/) → [202608.urldance.com/6d/](https://202608.urldance.com/6d/?55boy.wiki#others)；302 → 206 | welcome；第三方 urldance 路由页，非原影视入口；C/L1。 |
| 热播之家；热门影视剧在线观看 | [rebozj.pro/](https://rebozj.pro/) → [www.rebozj.cc/](https://www.rebozj.cc/)；301 → 200 | 热播之家热播之家公告；相同热播之家名称与影视内容，B/L2；运营主体未独立核验。 |
| 影猫的仓库；影视资源仓库搜索 | [ymck.pro/](https://ymck.pro/) → [www.ymck.pro/](https://www.ymck.pro/)；301 → 200 | 影猫の仓库 - 免费观影第一站 !；www 规范化，同名称影视导航，B/L2。 |
| 臭蛋蛋影视；影视资源搜索网站 | [cddys.vip/](https://cddys.vip/) → [cddtongxue.vip/](https://cddtongxue.vip/)；301 → 200 | 臭蛋蛋影视地址发布页；变成地址发布页，C/L2；是否用作资料库入口需决定。 |
| Color Claim；120个精选颜色，无预设方案 | [vanschneider.com/colors](https://vanschneider.com/colors) → [access.mymind.com/colors](https://access.mymind.com/colors)；301 → 200 | mymind；mymind 配色组合页面，C/L2；原 Color Claim 品牌及功能描述需复核。 |
| 文悦字库；文悦字体官方库 | [wytype.com/](https://wytype.com/) → [wenyue.cn/](https://wenyue.cn/)；301 → 200 | 字体免费下载\|购买使用授权-文悦字库官网；文悦字库官网新入口，B/L1。 |
| 美叶；插画、网页、图标设计案例参考 | [www.meiye.art/canvas/1/402](https://www.meiye.art/canvas/1/402) → [meiye.art/](https://meiye.art/)；301 → 301 → 200 | 美叶 · 设计师的品味养成所；同品牌但具体 canvas 路径落到首页，B/L2。 |
| 图虫创意；创意图片和设计资源 | [stock.dfic.cn/](https://stock.dfic.cn/?source=extbaidudkey7&utm_source=extbaidudkey7) → [stock.tuchong.com/](https://stock.tuchong.com/)；301 → 200 | 图虫创意-正版商用图片视频音频素材库-Adobe Stock中国区官方独家合作伙伴；图虫创意素材库新入口，B/L1。 |
| reeoo；网页设计优秀案例，配色参考 | [iphone.reeoo.com/](https://iphone.reeoo.com/) → [reeoo.com/app/](https://reeoo.com/app/)；301 → 308 → 200 | App Design Inspiration & Mobile UI Examples - Reeoo；移动设计灵感变为 App 灵感页，B/L2。 |
| diagrams.net；免费在线图表工具，流程图、UML 图制作 | [www.draw.io/](https://www.draw.io/) → [app.diagrams.net/](https://app.diagrams.net/)；301 → 206 | Flowchart Maker & Online Diagram Software；draw.io 在线编辑器入口，B/L2。 |
| Microsoft 365；微软办公套件云服务，在线协作 | [www.microsoft365.com/](https://www.microsoft365.com/) → [m365.cloud.microsoft/](https://m365.cloud.microsoft/)；302 → 200 | Microsoft 365 - Sign into CopilotYour Privacy Choices Opt-Out IconYour Priv…；同微软服务的 Copilot/Microsoft 365 门户，B/L2；操作需要账户。 |
| Zoom；视频会议与在线协作工具 | [zoom.us/](https://zoom.us/) → [www.zoom.com/](https://www.zoom.com/)；301 → 200 | One platform to connect \| Zoom；Zoom 官网迁移，B/L1。 |
| IMSLP - Petrucci Music Library；全球最大的公共领域乐谱资源库，古典音乐为主。 | [imslp.org/](https://imslp.org/) → [cn.imslp.org/](https://cn.imslp.org/)；302 → 200 | IMSLP: Free Sheet Music PDF Download；IMSLP 地区镜像，B/L2。 |
| Spitfire LABS；免费虚拟乐器和音色库。 | [labs.spitfireaudio.com/](https://labs.spitfireaudio.com/) → [splice.com/instrument/labs-instrument](https://splice.com:443/instrument/labs-instrument)；301 → 200 | Labs is now INSTRUMENT；官方说明 LABS 迁入 Splice INSTRUMENT，C/L2；产品与付费方案变化。 |
| Gearspace；录音、设备和制作经验讨论。 | [www.gearslutz.com/board/](https://www.gearslutz.com/board/) → [gearspace.com/board/](https://gearspace.com/board/)；301 → 403 | Just a moment...；旧 Gearslutz 跳 Gearspace，但最终验证页，D/L3。 |
| GitLab；DevOps平台，代码仓库与CI/CD | [gitlab.com/](https://gitlab.com/) → [about.gitlab.com/](https://about.gitlab.com/)；301 | ；跳到 about.gitlab.com 后超时，D/L3，未确认最终页面。 |

B 类其余同 host 跳转如下，均观察到同一资源内容；默认 L2，协议升级另见第 8 节。

| 实体 | 原入口 → 最终入口 | HTTP 链 / title |
| --- | --- | --- |
| 3DCoat Wiki | [3dcoat.com/dokuwiki/doku.php](https://3dcoat.com/dokuwiki/doku.php) → [3dcoat.com/documentation/](https://3dcoat.com/documentation/) | 301 → 200；Main information - 3DCoat Documentation |
| 龋齿一号 | [www.gfxcamp.com/](http://www.gfxcamp.com/) → [www.gfxcamp.com/](https://www.gfxcamp.com/) | 301 → 200；龋齿一号GFXCamp – CG营地\|高速下载最新CG素材资源 |
| 3dart | [www.3dart.it/en/](https://www.3dart.it/en/) → [www.3dart.it/en/3d-art-community-the…](https://www.3dart.it/en/3d-art-community-the-hub-for-3d-artists-vfx-and-cgi-creators/) | 301 → 200；3D Art Community – The Hub for 3D Artists, VFX and CGI Creators - 3DArt3D A… |
| proko解剖学专题页 | [www.proko.com/course-lesson/anatomy-t…](https://www.proko.com/course-lesson/anatomy-terms/notes) → [www.proko.com/course-lesson/anatomy-t…](https://www.proko.com/course-lesson/anatomy-terms) | 302 → 200；Proko - The Language of Anatomy |
| airpano | [www.airpano.com/](http://www.airpano.com/) → [www.airpano.com/](https://www.airpano.com/) | 301 → 200；Virtual Travels, 360° Aerial Panoramas, 360Â° Virtual Tours Around the Worl… |
| Kostym | [www.kostym.cz/Anglicky/obsah.htm](http://www.kostym.cz/Anglicky/obsah.htm) → [www.kostym.cz/Anglicky/obsah.htm](https://www.kostym.cz/Anglicky/obsah.htm) | 301 → 206；Contents of www.kostym.cz |
| 汉服制版\|男子汉服的分类及裁剪图整理 | [www.bilibili.com/read/cv14535456](https://www.bilibili.com/read/cv14535456) → [www.bilibili.com/opus/607266353703516349](https://www.bilibili.com/opus/607266353703516349) | 301 → 301 → 200；汉服制版\|男子汉服的分类及裁剪图整理 - 哔哩哔哩 |
| 图欧学习导航 | [tuostudy.upnb.top/favorites/list/](https://tuostudy.upnb.top/favorites/list/) → [tuostudy.upnb.top/](https://tuostudy.upnb.top/) | 302 → 200；图欧学习资源导航站｜2026新版 |
| 相约久久地图 | [www.meet99.com/map/](https://www.meet99.com/map/) → [www.meet99.com/map](https://www.meet99.com/map) | 302 → 200；卫星地图 - 中国省、市、县、村各级地图浏览 |
| Git Documentation | [git-scm.com/doc](https://git-scm.com/doc) → [git-scm.com/docs](https://git-scm.com/docs) | 206 → HTML refresh → 301 → 206；Git - Reference |
| Unreal Engine Docs | [dev.epicgames.com/documentation/en-us/unr…](https://dev.epicgames.com/documentation/en-us/unreal-engine) → [dev.epicgames.com/documentation/en-us/unr…](https://dev.epicgames.com/documentation/en-us/unreal-engine/unreal-engine-5-8-documentation) | 301 → 200；Unreal Engine 5.8 Documentation \| Unreal Engine 5.8 Documentation \| Epic De… |
| GitHub Pages | [docs.github.com/pages](https://docs.github.com/pages) → [docs.github.com/en/pages](https://docs.github.com/en/pages) | 302 → 206；GitHub Pages documentation - GitHub Docs |
| Lospec Palette List | [lospec.com/palettes/](https://lospec.com/palettes/) → [lospec.com/palette-list](https://lospec.com/palette-list) | 302 → 200；Palette List |
| Xbox Accessibility Guidelines | [learn.microsoft.com/en-gb/gaming/accessibil…](https://learn.microsoft.com/en-gb/gaming/accessibility/guidelines) → [learn.microsoft.com/en-gb/xbox/accessibilit…](https://learn.microsoft.com/en-gb/xbox/accessibility/guidelines) | 301 → 200；Xbox Accessibility Guidelines - Microsoft Game Dev \| Microsoft Learn |
| Ubisoft | [www.ubisoft.com/en-us/](https://www.ubisoft.com/en-us/) → [www.ubisoft.com/en-us](https://www.ubisoft.com/en-us) | 308 → 200；Ubisoft |
| GOG | [www.gog.com/](https://www.gog.com/) → [www.gog.com/zh/](https://www.gog.com/zh/) | 302 → 200；欢迎来到 GOG.com \| 最好的 DRM-free 游戏 |
| Fanatical | [www.fanatical.com/](https://www.fanatical.com/) → [www.fanatical.com/en/](https://www.fanatical.com/en/) | 301 → 206；FanaticalOpen menu |
| QQ | [im.qq.com/pcqq](https://im.qq.com/pcqq) → [im.qq.com/pcqq/index.shtml](https://im.qq.com/pcqq/index.shtml) | 302 → 206；QQ Windows版-轻松做自己 |
| 中国蓝光网 | [www.languangdy.com/](http://www.languangdy.com/) → [www.languangdy.com/](https://www.languangdy.com/) | 301 → 200；1分钟搞定【免费】【在线观看】【4K】【原盘】【高清电影】和全网电视剧/短剧-中国蓝光网丨蓝光电影网\|蓝光影院\|高清电影网\|高清电影\|蓝光原盘\|蓝光电… |
| 中国色 | [zhongguose.com/](http://zhongguose.com/#danshuhong) → [zhongguose.com/](https://zhongguose.com/) | 301 → 206；中国色官网 － 传统颜色 |
| adobe color | [color.adobe.com/zh/create/color-wheel](https://color.adobe.com/zh/create/color-wheel) → [color.adobe.com/cn/create/color-wheel](https://color.adobe.com/cn/create/color-wheel) | 301 → 206；颜色搭配生成器–色轮工具 \| Adobe Express |
| 千库网 | [588ku.com/](http://588ku.com/) → [588ku.com/](https://588ku.com/) | 301 → 200；千库网_免费png图片背景素材下载,商用版权设计素材图库 |
| 方正字库 | [www.foundertype.com/](http://www.foundertype.com/) → [www.foundertype.com/](https://www.foundertype.com/) | 301 → 206；方正字库官网 |
| 图翼 | [www.tuyiyi.com/t-7913-1.html](http://www.tuyiyi.com/t-7913-1.html) → [www.tuyiyi.com/t-7913-1.html](https://www.tuyiyi.com/t-7913-1.html) | 301 → 200；中文字体 - 图翼网(TUYIYI.COM) - 设计师互动分享平台 |
| 中文字体-站长素材 | [font.chinaz.com/zhongwenziti.html](http://font.chinaz.com/zhongwenziti.html) → [font.chinaz.com/zhongwenziti.html](https://font.chinaz.com/zhongwenziti.html) | 301 → 200；中文字体、中文字体免费下载和在线预览-font.chinaz.com |
| 家纺趋势 | [www.91jiafang.com/](http://www.91jiafang.com/) → [www.91jiafang.com/](https://www.91jiafang.com/) | 301 → 200；POP家居趋势网_家居家纺设计_家居家纺流行趋势_家装灵感款式图片素材 |
| 设计癖 | [www.shejipi.com/](http://www.shejipi.com/) → [www.shejipi.com/](https://www.shejipi.com/) | 301 → 200；设计癖 - 设计眼，看世界 |
| 字由（secondary） | [www.hellofont.cn/](http://www.hellofont.cn/) → [www.hellofont.cn/](https://www.hellofont.cn/) | 302 → 200；字由官网 \| 千款免费字体一键使用，设计师必备字体工具 |

需注意：美叶具体 canvas 入口落到首页；reeoo 进入 App 灵感页；Origin/EA App 进入 EA 的 PC 下载页；Microsoft 365 进入含 Copilot 的产品门户。这些站点身份正常，但入口用途是否符合当前资料库应另行决定。Outlook 虽为同品牌邮箱入口，但最终仅应用壳、未登录验证，计 D。Git Documentation 初始 206 HTML 声明跳到 `http://git-scm.com/docs`，另请求目标后 HTTP 跳 HTTPS 并取得“Git - Reference”，所以计 B；没有把 HTML refresh 写成初始 HTTP 301。

## 8. HTTP / HTTPS 专项

当前共有 39 个 HTTP active URL（38 主入口、1 secondary）。与合并前相比，Costumers 的 About 历史入口已不在 active URL 中。未请求历史 About URL。

| HTTP 专项类别 | 数量 |
| --- | --- |
| 1. HTTP 正常，HTTPS 不可确认 | 12 |
| 2. HTTP 自动跳 HTTPS | 15 |
| 3. HTTPS 正常，catalog 仍为 HTTP | 5 |
| 4. HTTP/HTTPS 都有异常 | 6 |
| 5. 无法确认 | 1 |

第 2 类只描述协议跳转，不保证内容正常：其中 Art Of Soulburn、POP趋势服装、字体传奇网最终为验证/拦截页，仍属于 D。17 个未来升级候选为 12 个已跳正常 HTTPS 的入口、4 个直接 HTTPS 正常的入口，以及 HTTP 连接重置但 HTTPS 正常的超能搜。它们是 URL 候选数量，未自动修改。

| 实体 / 当前 HTTP URL | HTTP / HTTPS 实测 | 专项类别 / 后续建议 |
| --- | --- | --- |
| 龋齿一号；[www.gfxcamp.com/](http://www.gfxcamp.com/) | 200 / 200 | 2；可升级候选 → [www.gfxcamp.com/](https://www.gfxcamp.com/) |
| modown魔顿；[www.modown.cn/](http://www.modown.cn/) | 200 / 200 | 1；HTTPS 请求退回 HTTP，不算升级候选 |
| The Costumer's Guide to Movie Costumes；[www.costumersguide.com/](http://www.costumersguide.com/) | 206 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| 电影拉片学院；[www.movieminer.top/](http://www.movieminer.top/#) | 403 / 无响应 / curl 28 | 4；保留现状，未确认正常 HTTPS |
| reference angle；[referenceangle.com/](http://referenceangle.com/) | 无响应 / curl 6 / 无响应 / curl 6 | 4；保留现状，未确认正常 HTTPS |
| zpz 学员作品主页；[zpzdesign.artp.cc/works](http://zpzdesign.artp.cc/works) | 200 / 无响应 / curl 28 | 1；保留现状，未确认正常 HTTPS |
| Art Of Soulburn；[www.neilblevins.com/](http://www.neilblevins.com/) | 403 / 无响应 / curl 60 | 2；保留现状，未确认正常 HTTPS |
| airpano；[www.airpano.com/](http://www.airpano.com/) | 200 / 200 | 2；可升级候选 → [www.airpano.com/](https://www.airpano.com/) |
| POP趋势服装；[www.pop-fashion.com/patterns/graphics/](http://www.pop-fashion.com/patterns/graphics/?pid=000535) | 200 / 200 | 2；保留现状，未确认正常 HTTPS |
| silk；[weavesilk.com/](http://weavesilk.com/) | 200 / 200 | 3；可升级候选 → [weavesilk.com/](https://weavesilk.com/) |
| Moritz Jendrl；[moritz-jendrl.de/](http://moritz-jendrl.de/) | 无响应 / curl 6 / 无响应 / curl 6 | 4；保留现状，未确认正常 HTTPS |
| Survival Game Fashion Snap；[sg-fashion-snap.com/archives/category/men](http://sg-fashion-snap.com/archives/category/men) | 200 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| Loveblush Bridal；[www.loveblushbridal.com/](http://www.loveblushbridal.com/) | 200 / 无响应 / curl 28 | 4；保留现状，未确认正常 HTTPS |
| Elizabethan Costume；[www.elizabethancostume.net/](http://www.elizabethancostume.net/) | 200 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| Larsdatter；[www.larsdatter.com/18c/index.html](http://www.larsdatter.com/18c/index.html) | 206 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| Kostym；[www.kostym.cz/Anglicky/obsah.htm](http://www.kostym.cz/Anglicky/obsah.htm) | 206 / 206 | 2；可升级候选 → [www.kostym.cz/Anglicky/obsah.htm](https://www.kostym.cz/Anglicky/obsah.htm) |
| Photo Detective；[www.photodetective.co.uk/Index.html](http://www.photodetective.co.uk/Index.html) | 206 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| 汉服资料馆；[120.25.237.190/hanfu/index.html](http://120.25.237.190/hanfu/index.html) | 206 / 无响应 / curl 28 | 1；保留现状，未确认正常 HTTPS |
| 走读派；[www.zoudupai.com/](http://www.zoudupai.com/) | 206 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| 书享家；[shuxiangjia.cn/](http://shuxiangjia.cn/) | 403 / 无响应 / curl 35 | 4；保留现状，未确认正常 HTTPS |
| 超能搜；[chaonengsou.com/](http://chaonengsou.com/) | 无响应 / curl 56 / 200 | 3；可升级候选 → [chaonengsou.com/](https://chaonengsou.com/) |
| 枪炮世界；[pewpewpew.work/index.htm](http://pewpewpew.work/index.htm) | 200 / 无响应 / curl 7 | 1；保留现状，未确认正常 HTTPS |
| 地图窝 中国历史地图；[www.onegreen.net/maps/List/List_787.html](http://www.onegreen.net/maps/List/List_787.html) | 206 / 无响应 / curl 60 | 1；保留现状，未确认正常 HTTPS |
| 中国古代史地图；[home.olemiss.edu/~gg/hstrymap/lishidit.htm](http://home.olemiss.edu/~gg/hstrymap/lishidit.htm) | 206 / 206 | 3；可升级候选 → [home.olemiss.edu/~gg/hstrymap/lishidit.htm](https://home.olemiss.edu/~gg/hstrymap/lishidit.htm) |
| 国学导航－中国历史地图集；[www.guoxue123.com/other/map/zgmap/](http://www.guoxue123.com/other/map/zgmap/) | 206 / 无响应 / curl 28 | 1；保留现状，未确认正常 HTTPS |
| AmCharts像素图生成器；[pixelmap.amcharts.com/](http://pixelmap.amcharts.com/#) | 无响应 / curl 28 / 无响应 / curl 28 | 5；保留现状，未确认正常 HTTPS |
| 中国蓝光网；[www.languangdy.com/](http://www.languangdy.com/) | 200 / 200 | 2；可升级候选 → [www.languangdy.com/](https://www.languangdy.com/) |
| 中国色；[zhongguose.com/](http://zhongguose.com/#danshuhong) | 206 / 206 | 2；可升级候选 → [zhongguose.com/](https://zhongguose.com/) |
| 千库网；[588ku.com/](http://588ku.com/) | 200 / 200 | 2；可升级候选 → [588ku.com/](https://588ku.com/) |
| 方正字库；[www.foundertype.com/](http://www.foundertype.com/) | 206 / 206 | 2；可升级候选 → [www.foundertype.com/](https://www.foundertype.com/) |
| 腾祥字库；[www.tensentype.com/](http://www.tensentype.com/) | 200 / 200 | 3；可升级候选 → [www.tensentype.com/](https://www.tensentype.com/) |
| 本墨字库；[www.benmo.biz/](http://www.benmo.biz/) | 403 / 无响应 / curl 35 | 4；保留现状，未确认正常 HTTPS |
| 图翼；[www.tuyiyi.com/t-7913-1.html](http://www.tuyiyi.com/t-7913-1.html) | 200 / 200 | 2；可升级候选 → [www.tuyiyi.com/t-7913-1.html](https://www.tuyiyi.com/t-7913-1.html) |
| 中文字体-站长素材；[font.chinaz.com/zhongwenziti.html](http://font.chinaz.com/zhongwenziti.html) | 200 / 200 | 2；可升级候选 → [font.chinaz.com/zhongwenziti.html](https://font.chinaz.com/zhongwenziti.html) |
| 汉仪字库；[www.hanyi.com.cn/productList.php](http://www.hanyi.com.cn/productList.php) | 200 / 200 | 3；可升级候选 → [www.hanyi.com.cn/productList.php](https://www.hanyi.com.cn/productList.php) |
| 字体传奇网；[www.ziticq.com/](http://www.ziticq.com/) | 403 / 403 | 2；保留现状，未确认正常 HTTPS |
| 家纺趋势；[www.91jiafang.com/](http://www.91jiafang.com/) | 200 / 200 | 2；可升级候选 → [www.91jiafang.com/](https://www.91jiafang.com/) |
| 设计癖；[www.shejipi.com/](http://www.shejipi.com/) | 200 / 200 | 2；可升级候选 → [www.shejipi.com/](https://www.shejipi.com/) |
| 字由（secondary）；[www.hellofont.cn/](http://www.hellofont.cn/) | 200 / 200 | 2；可升级候选 → [www.hellofont.cn/](https://www.hellofont.cn/) |

字由 secondary：`http://www.hellofont.cn/` → 302 → `https://www.hellofont.cn/` → 200，标题与字体工具官网身份一致，列 B/L2 和可升级候选；primary 的客户端下载入口也正常。modown 的 HTTPS 请求最终退回 `http://www.modown.cn/`，即使返回 200 也不算正常 HTTPS。证书失败的旧站未跳过校验；HTTP 内容正常者暂保留，不因技术栈旧建议删除。

## 9. BLOCKED_OR_UNCONFIRMED：191 项

以下全部为 D，默认 L3 暂保留。`0` 表示没有 HTTP 响应，不是 HTTP 0 状态。curl 6=DNS 解析失败；7=连接失败；28=超时；35=TLS 握手失败；52=空响应；56=接收/连接重置；60=证书验证失败。403/429/401、挑战页及空响应不证明失效。

| 实体 / 当前 URL | 实测障碍 |
| --- | --- |
| [UE5 Document](https://docs.unrealengine.com/5.1/en-US/) | 403；访问被拒或身份未确认 |
| [marvelous designer官方手册](https://support.marvelousdesigner.com/hc/zh-cn/categories/360002390871) | 403；Just a moment... |
| [myminifactory](https://www.myminifactory.com/) | 403；Just a moment... |
| [Poliigon](https://www.poliigon.com/) | 403；Just a moment... |
| [KIT OPS 2 Manual](https://docs.google.com/document/d/1rUzomyTi7ec2sFqeCgyVYgkbdnmVanlDCWYcvAzxOXE/edit) | curl 28；超时；有限重试仍未取得内容 |
| [Gumroad](https://app.gumroad.com/library) | curl 28；超时；有限重试仍未取得内容 |
| [blender魔酷网](https://blender.kim/) | HTTP/2 异常后 HTTP/1.1 复核连接重置（56） |
| [BlenderBros的Gumroad](https://theblenderbros.gumroad.com/) | curl 28；超时；有限重试仍未取得内容 |
| [画忆妙妙屋](https://www.iiicg.com/) | 403；访问被拒或身份未确认 |
| [CG pepper](https://www.cgpepper.com/) | curl 60；证书验证失败 |
| [aboutcg](https://www.aboutcg.com/) | curl 60；证书验证失败 |
| [Midjourney页面端](https://www.midjourney.com/editor/new) | 403；Just a moment... |
| [Toolify](https://www.toolify.ai/zh/?ref=qinggongju.com) | 403；Just a moment... |
| [free3d](https://free3d.com/) | curl 28；超时；有限重试仍未取得内容 |
| [书生CG资源网](https://c4dsky.com/) | curl 28；超时；有限重试仍未取得内容 |
| [TapNow](https://app.tapnow.ai/#/home) | curl 28；超时；有限重试仍未取得内容 |
| [Lovart](https://www.lovart.ai/zh/home) | curl 28；超时；有限重试仍未取得内容 |
| [Chat GPT](https://chatgpt.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Prompt Hero](https://prompthero.com/) | curl 7；连接失败 |
| [Google Gemini](https://gemini.google.com/app) | curl 28；超时；有限重试仍未取得内容 |
| [midjourney 官方画廊](https://www.midjourney.com/showcase) | 403；Just a moment... |
| [Pixabay](https://pixabay.com/) | 403；Just a moment... |
| [Pexels](https://www.pexels.com/zh-tw/) | 403；Just a moment... |
| [Suno](https://suno.com/create) | curl 28；超时；有限重试仍未取得内容 |
| [Tripo 3D](https://www.tripo3d.ai/zh) | curl 28；超时；有限重试仍未取得内容 |
| [civitai](https://civitai.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Unsplash](https://unsplash.com/) | 401；Making sure you're not a bot! |
| [花瓣](https://huaban.com/home/) | 200，但正文/title/meta 不足，身份未确认 |
| [Fandom](https://www.fandom.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Pinterest](https://www.pinterest.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Google images](https://www.google.com/imghp?tbm=isch&ved=2ahUKEwiqtbHji8P3AhUcGTQIHTgRC-IQ2-cCegQIABAA) | curl 28；超时；有限重试仍未取得内容 |
| [有关榫卯，这里有最详细的介绍](https://zhuanlan.zhihu.com/p/71813034) | 403；访问被拒或身份未确认 |
| [bodies in motion](https://www.bodiesinmotion.photo/) | 403；Just a moment... |
| [电影拉片学院](http://www.movieminer.top/#) | 403 / Non-compliance ICP Filing |
| [flickr](https://www.flickr.com/) | curl 28；超时；有限重试仍未取得内容 |
| [谷歌地球](https://earth.google.com/) | curl 28；超时；有限重试仍未取得内容 |
| [reference angle](http://referenceangle.com/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [art grid](https://artgrid.io/) | 403；Attention Required! \| Cloudflare |
| [film-grab](https://film-grab.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Art Of Soulburn](http://www.neilblevins.com/) | 跳 Art Of Soulburn 后 Cloudflare 验证 |
| [MFD设计师导航](https://www.mfchange.cn/index.html) | 403；Apache网站防火墙 |
| [MFD设计师导航（secondary）](https://mfchange.cn/index.html) | 403；Apache网站防火墙 |
| [concept art world](https://conceptartworld.com/) | 200；明确临时维护页，不能证明永久关闭 |
| [大都会博物馆](https://www.metmuseum.org/zh) | 429 / Vercel Security Checkpoint |
| [Now Fashion](https://nowfashion.com/) | 403；Just a moment... |
| [POP趋势服装](http://www.pop-fashion.com/patterns/graphics/?pid=000535) | 200；系统环境监测/验证页 |
| [ArtStation](https://www.artstation.com) | curl 28；超时；有限重试仍未取得内容 |
| [DeviantArt](https://www.deviantart.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Pixiv](https://www.pixiv.net/) | curl 28；超时；有限重试仍未取得内容 |
| [Fantasmagoria](https://fantasmagoria.shop/) | 403；Just a moment... |
| [Moritz Jendrl](http://moritz-jendrl.de/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [Vertugadins](https://www.vertugadins.com/location/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [Colonial Williamsburg](https://emuseum.history.org/) | 403；Just a moment... |
| [Loux The Vintage Guru](https://louxthevintageguru.tumblr.com/tagged/loux) | curl 28；超时；有限重试仍未取得内容 |
| [Style Korea](https://stylekorea.tumblr.com/) | curl 28；超时；有限重试仍未取得内容 |
| [汉服荟商城](https://m.hanfuhui.com/) | 跳 www 后重复 500 |
| [Recycled Movie Costumes](https://recycledmoviecostumes.tumblr.com/) | curl 28；超时；有限重试仍未取得内容 |
| [10分钟带你了解西方服装史](https://zhuanlan.zhihu.com/p/440541640) | 403；访问被拒或身份未确认 |
| [雅衿汉服社 汉服形制科普](https://www.bilibili.com/read/cv8121944/) | 200；未取得文章内容或标题 |
| [说给汉服 微博主页](https://weibo.com/u/5129313642) | 复核 200 / Sina Visitor System，未取得微博主页 |
| [知乎问题"汉服种类有哪些"](https://www.zhihu.com/question/47581644/answer/1790717469) | 403；访问被拒或身份未确认 |
| [汉服裁剪图 知乎文章](https://zhuanlan.zhihu.com/p/64626495) | 403；访问被拒或身份未确认 |
| [唐背子小科普](https://www.bilibili.com/read/cv9899778) | 200；原文章标题/正文未取得 |
| [设计 \\| 常见的汉服款式赏析](https://zhuanlan.zhihu.com/p/426806809) | 403；访问被拒或身份未确认 |
| [高校AC](https://www.gaoxiaoac.com/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [书享家](http://shuxiangjia.cn/) | 403 / Non-compliance ICP Filing |
| [超能搜](http://chaonengsou.com/) | HTTP 连接重置；HTTPS 同站内容正常，见升级候选 |
| [历史时尚](https://www.pinterest.com/thedreamstress/) | curl 28；超时；有限重试仍未取得内容 |
| [百度网盘（secondary）](https://pan.baidu.com/disk/main?from=homeFlow#/index?category=all) | 200；百度网盘账户工作区，未登录确认 |
| [Chat Doc](https://chatdoc.com/chatdoc/#/upload) | curl 28；超时；有限重试仍未取得内容 |
| [欧洲区域时尚](https://www.pinterest.com/WEuropeCostumes/) | curl 28；超时；有限重试仍未取得内容 |
| [163邮箱](https://mail.163.com/) | 200；邮箱登录页，未登录验证 |
| [126邮箱](https://www.126.com/) | 200；邮箱登录页，未登录验证 |
| [网易见外工作台](https://jianwai.youdao.com/) | 200；工作台应用壳，未验证账户内功能 |
| [Outlook](https://outlook.live.com/) | 200；转 /mail 邮箱应用壳，未登录验证 |
| [民族语言](https://www.ethnologue.com/) | 403；Just a moment... |
| [Stonefinder](https://www.pinterest.com/stonefinder/) | curl 28；超时；有限重试仍未取得内容 |
| [谷歌云盘](https://drive.google.com/drive) | curl 28；超时；有限重试仍未取得内容 |
| [MEGA](https://mega.nz/) | curl 28；超时；有限重试仍未取得内容 |
| [华为云](https://www.huaweicloud.com/) | 200；未取得可判断身份的内容 |
| [曲奇云盘](https://quqi.com/) | curl 28；超时；有限重试仍未取得内容 |
| [freeCodeCamp](https://www.freecodecamp.org/learn/) | 206；正文/title/meta 不足 |
| [Stack Overflow](https://stackoverflow.com/) | 403；Just a moment... |
| [GAME UI database](https://gameuidatabase.com/index.php) | 403；访问被拒或身份未确认 |
| [爱给网_音效配乐](https://www.aigei.com/?msclkid=957ac64ddf3a18901fedaea0088c1876) | 403；爱给网 |
| [Sonniss GameAudioGDC](https://sonniss.com/gameaudiogdc/) | 403；Just a moment... |
| [FMOD](https://www.fmod.com/) | 200；正文/title/meta 不足 |
| [OpenStreetMap](https://www.openstreetmap.org/#map=7/40.053/118.169/) | curl 28；超时；有限重试仍未取得内容 |
| [NGA玩家社区](https://ngabbs.com/) | 403；访客不能直接访问 |
| [Nexus Mods](https://www.nexusmods.com/) | 403；Just a moment... |
| [Mod DB](https://www.moddb.com/) | 403；Just a moment... |
| [1LOU（仅供学习）](https://www.1lou.icu/forum-9.htm) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [Epic Games Store](https://store.epicgames.com/zh-Hant/) | 403；访问被拒或身份未确认 |
| [Artlist](https://artlist.io/) | curl 28；超时；有限重试仍未取得内容 |
| [Game Developer - Design](https://www.gamedeveloper.com/design) | curl 28；超时；有限重试仍未取得内容 |
| [itch.io Game Assets](https://itch.io/game-assets) | curl 28；超时；有限重试仍未取得内容 |
| [Steam Database](https://steamdb.info/) | 403；SteamDB |
| [Humble Bundle](https://www.humblebundle.com/) | 200；正文/title/meta 不足 |
| [OpenCritic](https://opencritic.com/) | curl 52；空响应 |
| [PCGamingWiki](https://www.pcgamingwiki.com/wiki/Home) | 403；Attention Required! \| Cloudflare |
| [Sig Sauer](https://www.sigsauer.com/) | 403；Attention Required! \| Cloudflare |
| [Uberti](https://www.uberti-usa.com/) | 403；Attention Required! \| Cloudflare |
| [Steam创意工坊](https://steamcommunity.com/workshop/) | curl 28；超时；有限重试仍未取得内容 |
| [火器百科](https://huoqibaike.club/wiki/%E9%A6%96%E9%A1%B5) | 200；未取得百科正文 |
| [武器列表 - Britannica](https://www.britannica.com/topic/list-of-weapons-2058724) | 403；Just a moment... |
| [AR15主页](https://www.ar15.com/) | 403；Attention Required! \| Cloudflare |
| [US Militaria Forum](https://www.usmilitariaforum.com/forums/index.php) | 403；Attention Required! \| Cloudflare |
| [Gun Broker](https://www.gunbroker.com/) | 403；Attention Required! \| Cloudflare |
| [Rock Island Auction](https://www.rockislandauction.com/) | 403；Attention Required! \| Cloudflare |
| [Tactical Weapons](https://rct66.tumblr.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Library of Congress](https://www.loc.gov/) | 403；Just a moment... |
| [知乎文章：历史爱好者福利](https://zhuanlan.zhihu.com/p/25658582) | 403；访问被拒或身份未确认 |
| [Gun Wiki](https://guns.fandom.com/wiki/Main_Page) | curl 28；超时；有限重试仍未取得内容 |
| [Khan Academy World History](https://www.khanacademy.org/humanities/world-history) | 206 / Client Challenge |
| [Encyclopedia Britannica](https://www.britannica.com/) | 403；Just a moment... |
| [CSP优动漫](https://www.udongman.cn/order/software/center) | 200；转到 /login，软件入口操作未确认 |
| [Old Maps Online](https://www.oldmapsonline.org/) | curl 28；超时；有限重试仍未取得内容 |
| [谷歌地图](https://www.google.com/maps/) | curl 28；超时；有限重试仍未取得内容 |
| [MacPedia](https://macpedia.xyz/) | 403；Attention Required! \| Cloudflare |
| [网飞猫](https://www.ncat22.com/) | 850 / cdndefend 浏览器验证 |
| [低端影视](https://ddys.pro/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [AmCharts像素图生成器](http://pixelmap.amcharts.com/#) | curl 28；超时；有限重试仍未取得内容 |
| [IMDB 电影社区](https://www.imdb.com/?ref_=nv_home) | 202；无可判定身份的内容 |
| [音范丝](https://www.yinfans.me/) | 200 / Loading…，未取得资源内容 |
| [coolors](https://coolors.co/palettes/trending) | 403；Just a moment... |
| [icolorpalette](https://icolorpalette.com/) | 403；Just a moment... |
| [color supplyy](https://colorsupplyyy.com/app) | 206；正文/title/meta 不足 |
| [colourcode](https://www.toptal.com/designers/colourcode) | 403；Just a moment... |
| [GitHub](https://github.com/) | curl 28；超时；有限重试仍未取得内容 |
| [搜图导航](https://www.91sotu.com/) | 403；宝塔网站防火墙免费版 |
| [Artchips艺术碎片](https://artchips.art/) | curl 6；DNS 失败，有限重试仍失败；非 NXDOMAIN 证据 |
| [本墨字库](http://www.benmo.biz/) | 403；访问被拒或身份未确认 |
| [500px](https://web.500px.com/) | curl 35；TLS 握手失败 |
| [字体传奇网](http://www.ziticq.com/) | 403；宝塔网站防火墙免费版 |
| [UI中国](https://www.ui.cn/) | 403；访问被拒或身份未确认 |
| [腾讯文档](https://docs.qq.com/desktop) | 200；腾讯文档应用壳，正文不足 |
| [MindMeister](https://www.mindmeister.com/) | 403；Just a moment... |
| [Lucidchart](https://lucidchart.com/) | 403；Access Denied |
| [蓝光电影网](https://www.4k1080.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Online-Convert](https://www.online-convert.com/) | 403；Just a moment... |
| [Adobe XD](https://www.adobe.com/products/xd.html) | 403；Access Denied |
| [Canva](https://www.canva.com/) | 403；Canva |
| [图品汇](https://www.88tph.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) | 206；Your request has been blocked |
| [MuseScore 乐谱社区](https://musescore.com/sheetmusic) | 403；Just a moment... |
| [Google Docs](https://docs.google.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Every Noise at Once](https://www.everynoise.com/) | 403；Just a moment... |
| [VI-Control 社区](https://vi-control.net/community/) | 403；Just a moment... |
| [KVR Audio 论坛](https://www.kvraudio.com/forum/) | 403；Just a moment... |
| [Rate Your Music](https://rateyourmusic.com/) | 403；Just a moment... |
| [万兴优转](https://www.media.io/zh/) | curl 28；超时；有限重试仍未取得内容 |
| [Gearspace](https://www.gearslutz.com/board/) | 跳 gearspace 后 Cloudflare 验证 |
| [Discord](https://discord.com/) | curl 28；超时；有限重试仍未取得内容 |
| [GitLab](https://gitlab.com/) | 301 至 about.gitlab.com 后超时 |
| [Reddit 音乐理论社区](https://www.reddit.com/r/musictheory/) | curl 28；超时；有限重试仍未取得内容 |
| [Spotify](https://open.spotify.com/) | curl 28；超时；有限重试仍未取得内容 |
| [Reddit 作曲社区](https://www.reddit.com/r/composer/) | curl 28；超时；有限重试仍未取得内容 |
| [Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev/releases) | curl 28；超时；有限重试仍未取得内容 |

Wikipedia 同域 33 项均超时、没有 HTTP 响应，按 D/L3 保留。短超时和本机网络限制可能影响结果，没有据此否定页面存在：

- [Wikipedia](https://en.wikipedia.org/wiki/Main_Page)
- [维基百科-西方服饰史](https://en.wikipedia.org/wiki/History_of_Western_fashion)
- [Gun 枪列表](https://en.wikipedia.org/wiki/Gun)
- [List of Battle Rifles](https://en.wikipedia.org/wiki/List_of_battle_rifles)
- [List of Assault Rifles](https://en.wikipedia.org/wiki/List_of_assault_rifles)
- [List of Sniper Rifles](https://en.wikipedia.org/wiki/List_of_sniper_rifles)
- [List of Pistols](https://en.wikipedia.org/wiki/List_of_pistols)
- [Table of Handgun and Rifle Cartridges](https://en.wikipedia.org/wiki/Table_of_handgun_and_rifle_cartridges)
- [List of Handgun Cartridges](https://en.wikipedia.org/wiki/List_of_handgun_cartridges)
- [Category: Firearm Components](https://en.wikipedia.org/wiki/Category:Firearm_components)
- [List of Telescope Parts and Construction](https://en.wikipedia.org/wiki/List_of_telescope_parts_and_construction)
- [Category: Firearm Actions](https://en.wikipedia.org/wiki/Category:Firearm_actions)
- [Rail Integration System](https://en.wikipedia.org/wiki/Rail_Integration_System)
- [Glossary of Firearms Terms](https://en.wikipedia.org/wiki/Glossary_of_firearms_terms)
- [Category: History](https://en.wikipedia.org/wiki/Category:History)
- [Category: Regions](https://en.wikipedia.org/wiki/Category:Regions)
- [Category: History by Ethnic Group](https://en.wikipedia.org/wiki/Category:History_by_ethnic_group)
- [Category: History by Location](https://en.wikipedia.org/wiki/Category:History_by_location)
- [Human History](https://en.wikipedia.org/wiki/Human_history)
- [History of England](https://en.wikipedia.org/wiki/History_of_England)
- [History of Germany](https://en.wikipedia.org/wiki/History_of_Germany)
- [History of France](https://en.wikipedia.org/wiki/History_of_France)
- [Vikings](https://en.wikipedia.org/wiki/Vikings)
- [Ancient Greece](https://en.wikipedia.org/wiki/Ancient_Greece)
- [Ancient Rome](https://en.wikipedia.org/wiki/Ancient_Rome)
- [Byzantine Empire](https://en.wikipedia.org/wiki/Byzantine_Empire)
- [History of Italy](https://en.wikipedia.org/wiki/History_of_Italy)
- [Crusades](https://en.wikipedia.org/wiki/Crusades)
- [Ancient Egypt](https://en.wikipedia.org/wiki/Ancient_Egypt)
- [History of the Middle East](https://en.wikipedia.org/wiki/History_of_the_Middle_East)
- [History of the United States](https://en.wikipedia.org/wiki/History_of_the_United_States)
- [History of China](https://en.wikipedia.org/wiki/History_of_China)
- [History of Japan](https://en.wikipedia.org/wiki/History_of_Japan)

额外说明：Kdocs 和 EarMaster 首次 curl 23（写入/输出问题）后无 Range GET 均 200 且身份匹配，已计 A；OpenCritic 由 HTTP/2 错误复核为空响应（52），blender魔酷网复核连接重置（56），仍计 D。请求客户端差异不是永久失效的依据。

## 10. 四个用途不明确资源

### Gamer520（仅供学习） — res-f40af01b4876

当前入口 [www.gamer520.com/pcplay](https://www.gamer520.com/pcplay) 返回 206，标题“PC游戏下载|PC破解游戏资源下载”。首页栏目与游戏条目表明它是第三方 PC 游戏下载索引，兼有修改器等入口；不是游戏设计教程。现有 games / 游戏下载分类基本一致。可在确实仍使用该下载索引时保留；若已不用或与其他下载站重叠，可列删除候选，访问正常本身不足以决定保留。A，价值取舍 L2。未来 description 可写：“第三方 PC 游戏下载索引，含破解游戏版本及相关补丁资源。”未验证下载文件或链接质量。

### 1LOU（仅供学习） — res-26efb6488262

当前入口 [www.1lou.icu/forum-9.htm](https://www.1lou.icu/forum-9.htm) 多次 DNS 解析失败；独立 DNS-over-HTTPS 也因本机网络/TLS 限制无可用结果。不能确认当前页面身份或用途。它原在 games / 游戏下载分类，但本轮不能以历史分类反推现站身份。D/L3，暂保留并换网络人工核验；不能只凭本轮失败建议立即删除。若后续证实长期停站、无替代入口且已不用，再列删除候选。description 暂不建议具体正文；确认实际是游戏下载论坛后，才可考虑“游戏资源交流论坛，提供相关资源讨论与下载信息”，这不是本轮已确认事实。

### HDmoli — res-d284007428f0

当前入口 [www.hdmoli.com/](https://www.hdmoli.com/) 返回 200，标题“HDmoli - 高清电影、剧集与动画资源下载”；meta 与正文强调影片信息、评分、更新及网盘下载。更接近影视下载索引，现有 film / 影视在线的大类相关，但 section 的“在线观看”用途不够准确。A，分类/价值决定 L2。若仍需要下载索引可保留；若只保留在线观影入口或已有重复服务，可列删除候选。未来 description 可写：“电影、剧集与动画资源索引，提供影片信息及网盘下载入口。”未验证网盘链接或播放。另一个在线读取客户端曾超时，未推翻这次成功 GET 的内容证据。

### 4K影视 — res-2093fb1cd899

当前入口 [www.4kvm.tv/](https://www.4kvm.tv/) 返回 200，页面有电影、电视剧、动漫、片单、搜索及观看历史，身份为影视检索/观影站；与 film / 影视在线分类基本一致。A，保留价值取舍 L2。仍使用则可保留；若与其他影视站重复且不再使用，可列删除候选。未来 description 可写：“电影、剧集与动漫的在线观影与检索网站。”未验证实际播放，也不以名称“4K”断言所有内容达到 4K。

## 11. 旧异常问题复核

### 176 个旧 unconfirmed

| 本轮类别 | 数量 |
| --- | --- |
| A. HEALTHY | 16 |
| B. HEALTHY_REDIRECT | 0 |
| C. REVIEW_REDIRECT | 2 |
| D. BLOCKED_OR_UNCONFIRMED | 157 |
| E. BROKEN | 1 |
| F. IDENTITY_MISMATCH | 0 |

176 个旧 unconfirmed 均在当前 active 集合中且重新请求。16 个本轮确认正常，另 2 个需复核跳转、1 个当前 404；157 个仍无法确认。旧库共 486 个 URL，本轮 480；旧集合有 9 个已不再 active 的入口，本轮有 3 个旧集合未覆盖的入口。本轮没有为那 9 个历史地址重新发请求。

### 3 个旧检查未覆盖入口

| 实体 / 当前 URL | 本轮结果 |
| --- | --- |
| Clash Verge Rev；[github.com/clash-verge-rev/clash-v…](https://github.com/clash-verge-rev/clash-verge-rev/releases) | D；curl 28；超时；有限重试仍未取得内容 |
| Blender；[www.blender.org/](https://www.blender.org/) | A；200；Blender - The Free and Open Source 3D Creation Software — blender.org |
| 雷神加速器；[www.leigod.com/](https://www.leigod.com/) | A；200；雷神加速器-专线加速游戏,按分钟计费可暂停【官方网站】 |

### 7 个旧 DNS failure

| 实体 / 当前 URL | 结论 |
| --- | --- |
| Moritz Jendrl；[moritz-jendrl.de/](http://moritz-jendrl.de/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| reference angle；[referenceangle.com/](http://referenceangle.com/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| Artchips艺术碎片；[artchips.art/](https://artchips.art/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| 低端影视；[ddys.pro/](https://ddys.pro/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| 1LOU（仅供学习）；[www.1lou.icu/forum-9.htm](https://www.1lou.icu/forum-9.htm) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| 高校AC；[www.gaoxiaoac.com/](https://www.gaoxiaoac.com/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |
| Vertugadins；[www.vertugadins.com/location/](https://www.vertugadins.com/location/) | 本轮 curl 6；有限复核仍失败；两个公共 DoH 请求未取得答案。D/L3，不声称 NXDOMAIN 或永久失效。 |

### 4 个旧异常异域跳转

JAY仓库、我的书签、555电影、lughertexture 均仍有异常异域跳转，本轮全部 C/L1。具体链、目标域和风险见第 6、7 节，未因目标返回 200/206 改判正常。

### 16 个旧品牌 / 路径迁移线索

| 资源 | 本轮结论 |
| --- | --- |
| Blender Market | B；官方页面明确原名 Blender Market；同品牌更名，L1 更新入口候选。 |
| Gearspace | D；旧 Gearslutz 跳 Gearspace，但最终验证页，D/L3。 |
| Origin/EA App | B；EA 官方 PC 下载页，B/L2；旧 Origin 品牌入口已改变。 |
| Kimi AI | B；Kimi 官网新域名，B/L1。 |
| Vite | B；Vite 官网新域名，B/L1。 |
| Flim | B；Flim 应用入口迁移，B/L2。 |
| Lospec Palette List | B；同站路径迁移且文档/配色身份正常，L2 |
| 3DCoat Wiki | B；同站路径迁移且文档/配色身份正常，L2 |
| 文悦字库 | B；文悦字库官网新入口，B/L1。 |
| 图虫创意 | B；图虫创意素材库新入口，B/L1。 |
| reeoo | B；移动设计灵感变为 App 灵感页，B/L2。 |
| Art Of Soulburn | D；个人域名跳到 Art Of Soulburn，但最终 Cloudflare 拦截；D/L3。 |
| 热播之家 | B；相同热播之家名称与影视内容，B/L2；运营主体未独立核验。 |
| Spitfire LABS | C；官方说明 LABS 迁入 Splice INSTRUMENT，C/L2；产品与付费方案变化。 |
| Adobe XD | D；403 Access Denied；未确认 Adobe XD 当前产品状态，L3 |
| Color Claim | C；mymind 配色组合页面，C/L2；原 Color Claim 品牌及功能描述需复核。 |

旧 5 个 not-found 的 URL 均已不在当前 active 集合中；其中 3 项现为 NO_ACTIVE_URL，Clash 与雷神使用现行新入口，本轮仅审计这些现行入口，不请求旧死链。

### 无跳转但入口用途改变的正常站点

| 资源 / 当前 URL | 本轮身份及未来决定 |
| --- | --- |
| NOVIP；[findno.tv/](https://findno.tv/) | 200 / NO视频网址导航，当前是地址发布导航而非直接观影页；A/L2，决定是否将发布页作为主入口。 |
| 网飞猫备用；[dl.ncat22.com/](https://dl.ncat22.com/) | 200 / ncat.app，APP 永久发布及安装指南；A/L2，不等同于已验证备用观影入口。 |
| 许搜；[xn--p3tv7h.com/](https://xn--p3tv7h.com/) | 200 / 盘搜，正文为网盘资源搜索，含影视等类别；A/L2，名称与描述准确性后续人工决定。 |

这些页面有明确的同服务/相近用途内容，因此未判死链；本轮也没有跟随页面内发布地址去替换 catalog。

## 12. NO_ACTIVE_URL：11 个实体

| 实体 | ID | 状态 |
| --- | --- | --- |
| hdrlabs | res-ccafe101a1b7 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Atomic Jane Clothing | res-cb87182a0b47 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| 世界历史地图 | res-362623d636fc | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Microsoft Office | res-26ce40a4e924 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Xmind | res-526a4ab431c7 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Honeyview | res-3b65565237c5 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Adobe Creative Cloud | res-83dbf3146b95 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| App Cleaner & Uninstaller | res-61e2540c5015 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Scroll Reverser | res-e95bace475c6 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| Picsee | res-2b3e20dff7b4 | NO_ACTIVE_URL；未请求，未搜索补网址 |
| IINA | res-1c23a7b77657 | NO_ACTIVE_URL；未请求，未搜索补网址 |

## 13. 建议处理顺序与不变性验证

1. **L1：先处理当前入口失效或身份明显错误。** screenmusings、最U导航、LIBVIO；好猫字幕组_语雀、Loveblush Bridal、Quixel Bridge；以及 JAY仓库、我的书签、555电影、lughertexture 的异常跳转。先人工决定找回原入口、替换还是退休；本轮没有执行。
2. **L1：已明确的新官方入口迁移。** Blender Market → Superhive、Kimi、Vite、文悦字库、图虫创意、Zoom 可优先形成后续 URL 修正清单。正式修改前保留来源追溯；本轮只报告实测身份与地址。
3. **L2：产品、入口用途与保留价值。** Spitfire LABS、Color Claim、臭蛋蛋；Origin/EA App、Microsoft 365、美叶、reeoo；NOVIP、网飞猫备用、许搜；四个用途不明确资源的保留价值；以及 17 个 HTTPS 升级候选。不要把正常访问直接等同于值得保留。
4. **L3：拦截或网络限制。** D 类 191 个入口暂保留，换网络或普通浏览器做必要的人工复核。7 个 DNS 失败站点需独立 DNS 证据；Cloudflare、登录、维护、超时及证书问题不作为直接删库依据。11 个无 URL 实体继续 NO_ACTIVE_URL。

### 验证结果

- `node scripts/validate.mjs`：PASS。sources 498、entities 487、mergedSources 11、views 20、legacyPages 14、activeURLs 480、confirmedCorrections 9、urlLessRecords 11、internalLinks 209。
- `git diff --check`：PASS，退出码 0；另检查新增报告无行尾空白。
- 对审计开始时全部 161 个既有项目文件逐一比较 SHA-256：内容变化 0，删除 0；结束时共 162 个文件，唯一新增为 `docs/final-link-health-audit.md`。
- `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`docs/art-regrouping.json`、`scripts/validate.mjs` 均与审计开始时逐字节一致；其他既有文件亦一致。旧审计快照、P1 报告和 Costumers 合并报告未改动。
- 本轮新增：`docs/final-link-health-audit.md`。本轮修改：无。本轮删除：无。工作区原先已有的改动保留，不计为本轮改动。
- 没有 commit，没有 push。

