# 最终外链清理 · HTTPS 安全升级

执行日期：2026-10-07。**已完成 16 个实体 / 入口的 HTTPS 升级，正式 validator 与 git diff --check 均 PASS。**

## 1. 第一次停止原因与本轮范围

第一次执行因 validator 不支持 secondary-link correction 而停止；随后补充了通用校验能力后重新执行。

首次隔离试验报错：`Unapproved lost URL visual-communication:10:3`。当时正式 catalog 与旧 27 条 corrections 均未修改。此次按继续执行指令修复通用校验，应用已确认清单，并更新本报告。

唯一外链审计依据为 `docs/final-link-health-audit.md` 第 8 节。17 个明确候选中，腾祥字库已在上一轮完成；本轮实际升级剩余 16 个实体 / 入口：15 个主 URL、1 个字由 secondary。未重新联网、未扩展候选、未重新审计。

## 2. validator 通用修复

仅在 `scripts/validate.mjs` 新增 `approvedSecondaryLinkCorrection`，并将它加入 lost historical URL 判断的并行合法路径。原主 URL correction、deduplication、retired、source、数量和字段一致性校验完整保留。

新增逻辑要求：

- correction.resourceId 精确对应当前实体；不能用它解释主 URL 的历史变更。
- before.links / after.links 为完整数组，长度一致；after.links 必须与当前实体 links 整体一致。
- oldUrl 在 before.links 中精确且唯一出现；before.links 仍包含保留的当前主入口。
- 先移除前后完全相同的链接，再按 label 匹配剩余变化。对应不依赖数组 index。
- 剩余 before / after 中对应 label 必须各唯一；非 URL 元数据必须一致，URL 必须确实变化。
- 替换 URL 必须精确存在于当前 active links；未配对、删除无替代、歧义或无法解释的历史 URL 消失仍 FAIL。

字由的两个 label 都为“字由”，但主下载链接完全不变，先排除该链接后，secondary 的变化能唯一匹配。没有通过 label 的首次出现或数组下标猜测对应关系。

本批 16 个 resource ID 均未出现在 validator 中；未写死字由名称、ID、域名或特定 URL exception。没有删除 lost URL 检查，也没有以“存在 correction”一律放行。

## 3. 正向 / 负向验证

正式修改 catalog 前，使用 /tmp 隔离副本执行完整 validator。测试脚本与数据未加入项目，未引入测试框架。

| 场景 | 实测结果 |
| --- | --- |
| 合法 secondary：before 旧 HTTP、after HTTPS、当前 active link 为 HTTPS | PASS，退出码 0 |
| 非法 1：删除 secondary，没有合法替代 | FAIL，退出码 1；Unapproved lost URL |
| 非法 2：after 写 HTTPS，当前 active links 无该 HTTPS | FAIL，退出码 1；Correction regressed |
| 非法 3：correction 属于另一 resourceId | FAIL，退出码 1；Unapproved lost URL |
| 非法 4：before / after 无法唯一匹配对应 link | FAIL，退出码 1；Unapproved lost URL |
| 非法 5：没有 correction，但历史 original URL 消失 | FAIL，退出码 1；Unapproved lost URL |
| 通用匹配：before 数组重排，不依赖 index | PASS |
| 通用匹配：两组同 label 链接同时变化，有歧义 | FAIL，符合预期 |

额外通用匹配测试采用 example.test 合成数据；校验逻辑与测试实现没有资源 ID 特例。五项负向验证均确认错误数据被拒绝。

## 4. 16 个实际升级

| 资源 | resourceId | 修改前 | 修改后 |
| --- | --- | --- | --- |
| 龋齿一号 | `res-d2e7f9db431e` | `http://www.gfxcamp.com/` | `https://www.gfxcamp.com/` |
| airpano | `res-58ed25568c4c` | `http://www.airpano.com/` | `https://www.airpano.com/` |
| silk | `res-e437ff3fc9fd` | `http://weavesilk.com/` | `https://weavesilk.com/` |
| Kostym | `res-87e754063973` | `http://www.kostym.cz/Anglicky/obsah.htm` | `https://www.kostym.cz/Anglicky/obsah.htm` |
| 超能搜 | `res-f319d4efdf9b` | `http://chaonengsou.com/` | `https://chaonengsou.com/` |
| 中国古代史地图 | `res-29b208b30ff4` | `http://home.olemiss.edu/~gg/hstrymap/lishidit.htm` | `https://home.olemiss.edu/~gg/hstrymap/lishidit.htm` |
| 中国蓝光网 | `res-5ef708a662da` | `http://www.languangdy.com/` | `https://www.languangdy.com/` |
| 中国色 | `res-1c0d2a644fd8` | `http://zhongguose.com/#danshuhong` | `https://zhongguose.com/#danshuhong` |
| 千库网 | `res-931a52adccb3` | `http://588ku.com/` | `https://588ku.com/` |
| 方正字库 | `res-157a9b6350b8` | `http://www.foundertype.com/` | `https://www.foundertype.com/` |
| 图翼 | `res-dc3bcae11745` | `http://www.tuyiyi.com/t-7913-1.html` | `https://www.tuyiyi.com/t-7913-1.html` |
| 中文字体-站长素材 | `res-1f407fe6565f` | `http://font.chinaz.com/zhongwenziti.html` | `https://font.chinaz.com/zhongwenziti.html` |
| 汉仪字库 | `res-4a2be2d434fd` | `http://www.hanyi.com.cn/productList.php` | `https://www.hanyi.com.cn/productList.php` |
| 家纺趋势 | `res-1a109a64242b` | `http://www.91jiafang.com/` | `https://www.91jiafang.com/` |
| 设计癖 | `res-7344a6a6a831` | `http://www.shejipi.com/` | `https://www.shejipi.com/` |
| 字由（secondary） | `res-79e7b4b278c2` | `http://www.hellofont.cn/` | `https://www.hellofont.cn/` |

