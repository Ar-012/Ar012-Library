# 设备与环境 → 软件完整资源专项审计

审计日期：2026-10-05

审计对象：`data/navigation.js` 中 view key 为 `software` 的全部资源引用。

审计依据：`docs/device-environment-overview-audit.md`、当前 `data/catalog.js` / `data/navigation.js` / `data/legacy.js`、`docs/migration-map.json`、旧资源快照、`docs/link-check.json` 与既有修正记录。

核心口径：software view 表示“用户需要安装、管理或恢复的软件环境入口”，不是全部 `type=software` 实体的全集。

限制：本轮未联网；未修改 catalog、navigation、legacy、migration、validator、UI、CSS、JS或HTML；未移动、新增或删除资源；未修改关系或跨view共享；未commit；未push。

## 1. 完整性

当前实际结构为11个section、38个资源引用、38个唯一catalog ID：

| 顺序 | section | 引用数 | 唯一ID |
|---:|---|---:|---:|
| 1 | 基础软件 | 6 | 6 |
| 2 | 办公与开发 | 4 | 4 |
| 3 | 阅读工具 | 2 | 2 |
| 4 | 多媒体工具 | 2 | 2 |
| 5 | 其他软件记录 | 3 | 3 |
| 6 | 2D美术软件 | 4 | 4 |
| 7 | 3D美术软件 | 4 | 4 |
| 8 | 游戏平台 | 4 | 4 |
| 9 | 软件资源网站 | 1 | 1 |
| 10 | Mac专用软件 | 4 | 4 |
| 11 | 音频与音乐 | 4 | 4 |
| **合计** | **11组** | **38** | **38** |

检查结果：

- 同一view重复引用：0。
- 悬空ID：0。
- 所有38项均能在当前catalog中解析。
- 5项同时出现在system view；19项与其他顶层大区共享。

## 2. 38项完整清单

“其他位置”只列当前navigation中的同ID引用；legacy来源不算共享。

### 2.1 基础软件（6）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Chrome<br>`res-9cc8c6489d5f` | 谷歌浏览器官方下载<br>`software` | `https://www.google.cn/intl/zh-CN/chrome/`<br>`[Chrome → 同URL]` | `installation-software:0:0`<br>`setup` | — | 网页浏览器；属于重装环境时需要找回的基础客户端 |
| QQ<br>`res-ea0447bcb5e0` | 腾讯QQ官方下载<br>`software` | `https://im.qq.com/pcqq`<br>`[QQ → 同URL]` | `installation-software:0:1`<br>`setup` | — | 即时通信；有明确桌面客户端安装入口 |
| 微信PC版<br>`res-5932a896098b` | 微信电脑客户端下载<br>`software` | `https://pc.weixin.qq.com/`<br>`[微信PC版 → 同URL]` | `installation-software:0:2`<br>`setup` | — | 即时通信；有明确电脑客户端安装入口 |
| 网易云音乐<br>`res-90dd5ea957ab` | 音乐播放器官方下载<br>`software` | `https://music.163.com/#/download`<br>`[网易云音乐 → 同URL]` | `installation-software:0:3`、`music:2:1`<br>`setup`、`life` | 日常与生活 → 音乐 → 收听与发现 | 音乐播放；software侧用于播放器安装和环境恢复，存在理由明确 |
| 火绒安全<br>`res-787fd06cb08e` | 安全防护软件下载<br>`software` | `https://www.huorong.cn/`<br>`[火绒安全 → 同URL]` | `installation-software:0:4`<br>`setup` | 设备与环境 → 系统与设备 → 系统维护与工具 | 安全防护；需要安装，software侧价值明确 |
| Bandizip<br>`res-9eeb06a2a9b2` | 压缩解压工具下载<br>`software` | `https://www.bandisoft.com/bandizip/`<br>`[Bandizip → 同URL]` | `installation-software:0:5`<br>`setup` | 设备与环境 → 系统与设备 → 系统维护与工具 | 文件压缩解压；属于常用本机工具，software侧价值明确 |

