# 日常与生活 → 游戏资源专项审计

审计日期：2026-10-05

审计对象：`data/navigation.js` 中 view key 为 `games` 的全部资源引用

审计依据：`docs/daily-life-overview-audit.md`、当前 `data/catalog.js` / `data/navigation.js` / `data/legacy.js`、旧资源快照、`docs/migration-map.json`、旧 HTML 与既有 `docs/link-check.json`

限制：本轮未联网；未修改 catalog、navigation、legacy、migration、validator 或任何资源；未重新分类；未 commit；未 push。

## 1. 完整性结论

`games` 当前有 7 个 section、30 个资源引用、30 个唯一 catalog ID：

| section | 引用数 | 唯一 ID 数 |
|---|---:|---:|
| 互动小游戏 | 1 | 1 |
| 游戏社区/攻略 | 6 | 6 |
| 游戏下载 | 2 | 2 |
| MOD下载 | 5 | 5 |
| 官方网站 | 6 | 6 |
| 游戏购买 | 5 | 5 |
| 其他资源 | 5 | 5 |
| **合计** | **30** | **30** |

检查结果：30 项均能在当前 catalog 中解析；无遗漏、无重复引用、无悬空 ID。

## 2. 30 项完整资源清单

`sources` 按 catalog 原样记录；`links` 按当前数组压缩展示。“当前主要用途”只依据现有名称、description、URL、source 与 section 判断。

### 2.1 互动小游戏（1）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| It's Adoorable<br>`res-baf622d2b50c` | 互动小游戏 | `website` | `https://ncase.me/door/` | `It's Adoorable → https://ncase.me/door/` | `daily-essentials:5:5` | 直接打开并游玩互动小游戏 |

### 2.2 游戏社区/攻略（6）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| 游民星空<br>`res-597e0d6992d2` | 游戏攻略、新闻、评测网站 | `website` | `https://www.gamersky.com/` | `游民星空 → https://www.gamersky.com/` | `games:0:0` | 获取游戏新闻、评测和攻略；多用途媒体入口 |
| 游侠攻略<br>`res-a279f861f6aa` | 游戏攻略、修改器、补丁 | `website` | `https://gl.ali213.net/` | `游侠攻略 → https://gl.ali213.net/` | `games:0:1` | 主要查攻略，同时获取修改器和补丁信息 |
| 3DM<br>`res-0c78ece82080` | 游戏下载、攻略、汉化补丁 | `website` | `https://www.3dmgame.com/` | `3DM → https://www.3dmgame.com/` | `games:0:2` | 获取游戏下载、攻略与汉化补丁；综合入口 |
| IGN中国<br>`res-07c130430e1c` | 国际游戏媒体中文版 | `website` | `https://www.ign.com.cn/` | `IGN中国 → https://www.ign.com.cn/` | `games:0:3` | 阅读游戏媒体内容；现有 description 未细分新闻与评测占比 |
| 其乐Keylol<br>`res-0b2c7e6d8348` | Steam游戏社区，折扣信息 | `community` | `https://keylol.com/` | `其乐Keylol → https://keylol.com/` | `games:0:4` | 参与 Steam 玩家社区并获取折扣信息 |
| NGA玩家社区<br>`res-27a56307e731` | 综合游戏讨论社区 | `community` | `https://ngabbs.com/` | `NGA玩家社区 → https://ngabbs.com/` | `games:0:5` | 参与综合游戏讨论 |

### 2.3 游戏下载（2）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| Gamer520（仅供学习）<br>`res-f40af01b4876` | 空 | `website` | `https://www.gamer520.com/pcplay` | `Gamer520（仅供学习） → https://www.gamer520.com/pcplay` | `games:1:0` | 旧 source 将其放在“游戏下载”；description 为空，无法由本地数据进一步确认获取方式 |
| 1LOU（仅供学习）<br>`res-26efb6488262` | 空 | `website` | `https://www.1lou.icu/forum-9.htm` | `1LOU（仅供学习） → https://www.1lou.icu/forum-9.htm` | `games:1:1` | 旧 source 将其放在“游戏下载”；description 为空，无法由本地数据进一步确认获取方式 |

