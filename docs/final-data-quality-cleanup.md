# 最终数据质量收尾 · 官方入口与版本手册

执行日期：2026-10-07。完成 8 个授权实体的入口、身份、翻译和手册信息修正；本轮未增加或退休实体。validator、git diff --check 与对象 / 文件不变性验证均 PASS。未 commit，未 push。

## 1. 本轮范围

仅处理美叶、Quixel Bridge、Category: Firearm Actions、腾祥字库、万兴优转 / Media.io、Blender 手册、旧 UE5 5.1 文档、Live2D Cubism 手册。没有处理其他资源，没有做 HTTP → HTTPS 批量升级、NO_ACTIVE_URL 补充或新 dedup。

修改前在 `/tmp` 保存对象快照及全部既有文件 SHA-256；临时脚本未加入项目。本轮只读取本指令范围内的 Epic UE root、Bridge 文档、Blender 中文 latest、Live2D 中文 current manual 四个官方页面，没有联网扩展其他搜索。

## 2. 美叶核对结果

resourceId：`res-1ae22675a24d`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | https://www.meiye.art/canvas/1/402 | https://meiye.art/ |
| description | 插画、网页、图标设计案例参考 | 综合设计灵感平台，涵盖 UI、网页、插画、品牌与平面设计参考。 |

主 links 同步对应 URL / label；其他字段保持不变。

实际旧 URL 仍是具体 canvas 页面，因此更新为用户已核实、旧审计亦确认的官网首页。name 继续为“美叶”，type、placement、tags、sources 和其他字段不变；仍位于 art / 灵感与案例，未调整分类。新增一条 correction，记录 URL、description、links 的前后值。

## 3. Quixel Bridge 更新

resourceId：`res-5ee7019b67b3`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | https://quixel.com/ | https://dev.epicgames.com/documentation/unreal-engine/quixel-bridge-plugin-for-unreal-engine |
| description | 素材管理工具 | Unreal Engine 内的 Megascans 资源导入工具；已弃用，相关资产与功能正迁移至 Fab。 |

主 links 同步对应 URL / label；其他字段保持不变。

