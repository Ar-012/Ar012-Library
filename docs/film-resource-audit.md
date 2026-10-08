# 日常与生活 → 影视轻量资源专项检查

审计日期：2026-10-05

审计对象：`data/navigation.js` 中 view key 为 `film` 的全部资源引用

审计依据：`docs/daily-life-overview-audit.md`、当前 `data/catalog.js` / `data/navigation.js` / `data/legacy.js`、旧资源快照、`docs/migration-map.json`、旧 HTML 与既有 `docs/link-check.json`

限制：本轮未联网；未修改 catalog、navigation、legacy、migration、validator 或任何资源；未重新分类；未 commit；未 push。

## 1. 完整性检查与17项完整清单

`film` 当前有 5 个 section、17 个资源引用、17 个唯一 catalog ID：

| section | 引用数 | 唯一 ID 数 |
|---|---:|---:|
| 播放工具 | 1 | 1 |
| 影视在线 | 9 | 9 |
| 聚合搜索 | 3 | 3 |
| 影视下载 | 3 | 3 |
| 影视查询 | 1 | 1 |
| **合计** | **17** | **17** |

17 项均能在当前 catalog 中解析；无遗漏、无重复引用、无悬空 ID。

### 1.1 播放工具（1）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| IINA<br>`res-1c23a7b77657` | 视频播放器 | `software` | `null` | `[]` | `installation-software:8:4` | 在本地播放视频文件 |

### 1.2 影视在线（9）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| 555电影<br>`res-835a4838f864` | 在线影视观看网站 | `website` | `https://www.55boy.wiki/` | `555电影 → https://www.55boy.wiki/` | `video-film:0:0` | 在线观看影视 |
| 热播之家<br>`res-45c2a24b25b0` | 热门影视剧在线观看 | `website` | `https://rebozj.pro/` | `热播之家 → https://rebozj.pro/` | `video-film:0:1` | 在线观看影视剧 |
| 网飞猫<br>`res-0310c06e735b` | 影视资源在线观看 | `website` | `https://www.ncat22.com/` | `网飞猫 → https://www.ncat22.com/` | `video-film:0:2` | 通过网飞猫主入口在线观看影视 |
| 网飞猫备用<br>`res-c68a509f5bf8` | 网飞猫备用链接 | `website` | `https://dl.ncat22.com/` | `网飞猫备用 → https://dl.ncat22.com/` | `video-film:0:3` | 在主入口不可用时使用网飞猫备用入口 |
| 4K影视<br>`res-2093fb1cd899` | 4K高清影视资源 | `website` | `https://www.4kvm.tv/` | `4K影视 → https://www.4kvm.tv/` | `video-film:0:4` | 获取或观看4K高清影视；本地 description 未明确具体动作 |
| LIBVIO<br>`res-07222493760e` | 影视资源在线观看 | `website` | `https://libvio.art/` | `LIBVIO → https://libvio.art/` | `video-film:0:5` | 在线观看影视 |
| HDmoli<br>`res-d284007428f0` | 高清魔力影视 | `website` | `https://www.hdmoli.com/` | `HDmoli → https://www.hdmoli.com/` | `video-film:0:6` | 原始分组表明是在线影视站；description 未明确播放动作 |
| 低端影视<br>`res-eef9f29322f0` | 简洁的影视观看网站 | `website` | `https://ddys.pro/` | `低端影视 → https://ddys.pro/` | `video-film:0:7` | 在线观看影视 |
| NOVIP<br>`res-952a2a8ef0d5` | 无需VIP的影视观看 | `website` | `https://findno.tv/` | `NOVIP → https://findno.tv/` | `video-film:0:8` | 在线观看影视 |

### 1.3 聚合搜索（3）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| 许搜<br>`res-2bcf6236e8a3` | 影视资源聚合搜索 | `website` | `https://xn--p3tv7h.com/` | `许搜 → https://xn--p3tv7h.com/` | `video-film:1:0` | 聚合搜索影视资源 |
| 影猫的仓库<br>`res-bee702507606` | 影视资源仓库搜索 | `website` | `https://ymck.pro/` | `影猫的仓库 → https://ymck.pro/` | `video-film:1:1` | 搜索影视资源仓库 |
| 臭蛋蛋影视<br>`res-785189f2a495` | 影视资源搜索网站 | `website` | `https://cddys.vip/` | `臭蛋蛋影视 → https://cddys.vip/` | `video-film:1:2` | 搜索影视资源 |