### 2.2 办公与开发（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| CCTalk<br>`res-66fd9da32db8` | 在线学习平台客户端<br>`software` | `https://www.cctalk.com/download`<br>`[CCTalk → 同URL]` | `installation-software:1:0`<br>`setup` | — | 在线课程客户端；安装价值明确，但用途不是典型办公或开发 |
| Clash Verge Rev<br>`res-d7b68315ffd9` | 跨平台网络代理客户端<br>`software` | `https://github.com/clash-verge-rev/clash-verge-rev/releases`<br>`[Clash Verge Rev → 同URL]` | `installation-software:1:2`<br>`setup` | 设备与环境 → 系统与设备 → 系统维护与工具 | 网络代理环境；software侧用于客户端安装，不应因入口在GitHub而自动视为开发工具 |
| 百度网盘<br>`res-305ce2f2af53` | 百度云存储服务<br>`software` | `https://pan.baidu.com/`<br>`[百度网盘 → https://pan.baidu.com/；百度网盘 → https://pan.baidu.com/disk/main?from=homeFlow#/index?category=all]` | `daily-essentials:3:5`、`installation-software:1:3`<br>`life`、`setup` | 日常与生活 → 日常工具 → 云存储 | 云存储；software侧保留客户端/重装入口价值，现有section标题不准确 |
| 有道词典<br>`res-1b6dc2711caf` | 翻译工具下载<br>`software` | `https://dict.youdao.com/`<br>`[有道词典 → 同URL]` | `installation-software:1:4`<br>`setup` | — | 翻译与词典工具；具备安装/本机工具价值，但并非开发软件 |

### 2.3 阅读工具（2）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Koodo Reader<br>`res-ef0272e776f4` | 轻量好用的电子书阅读器<br>`software` | `https://www.koodoreader.com/zh`<br>`[Koodo Reader → 同URL]` | `installation-software:2:0`<br>`setup` | — | 阅读电子书；明确的本机阅读器安装入口 |
| Calibre<br>`res-2bb4c3b6b003` | 电子书管理和转换工具<br>`software` | `https://calibre-ebook.com/`<br>`[Calibre → 同URL]` | `installation-software:2:1`<br>`setup` | — | 电子书管理和格式转换；明确的本机软件环境工具 |

### 2.4 多媒体工具（2）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| MuseScore<br>`res-af8ef348cd3d` | 免费乐谱制作软件<br>`software` | `https://musescore.org/zh-hant`<br>`[MuseScore → 同URL]` | `installation-software:3:0`、`music:2:0`<br>`setup`、`create` | 创作与工作 → 音频与视频 → 音频制作工具 | 乐谱制作；创作侧表达使用，software侧表达安装和恢复，合理 |
| OBS Studio<br>`res-5cc0e67257c0` | 视频录制和直播软件<br>`software` | `https://obsproject.com/`<br>`[OBS Studio → 同URL]` | `installation-software:3:1`<br>`setup`、`create` | 创作与工作 → 音频与视频 → 视频工具 | 视频录制和直播；有明确客户端安装及创作工作流双场景 |

### 2.5 其他软件记录（3）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Microsoft Office<br>`res-26ce40a4e924` | 办公软件套件<br>`software` | `null`<br>`[]` | `installation-software:4:0`<br>`setup` | — | 办公套件；实体价值和恢复记忆明确，只是缺少快捷入口 |
| Xmind<br>`res-526a4ab431c7` | 思维导图软件<br>`software` | `null`<br>`[]` | `installation-software:4:1`<br>`setup` | — | 思维导图；实体价值明确，只是缺少快捷入口 |
| Honeyview<br>`res-3b65565237c5` | 图片查看器<br>`software` | `null`<br>`[]` | `installation-software:4:2`<br>`setup` | — | 图片浏览；实体价值明确，只是缺少快捷入口 |

### 2.6 2D美术软件（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Adobe Creative Cloud<br>`res-83dbf3146b95` | Adobe创意软件套件<br>`software` | `null`<br>`[]` | `installation-software:5:0`<br>`setup`、`create` | 创作与工作 → 美术与设计 → 工具 | 管理Adobe创作套件；安装/软件环境价值明确，但不只属于2D |
| CSP优动漫<br>`res-9fe35e6ae85e` | 漫画绘图软件<br>`software` | `https://www.udongman.cn/order/software/center`<br>`[CSP优动漫 → 同URL]` | `installation-software:5:1`<br>`setup`、`create` | 创作与工作 → 美术与设计 → 工具 | 漫画绘图；software侧保留安装入口合理 |
| PureRef<br>`res-3a81b1e5a03c` | 参考图管理工具<br>`software` | `https://www.pureref.com/`<br>`[PureRef → 同URL]` | `installation-software:5:2`<br>`setup`、`create` | 创作与工作 → 美术与设计 → 工具 | 通用参考图管理；有安装价值，但并非只服务2D |
| 字由<br>`res-79e7b4b278c2` | 字体管理工具<br>`software` | `https://www.hellofont.cn/download`<br>`[字由 → https://www.hellofont.cn/download；字由 → http://www.hellofont.cn/]` | `installation-software:5:3`、`visual-communication:10:3`<br>`setup`、`create` | 创作与工作 → 美术与设计 → 字体与文字 | 字体管理；有安装价值，实际用途是字体工作流，不是严格2D绘图 |

