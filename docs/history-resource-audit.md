# 「学习与研究 → 历史」32 项资源专项完整审计

审计日期：2026-10-04  
审计对象：`data/navigation.js` 中 `AR_VIEWS.history` 当前引用的 32 个 catalog 实体。  
审计方式：仅检查本地 `catalog`、`navigation`、`legacy`、旧资源快照、旧 HTML、迁移记录、既有修正记录及校验记录；本轮未联网。  
审计边界：只记录资源性质、现有结构、共享关系、关联候选和数据质量问题，不执行最终重新分类。

## 1. 当前 history view 概况

- view key：`history`
- 所属大区：`learn`（学习与研究）
- 当前资源引用数：32
- 去重后的 catalog 实体数：32
- section 数：5
- view 内重复 ID：0
- 与其他 view 共享的 ID：0
- 已有 `relatedResources`：0
- 被其他实体通过 `relatedResources` 引用：0

### 当前 section

| 顺序 | section | section ID | 数量 |
|---:|---|---|---:|
| 1 | 历史地图 | `section-69324106cd` | 8 |
| 2 | 维基百科类别 | `section-a2c1857991` | 5 |
| 3 | 欧洲历史 | `section-0de20b2199` | 9 |
| 4 | 其他地区历史 | `section-378c1c3808` | 5 |
| 5 | 历史学习网站 | `section-746159982e` | 5 |
| **合计** | — | — | **32** |

## 2. 32 项完整资源清单

“性质”仅依据本地名称、description、URL 形态、source 和原分组判断，不包含联网核验。

### 2.1 历史地图（8）

| 名称 | catalog ID | type | 当前 URL | source | 当前性质 |
|---|---|---|---|---|---|
| 历史地图（全历史） | `res-8a5ad8ede2e1` | `website` | `https://www.allhistory.com/map` | `history:0:1` | 全历史平台中的专用地图子入口。 |
| 国学导航－中国历史地图集 | `res-59d18d3be24a` | `website` | `http://www.guoxue123.com/other/map/zgmap/` | `history:0:2` | 中国历史地图集入口。 |
| 地图窝 中国历史地图 | `res-df82b0297031` | `website` | `http://www.onegreen.net/maps/List/List_787.html` | `history:0:3` | 中国历史地图列表/集合页。 |
| 世界历史地图 | `res-362623d636fc` | `website` | `null` | `history:0:4` | 无当前入口的全球历史地图文本卡片；旧 URL 已被明确撤下。 |
| 中国古代史地图 | `res-29b208b30ff4` | `website` | `http://home.olemiss.edu/~gg/hstrymap/lishidit.htm` | `history:0:5` | 中国古代史地图专题页。 |
| Old Maps Online | `res-9936eee67cba` | `website` | `https://www.oldmapsonline.org/` | `history:0:7` | 古地图在线收藏/检索入口。 |
| Library of Congress | `res-dc7d34fff586` | `website` | `https://www.loc.gov/` | `history:0:8` | 美国国会图书馆根入口；当前 URL 不是地图专页。 |
| 知乎文章：历史爱好者福利 | `res-33669263358e` | `website` | `https://zhuanlan.zhihu.com/p/25658582` | `history:0:9` | 关于 6000 年世界历史地图演变资源的推荐文章。 |

### 2.2 维基百科类别（5）

| 名称 | catalog ID | type | 当前 URL | source | 当前性质 |
|---|---|---|---|---|---|
| Category: History | `res-a69a9e6403ca` | `website` | `https://en.wikipedia.org/wiki/Category:History` | `history:1:0` | Wikipedia 历史分类体系入口。 |
| Category: Regions | `res-e50118dbd004` | `website` | `https://en.wikipedia.org/wiki/Category:Regions` | `history:1:1` | Wikipedia 地区分类入口；URL 本身不是历史专属分类。 |
| Category: History by Ethnic Group | `res-a9448363a385` | `website` | `https://en.wikipedia.org/wiki/Category:History_by_ethnic_group` | `history:1:2` | 按族群组织历史内容的分类入口。 |
| Category: History by Location | `res-83e60682465b` | `website` | `https://en.wikipedia.org/wiki/Category:History_by_location` | `history:1:3` | 按地点组织历史内容的分类入口。 |
| Human History | `res-26db60028f7d` | `website` | `https://en.wikipedia.org/wiki/Human_history` | `history:1:4` | 一篇人类历史总览文章，不是 category 入口。 |

