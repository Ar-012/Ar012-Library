# 日常与生活 → 日常工具资源专项审计

审计日期：2026-10-04  
审计对象：`data/navigation.js` 中 view key 为 `daily` 的全部资源引用  
审计依据：`docs/daily-life-overview-audit.md`、当前 `data/catalog.js` / `data/navigation.js` / `data/legacy.js`、旧资源快照、`docs/migration-map.json`、旧 HTML、阶段报告、corrections 和既有 `docs/link-check.json`  
限制：本轮未联网；未修改 catalog、navigation、legacy、资源字段或现有报告；未重新分类；未 commit；未 push。

## 1. 完整性结论

`daily` 当前结构为 6 个 section、30 个资源引用、30 个唯一 catalog ID：

| section | 引用数 | 唯一 ID 数 |
|---|---:|---:|
| 互联网资源索引 | 8 | 8 |
| 阅读与电子书 | 6 | 6 |
| 网盘资源 | 9 | 9 |
| 邮箱服务 | 3 | 3 |
| 其他工具 | 3 | 3 |
| 地图 | 1 | 1 |
| **合计** | **30** | **30** |

检查结果：30 项全部能在 catalog 中解析；无遗漏引用、无重复 ID、无不存在的 ID。当前两个“谷歌地图”是两个不同 ID，因此不是“重复引用”，但是否为重复实体需在地图专项中另行判断。

## 2. 30 项完整资源清单

`source` 以下按 catalog 的 `sources` 原样记录；`links` 按当前数组原样压缩展示。

### 2.1 互联网资源索引（8）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| JAY仓库<br>`res-d268ccbc6327` | 综合资源导航网站 | `website` | `https://www.likejay.cn/` | `JAY仓库 → https://www.likejay.cn/` | `daily-essentials:0:0` | 打开综合资源导航，发现其他网站或资源 |
| 阿虚同学的储物间<br>`res-813f7b8a45c2` | 综合资源导航网站 | `website` | `https://axutongxue.com/` | `阿虚同学的储物间 → https://axutongxue.com/` | `daily-essentials:0:1` | 打开综合资源导航，发现其他网站或资源 |
| 下次一定<br>`res-9ae7811f88bd` | 综合资源导航网站 | `website` | `https://www.iiice.cn/#/` | `下次一定 → https://www.iiice.cn/#/` | `daily-essentials:0:2` | 打开综合资源导航，发现其他网站或资源 |
| 壳壳博客<br>`res-8cb46b50beea` | 综合资源导航博客 | `website` | `https://kkok.cc/` | `壳壳博客 → https://kkok.cc/` | `daily-essentials:0:5` | 通过博客式综合导航发现资源 |
| 懒人导航网<br>`res-3c8892984c87` | 综合资源导航网站 | `website` | `https://lanrenao.com/` | `懒人导航网 → https://lanrenao.com/` | `daily-essentials:0:6` | 打开综合资源导航，发现其他网站或资源 |
| 我的书签<br>`res-b64bb5b38d5d` | 综合资源导航网站 | `website` | `https://it-cxy.top/` | `我的书签 → https://it-cxy.top/` | `daily-essentials:0:7` | 打开综合资源导航，发现其他网站或资源 |
| 最U导航<br>`res-8824cf5d312a` | 综合资源导航网站 | `website` | `https://www.zuh8.com/` | `最U导航 → https://www.zuh8.com/` | `daily-essentials:0:8` | 打开综合资源导航，发现其他网站或资源 |
| 轻工具<br>`res-ea7afc1c5a05` | 综合工具资源导航 | `website` | `https://qinggongju.com/` | `轻工具 → https://qinggongju.com/` | `daily-essentials:0:9` | 发现在线工具类资源；具体工具范围本地资料不足以判断 |

