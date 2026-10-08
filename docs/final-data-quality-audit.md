# 全站最终数据质量审计

审计日期：2026-10-06（Asia/Shanghai）。依据当前工作区实际数据，全程离线。范围包含 catalog、navigation、legacy、migration-map、原始资源快照、corrections、link-check，以及 docs 中既有审计/重组/验证记录。临时分析脚本仅在仓库外 /tmp 执行。

## 1. 执行摘要

**P0 = 0。** 全部 488 个实体、20 个 view、498 个来源、14 个 legacy 映射均完成静态检查；没有悬空引用、不可达实体、view 内重复卡片或无法解析的迁移落点。validator 通过不代表所有语义字段已正确：本次确认 3 项 P1，另列 18 组 P2 人工决策项。

P1 为 Quixel Bridge 的 `asset`、Audacity 的 `website` 与实体含义不符，以及 Midjourney页面端 description 混入无日期的历史评价。名称相似、HTTP、空 URL、共享、单向关系、历史标题均不自动定为错误。Costumers Guide 两条记录是强重复候选，但根入口与 about 子入口是否有独立用途尚不能仅凭本地数据确认。

数量口径：P1 按明确问题项计数；P2 按下文 18 个决策组计数，同组涉及实体数量另注明；P3 按 8 个合理保留类别计数。跨章节重复出现的同一问题不重复计数。P1 建议修复后再完成数据质量最终验收；结构验收当前不受阻。

## 2. 当前全站基线

| 指标 | 当前值 |
| --- | --- |
| 顶层大区 | 4：创作与工作 / 学习与研究 / 日常与生活 / 设备与环境 |
| views / sections | 20 / 99 |
| catalog 唯一实体 | 488 |
| 原始 sources / mergedSources | 498 / 10 |
| legacyPages | 14 |
| 主 URL 非空 / 空 | 477 / 11 |
| links 条目 / activeURLs（去重） | 481 / 481 |
| view 引用数 / 唯一 ID 数 | 525 / 488 |
| relatedResources 源 / 边 / 唯一目标 | 11 / 22 / 22 |
| internalLinks | 209 |
| confirmedCorrections | 9 |


477 个主 URL 和 481 个 activeURLs 是不同口径：每个非空主 URL 都在自身 links 中出现一次，另有 4 个次入口。与用户提供的全部基线一致。

## 3. catalog 完整性

| 检查 | 结果 | 判定 |
| --- | --- | --- |
| ID | 488 个字符串 ID，唯一；无重复 | 通过 |
| name / type | 字段齐全，非空，类型为字符串 | 通过 |
| description | 486 非空；2 项为空，详见第 5 节 | B：人工复核 |
| url | 477 个合法 HTTP(S) 字符串；11 个 null；无空串或缺失 | 通过，null 有历史依据 |
| links | 488 个数组；477 非空、11 空；481 个合法 URL | 通过 |
| tags / topics / contexts | 均为非空字符串数组；无重复元素、空成员或明显形状异常 | 通过 |
| sources | 488 个非空数组，共 498 唯一 sourceKey，逐项反向对应 migration | 通过 |
| relatedResources | 11 个源，所有目标存在，无自引用/重复 | 通过 |
| 其他格式 | 无异常 URL 空白、非法协议或空 link label；iconImage 文件存在 | 通过 |


A（明确错误）：完整性层面为 0；语义层面见 P1。B（复核）：2 个空 description、个别名称/type/入口边界。C（合理为空或特殊）：11 个 null URL 均伴随 `links: []`；未声明 relatedResources 的实体不要求补关系，corrections 清空的 reviewNotes 也不要求恢复。9 个实体仍有非空 reviewNotes：2 个学习导航的历史归组说明，7 个原始无入口软件的待补入口说明，均与当前事实一致。

## 4. 名称质量

完全相同 name：0 组。按 Unicode 去标点/空白并忽略大小写后：1 组，为 costumers guide / Costumers Guide。没有名称为空，也没有实体名混入“官网”“官方网站”“下载”。名称检查覆盖全部实体；没有依据本地记录可直接确认必须改名的 P1。

| 范围 | 当前名称/证据 | 判断 |
| --- | --- | --- |
| 标准化重名 | costumers guide `res-fde13a4c0113` / Costumers Guide `res-cdd92d2a8693`，同站根路径与 about.shtml | P2-01：强疑似重复，需确认子入口用途 |
| 同系列大小写 | gaea Guide / Gaea；marvelous designer官方手册 / Marvelous Designer；lospec / Lospec Palette List；Midjourney页面端 / midjourney 官方画廊 / midjourney关键词大全 | P2-07：系列呈现不一致 |
| 品牌空格/大小写 | Chat GPT、Deepseek、Google images、KitBash 3d、Pixelsquid 3d、the gnomon workshop | P2-07：命名规范候选；不凭离线印象批量改名 |
| 名称较模糊 | ninja `res-c816da9bb133`，URL 为 texture.ninja，description 指向纹理 | P2-09：可考虑补足辨识词 |
| 新旧品牌混合 | Origin/EA App；Blender Market（旧检查跳向 superhivemarket.com） | P2-04：当前身份/入口需复核 |
| 文章标题似描述句 | 有关榫卯，这里有最详细的介绍；10分钟带你了解西方服装史；汉服相关文章 | P3：指向具体文章，保留标题合理 |
| 软件/服务可能混淆 | 万兴优转对应 media.io；Microsoft Office 与 Microsoft 365 | 前者 P2-13；后者按本机套件与在线服务区分，不判重复 |


无需处理的相似名称：Blender 软件/手册/扩展/市场；Gaea 软件/Guide；Marvelous Designer 软件/手册；MuseScore 软件/乐谱社区；全历史/历史地图；GitHub/GitHub Pages；Steam/创意工坊；3DM/MOD站；lospec/色板库；Midjourney 编辑器/画廊；Live2D 手册/教程；国家地理/历史频道；各 Wikipedia 专题、Pinterest 图板与 Reddit 分社区。这些记录的入口或用途明确不同。

## 5. description 质量

| 实体 | 当前 description | 结论 |
| --- | --- | --- |
| Midjourney页面端（`res-b9db5bd74bbc`） | 可扩图等，需要账号，不是很好用了现在 | P1-03：无日期的历史使用评价混入实体描述；不判断其现时功能好坏 |
| Gamer520（仅供学习）（`res-f40af01b4876`） | 空字符串 | P2-11：旧 source 原本即为空，非迁移丢失 |
| 1LOU（仅供学习）（`res-26efb6488262`） | 空字符串 | P2-11：旧 source 原本即为空，非迁移丢失 |
| HDmoli（`res-d284007428f0`） | 高清魔力影视 | P2-12：品牌式短语，缺少动作信息 |
| 4K影视（`res-2093fb1cd899`） | 4K高清影视资源 | P2-12：播放/搜索/下载用途不够具体 |
| Category: Firearm Actions（`res-4fd2f2cdaae2`） | 枪支运动列表 | P2-12：Firearm Actions 的术语翻译值得人工确认，离线不作领域事实定论 |
| 腾祥字库（`res-a4d546d8288c`） | 腾讯系字体库 | P2-13：品牌归属说明无法由现有来源证实 |
| 万兴优转（`res-0f267a098943`） | 音视频格式转换与编辑工具 | P2-13：描述功能与 media.io 入口相容，但万兴优转产品身份需核对 |


无 description 仅为“网站”“工具”“资源”的记录；无 description 与 name 完全相同的记录；没有把 URL 失效/待补链接写入 description 的当前记录。多数简短描述仍有具体用途，例如“世界语言数据库”“图片查看器”，无需仅为文风补写。

