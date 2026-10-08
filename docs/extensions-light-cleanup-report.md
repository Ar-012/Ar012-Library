# 设备与环境 → 插件与扩展轻量结构整理报告

实施日期：2026-10-06

实施对象：`data/navigation.js` 中 view key 为 `extensions` 的两个 section 名称。

实施范围：仅重命名 section，并通过现有 `previousTitles` 机制保留 migration 兼容；未审计或调整资源，未联网，未 commit，未 push。

## 1. 修改前结构

| section | 数量 | 资源 |
|---|---:|---|
| 3D插件与手册 | 5 | Blender Extension；KIT OPS 2 Manual；boxcutter手册；MESHmachine参考手册；blender魔酷网 |
| 音频插件与音色 | 2 | Spitfire LABS；Native Instruments |

修改前合计 2 个 section、7 个资源引用、7 个唯一 catalog ID。

## 2. 修改后结构

| section | 数量 | 资源 |
|---|---:|---|
| 3D扩展与资源 | 5 | Blender Extension；KIT OPS 2 Manual；boxcutter手册；MESHmachine参考手册；blender魔酷网 |
| 音频插件与音源 | 2 | Spitfire LABS；Native Instruments |

本轮只发生以下命名变化：

- `3D插件与手册` → `3D扩展与资源`
- `音频插件与音色` → `音频插件与音源`

顶层 view 名称“插件与扩展”保持不变。两个 section 的 ID、顺序、资源数组和资源顺序均未改变，也没有创建空 section。

## 3. 七项资源完整性

| 顺序 | section | 资源 | catalog ID | 验证 |
|---:|---|---|---|---|
| 1 | 3D扩展与资源 | Blender Extension | `res-90bbea3931de` | 存在，无悬空 |
| 2 | 3D扩展与资源 | KIT OPS 2 Manual | `res-782ef7ee4731` | 存在，无悬空 |
| 3 | 3D扩展与资源 | boxcutter手册 | `res-0cca09db33fd` | 存在，无悬空 |
| 4 | 3D扩展与资源 | MESHmachine参考手册 | `res-76887030b7a3` | 存在，无悬空 |
| 5 | 3D扩展与资源 | blender魔酷网 | `res-8d8eacb7c555` | 存在，无悬空 |
| 6 | 音频插件与音源 | Spitfire LABS | `res-6ef506a8e309` | 存在，无悬空 |
| 7 | 音频插件与音源 | Native Instruments | `res-efe4c2b50a33` | 存在，无悬空 |

验证结果：

- section 数：2。
- 资源引用数：7。
- 唯一 ID 数：7。
- 重复 ID：0。
- 悬空 ID：0。
- 修改前后 7 个 ID 的集合与顺序完全一致。
- catalog 实体总数仍为 488。
- 当前仍有 20 个 view。

## 4. extensions 长期定位

“插件与扩展”继续同时承担安装/恢复记录与插件、扩展资源库两类职责，主要容纳：

- 主软件的插件、扩展、Add-ons 和附加组件。
- 音频插件与音源。
- 与插件或扩展生态直接相关的官方入口、插件商店、手册和资源网站。

边界保持为：

- software：主程序环境。
- extensions：主程序之外、依附或扩展主程序能力的扩展环境。
- system：系统、设备、网络、运行环境、故障排查和备份恢复。

手册或资源网站只要直接服务于插件/扩展生态，就可以继续存在于 extensions。未来可在出现真实内容后增加“图像与设计扩展”“开发扩展”等 section；本轮没有提前创建任何空 section。

## 5. 与创作区共享状态

7 项资源与创作区的同 ID 共享全部保持不变：

| catalog ID | 名称 | extensions 位置 | 创作与工作位置 |
|---|---|---|---|
| `res-90bbea3931de` | Blender Extension | 3D扩展与资源 | 3D → 手册与插件 |
| `res-782ef7ee4731` | KIT OPS 2 Manual | 3D扩展与资源 | 3D → 手册与插件 |
| `res-0cca09db33fd` | boxcutter手册 | 3D扩展与资源 | 3D → 手册与插件 |
| `res-76887030b7a3` | MESHmachine参考手册 | 3D扩展与资源 | 3D → 手册与插件 |
| `res-8d8eacb7c555` | blender魔酷网 | 3D扩展与资源 | 3D → 教程与社区 |
| `res-6ef506a8e309` | Spitfire LABS | 音频插件与音源 | 音频与视频 → 音频制作工具 |
| `res-efe4c2b50a33` | Native Instruments | 音频插件与音源 | 音频与视频 → 音频制作工具 |

共享语义没有变化：创作区表达实际制作场景，extensions 表达扩展环境的安装、恢复和资源入口。本轮没有删除或新增跨 view 共享。

