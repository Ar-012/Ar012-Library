# 第一阶段重构交付报告

日期：2026-09-27。主站已实现「个人资源与配置库」架构。未 commit、未 push、未修改远程配置。

原始 474 条主站资源 + 24 条音乐网站，共 498 个来源，映射为 489 个活动资源实体。合并 9 个重复来源；没有删除任何原始文件或丢弃原链接。

**盘点文档缺失：** 工作区与附件中未找到《个人资料网站-项目现状盘点.md》，已请求路径。本次以实际项目文件为依据完成实现，该文档仍需提供后补核。

## 1. 实际页面与目录

```text
Ar012-Library/
├── index.html                   首页：个人资源与配置库
├── library.html?view=…          一个共享模板，20 个有内容的领域视图
├── [原 14 个资源 HTML]          旧书签兼容视图，按新用途分组
├── password.html / 404.html     原有授权与错误页
├── data/
│   ├── catalog.js              唯一活动资源实体数据
│   ├── navigation.js           四区域 / 领域 / section / 资源 ID 引用
│   ├── legacy.js               旧页面资源 ID 集合
│   ├── pages.js                旧入口元信息
│   ├── configuration.schema.json 配置规范，无虚构实例
│   └── resources/              原 14 份数据快照，仅用于审计
├── js/catalog-view.js          新视图与旧入口解析
├── js/render-resources.js      共用原有卡片渲染
├── docs/                       映射、模型、待确认清单及验证报告
├── scripts/                    完整性校验和外链探测
└── output/playwright/          桌面/移动截图
```

| 一级区域 | 领域（实体数量；跨领域共享，不可直接相加） |
| --- | --- |
| 创作与工作 | 美术与设计 168（`?view=art`）；3D 48（`?view=3d`）；游戏制作 23（`?view=game-production`）；AI 23（`?view=ai`）；开发 21（`?view=development`）；音频与视频 18（`?view=av`）；工作与协作 31（`?view=work`） |
| 学习与研究 | 美术 5（`?view=art-study`）；游戏设计 6（`?view=game-study`）；历史 32（`?view=history`）；音乐 12（`?view=music-study`）；开发学习 4（`?view=code-study`）；综合资料 6（`?view=research`） |
| 日常与生活 | 游戏 30（`?view=games`）；影视 17（`?view=film`）；音乐 2（`?view=music`）；日常工具 30（`?view=daily`） |
| 设备与环境 | 软件 38（`?view=software`）；插件与扩展 7（`?view=extensions`）；系统与设备 6（`?view=system`） |

「我的配置」只定义 schema，当前没有真实配置内容，不创建空页面。开发学习与综合资料来自已有真实资源；未建立空的地理、英语、占星等页面。每个领域内 section 是页内锚点，不生成更多 HTML。

## 2. 数据结构

`id/name/description/url/icon/iconImage/type/topics/contexts/tags/links/sources/reviewNotes`。`url` 可为 null；`links` 保留合并前的多个原入口。导航只存 `resourceIds`，资源在多个用途下共享同一实体。来源原始名称、说明、URL、分组完整保存在 migration-map.json 中。

配置 schema 支持 `resourceId`、平台、软件版本、设置键值、快捷键、工作区、安装资源 ID 列表、恢复步骤、本地文件引用及更新时间；没有生成任何个人配置数据。详见 [架构说明](architecture.md)。

## 3. 旧 14 页面迁移去向

以下按来源条目计数。部分条目可共享到多个新领域，因此行内目标数量之和可能超过来源数。全部逐条映射见 [migration-map.json](migration-map.json)。

