# 设备与环境 → 系统与设备轻量结构整理报告

实施日期：2026-10-06

实施对象：`data/navigation.js` 中 view key 为 `system` 的两个 section 名称。

实施范围：仅重命名 section，并通过现有 `previousTitles` 机制保留 migration 兼容；未审计或调整资源，未联网，未 commit，未 push。

## 1. 修改前结构

| section | 数量 | 资源 |
|---|---:|---|
| 游戏运行与优化 | 1 | PCGamingWiki `res-751a6d512a90` |
| 系统维护与工具 | 4 | 火绒安全 `res-787fd06cb08e`；Clash Verge Rev `res-d7b68315ffd9`；App Cleaner & Uninstaller `res-61e2540c5015`；Scroll Reverser `res-e95bace475c6` |

修改前合计 2 个 section、5 个资源引用、5 个唯一 catalog ID。

## 2. 修改后结构

| section | 数量 | 资源 |
|---|---:|---|
| 运行与故障排查 | 1 | PCGamingWiki `res-751a6d512a90` |
| 系统维护与网络 | 4 | 火绒安全 `res-787fd06cb08e`；Clash Verge Rev `res-d7b68315ffd9`；App Cleaner & Uninstaller `res-61e2540c5015`；Scroll Reverser `res-e95bace475c6` |

本轮只发生以下命名变化：

- `游戏运行与优化` → `运行与故障排查`
- `系统维护与工具` → `系统维护与网络`

两个 section 的 ID、顺序、资源数组和资源顺序均未改变。没有创建空 section。

## 3. 五项资源完整性

| 顺序 | section | 资源 | catalog ID | 验证 |
|---:|---|---|---|---|
| 1 | 运行与故障排查 | PCGamingWiki | `res-751a6d512a90` | 存在，无悬空 |
| 2 | 系统维护与网络 | 火绒安全 | `res-787fd06cb08e` | 存在，无悬空 |
| 3 | 系统维护与网络 | Clash Verge Rev | `res-d7b68315ffd9` | 存在，无悬空 |
| 4 | 系统维护与网络 | App Cleaner & Uninstaller | `res-61e2540c5015` | 存在，无悬空 |
| 5 | 系统维护与网络 | Scroll Reverser | `res-e95bace475c6` | 存在，无悬空 |

验证结果：

- section 数：2。
- 资源引用数：5。
- 唯一 ID 数：5。
- 重复 ID：0。
- 悬空 ID：0。
- Bandizip `res-9eeb06a2a9b2` 未重新进入 system。
- catalog 实体总数仍为 488。
- 当前仍有 20 个 view。

## 4. system 长期定位

本轮只记录已确认的长期边界，不提前创建没有真实内容的 section：

- system 面向系统环境、系统设置、设备与外设配置、运行环境、故障排查、备份与恢复，以及用户自己的设备或系统配置记录。
- software 回答“我要安装、管理或恢复哪些软件？”
- system 回答“我要处理系统、设备、网络或运行环境的什么问题？”
- “系统设置”“设备与外设”“备份与恢复”“虚拟机与运行环境”等潜在分类当前没有对应真实内容，因此本轮未创建空 section。

## 5. software / system 共享状态

以下 4 个同 ID 共享保持不变：

| catalog ID | 名称 | software 位置 | system 位置 |
|---|---|---|---|
| `res-787fd06cb08e` | 火绒安全 | 系统与软件管理 | 系统维护与网络 |
| `res-d7b68315ffd9` | Clash Verge Rev | 系统与软件管理 | 系统维护与网络 |
| `res-61e2540c5015` | App Cleaner & Uninstaller | 系统与软件管理 | 系统维护与网络 |
| `res-e95bace475c6` | Scroll Reverser | 系统与软件管理 | 系统维护与网络 |

Bandizip `res-9eeb06a2a9b2` 继续只存在于 `software → 办公与效率`，未重新加入 system。

software 结构哈希在本轮前后均为：

`26493874d1adf81d1476d9de0b9e70c4f8d420d69991eb3a5f47f31c3a04de71`

因此 software 的 8 个 section、38 个引用及其顺序均未变化。

## 6. migration 兼容处理