### 2.4 MOD下载（5）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| 3DM MOD站<br>`res-c619a3f5aaaa` | 3DM旗下的MOD分享平台 | `website` | `https://mod.3dmgame.com/` | `3DM MOD站 → https://mod.3dmgame.com/` | `games:2:0` | 查找、获取和分享游戏 MOD |
| 游侠补丁<br>`res-f4bcc11a5817` | 游戏补丁、修改器下载 | `website` | `https://patch.ali213.net/` | `游侠补丁 → https://patch.ali213.net/` | `games:2:1` | 下载游戏补丁与修改器，不限于 MOD |
| Nexus Mods<br>`res-39d5fb06b8f9` | 国外老牌MOD分享网站 | `website` | `https://www.nexusmods.com/` | `Nexus Mods → https://www.nexusmods.com/` | `games:2:2` | 查找、获取和分享游戏 MOD |
| Mod DB<br>`res-6573c42d45b0` | 游戏MOD和独立游戏社区 | `community` | `https://www.moddb.com/` | `Mod DB → https://www.moddb.com/` | `games:2:3` | 浏览 MOD 与独立游戏，并参与相关社区 |
| Steam创意工坊<br>`res-b05a90020690` | Steam官方MOD平台 | `website` | `https://steamcommunity.com/workshop/` | `Steam创意工坊 → https://steamcommunity.com/workshop/` | `games:2:4` | 通过 Steam 官方创意工坊获取玩家内容和 MOD |

### 2.5 官方网站（6）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| Ubisoft<br>`res-f0c8b430c2cf` | 育碧游戏官方商店和平台 | `website` | `https://www.ubisoft.com/en-us/` | `Ubisoft → https://www.ubisoft.com/en-us/` | `games:3:0` | 访问发行商官方生态、商店和游戏平台 |
| Steam<br>`res-882fd7527ef0` | 全球最大的数字游戏平台 | `software` | `https://store.steampowered.com/` | `Steam → https://store.steampowered.com/`；`Steam → https://store.steampowered.com/about/` | `games:3:1`；`installation-software:7:0` | 购买、管理和启动游戏；数字平台与商店 |
| Epic Games Store<br>`res-215f7a9368ce` | Epic游戏商店 | `software` | `https://store.epicgames.com/zh-Hant/` | `Epic Games Store → https://store.epicgames.com/zh-Hant/` | `games:3:2`；`installation-software:7:1` | 购买和管理 Epic 平台游戏；数字商店与平台 |
| GOG<br>`res-a64307bca0d1` | 无DRM游戏平台 | `website` | `https://www.gog.com/` | `GOG → https://www.gog.com/` | `games:3:3` | 购买无 DRM 游戏并使用游戏平台 |
| Origin/EA App<br>`res-1de799c618db` | EA游戏平台 | `website` | `https://www.origin.com/` | `Origin/EA App → https://www.origin.com/` | `games:3:4` | 访问 EA 游戏平台；名称与入口保留新旧品牌混合状态 |
| Xbox<br>`res-5f8a223f9113` | 微软Xbox游戏平台 | `website` | `https://www.xbox.com/zh-CN` | `Xbox → https://www.xbox.com/zh-CN` | `games:3:5` | 访问 Xbox 平台、商店及生态入口 |

### 2.6 游戏购买（5）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| SteamPY<br>`res-2a3e5c56f461` | Steam余额、跨区、CDKEY交易 | `website` | `https://steampy.com/home` | `SteamPY → https://steampy.com/home` | `games:4:0` | 进行 Steam 余额、跨区或 CDKEY 交易 |
| CDKEY No Gap<br>`res-f7478d75cebd` | CDKEY购买平台 | `website` | `https://www.cdkeynogap.com/` | `CDKEY No Gap → https://www.cdkeynogap.com/` | `games:4:1` | 购买游戏 CDKEY |
| Humble Bundle<br>`res-7292d666d261` | 游戏慈善包和折扣 | `website` | `https://www.humblebundle.com/` | `Humble Bundle → https://www.humblebundle.com/` | `games:4:2` | 购买游戏 Bundle 并获取折扣 |
| Fanatical<br>`res-c7fcd660aca2` | 游戏捆绑包和折扣 | `website` | `https://www.fanatical.com/` | `Fanatical → https://www.fanatical.com/` | `games:4:3` | 购买游戏 Bundle 并获取折扣 |
| IsThereAnyDeal<br>`res-090783dfb634` | 游戏折扣追踪网站 | `website` | `https://isthereanydeal.com/` | `IsThereAnyDeal → https://isthereanydeal.com/` | `games:4:4` | 比价和追踪折扣；不是直接交易平台 |