### 2.3 欧洲历史（9）

| 名称 | catalog ID | type | 当前 URL | source | 当前性质 |
|---|---|---|---|---|---|
| History of England | `res-490b867ae53f` | `website` | `https://en.wikipedia.org/wiki/History_of_England` | `history:2:0` | 英格兰历史主题文章。 |
| Vikings | `res-fce4787393ff` | `website` | `https://en.wikipedia.org/wiki/Vikings` | `history:2:1` | 维京人这一人群/时代主题文章。 |
| History of France | `res-42e8acd0b6b6` | `website` | `https://en.wikipedia.org/wiki/History_of_France` | `history:2:2` | 法国历史主题文章。 |
| History of Germany | `res-04ccde1c97ee` | `website` | `https://en.wikipedia.org/wiki/History_of_Germany` | `history:2:3` | 德国历史主题文章。 |
| Ancient Greece | `res-fef2c5cffb67` | `website` | `https://en.wikipedia.org/wiki/Ancient_Greece` | `history:2:4` | 古希腊文明/时代主题文章。 |
| Ancient Rome | `res-c36f7ac645fa` | `website` | `https://en.wikipedia.org/wiki/Ancient_Rome` | `history:2:5` | 古罗马文明/时代主题文章。 |
| Byzantine Empire | `res-ad625dc4781b` | `website` | `https://en.wikipedia.org/wiki/Byzantine_Empire` | `history:2:6` | 拜占庭帝国主题文章。 |
| History of Italy | `res-ec3ef8eaed78` | `website` | `https://en.wikipedia.org/wiki/History_of_Italy` | `history:2:7` | 意大利历史主题文章。 |
| Crusades | `res-7ef042574726` | `website` | `https://en.wikipedia.org/wiki/Crusades` | `history:2:8` | 十字军东征这一历史事件/时期主题文章。 |

### 2.4 其他地区历史（5）

| 名称 | catalog ID | type | 当前 URL | source | 当前性质 |
|---|---|---|---|---|---|
| Ancient Egypt | `res-a6f1dae2decd` | `website` | `https://en.wikipedia.org/wiki/Ancient_Egypt` | `history:3:0` | 古埃及文明/时代主题文章。 |
| History of the Middle East | `res-445c76b4243c` | `website` | `https://en.wikipedia.org/wiki/History_of_the_Middle_East` | `history:3:1` | 中东地区历史主题文章。 |
| History of the United States | `res-4a613a2c251e` | `website` | `https://en.wikipedia.org/wiki/History_of_the_United_States` | `history:3:2` | 美国历史主题文章。 |
| History of China | `res-9526c09484d9` | `website` | `https://en.wikipedia.org/wiki/History_of_China` | `history:3:3` | 中国历史主题文章。 |
| History of Japan | `res-f99220ed7088` | `website` | `https://en.wikipedia.org/wiki/History_of_Japan` | `history:3:4` | 日本历史主题文章。 |

### 2.5 历史学习网站（5）

| 名称 | catalog ID | type | 当前 URL | source | 当前性质 |
|---|---|---|---|---|---|
| 全历史 | `res-664260a4c584` | `website` | `https://www.allhistory.com/` | `history:4:0` | 综合历史学习平台根入口。 |
| Khan Academy World History | `res-e2d4099d5637` | `tutorial` | `https://www.khanacademy.org/humanities/world-history` | `history:4:1` | 明确的世界历史课程。 |
| History Channel | `res-c03a94b59c8a` | `website` | `https://www.history.com/` | `history:4:2` | 历史主题媒体/频道官网。 |
| Encyclopedia Britannica | `res-d49532172dad` | `website` | `https://www.britannica.com/` | `history:4:3` | 百科全书根入口；description 称“历史条目”，但 URL 不是历史专页。 |
| National Geographic History | `res-1f258605e5e0` | `website` | `https://www.nationalgeographic.com/history/` | `history:4:4` | 国家地理的历史内容频道入口。 |

