# 最终外链清理 · 第三批 L2

执行日期：2026-10-07。完成 4 个实体退休、reeoo 与 Microsoft 365 入口更新，以及一条指向退休实体的关系清理。沿用现有 retired schema。未处理其他 L2/L3，未联网扩展搜索，未 commit，未 push。

## 1. 本轮范围

退休臭蛋蛋影视、NOVIP、网飞猫备用、许搜；保留并更新 reeoo、Microsoft 365；美叶完整保持不变。除此之外，仅清理主网飞猫指向备用实体的当前关系和必要引用 / 历史 / 数量同步。依据既有 `docs/final-link-health-audit.md` 和用户决定，没有请求最新地址、查找其他入口或创建替代资源。

修改前在 `/tmp` 保存对象快照及全部既有文件 SHA-256；临时脚本没有加入项目。

## 2. 臭蛋蛋影视 退休结果

| 字段 | 退休前 / 结果 |
| --- | --- |
| resourceId | res-785189f2a495 |
| URL | https://cddys.vip/ |
| sourceKey | video-film:1:2 |
| placement | film / 聚合搜索 |
| reason | 当前入口已变为地址发布页，不再作为稳定直接影视资源入口；用户决定不再保留此资源。 |

已从当前 catalog、navigation 和 video-film legacy 映射中移除；完整实体快照、URL / links、sources、原始来源和 placement 通过既有 retired 机制保留。未创建 URL correction、替代实体或新的 merge。

审计记录的跳转目标为地址发布页。本轮按用户决定退休，没有查找最新地址，也没有宣称服务永久关闭。

## 3. NOVIP 退休结果

| 字段 | 退休前 / 结果 |
| --- | --- |
| resourceId | res-952a2a8ef0d5 |
| URL | https://findno.tv/ |
| sourceKey | video-film:0:8 |
| placement | film / 影视在线 |
| reason | 当前入口已转为地址导航 / 发布页，不再作为稳定直接影视入口；用户决定退休。 |

已从当前 catalog、navigation 和 video-film legacy 映射中移除；完整实体快照、URL / links、sources、原始来源和 placement 通过既有 retired 机制保留。未创建 URL correction、替代实体或新的 merge。

按用户决定撤下当前地址导航 / 发布页用途，没有寻找新的观影地址。

## 4. 网飞猫备用 退休结果

| 字段 | 退休前 / 结果 |
| --- | --- |
| resourceId | res-c68a509f5bf8 |
| URL | https://dl.ncat22.com/ |
| sourceKey | video-film:0:3 |
| placement | film / 影视在线 |
| reason | 当前备用入口主要变为 App 发布 / 安装指导页面，不再承担原简单备用影视入口用途；用户决定退休。 |

已从当前 catalog、navigation 和 video-film legacy 映射中移除；完整实体快照、URL / links、sources、原始来源和 placement 通过既有 retired 机制保留。未创建 URL correction、替代实体或新的 merge。

仅退休备用实体；主“网飞猫”的 URL、name、description、type 等字段不变，仅删除指向此备用 ID 的 relatedResources，具体见第 11 节。备用实体自身没有 relatedResources，其完整退休前快照原样保存。

## 5. 许搜 退休结果

| 字段 | 退休前 / 结果 |
| --- | --- |
| resourceId | res-2bcf6236e8a3 |
| URL | https://xn--p3tv7h.com/ |
| sourceKey | video-film:1:0 |
| placement | film / 聚合搜索 |
| reason | 当前实际用途为网盘资源搜索；用户决定资料库不再保留此类资源。 |

已从当前 catalog、navigation 和 video-film legacy 映射中移除；完整实体快照、URL / links、sources、原始来源和 placement 通过既有 retired 机制保留。未创建 URL correction、替代实体或新的 merge。

这是用户基于收藏需求作出的决定，不是死链判断；未修改 description 后继续保留，未寻找其他网盘搜索资源。

## 6. reeoo 更新结果

确认 ID：`res-637c9b7a090c`。既有审计记录旧入口经 301 → 308 → 200 到达 `https://reeoo.com/app/`，最终标题为 App Design Inspiration & Mobile UI Examples - Reeoo。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | https://iphone.reeoo.com/ | https://reeoo.com/app/ |
| description | 网页设计优秀案例，配色参考 | 网页与 App 界面设计灵感参考。 |
| 主 links URL | https://iphone.reeoo.com/ | https://reeoo.com/app/ |