### 2.7 其他资源（5）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| Steam Database<br>`res-904869b055cb` | Steam数据库，查看游戏数据 | `website` | `https://steamdb.info/` | `Steam Database → https://steamdb.info/` | `games:5:0` | 查询 Steam 游戏和平台数据 |
| HowLongToBeat<br>`res-5c6453057fed` | 查看游戏通关时间 | `website` | `https://howlongtobeat.com/` | `HowLongToBeat → https://howlongtobeat.com/` | `games:5:1` | 查询游戏通关时长 |
| OpenCritic<br>`res-c93e7faa4f75` | 游戏评分聚合网站 | `website` | `https://opencritic.com/` | `OpenCritic → https://opencritic.com/` | `games:5:2` | 查询聚合游戏评分 |
| Metacritic<br>`res-08761e40b186` | 游戏、电影评分网站 | `website` | `https://www.metacritic.com/` | `Metacritic → https://www.metacritic.com/` | `games:5:3` | 查询游戏和电影评分；在本 view 中主要用于游戏评分 |
| PCGamingWiki<br>`res-751a6d512a90` | PC游戏故障排除和优化 | `website` | `https://www.pcgamingwiki.com/wiki/Home` | `PCGamingWiki → https://www.pcgamingwiki.com/wiki/Home` | `games:5:4` | 查询 PC 游戏兼容性、故障排除与优化资料 |

## 3. 实际使用动作分析

| 资源 | 主要动作 | 明确的次要动作或跨用途 |
|---|---|---|
| It's Adoorable | 直接玩游戏 | 无 |
| 游民星空 | 游戏媒体：新闻、评测 | 攻略 |
| 游侠攻略 | 攻略 | 修改器、补丁 |
| 3DM | 游戏下载/获取 | 攻略、汉化补丁 |
| IGN中国 | 游戏媒体 | 本地 description 未继续区分新闻或评测 |
| 其乐Keylol | 玩家社区 | Steam 折扣信息 |
| NGA玩家社区 | 玩家社区 | 综合游戏讨论 |
| Gamer520（仅供学习） | 游戏下载/获取（来自原 section） | description 为空，具体方式不确定 |
| 1LOU（仅供学习） | 游戏下载/获取（来自原 section） | description 为空，具体方式不确定 |
| 3DM MOD站 | MOD 获取/分享 | 平台性质 |
| 游侠补丁 | 补丁/修改器下载 | 与 MOD 相邻但不完全相同 |
| Nexus Mods | MOD 获取/分享 | 社区属性未由 type/description 明确记录 |
| Mod DB | MOD 与独立游戏社区 | MOD 获取/发现 |
| Steam创意工坊 | 玩家内容/MOD 获取 | Steam 官方平台入口 |
| Ubisoft | 官方平台/发行商生态 | 数字商店 |
| Steam | 游戏平台/商店 | 游戏购买、管理、启动 |
| Epic Games Store | 数字商店/平台 | 游戏管理 |
| GOG | 数字商店/平台 | 无 DRM 特性 |
| Origin/EA App | EA 游戏平台 | 旧品牌入口 |
| Xbox | 游戏平台/生态入口 | 商店、可能含订阅；当前 description 未明确订阅 |
| SteamPY | 余额、跨区、Key 交易 | Steam 相关第三方交易 |
| CDKEY No Gap | Key 购买 | 无 |
| Humble Bundle | Bundle 购买 | 慈善包、折扣 |
| Fanatical | Bundle 购买 | 折扣 |
| IsThereAnyDeal | 比价/价格追踪 | 帮助购买决策，不直接售卖 |
| Steam Database | 游戏/平台数据库查询 | Steam 数据查看 |
| HowLongToBeat | 游戏时长查询 | 无 |
| OpenCritic | 评分聚合查询 | 无 |
| Metacritic | 评分查询 | 同时覆盖电影等娱乐内容 |
| PCGamingWiki | 游戏运行排障/优化 | PC 游戏资料数据库 |

结论：30 项覆盖的动作很多，但大部分资源仍围绕玩家侧的游玩、获取、购买、资讯、社区、扩展内容和运行支持。结构问题主要来自现有 section 把多种动作合并，或用“官方网站”“其他资源”等不能表达实际用途的标题。