### 2.2 阅读与电子书（6）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| Sobooks<br>`res-4e4286db6d55` | 电子书下载网站 | `website` | `https://sobooks.cc/` | `Sobooks → https://sobooks.cc/` | `daily-essentials:1:1` | 下载电子书 |
| PDF Drive<br>`res-0402234d84e7` | PDF电子书搜索下载 | `website` | `https://www.pdfdrive.com/` | `PDF Drive → https://www.pdfdrive.com/` | `daily-essentials:1:2` | 搜索并下载 PDF 电子书 |
| 苦瓜书盘<br>`res-3b751e75f487` | 电子书分享平台 | `website` | `https://www.kgbook.com/` | `苦瓜书盘 → https://www.kgbook.com/` | `daily-essentials:1:3` | 获取或分享电子书；现有资料不能继续区分主要动作 |
| 走读派<br>`res-82a3f65e65ad` | 阅读社区和资源 | `community` | `http://www.zoudupai.com/` | `走读派 → http://www.zoudupai.com/` | `daily-essentials:1:4` | 参与阅读社区并发现阅读资源 |
| 鸠摩搜索<br>`res-4478f060c286` | 电子书搜索引擎 | `website` | `https://www.jiumodiary.com/` | `鸠摩搜索 → https://www.jiumodiary.com/` | `daily-essentials:1:5` | 搜索电子书 |
| 书享家<br>`res-6cf1e7e339ad` | 电子书资源导航 | `website` | `http://shuxiangjia.cn/` | `书享家 → http://shuxiangjia.cn/` | `daily-essentials:1:6` | 通过导航发现电子书资源 |

### 2.3 网盘资源（9）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| 超能搜<br>`res-f319d4efdf9b` | 网盘资源搜索引擎 | `website` | `http://chaonengsou.com/` | `超能搜 → http://chaonengsou.com/` | `daily-essentials:3:0` | 搜索网盘中的资源 |
| 大力盘搜索<br>`res-bdeb3a9a419e` | 网盘资源搜索引擎 | `website` | `https://www.dalipan.com/` | `大力盘搜索 → https://www.dalipan.com/` | `daily-essentials:3:1` | 搜索网盘中的资源 |
| 懒盘搜索<br>`res-ef5fe97e75de` | 网盘资源搜索引擎 | `website` | `https://www.lzpanx.com/` | `懒盘搜索 → https://www.lzpanx.com/` | `daily-essentials:3:2` | 搜索网盘中的资源 |
| 易搜<br>`res-36805b0d46a7` | 阿里、夸克网盘搜索 | `website` | `https://yiso.fun/` | `易搜 → https://yiso.fun/` | `daily-essentials:3:3` | 搜索阿里、夸克网盘资源 |
| 夸克盘搜<br>`res-a4b6505f442c` | 夸克网盘资源搜索 | `website` | `https://qkpanso.com/` | `夸克盘搜 → https://qkpanso.com/` | `daily-essentials:3:4` | 搜索夸克网盘资源 |
| 百度网盘<br>`res-305ce2f2af53` | 百度云存储服务 | `software` | `https://pan.baidu.com/` | `百度网盘 → https://pan.baidu.com/`；`百度网盘 → https://pan.baidu.com/disk/main?from=homeFlow#/index?category=all` | `daily-essentials:3:5`；`installation-software:1:3` | 存储、管理和访问个人云端文件 |
| 谷歌云盘<br>`res-6c78c06d318b` | Google云端存储 | `website` | `https://drive.google.com/drive` | `谷歌云盘 → https://drive.google.com/drive` | `daily-essentials:3:6` | 存储、管理和访问个人云端文件 |
| MEGA<br>`res-71216ea7e989` | 加密云存储服务 | `website` | `https://mega.nz/` | `MEGA → https://mega.nz/` | `daily-essentials:3:7` | 使用加密云存储 |
| 曲奇云盘<br>`res-f2c13ee8730d` | 云存储服务 | `website` | `https://quqi.com/` | `曲奇云盘 → https://quqi.com/` | `daily-essentials:3:8` | 存储、管理和访问云端文件 |

### 2.4 邮箱服务（3）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| Outlook<br>`res-51a9f53ce4dd` | 微软邮箱服务 | `website` | `https://outlook.live.com/` | `Outlook → https://outlook.live.com/` | `daily-essentials:4:0` | 使用微软 Web 邮箱收发邮件 |
| 163邮箱<br>`res-6d2a0c0ae5e7` | 网易邮箱服务 | `website` | `https://mail.163.com/` | `163邮箱 → https://mail.163.com/` | `daily-essentials:4:1` | 使用 163 Web 邮箱收发邮件 |
| 126邮箱<br>`res-3d3efba8821a` | 网易邮箱服务 | `website` | `https://www.126.com/` | `126邮箱 → https://www.126.com/` | `daily-essentials:4:2` | 使用 126 Web 邮箱收发邮件 |

