# 日常与生活 → 影视 relatedResources 实施报告

实施日期：2026-10-05

实施对象：`film` view 中的网飞猫主入口与备用入口

实施依据：`docs/daily-life-overview-audit.md`、`docs/film-resource-audit.md` 与本轮确认指令

限制：本轮未联网；未修改 film 的 section 结构；未修改其他 view；未处理额外数据质量问题；未 commit；未 push。

## 1. film 现有五组保持不变

本轮开始前后，`data/navigation.js` 中 `film` 均保持以下结构：

| 顺序 | section | 引用数 |
|---:|---|---:|
| 1 | 播放工具 | 1 |
| 2 | 影视在线 | 9 |
| 3 | 聚合搜索 | 3 |
| 4 | 影视下载 | 3 |
| 5 | 影视查询 | 1 |
| **合计** | **5个section** | **17** |

验证结果：

- 资源引用数：17。
- 唯一 catalog ID：17。
- section 数：5。
- section 名称、顺序和各组数量仍为 `1 / 9 / 3 / 3 / 1`。
- 两个网飞猫实体仍同时位于「影视在线」。
- 未移动、新增或删除任何资源引用。

## 2. 新增关系说明

只修改了 `data/catalog.js` 中的网飞猫主入口实体：

```js
{
  "id": "res-0310c06e735b",
  "relatedResources": [
    "res-c68a509f5bf8"
  ],
  "name": "网飞猫"
}
```

关系方向为：

```text
网飞猫 res-0310c06e735b
  → 网飞猫备用 res-c68a509f5bf8
```

实施前目标实体没有 `relatedResources` 数组，因此本轮新建数组并加入唯一指定 ID，没有覆盖任何既有关系。

两个实体的 URL 均保持原样：

- 网飞猫：`https://www.ncat22.com/`
- 网飞猫备用：`https://dl.ncat22.com/`

两个实体的 ID、name、description、URL、links、type、tags、topics、contexts 与 sources 均未改变。

## 3. 为什么不是重复实体

本地现有证据持续支持“同一服务的两个不同入口角色”：

- 原始 name 已明确区分“网飞猫”与“网飞猫备用”。
- 备用实体 description 为“网飞猫备用链接”。
- 两项从旧 source 起就是连续的独立记录：`video-film:0:2` 与 `video-film:0:3`。
- 两项 URL 分别指向主入口与备用子域。
- 两个入口都保留独立的 catalog ID，并同时存在于「影视在线」。

因此本轮没有删除 `res-c68a509f5bf8`，没有把备用 URL 合入主实体的 links，也没有合并两个实体。新增关系只表达主入口可以聚合展示其明确的备用入口。

## 4. 为什么不加反向关系

该关系的使用语义是“从主入口找到备用入口”。备用实体是被主实体聚合的故障切换入口，不需要再反向聚合主入口。

验证结果：

- 网飞猫 `res-0310c06e735b.relatedResources` 为 `["res-c68a509f5bf8"]`。
- 网飞猫备用 `res-c68a509f5bf8` 不存在 `relatedResources` 字段。

没有添加“网飞猫备用 → 网飞猫”的反向关系，也没有修改其他实体的 relatedResources。

## 5. catalog 数量与实体不变性验证

| 检查项 | 结果 |
|---|---|
| catalog 实体总数 | 488，保持不变 |
| 网飞猫主实体 | 仍存在，仅新增指定 relatedResources |
| 网飞猫备用实体 | 仍存在，字段未改，且没有反向关系 |
| 两个 URL | 均保持原样 |
| 其余487个实体 | 逐字段序列化哈希与修改前一致 |

修改前后排除 `res-0310c06e735b` 后，其余487个实体的整体 SHA-256 均为：

```text
20d70fe8e08a9610e4336ffbaf66a5f2df47f872a2bf1bf7de232628b4efeadd
```

这说明除网飞猫主实体新增指定字段外，没有其他 catalog 实体发生字段变化。

## 6. navigation 不变性

本轮没有编辑 `data/navigation.js`。

修改前后验证值一致：

| 范围 | 修改前后 SHA-256 / 结构哈希 |
|---|---|
| `data/navigation.js` 文件 | `4dd3cbc20b59d62a1ba8d8565ed8f0a7736cc2803071b632bac3c9041739d232` |
| `film` view 结构 | `a13d37f7aa7e20ebfe01ff7e7ac48c7b171395a505ab9d8a72d71d0c6b4b8799` |
| 其他19个 view 结构 | `3d0d5e30cf8c6a6efdfea3c3ecf5f2cff2ed1a7d4440fe30d1044a4c7be92266` |
| 四大区顶层 navigation | `31a93d5f59030ee708eb9ceb813f8a08990bed164de407c04a05525f4883ce56` |

