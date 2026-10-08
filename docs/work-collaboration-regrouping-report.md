# 工作与协作信息架构整理报告

日期：2026-10-04。依据资源审计和用户明确方案，仅重组31项并修复Google Docs的type。未联网、未 commit、未 push。

## 整理前后

| 原section | 数量 |
| --- | ---: |
| 文档 | 7 |
| 其他工作工具 | 18 |
| 项目管理 | 6 |

| 新section | 数量 |
| --- | ---: |
| 文档与笔记 | 7 |
| 图表与白板 | 6 |
| 文件处理 | 6 |
| 沟通与会议 | 6 |
| 项目管理 | 6 |

## 五组完整清单

### 文档与笔记

| 名称 | catalog ID |
| --- | --- |
| 有道云笔记 | `res-c4ebbef96491` |
| Notion | `res-b04d19f21678` |
| 腾讯文档 | `res-6faf8078bc3d` |
| 石墨文档 | `res-104da187aeac` |
| 金山文档 | `res-4a862f2654ef` |
| Google Docs | `res-045262fdb9df` |
| Microsoft 365 | `res-4f1bcebf4af3` |

### 图表与白板

| 名称 | catalog ID |
| --- | --- |
| diagrams.net | `res-d37be745462e` |
| Whimsical | `res-0769dc5c4e2e` |
| Excalidraw | `res-85794320b9fe` |
| MindMeister | `res-55aed948bf9c` |
| Miro | `res-eb640f905ca9` |
| Lucidchart | `res-732fa7eab1be` |

### 文件处理

| 名称 | catalog ID |
| --- | --- |
| 网易见外工作台 | `res-81a9a6e98ebb` |
| SmallPDF | `res-e2b7d141a061` |
| Convertio | `res-b6a9c8a0879f` |
| Online-Convert | `res-a2032bb7e364` |
| CloudConvert | `res-920e46e0b7d8` |
| FreeConvert | `res-f77636ac2752` |

### 沟通与会议

| 名称 | catalog ID |
| --- | --- |
| Slack | `res-e5d304c1d5d0` |
| Microsoft Teams | `res-f056c4fec3a2` |
| 钉钉 | `res-45d5192022e4` |
| 企业微信 | `res-0625bbe4ab49` |
| Discord | `res-724af556ca10` |
| Zoom | `res-976eeac66264` |

### 项目管理

| 名称 | catalog ID |
| --- | --- |
| Trello | `res-24ac848c2368` |
| Asana | `res-e5b40c7fcd19` |
| Jira | `res-7c726d842f83` |
| ClickUp | `res-83e921a5d723` |
| Monday.com | `res-9e5109a0eb1a` |
| Basecamp | `res-23c7898f8bd4` |

## 集合完整性与边界处理

修改前对比审计完整清单、原navigation及拟定五组，31个ID集合完全一致。新组7/6/6/6/6，共31个引用、31个唯一ID，无遗漏、重复或隐藏。catalog仍489实体。

Notion只在文档与笔记；Whimsical只在图表与白板；Discord只在沟通与会议；Jira只在项目管理。网易见外按“处理已有内容得到结果”并入文件处理，没有新增单项section。项目管理原六项保持不变，不重复放入Notion。

## Google Docs type修复

实体：`res-045262fdb9df`。

**manual → website**。

检查当前catalog实际使用的type值为：manual、website、tutorial、asset、community、software、plugin。现有configuration.schema.json用于配置记录，不是资源type枚举定义；校验脚本检查type字段存在，没有单独的资源type枚举约束。

Google Docs描述为在线文档工具/团队协作编辑；同类腾讯文档、石墨文档、金山文档均使用website。因此选用已有website，不新增type值，也不将它误作说明手册。

逐实体比较确认：Google Docs仅type变化，其他字段全部不变；其他488实体逐字段不变，包括name、description、URL、links、tags/topics、sources及relatedResources。

## 跨view与关联

31项与其他view共享ID仍为0。没有将Whimsical、Jira、Discord或Microsoft 365新增到其他领域。全部relatedResources保持原样，无新增关联或反向关联。

工作与协作之外19个view及四大区域导航逐字段不变；设备、日常、开发、美术、AI、3D、游戏制作、音频与视频和学习区均未修改。

## 文件变更

- 修改 data/navigation.js：仅工作与协作五组；previousTitles保留旧标题用于历史迁移校验，页面展示新名称。
- 修改 data/catalog.js：仅Google Docs的type字段。
- 新增 docs/work-collaboration-regrouping-report.md。

无文件删除；校验脚本、原审计和迁移文档、UI/CSS/JS/HTML、关联组件均不改。沿用普通section、五项快速导航、原卡片和响应式布局，没有增加Tab。

## 发现但未处理问题

diagrams.net/draw.io差异、Microsoft Office与Microsoft 365关系、Jira类型粒度、主观及价格/数量文案、旧tags/topics和同品牌产品关系全部保持原样。未验证第三方URL；未发现需要扩大修改范围的新问题。授权页既有favicon请求404未处理，不属于JavaScript pageerror。

## 浏览器验证与校验

- Playwright 72组通过：1440px、390px各覆盖20view、14旧入口和美术另外两个领域。主卡片集合、名称、描述及URL/null状态与数据一致，无遗漏、重复。
- 工作与协作顶部显示五项新导航，31项卡片正常，未出现新增关联按钮。无横向溢出、零JavaScript pageerror；已查看桌面和手机截图。
- node scripts/validate.mjs通过：489实体、498历史来源、20view、14旧入口及209内部引用；git diff --check通过。
- 文件SHA-256核对：仅两份数据文件及本报告变化；Art Notes、Music Library无新增、删除或修改。三仓库HEAD与Git配置未变，未 commit、未 push。

## Git diff/status摘要

- 本轮 data/catalog.js：+1 / -1 行。
- 本轮 data/navigation.js：+34 / -7 行。
- 新增本报告，无删除。以下Git统计包含既有未提交阶段，不是本轮单独差异；未跟踪文件内容不计入diff统计。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1690 +++++++++++++++++++++++++++++++++++++++--
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
 20 files changed, 1980 insertions(+), 94 deletions(-)
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
