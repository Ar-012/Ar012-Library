# 日常与生活 → 日常工具重组实施报告

实施日期：2026-10-05

实施对象：`data/navigation.js` 中 view key 为 `daily` 的结构，以及两个重复 Google Maps catalog 实体的正式合并

实施依据：`docs/daily-life-overview-audit.md`、`docs/daily-tools-resource-audit.md` 与用户确认的最终方案

限制：本轮未联网；未修改其他 view 的结构；未处理其他数据质量问题；未新增 UI、CSS、JS、HTML 或交互；未 commit；未 push。

## 1. 修改前结构

实施前 `daily` 有 6 个 section、30 个资源引用、30 个唯一 ID：

| 顺序 | section | 数量 |
|---:|---|---:|
| 1 | 互联网资源索引 | 8 |
| 2 | 阅读与电子书 | 6 |
| 3 | 网盘资源 | 9 |
| 4 | 邮箱服务 | 3 |
| 5 | 其他工具 | 3 |
| 6 | 地图 | 1 |

“其他工具”中的三项实际全部是地图；“网盘资源”混合了五个搜索入口和四个云存储服务；两个不同 catalog ID 均表示 Google Maps。

## 2. 修改后六组结构

实施后 `daily` 仍有 6 个 section，变为 29 个资源引用、29 个唯一 ID：

| 顺序 | section | 数量 | 变化 |
|---:|---|---:|---|
| 1 | 资源导航 | 8 | 原“互联网资源索引”改名，不拆分 |
| 2 | 阅读与电子书 | 6 | 原样保留 |
| 3 | 网盘搜索 | 5 | 从原“网盘资源”拆出搜索入口 |
| 4 | 云存储 | 4 | 从原“网盘资源”拆出存储服务 |
| 5 | 邮箱服务 | 3 | 原样保留 |
| 6 | 地图 | 3 | 合并原“其他工具”和“地图”，并去除重复 Google Maps 实体 |

最终数量严格为 `8 / 6 / 5 / 4 / 3 / 3`。

为兼容第一阶段 migration 记录，仅在相关新 section 使用 `previousTitles`：

- 资源导航：`互联网资源索引`
- 网盘搜索：`网盘资源`
- 云存储：`网盘资源`
- 地图：`其他工具`

这些字段只用于旧 section 标题映射，不生成额外卡片或 UI。

## 3. 六组完整资源清单与 ID

### 3.1 资源导航（8）

1. JAY仓库 — `res-d268ccbc6327`
2. 阿虚同学的储物间 — `res-813f7b8a45c2`
3. 下次一定 — `res-9ae7811f88bd`
4. 壳壳博客 — `res-8cb46b50beea`
5. 懒人导航网 — `res-3c8892984c87`
6. 我的书签 — `res-b64bb5b38d5d`
7. 最U导航 — `res-8824cf5d312a`
8. 轻工具 — `res-ea7afc1c5a05`

### 3.2 阅读与电子书（6）

1. Sobooks — `res-4e4286db6d55`
2. PDF Drive — `res-0402234d84e7`
3. 苦瓜书盘 — `res-3b751e75f487`
4. 走读派 — `res-82a3f65e65ad`
5. 鸠摩搜索 — `res-4478f060c286`
6. 书享家 — `res-6cf1e7e339ad`

### 3.3 网盘搜索（5）

1. 超能搜 — `res-f319d4efdf9b`
2. 大力盘搜索 — `res-bdeb3a9a419e`
3. 懒盘搜索 — `res-ef5fe97e75de`
4. 易搜 — `res-36805b0d46a7`
5. 夸克盘搜 — `res-a4b6505f442c`

### 3.4 云存储（4）

1. 百度网盘 — `res-305ce2f2af53`
2. 谷歌云盘 — `res-6c78c06d318b`
3. MEGA — `res-71216ea7e989`
4. 曲奇云盘 — `res-f2c13ee8730d`

### 3.5 邮箱服务（3）

1. Outlook — `res-51a9f53ce4dd`
2. 163邮箱 — `res-6d2a0c0ae5e7`
3. 126邮箱 — `res-3d3efba8821a`

### 3.6 地图（3）

1. 相约久久地图 — `res-542f49f089be`
2. OpenStreetMap — `res-5c09ca7fe676`
3. 谷歌地图 — `res-f1f736c6c199`