### 2.7 3D美术软件（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Quixel Bridge<br>`res-5ee7019b67b3` | 素材管理工具<br>`asset` | `https://quixel.com/`<br>`[Quixel Bridge → 同URL]` | `installation-software:6:0`<br>`setup`、`create` | 创作与工作 → 3D → 软件与工具 | 3D素材管理/导入工具；具备本机工具属性，type粒度与实体性质不一致 |
| Blender<br>`res-b60e9fdc1539` | 开源3D创作套件<br>`software` | `https://www.blender.org/`<br>`[Blender → 同URL]` | `installation-software:6:1`<br>`setup`、`create` | 创作与工作 → 3D → 软件与工具 | 3D创作套件；安装/配置与实际制作是清楚的双场景 |
| Gaea<br>`res-684127ed910a` | 地形生成软件<br>`software` | `https://quadspinner.com/`<br>`[Gaea → 同URL]` | `installation-software:6:2`<br>`setup`、`create` | 创作与工作 → 3D → 软件与工具 | 地形生成；安装软件与3D制作双场景明确 |
| Marvelous Designer<br>`res-19b4b0a8487e` | 服装设计软件<br>`software` | `https://www.marvelousdesigner.com/`<br>`[Marvelous Designer → 同URL]` | `installation-software:6:3`<br>`setup`、`create` | 创作与工作 → 3D → 软件与工具 | 3D服装设计；安装软件与创作双场景明确 |

### 2.8 游戏平台（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| Steam<br>`res-882fd7527ef0` | 全球最大的数字游戏平台<br>`software` | `https://store.steampowered.com/`<br>`[Steam → https://store.steampowered.com/；Steam → https://store.steampowered.com/about/]` | `games:3:1`、`installation-software:7:0`<br>`life`、`setup` | 日常与生活 → 游戏 → 游戏平台与商店 | 平台/商店客户端；software侧表达安装，游戏侧表达消费和启动游戏，合理 |
| Epic Games Store<br>`res-215f7a9368ce` | Epic游戏商店<br>`software` | `https://store.epicgames.com/zh-Hant/`<br>`[Epic Games Store → 同URL]` | `games:3:2`、`installation-software:7:1`<br>`life`、`setup` | 日常与生活 → 游戏 → 游戏平台与商店 | 平台/商店；客户端环境与日常游戏用途不同，合理 |
| 雷神加速器<br>`res-b62262cabd66` | 游戏网络加速工具<br>`software` | `https://www.leigod.com/`<br>`[雷神加速器 → 同URL]` | `installation-software:7:2`<br>`setup` | — | 游戏网络工具；有安装价值，但不是游戏平台/商店 |
| MuMu模拟器<br>`res-2e471096b9d3` | 安卓模拟器<br>`software` | `https://mumu.163.com/`<br>`[MuMu模拟器 → 同URL]` | `installation-software:7:3`<br>`setup` | — | 安卓运行环境；有安装价值，但不是游戏平台/商店 |

### 2.9 软件资源网站（1）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| MacPedia<br>`res-de194ed9757b` | Mac软件资源网站<br>`website` | `https://macpedia.xyz/`<br>`[MacPedia → 同URL]` | `installation-software:8:0`<br>`setup` | — | 查找Mac软件资源；不是软件实体，但属于获取/恢复软件时使用的入口 |

### 2.10 Mac专用软件（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| App Cleaner & Uninstaller<br>`res-61e2540c5015` | 应用清理工具<br>`software` | `null`<br>`[]` | `installation-software:8:1`<br>`setup` | 设备与环境 → 系统与设备 → 系统维护与工具 | 应用清理和卸载；本机维护软件，实体价值明确但无快捷入口 |
| Scroll Reverser<br>`res-e95bace475c6` | 滚轮方向调节工具<br>`software` | `null`<br>`[]` | `installation-software:8:2`<br>`setup` | 设备与环境 → 系统与设备 → 系统维护与工具 | 输入/滚动行为调整；软件环境价值明确但无快捷入口 |
| Picsee<br>`res-2b3e20dff7b4` | 图片浏览工具<br>`software` | `null`<br>`[]` | `installation-software:8:3`<br>`setup` | — | 图片浏览和管理；明确软件记录，无快捷入口 |
| IINA<br>`res-1c23a7b77657` | 视频播放器<br>`software` | `null`<br>`[]` | `installation-software:8:4`<br>`setup`、`life` | 日常与生活 → 影视 → 播放工具 | 本地视频播放；software侧表达Mac软件环境，film侧表达观看用途，合理 |

### 2.11 音频与音乐（4）

