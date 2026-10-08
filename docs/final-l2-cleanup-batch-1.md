# 最终外链清理 · 第二批 L2

执行日期：2026-10-07。完成 4 个实体退休、Color Claim 更新及 Origin/EA App → EA app 整理。沿用现有 retired schema，没有重新设计退休模型。未处理其他 L2/L3，未联网扩展搜索，未 commit，未 push。

## 1. 本轮范围

仅处理 Gamer520、1LOU、HDmoli、Spitfire LABS、Color Claim、Origin/EA App 六个实体，以及对应的必要引用、历史记录和数量同步。4K影视明确保留；其他资源完整对象不变。修改前已在 `/tmp` 保存对象快照和全部既有文件 SHA-256，临时脚本未加入项目。

## 2. 四个退休实体逐项结果

| 实体 / ID | 原 URL / sourceKey | 退休原因 |
| --- | --- | --- |
| Gamer520（仅供学习） / res-f40af01b4876 | https://www.gamer520.com/pcplay；games:1:0 | 当前实际用途为含破解游戏版本、补丁等内容的第三方 PC 游戏下载索引；用户决定当前资料库不再需要此资源。 |
| 1LOU（仅供学习） / res-26efb6488262 | https://www.1lou.icu/forum-9.htm；games:1:1 | 最终外链审计持续 DNS 解析失败，用户已不记得实际用途且无继续保留需求；用户决定退休，不据此宣称永久失效。 |
| HDmoli / res-d284007428f0 | https://www.hdmoli.com/；video-film:0:6 | 当前为影视信息与网盘下载入口索引；用户决定资料库不再专门保留影视网盘下载网站这一用途。 |
| Spitfire LABS / res-6ef506a8e309 | https://labs.spitfireaudio.com/；music:5:7 | 原 LABS 已迁入 Splice INSTRUMENT，产品归属、形态及原免费虚拟乐器和音色库定位改变；用户决定退休原 Spitfire LABS 实体。 |

四个实体均从当前 catalog 移除，当前 navigation 不再引用其 ID，当前 legacy 映射中对应 ID 已移除。每个实体均有一个来源和一个 active URL，因此实际减少 4 个当前实体、4 个 active URL。

Gamer520 和 HDmoli 根据用户的收藏需求决定退休，未将“可访问”当作必须保留的依据；1LOU 根据用户无保留需求决定退休，未将本次 DNS 失败宣称为永久失效；Spitfire LABS 按原实体退休，没有改名成 Splice、没有建立 Splice 或其他替代实体，也没有转移 source 给其他资源。

## 3. Color Claim 更新结果

确认 ID：`res-2a683257703e`。保留原 ID、名称 `Color Claim`、type、placement 和其他字段，仅更新：

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | https://vanschneider.com/colors | https://access.mymind.com/colors |
| description | 120个精选颜色，无预设方案 | 精选配色组合与颜色参考。 |
| 主 links URL | https://vanschneider.com/colors | https://access.mymind.com/colors |

主入口 label 继续为 `Color Claim`。旧地址不再 active，完整保留于 migration original 和本轮 URL correction。没有新建 mymind 实体，也没有因为页面归属变化额外改名。

## 4. Origin/EA App → EA app 更新结果

确认 ID：`res-1de799c618db`。保留原 ID，更新如下：

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| name | Origin/EA App | EA app |
| url | https://www.origin.com/ | https://www.ea.com/games/library/pc-download |
| description | EA游戏平台 | EA 的 PC 游戏平台与游戏下载客户端。 |
| 主 links label | Origin/EA App | EA app |
| 主 links URL | https://www.origin.com/ | https://www.ea.com/games/library/pc-download |

采用用户给定、最终外链审计已确认的 EA 官方 PC 下载入口，没有额外联网查找其他地址。type、placement、sources、tags 等其他字段均保持原样。原名称、原 URL、原 description 和 link label 保留于 migration original / correction before，没有建立新的 EA app 实体。

## 5. 4K影视保持不变

`res-2093fb1cd899` 的完整对象与修改前精确相等，仍使用 `https://www.4kvm.tv/`。未退休，未改 name、description、type、URL、links、placement 或任何其他字段。

## 6. retired history / migration 处理

完全沿用第一批机制：

- 在 `migration.retired` 尾部追加 4 条记录，各保存 resourceId、reason、完整原 entity 和退休前全部 placements。
- 对应 4 个 source 行标记 `status: "retired"`，当前 resourceId 置为 null，retiredResourceId 指向对应退休记录。
- sourceKey、original、原 URL / 名称 / description、来源 project/page/group/gi/ri、reason 和历史 destinations 保持不变。
- migration.resourceCount：478 → 474；sources 仍为 498，没有删除任何来源行。

旧 9 条 retired 记录完整不变。本轮 4 个退休实体的 entity 快照与退休前完整对象精确相等，所有原 placements 均保存；Spitfire LABS 的 av 和 extensions 两个 placement 均保留。其他 494 个 migration source 行完整不变，包括 Color Claim 和 EA app 的历史行。498 条 original 对象、sourceKey 和原有行顺序完整不变。deduplicated 的 11 条记录及其他 migration 元数据、review 均不变，未将退休计作 merge。

## 7. navigation / legacy 变化

顶层四大区和导航菜单完整不变，20 个 view 保留；仅从对应 section 的 resourceIds 中过滤退休 ID。Spitfire LABS 原有两个 view 引用，因此四个退休实体合计移除 5 个 navigation 引用。

| view | 引用数变化 | section 数变化 |
| --- | --- | --- |
| av | 18 → 17 | 4 → 4 |
| games | 30 → 28 | 8 → 8 |
| film | 15 → 14 | 5 → 5 |
| extensions | 7 → 6 | 2 → 2 |