## 3. 历史地图 8 项逐项性质审计

### 3.1 历史地图（全历史）

- ID：`res-8a5ad8ede2e1`
- URL 明确指向 `/map` 子路径。
- 名称、description、旧分组和迁移目标都明确指向历史地图。
- 它是“某综合平台中的地图功能入口”，不是全历史平台主页的重复副本。
- 与“全历史”实体关系密切，详见第 7 节。

### 3.2 国学导航－中国历史地图集

- URL 路径包含 `/map/zgmap/`，名称与 description 都指向中国历史地图。
- 当前 section 与实际用途一致。
- 使用 `http://`，属于后续可单独核验的入口质量问题；本轮不联网、不修改。

### 3.3 地图窝 中国历史地图

- URL 路径为 `/maps/List/List_787.html`，本地数据将其描述为“全套中国历史地图”。
- 性质更接近地图列表/集合页。
- 使用 `http://`，需在未来联网审计时确认可用性及是否存在 HTTPS，但本轮不处理。

### 3.4 世界历史地图

- 当前是保留用途和名称的无 URL 文本卡片。
- 旧 URL 线索完整存在，详见第 8 节。
- 当前架构明确允许 `url: null`、`links: []`，因此不是校验错误。
- `type: website` 与“无当前网站入口”的状态存在语义张力，但这是已确认清空 URL 后保留实体造成的，不宜在本轮擅改 type。

### 3.5 中国古代史地图

- 名称、description 和 URL 路径都指向中国古代历史地图专题。
- 使用 `http://`，属于未来链接质量检查对象。
- 当前性质与 section 一致。

### 3.6 Old Maps Online

- 当前数据将其定义为“古老地图在线收藏”。
- 与按国家或时代组织的历史地图页相比，它更接近跨馆藏的古地图收藏/检索入口。
- 仍然是地图用途，放在历史地图中不构成明显跨主题混放。

### 3.7 Library of Congress

- 当前 URL 是 `https://www.loc.gov/` 根入口。
- 旧快照、migration 和当前 catalog 均没有更具体的 maps、collections 或 history 子路径。
- 因此从本地数据只能确认它是机构级综合入口，不能确认当前卡片直接进入地图馆藏。
- 它与纯地图站同处“历史地图”，是本 section 最明显的粒度/入口性质不一致之一。
- 详见第 9 节。

### 3.8 知乎文章：历史爱好者福利

- 这是单篇文章入口，不是地图数据库或地图工具。
- description 表明文章用途是推荐“6000 年世界历史地图演变资源”。
- 主题与历史地图相关，但载体性质是二级介绍/推荐内容。
- 它与地图平台同组体现了“按主题归组”，但会让 section 同时包含一手入口和介绍文章。

### 历史地图 section 总结

8 项可分辨出至少四种当前性质：

1. 专用历史地图入口或地图集：历史地图（全历史）、国学导航、中国地图窝、中国古代史地图。
2. 地图收藏/检索平台：Old Maps Online。
3. 无有效入口的保留记录：世界历史地图。
4. 综合机构入口或介绍文章：Library of Congress、知乎文章。

因此，“历史地图”主题没有错，但内部入口粒度和载体性质明显不统一，值得下一轮结构设计时重点处理。

## 4. Wikipedia 资源层级区别

当前共有 19 项 Wikipedia 入口：4 个 category、1 个总览、14 个具体历史主题。

### 4.1 四个分类入口

- `Category: History`
- `Category: Regions`
- `Category: History by Ethnic Group`
- `Category: History by Location`

性质：

- 它们是 Wikipedia 分类体系或导航入口，主要用于继续浏览下级主题。
- 其中 `Category: History`、`History by Ethnic Group`、`History by Location` 明确以历史为轴。
- `Category: Regions` 是地区分类入口，URL 本身不是历史专属分类；它与其余三个入口的主题约束不同。

### 4.2 Human History 总览

- `Human History` 是普通文章 URL：`/wiki/Human_history`。
- 它提供人类历史的总览内容，而不是组织其他页面的 category。
- 当前把它放在“维基百科类别”中，会混合“导航入口”和“阅读对象”两种用途。

