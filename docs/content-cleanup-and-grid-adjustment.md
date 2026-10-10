# 内容删减 + 四列 Grid 与二级栏滚动条调整

执行日期：2026-10-09。只处理本轮明确指定的内容及两项 CSS 调整；没有继续图标 Phase 3，没有下载素材，没有修改搜索、auth、URL/history 或 art domain tab 逻辑。

## A. UI

Grid 原规则：

```css
grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
```

新规则：默认 `repeat(4, minmax(0, 1fr))`；≤1199px 降为 3 列；≤991px 降为 2 列；≤575px 降为 1 列。1920px 固定四列，不随更大窗口增加列数。

| 测试 viewport | 实际列数 | 溢出 / 图片 |
| --- | ---: | --- |
| 1920×900 | 4 | 无横向溢出，图片正常 |
| 1366×900 | 4 | 无横向溢出，图片正常 |
| 1024×900 | 3 | 无横向溢出，图片正常 |
| 768×900 | 2 | 无横向溢出，图片正常 |
| 390×900 | 1 | 无横向溢出，图片正常 |

五种宽度均检查 3D 全部 section 和长标题。美术三个 domain、软件、影视、游戏、游戏制作、AI、系统与设备另行抽样回归。标题按原规则换行 / 省略，卡片没有横向溢出。图标 slot 仍为 20×20px，图片仍为 16×16px；gap 14px、padding 14px、卡片圆角 6px 均未改。Header、容器最大宽度、一级栏和二级栏宽度不变。

仅给 `.navigation-body` 添加 scrollbar CSS：WebKit 宽度 6px、透明 track、thumb `#B7BDB6`、3px 小圆角；hover `#A2AAA0`。Firefox / 支持标准属性的浏览器使用 `scrollbar-width: thin`、`scrollbar-color`。不修改正文 scrollbar，不使用 JS scrollbar。

本机浏览器确认 pseudo scrollbar width 为 6px、标准属性为 thin；在美术设计参考页，滚轮使二级栏 scrollTop 从 0 到 164，拖动 thumb 从 164 回到 0，正文 scrollY 保持 205。未单独启动 Firefox / Safari 做跨浏览器实测；兼容样式同时提供标准属性和 WebKit 伪元素。

## B. 首页

删除首页实际存在的两个入口卡片：

- AR Art Notes：`https://ar-012.github.io/ar-art-notes/index.html`。
- 音乐资源：`library.html?view=music-study`。

本项目首页实际名称为“音乐资源”，用户所说“音乐站”对应此入口。仅移除这两个首页 a 元素；音乐学习 view、legacy 数据、历史文件和其他站点均保留。首页其他内容保持原样。

## C. Placement 移动

| 资源 | 原位置 | 最终位置 | 处理 |
| --- | --- | --- | --- |
| PureRef（res-3a81b1e5a03c） | 美术与设计 → 概念设计 → 工具；同时已经位于软件 → 图像与设计 | 设备与环境 → 软件 → 图像与设计 | 移除 art placement，保留现有 software placement；没有再插入副本，也没有改变其软件 section 内的顺序 |
| 老子云（res-4a16a898a2ea） | 创作与工作 → 3D → 软件与工具 | 创作与工作 → 3D → 模型与素材 | 从原 section 移除，添加到目标既有 section 末尾；保持其他资源相对顺序 |

两个实体的 ID、URL、description、icon / iconImage 及其他所有 catalog 字段完全不变，不 retirement。没有创建新分组。

## D. 删除与退役

### 新退役实体（6 个）

每个实体保留完整 entity snapshot、resourceId、reason、退役前全部 placements。对应 source 标记 retired；没有按 merge 处理。