全部仅替换 scheme，域名、路径、query 与 fragment 不变。中国色保留 `#danshuhong`。15 个主入口均同步实体 url 和对应主 links URL；所有 links label 不变。

## 5. 字由 secondary

`res-79e7b4b278c2` 主 URL / 主 links 保持 `https://www.hellofont.cn/download`。

仅 secondary：`http://www.hellofont.cn/` → `https://www.hellofont.cn/`。

correction.before.links 和 after.links 均记录完整数组；变化只有 secondary URL。没有记录伪造的 before.url / after.url。name、description、type、tags、sources、placement、relatedResources 和其他字段不变。

## 6. 未升级资源与原因

- 腾祥字库 `res-a4d546d8288c` 已为 `https://www.tensentype.com/`：完整对象保持不变，没有新增或修改该实体 correction。
- The Costumer's Guide to Movie Costumes `res-fde13a4c0113` 保持 `http://www.costumersguide.com/`：审计未确认正常 HTTPS，存在证书 / 可访问性问题，没有强制升级。
- 其他 HTTP URL 不是本轮明确候选，全部保持原样。
- blocked / unconfirmed、DNS / TLS failure、identity mismatch、redirect identity change、retired 与 11 个 NO_ACTIVE_URL 均未处理。

## 7. corrections：27 → 43

正式新增 16 条：15 条主 URL / links correction，1 条字由 links-only correction。旧 27 条及顶层元数据完整不变。

每条新增 correction 的 resourceId、name、before / after 均与正式实体快照匹配；links 均使用完整数组。统一 reason：

“最终外链审计已确认 HTTPS 入口可正常访问且资源身份不变，升级当前入口协议。”

未给腾祥字库或其他未变化实体追加 correction。

## 8. migration 与历史追溯

`docs/migration-map.json` 完整逐字节不变。498 条 source、sourceKey、original、destinations、17 条 retired records、11 条 deduplicated / mergedSources 全部保留。

旧 HTTP URL 继续作为 original 历史事实。主 URL correction 或新增通用 secondary correction 解释当前 HTTPS active links，没有删除历史入口、伪造 dedup 或移动 source。

## 9. 数量验证

| 项目 | 修改前 | 修改后 |
| --- | --- | --- |
| catalog entities | 470 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 17 | 17 |
| views | 20 | 20 |
| activeURLs | 463 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 27 | 43 |
| art mappings | 165 | 165 |
| relatedResources edges | 21 | 21 |
| internalLinks | 209 | 209 |
| legacyPages | 14 | 14 |

除 confirmedCorrections 外，所有数量不变。

## 10. 正式 validator

`node scripts/validate.mjs`：**PASS**，退出码 0。

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 470,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 463,
  "confirmedCorrections": 43,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

## 11. git diff --check

`git diff --check`：**PASS**，退出码 0。报告行尾空白检查亦 PASS。

## 12. 实际修改文件

- `data/catalog.js`：16 个目标实体的指定 URL / links URL。
- `docs/phase-3-corrections.json`：新增 16 条 correction。
- `scripts/validate.mjs`：通用 secondary-link correction 历史 URL 认可逻辑。
- `docs/final-https-upgrade.md`：将第一次阻塞报告更新为本次最终完成报告，保留第一次停止事实。

没有新增或删除其他项目文件。临时快照、脚本、测试与隔离副本仅位于 /tmp。

## 13. 不变性验证

修改前后 catalog / corrections 快照与全部既有项目文件 SHA-256 对照：**PASS**。

- 16 个目标实体仅发生指定 HTTP → HTTPS URL 字段变化；其他字段完整不变。
- 其他 454 个 catalog 实体完整对象精确不变；实体 ID 和 catalog 顺序不变。
- 全部 name、description、type、tags、sources、relatedResources、previousTitles 不变。
- navigation、placement、section、资源顺序和 legacy 完整不变。
- migration、original、sourceKey、destinations、retired 与 mergedSources 完整不变。
- 旧 27 条 corrections 和元数据精确不变；新增 16 条前后值与快照精确一致。
- Costumer's Guide、腾祥字库、Quixel Bridge、美叶、Blender / UE / Live2D 手册以及 11 个 NO_ACTIVE_URL 完整不变。
- 既有文件对照仅发现第 12 节四个允许文件变化；其他既有项目文件逐字节不变。此前工作区已有改动完整保留。

未重新联网审计；未处理其他 L2/L3；未补 NO_ACTIVE_URL；未退休新实体；未做新 dedup；未 commit；未 push。

本轮完成后，现有外链审计与数据质量清理阶段结束。