## 4. 互动小游戏专项

- `It's Adoorable` 的 name、description 与 URL 均支持其为直接可玩的互动小游戏；它是 30 项中唯一把“打开资源”本身作为游玩行为的实体。
- 其余 29 项是游戏相关的媒体、社区、下载、平台、购买、MOD、查询或排障入口，因此性质明显不同。
- 单独 section 只有一张卡片，信息密度较低；但它表达的是唯一且清楚的使用动作，并非无法分类的 singleton。
- 如果 games view 的范围允许收藏直接可玩的特殊作品，独立保留具有结构价值；不应为了统一数量强行与媒体、商店或工具混放。

结论：可以把它视为游戏 view 中的特殊独立资源。是否长期保留独立 section 取决于未来是否继续增加可直接游玩的条目；当前没有必须移动它的证据。

## 5. 游戏社区/攻略专项

逐项主要性质：

- 游民星空：媒体、新闻、评测为主，同时提供攻略。
- IGN中国：游戏媒体；本地 description 未明确列出新闻、评测或攻略的具体比例。
- 其乐Keylol：Steam 玩家社区为主，同时提供折扣信息。
- NGA玩家社区：综合玩家社区。
- 游侠攻略：攻略为主，但 description 同时写有修改器和补丁。
- 3DM：游戏下载为主的综合入口，同时包含攻略与汉化补丁；仅凭本地字段无法确定三者实际权重，但明确是多用途。

诊断：

1. “游戏社区/攻略”混合了媒体、新闻/评测、攻略、下载/补丁和社区，承担的用途过多。
2. 游民星空和 IGN中国更接近媒体/资讯；游民星空额外有攻略属性。
3. 其乐Keylol和NGA更接近玩家社区；其乐另有折扣信息属性。
4. 游侠攻略和3DM都具有明显多用途性质，不能只看当前组名把它们当成纯攻略站。
5. 六项未来值得按主要动作进一步审计和拆分，但本轮不提出最终 section 数量或资源移动方案。

## 6. 游戏下载专项

### Gamer520 与 1LOU 的本地证据

- 当前 catalog 的 description 均为空。
- 旧 `data/resources/games.js` 已经把两项放在“游戏下载”组，原始 name 也已经包含“（仅供学习）”。
- `docs/migration-map.json` 原样保存了相同 name、空 description、URL 和原“游戏下载”group；迁移 reason 只依据原分组把它们保留在 games/游戏下载，没有增加网站内容证据。
- `data/legacy.js` 的 `games` 映射包含两个 ID，证明它们来自旧游戏页面，但不额外证明用途。
- 旧 `games.html` 只负责加载 `data/resources/games.js`，没有内嵌更多描述。

因此，本地数据只能确认“它们历史上被维护者当作游戏下载入口”，不能从 description 进一步确认资源类型、获取方式或当前内容。名称中的“仅供学习”是原始 source 的 name 字段组成部分，并非本次 catalog 迁移新增；但本地记录也不能证明它属于网站正式品牌名，更可能是旧收藏中的编辑性标注。

数据质量问题：两项 description 为空；1LOU 在 2026-09-26 的本地 link-check 中出现 DNS 无法解析。该结果未经本轮联网复核，不能直接断言失效。Gamer520 当时为 responded。

结构判断：“游戏下载”作为已知历史用途可以暂时保留，但两项的字段证据弱；未来应先核实实体和补足描述，再决定结构，不应根据名称自行推断更多信息。

## 7. MOD 专项

| 资源 | 实际性质 |
|---|---|
| 3DM MOD站 | MOD 分享/获取平台 |
| 游侠补丁 | 补丁与修改器下载，不限于 MOD |
| Nexus Mods | MOD 分享/获取网站 |
| Mod DB | MOD 与独立游戏社区 |
| Steam创意工坊 | Steam 官方玩家内容/创意工坊平台 |

“MOD下载”能覆盖三项核心 MOD 入口，但不能完整覆盖游侠补丁的补丁/修改器性质、Mod DB 的独立游戏与社区属性，以及 Steam 创意工坊的平台/玩家内容属性。该组总体使用场景仍稳定：玩家为已有游戏获取、安装或发现扩展内容、补丁和修改器。

未来更适合对 section 名称作包容玩家内容、MOD 与补丁的表达，而不是仅因五项载体不同拆成多个小组。这里记录名称覆盖不足，不提出最终命名。

