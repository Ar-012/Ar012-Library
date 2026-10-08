# AI信息架构整理与已确认数据清理报告

日期：2026-10-04。依据AI审计及本轮用户人工核实后的明确要求；未自行联网、未新增或删除资源、未 commit、未 push。

## 整理前后

| 原section | 数量 |
| --- | ---: |
| 图像 | 10 |
| 对话 | 6 |
| 综合工具 | 2 |
| 音频 | 1 |
| 视频 | 1 |
| 3D | 3 |

| 新section | 数量 |
| --- | ---: |
| 助手与问答 | 7 |
| 视觉创作 | 2 |
| 综合创作工具 | 2 |
| 图像资料与模型 | 6 |
| 音频、视频与3D生成 | 5 |
| AI 导航 | 1 |

## 六组完整资源清单

### 助手与问答

| 名称 | ID |
| --- | --- |
| 豆包 | `res-28b57dad1491` |
| Deepseek | `res-7ea330ae999c` |
| Chat GPT | `res-5d9354f7cb0e` |
| Google Gemini | `res-380e7aa25639` |
| Kimi AI | `res-474cbb3dda56` |
| Chat Doc | `res-76fa496a4486` |
| Wolfram\|Alpha | `res-c2af766ae055` |

### 视觉创作

| 名称 | ID |
| --- | --- |
| 即梦 | `res-110680f9c634` |
| Midjourney页面端 | `res-b9db5bd74bbc` |

### 综合创作工具

| 名称 | ID |
| --- | --- |
| TapNow | `res-775603a1bbd3` |
| Lovart | `res-26f20a8185f8` |

### 图像资料与模型

| 名称 | ID |
| --- | --- |
| midlibrary | `res-7af19e673662` |
| midjourney关键词大全 | `res-5b82b9bcfe4b` |
| Prompt Hero | `res-d3dd2af510c9` |
| midjourney 官方画廊 | `res-6474cdc40eb4` |
| civitai | `res-f45842166d71` |
| cg迷 | `res-627b56ed27b3` |

### 音频、视频与3D生成

| 名称 | ID |
| --- | --- |
| Suno | `res-509d57a3ae8c` |
| Runway | `res-dcbda8c01446` |
| 腾讯混元3D | `res-4c481d629823` |
| Tripo 3D | `res-be63b33b5fe5` |
| Trellis 3D | `res-0ea83479fc3f` |

### AI 导航

| 名称 | ID |
| --- | --- |
| Toolify | `res-9dd2ec745775` |

## 七项名称与描述修改

全部使用用户提供的确认文本，没有补写其他能力、功能字段或URL。

| ID | 名称：修改前 → 修改后 | 描述：修改前 → 修改后 |
| --- | --- | --- |
| `res-110680f9c634` | 即梦 → 即梦 | （空） → AI视觉创作平台，支持图片生成与编辑、视频生成等功能 |
| `res-775603a1bbd3` | TapNow → TapNow | nano banana pro等 → AI原生创作平台，支持多模态内容创作、画布与工作流 |
| `res-26f20a8185f8` | Lovart → Lovart | nano banana pro等 → AI设计智能体，用于视觉设计、图片、视频等创意工作流 |
| `res-509d57a3ae8c` | suno（v3） → Suno | AI音乐生成工具，可以根据文本生成音乐 → AI音乐生成工具，可根据文本等输入生成音乐 |
| `res-dcbda8c01446` | Runway Gen3 → Runway | AI视频生成工具，支持文本和图片生成视频 → AI视频创作与生成平台 |
| `res-0ea83479fc3f` | Trellis 3D → Trellis 3D | （空） → AI 3D 生成工具，可用于生成3D资产 |
| `res-9dd2ec745775` | Toolfy.ai → Toolify | AI工具导航网站，汇总各类AI工具 → AI工具导航网站，汇总和分类各类AI工具 |

## Midjourney关联

Midjourney页面端（`res-b9db5bd74bbc`）仅新增relatedResources，按以下顺序引用已有实体：

1. midjourney 官方画廊：`res-6474cdc40eb4`
2. midlibrary：`res-7af19e673662`
3. midjourney关键词大全：`res-5b82b9bcfe4b`

只保存ID，不复制名称/URL/描述，不建立反向关联。三个目标仍在图像资料与模型组显示独立卡片。Prompt Hero未加入。主实体名称、描述和URL保持原样。

## 集合与修改范围核对

- 写入前核对原navigation、审计完整清单及拟定新分组，23个ID集合完全一致。
- 整理后7/2/2/6/5/1，共23个引用、23个唯一ID，无遗漏、重复或隐藏；每项仅出现于一个AI section。
- catalog仍为489实体。逐字段比较确认仅8个允许实体的指定字段变化；其他481实体完全不变，所有ID和URL不变。
- AI之外19个view及四大区域导航逐字段完全不变，包括3D、游戏制作、美术与设计、音频与视频、开发、学习与研究、设备与环境。
- 未新增跨view共享、未合并或拆分实体、未增加其他relatedResources。
- 沿用普通section与已有展开组件，没有新增领域Tab或详情页。

## 修改文件

相对本轮开始时修改：