旧描述强调配色，未准确表达现 App 界面灵感定位，按用户建议做最小调整。名称和主链接 label 继续为 `reeoo`；原 ID、type、placement、sources、tags 及其他字段不变。旧 URL 不再 active，保留于 migration original / correction before；没有扩展分类或额外寻找其他入口。

## 7. Microsoft 365 更新结果

确认 ID：`res-4f1bcebf4af3`。既有审计记录旧 portal 经 302 → 200 到达 Microsoft 官方新入口。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | https://www.microsoft365.com/ | https://m365.cloud.microsoft/ |
| 主 links URL | https://www.microsoft365.com/ | https://m365.cloud.microsoft/ |
| description | 微软办公套件云服务，在线协作 | 微软办公套件云服务，在线协作（保持不变） |

当前 description 仍准确描述服务用途，因此未修改。名称、label、原 ID、type、placement、sources 等其他字段不变。旧 portal 不再 active，原地址保留于 migration original / correction before；未查找另一个替代入口。

## 8. 美叶保持不变

`res-1ae22675a24d` 的完整对象及 placement 与修改前精确相等，包括 name、URL、description、type、links、tags、sources 和 relatedResources。未调查、更新、退休或创建 correction。

## 9. retired history / migration

- 在现有 `migration.retired` 尾部追加 4 条记录，保存 resourceId、reason、完整 entity 快照和全部原 placements。
- 对应 4 个 source 行增加 `status: "retired"` 和 retiredResourceId，当前 resourceId 置为 null。
- 原 sourceKey、original、URL / links 历史事实、project/page/group/gi/ri、reason 和 destinations 保持不变；退休 destinations 继续作为历史位置校验。
- resourceCount：474 → 470；sources 仍为 498，没有删除或重新分配历史 source。

旧 13 条 retired 记录完整不变。新增四条 entity 快照和 placements 与退休前对象精确相等；其他 494 个 migration source 行完整不变，包括两项 URL 更新实体的历史行。498 条 original、sourceKey 和原有行顺序不变。11 条 deduplicated、sourceCounts、review 等其他元数据完整不变。未把任何 source 指向无关资源，未增加 merge。

## 10. navigation / legacy

顶层四大区和导航菜单完整不变，20 个 view 均保留。四个退休实体都只有一个 film placement，因此 film 的引用数 14 → 10；其 5 个 section 全部保留。

| section | 资源数变化 | 处理 |
| --- | --- | --- |
| 影视在线 | 6 → 4 | 过滤 NOVIP、网飞猫备用 |
| 聚合搜索 | 3 → 1 | 过滤臭蛋蛋影视、许搜 |

没有 section 变空，因此未删除任何 section；名称、previousTitles、section 顺序和剩余资源顺序不变。没有移动其他资源填充 section。reeoo、Microsoft 365 和美叶的 placement 不变，其他 view 完整不变。

legacy 仅从 video-film 当前 ID 数组中过滤四个退休 ID；其他 13 个页面映射和全部剩余 ID 顺序不变。14 个 legacy page 均保留，原始 `data/resources/*.js` 与历史 HTML 快照未修改。

## 11. relatedResources

| 退休实体 | 自己声明关系 | 其他实体入向关系 | 处理 |
| --- | --- | --- | --- |
| 臭蛋蛋影视 | 无 | 无 | 无关系修改 |
| NOVIP | 无 | 无 | 无关系修改 |
| 网飞猫备用 | 无 | 网飞猫 → 网飞猫备用 | 删除当前入向关系 |
| 许搜 | 无 | 无 | 无关系修改 |

主网飞猫 ID 为 `res-0310c06e735b`。其唯一变化：

```json
{
  "before": {
    "relatedResources": [
      "res-c68a509f5bf8"
    ]
  },
  "after": {
    "relatedResources": []
  }
}
```

保留 relatedResources 字段为空数组，URL、name、description、type、links、tags、sources 等所有其他字段精确不变。没有新增备用目标、改到其他影视站或创建替代 relation。除这一条清理外，其他 relatedResources 完全不变；当前所有关系均不再引用四个退休 ID。