### 4.3 十四个具体历史主题

欧洲历史 9 项：

- 4 个国家/地区历史：England、France、Germany、Italy。
- 2 个古代文明/时代：Ancient Greece、Ancient Rome。
- 1 个帝国：Byzantine Empire。
- 1 个人群主题：Vikings。
- 1 个事件/时期主题：Crusades。

其他地区历史 5 项：

- 3 个国家历史：United States、China、Japan。
- 1 个跨国地区历史：Middle East。
- 1 个古代文明/时代：Ancient Egypt。

这些都是普通内容文章，和 category 入口不同；但 14 项内部也混合了国家、地区、文明、帝国、人群和事件等不同主题粒度。

### 4.4 当前结构的核心区别

| 层级 | 数量 | 主要用途 | 当前问题 |
|---|---:|---|---|
| Wikipedia category | 4 | 继续浏览和发现下级条目 | `Category: Regions` 不是历史专属。 |
| Human History 总览 | 1 | 阅读整体历史概览 | 与 category 入口同组，功能不同。 |
| 具体历史主题 | 14 | 阅读某一国家、地区、文明、人群或事件 | 以地区为 section，但主题粒度并不统一。 |

## 5. “欧洲历史 / 其他地区历史”的扩展性

### 当前优点

- 现有 14 项都来自 Wikipedia 普通主题文章，资源载体一致。
- 欧洲主题数量最多，单独成组能降低当前页面浏览负担。
- 对现有小集合而言，两组名称容易理解。

### 当前扩展性问题

1. **分类不对称**  
   欧洲拥有专门 section，欧洲以外全部进入“其他地区历史”。后者天然是剩余类，随着亚洲、非洲、美洲、大洋洲资源增加会不断变宽。

2. **“地区”不是唯一组织轴**  
   Vikings 是人群，Crusades 是事件，Ancient Greece/Rome/Egypt 是文明或时代，Byzantine Empire 是政体；它们不完全等同于现代地区或国家历史。

3. **同一 section 内粒度不同**  
   `History of France` 是国家通史，`Crusades` 是跨地区历史事件；`History of the Middle East` 是大地区通史，`History of Japan` 是国家通史。

4. **继续添加资源时缺少稳定落点**  
   新增非欧洲文明、跨洲事件、全球史专题或主题史时，“其他地区历史”会成为默认容器；新增欧洲事件又可能继续进入“欧洲历史”，使两个 section 的边界越来越不对称。

### 审计结论

当前两组对 14 项现状尚能工作，但扩展性有限。下一轮若执行结构设计，应先决定主轴是地区、历史对象类型、阅读层级，还是其他标准；本轮不提出最终分类方案，也不移动任何条目。

## 6. 历史学习网站 5 项逐项性质

### 6.1 全历史

- 综合历史学习平台根入口。
- URL 是平台主页，性质比单篇文章或单门课程更宽。
- 与同平台 `/map` 子入口是两个不同实体。

### 6.2 Khan Academy World History

- 5 项中唯一 `type: tutorial` 的实体。
- URL 直接进入 world-history 课程路径。
- 性质最明确：结构化历史课程。

### 6.3 History Channel

- URL 为媒体品牌根站。
- 本地 description 是“历史频道官方网站”。
- 性质更接近历史主题媒体/内容平台，不是课程或百科。

### 6.4 Encyclopedia Britannica

- catalog description 是“大英百科全书历史条目”。
- 当前 URL 实际保存的是 `https://www.britannica.com/` 根入口，没有 history 子路径。
- 从本地数据看，它是综合百科入口，而不是直接的历史条目入口；description 与 URL 粒度不完全一致。

### 6.5 National Geographic History

- URL 明确带 `/history/`，是历史内容频道入口。
- 性质更接近编辑型历史内容栏目/杂志频道。

### section 总结

“历史学习网站”包含：

- 1 个综合历史平台；
- 1 门结构化课程；
- 1 个历史媒体官网；
- 1 个综合百科根入口；
- 1 个历史内容频道。

五项都能服务历史学习，但学习方式、内容粒度和入口性质差异明显。“网站”这一名称足够宽，因此并非错误；但它不能表达课程、百科、媒体和平台之间的区别。

