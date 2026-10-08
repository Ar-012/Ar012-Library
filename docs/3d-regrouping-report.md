# 3D 信息架构整理报告

日期：2026-10-04。依据 docs/3d-resource-audit.md 和用户确认方案，仅整理现有48项3D资源。未联网调查，未 commit、未 push。

## 整理前后

| 整理前 | 数量 |
| --- | ---: |
| 软件、插件与手册 | 12 |
| 素材 | 28 |
| 教程与社区 | 7 |
| 素材与参考 | 1 |

| 整理后 | 数量 |
| --- | ---: |
| 软件与工具 | 5 |
| 手册与插件 | 8 |
| 模型与素材 | 19 |
| 材质与环境 | 8 |
| 教程与社区 | 8 |

## 新五组完整清单

### 软件与工具（5项）

| 资源名称 | catalog ID |
| --- | --- |
| Blender | `res-b60e9fdc1539` |
| Gaea | `res-684127ed910a` |
| Marvelous Designer | `res-19b4b0a8487e` |
| 老子云 | `res-4a16a898a2ea` |
| Quixel Bridge | `res-5ee7019b67b3` |

### 手册与插件（8项）

| 资源名称 | catalog ID |
| --- | --- |
| Blender 3.1 参考手册 | `res-3a9f5c96c220` |
| Blender Extension | `res-90bbea3931de` |
| KIT OPS 2 Manual | `res-782ef7ee4731` |
| boxcutter手册 | `res-0cca09db33fd` |
| MESHmachine参考手册 | `res-76887030b7a3` |
| gaea Guide | `res-5193234cd6bc` |
| 3DCoat Wiki | `res-59a8c3235c8e` |
| marvelous designer官方手册 | `res-d9f8c92e89a4` |

### 模型与素材（19项）

| 资源名称 | catalog ID |
| --- | --- |
| Gumroad | `res-80dd5275c945` |
| Blender Market | `res-7b921cd30d30` |
| BlenderBros的Gumroad | `res-d08195ed9949` |
| KitBash 3d | `res-5154a7315483` |
| Poly Haven | `res-8089d1901b4f` |
| sketchfab | `res-2df2e56cb739` |
| free3d | `res-d399abe2ed4f` |
| myminifactory | `res-bfe28c897b52` |
| Mixamo | `res-bde5b2f24e5d` |
| cgtrader | `res-7e8c70baf002` |
| Three D Scans | `res-1fd1e7c5726d` |
| 龋齿一号 | `res-d2e7f9db431e` |
| CG 3DA | `res-aa38f347cac6` |
| CG pepper | `res-c9755226e683` |
| modown魔顿 | `res-297f934b6192` |
| CG模型网 | `res-d45d28a023c7` |
| 书生CG资源网 | `res-0b621b7aa006` |
| Pixelsquid 3d | `res-21fe07c8d7cc` |
| 斑斓中国 | `res-a05767c5d3d9` |

### 材质与环境（8项）

| 资源名称 | catalog ID |
| --- | --- |
| textures.com | `res-75c876058f32` |
| ninja | `res-c816da9bb133` |
| lughertexture | `res-72b102f13e59` |
| ambientCG | `res-05a5769075d9` |
| Poliigon | `res-bb69c3a20418` |
| hdrlabs | `res-ccafe101a1b7` |
| hdri skies | `res-ab76c716a489` |
| physicallybased | `res-cd65f492a506` |

### 教程与社区（8项）

| 资源名称 | catalog ID |
| --- | --- |
| Ponte的Smugmug个人主页 | `res-bda5cef98698` |
| BlenderBros主页 | `res-1151a8221b4f` |
| the gnomon workshop | `res-d5902ad2cf83` |
| 画忆妙妙屋 | `res-bd114f6473d7` |
| aboutcg | `res-e885d676a4c0` |
| 3dart | `res-7f29fe2f7450` |
| zbrush central | `res-b3d6087b0983` |
| blender魔酷网 | `res-8d8eacb7c555` |

## 集合与数据完整性

修改前先从审计报告完整清单提取48个ID，与当前3D视图及拟定新分组做集合核对：三者完全一致。用户列举已覆盖全部48项，无需自行补分其他资源。新分组共48个引用、48个唯一ID，每项恰好出现一次。catalog仍为489实体；名称、描述、URL、原有元数据全部不变。