| 旧页面 | 来源条数 | 新去向（来源条数） |
| --- | ---: | --- |
| `3d-art.html` | 46 | 创作与工作 / 3D（42）；设备与环境 / 插件与扩展（5）；创作与工作 / 游戏制作（3）；学习与研究 / 游戏设计（1） |
| `ai-art.html` | 20 | 创作与工作 / AI（20） |
| `concept-art.html` | 47 | 创作与工作 / 美术与设计（35）；学习与研究 / 综合资料（3）；学习与研究 / 美术（5）；创作与工作 / 3D（2）；创作与工作 / 游戏制作（2） |
| `costume-fashion-design.html` | 45 | 创作与工作 / 美术与设计（45） |
| `daily-essentials.html` | 38 | 日常与生活 / 日常工具（29）；学习与研究 / 综合资料（3）；创作与工作 / 工作与协作（2）；创作与工作 / AI（3）；日常与生活 / 游戏（1） |
| `development.html` | 19 | 创作与工作 / 开发（15）；学习与研究 / 开发学习（4） |
| `game-design.html` | 23 | 创作与工作 / 游戏制作（18）；创作与工作 / 音频与视频（6）；学习与研究 / 游戏设计（5） |
| `games.html` | 29 | 日常与生活 / 游戏（29）；设备与环境 / 系统与设备（1） |
| `gun-design-reference.html` | 40 | 创作与工作 / 美术与设计（40） |
| `history.html` | 35 | 日常与生活 / 日常工具（1）；学习与研究 / 历史（32）；创作与工作 / 美术与设计（2） |
| `installation-software.html` | 35 | 设备与环境 / 软件（34）；日常与生活 / 音乐（1）；设备与环境 / 系统与设备（5）；创作与工作 / 开发（1）；创作与工作 / 音频与视频（2）；创作与工作 / 美术与设计（4）；创作与工作 / 3D（4）；日常与生活 / 游戏（2）；日常与生活 / 影视（1） |
| `video-film.html` | 16 | 日常与生活 / 影视（16） |
| `visual-communication.html` | 39 | 创作与工作 / 美术与设计（38）；创作与工作 / 音频与视频（1）；设备与环境 / 软件（1） |
| `work-tools-collaboration.html` | 42 | 创作与工作 / 工作与协作（29）；创作与工作 / 音频与视频（1）；创作与工作 / 美术与设计（6）；创作与工作 / 开发（6） |

具体拆分：Game Design 的理论、案例、GDC 进入学习；Kenney、itch.io、OpenGameArt 进入制作；音效共享给音频与视频。Video & Film 的实际 16 条全部是观看、下载与查询，未硬凑视频制作条目；OBS 与万兴优转从装机/工作页进入视频制作。Visual Communication 的 soundsnap 转入音效，Daily 的 AI 与学习导航独立归类。

## 4. Music Library 的 24 条逐条处理

仅读取当前工作区 resources.html，包含用户未提交内容；原文件原样保留。未导入音乐教程正文、听感模板、歌单唱片、配乐参考。

| 网站 | 新分类 | 实体处理 |
| --- | --- | --- |
| MuseScore 乐谱社区 | 学习与研究 / 音乐 / 乐谱资源 | 新增一个实体 |
| 8 Notes | 学习与研究 / 音乐 / 乐谱资源 | 新增一个实体 |
| IMSLP - Petrucci Music Library | 学习与研究 / 音乐 / 乐谱资源 | 新增一个实体 |
| Mutopia Project | 学习与研究 / 音乐 / 乐谱资源 | 新增一个实体 |
| Every Noise at Once | 学习与研究 / 音乐 / 音乐探索 | 新增一个实体 |
| MuseScore 软件下载 | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 软件 / 多媒体工具 | 复用已有 MuseScore 实体 |
| 网易云音乐 | 日常与生活 / 音乐 / 收听与发现 | 复用已有 网易云音乐 实体 |
| MusicTheory.net | 学习与研究 / 音乐 / 音乐学习 | 新增一个实体 |
| Teoria | 学习与研究 / 音乐 / 音乐学习 | 新增一个实体 |
| EarMaster | 学习与研究 / 音乐 / 音乐学习；设备与环境 / 软件 / 音频与音乐 | 新增一个实体 |
| Reddit 音乐理论社区 | 学习与研究 / 音乐 / 音乐社区 | 新增一个实体 |
| Reddit 作曲社区 | 学习与研究 / 音乐 / 音乐社区 | 新增一个实体 |
| VI-Control 社区 | 创作与工作 / 音频与视频 / 音乐制作 | 新增一个实体 |
| KVR Audio 论坛 | 创作与工作 / 音频与视频 / 音乐制作 | 新增一个实体 |
| Spotify | 日常与生活 / 音乐 / 收听与发现 | 新增一个实体 |
| Rate Your Music | 学习与研究 / 音乐 / 音乐探索 | 新增一个实体 |
| TonedEar | 学习与研究 / 音乐 / 音乐学习 | 新增一个实体 |
| Ableton Live | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 软件 / 音频与音乐 | 新增一个实体 |
| REAPER | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 软件 / 音频与音乐 | 新增一个实体 |
| Audacity | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 软件 / 音频与音乐 | 新增一个实体 |
| Freesound | 创作与工作 / 音频与视频 / 音效 | 复用已有 Freesound 实体 |
| Spitfire LABS | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 插件与扩展 / 音频插件与音色 | 新增一个实体 |
| Native Instruments | 创作与工作 / 音频与视频 / 音乐制作；设备与环境 / 插件与扩展 / 音频插件与音色 | 新增一个实体 |
| Gearspace | 创作与工作 / 音频与视频 / 音乐制作 | 新增一个实体 |

共 21 个新实体；MuseScore、网易云音乐、Freesound 复用已有实体。MuseScore 乐谱社区和 MuseScore 软件是不同用途的不同站点，保留为两个实体。

## 5. 确定重复的合并

