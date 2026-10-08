# Phase 4 report

> 2026-10-02 更新：用户已人工确认原三个待确认项，现已追加，Blender 共 10 项关联。下方初版 7 项与待确认描述保留为历史记录；当前状态见文末补充。

日期：2026-10-01。完成通用相关资源展开功能，仅 Blender 配置关联。未 commit、未 push、未修改远程配置。

## 数据结构与关联范围

采用实体可选字段 `relatedResources: string[]`，仅存现有 catalog ID，数组顺序即显示顺序。名称、URL 均实时从同一 catalog 解析，不复制描述或资源数据。不递归展开、不自动反向关联、不改变原分类。

Blender（`res-b60e9fdc1539`）关联以下 7 项：

| 现有名称 | ID | 本地确认依据 |
| --- | --- | --- |
| Blender 3.1 参考手册 | `res-3a9f5c96c220` | 描述明确为 Blender 官方中文手册 |
| Blender Extension | `res-90bbea3931de` | 描述明确为 Blender 插件下载平台 |
| Blender Market | `res-7b921cd30d30` | 描述明确为 Blender 专用资源商店 |
| boxcutter手册 | `res-0cca09db33fd` | 描述明确为 Blender 布尔建模工具手册 |
| BlenderBros的Gumroad | `res-d08195ed9949` | 名称及描述指向 BlenderBros 团队 |
| BlenderBros主页 | `res-1151a8221b4f` | 描述明确为 Blender 教程和资源网站 |
| blender魔酷网 | `res-8d8eacb7c555` | 描述明确为中文 Blender 社区 |

以下暂未关联：KIT OPS 2 Manual（`res-782ef7ee4731`）、MESHmachine参考手册（`res-76887030b7a3`）、斑斓中国（`res-a05767c5d3d9`）。本地名称、描述和分组不足以明确确认 Blender 关系；斑斓中国 URL 含 blendercn，但未仅凭域名推断具体栏目用途。本次未对这些站点做外部调查，待确认不代表它们与 Blender 无关。Gumroad 等通用 3D 平台未批量关联。

实体数 **489 → 489**，ID、顺序及原字段全部保留。逐实体比对确认：只有 Blender 增加 relatedResources，其他 488 项完全不变；没有新增、复制、删除或移动实体。所有关联目标仍在原分类显示。

## DOM 与交互

普通卡片保留原返回路径。有关联的卡片使用 `.resource-with-related` 包裹，内部主行包含原官网 `<a>` 与同级原生 `<button>`，不存在 button 嵌套 a。按钮使用 aria-expanded、aria-controls 和动态中文操作名称，并阻止默认事件与冒泡。点击主链接仍打开 Blender 官网；箭头只切换同一卡片内的 hidden 面板。

面板标题为“相关资源”，使用紧凑 ul/li 名称入口，不渲染第二套卡片。相关目标有 URL 时生成带 noopener noreferrer 的新窗口链接，无 URL 时生成无 href 的 span。主资源原有无 URL 处理不变。默认收起，刷新后收起，无状态持久化；现有布局在跨响应式断点重建时也会回到收起状态。

渲染器没有 Blender 名称判断或专属 DOM/CSS；未来其他实体填写同一字段即可使用。校验器检查数组、ID 存在、无重复及无自引用。

## 文件变更

相对 Phase 4 开始时，修改 5 个文件：

| 文件 | 内容 | 新增/移除行 |
| --- | --- | --- |
| data/catalog.js | Blender 增加 7 个 ID 引用 | +9 / -0 |
| js/render-resources.js | 通用关联列表及 disclosure 交互 | +50 / -1 |
| css/resource-page.css | 关联卡片局部样式 | +15 / -0 |
| scripts/validate.mjs | 关联引用完整性验证 | +8 / -0 |
| docs/architecture.md | 追加关联模型规则 | +6 / -0 |

新增 4 个文件：本报告、`docs/phase-4-validation.json`、`output/playwright/phase-4-1440.png`、`output/playwright/phase-4-390.png`。无文件删除。未修改 HTML、导航、legacy、migration-map、art-regrouping 或其他资源数据。

