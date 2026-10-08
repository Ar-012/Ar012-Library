# 第一阶段内容架构

定位：个人资源与配置库。用途优先，领域其次，资源类型再次。保持原生 HTML/CSS/JS，无构建依赖、后端或数据库。

## 分析依据与边界

读取主站全部 14 个资源数据文件（474 条）、导航、页面、渲染与布局代码；读取 Music Library 当前工作区的 24 个网站入口及其他页面的内容结构；检查 Art Notes 页面、翻译、画师与本地素材结构，提取外部锚点。Music Library 的 6 个未提交 HTML 文件仅只读采集，原始文件不修改。Art Notes、Photobash 保持原状。

工作区及附件中未找到用户提及的《个人资料网站-项目现状盘点.md》，已请求路径；本报告不冒充原盘点文档。当前分析以实际工作区数据为准，后续需要对照该文档补核。

修改运行代码前，已建立 `migration-map.json`：498 个来源条目的原始数据、稳定来源键、新资源 ID、目标领域及 section。该映射为审计记录，不作为运行数据维护入口。

## 页面粒度

仅新增一个 `library.html` 共享模板，使用 `?view=3d` 等参数显示领域；section 不生成 HTML。导航只有四个一级区域。额外的「开发学习」「综合资料」来自实际已有课程、百科、语言资料和跨学科学习导航，不创建无内容学科。

原 14 个 HTML 保留兼容入口：仍显示原来收藏的资源集合，但按新用途分组，并提供前往新分类的链接。它们读取同一实体库，不再加载旧资源数组。旧 `data/resources/*.js` 只作原始迁移快照保留，不再是维护或运行数据源。

## 数据模型

- `data/catalog.js`：唯一活动资源实体表 `AR_CATALOG`。字段 `id/name/description/url/icon` 保留显示能力；`topics/contexts/type/tags` 独立描述领域、用途、类型与标签；`links` 保留同一资源的不同旧入口；`sources` 关联审计来源；`reviewNotes` 标记待确认原始问题。ID 固定保存，后续改名改 URL 不重算 ID。
- `data/navigation.js`：四区域导航及 `AR_VIEWS`；每个 section 仅存 `resourceIds`，不复制实体。一个实体可在多个领域出现，同一领域不重复。
- `data/legacy.js`：旧页面到资源 ID 的兼容映射，不复制实体。
- `data/pages.js`：旧页面元信息，兼容原书签。
- `data/configuration.schema.json`：未来配置记录规范，关联 `resourceId`，可记录平台、版本、设置、快捷键、工作区、安装清单、恢复步骤与本地附件。没有任何虚构配置实例；「我的配置」不创建空导航页。

资源类型是检索属性，不决定页面位置。Blender 软件和 Blender 手册是不同实体，软件本身在 3D 和设备软件视图共享同一 ID。手册与插件记录可用未来配置中的资源 ID 关联，不复制软件资料。

## 去重与链接保留

仅合并相同 URL 或已明确同一产品的主页/下载入口。共 498 个来源映射为 489 个实体，合并 9 个重复来源。原名称、描述、分组、URL 均保存在迁移映射，不同入口在实体 links 中保留且可打开。不同手册版本、文章、社区栏目、镜像地址不因同域名而合并。缺少 URL 的 7 个软件记录保留为文本卡片。

维护时编辑 catalog 的实体和 navigation 的引用；不再编辑旧快照或重复跑基于旧数据的导入覆盖新内容。使用 `node scripts/validate.mjs` 检查引用、迁移覆盖、内部文件与 URL 保留。

## 第二阶段：美术与设计的内部层级

`AR_VIEWS.art.sections` 仍是唯一的 section / resourceIds 展示表；新增 `domains`，其中概念设计、视觉设计、设计参考通过 groups / sectionIds 引用 section，不复制资源。设计参考的 groups 为服装与时尚、武器。其他 19 个视图不启用此呈现方式。

`catalog-view.js` 仅为美术主视图设置 `AR_RESOURCE_DOMAINS`；renderer 按 URL fragment 选择领域，顶部固定只有三个内部领域链接。细分分类只在当前领域出现。无需新 HTML、框架、搜索或持久化状态。刷新、前进/后退、直接链接 section 均可恢复领域；手机沿用原有单列卡片。

第一阶段 migration-map.json、legacy.js 保留不改。新 section 的 `previousTitles` 供原迁移映射校验；`sectionAliases` 将旧美术 section 锚点映射到新 section。旧分组被拆到多个 section 时，旧锚点打开包含其首条资源的分组，全部原资源仍通过领域导航可达。旧 14 个 HTML 继续显示来源集合与完整分类路径。

`docs/art-regrouping.json` 记录 168 项的第一阶段 section → 第二阶段 section。catalog 中旧 tags 作为已有描述标签保留，不用于生成新的标题或导航；资源实体不因领域切换复制。学习区 research 的显示标题及 6 个实体的相关 topics 改为“学习资源”，URL key 不变。

## 第三阶段：人工确认修正与无 URL 记录

资源的 `url: null` 是有效状态，不代表数据错误，也不要求补充官方网站。无入口的实体仍可用于软件、参考资料和未来配置记录；其 `links` 为空，现有渲染器显示非链接卡片。本阶段无需改变渲染、CSS、导航或兼容逻辑。

`links` 只包含当前有效且应展示的入口。用户确认撤下的错误/失效 URL 不作为备用链接保留；原值继续保存在不可变的第一阶段迁移记录及 `docs/phase-3-corrections.json` 审计记录中。后者记录本次九项的修改前后字段，不参与运行时渲染，也不是第二份活动实体库。

校验脚本仍检查历史来源覆盖，但允许该审计明确批准的 URL 替换/清空，并检查这些旧 URL 不再出现在活动链接里。修正名称和 URL 不重算 ID；真正的 Deepseek 对话和腾讯混元3D 保持原有两个独立 ID。

## 第四阶段：相关资源

实体可选字段 `relatedResources: string[]` 仅保存现有 catalog 实体 ID，按数组顺序展示。当前仅 Blender 设置此字段；关联是单向快速入口，不改变任何分类、用途或原位置。校验器拒绝不存在的 ID、重复引用及自引用。未设置或空数组不显示按钮。

渲染器通过 ID 查询同一 catalog 的名称与 URL。主链接和原生 button 是同级元素；button 使用 aria-expanded / aria-controls，控制默认 hidden 的紧凑列表。点击按钮阻止默认事件和冒泡，不打开主链接。相关实体无 URL 时渲染 span，且不递归展开关联。不保存展开状态，不生成详情页或个人配置。