这里只合并实体，不删除原始数据快照或任何原始 URL。

| 重复来源 | 复用实体 | 依据 |
| --- | --- | --- |
| 百度网盘 (`installation-software:1:3`) | 百度网盘 | 人工确认同一产品/网站的入口；保留各原始链接 |
| Steam (`installation-software:7:0`) | Steam | 人工确认同一产品/网站的入口；保留各原始链接 |
| Epic Games (`installation-software:7:1`) | Epic Games Store | 完全相同 URL |
| 刺猬星球 (`visual-communication:7:2`) | MFD设计师导航 | 人工确认同一产品/网站的入口；保留各原始链接 |
| 字由 (`visual-communication:10:3`) | 字由 | 人工确认同一产品/网站的入口；保留各原始链接 |
| GitHub (`work-tools-collaboration:6:0`) | GitHub | 完全相同 URL |
| MuseScore 软件下载 (`music:2:0`) | MuseScore | 完全相同 URL |
| 网易云音乐 (`music:2:1`) | 网易云音乐 | 完全相同 URL |
| Freesound (`music:5:6`) | Freesound | 完全相同 URL |

两个同名「AI美术」分组已并为 AI / 图像。同一个实体在同一领域内只出现一次。不同文章、版本手册、分站/备用站不因同域名而自动合并；例如 Costumers Guide 首页和 about 文章、Google 地图不同定位 URL、BlenderBros 主页与 Gumroad 均保留。

## 6. 不确定内容与保留位置

| 条目 | 保留位置 | 待确认原因 |
| --- | --- | --- |
| 即梦 | 创作与工作 / AI / 图像 | 缺少描述；依据原 AI 美术分组暂存 AI / 图像，未补写功能 |
| Deepseek | 创作与工作 / AI / 3D | 名称或描述与 URL/原分组不一致；暂存 AI / 3D，保留原文待核实 |
| Tripo 3D | 创作与工作 / AI / 3D | 名称或描述与 URL/原分组不一致；暂存 AI / 3D，保留原文待核实 |
| 高校AC | 学习与研究 / 综合资料 / 学习资源导航 | 跨领域学习导航，暂存学习与研究 / 综合资料，未强行分入具体学科 |
| 图欧学习导航 | 学习与研究 / 综合资料 / 学习资源导航 | 跨领域学习导航，暂存学习与研究 / 综合资料，未强行分入具体学科 |
| Microsoft Office | 设备与环境 / 软件 / 其他软件记录 | 原条目无链接，保留为软件记录；待补充真实入口 |
| Xmind | 设备与环境 / 软件 / 其他软件记录 | 原条目无链接，保留为软件记录；待补充真实入口 |
| Honeyview | 设备与环境 / 软件 / 其他软件记录 | 原条目无链接，保留为软件记录；待补充真实入口 |
| Adobe Creative Cloud | 设备与环境 / 软件 / 2D美术软件；创作与工作 / 美术与设计 / 视觉设计 · 软件与工具 | 原 URL 指向微博主页，并非可确认的官方下载入口；保留原链接待核实 |
| Blender | 设备与环境 / 软件 / 3D美术软件；创作与工作 / 3D / 软件、插件与手册 | 原 URL 为 blendjetts.website，无法据此确认 Blender 官方入口；原样保留，待用户核实 |
| App Cleaner & Uninstaller | 设备与环境 / 软件 / Mac专用软件；设备与环境 / 系统与设备 / 系统维护与工具 | 原条目无链接，保留为软件记录；待补充真实入口 |
| Scroll Reverser | 设备与环境 / 软件 / Mac专用软件；设备与环境 / 系统与设备 / 系统维护与工具 | 原条目无链接，保留为软件记录；待补充真实入口 |
| Picsee | 设备与环境 / 软件 / Mac专用软件 | 原条目无链接，保留为软件记录；待补充真实入口 |
| IINA | 设备与环境 / 软件 / Mac专用软件；日常与生活 / 影视 / 播放工具 | 原条目无链接，保留为软件记录；待补充真实入口 |

原始描述含评价或过时版本的条目未擅自改写；即使分类可以判定，链接可用性仍以外链报告为准。

## 7–9. 文件修改、新增与删除

### 修改（仅 Ar012-Library）

- `3d-art.html`
- `ai-art.html`
- `concept-art.html`
- `costume-fashion-design.html`
- `css/resource-page.css`
- `daily-essentials.html`
- `data/navigation.js`
- `data/pages.js`
- `development.html`
- `game-design.html`
- `games.html`
- `gun-design-reference.html`
- `history.html`
- `index.html`
- `installation-software.html`
- `js/navigation.js`
- `js/render-resources.js`
- `video-film.html`
- `visual-communication.html`
- `work-tools-collaboration.html`

### 新增