### 2.5 其他工具（3）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| 相约久久地图<br>`res-542f49f089be` | 在线地图服务 | `website` | `https://www.meet99.com/map/` | `相约久久地图 → https://www.meet99.com/map/` | `daily-essentials:5:1` | 查看在线地图；具体地图侧重在本地资料中不确定 |
| OpenStreetMap<br>`res-5c09ca7fe676` | 开源地图服务 | `website` | `https://www.openstreetmap.org/#map=7/40.053/118.169/` | `OpenStreetMap → https://www.openstreetmap.org/#map=7/40.053/118.169/` | `daily-essentials:5:2` | 浏览开源地图 |
| 谷歌地图<br>`res-d8773ad6b7a9` | Google地图服务 | `website` | `http://www.google.cn/maps/@40.0026477,116.3455469,15.85z/` | `谷歌地图 → http://www.google.cn/maps/@40.0026477,116.3455469,15.85z/` | `daily-essentials:5:3` | 浏览 Google Maps；入口预设了具体坐标和缩放级别 |

### 2.6 地图（1）

| name / ID | description | type | url | links | source | 当前主要用途 |
|---|---|---|---|---|---|---|
| 谷歌地图<br>`res-f1f736c6c199` | 现代地图参考 | `website` | `https://www.google.com/maps/` | `谷歌地图 → https://www.google.com/maps/` | `history:0:0` | 打开通用 Google Maps 入口浏览现代地图 |

## 3. 按实际使用动作分析

本表只根据名称、description、URL、旧分组与迁移记录判断；无法由本地资料继续细分的项目标为“不确定”。

| 实际使用动作 | 资源 | 数量 | 判断边界 |
|---|---|---:|---|
| 综合资源发现 / 导航 | JAY仓库、阿虚同学的储物间、下次一定、壳壳博客、懒人导航网、我的书签、最U导航 | 7 | descriptions 都明确为综合导航或导航博客 |
| 工具资源发现 / 导航 | 轻工具 | 1 | 明确是“综合工具资源导航”；具体工具覆盖不确定 |
| 电子书下载 | Sobooks | 1 | description 明确为下载网站 |
| 电子书搜索并下载 | PDF Drive | 1 | 两个动作都由 description 明确表达，无法确认哪一个占主导 |
| 电子书分享 / 获取 | 苦瓜书盘 | 1 | “分享平台”；主要是上传分享还是下载获取不确定 |
| 阅读社区 / 资源发现 | 走读派 | 1 | 社区与资源两个用途并存 |
| 电子书搜索 | 鸠摩搜索 | 1 | description 明确为搜索引擎 |
| 电子书资源导航 | 书享家 | 1 | description 明确为导航 |
| 网盘资源搜索 | 超能搜、大力盘搜索、懒盘搜索、易搜、夸克盘搜 | 5 | 用户目标是找到别人已分享的资源 |
| 云存储 | 百度网盘、谷歌云盘、MEGA、曲奇云盘 | 4 | 用户目标是存储、管理或访问自己的云端文件 |
| 邮箱 | Outlook、163邮箱、126邮箱 | 3 | 用户目标是收发与管理邮件 |
| 地图 | 相约久久地图、OpenStreetMap、两个谷歌地图实体 | 4 | 用户目标都是查看地图；相约久久的具体侧重不确定 |

结论：当前 30 项可由本地资料明确识别出八类实际动作。最明显的结构错位不是“资源难以判断”，而是“网盘资源”合并了搜索与存储，以及地图被拆在两个 section。

## 4. 互联网资源索引专项

逐项性质：

