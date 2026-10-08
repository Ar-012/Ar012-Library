# 设备与环境总览审计

审计日期：2026-10-05

审计范围：`data/navigation.js` 中 area `setup` 的全部 view，以及这些 view 引用的当前 catalog 实体。

本地依据：`data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`data/resources/*` 旧资源快照、`docs/link-check.json`、`docs/phase-3-corrections.json` 与现有阶段报告。

限制：本轮未联网；未修改 catalog、navigation、legacy、migration、validator、UI、CSS、JS或HTML；未重新分类；未新增、删除、合并资源；未新增关系或跨 view 共享；未 commit；未 push。

## 1. 大区总体统计

### 1.1 实际导航结构

当前顶层导航实际存在：

```text
area id: setup
area label: 设备与环境
├─ 软件          view key: software
├─ 插件与扩展    view key: extensions
└─ 系统与设备    view key: system
```

与预期一致，共3个 view。

| view | key | section数 | 引用数 | view内唯一ID |
|---|---|---:|---:|---:|
| 软件 | `software` | 11 | 38 | 38 |
| 插件与扩展 | `extensions` | 2 | 7 | 7 |
| 系统与设备 | `system` | 2 | 6 | 6 |
| **合计** |  | **15** | **51** | **46（跨view去重）** |

### 1.2 完整性结论

- 51个引用全部能在 catalog 中解析，悬空 ID 为0。
- 三个 view 各自内部都没有重复 ID。
- 大区去重后有46个 catalog 实体。
- 软件与系统之间共享5个 ID；这是51个引用与46个唯一实体之间差额的全部来源。
- 插件与扩展没有与另外两个设备 view 共享同一 ID。
- 与创作与工作共享20个唯一 ID，与学习与研究共享1个，与日常与生活共享6个。
- 同 ID 多位置均按共享处理，不作为重复实体。

### 1.3 大区内部跨view共享

| ID | 名称 | 软件位置 | 系统与设备位置 | 初步判断 |
|---|---|---|---|---|
| `res-787fd06cb08e` | 火绒安全 | 基础软件 | 系统维护与工具 | 安装软件与安全维护两种入口，语义可成立 |
| `res-9eeb06a2a9b2` | Bandizip | 基础软件 | 系统维护与工具 | 压缩工具属于软件明确；作为“系统维护”较弱，是最值得复核的内部共享 |
| `res-d7b68315ffd9` | Clash Verge Rev | 办公与开发 | 系统维护与工具 | 软件侧与网络环境侧用途不同，但“办公与开发”标题并不准确表达它 |
| `res-61e2540c5015` | App Cleaner & Uninstaller | Mac专用软件 | 系统维护与工具 | Mac软件与清理维护两种入口，合理 |
| `res-e95bace475c6` | Scroll Reverser | Mac专用软件 | 系统维护与工具 | Mac软件与输入设备行为调整两种入口，合理 |

## 2. 软件完整清单与结构分析

当前为38项、38个唯一 ID、11个 section。

### 2.1 基础软件（6）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Chrome<br>`res-9cc8c6489d5f` | 谷歌浏览器官方下载<br>`software` | `https://www.google.cn/intl/zh-CN/chrome/`<br>Chrome → 同URL | `installation-software:0:0`<br>`setup` | 安装网页浏览器 |
| QQ<br>`res-ea0447bcb5e0` | 腾讯QQ官方下载<br>`software` | `https://im.qq.com/pcqq`<br>QQ → 同URL | `installation-software:0:1`<br>`setup` | 安装即时通信客户端 |
| 微信PC版<br>`res-5932a896098b` | 微信电脑客户端下载<br>`software` | `https://pc.weixin.qq.com/`<br>微信PC版 → 同URL | `installation-software:0:2`<br>`setup` | 安装微信桌面客户端 |
| 网易云音乐<br>`res-90dd5ea957ab` | 音乐播放器官方下载<br>`software` | `https://music.163.com/#/download`<br>网易云音乐 → 同URL | `installation-software:0:3`、`music:2:1`<br>`setup`、`life` | 安装音乐播放器；也用于日常收听 |
| 火绒安全<br>`res-787fd06cb08e` | 安全防护软件下载<br>`software` | `https://www.huorong.cn/`<br>火绒安全 → 同URL | `installation-software:0:4`<br>`setup` | 安装安全防护软件 |
| Bandizip<br>`res-9eeb06a2a9b2` | 压缩解压工具下载<br>`software` | `https://www.bandisoft.com/bandizip/`<br>Bandizip → 同URL | `installation-software:0:5`<br>`setup` | 安装压缩解压工具 |

### 2.2 办公与开发（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| CCTalk<br>`res-66fd9da32db8` | 在线学习平台客户端<br>`software` | `https://www.cctalk.com/download`<br>CCTalk → 同URL | `installation-software:1:0`<br>`setup` | 安装在线学习客户端；并非典型办公或开发工具 |
| Clash Verge Rev<br>`res-d7b68315ffd9` | 跨平台网络代理客户端<br>`software` | `https://github.com/clash-verge-rev/clash-verge-rev/releases`<br>Clash Verge Rev → 同URL | `installation-software:1:2`<br>`setup` | 安装和管理网络代理环境 |
| 百度网盘<br>`res-305ce2f2af53` | 百度云存储服务<br>`software` | `https://pan.baidu.com/`<br>百度网盘 → `https://pan.baidu.com/`；百度网盘 → `https://pan.baidu.com/disk/main?from=homeFlow#/index?category=all` | `daily-essentials:3:5`、`installation-software:1:3`<br>`life`、`setup` | 使用云存储，并保留客户端/安装场景 |
| 有道词典<br>`res-1b6dc2711caf` | 翻译工具下载<br>`software` | `https://dict.youdao.com/`<br>有道词典 → 同URL | `installation-software:1:4`<br>`setup` | 安装和使用翻译工具 |

### 2.3 阅读工具（2）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Koodo Reader<br>`res-ef0272e776f4` | 轻量好用的电子书阅读器<br>`software` | `https://www.koodoreader.com/zh`<br>Koodo Reader → 同URL | `installation-software:2:0`<br>`setup` | 阅读电子书 |
| Calibre<br>`res-2bb4c3b6b003` | 电子书管理和转换工具<br>`software` | `https://calibre-ebook.com/`<br>Calibre → 同URL | `installation-software:2:1`<br>`setup` | 管理、转换和阅读电子书 |

### 2.4 多媒体工具（2）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| MuseScore<br>`res-af8ef348cd3d` | 免费乐谱制作软件<br>`software` | `https://musescore.org/zh-hant`<br>MuseScore → 同URL | `installation-software:3:0`、`music:2:0`<br>`setup`、`create` | 安装并使用乐谱制作软件 |
| OBS Studio<br>`res-5cc0e67257c0` | 视频录制和直播软件<br>`software` | `https://obsproject.com/`<br>OBS Studio → 同URL | `installation-software:3:1`<br>`setup`、`create` | 安装并使用录屏、录像和直播软件 |

### 2.5 其他软件记录（3）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Microsoft Office<br>`res-26ce40a4e924` | 办公软件套件<br>`software` | `null`<br>`[]` | `installation-software:4:0`<br>`setup` | 记录办公软件套件；当前无入口 |
| Xmind<br>`res-526a4ab431c7` | 思维导图软件<br>`software` | `null`<br>`[]` | `installation-software:4:1`<br>`setup` | 记录思维导图软件；当前无入口 |
| Honeyview<br>`res-3b65565237c5` | 图片查看器<br>`software` | `null`<br>`[]` | `installation-software:4:2`<br>`setup` | 记录图片查看器；当前无入口 |

### 2.6 2D美术软件（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Adobe Creative Cloud<br>`res-83dbf3146b95` | Adobe创意软件套件<br>`software` | `null`<br>`[]` | `installation-software:5:0`<br>`setup`、`create` | 管理Adobe创作软件；当前无入口 |
| CSP优动漫<br>`res-9fe35e6ae85e` | 漫画绘图软件<br>`software` | `https://www.udongman.cn/order/software/center`<br>CSP优动漫 → 同URL | `installation-software:5:1`<br>`setup`、`create` | 漫画与插画绘制 |
| PureRef<br>`res-3a81b1e5a03c` | 参考图管理工具<br>`software` | `https://www.pureref.com/`<br>PureRef → 同URL | `installation-software:5:2`<br>`setup`、`create` | 整理创作参考图 |
| 字由<br>`res-79e7b4b278c2` | 字体管理工具<br>`software` | `https://www.hellofont.cn/download`<br>字由 → 主URL；字由 → `http://www.hellofont.cn/` | `installation-software:5:3`、`visual-communication:10:3`<br>`setup`、`create` | 安装和管理字体 |

### 2.7 3D美术软件（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Quixel Bridge<br>`res-5ee7019b67b3` | 素材管理工具<br>`asset` | `https://quixel.com/`<br>Quixel Bridge → 同URL | `installation-software:6:0`<br>`setup`、`create` | 管理和导入3D素材 |
| Blender<br>`res-b60e9fdc1539` | 开源3D创作套件<br>`software` | `https://www.blender.org/`<br>Blender → 同URL | `installation-software:6:1`<br>`setup`、`create` | 安装并进行3D创作 |
| Gaea<br>`res-684127ed910a` | 地形生成软件<br>`software` | `https://quadspinner.com/`<br>Gaea → 同URL | `installation-software:6:2`<br>`setup`、`create` | 生成数字地形 |
| Marvelous Designer<br>`res-19b4b0a8487e` | 服装设计软件<br>`software` | `https://www.marvelousdesigner.com/`<br>Marvelous Designer → 同URL | `installation-software:6:3`<br>`setup`、`create` | 设计和模拟3D服装 |

### 2.8 游戏平台（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| Steam<br>`res-882fd7527ef0` | 全球最大的数字游戏平台<br>`software` | `https://store.steampowered.com/`<br>Steam → 主URL；Steam → `https://store.steampowered.com/about/` | `games:3:1`、`installation-software:7:0`<br>`life`、`setup` | 安装游戏平台、购买和启动游戏 |
| Epic Games Store<br>`res-215f7a9368ce` | Epic游戏商店<br>`software` | `https://store.epicgames.com/zh-Hant/`<br>Epic Games Store → 同URL | `games:3:2`、`installation-software:7:1`<br>`life`、`setup` | 使用Epic游戏商店与客户端 |
| 雷神加速器<br>`res-b62262cabd66` | 游戏网络加速工具<br>`software` | `https://www.leigod.com/`<br>雷神加速器 → 同URL | `installation-software:7:2`<br>`setup` | 改善游戏网络连接 |
| MuMu模拟器<br>`res-2e471096b9d3` | 安卓模拟器<br>`software` | `https://mumu.163.com/`<br>MuMu模拟器 → 同URL | `installation-software:7:3`<br>`setup` | 在电脑上运行安卓应用或游戏 |

### 2.9 软件资源网站（1）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| MacPedia<br>`res-de194ed9757b` | Mac软件资源网站<br>`website` | `https://macpedia.xyz/`<br>MacPedia → 同URL | `installation-software:8:0`<br>`setup` | 查找Mac软件资源，不是软件实体本身 |

### 2.10 Mac专用软件（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| App Cleaner & Uninstaller<br>`res-61e2540c5015` | 应用清理工具<br>`software` | `null`<br>`[]` | `installation-software:8:1`<br>`setup` | 清理和卸载Mac应用；当前无入口 |
| Scroll Reverser<br>`res-e95bace475c6` | 滚轮方向调节工具<br>`software` | `null`<br>`[]` | `installation-software:8:2`<br>`setup` | 调整Mac滚动输入行为；当前无入口 |
| Picsee<br>`res-2b3e20dff7b4` | 图片浏览工具<br>`software` | `null`<br>`[]` | `installation-software:8:3`<br>`setup` | 浏览和管理图片；当前无入口 |
| IINA<br>`res-1c23a7b77657` | 视频播放器<br>`software` | `null`<br>`[]` | `installation-software:8:4`<br>`setup`、`life` | 在Mac本地播放视频；当前无入口 |

### 2.11 音频与音乐（4）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| EarMaster<br>`res-a3a2d6e482de` | 视唱练耳训练软件。<br>`software` | `https://www.earmaster.com/`<br>EarMaster → 同URL | `music:3:2`<br>`learn`、`setup` | 安装并进行视唱练耳训练 |
| Ableton Live<br>`res-b939645bed96` | 电子音乐、现场和循环创作 DAW。<br>`software` | `https://www.ableton.com/`<br>Ableton Live → 同URL | `music:5:3`<br>`create`、`setup` | 音乐编曲、制作和现场表演 |
| REAPER<br>`res-75ae98f287b2` | 轻量灵活的音频工作站。<br>`software` | `https://www.reaper.fm/`<br>REAPER → 同URL | `music:5:4`<br>`create`、`setup` | 录音、编辑与音频制作 |
| Audacity<br>`res-d130cc2e9c59` | 免费音频录制和编辑工具。<br>`website` | `https://www.audacityteam.org/`<br>Audacity → 同URL | `music:5:5`<br>`create`、`setup` | 下载并使用音频录制编辑软件 |

### 2.12 软件结构分析

当前11组并非使用单一分类轴：

- 按通用程度：基础软件。
- 按用途：办公与开发、阅读工具、多媒体工具、音频与音乐。
- 按工作领域：2D美术软件、3D美术软件、游戏平台。
- 按操作系统：Mac专用软件。
- 按实体性质或历史状态：软件资源网站、其他软件记录。

因此确实混合了用途、领域、平台和记录完整度多套逻辑。最大组“基础软件”只有6项，不属于数量失控；真正问题是38项被分成11组，且相邻逻辑并不平行。存在一个 singleton“软件资源网站”，也存在明确兜底组“其他软件记录”。CCTalk、Clash、百度网盘、有道词典被共同放进“办公与开发”，组名不能完整表达实际内容。

当前查找体验对已知领域软件尚可，例如3D、游戏、音频；但通用软件、系统工具和无URL记录的入口依赖历史分组记忆，扩展性有限。

## 3. 插件与扩展完整清单与结构分析

当前为7项、7个唯一 ID、2个 section。

### 3.1 3D插件与手册（5）

| name / ID | description / type | url / links | sources / contexts | 实体性质 / 宿主 / 当前主要用途 |
|---|---|---|---|---|
| Blender Extension<br>`res-90bbea3931de` | Blender内置插件下载平台<br>`website` | `https://extensions.blender.org/`<br>Blender Extension → 同URL | `3d-art:0:1`<br>`create`、`setup` | Blender官方扩展平台；宿主明确为Blender；查找和安装扩展 |
| KIT OPS 2 Manual<br>`res-782ef7ee4731` | Kitops参考手册，建筑模块化工具<br>`manual` | `https://docs.google.com/document/d/1rUzomyTi7ec2sFqeCgyVYgkbdnmVanlDCWYcvAzxOXE/edit`<br>KIT OPS 2 Manual → 同URL | `3d-art:0:2`<br>`create`、`setup` | KIT OPS 2插件手册；宿主从当前字段未直接写明，现有Blender关系提供上下文 |
| boxcutter手册<br>`res-0cca09db33fd` | Blender布尔建模工具手册<br>`manual` | `https://boxcutter-manual.readthedocs.io/en/latest/`<br>boxcutter手册 → 同URL | `3d-art:0:3`<br>`create`、`setup` | Blender插件手册；宿主明确为Blender |
| MESHmachine参考手册<br>`res-76887030b7a3` | 硬表面建模插件文档<br>`manual` | `https://machin3.io/MESHmachine/docs/`<br>MESHmachine参考手册 → 同URL | `3d-art:0:4`<br>`create`、`setup` | 插件文档；当前description未写宿主，Blender关系提供上下文 |
| blender魔酷网<br>`res-8d8eacb7c555` | 插件等资源网站，中文Blender社区<br>`community` | `https://blender.kim/`<br>blender魔酷网 → 同URL | `3d-art:3:14`<br>`create`、`setup` | Blender社区和插件资源网站；不是单个插件 |

### 3.2 音频插件与音色（2）

| name / ID | description / type | url / links | sources / contexts | 实体性质 / 宿主 / 当前主要用途 |
|---|---|---|---|---|
| Spitfire LABS<br>`res-6ef506a8e309` | 免费虚拟乐器和音色库。<br>`plugin` | `https://labs.spitfireaudio.com/`<br>Spitfire LABS → 同URL | `music:5:7`<br>`create`、`setup` | 虚拟乐器/音色库，需在音乐制作环境使用；没有唯一宿主 |
| Native Instruments<br>`res-efe4c2b50a33` | 软件乐器、效果器和制作生态。<br>`website` | `https://www.native-instruments.com/`<br>Native Instruments → 同URL | `music:5:8`<br>`create`、`setup` | 软件乐器与效果器生态入口；不是单个插件，也没有唯一宿主 |

### 3.3 插件与扩展结构分析

- 当前组织主要按工作领域/宿主生态分为3D与音频，不是按“插件、扩展、脚本”类型分组。
- 7项中只有Spitfire LABS的type为 `plugin`；另有3项 `manual`、2项 `website`、1项 `community`。
- 当前没有浏览器扩展或通用系统扩展，也没有明确脚本实体。
- “3D插件与手册”标题基本忠实，但其中还包含社区/资源网站；“音频插件与音色”包含插件及厂商生态入口。
- 独立 view 仍有意义，因为它提供附加组件和配套入口的安装视角；但当前范围比view名称更宽，且全部7项也共享到创作区。
- 与软件合并并非当前数据必然结论：插件/附加资源的生命周期和主软件不同；更需要先明确view是否容纳手册、社区和生态网站。

## 4. 系统与设备完整清单与结构分析

当前为6项、6个唯一 ID、2个 section。

### 4.1 游戏运行与优化（1）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| PCGamingWiki<br>`res-751a6d512a90` | PC游戏故障排除和优化<br>`website` | `https://www.pcgamingwiki.com/wiki/Home`<br>PCGamingWiki → 同URL | `games:5:4`<br>`life`、`setup` | 查询PC游戏兼容性、故障排查和优化方法 |

### 4.2 系统维护与工具（5）

| name / ID | description / type | url / links | sources / contexts | 当前主要用途 |
|---|---|---|---|---|
| 火绒安全<br>`res-787fd06cb08e` | 安全防护软件下载<br>`software` | `https://www.huorong.cn/`<br>火绒安全 → 同URL | `installation-software:0:4`<br>`setup` | 系统安全防护 |
| Bandizip<br>`res-9eeb06a2a9b2` | 压缩解压工具下载<br>`software` | `https://www.bandisoft.com/bandizip/`<br>Bandizip → 同URL | `installation-software:0:5`<br>`setup` | 文件压缩与解压；系统维护属性较弱 |
| Clash Verge Rev<br>`res-d7b68315ffd9` | 跨平台网络代理客户端<br>`software` | `https://github.com/clash-verge-rev/clash-verge-rev/releases`<br>Clash Verge Rev → 同URL | `installation-software:1:2`<br>`setup` | 管理网络代理环境 |
| App Cleaner & Uninstaller<br>`res-61e2540c5015` | 应用清理工具<br>`software` | `null`<br>`[]` | `installation-software:8:1`<br>`setup` | 清理、卸载应用；当前无入口 |
| Scroll Reverser<br>`res-e95bace475c6` | 滚轮方向调节工具<br>`software` | `null`<br>`[]` | `installation-software:8:2`<br>`setup` | 调整滚轮/输入行为；当前无入口 |

### 4.3 系统与设备结构分析

- 当前内容实际只有游戏故障排查、系统安全、压缩、网络代理、应用清理和输入行为调整。
- 没有操作系统实体、硬件设备、驱动、备份恢复、系统设置记录或独立网络资料组。
- 现有两组表达“游戏运行问题”与“通用系统工具”，标题在现有小集合内基本可理解。
- 5个软件实体全部同时在软件view，说明软件与系统的边界主要依靠“安装对象”与“维护用途”双场景，而不是不同实体集合。
- Bandizip最接近普通软件/文件工具；其系统维护归属证据弱于另外4项。
- 没有项目明显属于插件与扩展。
- PCGamingWiki与日常游戏共享合理：设备侧用于故障排查和运行优化，游戏侧用于玩家资料查询。
- view名称“系统与设备”覆盖面明显大于当前内容；这不是立即拆分的理由，但说明当前尚未真正覆盖设备管理。

## 5. 三个view之间的边界

- **软件**收录可安装客户端和软件入口，也夹有资源网站、无URL记录与按领域整理的软件。
- **插件与扩展**收录附加功能生态，但实际还包含手册、社区和厂商入口。
- **系统与设备**目前主要是软件view中5项系统工具的二次入口，加一个PCGamingWiki；并没有独立硬件或真实配置数据。

最明显的内部边界问题是软件与系统：5个共享ID占系统view的5/6。火绒、Clash、App Cleaner、Scroll Reverser具备清楚的系统维护用途；Bandizip的第二位置最弱。插件与软件之间没有同ID共享，Blender软件与Blender扩展/手册采用不同实体并通过关系连接，实体边界清楚。

## 6. 与创作与工作的共享

共有20个同ID共享实体。

| ID / 名称 | 设备与环境位置 | 创作与工作位置 | 两侧用途与判断 |
|---|---|---|---|
| `res-af8ef348cd3d` MuseScore | 软件 → 多媒体工具 | 音频与视频 → 音频制作工具 | 安装软件 / 制作乐谱，合理 |
| `res-5cc0e67257c0` OBS Studio | 软件 → 多媒体工具 | 音频与视频 → 视频工具 | 安装环境 / 录制直播工作流，合理 |
| `res-83dbf3146b95` Adobe Creative Cloud | 软件 → 2D美术软件 | 美术与设计 → 工具 | 软件套件管理 / 美术创作，合理 |
| `res-9fe35e6ae85e` CSP优动漫 | 软件 → 2D美术软件 | 美术与设计 → 工具 | 安装绘图软件 / 漫画插画创作，合理 |
| `res-3a81b1e5a03c` PureRef | 软件 → 2D美术软件 | 美术与设计 → 工具 | 安装工具 / 管理创作参考，合理 |
| `res-79e7b4b278c2` 字由 | 软件 → 2D美术软件 | 美术与设计 → 字体与文字 | 安装管理软件 / 字体工作流，合理 |
| `res-5ee7019b67b3` Quixel Bridge | 软件 → 3D美术软件 | 3D → 软件与工具 | 安装素材工具 / 3D素材工作流，合理；type为asset值得单独复核 |
| `res-b60e9fdc1539` Blender | 软件 → 3D美术软件 | 3D → 软件与工具 | 安装套件 / 3D制作，合理 |
| `res-684127ed910a` Gaea | 软件 → 3D美术软件 | 3D → 软件与工具 | 安装软件 / 地形制作，合理 |
| `res-19b4b0a8487e` Marvelous Designer | 软件 → 3D美术软件 | 3D → 软件与工具 | 安装软件 / 服装制作，合理 |
| `res-b939645bed96` Ableton Live | 软件 → 音频与音乐 | 音频与视频 → 音频制作工具 | 安装DAW / 音乐制作，合理 |
| `res-75ae98f287b2` REAPER | 软件 → 音频与音乐 | 音频与视频 → 音频制作工具 | 安装DAW / 音频制作，合理 |
| `res-d130cc2e9c59` Audacity | 软件 → 音频与音乐 | 音频与视频 → 音频制作工具 | 安装工具 / 音频编辑，合理；type为website值得复核 |
| `res-90bbea3931de` Blender Extension | 插件与扩展 → 3D插件与手册 | 3D → 手册与插件 | 扩展安装入口 / 3D制作配套，合理 |
| `res-782ef7ee4731` KIT OPS 2 Manual | 插件与扩展 → 3D插件与手册 | 3D → 手册与插件 | 配置插件时查手册 / 制作中查手册，合理，但本体是manual |
| `res-0cca09db33fd` boxcutter手册 | 插件与扩展 → 3D插件与手册 | 3D → 手册与插件 | 配置插件时查手册 / 建模中查手册，合理 |
| `res-76887030b7a3` MESHmachine参考手册 | 插件与扩展 → 3D插件与手册 | 3D → 手册与插件 | 配置插件时查手册 / 建模中查手册，合理 |
| `res-8d8eacb7c555` blender魔酷网 | 插件与扩展 → 3D插件与手册 | 3D → 教程与社区 | 查插件资源 / 使用社区教程，场景不同；设备侧归属比创作侧更宽泛 |
| `res-6ef506a8e309` Spitfire LABS | 插件与扩展 → 音频插件与音色 | 音频与视频 → 音频制作工具 | 安装音色/虚拟乐器 / 音乐制作，合理 |
| `res-efe4c2b50a33` Native Instruments | 插件与扩展 → 音频插件与音色 | 音频与视频 → 音频制作工具 | 制作生态管理 / 音乐制作，基本合理；实体是厂商生态网站而非单一插件 |

没有发现仅因“也是软件”而明显错误共享到创作区的实体。创作区20项都有实际制作、工具使用或配套文档场景；不过插件view全部7项同时存在于创作区，显示该view更像“安装/配套视角”，其独立边界需要在后续轻量审计中明确。

## 7. 与学习与研究的共享

只有1项：

| ID / 名称 | 设备与环境位置 | 学习与研究位置 | 判断 |
|---|---|---|---|
| `res-a3a2d6e482de` EarMaster | 软件 → 音频与音乐 | 音乐 → 音乐学习 | 设备侧表达软件安装，学习侧表达视唱练耳训练；用途明确不同，共享合理 |

没有其他设备实体与学习区共享。不能仅因软件可用于学习就自动增加共享；当前也没有本地证据支持新增。

## 8. 与日常与生活的共享

共有6项：

| ID / 名称 | 设备与环境位置 | 日常与生活位置 | 两侧用途与判断 |
|---|---|---|---|
| `res-90dd5ea957ab` 网易云音乐 | 软件 → 基础软件 | 音乐 → 收听与发现 | 播放器安装 / 日常听歌，合理 |
| `res-305ce2f2af53` 百度网盘 | 软件 → 办公与开发 | 日常工具 → 云存储 | 客户端/环境入口 / 日常云存储，合理；软件侧section名称不够准确 |
| `res-882fd7527ef0` Steam | 软件 → 游戏平台 | 游戏 → 游戏平台与商店 | 客户端安装 / 买游戏、玩游戏，合理 |
| `res-215f7a9368ce` Epic Games Store | 软件 → 游戏平台 | 游戏 → 游戏平台与商店 | 客户端/商店安装 / 获取和玩游戏，合理 |
| `res-1c23a7b77657` IINA | 软件 → Mac专用软件 | 影视 → 播放工具 | Mac软件安装 / 本地影视播放，合理 |
| `res-751a6d512a90` PCGamingWiki | 系统与设备 → 游戏运行与优化 | 游戏 → 资料与查询 | 故障排查、兼容优化 / 玩家资料查询，合理 |

六项都存在明确的“安装或环境”与“实际日常使用”双场景，没有明显过度共享。

## 9. relatedResources现状与候选

### 9.1 设备区实体已有的出向关系

| 来源 | 指向 | 关系性质 |
|---|---|---|
| MuseScore `res-af8ef348cd3d` | MuseScore 乐谱社区 `res-5c80faa79378` | 主软件 → 官方乐谱社区 |
| Blender `res-b60e9fdc1539` | Blender 3.1参考手册、Blender Extension、Blender Market、boxcutter手册、BlenderBros的Gumroad、BlenderBros主页、blender魔酷网、KIT OPS 2 Manual、MESHmachine参考手册、斑斓中国，共10项 | 主软件 → 官方手册/扩展平台及相关第三方资源 |
| Gaea `res-684127ed910a` | gaea Guide `res-5193234cd6bc` | 主软件 → 官方手册 |
| Marvelous Designer `res-19b4b0a8487e` | marvelous designer官方手册 `res-d9f8c92e89a4` | 主软件 → 官方手册 |
| Steam `res-882fd7527ef0` | Steam创意工坊 `res-b05a90020690` | 平台 → 官方MOD入口 |

共有5个设备区实体设置出向关系，共14条边。所有目标ID存在，未发现重复或自引用。

### 9.2 设备区实体的入向关系

以下5个设备区实体均被Blender `res-b60e9fdc1539` 引用：

- Blender Extension `res-90bbea3931de`
- KIT OPS 2 Manual `res-782ef7ee4731`
- boxcutter手册 `res-0cca09db33fd`
- MESHmachine参考手册 `res-76887030b7a3`
- blender魔酷网 `res-8d8eacb7c555`

这些关系跨 software、extensions 与创作区相关资源位置，但关系本身不改变navigation共享。

### 9.3 合理性与潜在候选

- MuseScore、Gaea、Marvelous Designer、Steam的关系都符合主软件/平台到明确附属资源的强关系。
- Blender到官方手册和扩展平台、插件手册的关系明确。
- Blender关系中第三方商店、团队主页、社区及“斑斓中国”标签页的语义比“官方附属资源”更宽。它们不是悬空或显然错误，但若未来收紧relatedResources标准，应单独复核，而不是本轮删除。
- 当前没有新的强候选：boxcutter、KIT OPS和MESHmachine只有手册实体，没有独立插件实体；Spitfire LABS与Native Instruments也没有唯一宿主软件，不能自动关联Ableton、REAPER或Audacity。

## 10. 个人配置现状

当前可区分为：

- A. 外部资源链接：大量存在，是当前主要内容。
- B. 软件实体：38项软件view引用中的主体。
- C. 插件/扩展实体：少量存在，但extensions中也混有手册、社区和生态网站。
- D. 真实个人配置：未发现。
- E. 仅有schema但没有实际数据：存在 `data/configuration.schema.json`。

schema支持设置、快捷键、工作区、安装清单、恢复步骤、平台、软件版本和本地文件引用；但仓库中没有配置实例文件。没有Photoshop快捷键、Blender个人配置、软件预设、个人插件安装清单、系统设置或备份恢复步骤的实际记录。

结论：设备与环境目前主要仍是软件、网站、手册和插件入口收藏；尚未真正承担个人环境配置与恢复管理功能。不能据schema生成虚假配置。

## 11. 重复实体与历史遗留检查

### 11.1 当前实体检查

- 设备区46个唯一实体之间没有同名不同ID。
- 在全部catalog中，也没有发现与设备区实体同名但不同ID的当前实体。
- 没有发现设备区实体与其他实体使用完全相同URL却拥有不同ID。
- 软件、插件手册、官网与资源网站目前各有不同语义，没有像此前Google Maps那样的明确现存重复实体。
- 软件与系统之间5个重复出现的是相同ID共享，不是重复实体。

### 11.2 已完成的历史合并

`docs/migration-map.json` 记录了以下与设备区有关的历史来源合并：

- 百度网盘：日常入口与安装软件入口合并为 `res-305ce2f2af53`，保留两个链接。
- Steam：游戏站入口与客户端入口合并为 `res-882fd7527ef0`，保留两个链接。
- Epic Games / Epic Games Store：完全相同URL合并为 `res-215f7a9368ce`。
- 字由：HTTPS下载入口与旧HTTP主页合并为 `res-79e7b4b278c2`。
- MuseScore / MuseScore软件下载：合并为 `res-af8ef348cd3d`。
- 网易云音乐：安装软件来源与音乐来源合并为 `res-90dd5ea957ab`。

这些是已完成的历史去重，不是当前待合并重复。Clash Verge Rev保留原ID并由phase 3从“Clash for Windows”修正为当前名称和入口，也不是两个当前实体。

## 12. 数据质量

### 12.1 逐view统计

| view | URL为空 | description为空 | HTTP主URL | 任一links含HTTP | label异常 | 本地link-check覆盖 |
|---|---:|---:|---:|---:|---:|---|
| 软件 | 8 | 0 | 0 | 1 | 0 | 24 responded / 3 unconfirmed / 3当前URL未被旧检查覆盖 / 8无URL |
| 插件与扩展 | 0 | 0 | 0 | 0 | 0 | 6 responded / 1 unconfirmed |
| 系统与设备 | 2 | 0 | 0 | 0 | 0 | 2 responded / 1 unconfirmed / 1当前URL未被旧检查覆盖 / 2无URL |

系统view的2个空URL及未覆盖的Clash均与软件view共享，因此大区去重后实际仍是8个空URL实体。

### 12.2 URL与字段问题

- 空URL：Microsoft Office、Xmind、Honeyview、Adobe Creative Cloud、App Cleaner & Uninstaller、Scroll Reverser、Picsee、IINA。
- 字由主URL是HTTPS，但第二个links入口仍为 `http://www.hellofont.cn/`。
- 所有非空links的label均与当前name一致。
- 没有空description。
- Quixel Bridge位于软件并描述为“素材管理工具”，但type为 `asset`，粒度与实际实体性质存在疑问。
- Audacity位于软件且描述为录制编辑工具，但type为 `website`，与同组DAW/软件不一致。
- extensions中3项为manual、2项为website、1项community、1项plugin；这是内容范围混合，不一定是单项type错误。
- Native Instruments是厂商制作生态网站，不是单个插件；blender魔酷网是社区；MacPedia是软件资源网站。其type与实体本身基本匹配，但所在view应在结构审计中考虑。
- 当前未发现可仅凭本地数据认定的旧品牌名称。旧快照中的“Clash for Windows”已经在phase 3修正为Clash Verge Rev。

### 12.3 既有link-check异常

`docs/link-check.json` 检查时间为2026-09-26，只记录当时网络结果，不代表当前失效：

- Steam：timeout，unconfirmed。
- Epic Games Store：HTTP 403，unconfirmed。
- MacPedia：HTTP 403，unconfirmed。
- KIT OPS 2 Manual：连接超时，unconfirmed。
- PCGamingWiki：HTTP 403，unconfirmed。

Clash Verge Rev、Blender与雷神加速器当前URL没有出现在旧link-check结果中，原因是这些入口在既有修正记录中发生过更新；本轮不联网，因此记为“旧检查未覆盖”，不能判断状态。

## 13. 三个view结构评级

| view | 资源数 | section数 | 评级 | 原因 |
|---|---:|---:|---|---|
| 软件 | 38 | 11 | **C** | 规模最大；同时按用途、领域、系统、来源性质和记录状态分类；有兜底组与singleton；软件/系统边界重复明显，值得专项审计 |
| 插件与扩展 | 7 | 2 | **B** | 数量小、两组易浏览，但只有1项type为plugin，混有手册、社区和厂商生态入口；先做轻量范围核对即可 |
| 系统与设备 | 6 | 2 | **B** | 结构简单，但5/6与软件共享，Bandizip边界较弱，且没有真正设备、驱动或配置数据；适合轻量边界整理，不需大规模拆分 |

没有view达到无保留的A级：软件有明显结构问题；另外两个虽小而可用，仍各有清楚的范围或边界问题。它们可以暂时保持现状，不应为了形式统一立即重组。

## 14. 下一步专项整理优先级

1. **最值得下一步专项整理：软件。** 38项、11组、多套分类轴并存，是唯一明确需要完整专项审计的view。
2. **可以直接保持：没有无条件A级view。** 插件与扩展最接近可暂时保持，当前只有7项且两组可浏览，不需要立即大改。
3. **只需轻量调整：插件与扩展、系统与设备。** 前者核对实体范围，后者核对与软件的共享边界即可。
4. **是否需要调整三个view边界：需要进一步讨论软件与系统的边界。** 插件view是否容纳手册和社区也应澄清；本轮不设计最终方案。
5. **是否存在明确重复实体：不存在。** 发现的历史重复都已在migration中合并。
6. **是否存在明显过度共享：没有已证实的跨大区过度共享。** 大区内部Bandizip同时进入软件与系统的理由最弱；系统view其余4个共享软件具备明确维护场景。
7. **是否存在缺失但明确应该共享的实体：未发现。** 不能因为创作或学习工具“也是软件”就把更多实体自动加入设备区。
8. **是否存在强relatedResources候选：没有新的强候选。** 当前明确的主软件→手册/扩展、平台→附属入口关系已存在；其余缺少唯一宿主或独立插件实体。
9. **是否已经存在真实个人配置：没有。** 只有schema，没有配置实例。
10. **是否需要新增新view：当前证据不足，不需要。** 尤其不能为了结构对称新增“我的配置”或“硬件”空view。

建议顺序：先对软件做完整资源专项审计；再根据结果轻量核对系统与设备边界；插件与扩展可以最后处理或暂时保持。

## 15. 本轮文件变更

本轮只新增：

- `docs/device-environment-overview-audit.md`：本总览审计报告。

未修改 `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`scripts/validate.mjs`、旧资源快照、UI、CSS、JS、HTML或任何资源字段；未联网；未commit；未push。
