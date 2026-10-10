# 资源图标规范化 · 第二阶段：专属图标需求分级

日期：2026-10-09。依据：`docs/resource-icon-audit.md`、`docs/resource-icon-normalization-phase-1.md`、当前 `data/catalog.js` 与 `data/navigation.js`。

本轮只分析资源性质，新增本报告；没有联网搜图、访问官方图标来源或下载任何图标。来源优先级是下一轮核实方向，不代表已找到或验证过素材。

## 1. 口径与结论

当前 470 个 active entities：59 个已有本地图片图标，411 个没有 iconImage、实际使用 Font Awesome。当前字体前缀为 fas 362 / fab 49；“约 362 个”不能当作本轮需求数量，更不能把 fas 等同于缺失。之前报告是修复前快照，当前数据与第一阶段报告一起使用。

为了完整覆盖用户要求，A / B / C 对全部 411 个无专属图片实体逐项分类，包括已有合适品牌字体标识的资源。411 条互斥、去重，每个 active resourceId 只出现于一个 A / B / C 清单；没有 retired entities。D 是独立的语义复核标记，可与 A / B / C 重叠，不能加进“缺失图标”总数。

| 分级 | 数量 | 结论 |
| --- | ---: | --- |
| A 强烈建议补专属图标 | 196 | 独立产品 / 服务 / 品牌识别收益明显；其中 14 个已有合适品牌字体，图片化可延后 |
| B 有合适官方图标则补 | 119 | 独立小型资料 / 素材 / 个人项目，官方 favicon 可选，不强求 |
| C 建议保留通用图标 | 96 | 单篇、专题、手册 / 文档与参考子页，内容语义优先 |
| A + B + C | 411 | 全部无 iconImage 的当前实体 |
| D 现有图标建议复核 | 6 | 5 个字体标识 + 1 个已有图片，不计为新增缺失 |

没有专属图片不等于没有可用图标。C 无须补图，B 允许长期保留当前字体标识；A 也不得自动替换已经正常、准确的品牌字体。

## 2. 判断规则

A：独立软件、App、平台、在线工具、社区、搜索 / 云服务及能明显帮助区分来源的机构品牌。按资源自身用途判断，不机械按 type：例如网站型协作软件仍可为 A；官方品牌制造商入口也有辨识价值。

B：有独立站点或作者身份，但小尺寸品牌识别收益中等；清晰、稳定、可信的自身官方 favicon 值得补，否则当前语义图标足够。没有核实产品身份或 URL 为空的记录不伪造官方来源。

C：单篇文章、问答、Wiki 具体条目 / 分类、文档、专题资料与具体参考集合。重复母站 Logo 往往让不同内容同貌。已有母站品牌字体也可继续保留；本分类不授权改成另一个语义图标。

边界以实际 URL 和说明人工逐项核对：Blender Extension 是平台入口，归 A；Blender 插件手册、GitHub Pages 文档、React / Unity / Unreal 文档归 C。MDN 是独立文档平台总入口，归 A。Lospec 主站归 A、Palette List 专题归 C。Britannica URL 是主站，归 A，不因 description 写“条目”而误分为具体文章。Trellis 3D 的当前域名与产品官方身份未核实，保守归 B。

C 没有要求回退已有正常字体品牌标识，也不撤销第一阶段修复：crosshairs / landmark / monument 等内容语义继续保留。本轮没有修改任何 icon。

## 3. A 类按领域统计

以清单中的主要 placement 归属统计，每个实体只计一次。大部分采用现有 navigation 的首个 placement；独立 software 优先软件 view，跨领域的音频素材 / DAW 按主要音频使用场景记录。其他 placement 同行注明。领域合并仅用于报告统计，不调整信息架构。

| 领域 | A 类实体 |
| --- | ---: |
| 3D | 16 |
| 游戏制作 | 8 |
| AI | 18 |
| 开发 | 15 |
| 音频与视频 | 12 |
| 工作与协作 | 31 |
| 美术与设计 | 41 |
| 学习与研究 | 13 |
| 日常与生活 | 37 |
| 设备与环境 | 5 |
| 合计 | 196 |

## 4. A 类来源与 16px 选择规则

清单中每项均标记来源顺序 `1→2→3→4`：

1. 官方品牌 Logo / 官方 favicon。
2. 官方网站自身 favicon。
3. 官方 GitHub / 产品资产中的品牌图标。
4. 没有可信、清晰资产时，保留 Font Awesome。

只找资源自身的品牌：Gemini、Google Docs、Google Maps、Teams、企业微信优先对应产品图标，不拿母公司标识替代专属识别。文档 / 文章不因为母站有 Logo 就补图。

`logo` 表示适合应用图标或简化品牌符号，`favicon` 表示小尺寸 favicon 足够，`either` 表示两者都可。全部以最终 16×16px 清晰可辨为准，不推荐复杂横版全称 Logo；优先品牌独立符号 / 应用图标。保留现有 20px slot / 16px 图片显示规范。

## 5. A 类完整清单

“字体已足够”的 14 条仍按独立品牌性质归 A，但不进入前面几批新增图片任务。来源优先级不代表图标已存在或已下载。