## 7. 全历史与历史地图（全历史）的本地数据关系

### 两个实体

| 字段 | 全历史 | 历史地图（全历史） |
|---|---|---|
| ID | `res-664260a4c584` | `res-8a5ad8ede2e1` |
| URL | `https://www.allhistory.com/` | `https://www.allhistory.com/map` |
| description | 综合历史学习平台 | 全历史平台的历史地图 |
| section | 历史学习网站 | 历史地图 |
| source | `history:4:0` | `history:0:1` |
| relatedResources | 无 | 无 |

### 本地关系判断

- 两者来自旧 `history.js` 的不同原始位置，迁移记录分别保留两个 source key。
- URL 是同域名的根入口与 `/map` 功能子入口。
- 名称和 description 明确表明后者属于前者的平台功能。
- 它们不是同一 URL，也不是同一用途，不应被视为重复实体。
- 当前没有同 ID 共享，也没有 `relatedResources`。

### relatedResources 候选判断

- **候选强度：高。** 两者具有明确的产品/平台从属关系，且是当前 32 项中最清楚的关联候选。
- 如果未来决定增加关联，较自然的单向方向是：  
  `全历史 res-664260a4c584` → `历史地图（全历史） res-8a5ad8ede2e1`
- 理由：从综合平台卡片展开其专门地图入口，符合“总入口 → 具体功能”的发现路径。
- 反向关系并非必要：地图卡本身的名称和 description 已经说明其所属平台；双向添加可能增加重复入口。
- 本轮只做候选判断，没有写入任何关联。

## 8. 世界历史地图旧 URL 追查

实体：`res-362623d636fc`

### 当前 catalog

- `name`: 世界历史地图
- `description`: 全球历史地图资源
- `url`: `null`
- `links`: `[]`
- `type`: `website`
- `sources`: `history:0:4`

### sources 与旧资源快照

`sourceKey: history:0:4` 对应：

- page：`history`
- 原 section：历史地图
- 原序号：该 section 第 5 项（`ri: 4`）
- 旧 URL：`http://x768.com/w/twha.zh-hans/`

`data/resources/history.js` 当前作为旧迁移快照仍保留该 URL，名称和 description 与当前实体一致。

### legacy

- `data/legacy.js` 的 `history` 兼容映射仍包含 `res-362623d636fc`。
- legacy 只保存稳定 catalog ID，不保存 URL；它证明该旧页面条目仍映射到当前实体。

### 旧 HTML

- 当前 `history.html` 已改为加载 `data/catalog.js`、`data/legacy.js` 和 `js/catalog-view.js`，HTML 本身不包含资源 URL。
- Git 中上一个已提交版本的 `history.html` 加载 `data/resources/history.js`；因此旧页面也是通过旧数据文件间接获得 `http://x768.com/w/twha.zh-hans/`，不是把 URL 硬编码在 HTML 中。

### 迁移与修正记录

- `docs/migration-map.json` 保留原 URL，并把该条目迁移到 `history / 历史地图`。
- 既有本地 `docs/link-check.json` 和 `docs/phase-1-report.md` 记录该旧 URL 返回 404。
- `docs/phase-3-corrections.json` 明确记录：
  - before：旧 URL 和同 URL link；
  - after：`url: null`、`links: []`。
- `docs/phase-3-report.md` 说明该项保留名称、用途和历史区位置，只清空入口。
- `docs/phase-3-validation.json` 把该 ID 列入已验证的无 URL 卡片。

### 结论

旧 URL 线索没有丢失，完整保存在旧快照和审计记录中；当前无 URL 状态是明确修正结果，不是迁移遗漏。本轮不恢复旧 URL，也不寻找替代地址。

## 9. Library of Congress 入口性质追查

实体：`res-dc7d34fff586`

### 当前 catalog

- 名称：Library of Congress
- description：美国国会图书馆历史资源
- URL：`https://www.loc.gov/`
- source：`history:0:8`
- section：历史地图

### 旧快照与 migration