五项都属于玩家侧使用。现有 sources、topics、contexts 和 navigation 没有将其作为制作工具或游戏开发素材；不能因为 MOD 涉及内容创作就移动到「创作与工作 → 游戏制作」。

## 8. 官方网站专项

逐项性质：

- Ubisoft：发行商官方生态，同时明确包含官方商店和平台。
- Steam：数字游戏平台、商店、客户端/启动与游戏管理入口。
- Epic Games Store：数字商店与游戏平台。
- GOG：无 DRM 数字商店和游戏平台。
- Origin/EA App：EA 平台/启动器品牌入口；当前字段没有单独写商店或订阅。
- Xbox：微软游戏平台和生态入口；当前 description 没有明确列出商店或订阅，但 URL 与名称属于官方平台入口。

诊断：

1. “官方网站”不够准确。六项并非普通官网集合，核心共同点是官方游戏平台、数字商店或发行商生态入口。
2. Steam、Epic、GOG、EA、Xbox 主要属于平台/商店/生态，而不是纯信息官网。
3. Ubisoft以发行商名称呈现，但现有 description 明确写有官方商店和平台，所以与另外五项并没有本质断裂。
4. 该组与“游戏购买”存在动作重叠：官方平台通常也能直接买游戏；区别在于本组是官方生态/游戏库入口，“游戏购买”组更多是 Key、Bundle、折扣和第三方交易/比价入口。

共享合理性：

- Steam `res-882fd7527ef0` 同时位于「设备与环境 → 软件 → 游戏平台」，并具有 `installation-software:7:0` source、`software` type 和 `setup` context。共享合理。
- Epic Games Store `res-215f7a9368ce` 同时位于「设备与环境 → 软件 → 游戏平台」，并具有 `installation-software:7:1` source、`software` type 和 `setup` context。共享合理。

## 9. 游戏购买专项

逐项区分：

- SteamPY：Steam 余额、跨区和 CDKEY 交易。
- CDKEY No Gap：CDKEY 购买平台。
- Humble Bundle：Bundle/慈善包购买与折扣。
- Fanatical：Bundle 购买与折扣。
- IsThereAnyDeal：比价和价格追踪，不是直接交易平台。

五项仍能构成稳定的“购买与优惠决策”使用场景。IsThereAnyDeal 与另外四项性质明显不同：前四项可以完成交易，IsThereAnyDeal 主要帮助发现价格和做购买决策。鉴于总量只有五项，单独拆出一个价格追踪 singleton 的结构收益有限，可由一个略宽但准确的购买/优惠概念统一。

本组与 Steam、Epic、GOG 等官方商店有分类逻辑重叠，但不是重复实体：官方平台承担购买、游戏库、启动和生态；本组主要聚焦 Key、Bundle、第三方交易、折扣与比价。未来结构需要清楚表达“官方平台”和“购买优惠工具”的差异。

## 10. 其他资源专项

逐项性质：

- Steam Database：Steam 数据库与游戏数据查询。
- HowLongToBeat：游戏时长查询。
- OpenCritic：游戏评分聚合。
- Metacritic：游戏/电影等娱乐评分查询，在当前 view 中用于游戏评分。
- PCGamingWiki：PC 游戏资料、兼容性、故障排除与优化。

诊断：

1. “其他资源”不应作为长期稳定标题，因为五项用途都可以被明确描述，并非无法判断。
2. 前四项可由“游戏数据、评分与查询”一类较宽概念覆盖；PCGamingWiki 同样是查询型资料，但结果用于运行排障和优化。
3. 如果强行拆分，容易形成数据库 1、时长 1、评分 2、排障 1 的碎片结构。
4. 当前数量更适合由一个比“其他资源”准确、但仍能覆盖玩家资料与查询工具的 section 统一，而不是制造多个 singleton。
5. PCGamingWiki与另外四项的结果用途明显不同：它解决游戏能否正常运行及如何优化，而另外四项主要支持了解、评价或选择游戏；但它仍属于玩家查询资料，未必必须单独拆组。

本轮只确认“其他资源”标题失真，不确定最终名称或重组方案。

## 11. 跨 view / 跨大区共享

只按当前 navigation 的 catalog ID 统计，legacy 来源不算共享。