| resourceId | name | URL | type | 当前 icon class | 主要 view / section（含其他场景） | 分类 | 理由 | 建议形式 | 来源优先级 | 执行优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| res-90bbea3931de | Blender Extension | https://extensions.blender.org/ | website | `fas fa-puzzle-piece` | 3D（3d） / 手册与插件 (3d-manuals-plugins)；兼用于 插件与扩展 / 3D扩展与资源 (section-a14bf349ed) | A | Blender 官方扩展分发平台，平台标识可帮助与普通插件文档区分。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-80dd5275c945 | Gumroad | https://app.gumroad.com/library | website | `fas fa-store` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立创作者交易 / 资源平台，品牌标识有助于快速识别入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5154a7315483 | KitBash 3d | https://kitbash3d.com/collections | asset | `fas fa-cubes` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d5902ad2cf83 | the gnomon workshop | https://www.thegnomonworkshop.com/ | website | `fas fa-chalkboard-teacher` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-05a5769075d9 | ambientCG | https://ambientcg.com/ | asset | `fas fa-cloud` | 3D（3d） / 材质与环境 (section-e5697c06bc) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-8089d1901b4f | Poly Haven | https://polyhaven.com/ | website | `fas fa-mountain` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-bb69c3a20418 | Poliigon | https://www.poliigon.com/ | asset | `fas fa-photo-video` | 3D（3d） / 材质与环境 (section-e5697c06bc) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d399abe2ed4f | free3d | https://free3d.com/ | website | `fas fa-cube` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-bfe28c897b52 | myminifactory | https://www.myminifactory.com/ | website | `fas fa-robot` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-bde5b2f24e5d | Mixamo | https://www.mixamo.com/ | website | `fas fa-running` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7e8c70baf002 | cgtrader | https://www.cgtrader.com/ | website | `fas fa-shopping-cart` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d45d28a023c7 | CG模型网 | https://www.cgmodel.com/ | website | `fas fa-project-diagram` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4a16a898a2ea | 老子云 | https://www.laozicloud.com/ | website | `fas fa-cloud` | 3D（3d） / 软件与工具 (section-09d0e478dd) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-21fe07c8d7cc | Pixelsquid 3d | https://www.pixelsquid.com/ | asset | `fas fa-ship` | 3D（3d） / 模型与素材 (section-7595af6cb3) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e885d676a4c0 | aboutcg | https://www.aboutcg.com/ | community | `fas fa-comments` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-775603a1bbd3 | TapNow | https://app.tapnow.ai/#/home | website | `fas fa-comment` | AI（ai） / 综合创作工具 (ai-creative-tools) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-26f20a8185f8 | Lovart | https://www.lovart.ai/zh/home | website | `fas fa-comment` | AI（ai） / 综合创作工具 (ai-creative-tools) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b9db5bd74bbc | Midjourney页面端 | https://www.midjourney.com/editor/new | website | `fas fa-comment` | AI（ai） / 视觉创作 (section-b68cbaf8ea) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-28b57dad1491 | 豆包 | https://www.doubao.com/chat/ | website | `fas fa-comment` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-110680f9c634 | 即梦 | https://jimeng.jianying.com/ai-tool/home | website | `fas fa-comment` | AI（ai） / 视觉创作 (section-b68cbaf8ea) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9dd2ec745775 | Toolify | https://www.toolify.ai/zh/?ref=qinggongju.com | website | `fas fa-tools` | AI（ai） / AI 导航 (section-ed54d00238) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7ea330ae999c | Deepseek | https://chat.deepseek.com/ | website | `fas fa-brain` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5d9354f7cb0e | Chat GPT | https://chatgpt.com/ | website | `fas fa-comment` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-380e7aa25639 | Google Gemini | https://gemini.google.com/app | website | `fab fa-google` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品，当前 Google 母品牌字形无法区分 Gemini 与其他 Google 工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-509d57a3ae8c | Suno | https://suno.com/create | website | `fas fa-headphones` | AI（ai） / 音频、视频与3D生成 (section-d37654c45a) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-dcbda8c01446 | Runway | https://app.runwayml.com/login | website | `fas fa-film` | AI（ai） / 音频、视频与3D生成 (section-d37654c45a) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4c481d629823 | 腾讯混元3D | https://3d.hunyuan.tencent.com/ | website | `fas fa-brain` | AI（ai） / 音频、视频与3D生成 (section-d37654c45a) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-be63b33b5fe5 | Tripo 3D | https://www.tripo3d.ai/zh | website | `fas fa-comment` | AI（ai） / 音频、视频与3D生成 (section-d37654c45a) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d3dd2af510c9 | Prompt Hero | https://prompthero.com/ | website | `fas fa-search` | AI（ai） / 图像资料与模型 (ai-image-resources) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f45842166d71 | civitai | https://civitai.com/ | website | `fas fa-download` | AI（ai） / 图像资料与模型 (ai-image-resources) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-bcb06b28c2f0 | 百度百科 | https://baike.baidu.com/ | website | `fas fa-book` | 学习资源（research） / 百科查询 (section-7d20fc2756) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0b7a7096a961 | Flim | https://beta.flim.ai/ | website | `fas fa-film` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-61dc9b2d49ae | 国家地理 | https://www.nationalgeographic.com/ | website | `fas fa-globe-americas` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-39079fe88973 | skypixel | https://www.skypixel.com/ | website | `fas fa-camera` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7578e2aad579 | art grid | https://artgrid.io/ | website | `fas fa-film` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b3d6087b0983 | zbrush central | https://www.zbrushcentral.com/ | community | `fas fa-cubes` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-45aed3cae03f | GGAC | https://www.ggac.com/v2/home | community | `fas fa-trophy` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-033f6c8c428e | concept art world | https://conceptartworld.com/ | community | `fas fa-globe` | 美术与设计（art） / 艺术家与社区 (art-concept-artists) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c72b7f01237d | lospec | https://lospec.com/ | community | `fas fa-dice` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-44109899b435 | 大都会博物馆 | https://www.metmuseum.org/zh | website | `fas fa-landmark` | 美术与设计（art） / 综合参考 (art-concept-general) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-cf907b73cd01 | Vogue | https://www.vogue.com.cn/ | website | `fas fa-star` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-08dc7ba6b85c | POP趋势服装 | http://www.pop-fashion.com/patterns/graphics/?pid=000535 | website | `fas fa-palette` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | A | 品牌趋势资料服务入口，专属标识有助于识别其资料来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c4ebbef96491 | 有道云笔记 | https://note.youdao.com/ | website | `fas fa-sticky-note` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0402234d84e7 | PDF Drive | https://www.pdfdrive.com/ | website | `fas fa-file-pdf` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4478f060c286 | 鸠摩搜索 | https://www.jiumodiary.com/ | website | `fas fa-dove` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-474cbb3dda56 | Kimi AI | https://www.kimi.com/ | website | `fas fa-comment-alt` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-76fa496a4486 | Chat Doc | https://chatdoc.com/chatdoc/#/upload | website | `fas fa-file-upload` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c2af766ae055 | Wolfram\|Alpha | https://www.wolframalpha.com/ | website | `fas fa-brain` | AI（ai） / 助手与问答 (section-49c6d515c3) | A | 独立 AI 产品或服务，专属小图标可区别相似通用字形。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f319d4efdf9b | 超能搜 | https://chaonengsou.com/ | website | `fas fa-search` | 日常工具（daily） / 网盘搜索 (section-6a17dd7980) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-bdeb3a9a419e | 大力盘搜索 | https://www.dalipan.com/ | website | `fas fa-search` | 日常工具（daily） / 网盘搜索 (section-6a17dd7980) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-ef5fe97e75de | 懒盘搜索 | https://www.lzpanx.com/ | website | `fas fa-search` | 日常工具（daily） / 网盘搜索 (section-6a17dd7980) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-36805b0d46a7 | 易搜 | https://yiso.fun/ | website | `fas fa-search` | 日常工具（daily） / 网盘搜索 (section-6a17dd7980) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a4b6505f442c | 夸克盘搜 | https://qkpanso.com/ | website | `fas fa-search` | 日常工具（daily） / 网盘搜索 (section-6a17dd7980) | A | 独立搜索服务，favicon 有助于区分多个同类搜索入口。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6c78c06d318b | 谷歌云盘 | https://drive.google.com/drive | website | `fab fa-google-drive` | 日常工具（daily） / 云存储 (section-5fd27e1f84) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-71216ea7e989 | MEGA | https://mega.nz/ | website | `fas fa-cloud` | 日常工具（daily） / 云存储 (section-5fd27e1f84) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f2c13ee8730d | 曲奇云盘 | https://quqi.com/ | website | `fas fa-cookie` | 日常工具（daily） / 云存储 (section-5fd27e1f84) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-51a9f53ce4dd | Outlook | https://outlook.live.com/ | website | `fab fa-microsoft` | 日常工具（daily） / 邮箱服务 (section-13f59400a9) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6d2a0c0ae5e7 | 163邮箱 | https://mail.163.com/ | website | `fas fa-envelope` | 日常工具（daily） / 邮箱服务 (section-13f59400a9) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-3d3efba8821a | 126邮箱 | https://www.126.com/ | website | `fas fa-envelope` | 日常工具（daily） / 邮箱服务 (section-13f59400a9) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-81a9a6e98ebb | 网易见外工作台 | https://jianwai.youdao.com/ | website | `fas fa-language` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5c09ca7fe676 | OpenStreetMap | https://www.openstreetmap.org/#map=7/40.053/118.169/ | website | `fas fa-map` | 日常工具（daily） / 地图 (section-c20026ba66) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7f6f481d8db6 | MDN Web Docs | https://developer.mozilla.org/zh-CN/ | manual | `fab fa-firefox-browser` | 开发（development） / 文档与参考 (section-808be5a2c8) | A | 独立 Web 文档平台的总入口；自身 MDN 标识比 Firefox 母品牌更准确。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-42d61ff2d2d4 | W3Schools | https://www.w3schools.com/ | tutorial | `fas fa-school` | 开发学习（code-study） / 课程与学习路线 (section-24fa51cf93) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0fb5b5874dd8 | Vite | https://vite.dev/ | website | `fas fa-bolt` | 开发（development） / 开发工具与环境 (section-cac953817e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-be67f9854221 | 阿里云 | https://www.aliyun.com/ | website | `fas fa-cloud` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d9987c1cb6af | 腾讯云 | https://cloud.tencent.com/ | website | `fas fa-cloud` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b4ee1ef99099 | 华为云 | https://www.huaweicloud.com/ | website | `fas fa-cloud` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-39a98e0d8503 | 火山引擎 | https://www.volcengine.com/ | website | `fas fa-cloud` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a6ad87b96b6f | Cloudflare | https://www.cloudflare.com/ | website | `fas fa-shield-alt` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-41531850c10d | Supabase | https://supabase.com/ | website | `fas fa-database` | 开发（development） / 云服务与部署 (section-6372255ca7) | A | 独立云 / 通信服务，产品标识可区别当前相似类型图标。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b2d296a1e1aa | freeCodeCamp | https://www.freecodecamp.org/learn/ | tutorial | `fab fa-free-code-camp` | 开发学习（code-study） / 课程与学习路线 (section-24fa51cf93) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-cd9e0c222d3e | roadmap.sh | https://roadmap.sh/ | tutorial | `fas fa-map-signs` | 开发学习（code-study） / 课程与学习路线 (section-24fa51cf93) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-3952e3aaa8ca | Can I use | https://caniuse.com/ | website | `fas fa-check-circle` | 开发（development） / 文档与参考 (section-808be5a2c8) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-180019774646 | Stack Overflow | https://stackoverflow.com/ | community | `fab fa-stack-overflow` | 开发（development） / 文档与参考 (section-808be5a2c8) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-58a7cc13a78c | Machinations | https://machinations.io/ | website | `fas fa-project-diagram` | 游戏制作（game-production） / 制作工具 (section-b38206fa8a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-37ba40863c00 | Twine | https://twinery.org/ | website | `fas fa-code-branch` | 游戏制作（game-production） / 制作工具 (section-b38206fa8a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6c425859ca19 | 即时设计 | https://js.design/workspace | website | `fas fa-pen-fancy` | 游戏制作（game-production） / 制作工具 (section-b38206fa8a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a52cf5ddd10b | Freesound | https://freesound.org/ | asset | `fas fa-music` | 音频与视频（av） / 音频素材 (section-6cbaf07749)；兼用于 游戏制作 / 音频资源 (section-31e53fc463) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d7eb5223b94b | Artlist | https://artlist.io/ | asset | `fas fa-headphones` | 音频与视频（av） / 音频素材 (section-6cbaf07749)；兼用于 游戏制作 / 音频资源 (section-31e53fc463) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b2d8bb124ac1 | 爱给网_音效配乐 | https://www.aigei.com/?msclkid=957ac64ddf3a18901fedaea0088c1876 | asset | `fab fa-soundcloud` | 音频与视频（av） / 音频素材 (section-6cbaf07749)；兼用于 游戏制作 / 音频资源 (section-31e53fc463) | A | 独立素材服务，但当前 SoundCloud 品牌并非该网站；先复核标识再补自身图标。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-303180e4f360 | OpenGameArt | https://opengameart.org/ | asset | `fas fa-icons` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9f9c9e89ce78 | FMOD | https://www.fmod.com/ | website | `fas fa-broadcast-tower` | 游戏制作（game-production） / 制作工具 (section-b38206fa8a)；兼用于 音频与视频 / 音频制作工具 (section-2ef48c0866) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d8c1e419c331 | itch.io Game Assets | https://itch.io/game-assets | asset | `fab fa-itch-io` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | A | 此入口实际提供 itch.io 素材市场服务，品牌帮助辨识平台；已有 itch.io 字形可保留。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-597e0d6992d2 | 游民星空 | https://www.gamersky.com/ | website | `fas fa-star` | 游戏（games） / 资讯与攻略 (section-5d31a6621a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a279f861f6aa | 游侠攻略 | https://gl.ali213.net/ | website | `fas fa-map` | 游戏（games） / 资讯与攻略 (section-5d31a6621a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0c78ece82080 | 3DM | https://www.3dmgame.com/ | website | `fas fa-gamepad` | 游戏（games） / 游戏下载 (section-37d34e19d0) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-07c130430e1c | IGN中国 | https://www.ign.com.cn/ | website | `fas fa-newspaper` | 游戏（games） / 资讯与攻略 (section-5d31a6621a) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0b2c7e6d8348 | 其乐Keylol | https://keylol.com/ | community | `fas fa-key` | 游戏（games） / 玩家社区 (section-ae6f740e25) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-27a56307e731 | NGA玩家社区 | https://ngabbs.com/ | community | `fas fa-comments` | 游戏（games） / 玩家社区 (section-ae6f740e25) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c619a3f5aaaa | 3DM MOD站 | https://mod.3dmgame.com/ | website | `fas fa-download` | 游戏（games） / MOD 与补丁 (section-98fd3830f5) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f4bcc11a5817 | 游侠补丁 | https://patch.ali213.net/ | website | `fas fa-wrench` | 游戏（games） / MOD 与补丁 (section-98fd3830f5) | A | 独立补丁分发入口，平台标识有识别价值；不是单篇补丁教程。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-39d5fb06b8f9 | Nexus Mods | https://www.nexusmods.com/ | website | `fas fa-globe` | 游戏（games） / MOD 与补丁 (section-98fd3830f5) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6573c42d45b0 | Mod DB | https://www.moddb.com/ | community | `fas fa-database` | 游戏（games） / MOD 与补丁 (section-98fd3830f5) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b05a90020690 | Steam创意工坊 | https://steamcommunity.com/workshop/ | website | `fab fa-steam` | 游戏（games） / MOD 与补丁 (section-98fd3830f5) | A | Steam 的独立工坊服务入口，品牌可识别；当前 Steam 字形已足够，不强制补图片。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-1de799c618db | EA app | https://www.ea.com/games/library/pc-download | website | `fas fa-gamepad` | 游戏（games） / 游戏平台与商店 (section-eeefc8692f) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5f8a223f9113 | Xbox | https://www.xbox.com/zh-CN | website | `fab fa-xbox` | 游戏（games） / 游戏平台与商店 (section-eeefc8692f) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-7292d666d261 | Humble Bundle | https://www.humblebundle.com/ | website | `fas fa-gift` | 游戏（games） / 购买与优惠 (section-27f74da05e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c7fcd660aca2 | Fanatical | https://www.fanatical.com/ | website | `fas fa-tags` | 游戏（games） / 购买与优惠 (section-27f74da05e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-090783dfb634 | IsThereAnyDeal | https://isthereanydeal.com/ | website | `fas fa-percentage` | 游戏（games） / 购买与优惠 (section-27f74da05e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-904869b055cb | Steam Database | https://steamdb.info/ | website | `fas fa-database` | 游戏（games） / 资料与查询 (section-2395c32fb8) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5c6453057fed | HowLongToBeat | https://howlongtobeat.com/ | website | `fas fa-clock` | 游戏（games） / 资料与查询 (section-2395c32fb8) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c93e7faa4f75 | OpenCritic | https://opencritic.com/ | website | `fas fa-star-half-alt` | 游戏（games） / 资料与查询 (section-2395c32fb8) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-08761e40b186 | Metacritic | https://www.metacritic.com/ | website | `fas fa-chart-bar` | 游戏（games） / 资料与查询 (section-2395c32fb8) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-751a6d512a90 | PCGamingWiki | https://www.pcgamingwiki.com/wiki/Home | website | `fab fa-wikipedia-w` | 游戏（games） / 资料与查询 (section-2395c32fb8)；兼用于 系统与设备 / 运行与故障排查 (section-7d28f65d55) | A | 独立游戏故障资料站，PCGamingWiki 自身品牌有价值，当前 Wikipedia 字形需复核。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-65ab42fdd087 | Sig Sauer | https://www.sigsauer.com/ | website | `fas fa-industry` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e6f113d5afab | ISSC | https://issc.at/ | website | `fas fa-industry` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-2a5f7d3627d0 | FN America | https://fnamerica.com/ | website | `fas fa-industry` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-746ee1817749 | Colt | https://www.colt.com/ | website | `fas fa-industry` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d721510b784c | Vortex Optics | https://vortexoptics.com/ | website | `fas fa-crosshairs` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e9e7580285f5 | SureFire | https://www.surefire.com/ | website | `fas fa-lightbulb` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-04b9f502b7ab | Trijicon | https://www.trijicon.com/ | website | `fas fa-eye` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f2af732624c1 | Taran Tactical Innovations | https://tarantacticalinnovations.com/ | website | `fas fa-tools` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b9e68d5f6c1c | Uberti | https://www.uberti-usa.com/ | website | `fas fa-history` | 美术与设计（art） / 品牌与官方 (art-reference-weapons-official) | A | 独立制造商品牌入口，品牌符号有助于区分不同来源。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c5c5aa7eaf25 | AR15主页 | https://www.ar15.com/ | website | `fas fa-crosshairs` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | A | 独立枪械社区主入口，不是 Wikipedia 的枪械条目，自身 favicon 有识别价值。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-ac0c83865452 | Gun Broker | https://www.gunbroker.com/ | website | `fas fa-gavel` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f1f736c6c199 | 谷歌地图 | https://www.google.com/maps/ | website | `fab fa-google` | 日常工具（daily） / 地图 (section-c20026ba66) | A | 独立地图应用入口，Maps 专属小图标比 Google 母品牌更易区分。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-8a5ad8ede2e1 | 历史地图（全历史） | https://www.allhistory.com/map | website | `fas fa-globe-asia` | 历史（history） / 地图与历史可视化 (section-69324106cd) | A | 可操作的历史地图服务入口，可用服务简洁图标区别普通地图资料页。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0da4e59569c4 | 观沧海 | https://www.ageeye.cn/ | website | `fas fa-eye` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9936eee67cba | Old Maps Online | https://www.oldmapsonline.org/ | website | `fas fa-scroll` | 历史（history） / 地图与历史可视化 (section-69324106cd) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-dc7d34fff586 | Library of Congress | https://www.loc.gov/ | website | `fas fa-book` | 历史（history） / 资料与馆藏 (section-7946c9a0ab) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-664260a4c584 | 全历史 | https://www.allhistory.com/ | website | `fas fa-history` | 历史（history） / 学习与内容 (section-746159982e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c03a94b59c8a | History Channel | https://www.history.com/ | website | `fas fa-tv` | 历史（history） / 学习与内容 (section-746159982e) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d49532172dad | Encyclopedia Britannica | https://www.britannica.com/ | website | `fas fa-book-open` | 历史（history） / 学习与内容 (section-746159982e) | A | URL 是百科网站总入口，属于独立资料品牌，不能仅凭 description 的“条目”将其当单篇。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-ef0272e776f4 | Koodo Reader | https://www.koodoreader.com/zh | software | `fas fa-tablet-alt` | 软件（software） / 阅读与学习 (software-reading-learning) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-af8ef348cd3d | MuseScore | https://musescore.org/zh-hant | software | `fas fa-music` | 软件（software） / 音频与视频 (software-audio-video)；兼用于 音频与视频 / 音频制作工具 (section-2ef48c0866) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5cc0e67257c0 | OBS Studio | https://obsproject.com/ | software | `fas fa-video` | 软件（software） / 音频与视频 (software-audio-video)；兼用于 音频与视频 / 视频工具 (section-ac0f75ea54) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-3b65565237c5 | Honeyview | （未记录 URL） | software | `fas fa-image` | 软件（software） / 图像与设计 (software-image-design) | A | 软件具有独立产品身份；无正式 URL 不改数据，下一轮先确认官方图标来源。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-1a40669e664e | coolors | https://coolors.co/palettes/trending | website | `fas fa-palette` | 美术与设计（art） / 配色 (art-visual-color) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b2aeb96d5fed | color hunt | https://colorhunt.co/ | website | `fas fa-search` | 美术与设计（art） / 配色 (art-visual-color) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b88617d2ae76 | adobe color | https://color.adobe.com/zh/create/color-wheel | website | `fas fa-palette` | 美术与设计（art） / 配色 (art-visual-color) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-c9e943cc2f82 | soundsnap | https://www.soundsnap.com/ | asset | `fas fa-music` | 音频与视频（av） / 音频素材 (section-6cbaf07749) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a06c0089142a | 我图网 | https://www.ooopic.com/ | asset | `fas fa-image` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b879287bf3b7 | 千图网 | https://www.58pic.com/ | asset | `fas fa-image` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-931a52adccb3 | 千库网 | https://588ku.com/ | asset | `fas fa-database` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-76efe492afd9 | 包图网 | https://ibaotu.com/ | asset | `fas fa-box` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e10a2d4fafe2 | 图品汇 | https://www.88tph.com/ | asset | `fas fa-image` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-cf41e9dd33e5 | Iconfont | https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2 | website | `fas fa-font` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-775cfce438f1 | 500px | https://web.500px.com/ | community | `fas fa-camera-retro` | 美术与设计（art） / 社区与趋势 (art-visual-community) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-157a9b6350b8 | 方正字库 | https://www.foundertype.com/ | website | `fas fa-text-height` | 美术与设计（art） / 字体与文字 (art-visual-type) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4a2be2d434fd | 汉仪字库 | https://www.hanyi.com.cn/productList.php | website | `fas fa-language` | 美术与设计（art） / 字体与文字 (art-visual-type) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-1ae22675a24d | 美叶 | https://meiye.art/ | website | `fas fa-leaf` | 美术与设计（art） / 灵感与案例 (art-visual-inspiration) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d32b37129899 | UI中国 | https://www.ui.cn/ | community | `fas fa-laptop` | 美术与设计（art） / 社区与趋势 (art-visual-community) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7c475263bb6b | 图虫创意 | https://stock.tuchong.com/ | website | `fas fa-bug` | 美术与设计（art） / 图形与素材 (art-visual-assets) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b04d19f21678 | Notion | https://www.notion.com/ | website | `fas fa-cube` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6faf8078bc3d | 腾讯文档 | https://docs.qq.com/desktop | website | `fas fa-file-word` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-104da187aeac | 石墨文档 | https://shimo.im/ | website | `fas fa-edit` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4a862f2654ef | 金山文档 | https://www.kdocs.cn/welcome | website | `fas fa-file-excel` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-045262fdb9df | Google Docs | https://docs.google.com/ | website | `fab fa-google` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立文档产品入口，Docs 专属图标能区别 Google 母品牌与其他工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-4f1bcebf4af3 | Microsoft 365 | https://m365.cloud.microsoft/ | website | `fab fa-microsoft` | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | A | 独立办公套件服务，套件自身小图标更能区别微软其他产品。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d37be745462e | diagrams.net | https://www.draw.io/ | website | `fas fa-project-diagram` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0769dc5c4e2e | Whimsical | https://whimsical.com/ | website | `fas fa-brain` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-85794320b9fe | Excalidraw | https://excalidraw.com/ | website | `fas fa-pencil-alt` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-55aed948bf9c | MindMeister | https://www.mindmeister.com/ | website | `fas fa-sitemap` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-eb640f905ca9 | Miro | https://miro.com/ | website | `fas fa-chalkboard` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-732fa7eab1be | Lucidchart | https://lucidchart.com/ | website | `fas fa-chart-bar` | 工作与协作（work） / 图表与白板 (work-diagrams) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e2b7d141a061 | SmallPDF | https://smallpdf.com/ | website | `fas fa-file-pdf` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0f267a098943 | 万兴优转在线端（Media.io） | https://www.media.io/zh/ | website | `fas fa-video` | 音频与视频（av） / 视频工具 (section-ac0f75ea54) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b6a9c8a0879f | Convertio | https://convertio.co/ | website | `fas fa-sync-alt` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a2032bb7e364 | Online-Convert | https://www.online-convert.com/ | website | `fas fa-file-archive` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-920e46e0b7d8 | CloudConvert | https://cloudconvert.com/ | website | `fas fa-cloud-upload-alt` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f77636ac2752 | FreeConvert | https://www.freeconvert.com/ | website | `fas fa-file-download` | 工作与协作（work） / 文件处理 (section-a30e17f8a2) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-68fedf649248 | Figma | https://www.figma.com/ | website | `fab fa-figma` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-02a7cca093b2 | Sketch | https://www.sketch.com/ | website | `fas fa-vector-square` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9dbc2f574fa5 | Adobe XD | https://www.adobe.com/products/xd.html | website | `fas fa-vector-square` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5d8706949079 | Balsamiq | https://balsamiq.com/ | website | `fas fa-lightbulb` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-ee76fbba7792 | Canva | https://www.canva.com/ | website | `fas fa-palette` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-814cc8aa38db | ProtoPie | https://www.protopie.io/ | website | `fas fa-mobile-alt` | 美术与设计（art） / 工具 (art-visual-tools) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-24ac848c2368 | Trello | https://trello.com/ | website | `fab fa-trello` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-e5b40c7fcd19 | Asana | https://asana.com/ | website | `fas fa-list-check` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-7c726d842f83 | Jira | https://www.atlassian.com/software/jira | software | `fab fa-jira` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 当前品牌字体标识已合适，图片化可延后。 | logo | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-83e921a5d723 | ClickUp | https://clickup.com/ | website | `fas fa-rocket` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9e5109a0eb1a | Monday.com | https://monday.com/ | website | `fas fa-calendar-alt` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-23c7898f8bd4 | Basecamp | https://basecamp.com/ | website | `fas fa-campground` | 工作与协作（work） / 项目管理 (section-587797433c) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-e5d304c1d5d0 | Slack | https://slack.com/ | website | `fab fa-slack` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-f056c4fec3a2 | Microsoft Teams | https://www.microsoft.com/microsoft-teams/ | website | `fab fa-microsoft` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 独立沟通产品，Teams 专属图标比微软母品牌更易辨识。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-45d5192022e4 | 钉钉 | https://www.dingtalk.com/ | website | `fas fa-bell` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-0625bbe4ab49 | 企业微信 | https://work.weixin.qq.com/ | website | `fab fa-weixin` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 企业协作产品入口，企业微信标识比通用微信母品牌更准确。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-724af556ca10 | Discord | https://discord.com/ | community | `fab fa-discord` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-976eeac66264 | Zoom | https://www.zoom.com/ | website | `fas fa-video` | 工作与协作（work） / 沟通与会议 (work-communication) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-9931966bedbc | GitLab | https://gitlab.com/ | website | `fab fa-gitlab` | 开发（development） / 代码与协作 (development-code-collaboration) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-39625eb27383 | Bitbucket | https://bitbucket.org/ | website | `fab fa-bitbucket` | 开发（development） / 代码与协作 (development-code-collaboration) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 当前品牌字体标识已合适，图片化可延后。 | either | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-b8dc840fe342 | Replit | https://replit.com/ | website | `fas fa-terminal` | 开发（development） / 开发工具与环境 (section-cac953817e) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-fc646e755422 | CodeSandbox | https://codesandbox.io/ | website | `fas fa-code` | 开发（development） / 开发工具与环境 (section-cac953817e) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-6d5a929c971e | StackBlitz | https://stackblitz.com/ | website | `fas fa-bolt` | 开发（development） / 开发工具与环境 (section-cac953817e) | A | 独立协作 / 创作 / 开发产品，品牌图标可快速识别工具。 | either | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-5c80faa79378 | MuseScore 乐谱社区 | https://musescore.com/sheetmusic | asset | `fas fa-file-lines` | 音乐（music-study） / 乐谱资源 (section-fe06f6fbba) | A | 独立乐谱社区服务，品牌标识可识别，并通过标题区别 MuseScore 编辑软件。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b02efc4268e3 | IMSLP - Petrucci Music Library | https://imslp.org/ | asset | `fas fa-book` | 音乐（music-study） / 乐谱资源 (section-fe06f6fbba) | A | 独立素材服务品牌，专属小标识有助于识别供应平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-a3a2d6e482de | EarMaster | https://www.earmaster.com/ | software | `fas fa-ear-listen` | 软件（software） / 阅读与学习 (software-reading-learning)；兼用于 音乐 / 音乐学习 (section-934281eab5) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-f8db0988b3a0 | VI-Control 社区 | https://vi-control.net/community/ | community | `fas fa-keyboard` | 音频与视频（av） / 音频社区 (av-audio-community) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-66f28f89c243 | KVR Audio 论坛 | https://www.kvraudio.com/forum/ | community | `fas fa-sliders` | 音频与视频（av） / 音频社区 (av-audio-community) | A | 独立命名社区，自身标识有助于识别讨论 / 作品平台。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-cb06d96dbe69 | Spotify | https://open.spotify.com/ | website | `fab fa-spotify` | 音乐（music） / 收听与发现 (section-f1f553c5bc) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 当前品牌字体标识已合适，图片化可延后。 | favicon | 1→2→3→4（自身产品 / 品牌） | 字体已足够，可延后 |
| res-d44f5592ef75 | Rate Your Music | https://rateyourmusic.com/ | website | `fas fa-star-half-stroke` | 音乐（music-study） / 音乐探索 (section-89ad56ac78) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-b939645bed96 | Ableton Live | https://www.ableton.com/ | software | `fas fa-table-cells` | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-75ae98f287b2 | REAPER | https://www.reaper.fm/ | software | `fas fa-wave-square` | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-d130cc2e9c59 | Audacity | https://www.audacityteam.org/ | software | `fas fa-scissors` | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | A | 独立软件产品，应用图标有助于在工具列表中快速定位。 | logo | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-efe4c2b50a33 | Native Instruments | https://www.native-instruments.com/ | website | `fas fa-drum` | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 插件与扩展 / 音频插件与音源 (section-3ce54de4b7) | A | 独立命名的平台 / 服务 / 机构入口，自身小标识有助于识别。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |
| res-20dbab3b0c2f | Gearspace | https://www.gearslutz.com/board/ | website | `fas fa-microphone-lines` | 音频与视频（av） / 音频社区 (av-audio-community) | A | 独立录音社区，需下一轮核实旧域名与现品牌资产，但本轮不改 URL。 | favicon | 1→2→3→4（自身产品 / 品牌） | 新增自身标识候选 |