| name / ID | description / type | url / links | sources / contexts | 其他位置 | 主要用途 / 在software中的理由 |
|---|---|---|---|---|---|
| EarMaster<br>`res-a3a2d6e482de` | 视唱练耳训练软件。<br>`software` | `https://www.earmaster.com/`<br>`[EarMaster → 同URL]` | `music:3:2`<br>`learn`、`setup` | 学习与研究 → 音乐 → 音乐学习 | 视唱练耳训练；software侧表达安装，学习侧表达训练，合理 |
| Ableton Live<br>`res-b939645bed96` | 电子音乐、现场和循环创作 DAW。<br>`software` | `https://www.ableton.com/`<br>`[Ableton Live → 同URL]` | `music:5:3`<br>`create`、`setup` | 创作与工作 → 音频与视频 → 音频制作工具 | DAW；安装环境与音乐制作双场景明确 |
| REAPER<br>`res-75ae98f287b2` | 轻量灵活的音频工作站。<br>`software` | `https://www.reaper.fm/`<br>`[REAPER → 同URL]` | `music:5:4`<br>`create`、`setup` | 创作与工作 → 音频与视频 → 音频制作工具 | DAW；安装环境与音频制作双场景明确 |
| Audacity<br>`res-d130cc2e9c59` | 免费音频录制和编辑工具。<br>`website` | `https://www.audacityteam.org/`<br>`[Audacity → 同URL]` | `music:5:5`<br>`create`、`setup` | 创作与工作 → 音频与视频 → 音频制作工具 | 音频录制编辑软件；存在明确安装价值，type粒度不一致 |

## 3. 11组逐组分析

| section | 标题与组内逻辑 | 重叠/历史问题 | 独立性诊断 |
|---|---|---|---|
| 基础软件 | “基础”没有客观字段定义；混合浏览器、通信、音乐、安全与压缩 | 延续旧安装页首组，兼有“常用/装机默认”色彩；火绒、Bandizip又在system | 不宜原样作为稳定分类轴，值得重构 |
| 办公与开发 | 标题明显失真；四项实际分别是学习、网络、云存储、翻译 | 没有典型开发软件；百度网盘又属日常云存储，Clash又在system | 不宜原样保留，属于最需要取消或重构的组之一 |
| 阅读工具 | 两项都围绕电子书阅读、管理和转换 | 与其他section重叠较少，逻辑一致 | 可原样保留其用途逻辑；数量少但语义稳定 |
| 多媒体工具 | MuseScore是乐谱制作，OBS是录制直播；“多媒体”可覆盖但过宽 | 与“音频与音乐”及创作区音视频工具重叠 | 不必单独按当前两项维持；应与相关用途一起审视 |
| 其他软件记录 | 三项用途不同，唯一共同点是URL为空 | 明确历史兜底组；按数据完整度而非用途分类 | 应取消或重构；实体本身应保留 |
| 2D美术软件 | CSP偏2D；Adobe CC跨多领域；PureRef通用；字由偏字体管理 | 以专业领域分类，但四项不都严格属于2D | 不宜原样保留全部边界；需要重构或重新定义范围 |
| 3D美术软件 | 四项都与3D工作流有关 | Quixel Bridge更像素材管理工具，type为asset；其余三项是明确创作软件 | 基本稳定，可保留3D用途逻辑并复核边界 |
| 游戏平台 | Steam、Epic是平台/商店；雷神是网络加速；MuMu是模拟器 | 同组混合平台、网络与运行环境 | 标题不能覆盖全部四项，值得重构 |
| 软件资源网站 | MacPedia是获取软件的站点，不是软件 | 唯一singleton；按实体性质单列 | 获取软件的语义有价值，但当前一项不足以证明独立section必要性 |
| Mac专用软件 | 统一点是历史平台归属，不是用途 | 与所有按用途分组的section使用不同分类轴；两项又在system，IINA在film | 不宜作为与用途型section并列的第一层轴，值得重构 |
| 音频与音乐 | Ableton、REAPER、Audacity是制作/编辑；EarMaster是学习训练 | 与“多媒体工具”中的MuseScore重叠；学习与制作混放 | 音频主题稳定，但内部用途不一致，需重构而非整组删除 |

singleton只有“软件资源网站”。兜底组只有“其他软件记录”。最大section为6项，问题不在单组过大，而在11组使用不同分类原则。

## 4. 分类轴分析

当前11组至少同时使用六套分类轴：

1. **通用程度/主观优先级**：基础软件。
2. **用途**：办公与开发、阅读工具、多媒体工具、音频与音乐。
3. **专业领域**：2D美术、3D美术、游戏。
4. **操作系统**：Mac专用软件。
5. **实体性质**：软件资源网站。
6. **数据完整度/历史状态**：其他软件记录。

冲突表现：

