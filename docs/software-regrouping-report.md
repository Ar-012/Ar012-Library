# 设备与环境 → 软件重组实施报告

实施日期：2026-10-06

实施对象：`data/navigation.js` 中 view key 为 `software` 的结构，以及 `system` 中 Bandizip 的既有第二入口。

实施依据：`docs/device-environment-overview-audit.md`、`docs/software-resource-audit.md` 与本轮确认指令。

实施限制：未联网；未新增或删除 catalog 实体；未修改资源字段或 `relatedResources`；未修改 legacy、validator、UI、CSS、JS 或 HTML；未修改其他 view；未 commit；未 push。

## 1. 实施结果摘要

- software 从 11 个 section 重组为 8 个 section。
- software 仍为 38 个资源引用、38 个唯一 catalog ID；原 38 个 ID 集合完整保留，无新增、无遗漏、无重复、无悬空 ID。
- system 从 6 个引用调整为 5 个引用；只移除 Bandizip `res-9eeb06a2a9b2`，其余结构与资源顺序保持不变。
- Bandizip 只保留在 `设备与环境 → 软件 → 办公与效率`。
- catalog 实体总数仍为 488；`data/catalog.js` 未修改。
- 20 个 view 仍完整；除 software 与 system 的指定调整外，其余 18 个 view 未变化。
- 所有 `relatedResources` 保持不变。
- `docs/migration-map.json` 只同步 Bandizip 的一条历史迁移记录。
- `node scripts/validate.mjs` 与 `git diff --check` 均通过。

## 2. software 最终八组结构

| 顺序 | section | 数量 |
|---:|---|---:|
| 1 | 浏览与沟通 | 3 |
| 2 | 办公与效率 | 5 |
| 3 | 阅读与学习 | 4 |
| 4 | 系统与软件管理 | 5 |
| 5 | 图像与设计 | 6 |
| 6 | 3D创作 | 4 |
| 7 | 音频与视频 | 7 |
| 8 | 游戏与运行环境 | 4 |
| **合计** | **8组** | **38** |

### 2.1 浏览与沟通（3）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | Chrome | `res-9cc8c6489d5f` |
| 2 | QQ | `res-ea0447bcb5e0` |
| 3 | 微信PC版 | `res-5932a896098b` |

### 2.2 办公与效率（5）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | Microsoft Office | `res-26ce40a4e924` |
| 2 | Xmind | `res-526a4ab431c7` |
| 3 | 百度网盘 | `res-305ce2f2af53` |
| 4 | Bandizip | `res-9eeb06a2a9b2` |
| 5 | 有道词典 | `res-1b6dc2711caf` |

### 2.3 阅读与学习（4）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | CCTalk | `res-66fd9da32db8` |
| 2 | Koodo Reader | `res-ef0272e776f4` |
| 3 | Calibre | `res-2bb4c3b6b003` |
| 4 | EarMaster | `res-a3a2d6e482de` |

### 2.4 系统与软件管理（5）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | 火绒安全 | `res-787fd06cb08e` |
| 2 | Clash Verge Rev | `res-d7b68315ffd9` |
| 3 | App Cleaner & Uninstaller | `res-61e2540c5015` |
| 4 | Scroll Reverser | `res-e95bace475c6` |
| 5 | MacPedia | `res-de194ed9757b` |

### 2.5 图像与设计（6）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | Adobe Creative Cloud | `res-83dbf3146b95` |
| 2 | CSP优动漫 | `res-9fe35e6ae85e` |
| 3 | PureRef | `res-3a81b1e5a03c` |
| 4 | 字由 | `res-79e7b4b278c2` |
| 5 | Honeyview | `res-3b65565237c5` |
| 6 | Picsee | `res-2b3e20dff7b4` |

### 2.6 3D创作（4）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | Quixel Bridge | `res-5ee7019b67b3` |
| 2 | Blender | `res-b60e9fdc1539` |
| 3 | Gaea | `res-684127ed910a` |
| 4 | Marvelous Designer | `res-19b4b0a8487e` |