## 6. B 类完整清单：有合适官方图标则补

| resourceId | name | URL | type | 当前 icon class | 主要 view / section（含其他场景） | 分类 | 理由 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| res-d08195ed9949 | BlenderBros的Gumroad | https://theblenderbros.gumroad.com/ | website | `fas fa-users` | 3D（3d） / 模型与素材 (section-7595af6cb3) | B | 创作者在 Gumroad 的商店页；仅在有作者自身官方标识时补，避免仅复制母平台 Logo。 |
| res-bda5cef98698 | Ponte的Smugmug个人主页 | https://ponte-ryuurui.smugmug.com/ | website | `fas fa-user` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | B | 个人作品主页，清晰作者头像 / 标识可选，不强求平台 Logo。 |
| res-1151a8221b4f | BlenderBros主页 | https://www.blenderbros.com/ | tutorial | `fas fa-users` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | B | 团队教程网站可用自身 favicon，品牌识别收益中等。 |
| res-c816da9bb133 | ninja | https://texture.ninja/ | asset | `fas fa-bolt` | 3D（3d） / 材质与环境 (section-e5697c06bc) | B | 独立小型素材站，存在可信清晰 favicon 时可补，否则保留素材语义。 |
| res-ccafe101a1b7 | hdrlabs | （未记录 URL） | asset | `fas fa-sun` | 3D（3d） / 材质与环境 (section-e5697c06bc) | B | 历史保留的独立资源站 / 商城记录，URL 为空；只有能确认官方来源时才补。 |
| res-ab76c716a489 | hdri skies | https://hdri-skies.com/ | asset | `fas fa-cloud-sun` | 3D（3d） / 材质与环境 (section-e5697c06bc) | B | 独立小型素材站，存在可信清晰 favicon 时可补，否则保留素材语义。 |
| res-1fd1e7c5726d | Three D Scans | https://threedscans.com/ | website | `fas fa-monument` | 3D（3d） / 模型与素材 (section-7595af6cb3) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-8d8eacb7c555 | blender魔酷网 | https://blender.kim/ | community | `fas fa-magic` | 3D（3d） / 教程与社区 (section-7b2b83d3fd)；兼用于 插件与扩展 / 3D扩展与资源 (section-a14bf349ed) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-c9755226e683 | CG pepper | https://www.cgpepper.com/ | website | `fas fa-pepper-hot` | 3D（3d） / 模型与素材 (section-7595af6cb3) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-297f934b6192 | modown魔顿 | http://www.modown.cn/ | asset | `fas fa-dungeon` | 3D（3d） / 模型与素材 (section-7595af6cb3) | B | 独立小型素材站，存在可信清晰 favicon 时可补，否则保留素材语义。 |
| res-bd114f6473d7 | 画忆妙妙屋 | https://www.iiicg.com/ | community | `fas fa-paint-roller` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-0b621b7aa006 | 书生CG资源网 | https://c4dsky.com/ | website | `fas fa-cloud` | 3D（3d） / 模型与素材 (section-7595af6cb3) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-7f29fe2f7450 | 3dart | https://www.3dart.it/en/ | community | `fas fa-globe-europe` | 3D（3d） / 教程与社区 (section-7b2b83d3fd) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-0ea83479fc3f | Trellis 3D | https://trellis3d.net/ | website | `fas fa-comment` | AI（ai） / 音频、视频与3D生成 (section-d37654c45a) | B | catalog 描述为 3D 生成工具，但当前域名与独立产品身份未核实；有可信自身图标再补。 |
| res-7af19e673662 | midlibrary | https://midlibrary.io/ | website | `fas fa-book` | AI（ai） / 图像资料与模型 (ai-image-resources) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-627b56ed27b3 | cg迷 | https://cgmi.com/ | tutorial | `fas fa-users` | AI（ai） / 图像资料与模型 (ai-image-resources) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-fb263d5b862b | film-grab | https://film-grab.com/ | website | `fas fa-video` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-fde13a4c0113 | The Costumer's Guide to Movie Costumes | http://www.costumersguide.com/ | website | `fas fa-tshirt` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-54640836d0f0 | 电影拉片学院 | http://www.movieminer.top/# | website | `fas fa-clipboard-list` | 美术（art-study） / 影视视觉学习 (section-9aee3b376d) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-6813649c205c | 纪妖 | https://www.cbaigui.com/ | website | `fas fa-ghost` | 美术与设计（art） / 综合参考 (art-concept-general) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-a774b5935e45 | this person does not exist | https://www.thispersondoesnotexist.com/ | website | `fas fa-robot` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 单一 AI 人脸演示站，站点 favicon 可选，机器人语义已足够直观。 |
| res-4b4e85f45762 | line-of-action | https://line-of-action.com/ | website | `fas fa-pencil-alt` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-0db5970773e1 | bodies in motion | https://www.bodiesinmotion.photo/ | website | `fas fa-running` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-32a9fd9b07e0 | reference angle | http://referenceangle.com/ | website | `fas fa-user` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-86babe512d3e | pose-search | https://x6ud.github.io/pose-search/#/ | website | `fas fa-search` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-aa2b4b5f0559 | character designs | https://www.characterdesigns.com/ | website | `fas fa-users` | 美术与设计（art） / 人体参考 (art-concept-anatomy) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-7d13d28fa9cf | A map and A lens | https://www.mapandlens.com/ | website | `fas fa-camera` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-52344ad21034 | Dylan cole | https://dylancolestudio.com/ | website | `fas fa-user` | 美术与设计（art） / 艺术家与社区 (art-concept-artists) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-0dfbc334bf39 | 盘古的声音_站酷主页 | https://www.zcool.com.cn/u/16548136 | website | `fas fa-paint-brush` | 美术与设计（art） / 艺术家与社区 (art-concept-artists) | B | 艺术家作品主页，可用其官方个人标识，不强求站酷母平台 Logo。 |
| res-235c2d82268a | Art Of Soulburn | http://www.neilblevins.com/ | tutorial | `fas fa-graduation-cap` | 美术（art-study） / CG教程 (section-516622023b) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-25c223ccb970 | 阮佳个人信息网站 | https://www.ruanjia.com/ | website | `fas fa-crown` | 美术与设计（art） / 艺术家与社区 (art-concept-artists) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-27a435bd6587 | MFD设计师导航 | https://www.mfchange.cn/index.html | website | `fas fa-compass` | 美术与设计（art） / 工具 (art-concept-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-cd65f492a506 | physicallybased | https://physicallybased.info/ | website | `fas fa-atom` | 3D（3d） / 材质与环境 (section-e5697c06bc) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-58ed25568c4c | airpano | https://www.airpano.com/ | website | `fas fa-globe` | 美术与设计（art） / 影视与摄影参考 (art-concept-photo) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-e437ff3fc9fd | silk | https://weavesilk.com/ | website | `fas fa-paint-brush` | 美术与设计（art） / 工具 (art-concept-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-3a34fe23f765 | Now Fashion | https://nowfashion.com/ | website | `fas fa-camera` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-9c6cf3eb527f | With A Wish | https://www.withawish.jp/tuxedo/index.cgi#search_box | website | `fas fa-user-tie` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-76a0ce3629cf | Long Coat | https://long-coat.uenoya.jp/ | website | `fas fa-vest` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-2eb2d7addd5a | Style Korea | https://stylekorea.tumblr.com/ | website | `fas fa-flag` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-1aa2da8a9ba3 | Moritz Jendrl | http://moritz-jendrl.de/ | website | `fas fa-dumpster-fire` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-b031b7c4504c | Lolita Wardrobe | https://www.lolitawardrobe.com/ | website | `fas fa-ribbon` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-6eab9925caf6 | Fantasmagoria | https://fantasmagoria.shop/ | website | `fas fa-moon` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-cb87182a0b47 | Atomic Jane Clothing | （未记录 URL） | website | `fas fa-cogs` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 历史保留的独立资源站 / 商城记录，URL 为空；只有能确认官方来源时才补。 |
| res-ec9023584483 | Myoppa | https://www.myoppa.fr/ | website | `fas fa-clock` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-f797e6c17691 | Yumeyakata | https://www.yumeyakata.com/ | website | `fas fa-kiwi-bird` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-932902626cde | Kimonomachi | https://www.kimonomachi.co.jp/ | website | `fas fa-fan` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-49d95c18e9f8 | Armstreet | https://armstreet.com/ | website | `fas fa-shield-alt` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-c7675ccf7c83 | Recycled Movie Costumes | https://recycledmoviecostumes.tumblr.com/ | website | `fas fa-recycle` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-87e754063973 | Kostym | https://www.kostym.cz/Anglicky/obsah.htm | website | `fas fa-globe-europe` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-715393f09ccc | Elizabethan Costume | http://www.elizabethancostume.net/ | website | `fas fa-crown` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-79f7ac7b595f | Photo Detective | http://www.photodetective.co.uk/Index.html | website | `fas fa-camera-retro` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-f460963fbf89 | Fashion Era | https://fashion-era.com/ | website | `fas fa-vest` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-4113ec1000d8 | 汉服荟商城 | https://m.hanfuhui.com/ | website | `fas fa-store` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-d243102ce959 | 中国汉服网 | https://www.weili.tv/ | website | `fas fa-video` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-2a37fce77ad9 | 汉服资料馆 | http://120.25.237.190/hanfu/index.html | website | `fas fa-book` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | B | 独立汉服专业资料站，当前为 IP 入口；仅在能核实站点自身可信标识时补。 |
| res-813f7b8a45c2 | 阿虚同学的储物间 | https://axutongxue.com/ | website | `fas fa-user-graduate` | 日常工具（daily） / 资源导航 (section-21424f850e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-9ae7811f88bd | 下次一定 | https://www.iiice.cn/#/ | website | `fas fa-hand-peace` | 日常工具（daily） / 资源导航 (section-21424f850e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-b444131396c3 | 高校AC | https://www.gaoxiaoac.com/ | website | `fas fa-graduation-cap` | 学习资源（research） / 学习资源导航 (section-2d02caa496) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-5615a0332c05 | 图欧学习导航 | https://tuostudy.upnb.top/favorites/list/ | website | `fas fa-map` | 学习资源（research） / 学习资源导航 (section-2d02caa496) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-8cb46b50beea | 壳壳博客 | https://kkok.cc/ | website | `fas fa-blog` | 日常工具（daily） / 资源导航 (section-21424f850e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-3c8892984c87 | 懒人导航网 | https://lanrenao.com/ | website | `fas fa-couch` | 日常工具（daily） / 资源导航 (section-21424f850e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-ea7afc1c5a05 | 轻工具 | https://qinggongju.com/ | website | `fas fa-tools` | 日常工具（daily） / 资源导航 (section-21424f850e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-4e4286db6d55 | Sobooks | https://sobooks.cc/ | website | `fas fa-book` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-3b751e75f487 | 苦瓜书盘 | https://www.kgbook.com/ | website | `fas fa-lemon` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-82a3f65e65ad | 走读派 | http://www.zoudupai.com/ | community | `fas fa-walking` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-6cf1e7e339ad | 书享家 | http://shuxiangjia.cn/ | website | `fas fa-home` | 日常工具（daily） / 阅读与电子书 (section-05d844b301) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-542f49f089be | 相约久久地图 | https://www.meet99.com/map/ | website | `fas fa-map-marked-alt` | 日常工具（daily） / 地图 (section-c20026ba66) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-d629f3ee517c | 民族语言 | https://www.ethnologue.com/ | website | `fas fa-globe-americas` | 学习资源（research） / 语言资料 (section-9d928232ff) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-baf622d2b50c | It's Adoorable | https://ncase.me/door/ | website | `fas fa-gamepad` | 游戏（games） / 互动小游戏 (section-83dc30996e) | B | 个人互动小游戏项目，有清晰项目自身 favicon 可补，否则游戏语义即可。 |
| res-3955ba862077 | JavaScript.info | https://javascript.info/ | website | `fab fa-js` | 开发学习（code-study） / 课程与学习路线 (section-24fa51cf93) | B | 独立 JavaScript 教程站，有清晰自身 favicon 可补，已有语言字形可继续保留。 |
| res-84045aec8cf8 | GAME UI database | https://gameuidatabase.com/index.php | website | `fas fa-database` | 游戏制作（game-production） / 设计参考 (section-d24ce72187) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-4936c36df3f4 | jsfxr | https://sfxr.me/ | website | `fas fa-wave-square` | 游戏制作（game-production） / 制作工具 (section-b38206fa8a)；兼用于 音频与视频 / 音频制作工具 (section-2ef48c0866) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-236a4d1c98b8 | GDKeys | https://gdkeys.com/ | website | `fas fa-key` | 游戏设计（game-study） / 理论与案例 (section-daeccf0507) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-8c3e98efb927 | Kenney Assets | https://kenney.nl/assets | asset | `fas fa-box-open` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | B | 作者品牌素材项目，有可信 Kenney 标识可补，不要求换成复杂文字 Logo。 |
| res-2a3e5c56f461 | SteamPY | https://steampy.com/home | website | `fas fa-shopping-basket` | 游戏（games） / 购买与优惠 (section-27f74da05e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-f7478d75cebd | CDKEY No Gap | https://www.cdkeynogap.com/ | website | `fas fa-key` | 游戏（games） / 购买与优惠 (section-27f74da05e) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-b1a3289aa752 | 枪炮世界 | http://pewpewpew.work/index.htm | website | `fas fa-globe-asia` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-09d2dba8da06 | 战甲军品赏析 | https://www.junpin360.com/ | website | `fas fa-shield-alt` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-5cfc76476aaa | 火器百科 | https://huoqibaike.club/wiki/%E9%A6%96%E9%A1%B5 | website | `fas fa-fire` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-ac7bbceb6bb9 | Popular Mechanics | https://www.popularmechanics.com/ | website | `fas fa-newspaper` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-8256b3e5c3e7 | Tactical Weapons | https://rct66.tumblr.com/ | website | `fab fa-tumblr` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-c4790a17734a | Modern Firearms | https://modernfirearms.net/en/ | website | `fas fa-database` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-1762b13a7dc3 | US Militaria Forum | https://www.usmilitariaforum.com/forums/index.php | community | `fas fa-comments` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-97cbe37bc82d | Gun Wiki | https://guns.fandom.com/wiki/Main_Page | website | `fab fa-wikipedia-w` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | B | Fandom 中的枪械专业 Wiki；可用自身社区标识，但不强求母平台 Logo，当前 Wikipedia 字形需复核。 |
| res-24f30e6bf287 | Gunworld | https://www.gunworld.com.au/ | website | `fas fa-store` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-674631b6016a | Hoff Gun | https://hoffgun.com/ | website | `fas fa-store` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-1a2c53afbdba | House of Guns | https://houseofguns.pl/en/ | website | `fas fa-gavel` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-83571c690a84 | Only Airsoft | https://www.onlyairsoft.com/ | website | `fas fa-gamepad` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-7e9b51a1f805 | Rock Island Auction | https://www.rockislandauction.com/ | website | `fas fa-gavel` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | B | 专业 / 小型资料或参考站，自身 favicon 可选，暂不强求品牌图片。 |
| res-64ef3d7e03d5 | AmCharts像素图生成器 | http://pixelmap.amcharts.com/# | website | `fas fa-drafting-compass` | 美术与设计（art） / 工具 (art-visual-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-de194ed9757b | MacPedia | https://macpedia.xyz/ | website | `fas fa-info-circle` | 软件（software） / 系统与软件管理 (software-system-management) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-45c2a24b25b0 | 热播之家 | https://rebozj.pro/ | website | `fas fa-fire` | 影视（film） / 影视在线 (section-ac085ab313) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-0310c06e735b | 网飞猫 | https://www.ncat22.com/ | website | `fas fa-cat` | 影视（film） / 影视在线 (section-ac085ab313) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-2093fb1cd899 | 4K影视 | https://www.4kvm.tv/ | website | `fas fa-film` | 影视（film） / 影视在线 (section-ac085ab313) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-bee702507606 | 影猫的仓库 | https://ymck.pro/ | website | `fas fa-cat` | 影视（film） / 聚合搜索 (section-576e244e9a) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-1c0d2a644fd8 | 中国色 | https://zhongguose.com/#danshuhong | website | `fas fa-flag` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-d8d0fc3e57b4 | colorleap | https://colorleap.app/home | website | `fas fa-history` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-e0d01eb76f90 | icolorpalette | https://icolorpalette.com/ | website | `fas fa-clipboard-list` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-6388941b003d | uigradients | https://uigradients.com/#Pizelex | website | `fas fa-fill-drip` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-8e7240816e12 | web gradients | https://webgradients.com/ | website | `fas fa-cloud` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-155b3664b795 | color supplyy | https://colorsupplyyy.com/app | website | `fas fa-tools` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-0a4f4e0368f6 | colourcode | https://www.toptal.com/designers/colourcode | website | `fas fa-code` | 美术与设计（art） / 配色 (art-visual-color) | B | 独立配色工具页，可用清晰工具 favicon，不能确认时保留颜色 / 代码语义。 |
| res-5c2cba66c115 | Artchips艺术碎片 | https://artchips.art/ | website | `fas fa-puzzle-piece` | 美术与设计（art） / 工具 (art-visual-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-d448463af2da | Duotone by ShapeFactory | https://duotone.shapefactory.co/?f=3f7b8d&t=23183e&q=_ | website | `fas fa-adjust` | 美术与设计（art） / 工具 (art-visual-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-a0e91409604d | 搜图导航 | https://www.91sotu.com/ | website | `fas fa-compass` | 美术与设计（art） / 工具 (art-visual-tools) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-a4d546d8288c | 腾祥字库 | https://www.tensentype.com/ | website | `fas fa-text-width` | 美术与设计（art） / 字体与文字 (art-visual-type) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-0cae4975a329 | 文悦字库 | https://wenyue.cn/ | website | `fas fa-pen-fancy` | 美术与设计（art） / 字体与文字 (art-visual-type) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-641b04a8fdc6 | 本墨字库 | http://www.benmo.biz/ | website | `fas fa-pen-fancy` | 美术与设计（art） / 字体与文字 (art-visual-type) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-d05394c26b11 | 字体传奇网 | http://www.ziticq.com/ | website | `fas fa-crown` | 美术与设计（art） / 字体与文字 (art-visual-type) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-637c9b7a090c | reeoo | https://reeoo.com/app/ | website | `fas fa-mobile-alt` | 美术与设计（art） / 灵感与案例 (art-visual-inspiration) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-24c80b844d87 | 秀设计 | https://www.xiusheji.com/ | community | `fas fa-paint-brush` | 美术与设计（art） / 社区与趋势 (art-visual-community) | B | 专业小型社区，自身 favicon 可选，当前社区语义已经清楚。 |
| res-7344a6a6a831 | 设计癖 | https://www.shejipi.com/ | website | `fas fa-lightbulb` | 美术与设计（art） / 灵感与案例 (art-visual-inspiration) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-1a109a64242b | 家纺趋势 | https://www.91jiafang.com/ | website | `fas fa-bed` | 美术与设计（art） / 社区与趋势 (art-visual-community) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-ed87a0dbc4cd | 8 Notes | https://www.8notes.com/ | website | `fas fa-music` | 音乐（music-study） / 乐谱资源 (section-fe06f6fbba) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-80e0fca407d8 | Mutopia Project | https://www.mutopiaproject.org/ | website | `fas fa-book-open` | 音乐（music-study） / 乐谱资源 (section-fe06f6fbba) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-ce669eca53a5 | Every Noise at Once | https://www.everynoise.com/ | website | `fas fa-globe` | 音乐（music-study） / 音乐探索 (section-89ad56ac78) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-79f0be38132d | MusicTheory.net | https://www.musictheory.net/ | tutorial | `fas fa-chalkboard-user` | 音乐（music-study） / 音乐学习 (section-934281eab5) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-13fb5bfd515d | Teoria | https://www.teoria.com/ | tutorial | `fas fa-book-reader` | 音乐（music-study） / 音乐学习 (section-934281eab5) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |
| res-5f035db35b6c | TonedEar | https://tonedear.com/ | website | `fas fa-wave-square` | 音乐（music-study） / 音乐学习 (section-934281eab5) | B | 独立资料 / 灵感 / 个人项目站，品牌识别收益中等，官方 favicon 可选。 |