清单检查：共 29 项，29 个唯一 ID；没有遗漏、重复或悬空引用。

## 4. Google Maps 重复实体证据摘要

被合并的两个实体为：

| 角色 | ID | name | URL | 原始 source |
|---|---|---|---|---|
| 淘汰 | `res-d8773ad6b7a9` | 谷歌地图 | `http://www.google.cn/maps/@40.0026477,116.3455469,15.85z/` | `daily-essentials:5:3` |
| 保留 | `res-f1f736c6c199` | 谷歌地图 | `https://www.google.com/maps/` | `history:0:0` |

合并依据：两者名称相同，URL 都指向 Google Maps，description 都是泛化地图用途，type/topics/contexts 相同；旧固定坐标入口没有表达独立功能。差异来自旧页面来源和入口状态，而不是不同服务。

## 5. 实际合并方式

正式保留 `res-f1f736c6c199`，其展示字段保持：

- name：谷歌地图
- description：现代地图参考
- url：`https://www.google.com/maps/`
- links：只保留通用 HTTPS Google Maps 链接
- type：`website`

正式从 active catalog 删除 `res-d8773ad6b7a9`。旧 `google.cn` 固定坐标 URL 没有加入保留实体的 links，且不再出现在任何 active catalog URL/links 中。

该旧 ID 也不再出现在当前 navigation 或 legacy 映射中；它只保留在 migration 的审计记录字段 `retiredResourceId` 以及历史审计文档中。

## 6. source 合并结果

保留实体 `res-f1f736c6c199.sources` 现在严格为：

```text
history:0:0
daily-essentials:5:3
```

两个第一阶段 source 均未丢失。除 `sources` 增加第二个历史来源外，保留实体的其他字段与实施前逐字段一致。

## 7. legacy / migration 兼容处理

### legacy

- `daily-essentials` legacy 中原 `res-d8773ad6b7a9` 最小替换为 `res-f1f736c6c199`。
- `history` legacy 继续引用 `res-f1f736c6c199`。
- 两个 legacy 页面分别解析到同一保留实体；各自数组内部没有重复 ID。
- 其余 13 个 legacy 映射逐数组完全不变。

### migration

- `daily-essentials:5:3` 的 migration row 从淘汰 ID 改指保留 ID。
- `history:0:0` 继续指向保留 ID。
- migration row 总数仍为 498，两个 source 都能由保留实体的 `sources` 反向验证。
- `resourceCount` 从 489 更新为 488。
- `deduplicated` 新增一条明确记录：`res-d8773ad6b7a9 → res-f1f736c6c199`；原因是 `duplicate entity / same Google Maps service`。
- 记录同时注明：保留通用 HTTPS 入口、合并两个历史 source、不保留旧固定坐标 URL。
- deduplicated 记录数从 9 增至 10；其他九条原记录完全不变。

### validation 兼容

校验器的固定 catalog 数量更新为 488。针对本次已审计的实体合并，校验器只允许 migration `deduplicated` 中明确满足以下全部条件的旧 URL 不再出现在 active links：sourceKey、保留 resourceId、原 URL、`discardOriginalURL: true` 和当前 retainedURL 必须全部匹配。其他未获审计记录批准的历史 URL 丢失仍会失败。

## 8. catalog 489 → 488 验证

| 检查 | 结果 |
|---|---|
| 实施前 catalog 数量 | 489 |
| 实施后 catalog 数量 | 488 |
| 删除实体 | 仅 `res-d8773ad6b7a9` |
| 新增实体 | 0 |
| `res-f1f736c6c199` 仍存在 | 是 |
| 其余 487 个非合并实体逐字段不变 | 是 |
| 保留实体除 sources 外的字段不变 | 是 |
| 旧固定坐标 URL 仍为 active URL/link | 否 |

基线程序逐 ID、逐字段比较了实施前后的 catalog；没有发现任何无关实体变化。

## 9. daily 30 → 29 验证

| 检查 | 结果 |
|---|---|
| 实施前引用 / 唯一 ID | 30 / 30 |
| 实施后引用 / 唯一 ID | 29 / 29 |
| section 数量 | 6 |
| section 数量序列 | 8 / 6 / 5 / 4 / 3 / 3 |
| 淘汰 ID 仍被 navigation 引用 | 否 |
| 三个地图实体均只在“地图”section | 是 |
| “其他工具”section | 已取消 |

