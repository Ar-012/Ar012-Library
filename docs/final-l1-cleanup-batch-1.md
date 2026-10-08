# 最终外链清理 · 第一批 L1

执行日期：2026-10-07。完成 9 个实体退休和 6 个指定官方入口迁移。没有处理其他 L2 / L3，没有联网扩展搜索，没有 commit，没有 push。

## 1. 本轮处理范围

仅处理用户指定的 15 个实体。退休当前实体不删除历史 source、不伪造替代实体，也不计为新的 merge。Quixel Bridge、其他资源、11 个 NO_ACTIVE_URL 和此前审计报告保持不变。

现有项目仅支持重复合并，没有独立退休机制；原 validator 要求所有 source 指向当前 catalog。执行前已说明这一冲突，并获得用户“允许”确认，授权最小退休记录、严格校验、空 section 与美术映射同步。

## 2. 九个退休实体逐项结果

| 实体 / ID | 历史 URL / sourceKey | 退休原因 |
| --- | --- | --- |
| screenmusings / res-519d07baf26a | https://screenmusings.org/；concept-art:3:2 | 当前入口变为 DreamHost 默认待建页面，原电影剧照库身份失效。 |
| 最U导航 / res-8824cf5d312a | https://www.zuh8.com/；daily-essentials:0:8 | 当前入口连续返回 404。 |
| LIBVIO / res-07222493760e | https://libvio.art/；video-film:0:5 | 当前域名明确声明已停止使用。 |
| Loveblush Bridal / res-df5f19bf8bfd | http://www.loveblushbridal.com/；costume-fashion-design:0:5 | 当前页面不符合婚礼高定服装商城身份，入口价值低且身份异常。 |
| lughertexture / res-72b102f13e59 | https://www.lughertexture.com/；3d-art:3:2 | 当前入口跨域跳到无关纸艺路径，出现 Cloudflare Suspected Phishing 警告。 |
| JAY仓库 / res-d268ccbc6327 | https://www.likejay.cn/；daily-essentials:0:0 | 当前入口跳入 urldance 第三方路由体系，不再是原资源站。 |
| 我的书签 / res-b64bb5b38d5d | https://it-cxy.top/；daily-essentials:0:7 | 当前入口跳入 urldance 第三方路由体系，不再是原书签或资源导航站。 |
| 555电影 / res-835a4838f864 | https://www.55boy.wiki/；video-film:0:0 | 当前入口跳入 urldance 第三方路由体系，不再是原影视入口。 |
| 好猫字幕组_语雀 / res-40c5ab9202a0 | https://www.yuque.com/ue4y5t；3d-art:3:24 | 当前语雀地址跳到汽车可视化课程页，与原游戏开发知识库身份不匹配。 |

以上 9 个完整对象已从当前 catalog 移除，navigation 和 legacy 的当前引用均移除。每个实体只有 1 个 active URL，共减少 9 个入口。其完整对象继续保存在 `migration.retired[].entity`；原始来源行、original、sourceKey 和历史位置仍保留。

## 3. 六个官方迁移入口逐项结果

| 实体 / ID | 原 URL | 新 URL |
| --- | --- | --- |
| Blender Market / res-7b921cd30d30 | https://blendermarket.com/ | https://superhivemarket.com/ |
| Kimi AI / res-474cbb3dda56 | https://kimi.moonshot.cn/?ref=qinggongju.com | https://www.kimi.com/ |
| Vite / res-0fb5b5874dd8 | https://vitejs.dev/ | https://vite.dev/ |
| 文悦字库 / res-0cae4975a329 | https://wytype.com/ | https://wenyue.cn/ |
| 图虫创意 / res-7c475263bb6b | https://stock.dfic.cn/?source=extbaidudkey7&utm_source=extbaidudkey7 | https://stock.tuchong.com/ |
| Zoom / res-976eeac66264 | https://zoom.us/ | https://www.zoom.com/ |

六项均保留原 ID，同时同步对应主链接的 URL，旧地址未作为 secondary link 保留。Kimi 的新 URL 不含旧 ref 参数。

Blender Market 同步为：

- name：`Blender Market` → `Superhive`。
- description：`Blender专用资源商店` → `原 Blender Market，更名后的 3D 创作者资源市场。`
- 主入口 label：`Blender Market` → `Superhive`。