| 资源 | 本地可确认性质 | 明显差异 |
|---|---|---|
| JAY仓库 | 综合资源导航网站 | 无进一步资料 |
| 阿虚同学的储物间 | 综合资源导航网站 | 无进一步资料 |
| 下次一定 | 综合资源导航网站 | 无进一步资料 |
| 壳壳博客 | 综合资源导航博客 | 载体偏博客，但动作仍是综合资源发现 |
| 懒人导航网 | 综合资源导航网站 | 无进一步资料 |
| 我的书签 | 综合资源导航网站 | 无进一步资料 |
| 最U导航 | 综合资源导航网站 | 无进一步资料 |
| 轻工具 | 综合工具资源导航 | 主题比其他七项更偏在线工具，但仍是导航而非单个工具 |

判断：

1. 八项都属于导航/资源发现；七项明确是综合资源导航，轻工具是范围略窄的工具导航。
2. 壳壳博客的载体和轻工具的主题范围不同，但没有改变主要使用动作。
3. “互联网资源索引”能准确概括八项；“索引”比“其他工具”更能表达打开这些站点的目的。
4. 仅依据现有本地资料，没有必要继续细分。拆出一个只有轻工具的 singleton 不会增加多少信息。
5. 八项名称、URL、source 均不同，没有同名或相同 URL；description 高度同质只能证明用途重叠，不能证明实体重复。未联网查看站内目录，无法判断内容重合程度。

结论：当前 section 建议保留；暂不因高相似用途拆分或合并。

## 5. 阅读与电子书专项

六项形成同一“找书、获取书、参与阅读”的完整场景，但各自主要动作不同：

- 搜索：鸠摩搜索；PDF Drive 同时包含搜索和下载。
- 下载：Sobooks；PDF Drive 同时包含搜索和下载。
- 分享：苦瓜书盘。
- 阅读社区：走读派。
- 导航：书享家。

完整性与重复检查：六项 ID、名称和 URL 均不同，没有精确重复实体证据。

是否值得拆 section：目前不值得。理由是六项总量较小，差异属于同一用户流程中的不同入口，而不是完全不同的大类；拆成搜索、下载、社区、导航会产生多个 1 项或 2 项的小组。统一放在“阅读与电子书”更符合当前使用场景，也比追求载体一致更稳定。可在未来通过 description 或标签表达动作差异，本轮不实施任何改动。

## 6. 网盘搜索 / 云存储专项

### 6.1 两类动作是否不同

区别明确：

- 五个网盘搜索入口的目标是检索第三方或公开分享的网盘资源；它们扮演搜索引擎。
- 四个云存储入口的目标是存储、管理、同步或访问用户自己的文件；它们扮演存储服务。

两者虽然都围绕“网盘”，但用户打开页面时的任务不同。未来结构中有充分理由分开表达；这是结构审计判断，不是本轮重新分类。

### 6.2 五个搜索入口

| 资源 | 搜索范围（仅据 description） | 重复判断 |
|---|---|---|
| 超能搜 | 泛网盘资源 | 独立名称、URL 和 source |
| 大力盘搜索 | 泛网盘资源 | 独立名称、URL 和 source |
| 懒盘搜索 | 泛网盘资源 | 独立名称、URL 和 source |
| 易搜 | 阿里、夸克网盘 | 搜索范围较明确，独立 URL |
| 夸克盘搜 | 夸克网盘 | 搜索范围最窄，独立 URL |

五项功能高度重叠，但没有同名、同 URL 或本地迁移合并记录，不能判为重复实体。易搜与夸克盘搜的搜索范围部分重叠，也只是服务覆盖重叠，不是同一网站。

### 6.3 四个云存储入口

百度网盘、谷歌云盘、MEGA、曲奇云盘是四个不同服务商的存储产品，名称与 URL 均不同；没有重复实体证据。

- 百度网盘当前与「设备与环境 → 软件 → 办公与开发」共享同一 ID。其 catalog 同时保存 `daily-essentials:3:5` 与 `installation-software:1:3` 两个来源，type 为 `software`，contexts 为 `life` 与 `setup`，因此该共享有直接本地证据且用途合理：daily 是日常云盘入口，software 是安装/软件环境入口。
- 谷歌云盘、MEGA、曲奇云盘只有 `daily-essentials` 来源，type 均为 `website`，主 URL 都是 Web 服务入口。仅凭这些服务可能拥有客户端，不足以新增设备环境共享。
- 若以后出现明确的客户端下载安装入口或个人安装配置，再评估后三项共享才有证据基础；当前没有必要新增。