没有 section 因本轮退休而变空，因此未删除任何 section。游戏下载 section 从 3 个资源减少为 1 个；影视在线从 7 个减少为 6 个；音频制作工具从 8 个减少为 7 个；音频插件与音源从 2 个减少为 1 个。section 名称、previousTitles、顺序和剩余资源顺序不变，没有移动资源填充 section。Color Claim、EA app 的 placement 不变。

legacy 仅从 games 删除 Gamer520、1LOU，从 video-film 删除 HDmoli 的当前 ID；其余 ID 和顺序不变。Spitfire LABS 来源为 ar-music-library，不在本项目 14 个 AR_LEGACY 页面集合中，未伪造 legacy 映射；其历史来源保留于 migration。14 个 legacy page 均保留，原始 `data/resources/*.js` 和历史 HTML 快照未改。

## 8. relatedResources 检查

| 退休实体 | 自己声明 relatedResources | 其他实体引用它 | 处理 |
| --- | --- | --- | --- |
| Gamer520（仅供学习） | 无 | 无 | 没有关系修改 |
| 1LOU（仅供学习） | 无 | 无 | 没有关系修改 |
| HDmoli | 无 | 无 | 没有关系修改 |
| Spitfire LABS | 无 | 无 | 没有关系修改 |

四个退休实体均无自身关系或入向关系，因此所有 remaining relatedResources 完整不变。Color Claim、EA app 保留原 ID，也未改变关系。没有寻找替代目标、增加关系或修改 Blender relatedResources。

## 9. corrections

沿用 `docs/phase-3-corrections.json` 的 changes / before / after 格式，追加 2 条：

- Color Claim：记录 URL、description、links 的前后值及 reason，依据最终外链审计和用户第二批 L2 决定。
- EA app：记录 name、URL、description、links label / URL 的前后值；reason 为“Origin 已由 EA app 取代，旧入口已迁移至 EA 官方 PC 下载体系；根据最终外链审计及用户确认更新。”

旧 15 条 correction 和原有元数据完整不变。四个退休实体没有新增 URL correction，全部由 retired history 负责。confirmedCorrections：15 → 17。

## 10. 数量变化

| 项目 | 修改前 | 修改后 |
| --- | --- | --- |
| catalog entities | 478 | 474 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 9 | 13 |
| views | 20 | 20 |
| legacyPages | 14 | 14 |
| activeURLs | 471 | 467 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 15 | 17 |
| art 当前映射 | 165 | 165 |
| internalLinks | 209 | 209 |

数量来自实际数据和 validator 输出；四个退休实体均为独立 active entity，各有一个 active URL。两项 URL 替换没有新增或减少入口。所有 section 保留，没有新 dedup。

## 11. validator 同步

仅将一处数量基线 `assert.equal(catalog.length, 478)` 同步为 `assert.equal(catalog.length, 474)`。逐字节比较确认，除此之外 `scripts/validate.mjs` 完整不变。active / retired 模型、唯一性、来源覆盖、dangling、navigation、legacy、relation、旧 URL 和历史 placement 校验均未修改。没有增加任何 ID exception，没有跳过或放宽检查。

`node scripts/validate.mjs`：**PASS**。输出：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 474,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 467,
  "confirmedCorrections": 17,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

## 12. git diff --check

`git diff --check`：**PASS**，退出码 0。新增报告另检查无行尾空白，结果通过。

## 13. 实际修改文件

修改：

- `data/catalog.js`
- `data/navigation.js`
- `data/legacy.js`
- `docs/migration-map.json`
- `docs/phase-3-corrections.json`
- `scripts/validate.mjs`

新增：

- `docs/final-l2-cleanup-batch-1.md`

删除项目文件：无。`docs/art-regrouping.json` 保持不变，当前映射仍为 165。没有修改 UI、CSS、HTML、其他 JS 或以前的审计 / 清理报告。

## 14. 不变性验证

修改前对象快照与修改后逐项比较：**PASS**。全部既有文件 SHA-256 对照：**PASS**。

- 除 4 个退休实体和 2 个更新实体外，其余 472 个 catalog 完整对象不变，包括 URL、name、description、type、links、sources、tags 和全部其他字段。
- Color Claim 仅修改 URL、description、主链接 URL；EA app 仅修改 name、URL、description、主链接 label / URL。
- 4K影视、Quixel Bridge、11 个 NO_ACTIVE_URL 的完整对象不变。
- 四个新 retired entity 快照和 placements 精确保留修改前数据；旧 retired 9 条完整不变。
- 旧 confirmedCorrections 15 条完整不变；mergedSources 11 条完整不变。
- 498 条 original、sourceKey、来源位置和原有行顺序不变；其他 494 条 migration source 行完整不变。
- relatedResources 全部不变；所有 previousTitles 不变。
- 顶层导航不变；view 的变化精确等于过滤退休 ID，没有删除 section，其他资源顺序不变。
- legacy 变化精确等于过滤对应退休 ID，其他页面和顺序不变。
- validator 精确只改变 catalog 数量基线；art 映射完整不变。
- 文件对照仅发现第 13 节列出的 6 个文件发生变化，唯一新增为本报告；其他既有文件不变，没有文件删除。

未处理其他 L2/L3，未处理 HTTP → HTTPS 候选、其他被拦截资源或 11 个无 URL 实体；未修改 Firearm Actions、腾祥字库、万兴优转等其他 description / identity，未做新 dedup。未联网扩展搜索，未 commit，未 push。工作区修改前已有的其他改动保留。