逐实体比较确认仅Gaea与Marvelous Designer增加relatedResources；Blender及其他实体完全不变。3D之外19个视图和四大区域导航逐字段比较不变。旧legacy、migration-map、art-regrouping、原审计文档及所有UI/CSS/JS/HTML均不修改。

## 边界情况与处理依据

- Poliigon：原描述未明确细分素材类型，本次依据用户明确指定放入材质与环境，不补写描述或推断网站内容。
- Poly Haven、modown魔顿：虽然含纹理/HDR，按综合素材平台放入模型与素材；每项只出现一次。
- Mixamo：模型与动作复合资源，放入模型与素材，不拆实体。
- physicallybased：材质物理参考，按材质使用场景放入材质与环境；旧单项素材与参考分组取消。
- Quixel Bridge、老子云：分别为素材管理工具与模型预览工具，放入软件与工具。
- blender魔酷网：依据用户指定的中文Blender社区/综合资源属性放入教程与社区。
- Ponte的Smugmug个人主页：作品展示入口，按本轮规则留在教程与社区。
- 龋齿一号、CG 3DA、CG pepper、书生CG资源网、斑斓中国：具体资源形态尚不完全明确，保守放入模型与素材，不联网补充。
- Blender Extension与各插件手册独立保留在手册与插件；relatedResources不用于隐藏任何卡片。

## 新关联

| 主实体 | 主实体ID | 关联目标 | 目标ID |
| --- | --- | --- | --- |
| Gaea | `res-684127ed910a` | gaea Guide | `res-5193234cd6bc` |
| Marvelous Designer | `res-19b4b0a8487e` | marvelous designer官方手册 | `res-d9f8c92e89a4` |

仅保存ID数组，不复制资源字段，不建立反向关联。Blender原10个relatedResources的值及顺序完全不变。3DCoat Wiki保持独立，未新增软件实体。

## 文件变更

相对本轮开始时：

- 修改 data/navigation.js：仅重组3D的五个section及resourceIds。previousTitles记录各新组涉及的旧标题，保持历史migration-map校验有效，不显示为页面标题。
- 修改 data/catalog.js：仅添加上述两个ID数组。
- 新增 docs/3d-regrouping-report.md：本报告。

无文件删除；无需修改渲染器、CSS或HTML。沿用简单section结构，顶部快速导航为五项，没有新增领域Tab。

## 浏览器与完整性验证

- 72组页面检查通过：1440px、390px各覆盖20视图、14旧入口及美术另外两个领域。卡片ID集合与视图数据一致，无遗漏、无重复；所有主卡片URL/null状态正确。
- 3D顶部导航准确显示五个新分类，旧“素材与参考”不再显示。physicallybased、Quixel Bridge、blender魔酷网分别位于指定新组。
- 两种宽度均验证Gaea和Marvelous Designer可展开对应手册，手册也仍有独立主卡片；Blender展开仍为10项。
- 已查看两种宽度的页面截图：五组正常显示，关联展开正常；无横向溢出，零JavaScript pageerror。
- node scripts/validate.mjs通过：489实体、498历史来源、20视图、14旧入口及209个内部文件引用；git diff --check通过。
- 全目录SHA-256比对：本轮仅两份数据文件及本报告发生变化；Art Notes和Music Library无新增、删除或修改。三仓库HEAD与Git配置不变。

## Git diff / status 摘要

- 本轮 data/navigation.js：+49 / -25 行。
- 本轮 data/catalog.js：+6 / -0 行。
- 本轮新增本报告，无文件删除；其余已有未提交修改保留。以下Git diff为全部阶段累计，包含之前工作，且不包含未跟踪文件内容。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1587 +++++++++++++++++++++++++++++++++++++++--
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
 20 files changed, 1877 insertions(+), 94 deletions(-)
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

部分资源站具体内容仍不明确，按用户规则保守归组，未改描述。hdrlabs继续允许无URL；旧版本手册及其他外链未调查、升级或清理。授权页既有favicon请求404，不属于JavaScript pageerror，本次未处理。未新增其他关联或个人配置。