- `data/catalog.js`
- `data/configuration.schema.json`
- `data/legacy.js`
- `data/resources/README.md`
- `docs/architecture.md`
- `docs/art-notes-external-links.json`
- `docs/browser-check.json`
- `docs/link-check.json`
- `docs/migration-map.json`
- `docs/phase-1-report.md`
- `docs/preservation-check.json`
- `js/catalog-view.js`
- `library.html`
- `output/playwright/desktop-3d.png`
- `output/playwright/mobile-3d.png`
- `scripts/check-links.py`
- `scripts/validate.mjs`

浏览器工具另在三仓库之外的工作区 `.playwright-cli/` 自动生成运行日志和快照，不属于主站源代码文件。

### 删除

无。原站、旧 HTML、旧资源快照、Art Notes、Music Library 和 Photobash 均未删除。

## 10. 验证结果

- `node scripts/validate.mjs` 通过：498 来源覆盖、489 ID 唯一、20 视图可达、无同视图重复卡片、14 旧页兼容、486 原 URL 保留、7 条无链接记录保留、209 个 HTML 内部引用有效、本地图标文件存在。
- Playwright：20 新视图 + 14 旧页，1440px 和 390px 两种宽度，共 68 组检查通过。渲染数匹配数据，导航高亮/页内锚点正确，资源卡片无横向溢出，手机为单列，无 JavaScript pageerror。
- 实际点击验证：首页音乐导航、页内分类锚点、旧游戏设计页的新分类跳转全部通过。
- 已检查未知 view 的友好回退，桌面与移动截图见 output/playwright。原密码页自动请求 favicon.ico 的既有 404 未纳入本次修改。
- `git diff --check` 通过。
- 两个只读原站逐文件 SHA-256 对比通过：Art Notes 194 个文件、Music Library 11 个文件没有字节变动。

外链对 486 个不同原 URL 执行 HEAD，404/405/410 使用 GET 复核：**305 正常 HTTP 响应，5 个 404/410，176 个仍无法确认**。时间/方法/重定向/错误逐条记录在 [link-check.json](link-check.json)。正常响应不等于人工核验页面内容；超时、403 等不等于资源已永久失效。未删除或自动替换任何链接。

| 返回 404/410 的原始 URL | 状态 |
| --- | --- |
| http://www.hdrlabs.com/sibl/archive.html | 404 |
| http://x768.com/w/twha.zh-hans/ | 404 |
| https://atomicjaneclothing.com/collections/steampunk | 404 |
| https://github.com/Fndroid/clash_for_windows_pkg/releases | 404 |
| https://www.leigod.com/intl/ | 404 |

## 11. Git 状态摘要

- Ar012-Library：20 个已跟踪文件修改，17 个新增文件（未跟踪）；无删除，无暂存提交。
- Art Notes：仍干净。
- Music Library：保留原有 6 个修改：about.html、index.html、listening-notes.html、playlists.html、resources.html、tutorials.html。本次没有增加或覆盖这些改动。

`git diff --stat`（不包含未跟踪新增文件）：

```text
3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   10 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1467 +++++++++++++++++++++++++++++++++++++++--
 data/pages.js                 |   28 +-
 development.html              |    7 +-
 game-design.html              |    7 +-
 games.html                    |    7 +-
 gun-design-reference.html     |    7 +-
 history.html                  |    7 +-
 index.html                    |   22 +-
 installation-software.html    |    7 +-
 js/navigation.js              |    8 +-
 js/render-resources.js        |   45 +-
 video-film.html               |    7 +-
 visual-communication.html     |    7 +-
 work-tools-collaboration.html |    7 +-
 20 files changed, 1586 insertions(+), 92 deletions(-)
```

## 12. 未处理 / 以后需要决定

1. 提供缺失的原项目盘点文档后补核是否存在未体现在工作区的数据或约束。
2. 确认 Blender / Adobe 的原入口，以及 AI / 3D 中 Deepseek、Tripo 3D 的名称或说明；当前保留原文并在卡片标注。
3. 决定是否补充 7 条无链接软件记录、更新返回 404/410 或无法确认的外链；本次不猜测替代地址。
4. 提供真实的 Photoshop、Blender 等配置后再创建配置实例与导航；当前 schema 只建立结构。
5. Art Notes 长文、翻译、画师与学习笔记的最终知识系统去向由以后决定。纯外部入口仅识别：John Park 的 ArtStation/Twitter 主页；Neil Blevins 原文、课程索引、书籍项目链接仍属于原文引用，详见 art-notes-external-links.json。未迁移这些正文。
6. 音乐原站继续保留，但不新增音乐知识站功能；歌单、歌曲、专辑由外部服务管理，没有配乐参考分类。
7. 旧入口和旧数据快照当前用于兼容与审计；将来是否退休由用户决定。