### 1.4 影视下载（3）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| 蓝光电影网<br>`res-ccfaf1fc8479` | 4K/1080P蓝光电影下载 | `website` | `https://www.4k1080.com/` | `蓝光电影网 → https://www.4k1080.com/` | `video-film:2:0` | 下载4K/1080P蓝光电影 |
| 音范丝<br>`res-fc2e950464ae` | 高清影视资源下载 | `website` | `https://www.yinfans.me/` | `音范丝 → https://www.yinfans.me/` | `video-film:2:1` | 下载高清影视资源 |
| 中国蓝光网<br>`res-5ef708a662da` | 蓝光影视资源下载 | `website` | `http://www.languangdy.com/` | `中国蓝光网 → http://www.languangdy.com/` | `video-film:2:2` | 下载蓝光影视资源 |

### 1.5 影视查询（1）

| name / catalog ID | description | type | url | links | sources | 当前主要用途 |
|---|---|---|---|---|---|---|
| IMDB 电影社区<br>`res-d740a4987e2c` | 国际电影数据库和社区 | `community` | `https://www.imdb.com/?ref_=nv_home` | `IMDB 电影社区 → https://www.imdb.com/?ref_=nv_home` | `video-film:2:3` | 查询电影资料并使用电影社区；评分和演职员信息属于数据库用途的合理组成 |

## 2. 现有五组结构检查

| section | 标题准确性 | 组内一致性 | singleton / 拆合判断 |
|---|---|---|---|
| 播放工具 | 准确 | IINA明确是本地播放器 | 虽只有一项，但本地播放与在线影视动作不同，保留有价值 |
| 影视在线 | 基本准确 | 多数明确用于在线观看；4K影视、HDmoli的本地描述不够具体，但旧 source 均位于影视在线 | 无明显放错组；9项不需要仅因数量拆分 |
| 聚合搜索 | 准确 | 三项 description 均明确为搜索 | 与播放入口有清楚区别，应独立保留 |
| 影视下载 | 准确 | 三项均明确为下载 | 与搜索、在线播放均有清楚区别，应独立保留 |
| 影视查询 | 准确 | IMDb是资料数据库/社区 | 虽只有一项，但查询动作稳定且独立，保留有价值 |

五组分别对应本地播放、在线播放、资源搜索、资源下载和资料查询。没有必要为了减少 section 数量把不同动作强行合并；也没有证据要求把现有组继续细分。

## 3. 播放工具专项

- IINA `res-1c23a7b77657` 的主要用途是本地视频播放，type 为 `software`。
- 它位于 film，是因为“播放影视”属于日常影视消费流程；topics 同时包含“软件”和“影视”，contexts 同时包含 `setup` 与 `life`。
- 它还位于「设备与环境 → 软件 → Mac专用软件」，使用同一个 ID。该位置表达软件安装/个人环境，film 位置表达观看用途。
- sources 为 `installation-software:8:4`，证明原始来源是安装软件页；当前双位置是共享，不是重复实体。
- “播放工具”只有一项，但本地播放和在线影视是明显不同的使用动作。把 IINA 并入“影视在线”会造成类型和动作混淆。

结论：当前同 ID 共享合理；“播放工具”singleton 具有稳定语义，建议保留。IINA 当前 `url: null`、`links: []`，本轮不修改。

## 4. 影视在线专项

九项性质：

- 555电影、热播之家、网飞猫、LIBVIO、低端影视、NOVIP：description 明确指向在线播放。
- 网飞猫备用：明确是网飞猫备用入口，最终动作仍是在线影视。
- 4K影视：description 只写“4K高清影视资源”，未说明播放、搜索或下载；旧 source 与 migration 均将其放在“影视在线”，没有反向证据。
- HDmoli：description 只写“高清魔力影视”，未直接描述动作；旧 source 与 migration 均将其放在“影视在线”，没有反向证据。

因此该组用途总体一致，没有明确放错组的资源。4K影视和HDmoli属于描述信息不足，而不是已经证实的错分。九项当前不需要拆成多个 section。

### 4.1 网飞猫主入口与备用入口完整对照