## 7. 邮箱服务专项

- Outlook、163邮箱、126邮箱的 descriptions 和 URL 都清楚指向 Web 邮箱，当前分类清楚。
- 三项形成稳定的日常通信使用场景，保留独立“邮箱服务”section 比并入宽泛工具更准确。
- 163邮箱和126邮箱同属网易，但域名、产品名和邮箱服务入口不同，属于同平台/同公司下的不同服务，不是重复实体。
- 当前没有主入口与子功能关系：163 不是 126 的主站，126 也不是 163 的子功能。
- 没有证据支持在三项之间建立 `relatedResources`；同属网易不足以自动关联。

## 8. 地图专项

### 8.1 四个地图实体的本地来源

| 实体 | 原始资源文件 | 原始 section | legacy | migration 目的地 | 本地链接检查 |
|---|---|---|---|---|---|
| 相约久久地图 `res-542f49f089be` | `data/resources/daily-essentials.js` | 其他工具 | `daily-essentials` | `daily → 其他工具` | 2026-09-26 responded |
| OpenStreetMap `res-5c09ca7fe676` | `data/resources/daily-essentials.js` | 其他工具 | `daily-essentials` | `daily → 其他工具` | unconfirmed：连接超时 |
| 谷歌地图 `res-d8773ad6b7a9` | `data/resources/daily-essentials.js` | 其他工具 | `daily-essentials` | `daily → 其他工具` | responded，HTTP 200 |
| 谷歌地图 `res-f1f736c6c199` | `data/resources/history.js` | 历史地图 | `history` | `daily → 地图` | unconfirmed：连接超时 |

旧 `daily-essentials.html` 和 `history.html` 本身只加载相应的 `data/resources/*.js`；资源字段并不内嵌在 HTML。两个 HTML 因而分别证明了旧页面入口，而原始内容证据来自对应资源文件。

阶段记录观察：现有 phase 报告没有对这两个谷歌地图做人工合并或字段修正；`docs/phase-3-corrections.json` 的九项修正也不包含它们。历史专项报告只记录 `res-f1f736c6c199` 已从历史 view 移到日常工具，没有提供它与另一个谷歌地图功能不同的证据。

### 8.2 两个谷歌地图完整字段对照

| 字段 | `res-d8773ad6b7a9` | `res-f1f736c6c199` |
|---|---|---|
| name | 谷歌地图 | 谷歌地图 |
| description | Google地图服务 | 现代地图参考 |
| url | `http://www.google.cn/maps/@40.0026477,116.3455469,15.85z/` | `https://www.google.com/maps/` |
| links | `[{label: 谷歌地图, url: http://www.google.cn/maps/@40.0026477,116.3455469,15.85z/}]` | `[{label: 谷歌地图, url: https://www.google.com/maps/}]` |
| type | `website` | `website` |
| tags | `其他工具` | `地图` |
| topics | `日常工具` | `日常工具` |
| contexts | `life` | `life` |
| sources | `daily-essentials:5:3` | `history:0:0` |
| legacy 来源 | `daily-essentials` | `history` |
| 原始 section | 其他工具 | 历史地图 |
| 原始 description | Google地图服务 | 现代地图参考 |
| migration 记录 | 目标 `daily / 其他工具`；理由为按实际用途迁入日常工具 | 目标 `daily / 地图`；理由为按实际用途迁入日常工具 |
| 当前 section | 其他工具 | 地图 |
| link-check | HTTP 200，effective URL 保持 `google.cn` 地址 | 超时，未确认；不能据此判定失效 |

### 8.3 重复实体判断

判断：**A. 同一资源的重复实体**，证据充分。

证据：

