# AI资源审计

日期：2026-10-04。依据当前catalog和navigation，只读审计。初步性质仅按名称、描述、当前分类与已有relatedResources判断，不根据域名推断功能，不访问互联网。

## 1. 当前分类与总数

实际为 **23项资源、23个唯一catalog ID**，全部有URL，url:null为0。URL“有”仅表示字段存在，不代表第三方网站可用性已验证。

| 当前section（原顺序） | 数量 |
| --- | ---: |
| 图像 | 10 |
| 对话 | 6 |
| 综合工具 | 2 |
| 音频 | 1 |
| 视频 | 1 |
| 3D | 3 |
| **合计** | **23** |

## 2. 完整资源清单

名称和描述保持原文；“（空）”表示catalog描述为空字符串，不是新增描述。

### 图像

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| TapNow | `res-775603a1bbd3` | nano banana pro等 | 有 | 图像 | 无法确定 |
| Lovart | `res-26f20a8185f8` | nano banana pro等 | 有 | 图像 | 无法确定 |
| Midjourney页面端 | `res-b9db5bd74bbc` | 可扩图等，需要账号，不是很好用了现在 | 有 | 图像 | 图像编辑（扩图） |
| 即梦 | `res-110680f9c634` | （空） | 有 | 图像 | 无法确定 |
| midlibrary | `res-7af19e673662` | midjourney风格提示词参考，有详细的图片，非常好 | 有 | 图像 | Prompt参考资料 |
| midjourney关键词大全 | `res-5b82b9bcfe4b` | GitHub网页，包含大量风格和关键词参考 | 有 | 图像 | Prompt参考资料 |
| Prompt Hero | `res-d3dd2af510c9` | 提示词检索网站，图片库，包含ChatGPT、MJ、SD等，可检索某prompt下的ai图 | 有 | 图像 | Prompt检索 / 图像参考 |
| midjourney 官方画廊 | `res-6474cdc40eb4` | Midjourney官方展示的优秀作品集合 | 有 | 图像 | 作品展示 / 图像参考 |
| civitai | `res-f45842166d71` | 最常用的Stable Diffusion AI模型下载平台 | 有 | 图像 | 模型平台（模型下载） |
| cg迷 | `res-627b56ed27b3` | 国内教程社区，Stable Diffusion学习、下载资源 | 有 | 图像 | 教程 / 学习社区 |

### 对话

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| 豆包 | `res-28b57dad1491` | 字节跳动的AI对话助手 | 有 | 对话 | 对话助手 |
| Deepseek | `res-7ea330ae999c` | 国产AI对话模型，免费使用 | 有 | 对话 | 对话模型 / Chat |
| Chat GPT | `res-5d9354f7cb0e` | OpenAI的AI对话模型 | 有 | 对话 | 对话模型 / Chat |
| Google Gemini | `res-380e7aa25639` | Google的AI对话模型 | 有 | 对话 | 对话模型 / Chat |
| Kimi AI | `res-474cbb3dda56` | AI对话助手 | 有 | 对话 | 对话助手 |
| Chat Doc | `res-76fa496a4486` | 基于上传文件的AI问答 | 有 | 对话 | 文档问答工具 |

### 综合工具

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| Toolfy.ai | `res-9dd2ec745775` | AI工具导航网站，汇总各类AI工具 | 有 | 综合工具 | 资料 / 导航 |
| Wolfram\|Alpha | `res-c2af766ae055` | 人工智能解答引擎 | 有 | 综合工具 | 问答 / 解答工具（具体能力无法确定） |

### 音频

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| suno（v3） | `res-509d57a3ae8c` | AI音乐生成工具，可以根据文本生成音乐 | 有 | 音频 | 音乐 / 音频生成 |

### 视频

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| Runway Gen3 | `res-dcbda8c01446` | AI视频生成工具，支持文本和图片生成视频 | 有 | 视频 | 视频生成 |

### 3D

| 资源名称 | catalog ID | 当前描述 | URL状态 | 当前分类 | 初步资源性质 |
| --- | --- | --- | --- | --- | --- |
| 腾讯混元3D | `res-4c481d629823` | 腾讯混元 AI 3D 生成工具 | 有 | 3D | 3D生成 |
| Tripo 3D | `res-be63b33b5fe5` | AI 3D 模型生成工具 | 有 | 3D | 3D生成 |
| Trellis 3D | `res-0ea83479fc3f` | （空） | 有 | 3D | 无法确定 |

## 3. 当前分类问题

### A. 通用助手与专业工具