| resourceId | 实际名称 | 退役前位置 | 结果 |
| --- | --- | --- | --- |
| res-25c223ccb970 | 阮佳个人信息网站 | art / 艺术家与社区 | retirement，全部有效 placement 已移除 |
| res-27a435bd6587 | MFD设计师导航 | art / 工具 | retirement，全部有效 placement 已移除 |
| res-782ef7ee4731 | KIT OPS 2 Manual | 3d / 手册与插件；extensions / 3D扩展与资源 | retirement，全部有效 placement 已移除 |
| res-0cca09db33fd | boxcutter手册 | 3d / 手册与插件；extensions / 3D扩展与资源 | retirement，全部有效 placement 已移除 |
| res-76887030b7a3 | MESHmachine参考手册 | 3d / 手册与插件；extensions / 3D扩展与资源 | retirement，全部有效 placement 已移除 |
| res-baf622d2b50c | It's Adoorable | games / 互动小游戏 | retirement，全部有效 placement 已移除 |

“互动小游戏”是 games section，里面只有 It's Adoorable（res-baf622d2b50c），不是第二个 catalog 实体。本轮退役该实体并移除变空的 section，没有删除名称相似的其他小游戏。阮佳的实际 catalog 名称为“阮佳个人信息网站”，MFD 的实际大小写为“MFD设计师导航”；退役快照保持原名。

### IINA / 播放工具

影视的“播放工具”（section-f7d76532e4）只有 IINA（res-1c23a7b77657）。移除整个影视 section 及其中 placement。IINA 保留设备与环境 → 软件 → 音频与视频，实体及无 URL 状态不变，因此不 retirement。软件 section 顺序不变。

### 插件与扩展（extensions）全部 placement

| 实体 | extensions 原位置 | 结果 / 保留位置 |
| --- | --- | --- |
| Blender Extension（res-90bbea3931de） | 3D扩展与资源 | placement removal；保留 3D → 手册与插件 |
| KIT OPS 2 Manual（res-782ef7ee4731） | 3D扩展与资源 | 与 3D placement 一并移除，retirement |
| boxcutter手册（res-0cca09db33fd） | 3D扩展与资源 | 与 3D placement 一并移除，retirement |
| MESHmachine参考手册（res-76887030b7a3） | 3D扩展与资源 | 与 3D placement 一并移除，retirement |
| blender魔酷网（res-8d8eacb7c555） | 3D扩展与资源 | placement removal；保留 3D → 教程与社区 |
| Native Instruments（res-efe4c2b50a33） | 音频插件与音源 | placement removal；保留音频与视频 → 音频制作工具 |

extensions 清空后，从 AR_VIEWS 和设备与环境的可见导航中移除该 view，两个空 section 不保留。一级四大区、其他二级 view 顺序和架构不变。没有删除任何 legacy HTML / 原始 resources 文件。直接访问旧的 `?view=extensions` 会使用原有“未找到分类”处理；没有改写 URL/history 机制，也没有留下可见空入口。

## E. relatedResources

仅修改 Blender（res-b60e9fdc1539）的关系数组：10 → 7。删除三个已退役手册目标，其他有效边保留原顺序。

| 原顺序 | resourceId | 名称 | 处理 |
| ---: | --- | --- | --- |
| 1 | res-3a9f5c96c220 | Blender 参考手册 | 保留 |
| 2 | res-90bbea3931de | Blender Extension | 保留 |
| 3 | res-7b921cd30d30 | Superhive | 保留 |
| 4 | res-0cca09db33fd | boxcutter手册 | 删除退役目标 |
| 5 | res-d08195ed9949 | BlenderBros的Gumroad | 保留 |
| 6 | res-1151a8221b4f | BlenderBros主页 | 保留 |
| 7 | res-8d8eacb7c555 | blender魔酷网 | 保留 |
| 8 | res-782ef7ee4731 | KIT OPS 2 Manual | 删除退役目标 |
| 9 | res-76887030b7a3 | MESHmachine参考手册 | 删除退役目标 |
| 10 | res-a05767c5d3d9 | 斑斓中国 | 保留 |