P2-18：需未来确认的事实/时效或授权表述集中包括 Deepseek“免费使用”、Steam“全球最大的”、Sonniss GameAudioGDC“免版税且可商用”，以及个别质量评价如“持续更新”“量少”。这些无法离线证实过时或错误，未升级为 P1，也不把所有“高质量”“好用”正常偏好描述列入修改清单。

## 6. type 审计

| type | 实体数 | 典型含义 |
| --- | --- | --- |
| manual | 19 | 手册、文档或指南 |
| website | 365 | 网站、在线服务、平台或尚未细分的网页入口 |
| tutorial | 13 | 教程、课程、学习方法或教程平台 |
| asset | 28 | 素材、乐谱等内容资源/资源库 |
| community | 26 | 社区、论坛或互动分享平台 |
| software | 36 | 本机软件、客户端或安装环境实体 |
| plugin | 1 | 插件/虚拟乐器 |


| 等级 | 实体 | 当前 type | 证据 |
| --- | --- | --- | --- |
| P1-01 | Quixel Bridge（`res-5ee7019b67b3`） | asset | description 为素材管理工具，software/3d 双视图均作为工具实体；内容资源类型与管理软件不符 |
| P1-02 | Audacity（`res-d130cc2e9c59`） | website | description 为免费音频录制和编辑工具，setup/create 场景，software/av 两处作为软件；与同组软件语义不符 |
| P2-10 | Sketch `res-02a7cca093b2` / Adobe XD `res-9dbc2f574fa5` | website | 本地描述强调 Mac 设计软件/设计工具，可能同等级，但本轮没有足够入口身份说明直接确认为错误 |
| P2-10 | FMOD `res-9f9c9e89ce78` / Vite `res-0fb5b5874dd8` / Twine `res-37ba40863c00` | website | 中间件/构建/叙事工具，用网页承载入口；应先决定软件包与服务的 type 口径 |
| P2-10 | GitHub Pages `res-0ee9368c2a94` / JavaScript.info `res-3955ba862077` / Gearspace `res-20dbab3b0c2f` | website | 本地描述分别为官方文档/系统学习/讨论，可能宜 manual/tutorial/community |
| P2-10 | Jira `res-7c726d842f83` | software | 与其他项目管理在线平台粒度不同，但 software 并非已证实错误 |


website 365 项覆盖不同粒度；Unsplash/Poly Haven 的 website 与 Pexels/Pixabay 的 asset、Sonniss 的 website 与其他音效库的 asset 也体现“入口载体”和“内容性质”混用（归 P2-10 同一口径决策）。合理特殊情况：Native Instruments 是制作生态入口，MacPedia 是软件资源网站，Blender Extension 是下载平台，插件手册为 manual，Spitfire LABS 为 plugin；它们位于设备视图不意味着必须都是 software/plugin。Steam、Epic Games Store、百度网盘当前 software 可表达客户端恢复用途，保留为边界选择。

## 7. URL / links 审计

| 指标 | 结果 |
| --- | --- |
| 非空主 URL / 空 URL | 477 / 11 |
| 主 URL：HTTP / HTTPS | 39 / 438 |
| links：HTTP / HTTPS | 40 / 441 |
| links 总数 / 唯一 URL | 481 / 481 |
| 同实体重复 links URL | 0 |
| 主 URL 与自身 links 完全相同 | 477 项，每项恰好一次；validator 要求，合理 |
| 同一主 URL 多实体 / links 交叉 | 0 / 0 |
| 主 URL 与其他实体 links 交叉 | 0 |
| URL 解析/协议/空白异常 | 0 |
| 空/缺失 link label | 0 |
| label 与当前 name 不同 | 1：MFD设计师导航次入口 label 为刺猬星球；属于历史合并名称 |
| 已确认撤下的旧 URL 重新活跃 | 0 |


字由 `res-79e7b4b278c2` 主入口为 `https://www.hellofont.cn/download`，次入口仍为 `http://www.hellofont.cn/`（P2-03）。旧检查记录它跳转到 HTTPS，但不代表当前必须删除或当前已失效。其余额外入口是百度网盘、Steam、MFD设计师导航，均有历史合并依据。

HTTP 完整名单（40 条，除字由外均为主入口；HTTP 本身不认定错误）：

| 实体 | 当前 URL |
| --- | --- |
| 龋齿一号（`res-d2e7f9db431e`） | http://www.gfxcamp.com/ |
| modown魔顿（`res-297f934b6192`） | http://www.modown.cn/ |
| costumers guide（`res-fde13a4c0113`） | http://www.costumersguide.com/ |
| 电影拉片学院（`res-54640836d0f0`） | http://www.movieminer.top/# |
| reference angle（`res-32a9fd9b07e0`） | http://referenceangle.com/ |
| Art Of Soulburn（`res-235c2d82268a`） | http://www.neilblevins.com/ |
| zpz 学员作品主页（`res-7527bb42a283`） | http://zpzdesign.artp.cc/works |
| airpano（`res-58ed25568c4c`） | http://www.airpano.com/ |
| silk（`res-e437ff3fc9fd`） | http://weavesilk.com/ |
| POP趋势服装（`res-08dc7ba6b85c`） | http://www.pop-fashion.com/patterns/graphics/?pid=000535 |
| Loveblush Bridal（`res-df5f19bf8bfd`） | http://www.loveblushbridal.com/ |
| Moritz Jendrl（`res-1aa2da8a9ba3`） | http://moritz-jendrl.de/ |
| Survival Game Fashion Snap（`res-03fd01c04883`） | http://sg-fashion-snap.com/archives/category/men |
| Costumers Guide（`res-cdd92d2a8693`） | http://www.costumersguide.com/about.shtml |
| Kostym（`res-87e754063973`） | http://www.kostym.cz/Anglicky/obsah.htm |
| Elizabethan Costume（`res-715393f09ccc`） | http://www.elizabethancostume.net/ |
| Larsdatter（`res-a1da8023cf1e`） | http://www.larsdatter.com/18c/index.html |
| Photo Detective（`res-79f7ac7b595f`） | http://www.photodetective.co.uk/Index.html |
| 汉服资料馆（`res-2a37fce77ad9`） | http://120.25.237.190/hanfu/index.html |
| 走读派（`res-82a3f65e65ad`） | http://www.zoudupai.com/ |
| 书享家（`res-6cf1e7e339ad`） | http://shuxiangjia.cn/ |
| 超能搜（`res-f319d4efdf9b`） | http://chaonengsou.com/ |
| 枪炮世界（`res-b1a3289aa752`） | http://pewpewpew.work/index.htm |
| 国学导航－中国历史地图集（`res-59d18d3be24a`） | http://www.guoxue123.com/other/map/zgmap/ |
| 地图窝 中国历史地图（`res-df82b0297031`） | http://www.onegreen.net/maps/List/List_787.html |
| 中国古代史地图（`res-29b208b30ff4`） | http://home.olemiss.edu/~gg/hstrymap/lishidit.htm |
| AmCharts像素图生成器（`res-64ef3d7e03d5`） | http://pixelmap.amcharts.com/# |
| 字由（`res-79e7b4b278c2`） | http://www.hellofont.cn/ |
| 中国蓝光网（`res-5ef708a662da`） | http://www.languangdy.com/ |
| 中国色（`res-1c0d2a644fd8`） | http://zhongguose.com/#danshuhong |
| 千库网（`res-931a52adccb3`） | http://588ku.com/ |
| 方正字库（`res-157a9b6350b8`） | http://www.foundertype.com/ |
| 腾祥字库（`res-a4d546d8288c`） | http://www.tensentype.com/ |
| 本墨字库（`res-641b04a8fdc6`） | http://www.benmo.biz/ |
| 汉仪字库（`res-4a2be2d434fd`） | http://www.hanyi.com.cn/productList.php |
| 图翼（`res-dc3bcae11745`） | http://www.tuyiyi.com/t-7913-1.html |
| 字体传奇网（`res-d05394c26b11`） | http://www.ziticq.com/ |
| 中文字体-站长素材（`res-1f407fe6565f`） | http://font.chinaz.com/zhongwenziti.html |
| 设计癖（`res-7344a6a6a831`） | http://www.shejipi.com/ |
| 家纺趋势（`res-1a109a64242b`） | http://www.91jiafang.com/ |