### 2.7 音频与视频（7）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | 网易云音乐 | `res-90dd5ea957ab` |
| 2 | MuseScore | `res-af8ef348cd3d` |
| 3 | OBS Studio | `res-5cc0e67257c0` |
| 4 | Ableton Live | `res-b939645bed96` |
| 5 | REAPER | `res-75ae98f287b2` |
| 6 | Audacity | `res-d130cc2e9c59` |
| 7 | IINA | `res-1c23a7b77657` |

### 2.8 游戏与运行环境（4）

| 顺序 | 资源 | catalog ID |
|---:|---|---|
| 1 | Steam | `res-882fd7527ef0` |
| 2 | Epic Games Store | `res-215f7a9368ce` |
| 3 | 雷神加速器 | `res-b62262cabd66` |
| 4 | MuMu模拟器 | `res-2e471096b9d3` |

## 3. 修改前 11 组到修改后 8 组

| 修改前 section | 原数量 | 修改后去向 |
|---|---:|---|
| 基础软件 | 6 | Chrome、QQ、微信PC版 → 浏览与沟通；Bandizip → 办公与效率；火绒安全 → 系统与软件管理；网易云音乐 → 音频与视频 |
| 办公与开发 | 4 | 百度网盘、有道词典 → 办公与效率；CCTalk → 阅读与学习；Clash Verge Rev → 系统与软件管理 |
| 阅读工具 | 2 | Koodo Reader、Calibre → 阅读与学习 |
| 多媒体工具 | 2 | MuseScore、OBS Studio → 音频与视频 |
| 其他软件记录 | 3 | Microsoft Office、Xmind → 办公与效率；Honeyview → 图像与设计 |
| 2D美术软件 | 4 | 四项全部 → 图像与设计 |
| 3D美术软件 | 4 | 四项全部 → 3D创作 |
| 游戏平台 | 4 | 四项全部 → 游戏与运行环境 |
| 软件资源网站 | 1 | MacPedia → 系统与软件管理 |
| Mac专用软件 | 4 | App Cleaner & Uninstaller、Scroll Reverser → 系统与软件管理；Picsee → 图像与设计；IINA → 音频与视频 |
| 音频与音乐 | 4 | EarMaster → 阅读与学习；Ableton Live、REAPER、Audacity → 音频与视频 |

新 section 的 `previousTitles` 只用于兼容旧 section 名称与迁移校验，不产生额外可见 section，也不改变资源数量。

## 4. 38 项集合完整性验证

| 检查项 | 结果 |
|---|---|
| 修改前 software 引用数 | 38 |
| 修改后 software 引用数 | 38 |
| 修改后唯一 ID 数 | 38 |
| 修改前后 ID 集合 | 完全一致 |
| 新增 ID | 0 |
| 遗漏 ID | 0 |
| 同一 view 重复 ID | 0 |
| 悬空 ID | 0 |

结论：本轮只改变 software 内部 section 组织与顺序，没有新增、删除或替换资源实体。

## 5. Bandizip 边界调整

Bandizip `res-9eeb06a2a9b2` 原来同时存在于：

- `设备与环境 → 软件 → 基础软件`
- `设备与环境 → 系统与设备 → 系统维护与工具`

实施后只保留：

- `设备与环境 → 软件 → 办公与效率`

从 system 移除第二入口的原因是：Bandizip 的明确用途是文件压缩与解压，作为可安装软件保留在 software 合理，但其“系统维护”语义不足，继续在 system 共享会造成边界重复。

system 实施后仍为两个 section：

| section | 资源数 | 资源 |
|---|---:|---|
| 游戏运行与优化 | 1 | PCGamingWiki `res-751a6d512a90` |
| 系统维护与工具 | 4 | 火绒安全 `res-787fd06cb08e`；Clash Verge Rev `res-d7b68315ffd9`；App Cleaner & Uninstaller `res-61e2540c5015`；Scroll Reverser `res-e95bace475c6` |

system 合计 5 个引用、5 个唯一 ID；Bandizip 不再出现。

## 6. software / system 共享验证

实施后 software 与 system 仍共享 4 个 catalog ID：

| ID | 名称 | software 位置 | system 位置 |
|---|---|---|---|
| `res-787fd06cb08e` | 火绒安全 | 系统与软件管理 | 系统维护与工具 |
| `res-d7b68315ffd9` | Clash Verge Rev | 系统与软件管理 | 系统维护与工具 |
| `res-61e2540c5015` | App Cleaner & Uninstaller | 系统与软件管理 | 系统维护与工具 |
| `res-e95bace475c6` | Scroll Reverser | 系统与软件管理 | 系统维护与工具 |