catalog 原先没有实体 historical name / previousTitles 机制，因此未为实体增加新字段。旧名称完整保留在 migration original 和 correction 的 before.name 中；没有新增第二个实体。其他五项名称、description、type 及其他字段不变。

## 4. Quixel Bridge 保持不变

`res-5ee7019b67b3` 的完整对象与修改前精确相等。name、URL、description、type、links、sources、relatedResources 等字段均未修改，未查找 Bridge / Fab 替代入口。

## 5. catalog / navigation / legacy 修改

catalog：删除 9 个对象，修改 6 个对象的指定字段；其余 472 个完整对象精确不变。

navigation：仅过滤退休 ID；顶层四大区和导航菜单完整不变，20 个 view 保留，其他 section 名称、顺序及剩余资源顺序不变。

| view | 引用数变化 | section 数变化 |
| --- | --- | --- |
| art | 167 → 165 | 21 → 21 |
| 3d | 48 → 47 | 5 → 5 |
| game-study | 6 → 5 | 2 → 1 |
| film | 17 → 15 | 5 → 5 |
| daily | 29 → 26 | 6 → 6 |

好猫字幕组是 `game-study / 开发学习资料` 的唯一资源。根据追加授权移除该空 section，避免违反现有非空校验；没有把其他资源移入或移出分类。该 section 的 ID、标题、previousTitles 和旧 placement 保留在退休历史中。其他 view 精确不变。

legacy：仅从 3d-art、concept-art、costume-fashion-design、daily-essentials、video-film 的当前 ID 数组过滤对应退休 ID；14 个 legacy page 均保留，其他 ID 及顺序不变。历史 `data/resources/*.js` 和原始 HTML 快照均未改动。

## 6. migration / corrections 历史保留

migration 使用最小退休结构：

- 新增 `retired` 数组，9 条记录各含 resourceId、reason、完整 entity 快照和退休前实际 placements。
- 对应 9 个 source 行增加 `status: "retired"` 和 `retiredResourceId`，将当前 `resourceId` 置为 null。
- 原行的 original、sourceKey、project、page、group、gi、ri、reason 和 destinations 完整不变；退休行的 destinations 作为历史位置校验，不再要求当前 UI 展示。
- resourceCount：487 → 478；sources 仍为 498，deduplicated 的 11 条记录和 review 完整不变。

498 条 original 对象和 sourceKey 均与修改前一致，退休来源没有转给无关实体，也没有消失。除 9 个退休 source 行的必要状态变化外，其他 489 个 migration source 行完整不变，包括 6 个 URL 迁移资源的历史行。

`docs/phase-3-corrections.json` 沿用现有 changes / before / after 格式，追加 6 条 correction，每条记录 resourceId、旧 URL、新 URL、reason 及依据“最终外链审计确认官方迁移；用户批准第一批 L1”。Superhive 的 correction 额外记录名称和 description、主链接 label 的前后变化。原 9 条 correction 和原第三阶段元数据保持不变；其阶段实体数量是历史快照，不作为本轮当前数量。confirmedCorrections：9 → 15。

本轮不覆盖任何 migration original，不修改最终外链审计及此前报告。

## 7. relatedResources 检查

| 退休实体 | 自身声明关系 | 其他实体引用它 | 处理 |
| --- | --- | --- | --- |
| screenmusings | 无 | 无 | 未修改任何关系 |
| 最U导航 | 无 | 无 | 未修改任何关系 |
| LIBVIO | 无 | 无 | 未修改任何关系 |
| Loveblush Bridal | 无 | 无 | 未修改任何关系 |
| lughertexture | 无 | 无 | 未修改任何关系 |
| JAY仓库 | 无 | 无 | 未修改任何关系 |
| 我的书签 | 无 | 无 | 未修改任何关系 |
| 555电影 | 无 | 无 | 未修改任何关系 |
| 好猫字幕组_语雀 | 无 | 无 | 未修改任何关系 |

六个迁移实体保留原 ID，所有 relatedResources 精确不变。Blender 指向原 Blender Market ID 的关系继续有效，并按当前实体显示 Superhive。没有寻找替代关系、增加关系或修改 Blender relatedResources。

## 8. 数量变化