最终顺序：Blender 参考手册、Blender Extension、Superhive、BlenderBros的Gumroad、BlenderBros主页、blender魔酷网、斑斓中国。未添加新的关系。全站其他 relatedResources 数组完全不变，所有剩余目标指向 active entity。浏览器展开 Blender 后只显示这 7 项，展开 / 收起正常。

## F. 数据指标

| 指标 | 修改前 | 修改后 | 原因 |
| --- | ---: | ---: | --- |
| entities | 470 | 464 | 6 个实体退役 |
| retired entities | 17 | 23 | 新增 6 条完整退役记录 |
| views | 20 | 19 | 移除已清空的 extensions |
| activeURLs | 463 | 456 | 6 个退役实体共有 7 条 active links，MFD 有两个 URL |
| NO_ACTIVE_URL | 11 | 11 | IINA 等无 URL 实体仍保留 |
| art mappings | 165 | 162 | 阮佳、MFD 退役，PureRef 移出 art |
| relatedResources edges | 21 | 18 | 仅删 Blender 的 3 个退役目标 |
| internalLinks | 209 | 208 | 移除首页音乐资源的一个本地 href；Notes 为外链，不计 internalLinks |
| sources | 498 | 498 | 历史 source 不删 |
| mergedSources | 11 | 11 | 本轮不是 merge |
| legacyPages | 14 | 14 | 兼容入口不删 |
| confirmedCorrections | 43 | 43 | 没有新增或改动 correction |
| 图片实体 | 94 | 94 | 没有补图或退休图片实体 |

### Migration / legacy / art mapping 最小同步

- `migration.resourceCount` 同步为 464，在现有 `retired` 数组末尾新增 6 条记录，不发明新 schema。17 条既有退休记录完全不变。
- 6 个实体共有 7 个原始 source（MFD 两个）；这 7 行 resourceId 置 null，标记 status=retired，记录 retiredResourceId。其原 destinations 保留为历史事实，并由退役前 placements / previousTitles 追溯。
- 另外 6 个仍 active 的 source 行更新 destinations，移除失效 placement 或同步移动。498 条 sourceKey、original、来源顺序和 sourceCounts 全部不变；其余 485 个 migration 行完全不变。deduplicated 11 条（包括已退役 MFD 的历史 merge）、review 和全部 corrections 不变。
- legacy 仅过滤 6 个已退役 ID，防止兼容页悬空引用；仍 active 的 PureRef / IINA / 共享资源保留。14 个 legacy 页面、元信息和所有原始 `data/resources/` 内容完整不变，历史 source 未删除。
- 当前 `docs/art-regrouping.json` 映射移除阮佳、MFD、PureRef 三行并更新 resourceCount=162，以匹配 active art placement；其旧映射行完整保存在本报告附录，两个退役实体另有 migration entity / placement 快照。其他 162 行不变。

| sourceKey | 实体 | 原 destinations | 新 destinations / 状态 |
| --- | --- | --- | --- |
| 3d-art:0:1 | Blender Extension | 3d / 软件、插件与手册；extensions / 3D插件与手册 | 3d / 软件、插件与手册 |
| 3d-art:0:2 | KIT OPS 2 Manual | 3d / 软件、插件与手册；extensions / 3D插件与手册 | retired；原 destinations 作为历史保留 |
| 3d-art:0:3 | boxcutter手册 | 3d / 软件、插件与手册；extensions / 3D插件与手册 | retired；原 destinations 作为历史保留 |
| 3d-art:0:4 | MESHmachine参考手册 | 3d / 软件、插件与手册；extensions / 3D插件与手册 | retired；原 destinations 作为历史保留 |
| 3d-art:3:14 | blender魔酷网 | 3d / 素材；extensions / 3D插件与手册 | 3d / 素材 |
| 3d-art:3:21 | 老子云 | 3d / 软件、插件与手册 | 3d / 模型与素材 |
| concept-art:8:4 | 阮佳个人信息网站 | art / 概念设计 · CG艺术家 | retired；原 destinations 作为历史保留 |
| concept-art:10:0 | MFD设计师导航 | art / 概念设计 · 其他工具 | retired；原 destinations 作为历史保留 |
| daily-essentials:5:5 | It's Adoorable | games / 互动小游戏 | retired；原 destinations 作为历史保留 |
| installation-software:5:2 | PureRef | software / 2D美术软件；art / 视觉设计 · 软件与工具 | software / 2D美术软件 |
| installation-software:8:4 | IINA | software / Mac专用软件；film / 播放工具 | software / Mac专用软件 |
| visual-communication:7:2 | MFD设计师导航 | art / 概念设计 · 其他工具 | retired；原 destinations 作为历史保留 |
| music:5:8 | Native Instruments | av / 音乐制作；extensions / 音频插件与音色 | av / 音乐制作 |