这四项仍分别表达“软件安装/环境恢复”和“系统维护/配置”的双重使用场景。Bandizip 已不在共享集合中。

## 7. 与其他大区的共享验证

本轮未新增或删除 software 与创作、学习、日常大区之间的同 ID 共享。实际共享如下。

### 7.1 与创作与工作共享（13）

| ID | 名称 | software 位置 | 另一位置 |
|---|---|---|---|
| `res-83dbf3146b95` | Adobe Creative Cloud | 图像与设计 | 美术与设计 → 工具 |
| `res-9fe35e6ae85e` | CSP优动漫 | 图像与设计 | 美术与设计 → 工具 |
| `res-3a81b1e5a03c` | PureRef | 图像与设计 | 美术与设计 → 工具 |
| `res-79e7b4b278c2` | 字由 | 图像与设计 | 美术与设计 → 字体与文字 |
| `res-5ee7019b67b3` | Quixel Bridge | 3D创作 | 3D → 软件与工具 |
| `res-b60e9fdc1539` | Blender | 3D创作 | 3D → 软件与工具 |
| `res-684127ed910a` | Gaea | 3D创作 | 3D → 软件与工具 |
| `res-19b4b0a8487e` | Marvelous Designer | 3D创作 | 3D → 软件与工具 |
| `res-af8ef348cd3d` | MuseScore | 音频与视频 | 音频与视频 → 音频制作工具 |
| `res-5cc0e67257c0` | OBS Studio | 音频与视频 | 音频与视频 → 视频工具 |
| `res-b939645bed96` | Ableton Live | 音频与视频 | 音频与视频 → 音频制作工具 |
| `res-75ae98f287b2` | REAPER | 音频与视频 | 音频与视频 → 音频制作工具 |
| `res-d130cc2e9c59` | Audacity | 音频与视频 | 音频与视频 → 音频制作工具 |

### 7.2 与学习与研究共享（1）

| ID | 名称 | software 位置 | 另一位置 |
|---|---|---|---|
| `res-a3a2d6e482de` | EarMaster | 阅读与学习 | 音乐 → 音乐学习 |

### 7.3 与日常与生活共享（5）

| ID | 名称 | software 位置 | 另一位置 |
|---|---|---|---|
| `res-305ce2f2af53` | 百度网盘 | 办公与效率 | 日常工具 → 云存储 |
| `res-90dd5ea957ab` | 网易云音乐 | 音频与视频 | 音乐 → 收听与发现 |
| `res-1c23a7b77657` | IINA | 音频与视频 | 影视 → 播放工具 |
| `res-882fd7527ef0` | Steam | 游戏与运行环境 | 游戏 → 游戏平台与商店 |
| `res-215f7a9368ce` | Epic Games Store | 游戏与运行环境 | 游戏 → 游戏平台与商店 |

## 8. catalog 与 relatedResources 不变性

- `data/catalog.js` 未修改。
- catalog 实体总数仍为 488。
- `data/catalog.js` 文件 SHA-256 在实施前后均为 `20e78cfe1ac92ca7a97dc792f32912217410c6887f0f02f5c84746a0907e0620`。
- catalog 内容结构哈希在实施前后均为 `415fd30b915e99a8b162c20e56b72b188f0c3e619e9c71765c9a5fe44f28fc7a`。
- 因整个 catalog 文件逐字节未变化，所有 488 个实体的全部字段及所有 `relatedResources` 均保持不变。

## 9. navigation 修改范围与不变性

`data/navigation.js` 只实施以下两类变化：

1. 重组 `software` 的 section、资源顺序及相应的 `previousTitles` 兼容信息。
2. 从 `system → 系统维护与工具` 删除 Bandizip 的一个引用。

验证结果：

- 顶层四大区 navigation 未变化；结构哈希仍为 `31a93d5f59030ee708eb9ceb813f8a08990bed164de407c04a05525f4883ce56`。
- software/system 之外的其他 18 个 view 未变化；结构哈希仍为 `0007c693c5552d3dc7fafb0fe47e693f9909b4aac5c89c67bf5233ec8f850b36`。
- 20 个 view 均完整存在。
- `data/legacy.js` 未修改；文件 SHA-256 仍为 `651bf2e84cc3fe2581b826083bc9b3c9cde5cd3921fdf9f314a20b4fd04251aa`。

