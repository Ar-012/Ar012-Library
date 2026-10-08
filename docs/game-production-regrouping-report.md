# 游戏制作信息架构整理报告

日期：2026-10-04。依据游戏制作资源审计及用户明确方案，仅整理现有23项资源。未联网调查，未 commit、未 push。

## 整理前后

| 整理前section | 数量 |
| --- | ---: |
| 引擎与开发 | 4 |
| 游戏美术 · Live2D | 2 |
| 游戏美术 | 5 |
| 其他制作资源 | 3 |
| UI | 3 |
| 音频与音效 | 6 |

| 整理后section | 数量 |
| --- | ---: |
| 引擎与文档 | 4 |
| 制作工具 | 5 |
| 美术、动画与素材 | 8 |
| 设计参考 | 2 |
| 音频资源 | 4 |

## 新五组完整清单

### 引擎与文档

| 资源名称 | catalog ID |
| --- | --- |
| UE5 Document | `res-f2f3d51ddf39` |
| Godot Docs官方手册 | `res-cc06f6877128` |
| Unity Manual | `res-3efd77a9188c` |
| Unreal Engine Docs | `res-03833110be8f` |

### 制作工具

| 资源名称 | catalog ID |
| --- | --- |
| Machinations | `res-58a7cc13a78c` |
| Twine | `res-37ba40863c00` |
| 即时设计 | `res-6c425859ca19` |
| jsfxr | `res-4936c36df3f4` |
| FMOD | `res-9f9c9e89ce78` |

### 美术、动画与素材

| 资源名称 | catalog ID |
| --- | --- |
| Live2D Cubism官方手册 | `res-f0d2b52d1ba5` |
| Live2D Cubism官方教程 | `res-cc39e930a6d4` |
| GGAC | `res-45aed3cae03f` |
| lospec | `res-c72b7f01237d` |
| OpenGameArt | `res-303180e4f360` |
| itch.io Game Assets | `res-d8c1e419c331` |
| Kenney Assets | `res-8c3e98efb927` |
| Lospec Palette List | `res-52fdc3546967` |

### 设计参考

| 资源名称 | catalog ID |
| --- | --- |
| GAME UI database | `res-84045aec8cf8` |
| Xbox Accessibility Guidelines | `res-4deb1157cc83` |

### 音频资源

| 资源名称 | catalog ID |
| --- | --- |
| Freesound | `res-a52cf5ddd10b` |
| Artlist | `res-d7eb5223b94b` |
| Sonniss GameAudioGDC | `res-081fc086a730` |
| 爱给网_音效配乐 | `res-b2d8bb124ac1` |

## 23项集合完整性

写入前，将审计报告完整清单、原navigation及拟定五组的ID集合进行比较，三者完全一致。整理后4 + 5 + 8 + 2 + 4 = 23个引用、23个唯一ID，无遗漏、重复、隐藏；每项恰好位于一个游戏制作section。全catalog仍为489实体。

实体逐字段比较确认：仅lospec增加relatedResources，其他488个实体及lospec原有字段完全不变。名称、描述、URL、ID均未修改；未新增、删除、合并或拆分实体。

## 主要边界资源

- 四个引擎入口均是官方文档，因此命名为“引擎与文档”；未新增引擎本体。UE5 Document与Unreal Engine Docs保持两个实体，没有相互关联。
- jsfxr、FMOD实际用于生成音效或处理游戏音频，归入制作工具；其他视图引用不动。
- Live2D手册与教程合入美术、动画与素材，各自仍是独立卡片，不新增软件本体，也不保留两项专用section。
- 即时设计为UI/原型工具，归入制作工具；Lospec Palette List为色板资源，归入美术、动画与素材。
- GAME UI database与Xbox Accessibility Guidelines作为制作时的参考、检查指南保留在游戏制作，不移动或共享到游戏设计学习视图。
- 音频资源仅保留Freesound、Artlist、Sonniss GameAudioGDC、爱给网_音效配乐四项素材入口。

## lospec关联结果

`res-c72b7f01237d`（lospec）新增：

```js
relatedResources: ["res-52fdc3546967"]
```

目标为现有Lospec Palette List实体。仅保存ID，不复制名称、描述或URL，不建立反向关联。沿用原有展开组件；目标仍作为美术、动画与素材中的独立卡片显示。Blender、Gaea、Marvelous Designer等原有关联完全不变。

## 其他视图与共享引用

逐字段比较确认：除游戏制作外的全部19个view和四大区域导航完全不变，包括3D、美术与设计、学习与研究→游戏设计及音频与视频。

音频与视频原6项共享ID保持不变：

| 资源 | ID | 音频与视频中的section |
| --- | --- | --- |
| Freesound | `res-a52cf5ddd10b` | 音效 |
| Artlist | `res-d7eb5223b94b` | 音效 |
| Sonniss GameAudioGDC | `res-081fc086a730` | 音效 |
| 爱给网_音效配乐 | `res-b2d8bb124ac1` | 音效 |
| jsfxr | `res-4936c36df3f4` | 音乐制作 |
| FMOD | `res-9f9c9e89ce78` | 音乐制作 |

## 文件变更

相对本轮开始时，仅修改：

- data/navigation.js：游戏制作section与resourceIds调整，保留previousTitles供原迁移映射校验；页面仅显示新标题。
- data/catalog.js：lospec新增单个关联ID。

新增：docs/game-production-regrouping-report.md。无删除文件。未修改审计、migration-map、legacy、其他既有文档或任何UI/CSS/JS/HTML；保持普通section结构，未新增Tab。

## 浏览器与校验结果

- Playwright 72组页面回归通过：1440px、390px各覆盖20个view、14个旧入口和美术另外两个领域。主卡片ID与视图集合一致，无遗漏、重复或错误URL/null渲染。
- 游戏制作顶部导航准确显示五项，资源数为4/5/8/2/4。旧Live2D与UI独立section消失；所有指定资源均按新分组显示。
- 两种宽度均验证lospec默认收起、可展开/收起Lospec Palette List，目标仍有独立卡片；无横向溢出，无JavaScript pageerror。已查看两种宽度页面截图。
- node scripts/validate.mjs通过：489实体、498来源、20视图、14旧入口、209个内部引用；git diff --check通过。
- 文件哈希核对：本轮仅两份数据文件及本报告变化。Art Notes和Music Library均无新增、删除或修改；三仓库HEAD与Git配置保持不变。

## Git diff/status摘要

- 本轮 data/navigation.js：+46 / -32 行。
- 本轮 data/catalog.js：+3 / -0 行。
- 本轮新增本报告，无文件删除；原有未提交工作保持。以下Git统计是全部阶段累计，不是本轮单独差异，也不包含未跟踪文件的内容。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1601 +++++++++++++++++++++++++++++++++++++++--
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
 20 files changed, 1891 insertions(+), 94 deletions(-)
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

## 发现但未处理的问题

UE5 Document与Unreal Engine Docs的内容关系仍未调查，保持原状；没有发现需要扩大本轮范围的新问题。未调查或修复外部URL，未建立其他关联。授权页既有favicon请求404未处理，不属于JavaScript pageerror。未 commit、未 push。