| 项目 | 修改前 | 修改后 |
| --- | --- | --- |
| catalog entities | 487 | 478 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 0 | 9 |
| views | 20 | 20 |
| legacyPages | 14 | 14 |
| activeURLs | 480 | 471 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 9 | 15 |
| art 引用 / 当前美术映射 | 167 | 165 |
| internalLinks | 209 | 209 |

9 个退休实体均为独立对象，各有一个来源和一个 active URL。六个 URL 替换没有改变入口数量，所有 sources 仍可追溯。

## 9. validator 必要同步与结果

纯数量基线：catalog 487 → 478；art 引用数量与唯一数量 167 → 165。`docs/art-regrouping.json` 删除 screenmusings、Loveblush 两条当前映射，resourceCount 同步为 165；其他 165 条映射完整不变。

经用户追加授权，validator 增加严格退休分支：

- 退休 ID 唯一，不能同时存在于当前 catalog；实体快照 ID 必须匹配。
- 必须有退休原因和历史 placement；快照 sources 与退休 source 行精确对应。
- 退休 source 的当前 resourceId 必须为 null，retiredResourceId 必须指向存在的退休记录。
- 历史 URL 必须仍在退休实体快照中，退休 URL 不得重新成为活动入口；历史 destinations 必须匹配保存的 placement。
- 活动 source 继续执行原有实体存在、source 一致、旧 URL correction / dedup 授权和当前 placement 检查。
- legacy 当前集合与非退休 source 映射一致；原始快照仍对全部来源行逐项校验，包括退休来源。
- 新增美术映射 resourceCount 与实际引用数量一致检查。

没有个别 ID exception，没有跳过退休 source 检查，没有放宽唯一性、dangling 或来源一致性规则。

`node scripts/validate.mjs`：**PASS**。输出：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 478,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 471,
  "confirmedCorrections": 15,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

另在 `/tmp` 使用内存替换执行 9 项拒绝性检查，不改项目文件：缺失退休记录、退休实体重新进入当前库、退休来源归属错误、退休原 URL 丢失、退休历史位置错误、legacy 引用退休实体、当前关系指向退休实体、未批准的其他 URL 修改、移除官方迁移 correction，全部被 validator 拒绝。

## 10. git diff --check

`git diff --check`：**PASS**，退出码 0。新增报告另检查行尾空白，结果通过。

## 11. 实际修改文件

修改：

- `data/catalog.js`
- `data/navigation.js`
- `data/legacy.js`
- `docs/migration-map.json`
- `docs/phase-3-corrections.json`
- `docs/art-regrouping.json`
- `scripts/validate.mjs`

新增：

- `docs/final-l1-cleanup-batch-1.md`

删除项目文件：无。退休实体是上述数据文件中的对象移除，不删除任何原始快照文件。

## 12. 不变性验证

修改前在 `/tmp` 保存 catalog、navigation、legacy、migration、corrections、美术映射的对象快照及全部既有项目文件的 SHA-256。对象级验证结果：**PASS**。

- 其余 472 个 catalog 完整对象不变，包括 URL、description、type、links、tags、sources 等全部字段。
- 6 个迁移对象仅改变指定字段；Superhive 仅另同步名称、description、主入口 label。
- 9 个退休实体的完整快照与修改前对象精确相等。
- Quixel Bridge 完整对象不变；11 个 NO_ACTIVE_URL 完整对象不变。
- relatedResources 全部不变；没有新增实体 previousTitles；除授权删除空 section 外，navigation previousTitles 不变，删除部分保留为历史。
- 顶层导航完整不变；view 的变化精确等于过滤 9 个退休 ID 并删除唯一空 section，剩余资源顺序不变。
- legacy 的变化精确等于过滤退休 ID；其他页面和顺序不变。
- 498 条 original 和历史 sourceKey 不变；其他 489 个 migration source 行不变；deduplicated 和 review 不变。
- 原 9 条 correction 不变；美术映射其他 165 条记录不变。
- 文件哈希对比确认：仅第 11 节的 7 个文件内容变化，唯一新增为本报告，没有删除文件；其他既有文件不变，包括 UI、CSS、HTML、其他 JS、原始资源快照和此前审计报告。

未处理其他 L2 / L3，未升级任何其他 HTTP 链接，未搜索或请求新资源，未补无 URL 实体，未做新 dedup，未 commit，未 push。工作区修改前已有的其他改动保留，没有覆盖。