## 10. migration-map 最小同步

### 为什么需要修改

首次按原限制保持 `docs/migration-map.json` 不变时，validator 报告 `Lost placement installation-software:0:5`。原因是 Bandizip 的旧迁移记录仍要求它同时存在于 software 和 system，而本轮已经正式取消 system 中的第二入口。该记录若不更新，就会与当前确认的 navigation 结构冲突。

### 实际修改

只修改了以下一条历史迁移记录：

- `sourceKey`: `installation-software:0:5`
- `resourceId`: `res-9eeb06a2a9b2`
- 资源：Bandizip

具体同步：

- 从 `destinations` 删除 `system → 系统维护与工具`。
- software destination 从旧名称 `software → 基础软件` 更新为当前位置 `software → 办公与效率`。
- 对该记录的 `reason` 做最小更新，明确 Bandizip 作为压缩解压软件保留在 software；system 中原有第二入口因系统维护语义不足而取消。

未修改其他 migration 记录，未顺便同步其他资源的旧 section 名称。

### validator 状态

- `scripts/validate.mjs` 本身未修改；文件 SHA-256 在实施前后均为 `96667b4751bbf7e4ac381758b8a3c98770222c553be24dbb1a06becb4786bc94`。
- 完成 migration-map 最小同步后，validator 通过。

## 11. validate 与静态检查

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

## 12. 浏览器验证

未执行浏览器验证。

本地存在 `npx`，但没有已安装的全局 `playwright-cli`；尝试以离线模式调用 `@playwright/cli` 时返回 `ENOTCACHED`。由于本轮明确禁止联网，未下载依赖，也未引用任何旧浏览器测试结果。

因此以下项目本轮未实测：

- 1440px 与 390px 下八组快速导航和卡片布局。
- 38 张卡片是否在浏览器渲染层无重复。
- 横向溢出与 JavaScript `pageerror`。

数据层的 section 数量、资源数量、唯一性和完整性已由本地脚本与 validator 验证。

## 13. 本轮未处理事项

- 未修改任何 catalog 资源的 name、description、URL、links、type、tags、topics、contexts、sources 或其他字段。
- 未处理 Microsoft Office、Xmind、Honeyview、App Cleaner & Uninstaller、Scroll Reverser、Picsee、IINA 等既有空 URL。
- 未处理 Quixel Bridge、Audacity 的 type 粒度问题。
- 未新增、删除或调整任何 `relatedResources`。
- 未调整 extensions 或其他 view。
- 未修改 legacy、validator、UI、CSS、JS 或 HTML。
- 未联网验证任何资源入口。

## 14. 本轮文件变更

本轮实际修改或新增 3 个文件：

1. `data/navigation.js`
   - software 从 11 组重组为 8 组，保持 38 项完整集合。
   - 从 system 的“系统维护与工具”移除 Bandizip，system 由 6 项变为 5 项。
2. `docs/migration-map.json`
   - 只同步 Bandizip `installation-software:0:5` 一条记录的 destination 与直接相关 reason。
3. `docs/software-regrouping-report.md`
   - 新增本实施报告。

没有其他文件因本轮任务被修改。

## 15. Git diff / status 摘要

- `git diff --check`：通过。
- 本轮未 commit、未 push。
- 工作树在本轮开始前已存在大量既有修改与未跟踪文件；本轮没有清理、覆盖或回退这些用户已有变化。
- 与本轮直接相关的文件仅为上节列出的 3 个文件。

## 16. 最终结论

software 已按确认方案完成 8 组重组，组数与数量严格为 `3 / 5 / 4 / 5 / 6 / 4 / 7 / 4`，合计 38 个引用和 38 个唯一 ID。Bandizip 已从 system 移除，只保留在 software 的“办公与效率”；migration-map 已作单条最小同步。catalog、关系、其他 18 个 view、顶层 navigation、legacy 与 validator 均保持不变。validator 和 `git diff --check` 均通过；浏览器验证因本地无可用 Playwright CLI 且禁止联网而未执行。