已有 link-check（2026-09-26）记录的旧域名/路径线索（P2-04）：Blender Market → superhivemarket.com；Gearspace 当前仍指向 gearslutz.com/board；Origin/EA App → ea.com/games/library/pc-download；Kimi 的 moonshot.cn → kimi.com；Vite 的 vitejs.dev → vite.dev；Flim beta → app；Lospec palettes → palette-list；3DCoat Wiki → documentation；文悦字库 wytype.com → wenyue.cn；图虫 stock.dfic.cn → stock.tuchong.com；reeoo iphone 子域 → reeoo.com/app；Art Of Soulburn 的 neilblevins.com → artofsoulburn.com；热播之家 rebozj.pro → rebozj.cc；Spitfire LABS → splice.com/instrument/labs-instrument；Adobe XD 产品页 → helpx 文档；Color Claim → access.mymind.com/colors。这些是已有响应记录，未验证当前内容，不能自动改写为所谓新官网。

较高优先复核的历史异域跳转（P2-05）：JAY仓库、我的书签、555电影均记录跳往 `202608.urldance.com`，lughertexture 记录跳往 `elchiraemprende.pe/...papercraft...`。这些目标与本地实体说明不明显相符，即使旧结果是 responded，也不能视为内容正确；本轮没有足够证据把当前 URL 判为明确错误。POP、微博、CSP 等跳到验证/登录页则属于访问流程线索，不直接列为错误域名。

## 8. 空 URL 完整名单

| 实体 | 来源/原因 | 当前判断 |
| --- | --- | --- |
| hdrlabs（`res-ccafe101a1b7`） | correction 撤下旧入口；原链接留在 migration | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Atomic Jane Clothing（`res-cb87182a0b47`） | correction 撤下旧入口；原链接留在 migration | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| 世界历史地图（`res-362623d636fc`） | correction 撤下旧入口；原链接留在 migration | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Microsoft Office（`res-26ce40a4e924`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Xmind（`res-526a4ab431c7`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Honeyview（`res-3b65565237c5`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Adobe Creative Cloud（`res-83dbf3146b95`） | correction 撤下原微博入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| App Cleaner & Uninstaller（`res-61e2540c5015`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Scroll Reverser（`res-e95bace475c6`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| Picsee（`res-2b3e20dff7b4`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |
| IINA（`res-1c23a7b77657`） | 原条目本来无链接，reviewNotes 保留待补入口 | 合理保留为空；未来可补经确认的入口（P2-02），无当前数据错误 |


11 项全部为 `url: null`、`links: []`。8 项是软件记录，3 项是历史撤下入口的素材/网站记录。未发现因迁移遗漏而误变 null 的实体；历史 404 不可据此恢复旧 URL。

## 9. 重复实体审计

覆盖 exact name、标准化 name、主 URL、links URL、sourceKey 反向映射、同域入口、品牌/名称词族与 migration 合并记录。完全同名 0；标准化同名 1 组；相同主 URL 0；跨实体 links URL 交叉 0；同 sourceKey 分配不同实体 0。当前没有可离线确认的重复实体，因此没有据此新增 P0。

P2-01 的 Costumers Guide 两项：`res-fde13a4c0113` 来源 concept-art，根入口 `http://www.costumersguide.com/`；`res-cdd92d2a8693` 来源 costume-fashion-design，入口 `http://www.costumersguide.com/about.shtml`。二者都在 art，描述分别为电影服装参考、影视作品着装文章。没有像“色板库”“MOD站”那样明确的独立功能说明，应优先确认究竟是重复站点记录还是有意保留子页面。

已完成的 10 项历史合并（不是当前重复）：

| 保留实体 | 被合并 sourceKey | 状态 |
| --- | --- | --- |
| 百度网盘（`res-305ce2f2af53`） | installation-software:1:3 | source 已并入保留实体；原入口按规则保留 |
| Steam（`res-882fd7527ef0`） | installation-software:7:0 | source 已并入保留实体；原入口按规则保留 |
| Epic Games Store（`res-215f7a9368ce`） | installation-software:7:1 | source 已并入保留实体；原入口按规则保留 |
| MFD设计师导航（`res-27a435bd6587`） | visual-communication:7:2 | source 已并入保留实体；原入口按规则保留 |
| 字由（`res-79e7b4b278c2`） | visual-communication:10:3 | source 已并入保留实体；原入口按规则保留 |
| GitHub（`res-09a8b930c8b7`） | work-tools-collaboration:6:0 | source 已并入保留实体；原入口按规则保留 |
| MuseScore（`res-af8ef348cd3d`） | music:2:0 | source 已并入保留实体；原入口按规则保留 |
| 网易云音乐（`res-90dd5ea957ab`） | music:2:1 | source 已并入保留实体；原入口按规则保留 |
| Freesound（`res-a52cf5ddd10b`） | music:5:6 | source 已并入保留实体；原入口按规则保留 |
| 谷歌地图（`res-f1f736c6c199`） | daily-essentials:5:3 | 退休 ID 已退出 catalog/导航/legacy；旧 URL 仅存历史 |


谷歌地图退休 ID `res-d8773ad6b7a9` 只作为 migration 历史信息保留。498 − 488 = 10，10 个多 source 实体与 deduplicated 逐项吻合。相关资源不等于重复；品牌下手册/教程/社区/专题是合理独立入口。网飞猫/备用虽为同服务主入口与备用子域，本地原始名称和 film-relation-report 明确保留独立卡片，判 P3；Microsoft Office/365 分别为软件套件与云服务，现有数据不足以要求合并。

## 10. navigation 结构

| view / 标题 | section 数 | 引用数 | 唯一 ID | 重复/悬空/空组 | singleton | previousTitles 条目数 |
| --- | --- | --- | --- | --- | --- | --- |
| art / 美术与设计 | 21 | 168 | 168 | 0 / 0 / 0 | 0 | 51 |
| 3d / 3D | 5 | 48 | 48 | 0 / 0 / 0 | 0 | 8 |
| game-production / 游戏制作 | 5 | 23 | 23 | 0 / 0 / 0 | 0 | 10 |
| ai / AI | 6 | 23 | 23 | 0 / 0 / 0 | 1 | 9 |
| development / 开发 | 4 | 21 | 21 | 0 / 0 / 0 | 0 | 9 |
| av / 音频与视频 | 4 | 18 | 18 | 0 / 0 / 0 | 0 | 4 |
| work / 工作与协作 | 5 | 31 | 31 | 0 / 0 / 0 | 0 | 5 |
| art-study / 美术 | 3 | 5 | 5 | 0 / 0 / 0 | 2 | 0 |
| game-study / 游戏设计 | 2 | 6 | 6 | 0 / 0 / 0 | 1 | 0 |
| history / 历史 | 4 | 32 | 32 | 0 / 0 / 0 | 1 | 6 |
| music-study / 音乐 | 4 | 12 | 12 | 0 / 0 / 0 | 0 | 0 |
| code-study / 开发学习 | 1 | 4 | 4 | 0 / 0 / 0 | 0 | 0 |
| research / 学习资源 | 3 | 6 | 6 | 0 / 0 / 0 | 1 | 0 |
| games / 游戏 | 8 | 30 | 30 | 0 / 0 / 0 | 1 | 7 |
| film / 影视 | 5 | 17 | 17 | 0 / 0 / 0 | 2 | 0 |
| music / 音乐 | 1 | 2 | 2 | 0 / 0 / 0 | 0 | 0 |
| daily / 日常工具 | 6 | 29 | 29 | 0 / 0 / 0 | 0 | 4 |
| software / 软件 | 8 | 38 | 38 | 0 / 0 / 0 | 0 | 20 |
| extensions / 插件与扩展 | 2 | 7 | 7 | 0 / 0 / 0 | 0 | 2 |
| system / 系统与设备 | 2 | 5 | 5 | 0 / 0 / 0 | 1 | 2 |