- 同一软件可同时属于用途、领域和操作系统，例如IINA既是Mac软件也是播放器。
- “基础软件”取决于主观使用频率，无法从catalog字段稳定判断。
- “2D/3D”与“音频/游戏”按专业领域划分，但“阅读/办公”按使用动作划分，层级不平行。
- “其他软件记录”把URL缺失当作分类条件，和用户寻找软件的目标无关。
- “软件资源网站”按实体类型分类，和其他组的用途逻辑不一致。

未来最适合作为第一分类轴的原则应是：**软件在本机环境中承担的主要用途或用户恢复它时要完成的动作**。该轴直接回答“我装它是为了做什么”，比使用频率、URL完整度、历史来源或操作系统更稳定。操作系统、专业领域、是否有URL、来源页面更适合作为次级属性、标签或审计信息。本轮不据此设计最终section清单。

## 5. 基础软件专项

“基础软件”当前更接近旧安装页的“常用/装机默认组”，而不是能由现有字段严格定义的类别：

- Chrome：浏览器。
- QQ、微信PC版：通信客户端。
- 网易云音乐：音乐播放器。
- 火绒安全：安全防护。
- Bandizip：文件压缩解压。

六项在用途上明显不同。没有本地字段证明它们对所有环境都是“必备”，也不能仅因用户可能高频使用而把“高频”作为客观分类。当前标题主要反映历史默认组，不适合作为长期信息架构的稳定第一层。

## 6. 办公与开发专项

“办公与开发”已经失真：

| 资源 | 更真实的主要用途 | 与标题关系 |
|---|---|---|
| CCTalk | 学习/在线课程客户端 | 不是典型办公或开发 |
| Clash Verge Rev | 网络代理与网络环境 | 可能被开发工作流使用，但本体不是开发工具 |
| 百度网盘 | 云存储与文件同步 | 可用于办公，但用途不限办公 |
| 有道词典 | 翻译与词典 | 可辅助办公学习，但不属于开发 |

四项在software中都有安装或客户端价值，因此问题是section语义，不是实体是否应保留。尤其不能因Clash的下载页在GitHub就把它定义为开发工具，也不能因百度网盘是日常服务就否定其客户端恢复价值。

## 7. 阅读、多媒体与音频专项

### 阅读工具

Koodo Reader和Calibre都围绕电子书，组内逻辑一致。前者偏阅读，后者兼具管理和转换，但用户动作接近；该组语义稳定，当前两项足以保留，不需要因数量少强行拆分。

### 多媒体工具与音频音乐

- MuseScore主要是乐谱制作，语义上更接近音乐制作/记谱，而不只是宽泛“多媒体”。
- OBS主要是视频录制和直播，可涉及音频，但核心不是音乐制作。
- Ableton Live与REAPER是DAW，Audacity是音频录制编辑工具，三者属于音频制作环境。
- EarMaster是视唱练耳学习工具，不是DAW，也不是制作软件。

“多媒体工具”和“音频与音乐”都采用用途/媒介逻辑，但边界不一致：MuseScore被放在前者，三个音频制作工具在后者；EarMaster又把学习用途带入制作集合。OBS无需仅因处理音频就与DAW视为同类，其主要动作仍是录制/直播。该区域值得整体审视，但本轮不决定如何整合。

## 8. 创作软件专项

### 2D美术软件

- Adobe Creative Cloud是跨平面、图像、视频等多应用套件，不能简单等同于2D美术软件。
- CSP优动漫明确面向漫画和绘图，2D语义最稳定。
- PureRef是跨2D/3D工作流的通用参考图管理工具。
- 字由是字体管理工具，主要动作是字体查找、激活和管理，不是2D绘图本身。

### 3D美术软件

- Blender、Gaea、Marvelous Designer都是明确的3D创作软件。
- Quixel Bridge是3D素材管理和导入工具；仍具有安装/本机工具价值，但不是典型建模软件，且当前type为`asset`。

按2D/3D拆分对核心创作软件仍有识别价值，但通用套件、参考工具、字体工具和素材管理工具暴露了边界问题。八项在创作区已有实际使用位置，software侧仍有独立的安装、配置和重装查找价值，不应仅因创作区存在就删除共享。

## 9. 游戏平台专项

四项实际性质：

- Steam、Epic Games Store：游戏平台与数字商店。
- 雷神加速器：游戏网络加速工具。
- MuMu模拟器：安卓运行/模拟环境。

因此“游戏平台”只能准确覆盖前两项，无法准确概括后两项。四项共同点只是都与游戏环境有关。

Steam和Epic与日常游戏view的共享仍然合理：software侧表达客户端安装和环境恢复，games侧表达商店、内容获取和启动游戏。没有删除共享的依据。

## 10. Mac专用软件专项

该组采用的是“操作系统平台”轴，而其他大多数组采用用途或专业领域轴，因此并列时发生冲突。

如果不依赖“Mac专用”标签，四项用途分别是：