“对话”中豆包、Deepseek、Chat GPT、Google Gemini、Kimi AI描述为对话助手或模型；Chat Doc明确限定为上传文件问答。该组混合一般对话入口与专业文档问答工具。不能据此扩展这些产品的其他能力。

### B. 生成工具与不同媒介

图像、音频、视频、3D已分组，没有证据显示明确的音乐、视频和3D生成工具混在同一section。真正明显的混杂发生在“图像”内部：扩图编辑入口、提示词资料、作品画廊、模型下载平台、教程社区，以及功能不明确的条目一起展示。

“图像”并不等于“图像生成工具”：Midjourney页面端描述只明确扩图；不能将midlibrary、官方画廊、civitai等都认定为生成器。音频和视频各仅1项，属于当前结构事实，不在本轮决定是否合并。

### C. 模型平台与最终用户工具

civitai明确为Stable Diffusion模型下载平台，却与图像编辑入口处于同组。它与最终用户工具、参考资料、学习社区性质不同。“模型聚合平台”则没有足够明确的描述依据；TapNow、Lovart的“nano banana pro等”不足以确认它们是否为模型聚合或工作流平台。

### D. 开发平台与普通使用工具

当前23项中，没有名称和描述足以明确认定的API/开发平台、编程助手、Agent/自动化、本地运行或工作流工具。不能把模型下载平台自动归为API平台，也不能将GitHub上的提示词参考项目认定为通用开发工具。

### E. 同一产品的多个入口

Midjourney页面端与midjourney 官方画廊明确围绕同一产品，但用途是编辑入口和作品展示，不属于已证实的重复实体。midlibrary、midjourney关键词大全是该产品的参考资料，也不能据此与产品入口合并。

TapNow与Lovart描述完全相同，仅为“nano banana pro等”；这说明描述区分度不足，不说明是同一产品。Deepseek与腾讯混元3D的名称和当前用途已经明确区分，不能因历史录入问题再次混为一体。

### F. 导航与工具

“综合工具”将Toolfy.ai（AI工具导航）与Wolfram|Alpha（解答引擎）放在一起，混合查找资源的入口与实际使用的工具。Wolfram|Alpha的描述过于宽泛，不足以细分为AI搜索、计算工具或通用助手。

## 4. 疑似跨领域用途

以下只是使用场景交叉，不代表必须移动，也不建立共享引用。

| 领域 | 本地信息支持的交叉项 | 判断边界 |
| --- | --- | --- |
| 美术与设计 | Midjourney页面端、midlibrary、midjourney关键词大全、Prompt Hero、midjourney 官方画廊、civitai、cg迷 | 分别涉及图像编辑、风格/提示词、图像参考、模型和学习；TapNow、Lovart、即梦具体能力不足以确认 |
| 3D | 腾讯混元3D、Tripo 3D | 明确为3D生成；Trellis 3D只有名称及分类线索，具体用途无法确定 |
| 开发 | 无明确专属项 | 提示词参考即使托管于GitHub，也不是通用编程资源；未发现明确API/开发平台 |
| 音频与视频 | suno（v3）、Runway Gen3 | 描述分别明确音乐生成、视频生成 |
| 游戏制作 | 无明确专属项 | 图像、音频、3D可能服务游戏，但当前描述没有明确游戏制作用途，不据此归类 |
| 学习与研究 | cg迷；midlibrary、midjourney关键词大全等参考资料；Chat Doc存在阅读问答使用场景 | cg迷明确有学习内容；参考资料及文档问答不等于必须转入学习区 |

Toolfy.ai是跨AI工具的导航入口；仅凭其综合性质无法断定应移到学习资源。Wolfram|Alpha同样不足以指定具体学习学科。

## 5. 已有relatedResources及候选

### 已有关联

23项AI实体均没有非空relatedResources。全catalog现有关联也没有指向这些AI实体。Blender、Gaea、Marvelous Designer、lospec的关联与本清单无交集。

### 明确关联候选（只记录，不建立）

现有Midjourney页面端可作为同产品资料的快速入口，候选如下；这表示“相关资料”，不声称参考网站是产品旗下服务。

| 主实体 | 主实体ID | 目标 | 目标ID | 本地明确依据 |
| --- | --- | --- | --- | --- |
| Midjourney页面端 | `res-b9db5bd74bbc` | midjourney 官方画廊 | `res-6474cdc40eb4` | 名称及描述明确为Midjourney官方作品展示 |
| Midjourney页面端 | `res-b9db5bd74bbc` | midlibrary | `res-7af19e673662` | 描述明确为midjourney风格提示词参考 |
| Midjourney页面端 | `res-b9db5bd74bbc` | midjourney关键词大全 | `res-5b82b9bcfe4b` | 名称明确指定midjourney，描述为风格和关键词参考 |