1. data/navigation.js：仅AI的六组分配；previousTitles保留旧标题供历史迁移校验，页面显示新标题。
2. data/catalog.js：七项指定名称/描述修正与一项Midjourney关联。
3. scripts/validate.mjs：两处写死旧分组的校验断言同步为“助手与问答”和“音频、视频与3D生成”，继续验证Deepseek与腾讯混元3D的归属；未放宽数据完整性检查。

新增：docs/ai-regrouping-report.md。无删除文件。UI/CSS/HTML/渲染JS、legacy、migration-map、原AI审计及其他已有文档不改。

## 发现但未处理的问题

- 即梦旧reviewNotes仍写“缺少描述”；本轮只授权description，故没有清除该字段。该提示与新描述不再一致，留待后续确认处理。
- Suno、Runway、Toolify的links.label仍是原名；用户仅授权name与description，因此没有顺手修改。主卡片读取name，当前links与主URL一致，不生成额外旧名入口。
- Midjourney页面端等原有主观或时间相关描述保留，其他名称写法不优化。
- 原topics/tags保留历史主题，不按新展示组批量改写。
- 未验证任何第三方网站或链接，不判断可用性、当前版本、价格或授权条件。

## 浏览器验证与检查

- Playwright 72组通过：1440px、390px各覆盖20个view、14旧入口和美术另两个领域。主卡片ID、名称、描述及URL/null状态与catalog一致，无重复、遗漏或横向溢出，零JavaScript pageerror。
- AI顶部准确显示六项新分类；Suno、Runway、Toolify新名与所有新描述正确显示。Midjourney默认收起，可展开/收起指定三项，顺序正确，目标独立卡片仍存在，Prompt Hero未关联。已查看桌面及移动截图。
- node scripts/validate.mjs通过：489实体、498历史来源、20视图、14旧入口、209个内部引用；git diff --check通过。
- 文件SHA-256核对：仅上述三份文件和本报告变化。Art Notes、Music Library无新增、删除或修改；三仓库HEAD与Git配置未变。未 commit、未 push。

## Git diff/status摘要

- 本轮 data/catalog.js：+15 / -10 行。
- 本轮 data/navigation.js：+61 / -40 行。
- scripts/validate.mjs：2处旧标题断言替换。新增本报告，无文件删除。
- 下列Git统计包含全部既有未提交阶段，未跟踪文件内容不计入diff统计，不能视为本轮单独差异。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1622 +++++++++++++++++++++++++++++++++++++++--
 data/pages.js                 |   28 +-
 development.html              |    7 +-
 game-design.html              |    7 +-
 games.html                    |    7 +-
 gun-design-reference.html     |    7 +-
 history.html                  |    7 +-
 index.html                    |   22 +-
 installation-software.html    |    7 +-
 js/navigation.js              |    8 +-
 js/render-resources.js        |  194 ++++-
 video-film.html               |    7 +-
 visual-communication.html     |    7 +-
 work-tools-collaboration.html |    7 +-
 20 files changed, 1912 insertions(+), 94 deletions(-)
```

```text
 M 3d-art.html
 M ai-art.html
 M concept-art.html
 M costume-fashion-design.html
 M css/resource-page.css
 M daily-essentials.html
 M data/navigation.js
 M data/pages.js
 M development.html
 M game-design.html
 M games.html
 M gun-design-reference.html
 M history.html
 M index.html
 M installation-software.html
 M js/navigation.js
 M js/render-resources.js
 M video-film.html
 M visual-communication.html
 M work-tools-collaboration.html
?? data/catalog.js
?? data/configuration.schema.json
?? data/legacy.js
?? data/resources/README.md
?? docs/
?? js/catalog-view.js
?? library.html
?? output/
?? scripts/
```

## 2026-10-04：人工确认的数据一致性收尾

本次解除上文记录的两项待处理问题，仅修改以下四个实体的指定字段：

| 实体 | ID | 修改 |
| --- | --- | --- |
| 即梦 | `res-110680f9c634` | 删除唯一的失效reviewNotes“缺少描述；依据原 AI 美术分组暂存 AI / 图像，未补写功能”，结果为 `reviewNotes: []`；没有其他有效提示需要保留 |
| Suno | `res-509d57a3ae8c` | 指向主URL的links.label从“suno（v3）”同步为“Suno” |
| Runway | `res-dcbda8c01446` | 指向主URL的links.label从“Runway Gen3”同步为“Runway” |
| Toolify | `res-9dd2ec745775` | 指向主URL的links.label从“Toolfy.ai”同步为“Toolify” |

验证通过：即梦不再有“缺少描述”提示；三个主链接label与name一致。对比修改前快照，catalog仍为489实体，其他485实体逐字段不变，四个目标也仅发生上述字段变化；URL、链接数量、其他字段均不变。navigation逐字节不变，AI仍23项，其他view完全不变。`node scripts/validate.mjs`、`git diff --check`通过。

本次仅修改data/catalog.js并向本报告追加记录。未重新分类、未联网、未修改UI/CSS/JS/HTML，未 commit、未 push。上文相关“未处理”说明保留为前一阶段历史记录，以本追加结果为当前状态。