## 验证结果

- `node scripts/validate.mjs` 与 JS 语法检查通过；498 历史来源、489 实体、20 视图、14 旧入口、168 美术资源、209 个内部文件引用保持有效。
- Playwright 72 组页面检查通过：1440px、390px 各覆盖 20 视图、14 旧入口及美术另外两个领域。卡片集合与 catalog/视图一致，无重复、无丢失、无横向溢出，零 JavaScript pageerror。
- 两种宽度均验证：默认收起、点击展开/再次收起、Enter 键操作、箭头不弹出官网、刷新复位、7 项名称及链接与 catalog 一致。
- 两种宽度均实际点击官网与全部 7 个相关入口，验证新窗口目标 URL。测试拦截了外部响应以隔离网络因素，因此验证的是点击路由，不声称第三方网站当前可用，也没有自动修复 URL。
- 使用仅存在于浏览器内存的临时 null URL 样例验证相关项为 span，无空或错误 href；磁盘 catalog 未改动。原 11 个无 URL 主卡片也通过全部页面检查。
- 两种宽度展开状态无溢出；已查看桌面及手机截图，层级、链接换行与箭头正常。普通卡片没有添加按钮或关联区域。
- `git diff --check` 通过。
- SHA-256 比对确认 Art Notes、Music Library 无新增、删除或内容变化；Music Library 原有六项未提交修改保留。
- 三仓库 HEAD 与 Git 配置未变；未 commit、未 push。

详细浏览器结果与范围快照见 [phase-4-validation.json](phase-4-validation.json)。

## Git status / diff 摘要

主站累计仍为 20 个已跟踪文件修改，以及前三阶段已有的未跟踪 data/docs/scripts/output 等内容。本阶段的 5 项修改、4 项新增是相对开工快照统计；不能用 Git HEAD 的累计 diff 代替阶段差异。

累计已跟踪 diff：`20 files changed, 1839 insertions(+), 94 deletions(-)`。完整 status 保存在验证 JSON。Art Notes 干净；Music Library 仍仅 about.html、index.html、listening-notes.html、playlists.html、resources.html、tutorials.html 六项原修改。

## 发现但未处理

上述三个候选资源仍待确认。既有手册版本、名称和外部链接均未升级或清理。授权页已有 favicon 请求 404，未产生 JavaScript pageerror，本阶段未修改。原无 URL 软件的历史“待补充真实入口”提示仍保留，未扩大数据清理范围。

## 2026-10-02：用户人工确认后的关联补充

依据用户明确确认，向 Blender（`res-b60e9fdc1539`）的 relatedResources 末尾追加：

| 现有实体 | ID | 用户确认用途 |
| --- | --- | --- |
| KIT OPS 2 Manual | `res-782ef7ee4731` | Blender 插件 KIT OPS 2 的使用手册 |
| MESHmachine参考手册 | `res-76887030b7a3` | Blender 插件 MESHmachine 的参考手册 |
| 斑斓中国 | `res-a05767c5d3d9` | 国内 Blender 相关网站 |

上述用途仅在本审计中记录，没有写入或覆盖三个实体的现有描述。原 7 项关联及顺序保持不变，最终为 10 个唯一 ID。catalog 数量 489 → 489；逐实体比较确认仅追加三个引用，其他 488 个实体及 Blender 其他字段完全不变。原分类未修改。

验证：1440px 桌面与 390px 移动端均默认收起，展开显示 10 项，再次点击可收起；三个新增项目的名称和 URL 与已有 catalog 一致，并在 3D 原分类继续显示独立卡片。无重复关联、无横向溢出、无 JavaScript pageerror。`node scripts/validate.mjs` 和 `git diff --check` 均通过。

本次仅修改 data/catalog.js、本报告、phase-4-validation.json；无新增或删除文件，无 UI/CSS/渲染修改，无分类修改，未 commit、未 push。原三项待确认状态在本次人工确认后解除；未扩大关联范围。验证 JSON 的 userConfirmedSupplement 保存本次结果，原 Phase 4 验证记录保留。