## 7. C 类完整清单：建议保留通用图标

| resourceId | name | URL | type | 当前 icon class | 主要 view / section（含其他场景） | 分类 | 理由 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| res-782ef7ee4731 | KIT OPS 2 Manual | https://docs.google.com/document/d/1rUzomyTi7ec2sFqeCgyVYgkbdnmVanlDCWYcvAzxOXE/edit | manual | `fas fa-book-open` | 3D（3d） / 手册与插件 (3d-manuals-plugins)；兼用于 插件与扩展 / 3D扩展与资源 (section-a14bf349ed) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-0cca09db33fd | boxcutter手册 | https://boxcutter-manual.readthedocs.io/en/latest/ | manual | `fas fa-cube` | 3D（3d） / 手册与插件 (3d-manuals-plugins)；兼用于 插件与扩展 / 3D扩展与资源 (section-a14bf349ed) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-76887030b7a3 | MESHmachine参考手册 | https://machin3.io/MESHmachine/docs/ | manual | `fas fa-cog` | 3D（3d） / 手册与插件 (3d-manuals-plugins)；兼用于 插件与扩展 / 3D扩展与资源 (section-a14bf349ed) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-d9f8c92e89a4 | marvelous designer官方手册 | https://support.marvelousdesigner.com/hc/zh-cn/categories/360002390871 | manual | `fas fa-tshirt` | 3D（3d） / 手册与插件 (3d-manuals-plugins) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-f0d2b52d1ba5 | Live2D Cubism 手册 | https://docs.live2d.com/zh-CHS/cubism-editor-manual/top/ | manual | `fas fa-book` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | C | 官方手册入口以查阅文档为主，书本语义比重复软件 Logo 更能区分用途。 |
| res-cc39e930a6d4 | Live2D Cubism官方教程 | https://docs.live2d.com/zh-CHS/cubism-editor-tutorials/top/ | tutorial | `fas fa-graduation-cap` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | C | 同软件的官方教程入口，教学语义可区别手册与软件。 |
| res-a05767c5d3d9 | 斑斓中国 | https://www.blendercn.org/tag/%E6%96%91%E6%96%93%E4%B8%AD%E5%9B%BD | website | `fas fa-flag` | 3D（3d） / 模型与素材 (section-7595af6cb3) | C | 母站内的文化专题标签页，不需要复制母站 Logo。 |
| res-5b82b9bcfe4b | midjourney关键词大全 | https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference | website | `fab fa-github` | AI（ai） / 图像资料与模型 (ai-image-resources) | C | GitHub 中的具体提示词参考项目，仓库内容语义比统一 GitHub Logo 更有区分度。 |
| res-6474cdc40eb4 | midjourney 官方画廊 | https://www.midjourney.com/showcase | website | `fas fa-images` | AI（ai） / 图像资料与模型 (ai-image-resources) | C | 同一产品的展示画廊子页，图集语义可区别于 Midjourney 创作入口。 |
| res-02896af45aba | proko解剖学专题页 | https://www.proko.com/course-lesson/anatomy-terms/notes | website | `fas fa-user-md` | 美术（art-study） / 人体与建筑学习 (section-19e0bd354a) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-394b5d8e9d91 | 古建枋类种类细分 | https://www.sohu.com/a/251016495_743882 | website | `fas fa-landmark` | 美术（art-study） / 人体与建筑学习 (section-19e0bd354a) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-4055a01a0592 | 有关榫卯，这里有最详细的介绍 | https://zhuanlan.zhihu.com/p/71813034 | website | `fas fa-puzzle-piece` | 美术（art-study） / 人体与建筑学习 (section-19e0bd354a) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-7527bb42a283 | zpz 学员作品主页 | http://zpzdesign.artp.cc/works | website | `fas fa-users` | 美术与设计（art） / 艺术家与社区 (art-concept-artists) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-c9bf378b40f8 | Loux The Vintage Guru | https://louxthevintageguru.tumblr.com/tagged/loux | website | `fas fa-user` | 美术与设计（art） / 现代时装 (art-reference-fashion-modern) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-bf206b68f1c4 | Mark Cordory | https://markcordory.com/salvaged-ware-costumes | website | `fas fa-skull-crossbones` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-03fd01c04883 | Survival Game Fashion Snap | http://sg-fashion-snap.com/archives/category/men | website | `fas fa-vest-patches` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-27c478e7516e | Vertugadins | https://www.vertugadins.com/location/ | website | `fas fa-history` | 美术与设计（art） / 风格与题材 (art-reference-fashion-style) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-a1da8023cf1e | Larsdatter | http://www.larsdatter.com/18c/index.html | website | `fas fa-history` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-1b50ec31dfbb | 维基百科-西方服饰史 | https://en.wikipedia.org/wiki/History_of_Western_fashion | website | `fab fa-wikipedia-w` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | Wikipedia 的服饰史条目，应按内容区分，不优先新增母站 Logo。 |
| res-d51a2e70753e | Colonial Williamsburg | https://emuseum.history.org/ | website | `fas fa-flag-usa` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-9ce348dc0699 | 京都服装学院 | https://www.kci.or.jp/en/archives/digital_archives/ | website | `fas fa-archive` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-c7a3c8b06568 | 历史时尚 | https://www.pinterest.com/thedreamstress/ | website | `fab fa-pinterest` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | 具体 Pinterest 图板，保留内容 / 类型标识，避免所有图板同貌。 |
| res-0b66f5271259 | 欧洲区域时尚 | https://www.pinterest.com/WEuropeCostumes/ | website | `fab fa-pinterest` | 美术与设计（art） / 历史服装 (art-reference-fashion-history) | C | 具体 Pinterest 图板，保留内容 / 类型标识，避免所有图板同貌。 |
| res-ead781650e6d | Stonefinder | https://www.pinterest.com/stonefinder/ | website | `fab fa-pinterest` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 具体 Pinterest 图板，保留内容 / 类型标识，避免所有图板同貌。 |
| res-82d0a79b3f2f | 10分钟带你了解西方服装史 | https://zhuanlan.zhihu.com/p/440541640 | website | `fab fa-zhihu` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-b8761268a54b | 雅衿汉服社 汉服形制科普 | https://www.bilibili.com/read/cv8121944/ | website | `fab fa-bilibili` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-e7d6b67f4a2c | 古墓仙女汉服入门穿搭手册汇总大全 | https://www.sohu.com/a/546200817_121119316 | manual | `fab fa-sourcetree` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇搜狐汉服文章，保留文章 / 服饰语义；现 Sourcetree 品牌需单独复核。 |
| res-5f0f40e1a52d | 说给汉服 微博主页 | https://weibo.com/u/5129313642 | website | `fab fa-weibo` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-67e89602a928 | 知乎问题"汉服种类有哪些" | https://www.zhihu.com/question/47581644/answer/1790717469 | website | `fab fa-zhihu` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-a474da8a7640 | 汉服裁剪图 知乎文章 | https://zhuanlan.zhihu.com/p/64626495 | website | `fab fa-zhihu` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-7ee3b2d7a1da | 汉服制版\|男子汉服的分类及裁剪图整理 | https://www.bilibili.com/read/cv14535456 | tutorial | `fab fa-bilibili` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-6f7da3e25738 | 唐背子小科普 | https://www.bilibili.com/read/cv9899778 | website | `fab fa-bilibili` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-f6712a9ddb32 | 科普 \| 被遗忘的传统——交窬裁剪的裙子 | https://www.sohu.com/a/301082591_612229 | website | `fab fa-sourcetree` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇搜狐汉服文章，保留文章 / 服饰语义；现 Sourcetree 品牌需单独复核。 |
| res-ce6dbf2a8d9b | 设计 \| 常见的汉服款式赏析 | https://zhuanlan.zhihu.com/p/426806809 | website | `fab fa-zhihu` | 美术与设计（art） / 设计资料 (art-reference-fashion-info) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-75b69a6994ff | VS Code Docs | https://code.visualstudio.com/docs | manual | `fas fa-laptop-code` | 开发（development） / 文档与参考 (section-808be5a2c8) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-55afbb2bf7d5 | Git Documentation | https://git-scm.com/doc | manual | `fab fa-git-alt` | 开发（development） / 代码与协作 (development-code-collaboration) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-ddc6a11b6e06 | React Docs | https://react.dev/ | manual | `fab fa-react` | 开发（development） / 文档与参考 (section-808be5a2c8) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-0ee9368c2a94 | GitHub Pages | https://docs.github.com/pages | website | `fab fa-github` | 开发（development） / 云服务与部署 (section-6372255ca7) | C | 资源实际指向 GitHub Pages 文档，文档用途优先，不作为托管产品主入口补图。 |
| res-2b470a6bc853 | Vercel Docs | https://vercel.com/docs | manual | `fas fa-rocket` | 开发（development） / 云服务与部署 (section-6372255ca7) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-cc06f6877128 | Godot Docs官方手册 | https://docs.godotengine.org/zh-cn/4.x/ | manual | `fas fa-book` | 游戏制作（game-production） / 引擎与文档 (section-a0c24de405) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-3efd77a9188c | Unity Manual | https://docs.unity3d.com/Manual/index.html | manual | `fas fa-cubes` | 游戏制作（game-production） / 引擎与文档 (section-a0c24de405) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-03833110be8f | Unreal Engine Docs | https://dev.epicgames.com/documentation/en-us/unreal-engine | manual | `fas fa-cube` | 游戏制作（game-production） / 引擎与文档 (section-a0c24de405) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-52fdc3546967 | Lospec Palette List | https://lospec.com/palettes/ | website | `fas fa-palette` | 游戏制作（game-production） / 美术、动画与素材 (section-b104ccd299) | C | Lospec 的色板专题库，与同站社区入口分开，用配色语义更直观。 |
| res-081fc086a730 | Sonniss GameAudioGDC | https://sonniss.com/gameaudiogdc/ | website | `fas fa-archive` | 游戏制作（game-production） / 音频资源 (section-31e53fc463)；兼用于 音频与视频 / 音频素材 (section-6cbaf07749) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-b16c19af17c2 | MDA Framework | https://aaai.org/papers/ws04-04-001-mda-a-formal-approach-to-game-design-and-game-research/ | tutorial | `fas fa-layer-group` | 游戏设计（game-study） / 理论与案例 (section-daeccf0507) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-e0c94b39760f | The Door Problem | https://igda.org/resources-archive/the-door-problem-2014/ | tutorial | `fas fa-door-open` | 游戏设计（game-study） / 理论与案例 (section-daeccf0507) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-a9b31743b222 | Game Developer - Design | https://www.gamedeveloper.com/design | website | `fas fa-newspaper` | 游戏设计（game-study） / 理论与案例 (section-daeccf0507) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-60c0a0f7b942 | GDC Vault Free | https://gdcvault.com/free/all | website | `fas fa-video` | 游戏设计（game-study） / 理论与案例 (section-daeccf0507) | C | 会议公开视频子集合，以视频 / 档案语义区分用途。 |
| res-4deb1157cc83 | Xbox Accessibility Guidelines | https://learn.microsoft.com/en-gb/gaming/accessibility/guidelines | manual | `fas fa-universal-access` | 游戏制作（game-production） / 设计参考 (section-d24ce72187) | C | 具体产品手册 / 文档入口，保留文档语义以区别产品主入口。 |
| res-f135808dde68 | Gun 枪列表 | https://en.wikipedia.org/wiki/Gun | website | `fab fa-wikipedia-w` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-f4a013f097d8 | List of Battle Rifles | https://en.wikipedia.org/wiki/List_of_battle_rifles | website | `fas fa-crosshairs` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-ded5d0b9adbe | List of Assault Rifles | https://en.wikipedia.org/wiki/List_of_assault_rifles | website | `fas fa-crosshairs` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-f957875f92c4 | List of Sniper Rifles | https://en.wikipedia.org/wiki/List_of_sniper_rifles | website | `fas fa-crosshairs` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-b7daea6f06a3 | List of Pistols | https://en.wikipedia.org/wiki/List_of_pistols | website | `fas fa-gun` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-bb6a125db9fb | Table of Handgun and Rifle Cartridges | https://en.wikipedia.org/wiki/Table_of_handgun_and_rifle_cartridges | website | `fas fa-table` | 美术与设计（art） / 弹药 (art-reference-weapons-ammo) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-4ef1ad0a8dd9 | List of Handgun Cartridges | https://en.wikipedia.org/wiki/List_of_handgun_cartridges | website | `fas fa-list` | 美术与设计（art） / 弹药 (art-reference-weapons-ammo) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-57cb1faa91ba | Category: Firearm Components | https://en.wikipedia.org/wiki/Category:Firearm_components | website | `fas fa-puzzle-piece` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-573ca95f163d | List of Telescope Parts and Construction | https://en.wikipedia.org/wiki/List_of_telescope_parts_and_construction | website | `fas fa-binoculars` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-4fd2f2cdaae2 | Category: Firearm Actions | https://en.wikipedia.org/wiki/Category:Firearm_actions | website | `fas fa-bolt` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-620ca2bf3949 | Rail Integration System | https://en.wikipedia.org/wiki/Rail_Integration_System | website | `fas fa-sliders-h` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-39a2bb0fa0f4 | Glossary of Firearms Terms | https://en.wikipedia.org/wiki/Glossary_of_firearms_terms | website | `fas fa-book` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-b9d6ede0d910 | 武器列表 - Britannica | https://www.britannica.com/topic/list-of-weapons-2058724 | website | `fas fa-book-open` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-98adcb92e001 | United Nations Office on Drugs and Crime | https://www.unodc.org/e4j/en/firearms/module-2/key-issues/firearms-parts-and-components.html | website | `fas fa-university` | 美术与设计（art） / 结构与术语 (art-reference-weapons-structure) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-8a62522127b6 | C&Rsenal | https://candrsenal.com/primer-gallery/ | website | `fas fa-museum` | 美术与设计（art） / 社区与资料库 (art-reference-weapons-community) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-37e9e312f716 | Academy 枪支分页 | https://www.academy.com/c/outdoors/shooting/firearms | website | `fas fa-store` | 美术与设计（art） / 商城与拍卖参考 (art-reference-weapons-market) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-59d18d3be24a | 国学导航－中国历史地图集 | http://www.guoxue123.com/other/map/zgmap/ | website | `fas fa-map-marked-alt` | 历史（history） / 地图与历史可视化 (section-69324106cd) | C | 具体历史地图资料集合，地图语义比母站 Logo 更清楚。 |
| res-df82b0297031 | 地图窝 中国历史地图 | http://www.onegreen.net/maps/List/List_787.html | website | `fas fa-layer-group` | 历史（history） / 地图与历史可视化 (section-69324106cd) | C | 具体历史地图资料集合，地图语义比母站 Logo 更清楚。 |
| res-362623d636fc | 世界历史地图 | （未记录 URL） | website | `fas fa-globe` | 历史（history） / 地图与历史可视化 (section-69324106cd) | C | 具体历史地图资料集合，地图语义比母站 Logo 更清楚。 |
| res-29b208b30ff4 | 中国古代史地图 | https://home.olemiss.edu/~gg/hstrymap/lishidit.htm | website | `fas fa-landmark` | 历史（history） / 地图与历史可视化 (section-69324106cd) | C | 具体历史地图资料集合，地图语义比母站 Logo 更清楚。 |
| res-33669263358e | 知乎文章：历史爱好者福利 | https://zhuanlan.zhihu.com/p/25658582 | website | `fab fa-zhihu` | 历史（history） / 地图与历史可视化 (section-69324106cd) | C | 单篇文章 / 问答 / 教程，母站 Logo 对具体内容识别帮助低。 |
| res-a69a9e6403ca | Category: History | https://en.wikipedia.org/wiki/Category:History | website | `fas fa-tags` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-e50118dbd004 | Category: Regions | https://en.wikipedia.org/wiki/Category:Regions | website | `fas fa-map-pin` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-a9448363a385 | Category: History by Ethnic Group | https://en.wikipedia.org/wiki/Category:History_by_ethnic_group | website | `fas fa-users` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-83e60682465b | Category: History by Location | https://en.wikipedia.org/wiki/Category:History_by_location | website | `fas fa-map-marker-alt` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-26db60028f7d | Human History | https://en.wikipedia.org/wiki/Human_history | website | `fas fa-user-friends` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-490b867ae53f | History of England | https://en.wikipedia.org/wiki/History_of_England | website | `fas fa-crown` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-fce4787393ff | Vikings | https://en.wikipedia.org/wiki/Vikings | website | `fas fa-shield-alt` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-42e8acd0b6b6 | History of France | https://en.wikipedia.org/wiki/History_of_France | website | `fas fa-landmark` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-04ccde1c97ee | History of Germany | https://en.wikipedia.org/wiki/History_of_Germany | website | `fas fa-landmark` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-fef2c5cffb67 | Ancient Greece | https://en.wikipedia.org/wiki/Ancient_Greece | website | `fas fa-columns` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-c36f7ac645fa | Ancient Rome | https://en.wikipedia.org/wiki/Ancient_Rome | website | `fas fa-archway` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-ad625dc4781b | Byzantine Empire | https://en.wikipedia.org/wiki/Byzantine_Empire | website | `fas fa-church` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-ec3ef8eaed78 | History of Italy | https://en.wikipedia.org/wiki/History_of_Italy | website | `fas fa-pizza-slice` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-7ef042574726 | Crusades | https://en.wikipedia.org/wiki/Crusades | website | `fas fa-cross` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-a6f1dae2decd | Ancient Egypt | https://en.wikipedia.org/wiki/Ancient_Egypt | website | `fas fa-monument` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-445c76b4243c | History of the Middle East | https://en.wikipedia.org/wiki/History_of_the_Middle_East | website | `fas fa-mosque` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-4a613a2c251e | History of the United States | https://en.wikipedia.org/wiki/History_of_the_United_States | website | `fas fa-flag-usa` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-9526c09484d9 | History of China | https://en.wikipedia.org/wiki/History_of_China | website | `fas fa-dragon` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-f99220ed7088 | History of Japan | https://en.wikipedia.org/wiki/History_of_Japan | website | `fas fa-torii-gate` | 历史（history） / 历史主题与百科 (section-a2c1857991) | C | 具体 Wiki 条目 / 分类页，内容语义比重复 Wikipedia Logo 更有辨识度。 |
| res-e2d4099d5637 | Khan Academy World History | https://www.khanacademy.org/humanities/world-history | tutorial | `fas fa-chalkboard-teacher` | 历史（history） / 学习与内容 (section-746159982e) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-1f258605e5e0 | National Geographic History | https://www.nationalgeographic.com/history/ | website | `fas fa-camera` | 历史（history） / 学习与内容 (section-746159982e) | C | 具体专题 / 参考 / 作品页面，保留内容语义，避免同母站资源同貌。 |
| res-2a683257703e | Color Claim | https://access.mymind.com/colors | website | `fas fa-swatchbook` | 美术与设计（art） / 配色 (art-visual-color) | C | mymind 下的具体配色参考集合，色卡语义即可，不复制整个产品 Logo。 |
| res-dc3bcae11745 | 图翼 | https://www.tuyiyi.com/t-7913-1.html | website | `fas fa-wrench` | 美术与设计（art） / 字体与文字 (art-visual-type) | C | URL 是字体相关具体页面，保留工具 / 资料类型标识。 |
| res-1f407fe6565f | 中文字体-站长素材 | https://font.chinaz.com/zhongwenziti.html | asset | `fas fa-file-alt` | 美术与设计（art） / 字体与文字 (art-visual-type) | C | 母站中的字体资源栏目，文件语义有助于区别于母站其他素材。 |
| res-cb5f4135fa61 | Reddit 音乐理论社区 | https://www.reddit.com/r/musictheory/ | community | `fab fa-reddit` | 音乐（music-study） / 音乐社区 (section-c890983057) | C | Reddit 中的音乐理论专题社区，继续内容 / 社区语义，不额外复制 Reddit Logo。 |
| res-38fdc79516ea | Reddit 作曲社区 | https://www.reddit.com/r/composer/ | community | `fab fa-reddit` | 音乐（music-study） / 音乐社区 (section-c890983057) | C | Reddit 中的作曲专题社区，继续内容 / 社区语义，不额外复制 Reddit Logo。 |