四大区导航项完整覆盖 20 个 view，view.area 一致；section ID 在 view 内唯一。标题重复仅见 art 中两个“工具”，分别属于概念设计与视觉设计领域，domain/group/sectionIds 路径能够区分，属于合理局部标题；其余 view 内无重复 section 标题。music 与 music-study 都显示“音乐”，其大区和 view key 不同，非结构冲突。未发现重构后明显语义冲突，不重新评价已确认架构。

10 个 singleton 完整名单：ai / AI 导航（Toolify）；art-study / 影视视觉学习（电影拉片学院）；art-study / CG教程（Art Of Soulburn）；game-study / 开发学习资料（好猫字幕组_语雀）；history / 资料与馆藏（Library of Congress）；research / 语言资料（民族语言）；games / 互动小游戏（It's Adoorable）；film / 播放工具（IINA）；film / 影视查询（IMDB 电影社区）；system / 运行与故障排查（PCGamingWiki）。均有独立用途，不因数量要求合并。

## 11. 跨 view 共享

出现在 1 个 view：451 个；2 个 view：37 个；3 个或更多 view：0 个。未出现在任何 view：0 个。525 = 451 + 37 × 2。下表是所有共享实体，每项均为 A（场景明确不同）；B/C 为 0。

| 实体 | views | 判定与场景 |
| --- | --- | --- |
| Blender Extension（`res-90bbea3931de`） | 3d / extensions | A：3D 工作流查阅 / 扩展与配套资源 |
| KIT OPS 2 Manual（`res-782ef7ee4731`） | 3d / extensions | A：3D 工作流查阅 / 扩展与配套资源 |
| boxcutter手册（`res-0cca09db33fd`） | 3d / extensions | A：3D 工作流查阅 / 扩展与配套资源 |
| MESHmachine参考手册（`res-76887030b7a3`） | 3d / extensions | A：3D 工作流查阅 / 扩展与配套资源 |
| blender魔酷网（`res-8d8eacb7c555`） | 3d / extensions | A：3D 工作流查阅 / 扩展与配套资源 |
| 百度网盘（`res-305ce2f2af53`） | daily / software | A：日常云存储 / 客户端环境 |
| Freesound（`res-a52cf5ddd10b`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| Artlist（`res-d7eb5223b94b`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| Sonniss GameAudioGDC（`res-081fc086a730`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| 爱给网_音效配乐（`res-b2d8bb124ac1`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| jsfxr（`res-4936c36df3f4`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| FMOD（`res-9f9c9e89ce78`） | game-production / av | A：游戏接入/制作 / 通用音频工作流 |
| Steam（`res-882fd7527ef0`） | games / software | A：购游/使用 / 客户端环境 |
| Epic Games Store（`res-215f7a9368ce`） | games / software | A：购游/使用 / 客户端环境 |
| PCGamingWiki（`res-751a6d512a90`） | games / system | A：游戏资料查询 / 运行故障排查 |
| 网易云音乐（`res-90dd5ea957ab`） | music / software | A：收听 / 播放器环境 |
| 火绒安全（`res-787fd06cb08e`） | software / system | A：软件恢复 / 系统维护与网络 |
| Clash Verge Rev（`res-d7b68315ffd9`） | software / system | A：软件恢复 / 系统维护与网络 |
| MuseScore（`res-af8ef348cd3d`） | av / software | A：音频/视频制作 / 软件恢复 |
| OBS Studio（`res-5cc0e67257c0`） | av / software | A：音频/视频制作 / 软件恢复 |
| Adobe Creative Cloud（`res-83dbf3146b95`） | art / software | A：设计使用 / 软件恢复 |
| CSP优动漫（`res-9fe35e6ae85e`） | art / software | A：设计使用 / 软件恢复 |
| PureRef（`res-3a81b1e5a03c`） | art / software | A：设计使用 / 软件恢复 |
| 字由（`res-79e7b4b278c2`） | art / software | A：设计使用 / 软件恢复 |
| Quixel Bridge（`res-5ee7019b67b3`） | 3d / software | A：3D 创作 / 软件恢复 |
| Blender（`res-b60e9fdc1539`） | 3d / software | A：3D 创作 / 软件恢复 |
| Gaea（`res-684127ed910a`） | 3d / software | A：3D 创作 / 软件恢复 |
| Marvelous Designer（`res-19b4b0a8487e`） | 3d / software | A：3D 创作 / 软件恢复 |
| App Cleaner & Uninstaller（`res-61e2540c5015`） | software / system | A：软件恢复 / 系统维护与网络 |
| Scroll Reverser（`res-e95bace475c6`） | software / system | A：软件恢复 / 系统维护与网络 |
| IINA（`res-1c23a7b77657`） | film / software | A：播放 / 播放器恢复 |
| EarMaster（`res-a3a2d6e482de`） | music-study / software | A：训练 / 软件恢复 |
| Ableton Live（`res-b939645bed96`） | av / software | A：音频/视频制作 / 软件恢复 |
| REAPER（`res-75ae98f287b2`） | av / software | A：音频/视频制作 / 软件恢复 |
| Audacity（`res-d130cc2e9c59`） | av / software | A：音频/视频制作 / 软件恢复 |
| Spitfire LABS（`res-6ef506a8e309`） | av / extensions | A：音频制作使用 / 插件与音源查找 |
| Native Instruments（`res-efe4c2b50a33`） | av / extensions | A：音频制作使用 / 插件与音源查找 |


重点复核结果：software/创作区、software/日常区共享有安装/恢复与实际使用的区别；system 当前不再包含 Bandizip，旧报告的“可能冗余”共享已解决。extensions 的 7 项都与创作区共享，但当前标题强调扩展/音源配套，作为另一查找角度合理；3 项插件手册不因为 type=manual 就被错误剔除。

## 12. relatedResources 最终审计

有关系的源实体 11 个，总边数 22，唯一目标 22；悬空目标、自引用、源内重复目标均为 0。A→B 与 B→A 成对关系为 0，因此没有无意义双向关系；22 条均为单向，符合快速聚合入口原则。所有目标仍在各自 view 中有独立卡片。