因此 film 结构、其他19个 view 以及四大区顶层 navigation 均与本轮开始前完全一致。

## 7. 跨 view 共享验证

IINA `res-1c23a7b77657` 仍只出现在以下两个位置：

- 日常与生活 → 影视 → 播放工具
- 设备与环境 → 软件 → Mac专用软件

这是同一个 catalog ID 的既有共享，本轮未修改。

film 的其他16项仍没有新增跨 view 共享。新增 `relatedResources` 只建立实体关系，不产生 navigation 引用，也不等同于跨 view 共享。

## 8. 未处理的数据质量问题

本轮严格没有处理审计中记录的额外问题，包括：

- IINA `res-1c23a7b77657` 仍为 `url: null`、`links: []`。
- 4K影视 `res-2093fb1cd899` 的 description 未修改。
- HDmoli `res-d284007428f0` 的 description 未修改。
- 未处理低端影视的既有 DNS 检查异常。
- 未处理蓝光电影网的既有连接超时记录。
- 未处理中国蓝光网的 HTTP URL。
- 未处理 IMDb 的既有 HTTP 403 记录。

这些均不属于本轮单一关系实施范围。

## 9. validate 与格式检查结果

执行：

```text
node scripts/validate.mjs
```

结果：`PASS`。

```text
sources: 498
entities: 488
mergedSources: 10
views: 20
legacyPages: 14
activeURLs: 481
confirmedCorrections: 9
urlLessRecords: 11
internalLinks: 209
```

执行：

```text
git diff --check
```

结果：通过，无空白错误。

同时验证以下文件在本轮开始前后 SHA-256 完全一致：

| 文件 | SHA-256 |
|---|---|
| `data/legacy.js` | `651bf2e84cc3fe2581b826083bc9b3c9cde5cd3921fdf9f314a20b4fd04251aa` |
| `docs/migration-map.json` | `2ac501705539372745ac1bde24078eef3831f463af340f0dec5c17e821138034` |
| `scripts/validate.mjs` | `96667b4751bbf7e4ac381758b8a3c98770222c553be24dbb1a06becb4786bc94` |

因此 legacy、migration-map 和 validator 规则均未变化。

## 10. 浏览器验证结果

本轮未执行浏览器验证，且没有引用旧测试结果。

环境检查结果：

- 本机存在 `npx`。
- 未安装全局 `playwright-cli`。
- 使用 `npx --offline --package @playwright/cli playwright-cli --help` 检查离线缓存时返回 `ENOTCACHED`。
- 本轮明确禁止联网，因此没有下载或安装 Playwright 依赖。

所以本轮无法实际检查1440px与390px页面、关系展开交互或 JavaScript `pageerror`。数据层和项目 validator 已验证该关系可被当前模型解析，但这不替代浏览器运行结果。

## 11. 本轮文件变更

本轮实际变更仅有：

1. `data/catalog.js`
   - 仅为网飞猫 `res-0310c06e735b` 新增：
     `relatedResources: ["res-c68a509f5bf8"]`。
2. `docs/film-relation-report.md`
   - 新增本实施报告。

本轮没有修改：

- `data/navigation.js`
- `data/legacy.js`
- `docs/migration-map.json`
- `scripts/validate.mjs`
- 其他 view
- UI、CSS、JS或HTML
- 任何其他资源字段

未 commit，未 push。

## 12. Git diff / status 摘要

仓库在本轮开始前已经存在大量未提交及未跟踪内容，包括先前阶段的数据、页面、脚本和报告。本轮没有清理、覆盖或回退这些既有改动。

与本轮直接相关的状态：

- `data/catalog.js`：在当前 Git 状态中为未跟踪文件；本轮只在其现有内容上加入指定单向关系。
- `docs/film-relation-report.md`：本轮新增的未跟踪报告。
- `data/navigation.js`：仓库状态原本显示为 modified，但本轮开始前后文件哈希完全一致，证明本轮没有修改它。
- `data/legacy.js`、`docs/migration-map.json`、`scripts/validate.mjs`：仓库状态中为既有未跟踪文件，本轮开始前后哈希完全一致。

由于 `data/catalog.js` 当前整体尚未被 Git 跟踪，普通 `git diff` 无法单独展示其中这一行级变化；本报告使用修改前后实体级哈希、目标实体字段检查和 validator 结果确认变更范围。

最终结论：已按确认要求只建立“网飞猫 → 网飞猫备用”的单向 `relatedResources`，film 与其他 navigation 结构、其余487个 catalog 实体以及 legacy、migration、validator 均保持不变。