## 8. D：现有图标建议复核

搜狐汉服和 PCGamingWiki 在当前数据中实际是 Font Awesome，不是本地图片。复核必须以当前字段为准。本节包含它们以及审计中其他明确品牌 / 语义风险；已有图片的明确待确认项为 Superhive。正常加载、扩展名异常、原始尺寸较小本身不计为品牌语义问题。

| resourceId | 名称 | 当前图标 | 问题 / 证据 | 后续动作 | 与 A/B/C 关系 |
| --- | --- | --- | --- | --- | --- |
| res-e7d6b67f4a2c | 古墓仙女汉服入门穿搭手册汇总大全 | `fab fa-sourcetree` | Sourcetree 是开发工具品牌，资源 URL 是搜狐汉服文章，当前字形可显示但品牌不对应。 | 优先考虑服饰 / 文章语义字体；不为文章下载搜狐母站 Logo。 | C（复核标记，不再计一个缺失） |
| res-f6712a9ddb32 | 科普 \| 被遗忘的传统——交窬裁剪的裙子 | `fab fa-sourcetree` | Sourcetree 是开发工具品牌，资源 URL 是搜狐裁剪文章，当前品牌不对应。 | 优先考虑裁剪 / 文章语义字体；保留文章内容区分。 | C（复核标记，不再计一个缺失） |
| res-751a6d512a90 | PCGamingWiki | `fab fa-wikipedia-w` | PCGamingWiki 是独立游戏资料站，fa-wikipedia-w 表达 Wikipedia 品牌，不是它自身。 | 确认 PCGamingWiki 官方 favicon；未确认前考虑资料站语义标识。 | A（复核标记，不再计一个缺失） |
| res-b2d8bb124ac1 | 爱给网_音效配乐 | `fab fa-soundcloud` | 当前 fab 前缀已修复，但 SoundCloud 品牌与爱给网入口不同。 | 下一轮确认爱给网自身 favicon / 简洁 Logo，或保留音频语义 fallback。 | A（复核标记，不再计一个缺失） |
| res-97cbe37bc82d | Gun Wiki | `fab fa-wikipedia-w` | 当前 fab 前缀已修复；URL 属于 Fandom 中 Gun Wiki，Wikipedia 字形不能代表该社区身份。 | 有可信 Gun Wiki 自身标识则补，否则枪械 / 百科语义更合适。 | B（复核标记，不再计一个缺失） |
| res-7b921cd30d30 | Superhive | `assets/icons/blender-market.png` | 当前显示 assets/icons/blender-market.png 的历史标识，实体名称 / URL 已为 Superhive；本地文件仍为原品牌资产，现品牌是否继续沿用未联网核实。 | 下一轮先核实品牌是否沿用，再决定保留或更新；不能仅因文件名旧就自动替换。 | 已有图片，不纳入 A/B/C，也不计缺失 |