- `data/resources/history.js` 的原条目 URL 同样是 `https://www.loc.gov/`。
- 原始 ID 为 `library-of-congress`，原 section 为“历史地图”。
- `docs/migration-map.json` 保留同样的名称、description 和根 URL，并按原用途迁移到历史地图。
- 没有本地记录显示它曾使用地图专页、地图收藏页或某个具体 collection URL。

### legacy 与旧 HTML

- `data/legacy.js` 的 history 列表包含 `res-dc7d34fff586`。
- 旧版 `history.html` 通过加载 `data/resources/history.js` 使用该根 URL；HTML 本身没有提供更具体入口。

### 当前入口性质结论

- 仅凭本地 URL，可以确定它是 Library of Congress 根站入口。
- 不能从本地数据证明点击后直接进入历史地图、地图库或地图 collection。
- 它可能承载历史和地图馆藏，但当前实体的入口粒度是“综合机构门户”，而 section 语义是“历史地图”。
- 因此这是需要未来审计确认“是否保留根入口或换为更具体入口”的数据质量候选；本轮不联网、不改 URL、不移动资源。

## 10. 32 项跨 view 共享与 relatedResources

### 跨 view 共享

- 32 个实体都只出现在 `history` view。
- 与「学习与研究」其他 5 个 view 的同 ID 共享数：0。
- 与「创作与工作」全部 view 的同 ID 共享数：0。
- 与「日常与生活」全部 view 的同 ID 共享数：0。
- 与「设备与环境」全部 view 的同 ID 共享数：0。
- 32 个实体的 `contexts` 均为且仅为 `learn`。

### legacy 页面与当前 view 的区别

旧 `history` 页面兼容映射共有 35 个 ID，比当前 `history` view 多 3 个：

| ID | 名称 | 当前实际 view |
|---|---|---|
| `res-f1f736c6c199` | 谷歌地图 | 日常与生活 → 日常工具 → 地图 |
| `res-0da4e59569c4` | 观沧海 | 创作与工作 → 美术与设计 → 工具 |
| `res-64ef3d7e03d5` | AmCharts像素图生成器 | 创作与工作 → 美术与设计 → 工具 |

这三个 ID 属于旧 history 页面来源的兼容保留，不是当前 32 项的一部分，也不构成 history view 的跨 view 共享。

### relatedResources

- 当前 32 个实体都没有 `relatedResources`。
- catalog 中没有其他实体通过 `relatedResources` 引用这 32 项。
- 当前唯一清晰的候选是“全历史 → 历史地图（全历史）”，但尚未写入，详见第 7 节。

## 11. 32 项数据质量

### 字段统计

| 检查项 | 结果 |
|---|---:|
| 资源数 | 32 |
| 唯一 ID | 32 |
| URL 非空 | 31 |
| URL 为空 | 1 |
| description 为空 | 0 |
| `links.label !== name` | 0 |
| 同名不同 ID | 0 |
| 相同 URL 不同 ID | 0 |
| `website` | 31 |
| `tutorial` | 1 |
| 仍使用 `http://` | 3 |
| 每项 source 数 | 全部为 1 |
| topics 不等于 `["历史"]` | 0 |
| contexts 不等于 `["learn"]` | 0 |
| tag 与当前 section 不一致 | 0 |

### URL 问题

1. `res-362623d636fc` 世界历史地图：当前 `url: null`，但属于有审计依据的明确清空，不是未知丢失。
2. 以下 3 项仍使用 HTTP：
   - `res-59d18d3be24a` 国学导航－中国历史地图集；
   - `res-df82b0297031` 地图窝 中国历史地图；
   - `res-29b208b30ff4` 中国古代史地图。
3. `res-dc7d34fff586` Library of Congress：URL 为机构根入口，和“历史地图”的入口粒度不一致。
4. `res-d49532172dad` Encyclopedia Britannica：description 称“历史条目”，但 URL 为百科根入口。

### description 质量

- 32 项都有 description，没有空值。
- 14 个具体 Wikipedia 历史主题的 description 多为“某国/文明历史”，准确但信息量低，无法表达条目是国家通史、文明、帝国、人群还是事件。
- Library of Congress 的“美国国会图书馆历史资源”无法解释为何属于历史地图。
- History Channel 的“历史频道官方网站”和 National Geographic History 的“国家地理历史频道”可以识别品牌/栏目，但没有说明主要学习方式。
- “6000年世界历史地图演变资源推荐”中的“6000年”是内容跨度，不是明显会过期的更新时间描述。