| 源实体 | 完整目标 | 判断 |
| --- | --- | --- |
| Midjourney页面端（`res-b9db5bd74bbc`） | midjourney 官方画廊（`res-6474cdc40eb4`）；midlibrary（`res-7af19e673662`）；midjourney关键词大全（`res-5b82b9bcfe4b`） | P3：功能/手册/主入口与子入口关系明确 |
| lospec（`res-c72b7f01237d`） | Lospec Palette List（`res-52fdc3546967`） | P3：功能/手册/主入口与子入口关系明确 |
| 3DM（`res-0c78ece82080`） | 3DM MOD站（`res-c619a3f5aaaa`） | P3：功能/手册/主入口与子入口关系明确 |
| Steam（`res-882fd7527ef0`） | Steam创意工坊（`res-b05a90020690`） | P3：功能/手册/主入口与子入口关系明确 |
| 全历史（`res-664260a4c584`） | 历史地图（全历史）（`res-8a5ad8ede2e1`） | P3：功能/手册/主入口与子入口关系明确 |
| GitHub（`res-09a8b930c8b7`） | GitHub Pages（`res-0ee9368c2a94`） | P3：功能/手册/主入口与子入口关系明确 |
| MuseScore（`res-af8ef348cd3d`） | MuseScore 乐谱社区（`res-5c80faa79378`） | P3：功能/手册/主入口与子入口关系明确 |
| Blender（`res-b60e9fdc1539`） | Blender 3.1 参考手册（`res-3a9f5c96c220`）；Blender Extension（`res-90bbea3931de`）；Blender Market（`res-7b921cd30d30`）；boxcutter手册（`res-0cca09db33fd`）；BlenderBros的Gumroad（`res-d08195ed9949`）；BlenderBros主页（`res-1151a8221b4f`）；blender魔酷网（`res-8d8eacb7c555`）；KIT OPS 2 Manual（`res-782ef7ee4731`）；MESHmachine参考手册（`res-76887030b7a3`）；斑斓中国（`res-a05767c5d3d9`） | P2-15：10 项主要合理；生态资源较宽，可人工复核，已有确认见下文 |
| Gaea（`res-684127ed910a`） | gaea Guide（`res-5193234cd6bc`） | P3：功能/手册/主入口与子入口关系明确 |
| Marvelous Designer（`res-19b4b0a8487e`） | marvelous designer官方手册（`res-d9f8c92e89a4`） | P3：功能/手册/主入口与子入口关系明确 |
| 网飞猫（`res-0310c06e735b`） | 网飞猫备用（`res-c68a509f5bf8`） | P3：功能/手册/主入口与子入口关系明确 |


Blender → KIT OPS 2 Manual、MESHmachine参考手册、斑斓中国在 phase-4-report 的人工确认追加记录中已有依据，旧“待确认”结论已经解除。BlenderBros 商店/主页、Blender Market、blender魔酷网属于生态聚合而非所属关系：范围较宽但未发现明确无关目标，不自动删除。Midjourney 的三项目标分别为官方画廊、风格参考、关键词参考，没有扩大到泛 AI。MuseScore 与乐谱社区、Steam 与工坊、3DM 与 MOD、全历史与地图、网飞猫与备用、GitHub 与 Pages、lospec 与色板、Gaea/Marvelous 与各自手册均合理。没有证据表明这 22 条关系实际上应该作为已确认重复实体合并。

## 13. sources / migration / legacy 一致性

| 检查 | 结果 |
| --- | --- |
| sources ↔ migration rows | 498 个 sourceKey 全部唯一，双向对应当前 resourceId；catalog 无额外或丢失 source |
| migration resourceId | 498 行均存在当前实体；resourceCount=488 |
| migration destination | 全部通过 current title/previousTitles + resourceId 唯一解析；不只有标题匹配 |
| merge | 10 项 source 均映射保留 ID；多 source 集合与历史合并吻合 |
| discardOriginalURL | 谷歌地图明确记录 retainedURL 与退休 ID；旧 URL 未活跃 |
| legacy | 14 页全部 ID 存在，ID 集合与对应 migration 页去重集合一致 |
| 原始快照 | 14 页 resource 对象逐项与 migration.original 一致（validator 检查） |
| corrections | 9 个 correction 的每个 after 字段与 catalog 完全一致 |
| 修正后的旧 URL | 撤下的错误入口未重新出现在 catalog 主 URL 或 links |
| 历史记录影响 validator | 未发现过期 after 值反向锁定当前错误数据或无法解析的迁移记录 |


phase-3-corrections 的 entityCountBefore/After=489、旧 validation JSON 和此前报告中 489 是历史阶段计数，当前 Google Maps 合并后为 488。validator 读取 corrections.changes 的 after 字段，当前全部一致；不读取这些旧计数作为当前实体数断言。保存这些快照不构成 P0。migration 旧标题以及旧 source.group 是证据，不能要求它们全部等于现行显示标题。

legacy 本身只保存 ID，不保存当前 section 名。下节“legacy 来源”数表示该 alias 对应 migration 行来自本地 legacy 页且其 ID 仍被该页映射；不是声称 legacy.js 直接引用旧标题。

## 14. previousTitles 专项

view 级 previousTitles：0。section 级：77 个 section、137 个旧标题条目（含跨 section 重复）、91 个不同旧标题；136 条有符合该 section 实体的 migration 引用，1 条无实际落点引用。

下表完整列出每项旧标题与当前标题。括号为“migration 对应来源行数 / legacy 来源行数”，按该 section 的 resourceId 交集统计，避免同名 alias 在多个 section 中被误判为都有效。