`docs/migration-map.json` 中仍有历史 placement 使用旧名称“游戏运行与优化”和“系统维护与工具”。本轮使用项目现有的 `previousTitles` 机制进行兼容：

- `运行与故障排查.previousTitles` 增加 `游戏运行与优化`。
- `系统维护与网络.previousTitles` 增加 `系统维护与工具`。

`node scripts/validate.mjs` 在此兼容方式下直接通过，因此没有修改 migration-map，也没有修改任何 migration 记录。

`docs/migration-map.json` 文件 SHA-256 在本轮前后均为：

`d5692f3f9da12829f0f49daa44d1e957fccb878f7f56601d577c15da7abaaf94`

`scripts/validate.mjs` 未修改，文件 SHA-256 在本轮前后均为：

`96667b4751bbf7e4ac381758b8a3c98770222c553be24dbb1a06becb4786bc94`

## 7. 其他内容不变性

结构哈希复核结果：

| 检查对象 | 本轮前后哈希 | 结果 |
|---|---|---|
| software view | `26493874d1adf81d1476d9de0b9e70c4f8d420d69991eb3a5f47f31c3a04de71` | 未变化 |
| extensions view | `a851e156aa8c8661b996057deec24435cf39236f7af90113b64743ac7d2dbc6c` | 未变化 |
| system 之外其他 19 个 view | `a9ada57c305c90e21fb9f9354bd2433c4c0a478c5f23c94e95313bbbb46d14b1` | 未变化 |
| 顶层 navigation | `31a93d5f59030ee708eb9ceb813f8a08990bed164de407c04a05525f4883ce56` | 未变化 |
| catalog 内容 | `415fd30b915e99a8b162c20e56b72b188f0c3e619e9c71765c9a5fe44f28fc7a` | 未变化 |
| relatedResources | `749cc79b3d9313bab83c8b5d051627c06e55147e13975b0f70c90a0dc5155f60` | 未变化 |

另外：

- `data/catalog.js` 未修改，文件 SHA-256 仍为 `20e78cfe1ac92ca7a97dc792f32912217410c6887f0f02f5c84746a0907e0620`。
- `data/legacy.js` 未修改，文件 SHA-256 仍为 `651bf2e84cc3fe2581b826083bc9b3c9cde5cd3921fdf9f314a20b4fd04251aa`。
- 未修改资源字段、`relatedResources`、跨 view 共享、UI、CSS、JS 或 HTML。

## 8. 验证结果

执行：

```text
node scripts/validate.mjs
```

结果：通过。

```text
Validation passed:
- sources: 498
- entities: 488
- mergedSources: 10
- views: 20
- legacyPages: 14
- activeURLs: 481
- confirmedCorrections: 9
- urlLessRecords: 11
- internalLinks: 209
```

执行：

```text
git diff --check
```

结果：通过，无空白错误。

额外精确断言已通过：两个新标题和对应 `previousTitles` 正确；5 项资源集合、顺序和唯一性正确；无悬空 ID；Bandizip 不在 system；software、extensions、其他 view、catalog 与关系哈希均与本轮基线一致。

## 9. 实际修改文件

本轮实际修改或新增 2 个文件：

1. `data/navigation.js`
   - 重命名 system 的两个 section。
   - 为两个新 section 分别增加一个旧名称 `previousTitles`，用于 migration 兼容。
2. `docs/system-light-cleanup-report.md`
   - 新增本实施报告。

本轮没有修改 `docs/migration-map.json`、`data/catalog.js`、`data/legacy.js`、`scripts/validate.mjs` 或其他文件。

## 10. Git diff / status 摘要

- `git diff --check`：通过。
- 本轮未 commit、未 push。
- 工作树在本轮开始前已有其他修改和未跟踪文件；本轮未清理、覆盖或回退这些既有变化。
- 与本轮直接相关的文件只有 `data/navigation.js` 和 `docs/system-light-cleanup-report.md`。

## 11. 结论

system 已完成轻量命名整理：当前为“运行与故障排查”1 项和“系统维护与网络”4 项，仍为 2 个 section、5 个引用、5 个唯一 ID。资源集合、software/system 共享和其他所有 view 均保持不变；Bandizip 未重新进入 system。旧 migration placement 已由 `previousTitles` 兼容，无需修改 migration-map。validator 与 `git diff --check` 均通过。