## 6. relatedResources 不变性

本轮没有修改任何 `relatedResources`。Blender 已有的相关插件、手册和资源关系继续保留，与 extensions 中的独立资源入口并存：

- `relatedResources` 用于从主软件卡片快速进入相关资源。
- extensions 用于从扩展环境角度集中浏览。

两者用途不同，不构成冲突，也没有因此从 extensions 删除任何实体。

全部 catalog 关系结构哈希在本轮前后均为：

`749cc79b3d9313bab83c8b5d051627c06e55147e13975b0f70c90a0dc5155f60`

## 7. migration 兼容处理

`docs/migration-map.json` 中有 5 条 3D 资源 placement 使用旧名称“3D插件与手册”，另有 2 条音频资源 placement 使用旧名称“音频插件与音色”。本轮使用项目现有的 `previousTitles` 机制兼容：

- `3D扩展与资源.previousTitles` 增加 `3D插件与手册`。
- `音频插件与音源.previousTitles` 增加 `音频插件与音色`。

`node scripts/validate.mjs` 在此兼容方式下直接通过，因此没有修改 migration-map，也没有修改任何 migration 记录。

`docs/migration-map.json` 文件 SHA-256 在本轮前后均为：

`d5692f3f9da12829f0f49daa44d1e957fccb878f7f56601d577c15da7abaaf94`

`scripts/validate.mjs` 未修改，文件 SHA-256 在本轮前后均为：

`96667b4751bbf7e4ac381758b8a3c98770222c553be24dbb1a06becb4786bc94`

## 8. 其他内容不变性

结构哈希复核结果：

| 检查对象 | 本轮前后哈希 | 结果 |
|---|---|---|
| software view | `26493874d1adf81d1476d9de0b9e70c4f8d420d69991eb3a5f47f31c3a04de71` | 未变化 |
| system view | `764df8ecf2647368f6e48cd5375a25309963ad14f7816f3c3a45f5b7e5bebe46` | 未变化 |
| extensions 之外其他 19 个 view | `92addf8ee98bc78caf47c0ec61d99a067c3bf06bca0904804e08ce53d60c531a` | 未变化 |
| 顶层 navigation | `31a93d5f59030ee708eb9ceb813f8a08990bed164de407c04a05525f4883ce56` | 未变化 |
| catalog 内容 | `415fd30b915e99a8b162c20e56b72b188f0c3e619e9c71765c9a5fe44f28fc7a` | 未变化 |
| relatedResources | `749cc79b3d9313bab83c8b5d051627c06e55147e13975b0f70c90a0dc5155f60` | 未变化 |

另外：

- `data/catalog.js` 未修改，文件 SHA-256 仍为 `20e78cfe1ac92ca7a97dc792f32912217410c6887f0f02f5c84746a0907e0620`。
- `data/legacy.js` 未修改，文件 SHA-256 仍为 `651bf2e84cc3fe2581b826083bc9b3c9cde5cd3921fdf9f314a20b4fd04251aa`。
- 未修改任何资源字段、URL、type、跨 view 共享、UI、CSS、JS 或 HTML。

## 9. validate 结果

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

额外精确断言已通过：两个新标题和对应 `previousTitles` 正确；7 项资源的集合、顺序、唯一性和 catalog 解析均正确；software、system、其他 view、catalog、关系和顶层 navigation 均与本轮基线一致。

## 10. 实际修改文件

本轮实际修改或新增 2 个文件：

1. `data/navigation.js`
   - 重命名 extensions 的两个 section。
   - 为两个新 section 分别增加一个旧名称 `previousTitles`，用于 migration 兼容。
2. `docs/extensions-light-cleanup-report.md`
   - 新增本实施报告。

本轮没有修改 `docs/migration-map.json`、`data/catalog.js`、`data/legacy.js`、`scripts/validate.mjs` 或其他文件。

## 11. Git diff / status 摘要

- `git diff --check`：通过。
- 本轮未 commit、未 push。
- 工作树在本轮开始前已有其他修改和未跟踪文件；本轮未清理、覆盖或回退这些既有变化。
- 与本轮直接相关的文件只有 `data/navigation.js` 和 `docs/extensions-light-cleanup-report.md`。

## 12. 结论

extensions 已完成轻量命名整理：当前为“3D扩展与资源”5 项和“音频插件与音源”2 项，仍为 2 个 section、7 个引用、7 个唯一 ID。顶层 view 名称、资源集合与顺序、创作区共享、所有关系以及其他 view 均保持不变。旧 migration placement 已由 `previousTitles` 兼容，无需修改 migration-map。validator 与 `git diff --check` 均通过。