Google 系列混用图片和字体、软件与手册共享图标不是自动判错的证据。Google / Microsoft 母品牌在某些产品中辨识度不足，已在 A 的理由中注明优先产品标识；没有声称这些正常字形失效。Adobe Color / XD 第一阶段已改为有效语义字形，下一轮按 A 处理自身品牌需求，不算新的显示故障。其他 58 个现有图片没有本地证据足以认定品牌不准确，本轮不推测其官方版本是否最新。

## 9. 第三阶段分批建议

先选来源可信且 16px 可识别的资源，不按 fas 数量批量抓取，不自动用第三方 favicon 服务补齐。实际候选数量分配如下，均来自 A 清单，跨 placement 不重复：

1. 第一批：软件 / App 与常用协作产品，**24 个候选**。下表给出精确名单。它们尚没有已明确足够的专属品牌字体，应用小图标的识别收益较高。建议先核来源，再逐项本地化；Honeyview URL 为空，先核官方产品资产，不能为了取图修改资源 URL。实际补图成功数取决于来源和质量，可低于 24。
2. 第二批：其余 3D / 游戏制作 / AI / 开发 / 工作工具，**70 个候选**，拆成每轮 20–25 个。优先 AI 产品、云服务与开发工具；先确认 Trellis 3D 等 B 项身份，不混入本批。
3. 第三批：其余 A 级资料平台、社区、搜索 / 地图、素材 / 音乐与游戏服务品牌，**88 个候选**，再按实际常用程度拆批。D 中 PCGamingWiki、爱给网在对应批次优先复核；不追加重复需求。
4. 最后按需处理 B 的 **119 个可选项**；C 的 **96 个保持通用 / 内容语义**，不进入补图任务。A 中 **14 个已有合适品牌字体**单独延后，只有产品资产明确且识别更好时考虑图片化。D 的两个搜狐文章优先考虑语义标识，Superhive 是现图复核，不纳入新增图片配额。