1. 两者名称完全相同，均为“谷歌地图”。
2. 两个 URL 都是 Google Maps：一个是中国域名下带固定中心坐标的地图状态 URL，一个是全球域名下的通用入口。URL 差异表达入口状态和域名差异，没有表达卫星图、街景、路线规划等独立功能。
3. descriptions 分别是“Google地图服务”和“现代地图参考”，都是泛化的地图服务描述，没有区分功能。
4. catalog 中 type、topics、contexts 相同；没有任何功能字段、标签或迁移理由把它们定义为不同产品。
5. 两个实体之所以分开，可以由来源页面不同解释：一个原在日常工具，一个原在历史地图。迁移时二者都进入 daily，但仍沿用两个来源生成的独立 ID，并分别保留原 section 标题。
6. migration map 没有将其中一个标记为另一项的子功能，也没有 relatedResources 或 corrections 证明其独立性。

因此它们不是“同平台但不同功能入口”；现有证据也不属于“证据不足”。

若未来实施合并，更适合保留 `res-f1f736c6c199` 作为主实体，理由是其主 URL 是不带固定坐标的通用 HTTPS Google Maps 入口，description 和当前“地图”section 也更接近通用资源卡片。届时应保留两个 source/legacy 追踪信息，并单独判断是否仍需保存 `google.cn` 的旧入口。此处只给出候选判断，本轮没有删除、合并或改写任何字段。

### 8.4 四项是否应统一到地图 section

相约久久地图、OpenStreetMap 和两个谷歌地图实体的 descriptions 都明确指向地图服务；“其他工具”现有三项也全部是地图。没有本地证据显示前三项需要因不同使用场景留在“其他工具”。

因此，从结构问题角度，地图资源应由同一个地图 section 表达；在两个谷歌地图未来若合并的前提下，该场景实际对应三个不同地图服务。该结论不等于本轮执行移动。

## 9. 与其他大区的边界

| 资源类型/实体 | 边界判断 |
|---|---|
| 百度网盘 | 同时是日常云存储和已安装软件；当前与设备环境共享合理 |
| 谷歌云盘、MEGA、曲奇云盘 | 当前记录是 Web 云存储入口，没有安装/软件管理证据；留在 daily 合理，不需仅因存在客户端而共享 |
| Outlook、163邮箱、126邮箱 | 当前都是 Web 邮箱使用入口，属于日常通信；没有设备配置或客户端管理记录 |
| 四个地图实体 | 当前都是一般地图浏览/参考入口，属于日常实用；没有足够证据表明其主要用于创作参考或学习研究 |
| 八个综合导航 | 虽可能链接工作或学习内容，但实体本身的使用动作是日常资源发现；本地资料不足以把具体导航移入其他大区 |
| 六个电子书资源 | 具有潜在学习价值，但当前用途是搜索、下载、分享、社区和导航，不是明确课程或学科资料 |
| 五个网盘搜索入口 | 日常资源查找工具；没有安装环境、创作生产或学科研究的明确字段证据 |

结论：30 项中没有明确应该移出 daily 的实体。唯一实际跨区共享的百度网盘已有充分来源证据；其余服务不应因为“可能存在桌面客户端”或“可能用于学习/工作”而自动共享。

## 10. 与其他 view 的同 ID 共享

只按当前 navigation 的 catalog ID 统计，legacy 来源不算共享。

| ID | 名称 | daily 位置 | 共享位置 |
|---|---|---|---|
| `res-305ce2f2af53` | 百度网盘 | 日常与生活 → 日常工具 → 网盘资源 | 设备与环境 → 软件 → 办公与开发 |

除百度网盘外，其余 29 项没有出现在任何其他 view。daily 内也没有同 ID 重复引用。

## 11. relatedResources

- 当前 30 项中已有 `relatedResources`：0。
- 被 catalog 中其他实体通过 `relatedResources` 引用：0。
- 明确候选：0。

判断依据：

- 两个谷歌地图更符合重复实体，而不是“主入口 → 子功能”，不应通过 relatedResources 掩盖重复。
- 163邮箱与126邮箱只是同公司下的不同服务，不构成主从关系。
- 五个网盘搜索引擎之间、四个云存储服务之间是同类竞品关系，不构成主从关系。
- 易搜或夸克盘搜描述中提到某些网盘，只说明搜索覆盖范围，不证明它们是对应云存储服务的官方子功能。
- 当前没有同一服务的主站与专门功能入口成对存在。