- App Cleaner & Uninstaller：应用卸载与清理。
- Scroll Reverser：输入设备/滚动行为调整。
- Picsee：图片浏览与管理。
- IINA：本地视频播放。

四项用途彼此不同。“Mac专用软件”能帮助按平台恢复环境，但不是稳定的用途分类；未来更适合作为平台属性或次级维度。本轮不移动资源，也不判断这些软件当前是否仍只支持Mac。

## 11. 其他软件记录专项

Microsoft Office、Xmind、Honeyview共同特征是：

- `url: null`
- `links: []`
- 原始旧快照本身没有URL
- reviewNotes记录“保留为软件记录；待补充真实入口”

三项实际用途分别是办公套件、思维导图和图片查看，没有共同使用场景。因此“其他软件记录”本质是由链接缺失形成的历史兜底组。

“是否有URL”不应成为软件信息架构的分类依据。三项仍是明确软件实体，缺少URL只意味着无法直接打开快捷入口，不等于实体无效或不值得保留。本轮不补URL、不删除。

## 12. 软件资源网站专项

MacPedia `res-de194ed9757b` 的type为`website`，description明确为“Mac软件资源网站”。它不是软件实体，而是获取软件时使用的资源入口。

按本轮software定义，它仍可能有价值：用户重装或恢复环境时可能通过它查找软件。但只有一个资源时，单独section的结构收益有限；它更像“获取软件的资源入口”，而不是和客户端软件同一实体类型。是否并入其他结构应在下一轮决定，本轮不移动。

## 13. software与system边界

| ID / 名称 | software位置 | system位置 | 判断 | 依据 |
|---|---|---|---|---|
| `res-787fd06cb08e` 火绒安全 | 基础软件 | 系统维护与工具 | **A** 两边均有独立场景 | software用于安装安全软件；system用于系统安全维护 |
| `res-9eeb06a2a9b2` Bandizip | 基础软件 | 系统维护与工具 | **B** system侧价值较弱 | software是明确压缩工具入口；“压缩解压”不是强系统维护语义 |
| `res-d7b68315ffd9` Clash Verge Rev | 办公与开发 | 系统维护与工具 | **A** 两边均有独立场景 | software用于安装客户端；system用于网络环境管理，尽管software的section标题不准确 |
| `res-61e2540c5015` App Cleaner & Uninstaller | Mac专用软件 | 系统维护与工具 | **A** 两边均有独立场景 | 软件安装记录与应用清理维护用途明确不同 |
| `res-e95bace475c6` Scroll Reverser | Mac专用软件 | 系统维护与工具 | **A** 两边均有独立场景 | 软件记录与输入/滚动环境调整用途明确不同 |

software侧对五项都有安装和恢复价值。system侧对火绒、Clash、App Cleaner、Scroll Reverser有明确系统环境用途；Bandizip最像普通文件工具，是唯一明显值得后续复核的共享。本轮不删除任何引用。

## 14. 与其他大区共享

### 14.1 创作与工作（13项）

| 资源 | software位置 | 另一位置 | software侧 / 另一侧价值 | 判断 |
|---|---|---|---|---|
| MuseScore | 多媒体工具 | 音频与视频 → 音频制作工具 | 安装记谱软件 / 制作乐谱 | 合理 |
| OBS Studio | 多媒体工具 | 音频与视频 → 视频工具 | 安装录制软件 / 录像直播 | 合理 |
| Adobe Creative Cloud | 2D美术软件 | 美术与设计 → 工具 | 套件环境 / 美术创作 | 合理 |
| CSP优动漫 | 2D美术软件 | 美术与设计 → 工具 | 安装绘图软件 / 漫画插画 | 合理 |
| PureRef | 2D美术软件 | 美术与设计 → 工具 | 安装工具 / 管理参考图 | 合理 |
| 字由 | 2D美术软件 | 美术与设计 → 字体与文字 | 安装字体工具 / 字体工作流 | 合理 |
| Quixel Bridge | 3D美术软件 | 3D → 软件与工具 | 安装素材工具 / 3D素材工作流 | 合理 |
| Blender | 3D美术软件 | 3D → 软件与工具 | 安装配置 / 3D制作 | 合理 |
| Gaea | 3D美术软件 | 3D → 软件与工具 | 安装配置 / 地形制作 | 合理 |
| Marvelous Designer | 3D美术软件 | 3D → 软件与工具 | 安装配置 / 服装制作 | 合理 |
| Ableton Live | 音频与音乐 | 音频与视频 → 音频制作工具 | 安装DAW / 音乐制作 | 合理 |
| REAPER | 音频与音乐 | 音频与视频 → 音频制作工具 | 安装DAW / 音频制作 | 合理 |
| Audacity | 音频与音乐 | 音频与视频 → 音频制作工具 | 安装编辑工具 / 音频编辑 | 合理 |