| view / 当前 section | 完整旧标题（migration / legacy） | 判断 |
| --- | --- | --- |
| art / 图片与素材 | 概念设计 · 可商用图片（3/3） | 全部仍有兼容用途 |
| art / 综合参考 | 概念设计 · 主要参考（4/4）；概念设计 · 特殊参考（1/1）；概念设计 · 其他工具（1/1） | 全部仍有兼容用途 |
| art / 人体参考 | 概念设计 · 特殊参考（1/1）；概念设计 · 人体参考（5/5） | 全部仍有兼容用途 |
| art / 影视与摄影参考 | 概念设计 · 主要参考（1/1）；概念设计 · 电影剧照参考（3/3）；概念设计 · 特殊参考（1/1）；概念设计 · 航拍与摄影（3/3）；概念设计 · 其他工具（1/1） | 全部仍有兼容用途 |
| art / 艺术家与社区 | 概念设计 · CG艺术家（4/4）；概念设计 · 设计社区（4/4） | 全部仍有兼容用途 |
| art / 工具 | 概念设计 · 其他工具（3/3）；视觉设计 · 软件与工具（1/1） | 全部仍有兼容用途 |
| art / 配色 | 视觉设计 · 单色配色（2/2）；视觉设计 · 配色方案（4/4）；视觉设计 · 渐变色卡（2/2）；视觉设计 · 色轮工具（3/3） | 全部仍有兼容用途 |
| art / 字体与文字 | 视觉设计 · 软件与工具（2/2）；视觉设计 · 中文字库官网（5/5）；视觉设计 · 字体工具（3/3） | 全部仍有兼容用途 |
| art / 图形与素材 | 视觉设计 · 平面设计素材（5/5）；视觉设计 · 图标与导航（1/1）；视觉设计 · 设计社区与趋势（1/1） | 全部仍有兼容用途 |
| art / 灵感与案例 | 视觉设计 · 设计案例与学习（2/2）；视觉设计 · 设计社区与趋势（1/1） | 全部仍有兼容用途 |
| art / 社区与趋势 | 视觉设计 · 摄影社区（1/1）；视觉设计 · 设计社区与趋势（3/3） | 全部仍有兼容用途 |
| art / 工具 | 视觉设计 · 地图制作（2/2）；视觉设计 · 软件与工具（2/2）；视觉设计 · 特殊视觉工具（2/2）；视觉设计 · 图标与导航（1/1）；视觉设计 · 设计与原型（6/6） | 全部仍有兼容用途 |
| art / 现代时装 | 设计参考 · 服装与时尚 · 现代时装（8/8） | 全部仍有兼容用途 |
| art / 历史服装 | 设计参考 · 服装与时尚 · 西方古代（11/11）；设计参考 · 服装与时尚 · 中国古代（3/3） | 全部仍有兼容用途 |
| art / 风格与题材 | 设计参考 · 服装与时尚（1/1）；设计参考 · 服装与时尚 · 废土、军事、科幻（3/3）；设计参考 · 服装与时尚 · 其他风格（6/6）；设计参考 · 服装与时尚 · 西方古代（3/3） | 全部仍有兼容用途 |
| art / 设计资料 | 设计参考 · 服装与时尚 · 西方古代（1/1）；设计参考 · 服装与时尚 · 设计相关文章（10/10） | 全部仍有兼容用途 |
| art / 品牌与官方 | 设计参考 · 武器 · 官方网站（9/9） | 全部仍有兼容用途 |
| art / 结构与术语 | 设计参考 · 武器 · 组件与术语（5/5）；设计参考 · 武器 · 论坛与数据库（1/1） | 全部仍有兼容用途 |
| art / 弹药 | 设计参考 · 武器 · 弹药相关（2/2） | 全部仍有兼容用途 |
| art / 社区与资料库 | 设计参考 · 武器 · 维基百科列表（5/5）；设计参考 · 武器 · 资料网站（8/8）；设计参考 · 武器 · 论坛与数据库（3/3） | 全部仍有兼容用途 |
| art / 商城与拍卖参考 | 设计参考 · 武器 · 商城（7/7） | 全部仍有兼容用途 |
| 3d / 软件与工具 | 软件、插件与手册（4/4）；素材（1/1） | 全部仍有兼容用途 |
| 3d / 手册与插件 | 软件、插件与手册（8/8） | 全部仍有兼容用途 |
| 3d / 模型与素材 | 素材（19/19） | 全部仍有兼容用途 |
| 3d / 材质与环境 | 素材（7/7）；素材与参考（1/1） | 全部仍有兼容用途 |
| 3d / 教程与社区 | 教程与社区（7/7）；素材（1/1） | 同名 alias 可能冗余；其余仍有兼容用途 |
| game-production / 引擎与文档 | 引擎与开发（4/4） | 全部仍有兼容用途 |
| game-production / 制作工具 | 其他制作资源（2/2）；UI（1/1）；音频与音效（2/2） | 全部仍有兼容用途 |
| game-production / 美术、动画与素材 | 游戏美术 · Live2D（2/2）；游戏美术（5/5）；UI（1/1） | 全部仍有兼容用途 |
| game-production / 设计参考 | UI（1/1）；其他制作资源（1/1） | 全部仍有兼容用途 |
| game-production / 音频资源 | 音频与音效（4/4） | 全部仍有兼容用途 |
| ai / 助手与问答 | 对话（6/6）；综合工具（1/1） | 全部仍有兼容用途 |
| ai / 视觉创作 | 图像（2/2） | 全部仍有兼容用途 |
| ai / 综合创作工具 | 图像（2/2） | 全部仍有兼容用途 |
| ai / 图像资料与模型 | 图像（6/6） | 全部仍有兼容用途 |
| ai / 音频、视频与3D生成 | 音频（1/1）；视频（1/1）；3D（3/3） | 全部仍有兼容用途 |
| ai / AI 导航 | 综合工具（1/1） | 全部仍有兼容用途 |
| development / 开发工具与环境 | 开发工具（3/3）；项目构建（1/1） | 全部仍有兼容用途 |
| development / 代码与协作 | 文档与平台（4/4）；开发工具（1/1） | 全部仍有兼容用途 |
| development / 云服务与部署 | 文档与平台（5/5）；项目构建（3/3） | 全部仍有兼容用途 |
| development / 文档与参考 | 文档与平台（3/3）；开发工具（1/1）；项目构建（1/1） | 全部仍有兼容用途 |
| av / 音频素材 | 音效（6/5） | 全部仍有兼容用途 |
| av / 音频制作工具 | 音乐制作（9/3） | 全部仍有兼容用途 |
| av / 音频社区 | 音乐制作（3/0） | 全部仍有兼容用途 |
| av / 视频工具 | 视频制作（2/2） | 全部仍有兼容用途 |
| work / 文档与笔记 | 文档（7/7） | 全部仍有兼容用途 |
| work / 图表与白板 | 其他工作工具（6/6） | 全部仍有兼容用途 |
| work / 文件处理 | 其他工作工具（6/6） | 全部仍有兼容用途 |
| work / 沟通与会议 | 其他工作工具（6/6） | 全部仍有兼容用途 |
| work / 项目管理 | 项目管理（6/6） | 同名 alias 可能冗余；其余仍有兼容用途 |
| history / 地图与历史可视化 | 历史地图（7/7） | 全部仍有兼容用途 |
| history / 历史主题与百科 | 维基百科类别（5/5）；欧洲历史（9/9）；其他地区历史（5/5） | 全部仍有兼容用途 |
| history / 学习与内容 | 历史学习网站（5/5） | 全部仍有兼容用途 |
| history / 资料与馆藏 | 历史地图（1/1） | 全部仍有兼容用途 |
| games / 资讯与攻略 | 游戏社区/攻略（3/3） | 全部仍有兼容用途 |
| games / 玩家社区 | 游戏社区/攻略（2/2） | 全部仍有兼容用途 |
| games / 游戏下载 | 游戏社区/攻略（1/1） | 全部仍有兼容用途 |
| games / MOD 与补丁 | MOD下载（5/5） | 全部仍有兼容用途 |
| games / 游戏平台与商店 | 官方网站（8/8） | 全部仍有兼容用途 |
| games / 购买与优惠 | 游戏购买（5/5） | 全部仍有兼容用途 |
| games / 资料与查询 | 其他资源（5/5） | 全部仍有兼容用途 |
| daily / 资源导航 | 互联网资源索引（8/8） | 全部仍有兼容用途 |
| daily / 网盘搜索 | 网盘资源（5/5） | 全部仍有兼容用途 |
| daily / 云存储 | 网盘资源（4/4） | 全部仍有兼容用途 |
| daily / 地图 | 其他工具（3/3） | 全部仍有兼容用途 |
| software / 浏览与沟通 | 基础软件（3/3） | 全部仍有兼容用途 |
| software / 办公与效率 | 基础软件（0/0）；办公与开发（2/2）；其他软件记录（2/2） | 基础软件：可能可以清理；其余仍有兼容用途 |
| software / 阅读与学习 | 办公与开发（1/1）；阅读工具（2/2）；音频与音乐（1/0） | 全部仍有兼容用途 |
| software / 系统与软件管理 | 基础软件（1/1）；办公与开发（1/1）；软件资源网站（1/1）；Mac专用软件（2/2） | 全部仍有兼容用途 |
| software / 图像与设计 | 其他软件记录（1/1）；2D美术软件（5/5）；Mac专用软件（1/1） | 全部仍有兼容用途 |
| software / 3D创作 | 3D美术软件（4/4） | 全部仍有兼容用途 |
| software / 音频与视频 | 基础软件（1/1）；多媒体工具（3/2）；Mac专用软件（1/1）；音频与音乐（3/0） | 全部仍有兼容用途 |
| software / 游戏与运行环境 | 游戏平台（4/4） | 全部仍有兼容用途 |
| extensions / 3D扩展与资源 | 3D插件与手册（5/5） | 全部仍有兼容用途 |
| extensions / 音频插件与音源 | 音频插件与音色（2/0） | 全部仍有兼容用途 |
| system / 运行与故障排查 | 游戏运行与优化（1/1） | 全部仍有兼容用途 |
| system / 系统维护与网络 | 系统维护与工具（4/4） | 全部仍有兼容用途 |