以上依据包含明确的资料用途，不仅是品牌相同。当前没有独立Midjourney平台本体实体，因此候选起点仍是已有页面端记录，不新增平台实体。

Prompt Hero包含多个模型的提示词资料，不能据此认定为某个平台的专属工具。civitai与cg迷都提到Stable Diffusion，但分别是模型平台和学习社区，没有明确从属关系；TapNow与Lovart提到同一名称也不构成从属关系。这些不列为明确关联候选。

## 6. 实际共享ID

按catalog ID比对navigation全部20个view：AI这23项没有被其他view重复引用。

| 检查范围 | 与AI共享ID数 |
| --- | ---: |
| 美术与设计 | 0 |
| 3D | 0 |
| 游戏制作 | 0 |
| 开发 | 0 |
| 音频与视频 | 0 |
| 设备与环境（软件、插件与扩展、系统与设备） | 0 |
| 其他view（包括学习与研究） | 0 |

前述跨领域分析只是用途交叉，不是实际共享或重复实体。旧HTML兼容入口不作为新的领域view计数。

## 7. URL与数据质量观察

- url:null为0；23个主URL字符串互不相同。未验证任何第三方网站，不判断重定向、失效、价格或当前版本。
- 即梦、Trellis 3D描述为空。即梦已有“缺少描述”的reviewNotes；本轮只记录，不补写。
- TapNow、Lovart描述相同且仅为“nano banana pro等”，缺少动作、功能及用途说明，无法判断具体资源性质。
- Toolfy.ai的名称拼写与已有URL主机中的toolify拼写不一致，属于待人工核对线索，不能据此认定正确名称或修正。本观察仅比较本地字段，不据域名推断用途。
- Chat GPT、Deepseek等名称保留当前写法；没有本地依据将其认定为名称错误。
- suno（v3）、Runway Gen3名称含版本标记，属于历史版本痕迹；本轮不能认定这些版本是否仍适用。
- Midjourney页面端描述含“不是很好用了现在”，midlibrary含“非常好”，civitai含“最常用”，属于主观或时间相关表述，不当作已验证事实。
- Deepseek描述中的“免费使用”仅保留原文，不是当前费用验证结果。
- 23项内没有完全同名资源。Midjourney相关名称是同一产品主题下的不同入口；不能称为已确认重复。
- 当前腾讯混元3D描述为“腾讯混元 AI 3D 生成工具”，Tripo 3D描述为“AI 3D 模型生成工具”，未发现之前错误对话描述的残留。真正Deepseek仍为对话模型，二者ID独立。
- “图像”把实际工具、提示词、模型平台、社区统一收纳；“综合工具”混合导航与解答引擎，体现按宽泛主题汇集资源的痕迹。当前topics/tags与section基本一致，没有明显相互冲突的活动分类字段。
- 未发现可仅凭现有名称和描述确认的明显内容错配；缺少信息不等于已经确认错误。

## 8. 无法判断用途的项目

| 项目 | ID | 原因 |
| --- | --- | --- |
| TapNow | `res-775603a1bbd3` | 描述只有“nano banana pro等”，不能确定生成、编辑、聚合还是工作流 |
| Lovart | `res-26f20a8185f8` | 同上，不凭产品常识补足功能 |
| 即梦 | `res-110680f9c634` | 描述为空，只有当前图像分类线索 |
| Trellis 3D | `res-0ea83479fc3f` | 描述为空；名称及3D分类不足以区分生成工具、模型平台或其他入口 |

Wolfram|Alpha可粗略判断为解答工具，但更细功能无法确定。其他条目仅按现有描述判断，不扩展为其可能具备的全部产品能力。

## 9. 完整性与文件变更

当前6个section：10 + 6 + 2 + 1 + 1 + 3 = 23项。23个唯一ID，无重复引用、无缺失catalog实体；完整清单按当前顺序覆盖全部资源。

本轮仅新增 `docs/ai-resource-audit.md`。未修改catalog、navigation、分类、任何资源字段或relatedResources；未修改UI/CSS/JS/HTML、3D、游戏制作、美术与设计、开发、Art Notes或Music Library。未访问互联网、未验证第三方网站、未 commit、未 push。尚未开始重新分类。