### 14.2 学习与研究（1项）

| 资源 | software位置 | 另一位置 | software侧 / 另一侧价值 | 判断 |
|---|---|---|---|---|
| EarMaster | 音频与音乐 | 音乐 → 音乐学习 | 安装训练软件 / 视唱练耳学习 | 合理 |

### 14.3 日常与生活（5项）

| 资源 | software位置 | 另一位置 | software侧 / 另一侧价值 | 判断 |
|---|---|---|---|---|
| 网易云音乐 | 基础软件 | 音乐 → 收听与发现 | 安装播放器 / 日常听歌 | 合理 |
| 百度网盘 | 办公与开发 | 日常工具 → 云存储 | 客户端环境 / 日常存储 | 合理，software section名称有问题 |
| Steam | 游戏平台 | 游戏 → 游戏平台与商店 | 安装客户端 / 商店与游戏消费 | 合理 |
| Epic Games Store | 游戏平台 | 游戏 → 游戏平台与商店 | 安装客户端 / 商店与游戏消费 | 合理 |
| IINA | Mac专用软件 | 影视 → 播放工具 | 安装播放器 / 本地观看 | 合理 |

19项跨大区共享均有明确的“安装/环境”与“实际使用”双场景，没有应删除的共享。不能据此推导所有创作或学习软件都应加入software。

## 15. 实体性质异常

当前38项type分布：35项`software`、1项`asset`、2项`website`。

- **Quixel Bridge `res-5ee7019b67b3`**：name是具体工具，description是“素材管理工具”，URL和source来自安装软件页，contexts包含setup/create；`asset`更像内容类型而非该工具实体本身，存在明显type粒度不一致。
- **Audacity `res-d130cc2e9c59`**：name和description明确指向音频录制编辑工具，位于software并具有setup context；`website`只描述当前入口载体，和实体语义不一致。
- **MacPedia `res-de194ed9757b`**：确实是软件资源网站，`website`合理，不是异常。
- 其他35项均为`software`，没有同等级的明显type异常。

本轮只记录，不修改type。

## 16. URL为空的软件

实际共8项，与预期一致：

| 资源 | 实体价值 | 本地原因 |
|---|---|---|
| Microsoft Office | 明确办公套件 | 原始记录无链接 |
| Xmind | 明确思维导图软件 | 原始记录无链接 |
| Honeyview | 明确图片查看器 | 原始记录无链接 |
| Adobe Creative Cloud | 明确创意软件套件 | phase 3删除无法确认的微博入口，未虚构替代URL |
| App Cleaner & Uninstaller | 明确应用清理软件 | 原始记录无链接 |
| Scroll Reverser | 明确输入行为工具 | 原始记录无链接 |
| Picsee | 明确图片浏览软件 | 原始记录无链接 |
| IINA | 明确视频播放器 | 原始记录无链接 |

八项都有明确软件实体价值。URL为空会降低“一键打开/下载”的便利性，但不应影响它们按用途分类，也不等于无效实体。除Adobe Creative Cloud外，其余7项均保留“原条目无链接”的reviewNotes。本轮不搜索或补充URL。

## 17. relatedResources

software中当前有5个实体设置关系，共14条出向边：

| 来源 | 当前指向 | 判断 |
|---|---|---|
| MuseScore `res-af8ef348cd3d` | MuseScore乐谱社区 `res-5c80faa79378` | 主软件 → 官方内容社区，合理 |
| Blender `res-b60e9fdc1539` | Blender 3.1参考手册、Blender Extension、Blender Market、boxcutter手册、BlenderBros的Gumroad、BlenderBros主页、blender魔酷网、KIT OPS 2 Manual、MESHmachine参考手册、斑斓中国 | 包含官方入口、插件手册及较宽泛第三方资源；无悬空ID，但第三方部分可在未来单独复核 |
| Gaea `res-684127ed910a` | gaea Guide `res-5193234cd6bc` | 主软件 → 官方手册，合理 |
| Marvelous Designer `res-19b4b0a8487e` | marvelous designer官方手册 `res-d9f8c92e89a4` | 主软件 → 官方手册，合理 |
| Steam `res-882fd7527ef0` | Steam创意工坊 `res-b05a90020690` | 平台 → 官方MOD入口，合理 |

关系只提供卡片内快捷入口，不决定software的section归属，因此不应作为第一分类轴。所有目标均存在，无重复、自引用或明显错误。

没有新的强候选。其他软件即使与同品牌或同工作流资源有关，也缺少当前catalog中的明确官方子入口、唯一宿主或独立实体证据。本轮不新增或删除关系。

## 18. 重复实体与历史来源

当前38项中：