### destinations 一致性复核（2026-10-10）

`destinations` 是 source 到目标 placement 的追溯映射，不是当前 UI section 标题的逐字镜像，也不是任意的原始 source 分类。原始分类另由 `group` / `original` 保存。根据 `docs/architecture.md` 的兼容约定及 validator，active source 的目标必须在当前 view 中包含该 resourceId，但 section 名允许是当前 `title` 或该目标 section 的 `previousTitles`；retired source 则对应退役快照中的历史 placement。删除或移动 placement 需要同步目标，单纯更名可保留历史目标名。

因此表中的 `blender魔酷网 → 3d / 素材` 保留的是历史**目标 section 名**。当前 `3d → 教程与社区` 的 `previousTitles` 包含“素材”，且包含 res-8d8eacb7c555，故正确解析到教程与社区；即使“模型与素材”也保留了同一旧标题，validator 仍结合 resourceId 区分，不会把该资源指向模型与素材。它不是另一个 active placement，也不是仅凭原始 group 就视为有效。

| 资源 | destinations 中保留的目标名 | 当前 navigation 目标 | 匹配依据 |
| --- | --- | --- | --- |
| blender魔酷网 | 3d / 素材 | 3D → 教程与社区 | 目标 previousTitles 包含“素材”，并包含该 ID |
| Blender Extension | 3d / 软件、插件与手册 | 3D → 手册与插件 | 目标 previousTitles 包含旧名，并包含该 ID |
| PureRef | software / 2D美术软件 | 软件 → 图像与设计 | 目标 previousTitles 包含旧名，并包含该 ID |
| IINA | software / Mac专用软件 | 软件 → 音频与视频 | 目标 previousTitles 包含旧名，并包含该 ID |
| Native Instruments | av / 音乐制作 | 音频与视频 → 音频制作工具 | 目标 previousTitles 包含旧名，并包含该 ID |
| 老子云 | 3d / 模型与素材 | 3D → 模型与素材 | 当前 title 精确匹配，并包含该 ID |

六项均只有一个匹配的当前目标，未发现真实语义不一致。本次不修改任何 migration 行、navigation、catalog 或 UI；仅补充本报告说明。原 source `reason` 保留迁移当时的解释，不作为当前 placement 列表；当前可达位置由 destinations 与 navigation 的 ID / 标题兼容匹配确定。

### Validator 必要同步

`scripts/validate.mjs` 原本写死 470 entities、20 views、165 art mappings，现同步为 464、19、162。其 active placement 覆盖、唯一性、非空 section / view、source 覆盖、原始历史、URL、legacy、relatedResources 检查继续执行。

原来的退役 snapshot 检查要求每个历史 placement 的 view 当前仍存在。extensions 本轮被明确删除，但旧退役记录及本轮三个手册必须保留历史 extensions placement，因此改为：view 当前存在，或该退役实体自身的历史 retired source destinations 明确记录该 view。没有添加 ID exception，没有放宽 active 引用约束，没有把历史记录当 active placement。

## G. 验证