当前关系边数：22 → 21。validator 的 internalLinks 是顶层 HTML 静态本地 href / src 计数，不是 relatedResources 边数，因此仍为 209；没有为维持 209 而保留失效关系。

## 12. corrections

按现有 `docs/phase-3-corrections.json` changes / before / after 格式，追加 reeoo、Microsoft 365 两条 correction：

- reeoo：记录 URL、description、links 的前后值和 reason；依据最终外链审计及用户第三批 L2 决定。
- Microsoft 365：记录 URL、links 的前后值和官方 portal 迁移 reason；description 不变，未作为修改字段记录。

旧 17 条 correction 和原有元数据完整不变。四个退休实体没有新增 URL correction，其历史由 retired 机制负责。confirmedCorrections：17 → 19。

## 13. 数量变化

| 项目 | 修改前 | 修改后 |
| --- | --- | --- |
| catalog entities | 474 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 13 | 17 |
| views | 20 | 20 |
| legacyPages | 14 | 14 |
| activeURLs | 467 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 17 | 19 |
| art 当前映射 | 165 | 165 |
| internalLinks（静态本地链接） | 209 | 209 |
| relatedResources edges | 22 | 21 |

四个退休实体均为独立 active entity，各有一个来源和一个 active URL，实际减少 4 个实体和 4 个入口。两个 URL 替换不改变 active URL 数，数量均经实际数据验证。

## 14. validator 同步

仅将 `assert.equal(catalog.length, 474)` 同步为 `assert.equal(catalog.length, 470)`。逐字节比较确认，除此之外 validator 完整不变；没有改 retired 模型、增加 ID 特例、跳过检查或放宽 relatedResources / dangling / source / retired 校验。internalLinks 没有需要同步的硬编码数量。

`node scripts/validate.mjs`：**PASS**。输出：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 470,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 463,
  "confirmedCorrections": 19,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

## 15. git diff --check

`git diff --check`：**PASS**，退出码 0。新增报告另检查无行尾空白，结果通过。

## 16. 修改文件

修改：

- `data/catalog.js`
- `data/navigation.js`
- `data/legacy.js`
- `docs/migration-map.json`
- `docs/phase-3-corrections.json`
- `scripts/validate.mjs`

新增：

- `docs/final-l2-cleanup-batch-2.md`

删除项目文件：无。art-regrouping、UI、CSS、HTML、其他 JS、原始快照及以前的审计 / 清理报告均未修改。

## 17. 不变性验证

对象级精确比较与全部既有文件 SHA-256 对照：**PASS**。

- 四个退休对象的完整 entity / placements 精确保留；旧 13 条 retired records 完整不变。
- reeoo 仅改 URL、description、主 links URL；Microsoft 365 仅改 URL 和主 links URL。
- 主网飞猫仅从 relatedResources 删除备用 ID，其他字段完整不变。
- 排除以上 7 个涉及对象后，其余 467 个 catalog 完整对象精确不变，包括美叶、Quixel Bridge、4K影视、Color Claim、EA app 和 11 个 NO_ACTIVE_URL。
- 旧 17 条 corrections、11 条 mergedSources 完整不变。
- 498 条 original、sourceKey、来源位置和原有行顺序不变，其他 494 个 migration source 行完整不变。
- 除网飞猫指向备用的关系外，其他 relatedResources 完全不变；当前无关系引用退休 ID。
- navigation 变化精确等于过滤四个退休 ID，剩余顺序不变，没有删除 section；所有 previousTitles 不变。
- legacy 变化精确等于过滤四个退休 ID，其他页面和顺序不变。
- 美术映射完整不变，仍为 165；validator 精确只改实体数量基线。
- 文件对照仅发现第 16 节列出的 6 个文件变化，唯一新增为本报告，没有文件删除；其他既有文件完整不变。

未处理其他 L2/L3，未处理 HTTP → HTTPS 候选、无 URL 实体、其他被拦截资源、Firearm Actions、腾祥字库、万兴优转、版本化手册或 previousTitles 清理，未做新 dedup。未联网扩展搜索，未 commit，未 push。工作区修改前已有的其他改动保留。

