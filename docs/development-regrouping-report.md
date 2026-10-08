# 开发信息架构整理报告

日期：2026-10-04。依据开发资源审计及用户指定方案，仅整理已有21项开发资源并新增GitHub到GitHub Pages的关联。未联网调查，未 commit、未 push。

## 整理前后

| 原section | 数量 |
| --- | ---: |
| 文档与平台 | 11 |
| 开发工具 | 5 |
| 项目构建 | 5 |

| 新section | 数量 |
| --- | ---: |
| 开发工具与环境 | 4 |
| 代码与协作 | 4 |
| 云服务与部署 | 8 |
| 文档与参考 | 5 |

## 四组完整清单

### 开发工具与环境

| 名称 | catalog ID |
| --- | --- |
| Replit | `res-b8dc840fe342` |
| CodeSandbox | `res-fc646e755422` |
| StackBlitz | `res-6d5a929c971e` |
| Vite | `res-0fb5b5874dd8` |

### 代码与协作

| 名称 | catalog ID |
| --- | --- |
| GitHub | `res-09a8b930c8b7` |
| GitLab | `res-9931966bedbc` |
| Bitbucket | `res-39625eb27383` |
| Git Documentation | `res-55afbb2bf7d5` |

### 云服务与部署

| 名称 | catalog ID |
| --- | --- |
| 阿里云 | `res-be67f9854221` |
| 腾讯云 | `res-d9987c1cb6af` |
| 华为云 | `res-b4ee1ef99099` |
| 火山引擎 | `res-39a98e0d8503` |
| Cloudflare | `res-a6ad87b96b6f` |
| GitHub Pages | `res-0ee9368c2a94` |
| Vercel Docs | `res-2b470a6bc853` |
| Supabase | `res-41531850c10d` |

### 文档与参考

| 名称 | catalog ID |
| --- | --- |
| MDN Web Docs | `res-7f6f481d8db6` |
| Can I use | `res-3952e3aaa8ca` |
| VS Code Docs | `res-75b69a6994ff` |
| React Docs | `res-ddc6a11b6e06` |
| Stack Overflow | `res-180019774646` |

## 集合完整性

修改前将审计报告完整21项、原navigation与拟定分组的ID集合进行比较，完全一致。整理后4/4/8/5，共21个引用、21个唯一ID，每项在开发view恰好出现一次，无遗漏、重复或隐藏。catalog总数仍为489。

逐实体比较确认：仅GitHub新增relatedResources，其他488实体逐字段不变；GitHub原有字段也不变。所有ID、名称、description、URL保持不变。

## 开发与开发学习的边界

开发按“做项目时直接使用或查询”组织；开发学习继续用于系统学习。React Docs保留在开发的文档与参考，不新增学习区共享。开发学习原4项W3Schools、JavaScript.info、freeCodeCamp、roadmap.sh及其分组逐字段不变。

Git Documentation按版本控制与仓库工作流放入代码与协作；GitHub Pages、Vercel Docs虽为文档，按部署用途放入云服务与部署；Supabase按后端/数据库用途放入同组。Stack Overflow用于具体问题排查，放入文档与参考，不单建社区section。未新增Git或其他软件本体。

## GitHub关联

GitHub（`res-09a8b930c8b7`）新增：

```js
relatedResources: ["res-0ee9368c2a94"]
```

目标为现有GitHub Pages，仅保存ID，不复制名称、URL或描述。没有反向关联或其他新增关联。目标继续作为云服务与部署中的独立卡片存在，原有展开组件保持不变。

## 设备与环境及其他view

开发之外全部19个view和四大区域导航逐字段不变。设备与环境三个view未增加引用，开发学习、AI、3D、游戏制作、美术与设计等未修改。没有新增跨view共享。

## 文件变更

本轮修改：

- data/navigation.js：仅开发view四个section及resourceIds；previousTitles保留旧标题供历史迁移校验，不作为当前标题显示。
- data/catalog.js：仅GitHub新增一个关联ID。

新增：docs/development-regrouping-report.md。无文件删除。未修改原审计、migration-map、legacy、校验脚本、UI/CSS/HTML/渲染JS或关联组件；继续普通section结构，顶部快速导航为四项，无领域Tab。

## 发现但未处理的问题

未发现需要扩大本轮范围的新问题。GitHub Pages仍是既有的官方托管文档入口，未改为控制台或新增实体。既有描述措辞、URL和资源类型字段均保留，不调查第三方链接。授权页既有favicon请求404未处理，不属于JavaScript pageerror。

## 浏览器验证与校验

- Playwright 72组通过：1440px、390px各覆盖20view、14旧入口和美术另外两个领域。卡片集合与数据一致，无遗漏、重复；所有主卡片名称、描述、URL/null渲染正确。
- 开发顶部准确显示新四组；GitHub默认收起，可展开/收起GitHub Pages，目标仍有独立卡片。两种宽度无横向溢出，零JavaScript pageerror；已查看桌面和移动截图。
- node scripts/validate.mjs通过：489实体、498历史来源、20视图、14旧入口和209个内部引用；git diff --check通过。
- 文件SHA-256比较：本轮仅两份数据文件和本报告变化。Art Notes、Music Library无新增、删除或修改；三仓库HEAD及Git配置不变。未 commit、未 push。

## Git diff/status摘要

- 本轮 data/catalog.js：+3 / -0 行。
- 本轮 data/navigation.js：+51 / -28 行。
- 本轮新增本报告，无文件删除。以下统计包含所有既有未提交阶段，不是本轮单独差异，也不包含未跟踪文件内容。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1645 +++++++++++++++++++++++++++++++++++++++--
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
 20 files changed, 1935 insertions(+), 94 deletions(-)
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