A 的批次账目：24 + 70 + 88 + 14 = 196；前三批新增候选为 182，不是 362 或 411 个“必须补图”。这些是分析建议，未执行下载 / 替换。

### 建议第一批的 24 个实体

| resourceId | 名称 | 当前主要场景 | 建议形式 |
| --- | --- | --- | --- |
| res-ef0272e776f4 | Koodo Reader | 软件（software） / 阅读与学习 (software-reading-learning) | logo |
| res-af8ef348cd3d | MuseScore | 软件（software） / 音频与视频 (software-audio-video)；兼用于 音频与视频 / 音频制作工具 (section-2ef48c0866) | logo |
| res-5cc0e67257c0 | OBS Studio | 软件（software） / 音频与视频 (software-audio-video)；兼用于 音频与视频 / 视频工具 (section-ac0f75ea54) | logo |
| res-3b65565237c5 | Honeyview | 软件（software） / 图像与设计 (software-image-design) | logo |
| res-a3a2d6e482de | EarMaster | 软件（software） / 阅读与学习 (software-reading-learning)；兼用于 音乐 / 音乐学习 (section-934281eab5) | logo |
| res-b939645bed96 | Ableton Live | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | logo |
| res-75ae98f287b2 | REAPER | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | logo |
| res-d130cc2e9c59 | Audacity | 音频与视频（av） / 音频制作工具 (section-2ef48c0866)；兼用于 软件 / 音频与视频 (software-audio-video) | logo |
| res-1de799c618db | EA app | 游戏（games） / 游戏平台与商店 (section-eeefc8692f) | logo |
| res-b04d19f21678 | Notion | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-6faf8078bc3d | 腾讯文档 | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-104da187aeac | 石墨文档 | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-4a862f2654ef | 金山文档 | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-045262fdb9df | Google Docs | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-4f1bcebf4af3 | Microsoft 365 | 工作与协作（work） / 文档与笔记 (section-be853d7abe) | either |
| res-02a7cca093b2 | Sketch | 美术与设计（art） / 工具 (art-visual-tools) | either |
| res-9dbc2f574fa5 | Adobe XD | 美术与设计（art） / 工具 (art-visual-tools) | logo |
| res-5d8706949079 | Balsamiq | 美术与设计（art） / 工具 (art-visual-tools) | either |
| res-ee76fbba7792 | Canva | 美术与设计（art） / 工具 (art-visual-tools) | either |
| res-814cc8aa38db | ProtoPie | 美术与设计（art） / 工具 (art-visual-tools) | either |
| res-f056c4fec3a2 | Microsoft Teams | 工作与协作（work） / 沟通与会议 (work-communication) | logo |
| res-45d5192022e4 | 钉钉 | 工作与协作（work） / 沟通与会议 (work-communication) | either |
| res-0625bbe4ab49 | 企业微信 | 工作与协作（work） / 沟通与会议 (work-communication) | logo |
| res-976eeac66264 | Zoom | 工作与协作（work） / 沟通与会议 (work-communication) | either |

## 10. 验证与修改范围

- 新增文件仅 `docs/resource-icon-priority-audit.md`。
- `node scripts/validate.mjs`：PASS。entities 470、sources 498、mergedSources 11、views 20、legacyPages 14、activeURLs 463、confirmedCorrections 43、urlLessRecords 11、internalLinks 209 不变。
- `git diff --check`：PASS。
- 执行前保存全部既有项目文件 SHA-256，完成后逐项复核：所有既有文件字节不变，包括 catalog、navigation、CSS / JS、图标、历史 migration / corrections 与两份前置报告。
- 第一阶段 18 条 icon 新 class 与报告逐项精确比较：全部保持，16 个字形修复 / 2 个前缀修复未撤销。renderer slot / fallback 与 CSS 尺寸规则字节不变。
- A / B / C 清单共 411 个唯一 resourceId，准确覆盖当前全部无 iconImage 实体；主要 placement 来自现有 navigation。D 为 6 个 active IDs，不增加 catalog 数量，不重复计入图标缺失需求。
- 工作区原有的第一阶段改动和报告保持原样；本轮没有撤销、提交或覆盖这些既有内容。
- 没有下载图标、联网搜图、修改 CSS / JS / catalog / navigation、commit 或 push。