因此没有必要新增 relatedResources。

## 12. 数据质量

统计范围为 daily 的 30 个唯一实体。

| 检查项 | 数量 | 结果 |
|---|---:|---|
| URL 为空 | 0 | 未发现 |
| description 为空 | 0 | 未发现 |
| HTTP 主 URL | 4 | 走读派、书享家、超能搜、`res-d8773ad6b7a9` 谷歌地图 |
| 明显旧品牌 | 0 | 未发现明确旧品牌名 |
| name / description 明显不一致 | 0 | 未发现 |
| `links.label` 与 name 不一致 | 0 | 未发现 |
| 明显 type 异常 | 0 | 百度网盘为 `software` 且有安装来源；其余类型与当前字段一致 |
| 同名不同 ID | 2 个实体 / 1 组 | 两个“谷歌地图” |
| 相同 URL 不同 ID | 0 | 未发现精确相同 URL |

旧入口观察：`res-d8773ad6b7a9` 使用 HTTP、`google.cn` 和固定坐标 URL，入口形式明显比通用 HTTPS Google Maps URL 更具体、更旧式；既有检查记录当时返回 200，但这不消除其与另一实体重复的问题。

既有 `docs/link-check.json`（检查时间 2026-09-26）结果：

- 19 项 `responded`。
- 11 项 `unconfirmed`。
- 最U导航：HTTP/2 internal error。
- 书享家、大力盘搜索、易搜：HTTP 403。
- 超能搜：连接被重置。
- 谷歌云盘、MEGA、曲奇云盘、OpenStreetMap、通用 Google Maps：超时。
- Outlook：返回非标准检查状态 417，并记录 effective URL 为 `https://outlook.live.com/mail/`。

这些是旧的本地检查结果，本轮没有联网复核。403、超时或协议错误都不能直接证明入口失效；因此只记录，不修改 URL。

## 13. 当前结构问题总结

1. **“互联网资源索引”是否应保留：应保留。** 八项实际动作一致，标题准确；轻工具略偏工具导航，但不足以单独拆组。
2. **“阅读与电子书”是否应保留：应保留。** 搜索、下载、分享、社区、导航是同一阅读资源流程中的差异；六项规模不足以支持多个小 section。
3. **“网盘资源”是否应该拆成搜索和存储：未来值得拆开。** 五项用于找资源，四项用于存储和管理文件，使用动作明确不同。
4. **“邮箱服务”是否应保留：应保留。** 三项边界清楚、使用动作一致，是稳定的日常服务组。
5. **“其他工具”是否应该取消：从当前内容看应取消。** 现有三项全部是地图，“其他工具”没有剩余的其他用途，标题已失真。
6. **两个地图 section 是否应该统一：应统一。** 当前四个引用都是地图服务，拆分只反映旧来源而非当前使用动作。
7. **两个谷歌地图实体是否疑似应该合并：是，而且证据支持判为同一资源的重复实体。** 若未来实施，较适合保留 `res-f1f736c6c199`，但本轮未合并。
8. **是否存在明显应该移出 daily 的资源：没有。** 百度网盘的设备属性已通过共享表达，不要求移出；其余边界问题都没有足够证据。
9. **是否有必要新增跨 view 共享：当前没有。** 谷歌云盘、MEGA、曲奇云盘等只有 Web 日常入口证据；不因可能存在客户端而新增设备共享。
10. **是否存在明确 relatedResources 候选：没有。** 当前最接近关系的两个谷歌地图应处理为重复实体判断；邮箱、搜索和存储服务之间都不是主从关系。

真正的结构问题集中在两处：网盘搜索与云存储混放；地图因历史来源形成两个 section 和两个 Google Maps 实体。综合导航、阅读电子书、邮箱三个 section 本身没有必须重构的证据。

以上结论只用于指导未来方案，本报告不构成最终重新分类结果，也未实施任何调整。

## 14. 本轮文件变更

本轮只新增：

- `docs/daily-tools-resource-audit.md`：本专项审计报告。

未修改 `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`data/resources/*`、旧 HTML、阶段报告、corrections、链接检查记录、UI、样式、脚本或校验逻辑；未联网；未 commit；未 push。