| ID | 名称 | games 位置 | 共享位置 |
|---|---|---|---|
| `res-882fd7527ef0` | Steam | 日常与生活 → 游戏 → 官方网站 | 设备与环境 → 软件 → 游戏平台 |
| `res-215f7a9368ce` | Epic Games Store | 日常与生活 → 游戏 → 官方网站 | 设备与环境 → 软件 → 游戏平台 |
| `res-751a6d512a90` | PCGamingWiki | 日常与生活 → 游戏 → 其他资源 | 设备与环境 → 系统与设备 → 游戏运行与优化 |

其余 27 项没有出现在任何其他 view。games 内部也没有同 ID 重复引用。

## 12. 游戏 / 游戏制作 / 游戏设计边界

- 当前 30 项与「创作与工作 → 游戏制作」的同 ID 共享为 0。
- 当前 30 项与「学习与研究 → 游戏设计」的同 ID 共享为 0。
- 没有实体的现有 description 明确表示制作引擎、开发工具、素材生产工具或制作工作流。
- 没有实体的现有 description 明确表示游戏设计理论、课程或系统学习资料。
- MOD类条目都以玩家侧下载、分享、社区或创意工坊使用为主；没有制作区 source/context 证据。
- PCGamingWiki是玩家侧运行资料与排障入口，同时共享到系统与设备；它不是游戏制作工具，也不是设计学习资料。
- Steam和Epic的设备软件共享已经表达客户端/环境用途，不需要再共享到制作区。

结论：没有明确应该移入游戏制作或游戏设计的实体，也没有证据支持新增这两个方向的跨 view 共享。

## 13. relatedResources 候选

### 当前关系

- 30 项中已有 `relatedResources`：0。
- 被其他 catalog 实体通过 `relatedResources` 引用：0。

### 候选判断

| 候选 | 本地证据 | 判断 |
|---|---|---|
| 3DM `res-0c78ece82080` → 3DM MOD站 `res-c619a3f5aaaa` | 主实体使用根域 `3dmgame.com`；后者 description 明确为“3DM旗下”，URL 为 `mod.3dmgame.com` | 证据充分，符合主站 → 专门 MOD 子站 |
| 游侠攻略 `res-a279f861f6aa` → 游侠补丁 `res-f4bcc11a5817` | 两者同属 `ali213.net`，分别使用 `gl` 与 `patch` 子域，功能明确不同 | 能确认同平台不同栏目，但“游侠攻略”本身也是专门栏目而非总主站；作为单向主入口 → 子功能的证据不足 |
| Steam `res-882fd7527ef0` → Steam创意工坊 `res-b05a90020690` | Steam 是平台实体；后者 description 明确为“Steam官方MOD平台”，URL 为 `steamcommunity.com/workshop/` | 证据充分，符合平台 → 官方专门入口 |

Steam Database 和 SteamPY 虽含 Steam 名称，但 URL 分别为 `steamdb.info` 和 `steampy.com`，descriptions 表达数据库/交易用途，没有“Steam 官方子功能”证据，不应关联。平台竞争关系、同类网站和同一用途也不构成 relatedResources。

本轮未新增任何关联。

## 14. 重复实体与同平台多入口

检查结果：

- 同名不同 ID：0。
- 相同 URL 不同 ID：0（检查主 URL 和 links 中的精确 URL）。
- 同 ID 重复引用：0。
- 明显历史重复实体：0。

同平台不同入口：

- 3DM / 3DM MOD站：综合主站与官方 MOD 子站，实体和功能不同。
- 游侠攻略 / 游侠补丁：同平台的攻略栏目与补丁栏目，功能不同。
- Steam / Steam创意工坊：官方平台/商店与官方玩家内容入口，功能不同。
- Steam Database：第三方数据站，不是 Steam 官方平台的重复实体。
- SteamPY：第三方余额、跨区与 Key 交易入口，不是 Steam 官方平台的重复实体。
- Steam、Epic Games Store 在 games 与 software 中使用同一 ID，属于跨 view 共享，不是重复实体。

没有资源需要在本轮或后续仅凭现有证据合并。

## 15. 数据质量

统计范围为 games 的 30 个唯一实体。