### type 质量

- 31 项为 `website`，只有 Khan Academy World History 为 `tutorial`。
- Wikipedia 具体文章、category 页面、知乎文章、地图集合、媒体官网、百科根站和机构门户都统一使用 `website`；type 合法，但区分能力很弱。
- 世界历史地图无 URL 仍保留 `website`，属于修正后遗留的语义不一致候选。
- 本轮未发现明显非法 type，也未修改 type。

### 名称与重复

- 没有完全相同名称的不同 ID。
- 没有相同 URL 的不同 ID。
- “全历史”和“历史地图（全历史）”不是重复；前者为平台根入口，后者为地图功能入口。
- 4 个 Wikipedia category、Human History 总览和 14 个具体条目彼此 URL、用途不同，不是重复。
- 名称语言混用中文与英文，但分别沿用站点/条目原名；这属于呈现一致性问题，不是实体重复。

## 12. 当前结构问题总结

本轮只总结问题，不给出最终重新分类方案。

### 12.1 历史地图内部性质混杂

同一 section 同时包含：

- 专用历史地图/地图集；
- 古地图检索平台；
- 无 URL 保留卡片；
- 综合机构根入口；
- 地图资源推荐文章。

主题相关，但入口层级和资源载体差异明显。

### 12.2 Wikipedia 的导航层级与内容层级混合

- 4 个 category 是导航入口。
- Human History 是总览文章。
- 14 项是具体主题文章。
- Human History 当前和 category 同组，功能层级不一致。

### 12.3 地区分类不对称且扩展性有限

- 欧洲单独成组，其他所有地区共用剩余类。
- 具体主题不只按地区划分，还包括文明、帝国、人群和事件。
- 未来资源增加时，“其他地区历史”容易成为过宽容器。

### 12.4 历史学习网站是宽泛混合组

当前混合综合平台、课程、媒体、百科根入口和内容频道。五项都服务历史学习，但实际学习方式不同。

### 12.5 两个入口粒度与描述值得复核

- Library of Congress：历史地图 section 中的机构根入口。
- Encyclopedia Britannica：description 指向历史条目，URL 却是百科根入口。

### 12.6 一项无 URL、三项 HTTP

- 世界历史地图无当前入口，但有完整撤下记录。
- 三个历史地图入口仍为 HTTP；是否有效或有 HTTPS 需要未来获准联网后核验。

### 12.7 relatedResources 有一个明确候选

- 全历史平台主页与全历史地图子入口是独立实体，不应合并。
- 可在未来考虑单向 `全历史 → 历史地图（全历史）`，但本轮未新增。

## 13. 后续审计优先级建议

| 优先级 | 对象 | 原因 |
|---|---|---|
| 高 | 历史地图 8 项 | 性质最混杂；包含无 URL、HTTP、机构根入口和推荐文章。 |
| 高 | Wikipedia 19 项的层级与扩展模型 | category、总览、具体主题混合；地区分类不对称。 |
| 中 | 历史学习网站 5 项 | 课程、媒体、百科、平台和频道用途不同。 |
| 中 | Library of Congress / Britannica 入口粒度 | description 与实际保存 URL 的粒度不完全一致。 |
| 低 | type 和 description 一致性 | 当前不影响引用完整性，但检索区分能力有限。 |

这只是下一轮审计顺序建议，不代表已确定的新分类，也不授权移动或修改资源。

## 14. 本轮文件变更

本轮只新增：

- `docs/history-resource-audit.md`

本轮未修改：

- `data/catalog.js`
- `data/navigation.js`
- `data/legacy.js`
- `data/pages.js`
- `data/resources/history.js`
- 其他 `data/resources/*`
- `scripts/validate.mjs`
- 任何 HTML、CSS、JS
- Art Notes
- Music Library

本轮没有联网，没有执行重新分类，没有修改 section/view，没有移动、增删或编辑任何资源，没有新增 `relatedResources`，没有 commit，没有 push。