name 继续为 Quixel Bridge，type 继续为 software。Epic 官方文档明确标记 Deprecated，并说明 Bridge 可访问的内容现已可通过 Fab 获取，支持指令给定的弃用 / 迁移描述。[Epic Bridge 官方文档](https://dev.epicgames.com/documentation/unreal-engine/quixel-bridge-plugin-for-unreal-engine)。

保留原 ID、sources、placement，没有改名为 Fab、新建 Fab、转移 source 或增加 Fab relation。旧 quixel.com 地址保留于 migration original 和 correction before，不再 active。

## 4. Firearm Actions 翻译修正

resourceId：`res-4fd2f2cdaae2`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| description | 枪支运动列表 | 枪械工作机构类型参考 |


实际 name 为 `Category: Firearm Actions`，原样保留。仅修改 description；URL、type、placement、links 等其他字段完整不变。correction reason：“修正 firearm action 的错误翻译；action 在此指枪械工作机构，而非‘运动’。”

## 5. 腾祥字库身份修正

resourceId：`res-a4d546d8288c`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| url | http://www.tensentype.com/ | https://www.tensentype.com/ |
| description | 腾讯系字体库 | 中文字体设计、字库产品与正版授权。 |

主 links 同步对应 URL / label；其他字段保持不变。

依据用户已核实的主体“北京腾祥科技开发有限公司”和字体 / 正版许可业务，撤下“腾讯系字体库”的错误描述。name、type、placement 和其他字段不变。当前原 URL 为 HTTP，采用本指令明确给出的 HTTPS 官网，属于这一授权实体的官方入口修正，没有批量升级其他 HTTP 资源。旧 HTTP 地址保留在 migration original 和 correction before。

## 6. 万兴优转 / Media.io 身份核对与最终处理

resourceId：`res-0f267a098943`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| name | 万兴优转 | 万兴优转在线端（Media.io） |
| description | 音视频格式转换与编辑工具 | 在线视频、音频与图片的转换、压缩和编辑工具。 |

主 links 同步对应 URL / label；其他字段保持不变。

当前实际 URL 为 `https://www.media.io/zh/`，属于 Media.io 中文官网，因此按情况 A 整理为在线端。该 URL 原样保留；主 links label 同步为“万兴优转在线端（Media.io）”。原 type 为 website、placement 为 av / 视频工具，均保持不变。未改成桌面版 UniConverter，未新建第二个实体。correction 记录 name、description、links label 的变化，没有伪造 URL 变化。

## 7. Blender 手册更新

resourceId：`res-3a9f5c96c220`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| name | Blender 3.1 参考手册 | Blender 参考手册 |
| url | https://docs.blender.org/manual/zh-hans/3.1/ | https://docs.blender.org/manual/zh-hans/latest/ |
| description | Blender官方中文手册，版本3.1 | Blender 官方中文参考手册。 |

主 links 同步对应 URL / label；其他字段保持不变。

名称去除固定 3.1 版本，入口使用用户指定的官方中文 latest，旧 3.1 地址只保留于历史。type 仍为 manual，placement 仍为 3d / 手册与插件。Blender 指向该手册的关系继续引用同一 ID。

本轮在线读取 latest 页面时客户端返回 Internal Error，未把它解释为死链，也未声称本轮实测确认了 5.2 LTS。入口更新依据用户明确指定的官方 latest；实体名称和描述不绑定小版本。

## 8. Unreal Engine 手册更新

resourceId：`res-f2f3d51ddf39`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| name | UE5 Document | Unreal Engine 5 文档 |
| url | https://docs.unrealengine.com/5.1/en-US/ | https://dev.epicgames.com/documentation/unreal-engine |
| description | Unreal Engine 5官方文档 | Unreal Engine 5 官方文档与使用参考。 |

主 links 同步对应 URL / label；其他字段保持不变。

采用 Epic 不带语言 / 小版本的官方 UE documentation root：`https://dev.epicgames.com/documentation/unreal-engine`。本轮读取该 root 自动进入 UE 5.8 文档总览，包含基础、内容、世界、渲染、蓝图等完整文档目录；因此使用稳定 root，不固定到用户指令提及的 5.7 或本次实测的 5.8，不使用某篇 API / Xbox / Dataprep 文章。[Epic UE 官方 root](https://dev.epicgames.com/documentation/unreal-engine)。

原 5.1 URL 和名称保留在 migration original / correction before。type、placement 及其他字段不变。项目已有另一个 `Unreal Engine Docs` 实体，本轮完整保持不变，没有合并、删改或为此放宽 URL 唯一性检查。

## 9. Live2D Cubism 手册更新

resourceId：`res-f0d2b52d1ba5`，保持不变。

| 字段 | 修改前 | 修改后 |
| --- | --- | --- |
| name | Live2D Cubism官方手册 | Live2D Cubism 手册 |
| description | Live2D Cubism v5.0官方手册 | Live2D Cubism Editor 官方使用手册。 |

主 links 同步对应 URL / label；其他字段保持不变。

实际旧 URL 已为 `https://docs.live2d.com/zh-CHS/cubism-editor-manual/top/`，不带 /5.0/ 或 /4.2/；v5.0 只出现在旧 description 中。因此按允许的中文方案保留这一稳定 current manual URL，去除描述中的 v5.0，并同步新的名称 / links label。官方页面可读取，标题为 Live2D Cubism手册。[Live2D 中文当前手册](https://docs.live2d.com/zh-CHS/cubism-editor-manual/top/)。

未把名称改为 5.3，未固定到 alpha 或其他版本；没有宣称存在实际未存储的旧 v5.0 URL。原 name、description 和 links label 保留于 correction before，migration original 不变。

## 10. corrections

沿用 `docs/phase-3-corrections.json` 的 changes / resourceId / name / reason / before / after 结构，为实际发生修改的 8 个实体各追加一条 correction，confirmedCorrections：19 → 27。

| 资源 | 记录的修改字段 |
| --- | --- |
| 美叶 | URL、description、links |
| Quixel Bridge | URL、description、links |
| Category: Firearm Actions | description |
| 腾祥字库 | URL、description、links |
| 万兴优转在线端（Media.io） | name、description、links label |
| Blender 参考手册 | name、URL、description、links |
| Unreal Engine 5 文档 | name、URL、description、links |
| Live2D Cubism 手册 | name、description、links label |

旧 19 条 corrections 和原有元数据完整不变。全部 migration original、sourceKey、历史 URL / 名称、来源位置和原有行顺序完整不变；没有改 retired schema、17 条 retired records 或 11 条 mergedSources。没有为未发生变化的 URL 伪造 correction 字段。

## 11. relatedResources 检查

全部实体 ID 保留，所有 relatedResources 完整不变，边数继续为 21。重点确认 Blender `res-b60e9fdc1539` → 手册 `res-3a9f5c96c220` 继续有效；未因改名或更新 URL 重建关系。Quixel Bridge 未新增 Fab relation。其他关系未修改。

## 12. 数量变化

| 项目 | 修改前 | 修改后 |
| --- | --- | --- |
| catalog entities | 470 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired entities | 17 | 17 |
| views | 20 | 20 |
| activeURLs | 463 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| confirmedCorrections | 19 | 27 |
| art mappings | 165 | 165 |
| internalLinks | 209 | 209 |
| relatedResources edges | 21 | 21 |
| legacyPages | 14 | 14 |

实际为 8 个对象修正，没有新增、删除、退休或合并实体；入口只是指定替换，数量不变。

## 13. validator

`scripts/validate.mjs` 与修改前逐字节相同，没有修改数量 baseline、逻辑、ID exception 或校验强度。correction 数量由现有脚本自动读取。

`node scripts/validate.mjs`：**PASS**。输出：

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 470,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 463,
  "confirmedCorrections": 27,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

## 14. git diff --check

`git diff --check`：**PASS**，退出码 0；新增报告另检查无行尾空白，通过。

## 15. 修改文件

修改：

- `data/catalog.js`
- `docs/phase-3-corrections.json`

新增：

- `docs/final-data-quality-cleanup.md`

删除项目文件：无。navigation、legacy、migration、art-regrouping、validator、UI、CSS、HTML、其他 JS、原始快照和此前报告均未修改。

## 16. 不变性验证

对象级比较和全部既有文件 SHA-256 对照：**PASS**。

- 8 个目标对象仅发生上述授权字段及主 links URL / label 同步；其余 462 个 catalog 完整对象精确不变。
- 所有资源的 type、sources、relatedResources 不变；实体 ID 和 catalog 顺序不变。
- 美叶除 description、当前入口及其主 links URL 外其他字段不变。其旧入口实际为 canvas 页面，因此按授权改到首页。
- Media.io 和 Live2D 的现有稳定 URL 保留；Microsoft 365、reeoo、EA app、Color Claim、4K影视、主网飞猫和 11 个 NO_ACTIVE_URL 完整对象不变。
- 17 个 retired records、11 个 mergedSources、498 条 migration original 及 migration 整份文件不变。
- 旧 19 条 corrections 完整不变；新增 8 条 before / after 与实体前后字段精确一致。
- navigation placement、菜单、section 和资源顺序完整不变；legacy 整份不变。
- 所有 relatedResources 与 previousTitles 不变，Blender → 手册关系仍有效。
- 美术映射整份不变，仍为 165；validator 整份不变。
- 文件对照仅发现第 15 节的 2 个文件变化，唯一新增为本报告，没有删除文件；其他既有文件完整不变。

未处理其他资源，未做 HTTP → HTTPS 批量升级，未退休新实体，未做新 dedup，未联网扩展本指令之外的搜索，未 commit，未 push。工作区修改前已有的其他改动保留。