| 字段 | 主入口 | 备用入口 |
|---|---|---|
| name | 网飞猫 | 网飞猫备用 |
| ID | `res-0310c06e735b` | `res-c68a509f5bf8` |
| description | 影视资源在线观看 | 网飞猫备用链接 |
| url | `https://www.ncat22.com/` | `https://dl.ncat22.com/` |
| links | `网飞猫 → https://www.ncat22.com/` | `网飞猫备用 → https://dl.ncat22.com/` |
| type | `website` | `website` |
| sources | `video-film:0:2` | `video-film:0:3` |
| legacy 来源 | `video-film` | `video-film` |
| 原始 section | 影视在线 | 影视在线 |
| 原始顺序 | 第3项（索引2） | 紧随其后的第4项（索引3） |
| migration 记录 | 目的地 `film / 影视在线`，保留主入口字段 | 目的地 `film / 影视在线`，原始 description 已明确写“备用链接” |

旧 `data/resources/video-film.js` 已连续保存这两个条目，且备用项从最早可见的原始记录起就使用“网飞猫备用”与“网飞猫备用链接”。旧 `video-film.html` 只加载该资源文件，没有提供相反信息。legacy 数组也分别保留两个 ID。

判断：**B. 同一服务的主入口 / 备用入口**。

它们不是两个不同服务；备用项具有清楚且独立的故障切换用途，因此现有证据更支持主/备用多入口关系，而不是无法解释的历史重复。按当前实体模型，网飞猫 `res-0310c06e735b` → 网飞猫备用 `res-c68a509f5bf8` 是证据充分的单向 `relatedResources` 候选。备用入口不需要反向指向主入口。本轮只记录，不实施。

## 5. 聚合搜索专项

- 许搜、影猫的仓库、臭蛋蛋影视的 descriptions 分别明确写有“聚合搜索”“仓库搜索”“搜索网站”。
- 三项的主要动作都是查找影视资源，而不是直接播放。现有本地资料没有写明某项同时以播放为主要用途。
- 即使搜索结果最终可能通向播放或下载，搜索入口本身仍与“影视在线”的直接观看动作不同。
- 三项 ID、名称、URL 均不同，没有重复实体证据。

结论：“聚合搜索”标题准确、组内一致，应继续独立保留，无需拆分或并入影视在线。

## 6. 影视下载专项

- 蓝光电影网、音范丝、中国蓝光网的 descriptions 都明确写明“下载”。
- 影视下载的目标是获取本地文件；聚合搜索的目标是找到资源；影视在线的目标是直接观看，三种动作边界清楚。
- 没有一项的本地字段更接近社区、索引或纯搜索。
- 三项不需要继续拆分，也不应与聚合搜索或影视在线合并。

结论：“影视下载”标题准确、组内用途一致，建议保留。

## 7. 影视查询专项

- IMDB 电影社区 `res-d740a4987e2c` 的 description 是“国际电影数据库和社区”，主要用途是查询影视资料；评分、演职员、作品信息都属于数据库查询的自然范围。
- 它不承担直接播放、资源聚合搜索或下载，因此和另外三类网站有明显功能区别。
- type 为 `community`，反映社区属性；其数据库查询用途由 name、description 和 section 共同表达。
- 虽然目前只有一项，但“资料查询”是稳定、可扩展的独立使用动作。并入在线播放、搜索或下载都会降低准确性。

结论：“影视查询”singleton 应保留，不需要为了减少组数而合并。

## 8. 跨 view 共享

只按当前 navigation 中的 catalog ID 统计，legacy 来源不算共享。

| ID | 名称 | film 位置 | 共享位置 |
|---|---|---|---|
| `res-1c23a7b77657` | IINA | 日常与生活 → 影视 → 播放工具 | 设备与环境 → 软件 → Mac专用软件 |

其他16项没有出现在其余19个 view。film 内也没有同 ID 重复引用。本轮不新增共享。

## 9. 与其他大区的边界

- **IINA**：在 film 表达日常本地观看，在设备软件表达安装/环境管理；双位置合理。
- **IMDb**：当前用途是消费者查电影资料、评分和社区信息，仍符合日常影视。它可能被用于研究，不等于实体主要属于学习与研究；当前没有学习区 source、context 或同 ID 引用。
- **影视在线、聚合搜索、影视下载**：全部围绕日常观看、发现或获取影视内容，没有创作生产、系统安装或学科研究的明确字段证据。
- 其余资源中没有明确应该移动到学习与研究、创作与工作或设备与环境的实体。

结论：当前大区边界合理，不需要新增跨区共享。

## 10. relatedResources

### 当前关系

- film 17项中已有 `relatedResources`：0。
- 被其他 catalog 实体通过 `relatedResources` 引用：0。

### 明确候选