- 同名不同ID：0。
- 相同URL不同ID：0。
- 同ID重复引用：0。
- 软件与官网/下载页被拆成两个当前实体：未发现。
- 明确待合并重复实体：未发现。

`docs/migration-map.json`记录了6组与software有关的历史来源合并：

- 百度网盘：日常入口与安装入口合并为 `res-305ce2f2af53`，两个入口保留在links。
- Steam：商店入口与客户端介绍入口合并为 `res-882fd7527ef0`。
- Epic Games / Epic Games Store：相同URL合并为 `res-215f7a9368ce`。
- 字由：HTTPS下载入口与旧HTTP主页合并为 `res-79e7b4b278c2`。
- MuseScore / MuseScore软件下载：合并为 `res-af8ef348cd3d`。
- 网易云音乐：安装软件来源与音乐来源合并为 `res-90dd5ea957ab`。

这些是已经完成的历史去重，不是当前重复。Clash Verge Rev沿用原ID并由既有corrections从“Clash for Windows”修正，也不是两个当前实体。

## 19. 数据质量

| 检查项 | 数量 | 结果 |
|---|---:|---|
| URL为空 | 8 | 见第16节 |
| description为空 | 0 | 未发现 |
| HTTP主URL | 0 | 未发现 |
| links中HTTP | 1 | 字由的第二入口 `http://www.hellofont.cn/` |
| type明显异常 | 2 | Quixel Bridge为`asset`；Audacity为`website` |
| links.label与name不一致 | 0 | 未发现 |
| 当前可确认旧品牌/旧名称 | 0 | Clash旧名称已在既有修正中处理 |

既有 `docs/link-check.json` 的software覆盖情况：

- responded：24项。
- unconfirmed：3项。
- 当前URL未被旧检查覆盖：3项。
- 无URL：8项。

具体异常或未覆盖记录：

- Steam：timeout，unconfirmed。
- Epic Games Store：HTTP 403，unconfirmed。
- MacPedia：HTTP 403，unconfirmed。
- Clash Verge Rev、Blender、雷神加速器：当前URL在旧link-check中没有记录；这些入口在既有修正中更新，不能据此判断失效。

403和timeout只代表当次检查结果，不直接判定网站失效。本轮未联网复核。

## 20. 最终专项诊断

1. **software是否值得重组：是。** 38项规模不算巨大，但11组同时采用多套互相冲突的分类轴，结构问题明确。
2. **当前11组最大的结构问题：** 用途、专业领域、操作系统、实体类型、主观“基础程度”和URL完整度并列为第一层，导致组间不可比较。
3. **哪些section可以原样保留：** “阅读工具”最稳定；“3D美术软件”的核心用途逻辑基本可保留，但Quixel Bridge边界需复核。其余组至少需要名称、范围或整合层面的讨论。
4. **哪些section明显应该取消或重构：** “办公与开发”“其他软件记录”最明确；“基础软件”“游戏平台”“Mac专用软件”“2D美术软件”“多媒体工具/音频与音乐”也值得重构或重新定义边界。“软件资源网站”的singleton独立性不足。
5. **最明显的分类边界案例：** Adobe Creative Cloud、PureRef、字由、Quixel Bridge、MuseScore、EarMaster、雷神加速器、MuMu模拟器、MacPedia，以及5个software/system共享实体。
6. **software与system边界是否需要调整：需要轻量调整。** Bandizip的system价值最弱；其余4项存在明确双场景。无需把全部系统工具从software删除。
7. **是否存在应该删除的跨区共享：没有。** 19项跨大区共享均有安装与实际使用双场景。
8. **是否存在明确重复实体：没有。** 历史重复已经在migration中合并。
9. **是否存在新的强relatedResources候选：没有。** 当前明确关系已存在，其余证据不足。
10. **是否存在需要先修的数据质量问题：有值得后续独立处理的问题，但不阻塞结构讨论。** 最明确的是Quixel Bridge和Audacity的type粒度、8项空URL、字由HTTP次入口及旧link-check未覆盖/异常；本轮不修复。
11. **未来software第一分类轴原则：** 以“软件在本机环境中承担的主要用途或恢复它时要完成的动作”为第一轴；平台、专业领域、URL完整度、历史来源和使用频率只作为次级属性。这里仅提出原则，不给最终section方案。

结论：software值得下一轮共同制定重组结构，但不应通过删除合理共享、排除创作软件或以URL完整度分类来解决。下一轮应先统一第一分类轴，再决定各section及边界。

## 21. 本轮文件变更

本轮只新增：

- `docs/software-resource-audit.md`：本专项审计报告。

未修改 `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`scripts/validate.mjs`、旧资源快照、UI、CSS、JS、HTML或任何资源字段；未联网；未commit；未push。