P2-16 共 3 条可清理候选：software / 办公与效率 的“基础软件”没有该 section 实体对应的 migration/legacy 来源；3d / 教程与社区 的同名“教程与社区”、work / 项目管理 的同名“项目管理”有历史引用，但 current title 本身已足够解析。其余 134 条仍有改名兼容作用。未删除任何 alias；对于报告范围外的外部消费者是否依赖这 3 条，无法确定。

## 15. 旧审计遗留问题复核

| 旧问题 | 当前状态 | 本轮结论 |
| --- | --- | --- |
| Quixel Bridge / Audacity type | 仍存在 | P1-01 / P1-02 |
| 字由 HTTP 次入口 | 仍存在 | P2-03 |
| 11 个空 URL | 仍存在 | 历史依据完整，P2-02 / P3 合理为空 |
| 旧 unconfirmed / uncovered | 仍存在静态证据缺口 | 176 active URL 对应 unconfirmed；3 个当前 URL 未覆盖；P2-06 |
| Gamer520 / 1LOU 空描述 | 仍存在 | P2-11 |
| Origin/EA App 新旧身份 / URL | 仍存在 | P2-04 |
| Gearspace 旧 gearslutz 域名 | 仍存在 | P2-04 |
| 万兴优转 media.io / 腾祥字库归属 | 仍需核对 | P2-13 |
| Library of Congress / Britannica 根入口 | 仍存在 | P2-17：是否需更具体入口由使用者决定 |
| 旧手册版本（Blender 3.1、UE5 5.1、Cubism v5.0） | 仍存在 | P2-14：明确版本资源不等于过时错误 |
| Steam 最大 / 主观或授权表述 | 仍存在 | P2-18：不可离线判为错误 |
| Google Maps 双实体 | 已经解决 | 仅保留 res-f1f736c6c199，旧固定坐标 URL 不活跃 |
| Bandizip software/system 冗余共享 | 已经解决 | 当前只有 software |
| 其他软件记录兜底 / software 11 旧组 / system 混杂 | 已经解决或不再适用 | 当前 8 组 software、2 组 system；不沿用旧架构诊断 |
| 即梦缺少描述 reviewNotes / Suno Runway Toolify 旧 label | 已经解决 | 当前描述非空，无旧提示；三者 label=name |
| Blender 的三个待确认关联 | 已经解决 | 人工确认记录与当前 10 项关系一致 |
| 旧 489 数量、旧 UI/browser 验证结果 | 不再适用当前计数/当前浏览器结论 | 仅作历史，不冒充本轮 UI 验证 |
| 授权页 favicon 404 | 本轮无法确认当前运行时状态 | UI 不在本轮范围，不沿用为当前数据问题 |
| Category: Regions / 英文 Wikipedia 名称 / Outlook 入口 | 仍存在，但不是明确错误 | 用途/命名可合理保留，不重新调整分类 |


旧 link-check 原始摘要：305 responded、5 not-found、176 unconfirmed，共 486 URL。与当前 481 activeURLs 按精确字符串重算：{"responded":302,"unconfirmed":176,"uncovered":3}。8 个旧 URL 已退出活跃集合，3 个当前 URL 未覆盖；486 − 8 + 3 = 481。旧 not-found 5 项当前全部不活跃。

完整未覆盖名单：Clash Verge Rev（`res-d7b68315ffd9`） → `https://github.com/clash-verge-rev/clash-verge-rev/releases`；Blender（`res-b60e9fdc1539`） → `https://www.blender.org/`；雷神加速器（`res-b62262cabd66`） → `https://www.leigod.com/`。均为已有 correction 更新的入口，没有证据因未覆盖而判错。

旧 DNS 失败且当前仍活跃：Moritz Jendrl、reference angle、Artchips艺术碎片、低端影视、1LOU（仅供学习）、高校AC、Vertugadins，共 7 项；这是旧 curlExit=6 线索，非本轮 DNS 检查。403、超时、连接错误和非标准状态也不能直接视为资源失效。

176 个当前仍对应旧 unconfirmed 的完整名单（涉及 175 个实体，Steam 的主入口和次入口各占 1 条；按首次出现 view 归组，仅为紧凑列举，不是重新分类）：

| 首次 view | 条数 | 实体完整名单 |
| --- | --- | --- |
| 3d | 13 | KIT OPS 2 Manual；marvelous designer官方手册；Gumroad；BlenderBros的Gumroad；lughertexture；Poliigon；free3d；myminifactory；CG 3DA；CG pepper；画忆妙妙屋；书生CG资源网；physicallybased |
| game-production | 6 | UE5 Document；GAME UI database；Artlist；Sonniss GameAudioGDC；爱给网_音效配乐；itch.io Game Assets |
| ai | 13 | TapNow；Lovart；Midjourney页面端；Toolify；Deepseek；Chat GPT；Google Gemini；Suno；Tripo 3D；Prompt Hero；midjourney 官方画廊；civitai；Chat Doc |
| art | 66 | Unsplash；Pexels；Pixabay；Pinterest；Google images；flickr；花瓣；谷歌地球；film-grab；bodies in motion；reference angle；art grid；ArtStation；DeviantArt；Pixiv；大都会博物馆；Loux The Vintage Guru；Style Korea；Moritz Jendrl；Fantasmagoria；Vertugadins；Recycled Movie Costumes；维基百科-西方服饰史；Colonial Williamsburg；历史时尚；欧洲区域时尚；Stonefinder；汉服荟商城；10分钟带你了解西方服装史；古墓仙女汉服入门穿搭手册汇总大全；知乎问题"汉服种类有哪些"；汉服裁剪图 知乎文章；科普 \| 被遗忘的传统——交窬裁剪的裙子；设计 \| 常见的汉服款式赏析；Sig Sauer；Uberti；Gun 枪列表；List of Battle Rifles；List of Assault Rifles；List of Sniper Rifles；List of Pistols；Table of Handgun and Rifle Cartridges；List of Handgun Cartridges；Category: Firearm Components；List of Telescope Parts and Construction；Category: Firearm Actions；Rail Integration System；Glossary of Firearms Terms；武器列表 - Britannica；Tactical Weapons；AR15主页；US Militaria Forum；Gun Wiki；Academy 枪支分页；Gun Broker；Rock Island Auction；AmCharts像素图生成器；Color Claim；coolors；icolorpalette；colourcode；Artchips艺术碎片；包图网；500px；UI中国；Canva |
| research | 4 | Wikipedia；Fandom；高校AC；民族语言 |
| art-study | 4 | 电影拉片学院；古建枋类种类细分；有关榫卯，这里有最详细的介绍；Art Of Soulburn |
| daily | 11 | 最U导航；书享家；超能搜；大力盘搜索；易搜；谷歌云盘；MEGA；曲奇云盘；Outlook；OpenStreetMap；谷歌地图 |
| code-study | 1 | W3Schools |
| development | 3 | 阿里云；华为云；Stack Overflow |
| game-study | 1 | Game Developer - Design |
| games | 12 | NGA玩家社区；1LOU（仅供学习）；Nexus Mods；Mod DB；Steam创意工坊；Steam（主入口）；Steam（次入口）；Epic Games Store；Steam Database；HowLongToBeat；OpenCritic；PCGamingWiki |
| history | 23 | Old Maps Online；Library of Congress；知乎文章：历史爱好者福利；Category: History；Category: Regions；Category: History by Ethnic Group；Category: History by Location；Human History；History of England；Vikings；History of France；History of Germany；Ancient Greece；Ancient Rome；Byzantine Empire；History of Italy；Crusades；Ancient Egypt；History of the Middle East；History of the United States；History of China；History of Japan；Encyclopedia Britannica |
| software | 1 | MacPedia |
| film | 4 | 网飞猫；低端影视；蓝光电影网；IMDB 电影社区 |
| work | 5 | Google Docs；MindMeister；Online-Convert；CloudConvert；Discord |
| av | 4 | 万兴优转；VI-Control 社区；KVR Audio 论坛；Gearspace |
| music-study | 4 | MuseScore 乐谱社区；Reddit 音乐理论社区；Reddit 作曲社区；Rate Your Music |
| music | 1 | Spotify |