`30 → 29` 只来自两个 Google Maps 实体合并，没有删除独立资源。

## 10. 跨 view 共享验证

重组后 daily 的 29 项中，唯一跨 view 共享仍是：

| ID | 名称 | daily 位置 | 共享位置 |
|---|---|---|---|
| `res-305ce2f2af53` | 百度网盘 | 日常与生活 → 日常工具 → 云存储 | 设备与环境 → 软件 → 办公与开发 |

- 百度网盘共享保持不变。
- 谷歌云盘、MEGA、曲奇云盘没有新增设备环境共享。
- 没有新增任何其他 daily 跨 view 共享。

## 11. relatedResources 验证

- daily 29 项均未新增 `relatedResources`。
- 没有其他实体新增指向这些 daily 实体的 inbound relation。
- 两个 Google Maps 通过实体合并处理，没有建立 relatedResources。
- 163邮箱与126邮箱、网盘搜索与云存储、地图服务之间、导航站之间均未新增关联。

## 12. 未处理的数据质量问题

以下既有问题按要求保持原状：

- 走读派、书享家、超能搜仍使用 HTTP URL。
- Outlook 入口保持不变。
- 既有 link-check 中的 403、超时、连接重置和非标准状态没有联网复核或修改。
- 所有剩余资源的 name、description、type、URL 和 links 均未因本次结构调整改写。
- 旧 `google.cn` 固定坐标 URL 只作为 migration 审计原值保留，不是 active link。

合并后 daily 的既有本地 link-check 汇总相当于 18 项 responded、11 项 unconfirmed；本轮没有重新联网检查。

## 13. 其他 view 与顶层导航不变性

基于实施前快照逐结构比较：

- 除 `daily` 外的其他 19 个 view 完全不变。
- 四大区顶层 `AR_NAVIGATION` 完全不变。
- `daily` view key、area 和 title 保持不变。
- 20 个 view 仍全部存在。
- 14 个 legacy 页面仍全部存在并可解析。

## 14. validate 结果

执行：

```text
node scripts/validate.mjs
```

结果：`PASS`

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

`git diff --check`：通过，无空白错误。

## 15. 浏览器验证结果

本轮浏览器验证 **未执行**。

原因：本机有 `npx`，但没有本地或全局安装 `@playwright/cli`；尝试仅使用本地 npm 缓存离线解析时返回 `ENOTCACHED`。用户禁止联网，因此没有下载或安装依赖，也没有启动 1440px / 390px 浏览器测试。

因此以下项目本轮没有宣称通过：

- 六组快速导航的实机显示
- 29 张卡片的浏览器渲染
- 响应式横向溢出
- JavaScript pageerror

没有把任何旧浏览器测试结果当作本轮结果。静态数据和通用渲染机制已由 validator 验证，但不替代实机浏览器检查。

## 16. 本轮文件变更

本轮实际修改：

- `data/navigation.js`：只重组 `daily` 的 section。
- `data/catalog.js`：删除重复实体；为保留的 Google Maps 合并第二个 source。
- `data/legacy.js`：只把 `daily-essentials` 中的淘汰 ID 改为保留 ID。
- `docs/migration-map.json`：更新资源数、source 映射并新增 Google Maps deduplicated 审计记录。
- `scripts/validate.mjs`：更新 catalog 预期数量，并验证经 deduplicated 明确批准的旧 URL 淘汰。
- `docs/daily-tools-regrouping-report.md`：本报告。

未修改其他 view、顶层导航、旧资源快照、旧 HTML、UI、CSS、运行时 JS、link-check、corrections 或其他迁移关系。

## 17. Git diff / status 摘要

相对于本轮开始时保存的文件快照，只有上一节列出的五个现有文件发生实施性修改，并新增本报告。差异内容与确认方案一致。

仓库在本轮开始前已经存在大量已修改和未跟踪文件；本轮没有清理、回退或覆盖这些既有改动。由于 `data/catalog.js`、`data/legacy.js`、`docs/`、`scripts/` 在当前整体工作树中原本已属于未跟踪路径，普通 Git diff 不能完整反映本轮内部变化；本报告中的不变性结论来自本轮开始前的独立快照逐字段比较。

未 commit，未 push。