| 候选 | 证据 | 判断 |
|---|---|---|
| 网飞猫 `res-0310c06e735b` → 网飞猫备用 `res-c68a509f5bf8` | 名称与原始 description 明确写“备用”；两个旧 source 连续；同属 `ncat22.com`；旧分组和 migration 目的地相同 | 强候选，符合主入口 → 备用入口；不需要反向关系 |

其他影视站只是同类资源，没有主站/子功能或主/备用证据，不构成 relatedResources 候选。本轮未新增关联。

## 11. 重复实体 / 多入口检查

- 同名不同 ID：0。
- 相同 URL 不同 ID：0（检查主 URL 和 links 中精确 URL）。
- 同 ID 重复引用：0。
- 明显历史重复实体：0。
- 主站/备用入口：网飞猫主入口与网飞猫备用，共2个不同 ID。

网飞猫两项属于同一服务的不同入口角色。备用实体的名称、description、子域和历史顺序都明确表达备用功能，因此本轮不判为应合并的重复实体；更适合保留两个入口，并在未来确认后建立单向关系。

## 12. 数据质量

统计范围为 film 的17个唯一实体。

| 检查项 | 数量 | 结果 |
|---|---:|---|
| URL为空 | 1 | IINA；`links: []`，原软件记录即无链接 |
| description为空 | 0 | 未发现 |
| HTTP主URL | 1 | 中国蓝光网 `http://www.languangdy.com/` |
| name / description明显不一致 | 0 | 未发现；4K影视、HDmoli属于描述不够具体 |
| type明显异常 | 0 | IINA为software，IMDb为community，其余为website |
| `links.label`与name不一致 | 0 | 未发现 |
| 同名不同ID | 0 | 未发现 |
| 相同URL不同ID | 0 | 未发现 |

既有 `docs/link-check.json` 检查时间为2026-09-26。film 当前结果为：12项 responded、4项 unconfirmed、1项无URL。

- 网飞猫主入口：返回非标准状态850，标记为 unconfirmed。
- 网飞猫备用入口：responded；这不能反向证明主入口失效，只能说明当次检查结果不同。
- 低端影视：DNS无法解析，是最明确需要后续复核的入口之一。
- 蓝光电影网：连接超时。
- IMDB电影社区：HTTP 403。
- 中国蓝光网使用HTTP；旧检查记录当时 responded 并跳转至HTTPS，但本轮不修改。

1LOU和超能搜不在 film 的17项中，本报告不把它们计入影视数据质量统计。以上异常均未在本轮联网复核；403、超时或非标准状态不能直接等同于网站失效。

## 13. 最终轻量诊断

1. **“播放工具”是否保留：保留。** 本地播放与在线影视是独立动作，IINA singleton有明确语义。
2. **“影视在线”是否保留：保留。** 九项总体一致；4K影视、HDmoli只是描述证据较弱，没有已证实错分。
3. **“聚合搜索”是否保留：保留。** 三项都是资源搜索入口，与直接观看不同。
4. **“影视下载”是否保留：保留。** 三项均明确提供下载，与搜索、观看边界清楚。
5. **“影视查询”是否保留：保留。** IMDb的资料查询动作稳定独立，不应因只有一项并组。
6. **五组结构是否整体合理：是。** 它们对应本地播放、在线、搜索、下载、查询五种清楚的使用动作。
7. **是否存在明显需要移动的资源：没有。** IINA共享已合理表达设备属性，IMDb仍属于日常影视查询。
8. **是否存在重复catalog实体：没有明确重复实体。** 网飞猫两项是主/备用入口关系。
9. **网飞猫主/备用入口是否应建立relatedResources：是，属于证据充分的单向候选。** 建议方向为主入口 → 备用入口；本轮未实施。
10. **是否需要新增跨view共享：不需要。** 除IINA外没有明确跨区用途证据。
11. **是否有必要进行像games那样的大规模重组：没有必要。** 当前结构已经基本合理；未来最多只需确认网飞猫单向关系，并视需要改善4K影视、HDmoli等描述，不需要重排五组。

总体结论：**保持现状，只考虑极少量关系或数据描述调整。** 本报告只完成审计，没有开始实施修改。

## 14. 本轮文件变更

本轮只新增：

- `docs/film-resource-audit.md`：本轻量专项检查报告。

未修改 `data/catalog.js`、`data/navigation.js`、`data/legacy.js`、`docs/migration-map.json`、`scripts/validate.mjs`、旧资源快照、旧HTML、UI、CSS、JS或任何资源字段；未联网；未commit；未push。