- `node scripts/validate.mjs`：PASS。
- `git diff --check`：PASS。
- 修改的数据 JS、validator 的 `node --check`：PASS；两项新增 CSS 规则在浏览器实际解析并符合上述测量。
- 464 个 active resource 全部至少有合法 placement；navigation view 入口有效，所有 section resourceId 和 relatedResources target 都指向 active entity。
- 不存在空 section 或空的可见 view。6 个新增退休 snapshot 与修改前实体逐字段相等，全部原 placement 与 source 保留，17 个旧 snapshot 不变。
- 463 个保留实体对象完全不变；唯一修改的 active 对象是 Blender，只删 3 条失效关系。包括 PureRef、老子云、IINA、Phase 3 第一批图标和 D 类修复在内，其他字段均未改变。
- 浏览器检查：五个宽度的 3D 页面；美术三个 domain；软件、影视、游戏、游戏制作、AI、系统与设备；首页和二级栏滚动 / 拖动；Blender 相关资源。页面图片正常，无横向溢出。
- 搜索阮佳、MFD、boxcutter、KIT OPS、MESHmachine、It's Adoorable：均无结果。PureRef 仅显示 software / 图像与设计；IINA 仅显示 software / 音频与视频；Blender Extension、Native Instruments、老子云均只返回保留的有效 placement。搜索实现本身未改。
- 影视没有 IINA placement / 播放工具 section；软件仍有 IINA。美术各 domain 不再出现阮佳、MFD、PureRef。游戏没有互动小游戏空 section。其他抽样页面资源顺序保持原样。

## 实际修改文件

- `css/resource-page.css`：明确四列及降列断点。
- `css/styles.css`：二级栏 scrollbar。
- `index.html`：删除两个首页入口卡片。
- `data/catalog.js`：移除 6 个退役实体，Blender 删除 3 条关联。
- `data/navigation.js`：指定 placement 删减 / 移动，删除空 section、extensions view / 可见入口。
- `data/legacy.js`：过滤退役 ID。
- `docs/migration-map.json`：新增 retirement、同步 13 行状态 / destinations 和数量。
- `docs/art-regrouping.json`：同步当前 art mappings。
- `scripts/validate.mjs`：同步数量及已移除 view 的历史 placement 验证。
- `docs/content-cleanup-and-grid-adjustment.md`：本报告。

按本轮开始时全项目 SHA-256 检查，既有文件仅上述 9 个改变；其他文件及所有图标文件保持不变。本轮开始前的未提交图标 / renderer 修复保留，没有撤销或计为本轮修改。没有删除任何文件，没有 commit，没有 push。本轮到此停止。

## 附录：移除的旧 art mapping 行

```json
[
  {
    "resourceId": "res-25c223ccb970",
    "name": "阮佳个人信息网站",
    "previousSectionId": "section-e7ab0bcba9",
    "previousTitle": "概念设计 · CG艺术家",
    "sectionId": "art-concept-artists",
    "sectionTitle": "艺术家与社区",
    "path": "concept//artists",
    "reason": "结合名称、说明、来源与标签，归并同用途分组"
  },
  {
    "resourceId": "res-27a435bd6587",
    "name": "MFD设计师导航",
    "previousSectionId": "section-2c0593f1e6",
    "previousTitle": "概念设计 · 其他工具",
    "sectionId": "art-concept-tools",
    "sectionTitle": "工具",
    "path": "concept//tools",
    "reason": "结合名称、说明、来源与标签，归并同用途分组"
  },
  {
    "resourceId": "res-3a81b1e5a03c",
    "name": "PureRef",
    "previousSectionId": "section-da923bdc94",
    "previousTitle": "视觉设计 · 软件与工具",
    "sectionId": "art-concept-tools",
    "sectionTitle": "工具",
    "path": "concept//tools",
    "reason": "参考图管理用途，从视觉设计工具归入概念设计工具；设备软件引用不变"
  }
]
```