| 检查项 | 数量 | 结果 |
|---|---:|---|
| URL 为空 | 0 | 未发现 |
| description 为空 | 2 | Gamer520、1LOU |
| HTTP 主 URL | 0 | 全部为 HTTPS |
| `links.label` 与 name 不一致 | 0 | 未发现 |
| name 与 description 明显不匹配 | 0 | 未发现；两个空 description 单独记录 |
| 明显 type 异常 | 0 | Steam/Epic 的 `software` 有安装来源和设备共享；社区项也有对应 `community` type |
| 同名不同 ID | 0 | 未发现 |
| 相同 URL 不同 ID | 0 | 未发现 |

### Origin/EA App

本地证据支持“入口和品牌已发生迁移”的判断：

- 原始 `data/resources/games.js`、migration 和 catalog 都保存混合名称 `Origin/EA App` 与旧 `https://www.origin.com/` URL。
- 2026-09-26 的本地 link-check 记录该 URL 返回 200，但 effective URL 为 `https://www.ea.com/games/library/pc-download`。
- 因此可以确认旧 Origin 入口当时已跳转至 EA 页面；当前名称同时包含旧品牌和新品牌，URL 仍是旧 Origin 域名。

这里只记录，不修改名称或 URL。

### 时间性 description

- Steam 的“全球最大的数字游戏平台”是随时间变化的排名式表述。
- Nexus Mods 的“国外老牌”带相对时间判断，但不像明确排名那样容易失效。

### 既有 link-check

`docs/link-check.json` 的检查时间为 2026-09-26；30 项中 19 项 responded，11 项 unconfirmed：

- 1LOU：DNS 无法解析，是最明确需要后续复核的一项。
- NGA、Nexus Mods、Mod DB、Epic Games Store、Steam Database、HowLongToBeat、PCGamingWiki：403。
- Steam、Steam创意工坊：超时。
- OpenCritic：HTTP/2 protocol error。

这些结果未经本轮联网复核。403、超时或协议错误不能直接证明入口失效；本轮不修复。

## 16. 最终结构诊断

1. **“互动小游戏”是否值得单独保留：有条件地值得。** 它是唯一直接可玩的实体，语义清楚而非兜底项；虽然是 singleton，但可作为特殊独立资源。未来是否继续独立取决于同类资源是否增长。
2. **“游戏社区/攻略”是否应拆：值得进一步拆分。** 六项明确混合媒体、攻略、综合下载/补丁和玩家社区；下一轮应依据主要动作制定方案。
3. **“游戏下载”是否应保留：可暂时保留。** 原始分组提供了唯一用途证据，但两项 description 均为空，正式调整前应先核实数据。
4. **“MOD下载”是否应保留或改名：场景应保留，标题值得改得更宽。** 当前还包含补丁、修改器、社区、独立游戏和创意工坊；不必为五项拆成多个小组。
5. **“官方网站”是否应改成更准确的概念：应。** 实体核心是官方游戏平台、数字商店和发行商生态，而不是泛化官网。
6. **“游戏购买”是否应保留：应保留其购买/优惠场景。** IsThereAnyDeal 是比价而非商店，但无需为一项单独拆组；需要与官方平台商店清楚区分。
7. **“其他资源”是否应取消或改名：应取消宽泛标题并改为更准确的统一概念。** 五项可以由玩家资料、数据与查询类概念覆盖；当前不宜拆成多个 singleton。
8. **是否存在需要合并的重复 catalog 实体：没有。** 同品牌多入口都有功能或运营主体差异。
9. **是否存在明确应该移出 games 的资源：没有。** PCGamingWiki 已通过共享表达系统排障用途；MOD 条目仍是玩家侧使用。
10. **是否需要新增跨 view 共享：没有。** 当前 Steam、Epic、PCGamingWiki 三项共享已覆盖明确的设备/系统边界；其余条目没有制作或学习区证据。
11. **哪些 relatedResources 候选证据充分：** 3DM → 3DM MOD站、Steam → Steam创意工坊。游侠攻略 → 游侠补丁能确认同平台关系，但单向主从证据不足。

当前真正的结构问题是：section 标题与组内用途不完全一致，以及媒体/社区/攻略混放。资源本身没有明显错区或重复实体。本报告只给出诊断，不构成最终重组方案，也未实施任何调整。

## 17. 本轮文件变更

本轮只新增：

- `docs/games-resource-audit.md`：本专项审计报告。

未修改 `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`scripts/validate.mjs`、旧资源快照、旧 HTML、UI、CSS、JS 或任何资源字段；未联网；未 commit；未 push。