原始旧 not-found 入口为 hdrlabs、世界历史地图、Atomic Jane Clothing 以及已被更正的 Clash/雷神加速器入口，全部未重新活跃；旧 responded 也只证明当时有 HTTP 响应，不保证品牌或页面内容正确。

## 16. P0 问题

**P0 = 0。** 未发现悬空 ID、当前可确认为重复的实体、错误资源引用、不可解析 migration、source/legacy 冲突或 validator 漏检的严重结构问题。Costumers Guide 保持 P2 候选，不为了计数提升为 P0。

## 17. P1 问题

| 编号 | 明确问题 | 建议后续动作 |
| --- | --- | --- |
| P1-01 | Quixel Bridge res-5ee7019b67b3：type=asset 与素材管理工具实体不符 | 确认后按软件实体处理 type |
| P1-02 | Audacity res-d130cc2e9c59：type=website 与音频录制编辑软件不符 | 确认后按软件实体处理 type |
| P1-03 | Midjourney页面端 res-b9db5bd74bbc：description 混入“不是很好用了现在” | 保留功能描述；将历史偏好与实体说明区分 |


本轮不执行以上修复。3 项均建议在数据质量最终验收前解决，或明确记录接受理由。

## 18. P2 问题

| 编号 | 人工决策项 | 涉及范围 |
| --- | --- | --- |
| P2-01 | Costumers Guide 主站/about 记录是否实际重复 | 2 实体，1 候选组 |
| P2-02 | 未来是否补经确认的 URL | 11 个 null 实体 |
| P2-03 | HTTP 是否保留/升级；特别是字由次入口 | 40 条 HTTP，非自动错误 |
| P2-04 | 已有旧域/路径及新旧品牌线索 | 第 7 节列明的 16 组线索；与名称问题合并计 |
| P2-05 | 与实体说明不明显相符的历史异域跳转 | JAY仓库、我的书签、555电影、lughertexture |
| P2-06 | 旧 unconfirmed / 当前未覆盖入口需要未来核验 | 176 + 3 URL；本轮没有联网 |
| P2-07 | 系列大小写及品牌空格规范 | 第 4 节列明，不要求全站统一中文/英文 |
| P2-08 | MFD设计师导航次入口历史 label 是否需更新 | 刺猬星球；有 merge 依据，非悬空/错误 label |
| P2-09 | ninja 名称是否补足辨识词 | res-c816da9bb133 |
| P2-10 | type 的载体/实体/内容口径与其他边界项 | 第 6 节；先定口径再逐项决定 |
| P2-11 | 是否为两项历史空 description 补用途 | Gamer520、1LOU |
| P2-12 | 描述信息量/术语复核 | HDmoli、4K影视、Firearm Actions |
| P2-13 | 名称/品牌归属与入口身份复核 | 万兴优转 media.io；腾祥字库腾讯系说明 |
| P2-14 | 版本明确的手册是否仍合乎使用需求 | Blender 3.1 / UE5 5.1 / Cubism v5.0 |
| P2-15 | Blender 聚合范围是否维持 | 10 条中生态资源较宽；已有确认不推翻 |
| P2-16 | 3 条 previousTitles 冗余候选 | 1 条无落点引用、2 条等于现名 |
| P2-17 | 综合站根/账户入口是否需更精确 | Library of Congress、Britannica；Gumroad 当前 app.gumroad.com/library 是账户库入口，description 为资源销售平台，需确认是否有意 |
| P2-18 | 事实/时效/授权陈述是否更新 | Deepseek 免费、Steam 最大、Sonniss 商用及少量动态评价 |


P2 共 18 个决策组，不阻塞当前结构验收；外链是否可用、官网身份及授权事实并未完成在线验收。没有将这些待确认项当成已证实错误。

## 19. P3 合理保留项

| 编号 | 类别 | 范围 |
| --- | --- | --- |
| P3-01 | 有历史依据的 null URL 与空 links | 11 实体；补入口决策另列 P2，不因此视为结构错误 |
| P3-02 | 改名兼容标题 | 134 条有效 alias；另 3 条为 P2 清理候选 |
| P3-03 | 跨 view 合理共享 | 37 实体，A=37/B=0/C=0 |
| P3-04 | 独立用途 singleton | 10 section |
| P3-05 | 单向 relatedResources 与独立卡片并存 | 11 源 / 22 边；宽度决策见 P2-15 |
| P3-06 | 同品牌不同功能、文章题名及局部重复标题 | 第 4、9、10 节明确列举 |
| P3-07 | 历史 sources / merge / correction / 旧计数与旧 tags | 498 sources、10 merges、9 corrections；不是当前归属指令 |
| P3-08 | 设备 view 中手册/资源平台等特殊 type | manual/community/website/plugin 等有实体依据，不批量改为 software |


## 20. 建议的最终修复顺序与验证

1. 先单独确认并处理 3 项 P1，完成最小数据修正后重跑 validator。
2. 确认 Costumers Guide 是否重复以及品牌/入口身份疑点，再决定是否合并或改名；如果合并，需完整保留 migration/source 追溯。
3. 在另行获准联网的阶段核验异域跳转、旧 DNS、旧 unconfirmed/未覆盖、历史域名与 HTTP；本轮不补链接。
4. 决定是否补 11 个 null 入口、2 个空描述，以及 type 口径/命名/关系宽度。
5. 最后决定是否清理 3 条冗余 alias；保留其余有兼容用途的旧标题。

实际执行 `node scripts/validate.mjs`，退出码 0：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 488,
  "mergedSources": 10,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 481,
  "confirmedCorrections": 9,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

实际执行 `git diff --check`，退出码 0，无输出。报告新增后再次执行两项检查，结果相同；由于新报告未跟踪，另对报告内容检查行尾空白，未发现异常。

文件不变性：开始时对项目现有文件（排除 .git 管理目录）记录 SHA-256，报告生成后逐文件比对；现有文件内容、路径集合没有修改或删除，唯一新增文件是本报告。重点确认 data/catalog.js、data/navigation.js、data/legacy.js、docs/migration-map.json、scripts/validate.mjs 原字节保持不变。工作区原有未提交改动均保留，因此 git status 的既有 M/?? 不能算作本轮改动。未 commit，未 push。

本轮新增文件：`docs/final-data-quality-audit.md`。

本轮修改文件：无。

本轮删除文件：无。

| 等级 | 数量 | 是否阻塞最终验收 |
| --- | --- | --- |
| P0 | 0 | 否 |
| P1 | 3 项 | 是（数据质量验收；建议先修复） |
| P2 | 18 个决策组 | 否（需保留待确认记录） |
| P3 | 8 类合理保留项 | 否 |


