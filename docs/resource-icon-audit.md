# AR Library 资源图标审计

日期：2026-10-09。范围：当前 main 正式项目；仅新增本报告。没有下载图标、修改运行文件或数据，没有 commit / push。

## 一、当前机制

`data/catalog.js` 的 `iconImage` 指定图片路径，`icon` 指定 Font Awesome class，`alt` 指定图片替代文本。`js/render-resources.js` 的 makeIcon 优先使用 iconImage，生成 `<img class="icon">`；否则生成 `<i>`，class 为 icon 或 `fas fa-link`。

当前混合使用本地 favicon / logo / 软件图标与 Font Awesome 通用、品牌字体图标。没有资源级远程 image URL、data URI、内联 SVG 或自动 favicon 服务。文件在 `assets/icons/`；旧 `data/resources/*` 保存历史来源图标引用，不是当前 catalog 的渲染入口。

没有字段时会使用 fa-link；图片加载失败没有 onerror fallback，也不会自动退回实体的 icon。字体 class 不存在时仍生成 i，却没有字形；没有相应校验或替换。resource-search 的 onerror 处理的是 catalog 脚本，不是图标。

CSS：图片 width / height 16px，object-fit contain，圆角 3px，flex-shrink 0，margin-top 1px。字体图标 min-width 16px、font-size 14px、margin-top 3px、flex-shrink 0，金棕色；没有固定 width / height 或统一 icon slot。主链接为 flex、gap 10px。所有宽度使用同一图片尺寸，没有手机缩小规则。

library / legacy 页面从 cdnjs 加载 Font Awesome 6.4.0，字体仍依赖外部网络；这属于远程字体依赖，不计为远程实体图片。页面 favicon 由 HTML 或 renderer 的 emoji data-SVG 生成，与资源卡 icon 分开。导航图标、首页装饰和 output/playwright 截图也不计入资源图标文件。

## 二、完整统计与口径

| 指标 | 数量 |
| --- | ---: |
| 当前 active catalog 实体 | 470 |
| 有 iconImage 或 icon 字段 | 470 |
| 两个字段都没有 | 0 |
| 本地图片型实体 | 59 |
| 不同本地图片引用路径 | 57 |
| 远程图片型实体 | 0 |
| Font Awesome 实际渲染路径实体 | 411 |
| 其中 fas 通用字体 | 361 |
| 其中 fab 品牌字体 | 50 |
| 其他实体图标类型 | 0 |
| 本地图标文件 | 61 |
| 未被 active catalog 引用的文件 | 4 |
| 未被任何当前/历史资源引用的图标文件 | 0 |
| 多个实体重复引用同一图片的组 | 2 |
| 已确认没有生成字形的实体 | 16 |
| 字体前缀错配，字形可用性待确认 | 2 |

字段存在不等于正常显示。“无专属图片”共有 411 个，其中 44 个已有可保留的品牌字体标识，不要求为它们强行补图片。严格按当前可用、合适的专属标识计，待补充/修复/确认的无图片实体为 367 个；附录 A 列出全部 411 个，避免漏项。未包含 retired entity。

重复图片：blender.ico 对应 res-3a9f5c96c220、res-b60e9fdc1539；gaea.ico 对应 res-5193234cd6bc、res-684127ed910a。它们是不同 active 实体共享同一图，不是文件重复保存。

4 个 active 未引用文件：555dy.ico、hdmoli.ico、libvio.png 对应旧影视来源；epic.ico 仍在旧 installation-software 来源中引用。保留历史追溯，本轮未清理。

## 三、文件质量

按扩展名：PNG 19、JPG 15、ICO 26、WebP 1；按实际解码：PNG 20、JPEG 19、ICO 22，实际 WebP / SVG / GIF 0。

61 个文件全部成功解码，没有破损文件；59 个 active 图片引用均存在，浏览器完成加载后无失败图片。当前没有远程图片，因此“远程实体图标失效”不适用；Font Awesome CDN 在本次浏览器中可用，但不能据此保证以后网络可用。

像素分布：48×48 共 31，32×32 共 20，16×16 共 4，30×30 共 1，24×24 共 2，60×60 共 1，39×40 共 1，64×64 共 1。全部文件有 23 个实际存在透明像素，其余 38 个为不透明。active 引用的 57 个文件全部正方形；仅未引用的 libvio.png 为 39×40。

没有超大文件或当前缩放拉伸。object-fit contain 避免比例拉伸和内容裁切，但图形自带留白、JPG 不透明底色及 3px 圆角会造成视觉面积不一致；例如 Google Earth、textures 的实心内容明显比外框小。圆角对贴边方形图案有轻微角部裁切风险。文件尺寸不同本身不构成替换理由。

16px 原始图片：blender.ico、languangdy.ico、textures.ico、youdaocidian.ico。Blender 文件被两个实体使用，因此涉及 5 个实体。1× 显示无需放大，2× 高密度屏幕可能不够细腻，建议后续人工复核，不能直接判为破损或必须替换。本轮未进行高 DPR 逐像素验收。

7 个扩展名与编码不符，建议后续整理容器/扩展名或重新编码，不是直接换品牌设计：
| 文件 | 扩展名 | 实际编码 |
| --- | --- | --- |
| assets/icons/4k1080.ico | ico | JPEG |
| assets/icons/csp.png | png | JPEG |
| assets/icons/huorong.jpg | jpg | PNG |
| assets/icons/leishen.ico | ico | JPEG |
| assets/icons/qq.webp | webp | JPEG |
| assets/icons/steam.ico | ico | JPEG |
| assets/icons/wechat.ico | ico | PNG |

同站不同表示：当前 Google 系列既有 google.ico 又有 fab fa-google；Wikipedia 有图片和字体，且另有错误 fas 前缀；Adobe Creative Cloud 为图片，Adobe Color / XD 的 fab fa-adobe 本次为空；Epic active 使用 epic-games.jpg，旧来源仍有 epic.ico。Blender / Gaea 两个 active 实体共享相同文件，版本一致；Blender Market 历史品牌图仍用于 Superhive，是否需要按品牌变更更新需下一轮官方标识核实。现有文件没有统一原始下载地址、版本、授权记录，不能仅凭文件名确认 logo 是最新官方版本。本轮没有外部品牌核验，也没有取得新素材。

## 四、空字形与品牌错配

真实浏览器遍历全部 20 view、三个 art domain，共 506 placements / 470 不同实体。以下 16 个实体 `::before content: none`，i 高度 0，当前只有预留宽度，没有图标；不是资源名丢失。

| resourceId | name | icon |
| --- | --- | --- |
| res-d08195ed9949 | BlenderBros的Gumroad | fas fa-brothers |
| res-0b621b7aa006 | 书生CG资源网 | fas fa-sky |
| res-5d9354f7cb0e | Chat GPT | fab fa-openai |
| res-b3d6087b0983 | zbrush central | fas fa-sculpture |
| res-f4a013f097d8 | List of Battle Rifles | fas fa-rifle |
| res-ded5d0b9adbe | List of Assault Rifles | fas fa-rifle |
| res-c5c5aa7eaf25 | AR15主页 | fas fa-rifle |
| res-fce4787393ff | Vikings | fas fa-helmet-battle |
| res-42e8acd0b6b6 | History of France | fas fa-tower-eiffel |
| res-a6f1dae2decd | Ancient Egypt | fas fa-pyramid |
| res-2093fb1cd899 | 4K影视 | fas fa-hd |
| res-b88617d2ae76 | adobe color | fab fa-adobe |
| res-b879287bf3b7 | 千图网 | fas fa-picture-o |
| res-e10a2d4fafe2 | 图品汇 | fas fa-photo |
| res-641b04a8fdc6 | 本墨字库 | fas fa-ink-pen |
| res-9dbc2f574fa5 | Adobe XD | fab fa-adobe |

另外：两条搜狐汉服文章使用 fab fa-sourcetree，标识与目标平台错配；PCGamingWiki 使用 Wikipedia 品牌标识，不能视为其专属标识。列为建议替换。爱给网的 fas fa-soundcloud、Gun Wiki 的 fas fa-wikipedia-w 有伪元素 content，但使用 Free 字体而非 Brands，且品牌语义也不匹配；不能仅凭 content 判断字形正常，列为无法确认，需要下一轮优先核对。

## 五、浏览器尺寸

使用正式文件的本机隔离测试服务，沿用已授权测试会话，正式 auth 文件不变。每个尺寸检查 software、art 概念设计、3D；包含 16 / 24 / 30 / 32 / 48 / 60 / 64px 原图、JPEG / PNG / ICO 和不同留白图形。

| 视口 | 图片显示 | 正常字体显示 | 横向溢出 |
| --- | --- | --- | --- |
| 1920×1080 | 16×16px | 高 14px，宽 16 / 17.5px | 无 |
| 1366×768 | 16×16px | 高 14px，宽 16 / 17.5px | 无 |
| 1024×768 | 16×16px | 高 14px，宽 16 / 17.5px | 无 |
| 768×1024 | 16×16px | 高 14px，宽 16 / 17.5px | 无 |
| 390×844 | 16×16px | 高 14px，宽 16 / 17.5px | 无 |

原图不同不影响图片外框尺寸；内在留白、透明与不透明背景影响主观图形大小。图片与字体尚未完全统一 slot，因此不能称为所有图标最终视觉面积一致。首次 DOM 读取时有图片尚在加载，后续完整核对均成功，不误记为坏图。没有通过改 CSS、注入新 icon 或下载图片来测试。

## 六、下一轮建议（未实施）

1. 优先修复 16 个空字形及 2 个前缀错配，再核对 3 个品牌错配。补专属图标不是先把所有通用图标都替换。
2. 保留当前图片 16px 显示，可建立统一 18–20px slot，图片最大 16px、contain；字体使用固定 slot、居中，避免 17.5px 宽度导致轻微对齐差异。具体 slot 先做少量浏览器验证，不修改 Grid。
3. 图片圆角建议 2–3px；透明轮廓 logo 可不裁圆角。不要把所有 logo 强制圆形，也不为已有正常图加底板。
4. 优先官方的小尺寸符号/应用图标，再用可辨认 favicon；不使用横向完整 wordmark 填 16px slot。有正常品牌字体时可保留，不必创建图片。
5. SVG 可保留并设置明确 viewBox；PNG 优先透明背景、32/48px 足够当前高密度需求；ICO 检查帧大小，可保留正常文件。仅对扩展名错配文件安排容器整理，不因格式混合而全面重做。
6. 无专属图标继续使用有效通用 fallback；img error 时建议切换到经过确认的通用图标，避免循环重试，并保留可访问名称。加载失败 fallback 与“该实体无资源 URL”要分开处理。
7. 当前无远程图片，没有批量本地化需求；若后续引入远程图，应逐项考虑稳定性、许可、来源和本地备份。Font Awesome CDN 是另一项依赖，可后续独立评估，不能称为当前远程 logo 失效。
8. 不改资源 URL，不批量调用第三方 favicon 服务，不自动替换已有正常图标。来源/授权不明的标识先核实，记录用途和来源，再决定补充。

## 七、最终分类（按实体，互斥）

分类以当前专属标识是否可用为主；通用图标仍可作为 fallback，不表示 346 个都应立即下载 logo。

| 分类 | 数量 | 口径 |
| --- | --- | --- |
| 可直接保留 | 52 | 52 个正常本地图片实体；尺寸差异本身不要求替换 |
| 仅需 CSS 规范化 | 44 | 44 个可用品牌字体实体；保留标识，只统一 slot |
| 建议替换现有图标 | 10 | 7 个图片编码/后缀整理 + 3 个品牌错配；图片不必重做视觉设计 |
| 缺失、需要补充 | 362 | 16 个空字形 + 346 个只有通用标识的实体；通用可保留作 fallback |
| 无法确认 | 2 | 2 个字体前缀与品牌错配实体 |

合计 470。52 个保留图片中，16px 原图仍需留意 DPR，品牌新旧与授权也未逐站认证；“保留”指本次文件与渲染质量通过，不代表外部品牌认证。

## 八、验证与范围

`node scripts/validate.mjs`：PASS。`git diff --check`：PASS。

正式指标不变：470 entities、498 sources、11 mergedSources、17 retired、20 views、463 activeURLs、11 NO_ACTIVE_URL、43 corrections、21 relatedResources edges、14 legacyPages、165 art mappings、209 internalLinks。

与开始时 SHA-256 快照比较，所有已有项目文件完全不变，仅新增本报告。没有下载、替换或删除图标，没有修改 catalog、navigation、renderer、CSS、auth 或历史记录。测试临时材料存放于系统临时目录，不加入项目；本机测试服务结束后停止。未 commit，未 push。

## 附录 A：全部无专属本地图片的 active 实体

包括已有品牌字体的 44 个可保留实体；“缺失”以第七节分类为准。URL 为空的仍列为无 URL，图标机制与 URL 是否存在独立。每个 placement 均来自正式 navigation，未列 retired。

| resourceId | name | URL | type | view / section | icon | 当前显示 | 分类 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| res-90bbea3931de | Blender Extension | https://extensions.blender.org/ | website | 3d / 手册与插件 (3d-manuals-plugins); extensions / 3D扩展与资源 (section-a14bf349ed) | fas fa-puzzle-piece | 通用字体 | 缺失、需要补充 |
| res-782ef7ee4731 | KIT OPS 2 Manual | https://docs.google.com/document/d/1rUzomyTi7ec2sFqeCgyVYgkbdnmVanlDCWYcvAzxOXE/edit | manual | 3d / 手册与插件 (3d-manuals-plugins); extensions / 3D扩展与资源 (section-a14bf349ed) | fas fa-book-open | 通用字体 | 缺失、需要补充 |
| res-0cca09db33fd | boxcutter手册 | https://boxcutter-manual.readthedocs.io/en/latest/ | manual | 3d / 手册与插件 (3d-manuals-plugins); extensions / 3D扩展与资源 (section-a14bf349ed) | fas fa-cube | 通用字体 | 缺失、需要补充 |
| res-76887030b7a3 | MESHmachine参考手册 | https://machin3.io/MESHmachine/docs/ | manual | 3d / 手册与插件 (3d-manuals-plugins); extensions / 3D扩展与资源 (section-a14bf349ed) | fas fa-cog | 通用字体 | 缺失、需要补充 |
| res-d9f8c92e89a4 | marvelous designer官方手册 | https://support.marvelousdesigner.com/hc/zh-cn/categories/360002390871 | manual | 3d / 手册与插件 (3d-manuals-plugins) | fas fa-tshirt | 通用字体 | 缺失、需要补充 |
| res-80dd5275c945 | Gumroad | https://app.gumroad.com/library | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-store | 通用字体 | 缺失、需要补充 |
| res-d08195ed9949 | BlenderBros的Gumroad | https://theblenderbros.gumroad.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-brothers | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-bda5cef98698 | Ponte的Smugmug个人主页 | https://ponte-ryuurui.smugmug.com/ | website | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-user | 通用字体 | 缺失、需要补充 |
| res-1151a8221b4f | BlenderBros主页 | https://www.blenderbros.com/ | tutorial | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-users | 通用字体 | 缺失、需要补充 |
| res-5154a7315483 | KitBash 3d | https://kitbash3d.com/collections | asset | 3d / 模型与素材 (section-7595af6cb3) | fas fa-cubes | 通用字体 | 缺失、需要补充 |
| res-d5902ad2cf83 | the gnomon workshop | https://www.thegnomonworkshop.com/ | website | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-chalkboard-teacher | 通用字体 | 缺失、需要补充 |
| res-f0d2b52d1ba5 | Live2D Cubism 手册 | https://docs.live2d.com/zh-CHS/cubism-editor-manual/top/ | manual | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-cc39e930a6d4 | Live2D Cubism官方教程 | https://docs.live2d.com/zh-CHS/cubism-editor-tutorials/top/ | tutorial | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-graduation-cap | 通用字体 | 缺失、需要补充 |
| res-c816da9bb133 | ninja | https://texture.ninja/ | asset | 3d / 材质与环境 (section-e5697c06bc) | fas fa-bolt | 通用字体 | 缺失、需要补充 |
| res-05a5769075d9 | ambientCG | https://ambientcg.com/ | asset | 3d / 材质与环境 (section-e5697c06bc) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-8089d1901b4f | Poly Haven | https://polyhaven.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-mountain | 通用字体 | 缺失、需要补充 |
| res-bb69c3a20418 | Poliigon | https://www.poliigon.com/ | asset | 3d / 材质与环境 (section-e5697c06bc) | fas fa-photo-video | 通用字体 | 缺失、需要补充 |
| res-d399abe2ed4f | free3d | https://free3d.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-cube | 通用字体 | 缺失、需要补充 |
| res-bfe28c897b52 | myminifactory | https://www.myminifactory.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-robot | 通用字体 | 缺失、需要补充 |
| res-ccafe101a1b7 | hdrlabs | — | asset | 3d / 材质与环境 (section-e5697c06bc) | fas fa-sun | 通用字体 | 缺失、需要补充 |
| res-ab76c716a489 | hdri skies | https://hdri-skies.com/ | asset | 3d / 材质与环境 (section-e5697c06bc) | fas fa-cloud-sun | 通用字体 | 缺失、需要补充 |
| res-bde5b2f24e5d | Mixamo | https://www.mixamo.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-running | 通用字体 | 缺失、需要补充 |
| res-7e8c70baf002 | cgtrader | https://www.cgtrader.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-shopping-cart | 通用字体 | 缺失、需要补充 |
| res-1fd1e7c5726d | Three D Scans | https://threedscans.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-monument | 通用字体 | 缺失、需要补充 |
| res-8d8eacb7c555 | blender魔酷网 | https://blender.kim/ | community | 3d / 教程与社区 (section-7b2b83d3fd); extensions / 3D扩展与资源 (section-a14bf349ed) | fas fa-magic | 通用字体 | 缺失、需要补充 |
| res-c9755226e683 | CG pepper | https://www.cgpepper.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-pepper-hot | 通用字体 | 缺失、需要补充 |
| res-297f934b6192 | modown魔顿 | http://www.modown.cn/ | asset | 3d / 模型与素材 (section-7595af6cb3) | fas fa-dungeon | 通用字体 | 缺失、需要补充 |
| res-d45d28a023c7 | CG模型网 | https://www.cgmodel.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-project-diagram | 通用字体 | 缺失、需要补充 |
| res-bd114f6473d7 | 画忆妙妙屋 | https://www.iiicg.com/ | community | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-paint-roller | 通用字体 | 缺失、需要补充 |
| res-4a16a898a2ea | 老子云 | https://www.laozicloud.com/ | website | 3d / 软件与工具 (section-09d0e478dd) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-0b621b7aa006 | 书生CG资源网 | https://c4dsky.com/ | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-sky | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-21fe07c8d7cc | Pixelsquid 3d | https://www.pixelsquid.com/ | asset | 3d / 模型与素材 (section-7595af6cb3) | fas fa-ship | 通用字体 | 缺失、需要补充 |
| res-a05767c5d3d9 | 斑斓中国 | https://www.blendercn.org/tag/%E6%96%91%E6%96%93%E4%B8%AD%E5%9B%BD | website | 3d / 模型与素材 (section-7595af6cb3) | fas fa-flag | 通用字体 | 缺失、需要补充 |
| res-e885d676a4c0 | aboutcg | https://www.aboutcg.com/ | community | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-comments | 通用字体 | 缺失、需要补充 |
| res-7f29fe2f7450 | 3dart | https://www.3dart.it/en/ | community | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-globe-europe | 通用字体 | 缺失、需要补充 |
| res-775603a1bbd3 | TapNow | https://app.tapnow.ai/#/home | website | ai / 综合创作工具 (ai-creative-tools) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-26f20a8185f8 | Lovart | https://www.lovart.ai/zh/home | website | ai / 综合创作工具 (ai-creative-tools) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-b9db5bd74bbc | Midjourney页面端 | https://www.midjourney.com/editor/new | website | ai / 视觉创作 (section-b68cbaf8ea) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-28b57dad1491 | 豆包 | https://www.doubao.com/chat/ | website | ai / 助手与问答 (section-49c6d515c3) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-110680f9c634 | 即梦 | https://jimeng.jianying.com/ai-tool/home | website | ai / 视觉创作 (section-b68cbaf8ea) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-9dd2ec745775 | Toolify | https://www.toolify.ai/zh/?ref=qinggongju.com | website | ai / AI 导航 (section-ed54d00238) | fas fa-tools | 通用字体 | 缺失、需要补充 |
| res-7ea330ae999c | Deepseek | https://chat.deepseek.com/ | website | ai / 助手与问答 (section-49c6d515c3) | fas fa-brain | 通用字体 | 缺失、需要补充 |
| res-5d9354f7cb0e | Chat GPT | https://chatgpt.com/ | website | ai / 助手与问答 (section-49c6d515c3) | fab fa-openai | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-380e7aa25639 | Google Gemini | https://gemini.google.com/app | website | ai / 助手与问答 (section-49c6d515c3) | fab fa-google | 品牌字体 | 仅需 CSS 规范化 |
| res-509d57a3ae8c | Suno | https://suno.com/create | website | ai / 音频、视频与3D生成 (section-d37654c45a) | fas fa-headphones | 通用字体 | 缺失、需要补充 |
| res-dcbda8c01446 | Runway | https://app.runwayml.com/login | website | ai / 音频、视频与3D生成 (section-d37654c45a) | fas fa-film | 通用字体 | 缺失、需要补充 |
| res-4c481d629823 | 腾讯混元3D | https://3d.hunyuan.tencent.com/ | website | ai / 音频、视频与3D生成 (section-d37654c45a) | fas fa-brain | 通用字体 | 缺失、需要补充 |
| res-be63b33b5fe5 | Tripo 3D | https://www.tripo3d.ai/zh | website | ai / 音频、视频与3D生成 (section-d37654c45a) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-0ea83479fc3f | Trellis 3D | https://trellis3d.net/ | website | ai / 音频、视频与3D生成 (section-d37654c45a) | fas fa-comment | 通用字体 | 缺失、需要补充 |
| res-7af19e673662 | midlibrary | https://midlibrary.io/ | website | ai / 图像资料与模型 (ai-image-resources) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-5b82b9bcfe4b | midjourney关键词大全 | https://github.com/willwulfken/MidJourney-Styles-and-Keywords-Reference | website | ai / 图像资料与模型 (ai-image-resources) | fab fa-github | 品牌字体 | 仅需 CSS 规范化 |
| res-d3dd2af510c9 | Prompt Hero | https://prompthero.com/ | website | ai / 图像资料与模型 (ai-image-resources) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-6474cdc40eb4 | midjourney 官方画廊 | https://www.midjourney.com/showcase | website | ai / 图像资料与模型 (ai-image-resources) | fas fa-images | 通用字体 | 缺失、需要补充 |
| res-f45842166d71 | civitai | https://civitai.com/ | website | ai / 图像资料与模型 (ai-image-resources) | fas fa-download | 通用字体 | 缺失、需要补充 |
| res-627b56ed27b3 | cg迷 | https://cgmi.com/ | tutorial | ai / 图像资料与模型 (ai-image-resources) | fas fa-users | 通用字体 | 缺失、需要补充 |
| res-bcb06b28c2f0 | 百度百科 | https://baike.baidu.com/ | website | research / 百科查询 (section-7d20fc2756) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-0b7a7096a961 | Flim | https://beta.flim.ai/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-film | 通用字体 | 缺失、需要补充 |
| res-fb263d5b862b | film-grab | https://film-grab.com/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-fde13a4c0113 | The Costumer's Guide to Movie Costumes | http://www.costumersguide.com/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-tshirt | 通用字体 | 缺失、需要补充 |
| res-54640836d0f0 | 电影拉片学院 | http://www.movieminer.top/# | website | art-study / 影视视觉学习 (section-9aee3b376d) | fas fa-clipboard-list | 通用字体 | 缺失、需要补充 |
| res-6813649c205c | 纪妖 | https://www.cbaigui.com/ | website | art / 综合参考 (art-concept-general) | fas fa-ghost | 通用字体 | 缺失、需要补充 |
| res-a774b5935e45 | this person does not exist | https://www.thispersondoesnotexist.com/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-robot | 通用字体 | 缺失、需要补充 |
| res-61dc9b2d49ae | 国家地理 | https://www.nationalgeographic.com/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-globe-americas | 通用字体 | 缺失、需要补充 |
| res-02896af45aba | proko解剖学专题页 | https://www.proko.com/course-lesson/anatomy-terms/notes | website | art-study / 人体与建筑学习 (section-19e0bd354a) | fas fa-user-md | 通用字体 | 缺失、需要补充 |
| res-394b5d8e9d91 | 古建枋类种类细分 | https://www.sohu.com/a/251016495_743882 | website | art-study / 人体与建筑学习 (section-19e0bd354a) | fas fa-landmark | 通用字体 | 缺失、需要补充 |
| res-4055a01a0592 | 有关榫卯，这里有最详细的介绍 | https://zhuanlan.zhihu.com/p/71813034 | website | art-study / 人体与建筑学习 (section-19e0bd354a) | fas fa-puzzle-piece | 通用字体 | 缺失、需要补充 |
| res-4b4e85f45762 | line-of-action | https://line-of-action.com/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-pencil-alt | 通用字体 | 缺失、需要补充 |
| res-0db5970773e1 | bodies in motion | https://www.bodiesinmotion.photo/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-running | 通用字体 | 缺失、需要补充 |
| res-32a9fd9b07e0 | reference angle | http://referenceangle.com/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-user | 通用字体 | 缺失、需要补充 |
| res-86babe512d3e | pose-search | https://x6ud.github.io/pose-search/#/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-aa2b4b5f0559 | character designs | https://www.characterdesigns.com/ | website | art / 人体参考 (art-concept-anatomy) | fas fa-users | 通用字体 | 缺失、需要补充 |
| res-39079fe88973 | skypixel | https://www.skypixel.com/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-camera | 通用字体 | 缺失、需要补充 |
| res-7578e2aad579 | art grid | https://artgrid.io/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-film | 通用字体 | 缺失、需要补充 |
| res-7d13d28fa9cf | A map and A lens | https://www.mapandlens.com/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-camera | 通用字体 | 缺失、需要补充 |
| res-52344ad21034 | Dylan cole | https://dylancolestudio.com/ | website | art / 艺术家与社区 (art-concept-artists) | fas fa-user | 通用字体 | 缺失、需要补充 |
| res-0dfbc334bf39 | 盘古的声音_站酷主页 | https://www.zcool.com.cn/u/16548136 | website | art / 艺术家与社区 (art-concept-artists) | fas fa-paint-brush | 通用字体 | 缺失、需要补充 |
| res-235c2d82268a | Art Of Soulburn | http://www.neilblevins.com/ | tutorial | art-study / CG教程 (section-516622023b) | fas fa-graduation-cap | 通用字体 | 缺失、需要补充 |
| res-7527bb42a283 | zpz 学员作品主页 | http://zpzdesign.artp.cc/works | website | art / 艺术家与社区 (art-concept-artists) | fas fa-users | 通用字体 | 缺失、需要补充 |
| res-25c223ccb970 | 阮佳个人信息网站 | https://www.ruanjia.com/ | website | art / 艺术家与社区 (art-concept-artists) | fas fa-crown | 通用字体 | 缺失、需要补充 |
| res-b3d6087b0983 | zbrush central | https://www.zbrushcentral.com/ | community | 3d / 教程与社区 (section-7b2b83d3fd) | fas fa-sculpture | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-45aed3cae03f | GGAC | https://www.ggac.com/v2/home | community | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-trophy | 通用字体 | 缺失、需要补充 |
| res-033f6c8c428e | concept art world | https://conceptartworld.com/ | community | art / 艺术家与社区 (art-concept-artists) | fas fa-globe | 通用字体 | 缺失、需要补充 |
| res-c72b7f01237d | lospec | https://lospec.com/ | community | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-dice | 通用字体 | 缺失、需要补充 |
| res-27a435bd6587 | MFD设计师导航 | https://www.mfchange.cn/index.html | website | art / 工具 (art-concept-tools) | fas fa-compass | 通用字体 | 缺失、需要补充 |
| res-cd65f492a506 | physicallybased | https://physicallybased.info/ | website | 3d / 材质与环境 (section-e5697c06bc) | fas fa-atom | 通用字体 | 缺失、需要补充 |
| res-58ed25568c4c | airpano | https://www.airpano.com/ | website | art / 影视与摄影参考 (art-concept-photo) | fas fa-globe | 通用字体 | 缺失、需要补充 |
| res-e437ff3fc9fd | silk | https://weavesilk.com/ | website | art / 工具 (art-concept-tools) | fas fa-paint-brush | 通用字体 | 缺失、需要补充 |
| res-44109899b435 | 大都会博物馆 | https://www.metmuseum.org/zh | website | art / 综合参考 (art-concept-general) | fas fa-landmark | 通用字体 | 缺失、需要补充 |
| res-3a34fe23f765 | Now Fashion | https://nowfashion.com/ | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-camera | 通用字体 | 缺失、需要补充 |
| res-cf907b73cd01 | Vogue | https://www.vogue.com.cn/ | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-star | 通用字体 | 缺失、需要补充 |
| res-08dc7ba6b85c | POP趋势服装 | http://www.pop-fashion.com/patterns/graphics/?pid=000535 | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-palette | 通用字体 | 缺失、需要补充 |
| res-9c6cf3eb527f | With A Wish | https://www.withawish.jp/tuxedo/index.cgi#search_box | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-user-tie | 通用字体 | 缺失、需要补充 |
| res-76a0ce3629cf | Long Coat | https://long-coat.uenoya.jp/ | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-vest | 通用字体 | 缺失、需要补充 |
| res-c9bf378b40f8 | Loux The Vintage Guru | https://louxthevintageguru.tumblr.com/tagged/loux | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-user | 通用字体 | 缺失、需要补充 |
| res-2eb2d7addd5a | Style Korea | https://stylekorea.tumblr.com/ | website | art / 现代时装 (art-reference-fashion-modern) | fas fa-flag | 通用字体 | 缺失、需要补充 |
| res-bf206b68f1c4 | Mark Cordory | https://markcordory.com/salvaged-ware-costumes | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-skull-crossbones | 通用字体 | 缺失、需要补充 |
| res-1aa2da8a9ba3 | Moritz Jendrl | http://moritz-jendrl.de/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-dumpster-fire | 通用字体 | 缺失、需要补充 |
| res-03fd01c04883 | Survival Game Fashion Snap | http://sg-fashion-snap.com/archives/category/men | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-vest-patches | 通用字体 | 缺失、需要补充 |
| res-b031b7c4504c | Lolita Wardrobe | https://www.lolitawardrobe.com/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-ribbon | 通用字体 | 缺失、需要补充 |
| res-6eab9925caf6 | Fantasmagoria | https://fantasmagoria.shop/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-moon | 通用字体 | 缺失、需要补充 |
| res-cb87182a0b47 | Atomic Jane Clothing | — | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-cogs | 通用字体 | 缺失、需要补充 |
| res-ec9023584483 | Myoppa | https://www.myoppa.fr/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-clock | 通用字体 | 缺失、需要补充 |
| res-f797e6c17691 | Yumeyakata | https://www.yumeyakata.com/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-kiwi-bird | 通用字体 | 缺失、需要补充 |
| res-932902626cde | Kimonomachi | https://www.kimonomachi.co.jp/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-fan | 通用字体 | 缺失、需要补充 |
| res-49d95c18e9f8 | Armstreet | https://armstreet.com/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-shield-alt | 通用字体 | 缺失、需要补充 |
| res-27c478e7516e | Vertugadins | https://www.vertugadins.com/location/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-history | 通用字体 | 缺失、需要补充 |
| res-c7675ccf7c83 | Recycled Movie Costumes | https://recycledmoviecostumes.tumblr.com/ | website | art / 风格与题材 (art-reference-fashion-style) | fas fa-recycle | 通用字体 | 缺失、需要补充 |
| res-87e754063973 | Kostym | https://www.kostym.cz/Anglicky/obsah.htm | website | art / 历史服装 (art-reference-fashion-history) | fas fa-globe-europe | 通用字体 | 缺失、需要补充 |
| res-715393f09ccc | Elizabethan Costume | http://www.elizabethancostume.net/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-crown | 通用字体 | 缺失、需要补充 |
| res-a1da8023cf1e | Larsdatter | http://www.larsdatter.com/18c/index.html | website | art / 历史服装 (art-reference-fashion-history) | fas fa-history | 通用字体 | 缺失、需要补充 |
| res-79f7ac7b595f | Photo Detective | http://www.photodetective.co.uk/Index.html | website | art / 历史服装 (art-reference-fashion-history) | fas fa-camera-retro | 通用字体 | 缺失、需要补充 |
| res-f460963fbf89 | Fashion Era | https://fashion-era.com/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-vest | 通用字体 | 缺失、需要补充 |
| res-1b50ec31dfbb | 维基百科-西方服饰史 | https://en.wikipedia.org/wiki/History_of_Western_fashion | website | art / 历史服装 (art-reference-fashion-history) | fab fa-wikipedia-w | 品牌字体 | 仅需 CSS 规范化 |
| res-d51a2e70753e | Colonial Williamsburg | https://emuseum.history.org/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-flag-usa | 通用字体 | 缺失、需要补充 |
| res-9ce348dc0699 | 京都服装学院 | https://www.kci.or.jp/en/archives/digital_archives/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-archive | 通用字体 | 缺失、需要补充 |
| res-c7a3c8b06568 | 历史时尚 | https://www.pinterest.com/thedreamstress/ | website | art / 历史服装 (art-reference-fashion-history) | fab fa-pinterest | 品牌字体 | 仅需 CSS 规范化 |
| res-0b66f5271259 | 欧洲区域时尚 | https://www.pinterest.com/WEuropeCostumes/ | website | art / 历史服装 (art-reference-fashion-history) | fab fa-pinterest | 品牌字体 | 仅需 CSS 规范化 |
| res-ead781650e6d | Stonefinder | https://www.pinterest.com/stonefinder/ | website | art / 设计资料 (art-reference-fashion-info) | fab fa-pinterest | 品牌字体 | 仅需 CSS 规范化 |
| res-4113ec1000d8 | 汉服荟商城 | https://m.hanfuhui.com/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-store | 通用字体 | 缺失、需要补充 |
| res-d243102ce959 | 中国汉服网 | https://www.weili.tv/ | website | art / 历史服装 (art-reference-fashion-history) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-2a37fce77ad9 | 汉服资料馆 | http://120.25.237.190/hanfu/index.html | website | art / 历史服装 (art-reference-fashion-history) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-82d0a79b3f2f | 10分钟带你了解西方服装史 | https://zhuanlan.zhihu.com/p/440541640 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-zhihu | 品牌字体 | 仅需 CSS 规范化 |
| res-b8761268a54b | 雅衿汉服社 汉服形制科普 | https://www.bilibili.com/read/cv8121944/ | website | art / 设计资料 (art-reference-fashion-info) | fab fa-bilibili | 品牌字体 | 仅需 CSS 规范化 |
| res-e7d6b67f4a2c | 古墓仙女汉服入门穿搭手册汇总大全 | https://www.sohu.com/a/546200817_121119316 | manual | art / 设计资料 (art-reference-fashion-info) | fab fa-sourcetree | 品牌字形，语义错配 | 建议替换现有图标 |
| res-5f0f40e1a52d | 说给汉服 微博主页 | https://weibo.com/u/5129313642 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-weibo | 品牌字体 | 仅需 CSS 规范化 |
| res-67e89602a928 | 知乎问题"汉服种类有哪些" | https://www.zhihu.com/question/47581644/answer/1790717469 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-zhihu | 品牌字体 | 仅需 CSS 规范化 |
| res-a474da8a7640 | 汉服裁剪图 知乎文章 | https://zhuanlan.zhihu.com/p/64626495 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-zhihu | 品牌字体 | 仅需 CSS 规范化 |
| res-7ee3b2d7a1da | 汉服制版\|男子汉服的分类及裁剪图整理 | https://www.bilibili.com/read/cv14535456 | tutorial | art / 设计资料 (art-reference-fashion-info) | fab fa-bilibili | 品牌字体 | 仅需 CSS 规范化 |
| res-6f7da3e25738 | 唐背子小科普 | https://www.bilibili.com/read/cv9899778 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-bilibili | 品牌字体 | 仅需 CSS 规范化 |
| res-f6712a9ddb32 | 科普 \| 被遗忘的传统——交窬裁剪的裙子 | https://www.sohu.com/a/301082591_612229 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-sourcetree | 品牌字形，语义错配 | 建议替换现有图标 |
| res-ce6dbf2a8d9b | 设计 \| 常见的汉服款式赏析 | https://zhuanlan.zhihu.com/p/426806809 | website | art / 设计资料 (art-reference-fashion-info) | fab fa-zhihu | 品牌字体 | 仅需 CSS 规范化 |
| res-813f7b8a45c2 | 阿虚同学的储物间 | https://axutongxue.com/ | website | daily / 资源导航 (section-21424f850e) | fas fa-user-graduate | 通用字体 | 缺失、需要补充 |
| res-9ae7811f88bd | 下次一定 | https://www.iiice.cn/#/ | website | daily / 资源导航 (section-21424f850e) | fas fa-hand-peace | 通用字体 | 缺失、需要补充 |
| res-b444131396c3 | 高校AC | https://www.gaoxiaoac.com/ | website | research / 学习资源导航 (section-2d02caa496) | fas fa-graduation-cap | 通用字体 | 缺失、需要补充 |
| res-5615a0332c05 | 图欧学习导航 | https://tuostudy.upnb.top/favorites/list/ | website | research / 学习资源导航 (section-2d02caa496) | fas fa-map | 通用字体 | 缺失、需要补充 |
| res-8cb46b50beea | 壳壳博客 | https://kkok.cc/ | website | daily / 资源导航 (section-21424f850e) | fas fa-blog | 通用字体 | 缺失、需要补充 |
| res-3c8892984c87 | 懒人导航网 | https://lanrenao.com/ | website | daily / 资源导航 (section-21424f850e) | fas fa-couch | 通用字体 | 缺失、需要补充 |
| res-ea7afc1c5a05 | 轻工具 | https://qinggongju.com/ | website | daily / 资源导航 (section-21424f850e) | fas fa-tools | 通用字体 | 缺失、需要补充 |
| res-c4ebbef96491 | 有道云笔记 | https://note.youdao.com/ | website | work / 文档与笔记 (section-be853d7abe) | fas fa-sticky-note | 通用字体 | 缺失、需要补充 |
| res-4e4286db6d55 | Sobooks | https://sobooks.cc/ | website | daily / 阅读与电子书 (section-05d844b301) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-0402234d84e7 | PDF Drive | https://www.pdfdrive.com/ | website | daily / 阅读与电子书 (section-05d844b301) | fas fa-file-pdf | 通用字体 | 缺失、需要补充 |
| res-3b751e75f487 | 苦瓜书盘 | https://www.kgbook.com/ | website | daily / 阅读与电子书 (section-05d844b301) | fas fa-lemon | 通用字体 | 缺失、需要补充 |
| res-82a3f65e65ad | 走读派 | http://www.zoudupai.com/ | community | daily / 阅读与电子书 (section-05d844b301) | fas fa-walking | 通用字体 | 缺失、需要补充 |
| res-4478f060c286 | 鸠摩搜索 | https://www.jiumodiary.com/ | website | daily / 阅读与电子书 (section-05d844b301) | fas fa-dove | 通用字体 | 缺失、需要补充 |
| res-6cf1e7e339ad | 书享家 | http://shuxiangjia.cn/ | website | daily / 阅读与电子书 (section-05d844b301) | fas fa-home | 通用字体 | 缺失、需要补充 |
| res-474cbb3dda56 | Kimi AI | https://www.kimi.com/ | website | ai / 助手与问答 (section-49c6d515c3) | fas fa-comment-alt | 通用字体 | 缺失、需要补充 |
| res-76fa496a4486 | Chat Doc | https://chatdoc.com/chatdoc/#/upload | website | ai / 助手与问答 (section-49c6d515c3) | fas fa-file-upload | 通用字体 | 缺失、需要补充 |
| res-c2af766ae055 | Wolfram\|Alpha | https://www.wolframalpha.com/ | website | ai / 助手与问答 (section-49c6d515c3) | fas fa-brain | 通用字体 | 缺失、需要补充 |
| res-f319d4efdf9b | 超能搜 | https://chaonengsou.com/ | website | daily / 网盘搜索 (section-6a17dd7980) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-bdeb3a9a419e | 大力盘搜索 | https://www.dalipan.com/ | website | daily / 网盘搜索 (section-6a17dd7980) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-ef5fe97e75de | 懒盘搜索 | https://www.lzpanx.com/ | website | daily / 网盘搜索 (section-6a17dd7980) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-36805b0d46a7 | 易搜 | https://yiso.fun/ | website | daily / 网盘搜索 (section-6a17dd7980) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-a4b6505f442c | 夸克盘搜 | https://qkpanso.com/ | website | daily / 网盘搜索 (section-6a17dd7980) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-6c78c06d318b | 谷歌云盘 | https://drive.google.com/drive | website | daily / 云存储 (section-5fd27e1f84) | fab fa-google-drive | 品牌字体 | 仅需 CSS 规范化 |
| res-71216ea7e989 | MEGA | https://mega.nz/ | website | daily / 云存储 (section-5fd27e1f84) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-f2c13ee8730d | 曲奇云盘 | https://quqi.com/ | website | daily / 云存储 (section-5fd27e1f84) | fas fa-cookie | 通用字体 | 缺失、需要补充 |
| res-51a9f53ce4dd | Outlook | https://outlook.live.com/ | website | daily / 邮箱服务 (section-13f59400a9) | fab fa-microsoft | 品牌字体 | 仅需 CSS 规范化 |
| res-6d2a0c0ae5e7 | 163邮箱 | https://mail.163.com/ | website | daily / 邮箱服务 (section-13f59400a9) | fas fa-envelope | 通用字体 | 缺失、需要补充 |
| res-3d3efba8821a | 126邮箱 | https://www.126.com/ | website | daily / 邮箱服务 (section-13f59400a9) | fas fa-envelope | 通用字体 | 缺失、需要补充 |
| res-81a9a6e98ebb | 网易见外工作台 | https://jianwai.youdao.com/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-language | 通用字体 | 缺失、需要补充 |
| res-542f49f089be | 相约久久地图 | https://www.meet99.com/map/ | website | daily / 地图 (section-c20026ba66) | fas fa-map-marked-alt | 通用字体 | 缺失、需要补充 |
| res-5c09ca7fe676 | OpenStreetMap | https://www.openstreetmap.org/#map=7/40.053/118.169/ | website | daily / 地图 (section-c20026ba66) | fas fa-map | 通用字体 | 缺失、需要补充 |
| res-d629f3ee517c | 民族语言 | https://www.ethnologue.com/ | website | research / 语言资料 (section-9d928232ff) | fas fa-globe-americas | 通用字体 | 缺失、需要补充 |
| res-baf622d2b50c | It's Adoorable | https://ncase.me/door/ | website | games / 互动小游戏 (section-83dc30996e) | fas fa-gamepad | 通用字体 | 缺失、需要补充 |
| res-7f6f481d8db6 | MDN Web Docs | https://developer.mozilla.org/zh-CN/ | manual | development / 文档与参考 (section-808be5a2c8) | fab fa-firefox-browser | 品牌字体 | 仅需 CSS 规范化 |
| res-42d61ff2d2d4 | W3Schools | https://www.w3schools.com/ | tutorial | code-study / 课程与学习路线 (section-24fa51cf93) | fas fa-school | 通用字体 | 缺失、需要补充 |
| res-3955ba862077 | JavaScript.info | https://javascript.info/ | website | code-study / 课程与学习路线 (section-24fa51cf93) | fab fa-js | 品牌字体 | 仅需 CSS 规范化 |
| res-75b69a6994ff | VS Code Docs | https://code.visualstudio.com/docs | manual | development / 文档与参考 (section-808be5a2c8) | fas fa-laptop-code | 通用字体 | 缺失、需要补充 |
| res-55afbb2bf7d5 | Git Documentation | https://git-scm.com/doc | manual | development / 代码与协作 (development-code-collaboration) | fab fa-git-alt | 品牌字体 | 仅需 CSS 规范化 |
| res-0fb5b5874dd8 | Vite | https://vite.dev/ | website | development / 开发工具与环境 (section-cac953817e) | fas fa-bolt | 通用字体 | 缺失、需要补充 |
| res-ddc6a11b6e06 | React Docs | https://react.dev/ | manual | development / 文档与参考 (section-808be5a2c8) | fab fa-react | 品牌字体 | 仅需 CSS 规范化 |
| res-0ee9368c2a94 | GitHub Pages | https://docs.github.com/pages | website | development / 云服务与部署 (section-6372255ca7) | fab fa-github | 品牌字体 | 仅需 CSS 规范化 |
| res-2b470a6bc853 | Vercel Docs | https://vercel.com/docs | manual | development / 云服务与部署 (section-6372255ca7) | fas fa-rocket | 通用字体 | 缺失、需要补充 |
| res-be67f9854221 | 阿里云 | https://www.aliyun.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-d9987c1cb6af | 腾讯云 | https://cloud.tencent.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-b4ee1ef99099 | 华为云 | https://www.huaweicloud.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-39a98e0d8503 | 火山引擎 | https://www.volcengine.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-a6ad87b96b6f | Cloudflare | https://www.cloudflare.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-shield-alt | 通用字体 | 缺失、需要补充 |
| res-41531850c10d | Supabase | https://supabase.com/ | website | development / 云服务与部署 (section-6372255ca7) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-b2d296a1e1aa | freeCodeCamp | https://www.freecodecamp.org/learn/ | tutorial | code-study / 课程与学习路线 (section-24fa51cf93) | fab fa-free-code-camp | 品牌字体 | 仅需 CSS 规范化 |
| res-cd9e0c222d3e | roadmap.sh | https://roadmap.sh/ | tutorial | code-study / 课程与学习路线 (section-24fa51cf93) | fas fa-map-signs | 通用字体 | 缺失、需要补充 |
| res-3952e3aaa8ca | Can I use | https://caniuse.com/ | website | development / 文档与参考 (section-808be5a2c8) | fas fa-check-circle | 通用字体 | 缺失、需要补充 |
| res-180019774646 | Stack Overflow | https://stackoverflow.com/ | community | development / 文档与参考 (section-808be5a2c8) | fab fa-stack-overflow | 品牌字体 | 仅需 CSS 规范化 |
| res-cc06f6877128 | Godot Docs官方手册 | https://docs.godotengine.org/zh-cn/4.x/ | manual | game-production / 引擎与文档 (section-a0c24de405) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-3efd77a9188c | Unity Manual | https://docs.unity3d.com/Manual/index.html | manual | game-production / 引擎与文档 (section-a0c24de405) | fas fa-cubes | 通用字体 | 缺失、需要补充 |
| res-03833110be8f | Unreal Engine Docs | https://dev.epicgames.com/documentation/en-us/unreal-engine | manual | game-production / 引擎与文档 (section-a0c24de405) | fas fa-cube | 通用字体 | 缺失、需要补充 |
| res-58a7cc13a78c | Machinations | https://machinations.io/ | website | game-production / 制作工具 (section-b38206fa8a) | fas fa-project-diagram | 通用字体 | 缺失、需要补充 |
| res-37ba40863c00 | Twine | https://twinery.org/ | website | game-production / 制作工具 (section-b38206fa8a) | fas fa-code-branch | 通用字体 | 缺失、需要补充 |
| res-6c425859ca19 | 即时设计 | https://js.design/workspace | website | game-production / 制作工具 (section-b38206fa8a) | fas fa-pen-fancy | 通用字体 | 缺失、需要补充 |
| res-84045aec8cf8 | GAME UI database | https://gameuidatabase.com/index.php | website | game-production / 设计参考 (section-d24ce72187) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-52fdc3546967 | Lospec Palette List | https://lospec.com/palettes/ | website | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-palette | 通用字体 | 缺失、需要补充 |
| res-a52cf5ddd10b | Freesound | https://freesound.org/ | asset | game-production / 音频资源 (section-31e53fc463); av / 音频素材 (section-6cbaf07749) | fas fa-music | 通用字体 | 缺失、需要补充 |
| res-d7eb5223b94b | Artlist | https://artlist.io/ | asset | game-production / 音频资源 (section-31e53fc463); av / 音频素材 (section-6cbaf07749) | fas fa-headphones | 通用字体 | 缺失、需要补充 |
| res-081fc086a730 | Sonniss GameAudioGDC | https://sonniss.com/gameaudiogdc/ | website | game-production / 音频资源 (section-31e53fc463); av / 音频素材 (section-6cbaf07749) | fas fa-archive | 通用字体 | 缺失、需要补充 |
| res-b2d8bb124ac1 | 爱给网_音效配乐 | https://www.aigei.com/?msclkid=957ac64ddf3a18901fedaea0088c1876 | asset | game-production / 音频资源 (section-31e53fc463); av / 音频素材 (section-6cbaf07749) | fas fa-soundcloud | 有content，字体/品牌待确认 | 无法确认 |
| res-303180e4f360 | OpenGameArt | https://opengameart.org/ | asset | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-icons | 通用字体 | 缺失、需要补充 |
| res-4936c36df3f4 | jsfxr | https://sfxr.me/ | website | game-production / 制作工具 (section-b38206fa8a); av / 音频制作工具 (section-2ef48c0866) | fas fa-wave-square | 通用字体 | 缺失、需要补充 |
| res-9f9c9e89ce78 | FMOD | https://www.fmod.com/ | website | game-production / 制作工具 (section-b38206fa8a); av / 音频制作工具 (section-2ef48c0866) | fas fa-broadcast-tower | 通用字体 | 缺失、需要补充 |
| res-b16c19af17c2 | MDA Framework | https://aaai.org/papers/ws04-04-001-mda-a-formal-approach-to-game-design-and-game-research/ | tutorial | game-study / 理论与案例 (section-daeccf0507) | fas fa-layer-group | 通用字体 | 缺失、需要补充 |
| res-e0c94b39760f | The Door Problem | https://igda.org/resources-archive/the-door-problem-2014/ | tutorial | game-study / 理论与案例 (section-daeccf0507) | fas fa-door-open | 通用字体 | 缺失、需要补充 |
| res-236a4d1c98b8 | GDKeys | https://gdkeys.com/ | website | game-study / 理论与案例 (section-daeccf0507) | fas fa-key | 通用字体 | 缺失、需要补充 |
| res-a9b31743b222 | Game Developer - Design | https://www.gamedeveloper.com/design | website | game-study / 理论与案例 (section-daeccf0507) | fas fa-newspaper | 通用字体 | 缺失、需要补充 |
| res-d8c1e419c331 | itch.io Game Assets | https://itch.io/game-assets | asset | game-production / 美术、动画与素材 (section-b104ccd299) | fab fa-itch-io | 品牌字体 | 仅需 CSS 规范化 |
| res-60c0a0f7b942 | GDC Vault Free | https://gdcvault.com/free/all | website | game-study / 理论与案例 (section-daeccf0507) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-8c3e98efb927 | Kenney Assets | https://kenney.nl/assets | asset | game-production / 美术、动画与素材 (section-b104ccd299) | fas fa-box-open | 通用字体 | 缺失、需要补充 |
| res-4deb1157cc83 | Xbox Accessibility Guidelines | https://learn.microsoft.com/en-gb/gaming/accessibility/guidelines | manual | game-production / 设计参考 (section-d24ce72187) | fas fa-universal-access | 通用字体 | 缺失、需要补充 |
| res-597e0d6992d2 | 游民星空 | https://www.gamersky.com/ | website | games / 资讯与攻略 (section-5d31a6621a) | fas fa-star | 通用字体 | 缺失、需要补充 |
| res-a279f861f6aa | 游侠攻略 | https://gl.ali213.net/ | website | games / 资讯与攻略 (section-5d31a6621a) | fas fa-map | 通用字体 | 缺失、需要补充 |
| res-0c78ece82080 | 3DM | https://www.3dmgame.com/ | website | games / 游戏下载 (section-37d34e19d0) | fas fa-gamepad | 通用字体 | 缺失、需要补充 |
| res-07c130430e1c | IGN中国 | https://www.ign.com.cn/ | website | games / 资讯与攻略 (section-5d31a6621a) | fas fa-newspaper | 通用字体 | 缺失、需要补充 |
| res-0b2c7e6d8348 | 其乐Keylol | https://keylol.com/ | community | games / 玩家社区 (section-ae6f740e25) | fas fa-key | 通用字体 | 缺失、需要补充 |
| res-27a56307e731 | NGA玩家社区 | https://ngabbs.com/ | community | games / 玩家社区 (section-ae6f740e25) | fas fa-comments | 通用字体 | 缺失、需要补充 |
| res-c619a3f5aaaa | 3DM MOD站 | https://mod.3dmgame.com/ | website | games / MOD 与补丁 (section-98fd3830f5) | fas fa-download | 通用字体 | 缺失、需要补充 |
| res-f4bcc11a5817 | 游侠补丁 | https://patch.ali213.net/ | website | games / MOD 与补丁 (section-98fd3830f5) | fas fa-wrench | 通用字体 | 缺失、需要补充 |
| res-39d5fb06b8f9 | Nexus Mods | https://www.nexusmods.com/ | website | games / MOD 与补丁 (section-98fd3830f5) | fas fa-globe | 通用字体 | 缺失、需要补充 |
| res-6573c42d45b0 | Mod DB | https://www.moddb.com/ | community | games / MOD 与补丁 (section-98fd3830f5) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-b05a90020690 | Steam创意工坊 | https://steamcommunity.com/workshop/ | website | games / MOD 与补丁 (section-98fd3830f5) | fab fa-steam | 品牌字体 | 仅需 CSS 规范化 |
| res-1de799c618db | EA app | https://www.ea.com/games/library/pc-download | website | games / 游戏平台与商店 (section-eeefc8692f) | fas fa-gamepad | 通用字体 | 缺失、需要补充 |
| res-5f8a223f9113 | Xbox | https://www.xbox.com/zh-CN | website | games / 游戏平台与商店 (section-eeefc8692f) | fab fa-xbox | 品牌字体 | 仅需 CSS 规范化 |
| res-2a3e5c56f461 | SteamPY | https://steampy.com/home | website | games / 购买与优惠 (section-27f74da05e) | fas fa-shopping-basket | 通用字体 | 缺失、需要补充 |
| res-f7478d75cebd | CDKEY No Gap | https://www.cdkeynogap.com/ | website | games / 购买与优惠 (section-27f74da05e) | fas fa-key | 通用字体 | 缺失、需要补充 |
| res-7292d666d261 | Humble Bundle | https://www.humblebundle.com/ | website | games / 购买与优惠 (section-27f74da05e) | fas fa-gift | 通用字体 | 缺失、需要补充 |
| res-c7fcd660aca2 | Fanatical | https://www.fanatical.com/ | website | games / 购买与优惠 (section-27f74da05e) | fas fa-tags | 通用字体 | 缺失、需要补充 |
| res-090783dfb634 | IsThereAnyDeal | https://isthereanydeal.com/ | website | games / 购买与优惠 (section-27f74da05e) | fas fa-percentage | 通用字体 | 缺失、需要补充 |
| res-904869b055cb | Steam Database | https://steamdb.info/ | website | games / 资料与查询 (section-2395c32fb8) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-5c6453057fed | HowLongToBeat | https://howlongtobeat.com/ | website | games / 资料与查询 (section-2395c32fb8) | fas fa-clock | 通用字体 | 缺失、需要补充 |
| res-c93e7faa4f75 | OpenCritic | https://opencritic.com/ | website | games / 资料与查询 (section-2395c32fb8) | fas fa-star-half-alt | 通用字体 | 缺失、需要补充 |
| res-08761e40b186 | Metacritic | https://www.metacritic.com/ | website | games / 资料与查询 (section-2395c32fb8) | fas fa-chart-bar | 通用字体 | 缺失、需要补充 |
| res-751a6d512a90 | PCGamingWiki | https://www.pcgamingwiki.com/wiki/Home | website | games / 资料与查询 (section-2395c32fb8); system / 运行与故障排查 (section-7d28f65d55) | fab fa-wikipedia-w | 品牌字形，语义错配 | 建议替换现有图标 |
| res-65ab42fdd087 | Sig Sauer | https://www.sigsauer.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-industry | 通用字体 | 缺失、需要补充 |
| res-e6f113d5afab | ISSC | https://issc.at/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-industry | 通用字体 | 缺失、需要补充 |
| res-2a5f7d3627d0 | FN America | https://fnamerica.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-industry | 通用字体 | 缺失、需要补充 |
| res-746ee1817749 | Colt | https://www.colt.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-industry | 通用字体 | 缺失、需要补充 |
| res-d721510b784c | Vortex Optics | https://vortexoptics.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-crosshairs | 通用字体 | 缺失、需要补充 |
| res-e9e7580285f5 | SureFire | https://www.surefire.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-lightbulb | 通用字体 | 缺失、需要补充 |
| res-04b9f502b7ab | Trijicon | https://www.trijicon.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-eye | 通用字体 | 缺失、需要补充 |
| res-f2af732624c1 | Taran Tactical Innovations | https://tarantacticalinnovations.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-tools | 通用字体 | 缺失、需要补充 |
| res-b9e68d5f6c1c | Uberti | https://www.uberti-usa.com/ | website | art / 品牌与官方 (art-reference-weapons-official) | fas fa-history | 通用字体 | 缺失、需要补充 |
| res-f135808dde68 | Gun 枪列表 | https://en.wikipedia.org/wiki/Gun | website | art / 社区与资料库 (art-reference-weapons-community) | fab fa-wikipedia-w | 品牌字体 | 仅需 CSS 规范化 |
| res-f4a013f097d8 | List of Battle Rifles | https://en.wikipedia.org/wiki/List_of_battle_rifles | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-rifle | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-ded5d0b9adbe | List of Assault Rifles | https://en.wikipedia.org/wiki/List_of_assault_rifles | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-rifle | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-f957875f92c4 | List of Sniper Rifles | https://en.wikipedia.org/wiki/List_of_sniper_rifles | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-crosshairs | 通用字体 | 缺失、需要补充 |
| res-b7daea6f06a3 | List of Pistols | https://en.wikipedia.org/wiki/List_of_pistols | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-gun | 通用字体 | 缺失、需要补充 |
| res-bb6a125db9fb | Table of Handgun and Rifle Cartridges | https://en.wikipedia.org/wiki/Table_of_handgun_and_rifle_cartridges | website | art / 弹药 (art-reference-weapons-ammo) | fas fa-table | 通用字体 | 缺失、需要补充 |
| res-4ef1ad0a8dd9 | List of Handgun Cartridges | https://en.wikipedia.org/wiki/List_of_handgun_cartridges | website | art / 弹药 (art-reference-weapons-ammo) | fas fa-list | 通用字体 | 缺失、需要补充 |
| res-57cb1faa91ba | Category: Firearm Components | https://en.wikipedia.org/wiki/Category:Firearm_components | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-puzzle-piece | 通用字体 | 缺失、需要补充 |
| res-573ca95f163d | List of Telescope Parts and Construction | https://en.wikipedia.org/wiki/List_of_telescope_parts_and_construction | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-binoculars | 通用字体 | 缺失、需要补充 |
| res-4fd2f2cdaae2 | Category: Firearm Actions | https://en.wikipedia.org/wiki/Category:Firearm_actions | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-bolt | 通用字体 | 缺失、需要补充 |
| res-620ca2bf3949 | Rail Integration System | https://en.wikipedia.org/wiki/Rail_Integration_System | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-sliders-h | 通用字体 | 缺失、需要补充 |
| res-39a2bb0fa0f4 | Glossary of Firearms Terms | https://en.wikipedia.org/wiki/Glossary_of_firearms_terms | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-b1a3289aa752 | 枪炮世界 | http://pewpewpew.work/index.htm | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-globe-asia | 通用字体 | 缺失、需要补充 |
| res-09d2dba8da06 | 战甲军品赏析 | https://www.junpin360.com/ | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-shield-alt | 通用字体 | 缺失、需要补充 |
| res-5cfc76476aaa | 火器百科 | https://huoqibaike.club/wiki/%E9%A6%96%E9%A1%B5 | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-fire | 通用字体 | 缺失、需要补充 |
| res-b9d6ede0d910 | 武器列表 - Britannica | https://www.britannica.com/topic/list-of-weapons-2058724 | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-book-open | 通用字体 | 缺失、需要补充 |
| res-ac7bbceb6bb9 | Popular Mechanics | https://www.popularmechanics.com/ | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-newspaper | 通用字体 | 缺失、需要补充 |
| res-8256b3e5c3e7 | Tactical Weapons | https://rct66.tumblr.com/ | website | art / 社区与资料库 (art-reference-weapons-community) | fab fa-tumblr | 品牌字体 | 仅需 CSS 规范化 |
| res-c4790a17734a | Modern Firearms | https://modernfirearms.net/en/ | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-c5c5aa7eaf25 | AR15主页 | https://www.ar15.com/ | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-rifle | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-1762b13a7dc3 | US Militaria Forum | https://www.usmilitariaforum.com/forums/index.php | community | art / 社区与资料库 (art-reference-weapons-community) | fas fa-comments | 通用字体 | 缺失、需要补充 |
| res-98adcb92e001 | United Nations Office on Drugs and Crime | https://www.unodc.org/e4j/en/firearms/module-2/key-issues/firearms-parts-and-components.html | website | art / 结构与术语 (art-reference-weapons-structure) | fas fa-university | 通用字体 | 缺失、需要补充 |
| res-8a62522127b6 | C&Rsenal | https://candrsenal.com/primer-gallery/ | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-museum | 通用字体 | 缺失、需要补充 |
| res-97cbe37bc82d | Gun Wiki | https://guns.fandom.com/wiki/Main_Page | website | art / 社区与资料库 (art-reference-weapons-community) | fas fa-wikipedia-w | 有content，字体/品牌待确认 | 无法确认 |
| res-24f30e6bf287 | Gunworld | https://www.gunworld.com.au/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-store | 通用字体 | 缺失、需要补充 |
| res-37e9e312f716 | Academy 枪支分页 | https://www.academy.com/c/outdoors/shooting/firearms | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-store | 通用字体 | 缺失、需要补充 |
| res-ac0c83865452 | Gun Broker | https://www.gunbroker.com/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-gavel | 通用字体 | 缺失、需要补充 |
| res-674631b6016a | Hoff Gun | https://hoffgun.com/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-store | 通用字体 | 缺失、需要补充 |
| res-1a2c53afbdba | House of Guns | https://houseofguns.pl/en/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-gavel | 通用字体 | 缺失、需要补充 |
| res-83571c690a84 | Only Airsoft | https://www.onlyairsoft.com/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-gamepad | 通用字体 | 缺失、需要补充 |
| res-7e9b51a1f805 | Rock Island Auction | https://www.rockislandauction.com/ | website | art / 商城与拍卖参考 (art-reference-weapons-market) | fas fa-gavel | 通用字体 | 缺失、需要补充 |
| res-f1f736c6c199 | 谷歌地图 | https://www.google.com/maps/ | website | daily / 地图 (section-c20026ba66) | fab fa-google | 品牌字体 | 仅需 CSS 规范化 |
| res-8a5ad8ede2e1 | 历史地图（全历史） | https://www.allhistory.com/map | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-globe-asia | 通用字体 | 缺失、需要补充 |
| res-59d18d3be24a | 国学导航－中国历史地图集 | http://www.guoxue123.com/other/map/zgmap/ | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-map-marked-alt | 通用字体 | 缺失、需要补充 |
| res-df82b0297031 | 地图窝 中国历史地图 | http://www.onegreen.net/maps/List/List_787.html | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-layer-group | 通用字体 | 缺失、需要补充 |
| res-362623d636fc | 世界历史地图 | — | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-globe | 通用字体 | 缺失、需要补充 |
| res-29b208b30ff4 | 中国古代史地图 | https://home.olemiss.edu/~gg/hstrymap/lishidit.htm | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-landmark | 通用字体 | 缺失、需要补充 |
| res-0da4e59569c4 | 观沧海 | https://www.ageeye.cn/ | website | art / 工具 (art-visual-tools) | fas fa-eye | 通用字体 | 缺失、需要补充 |
| res-9936eee67cba | Old Maps Online | https://www.oldmapsonline.org/ | website | history / 地图与历史可视化 (section-69324106cd) | fas fa-scroll | 通用字体 | 缺失、需要补充 |
| res-dc7d34fff586 | Library of Congress | https://www.loc.gov/ | website | history / 资料与馆藏 (section-7946c9a0ab) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-33669263358e | 知乎文章：历史爱好者福利 | https://zhuanlan.zhihu.com/p/25658582 | website | history / 地图与历史可视化 (section-69324106cd) | fab fa-zhihu | 品牌字体 | 仅需 CSS 规范化 |
| res-64ef3d7e03d5 | AmCharts像素图生成器 | http://pixelmap.amcharts.com/# | website | art / 工具 (art-visual-tools) | fas fa-drafting-compass | 通用字体 | 缺失、需要补充 |
| res-a69a9e6403ca | Category: History | https://en.wikipedia.org/wiki/Category:History | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-tags | 通用字体 | 缺失、需要补充 |
| res-e50118dbd004 | Category: Regions | https://en.wikipedia.org/wiki/Category:Regions | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-map-pin | 通用字体 | 缺失、需要补充 |
| res-a9448363a385 | Category: History by Ethnic Group | https://en.wikipedia.org/wiki/Category:History_by_ethnic_group | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-users | 通用字体 | 缺失、需要补充 |
| res-83e60682465b | Category: History by Location | https://en.wikipedia.org/wiki/Category:History_by_location | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-map-marker-alt | 通用字体 | 缺失、需要补充 |
| res-26db60028f7d | Human History | https://en.wikipedia.org/wiki/Human_history | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-user-friends | 通用字体 | 缺失、需要补充 |
| res-490b867ae53f | History of England | https://en.wikipedia.org/wiki/History_of_England | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-crown | 通用字体 | 缺失、需要补充 |
| res-fce4787393ff | Vikings | https://en.wikipedia.org/wiki/Vikings | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-helmet-battle | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-42e8acd0b6b6 | History of France | https://en.wikipedia.org/wiki/History_of_France | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-tower-eiffel | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-04ccde1c97ee | History of Germany | https://en.wikipedia.org/wiki/History_of_Germany | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-landmark | 通用字体 | 缺失、需要补充 |
| res-fef2c5cffb67 | Ancient Greece | https://en.wikipedia.org/wiki/Ancient_Greece | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-columns | 通用字体 | 缺失、需要补充 |
| res-c36f7ac645fa | Ancient Rome | https://en.wikipedia.org/wiki/Ancient_Rome | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-archway | 通用字体 | 缺失、需要补充 |
| res-ad625dc4781b | Byzantine Empire | https://en.wikipedia.org/wiki/Byzantine_Empire | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-church | 通用字体 | 缺失、需要补充 |
| res-ec3ef8eaed78 | History of Italy | https://en.wikipedia.org/wiki/History_of_Italy | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-pizza-slice | 通用字体 | 缺失、需要补充 |
| res-7ef042574726 | Crusades | https://en.wikipedia.org/wiki/Crusades | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-cross | 通用字体 | 缺失、需要补充 |
| res-a6f1dae2decd | Ancient Egypt | https://en.wikipedia.org/wiki/Ancient_Egypt | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-pyramid | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-445c76b4243c | History of the Middle East | https://en.wikipedia.org/wiki/History_of_the_Middle_East | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-mosque | 通用字体 | 缺失、需要补充 |
| res-4a613a2c251e | History of the United States | https://en.wikipedia.org/wiki/History_of_the_United_States | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-flag-usa | 通用字体 | 缺失、需要补充 |
| res-9526c09484d9 | History of China | https://en.wikipedia.org/wiki/History_of_China | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-dragon | 通用字体 | 缺失、需要补充 |
| res-f99220ed7088 | History of Japan | https://en.wikipedia.org/wiki/History_of_Japan | website | history / 历史主题与百科 (section-a2c1857991) | fas fa-torii-gate | 通用字体 | 缺失、需要补充 |
| res-664260a4c584 | 全历史 | https://www.allhistory.com/ | website | history / 学习与内容 (section-746159982e) | fas fa-history | 通用字体 | 缺失、需要补充 |
| res-e2d4099d5637 | Khan Academy World History | https://www.khanacademy.org/humanities/world-history | tutorial | history / 学习与内容 (section-746159982e) | fas fa-chalkboard-teacher | 通用字体 | 缺失、需要补充 |
| res-c03a94b59c8a | History Channel | https://www.history.com/ | website | history / 学习与内容 (section-746159982e) | fas fa-tv | 通用字体 | 缺失、需要补充 |
| res-d49532172dad | Encyclopedia Britannica | https://www.britannica.com/ | website | history / 学习与内容 (section-746159982e) | fas fa-book-open | 通用字体 | 缺失、需要补充 |
| res-1f258605e5e0 | National Geographic History | https://www.nationalgeographic.com/history/ | website | history / 学习与内容 (section-746159982e) | fas fa-camera | 通用字体 | 缺失、需要补充 |
| res-ef0272e776f4 | Koodo Reader | https://www.koodoreader.com/zh | software | software / 阅读与学习 (software-reading-learning) | fas fa-tablet-alt | 通用字体 | 缺失、需要补充 |
| res-af8ef348cd3d | MuseScore | https://musescore.org/zh-hant | software | av / 音频制作工具 (section-2ef48c0866); software / 音频与视频 (software-audio-video) | fas fa-music | 通用字体 | 缺失、需要补充 |
| res-5cc0e67257c0 | OBS Studio | https://obsproject.com/ | software | av / 视频工具 (section-ac0f75ea54); software / 音频与视频 (software-audio-video) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-3b65565237c5 | Honeyview | — | software | software / 图像与设计 (software-image-design) | fas fa-image | 通用字体 | 缺失、需要补充 |
| res-de194ed9757b | MacPedia | https://macpedia.xyz/ | website | software / 系统与软件管理 (software-system-management) | fas fa-info-circle | 通用字体 | 缺失、需要补充 |
| res-45c2a24b25b0 | 热播之家 | https://rebozj.pro/ | website | film / 影视在线 (section-ac085ab313) | fas fa-fire | 通用字体 | 缺失、需要补充 |
| res-0310c06e735b | 网飞猫 | https://www.ncat22.com/ | website | film / 影视在线 (section-ac085ab313) | fas fa-cat | 通用字体 | 缺失、需要补充 |
| res-2093fb1cd899 | 4K影视 | https://www.4kvm.tv/ | website | film / 影视在线 (section-ac085ab313) | fas fa-hd | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-bee702507606 | 影猫的仓库 | https://ymck.pro/ | website | film / 聚合搜索 (section-576e244e9a) | fas fa-cat | 通用字体 | 缺失、需要补充 |
| res-2a683257703e | Color Claim | https://access.mymind.com/colors | website | art / 配色 (art-visual-color) | fas fa-swatchbook | 通用字体 | 缺失、需要补充 |
| res-1c0d2a644fd8 | 中国色 | https://zhongguose.com/#danshuhong | website | art / 配色 (art-visual-color) | fas fa-flag | 通用字体 | 缺失、需要补充 |
| res-d8d0fc3e57b4 | colorleap | https://colorleap.app/home | website | art / 配色 (art-visual-color) | fas fa-history | 通用字体 | 缺失、需要补充 |
| res-1a40669e664e | coolors | https://coolors.co/palettes/trending | website | art / 配色 (art-visual-color) | fas fa-palette | 通用字体 | 缺失、需要补充 |
| res-b2aeb96d5fed | color hunt | https://colorhunt.co/ | website | art / 配色 (art-visual-color) | fas fa-search | 通用字体 | 缺失、需要补充 |
| res-e0d01eb76f90 | icolorpalette | https://icolorpalette.com/ | website | art / 配色 (art-visual-color) | fas fa-clipboard-list | 通用字体 | 缺失、需要补充 |
| res-6388941b003d | uigradients | https://uigradients.com/#Pizelex | website | art / 配色 (art-visual-color) | fas fa-fill-drip | 通用字体 | 缺失、需要补充 |
| res-8e7240816e12 | web gradients | https://webgradients.com/ | website | art / 配色 (art-visual-color) | fas fa-cloud | 通用字体 | 缺失、需要补充 |
| res-155b3664b795 | color supplyy | https://colorsupplyyy.com/app | website | art / 配色 (art-visual-color) | fas fa-tools | 通用字体 | 缺失、需要补充 |
| res-b88617d2ae76 | adobe color | https://color.adobe.com/zh/create/color-wheel | website | art / 配色 (art-visual-color) | fab fa-adobe | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-0a4f4e0368f6 | colourcode | https://www.toptal.com/designers/colourcode | website | art / 配色 (art-visual-color) | fas fa-code | 通用字体 | 缺失、需要补充 |
| res-5c2cba66c115 | Artchips艺术碎片 | https://artchips.art/ | website | art / 工具 (art-visual-tools) | fas fa-puzzle-piece | 通用字体 | 缺失、需要补充 |
| res-d448463af2da | Duotone by ShapeFactory | https://duotone.shapefactory.co/?f=3f7b8d&t=23183e&q=_ | website | art / 工具 (art-visual-tools) | fas fa-adjust | 通用字体 | 缺失、需要补充 |
| res-c9e943cc2f82 | soundsnap | https://www.soundsnap.com/ | asset | av / 音频素材 (section-6cbaf07749) | fas fa-music | 通用字体 | 缺失、需要补充 |
| res-a06c0089142a | 我图网 | https://www.ooopic.com/ | asset | art / 图形与素材 (art-visual-assets) | fas fa-image | 通用字体 | 缺失、需要补充 |
| res-b879287bf3b7 | 千图网 | https://www.58pic.com/ | asset | art / 图形与素材 (art-visual-assets) | fas fa-picture-o | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-931a52adccb3 | 千库网 | https://588ku.com/ | asset | art / 图形与素材 (art-visual-assets) | fas fa-database | 通用字体 | 缺失、需要补充 |
| res-76efe492afd9 | 包图网 | https://ibaotu.com/ | asset | art / 图形与素材 (art-visual-assets) | fas fa-box | 通用字体 | 缺失、需要补充 |
| res-e10a2d4fafe2 | 图品汇 | https://www.88tph.com/ | asset | art / 图形与素材 (art-visual-assets) | fas fa-photo | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-cf41e9dd33e5 | Iconfont | https://www.iconfont.cn/home/index?spm=a313x.7781069.1998910419.2 | website | art / 图形与素材 (art-visual-assets) | fas fa-font | 通用字体 | 缺失、需要补充 |
| res-a0e91409604d | 搜图导航 | https://www.91sotu.com/ | website | art / 工具 (art-visual-tools) | fas fa-compass | 通用字体 | 缺失、需要补充 |
| res-775cfce438f1 | 500px | https://web.500px.com/ | community | art / 社区与趋势 (art-visual-community) | fas fa-camera-retro | 通用字体 | 缺失、需要补充 |
| res-157a9b6350b8 | 方正字库 | https://www.foundertype.com/ | website | art / 字体与文字 (art-visual-type) | fas fa-text-height | 通用字体 | 缺失、需要补充 |
| res-a4d546d8288c | 腾祥字库 | https://www.tensentype.com/ | website | art / 字体与文字 (art-visual-type) | fas fa-text-width | 通用字体 | 缺失、需要补充 |
| res-0cae4975a329 | 文悦字库 | https://wenyue.cn/ | website | art / 字体与文字 (art-visual-type) | fas fa-pen-fancy | 通用字体 | 缺失、需要补充 |
| res-641b04a8fdc6 | 本墨字库 | http://www.benmo.biz/ | website | art / 字体与文字 (art-visual-type) | fas fa-ink-pen | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-4a2be2d434fd | 汉仪字库 | https://www.hanyi.com.cn/productList.php | website | art / 字体与文字 (art-visual-type) | fas fa-language | 通用字体 | 缺失、需要补充 |
| res-dc3bcae11745 | 图翼 | https://www.tuyiyi.com/t-7913-1.html | website | art / 字体与文字 (art-visual-type) | fas fa-wrench | 通用字体 | 缺失、需要补充 |
| res-d05394c26b11 | 字体传奇网 | http://www.ziticq.com/ | website | art / 字体与文字 (art-visual-type) | fas fa-crown | 通用字体 | 缺失、需要补充 |
| res-1f407fe6565f | 中文字体-站长素材 | https://font.chinaz.com/zhongwenziti.html | asset | art / 字体与文字 (art-visual-type) | fas fa-file-alt | 通用字体 | 缺失、需要补充 |
| res-1ae22675a24d | 美叶 | https://meiye.art/ | website | art / 灵感与案例 (art-visual-inspiration) | fas fa-leaf | 通用字体 | 缺失、需要补充 |
| res-637c9b7a090c | reeoo | https://reeoo.com/app/ | website | art / 灵感与案例 (art-visual-inspiration) | fas fa-mobile-alt | 通用字体 | 缺失、需要补充 |
| res-24c80b844d87 | 秀设计 | https://www.xiusheji.com/ | community | art / 社区与趋势 (art-visual-community) | fas fa-paint-brush | 通用字体 | 缺失、需要补充 |
| res-d32b37129899 | UI中国 | https://www.ui.cn/ | community | art / 社区与趋势 (art-visual-community) | fas fa-laptop | 通用字体 | 缺失、需要补充 |
| res-7c475263bb6b | 图虫创意 | https://stock.tuchong.com/ | website | art / 图形与素材 (art-visual-assets) | fas fa-bug | 通用字体 | 缺失、需要补充 |
| res-7344a6a6a831 | 设计癖 | https://www.shejipi.com/ | website | art / 灵感与案例 (art-visual-inspiration) | fas fa-lightbulb | 通用字体 | 缺失、需要补充 |
| res-1a109a64242b | 家纺趋势 | https://www.91jiafang.com/ | website | art / 社区与趋势 (art-visual-community) | fas fa-bed | 通用字体 | 缺失、需要补充 |
| res-b04d19f21678 | Notion | https://www.notion.com/ | website | work / 文档与笔记 (section-be853d7abe) | fas fa-cube | 通用字体 | 缺失、需要补充 |
| res-6faf8078bc3d | 腾讯文档 | https://docs.qq.com/desktop | website | work / 文档与笔记 (section-be853d7abe) | fas fa-file-word | 通用字体 | 缺失、需要补充 |
| res-104da187aeac | 石墨文档 | https://shimo.im/ | website | work / 文档与笔记 (section-be853d7abe) | fas fa-edit | 通用字体 | 缺失、需要补充 |
| res-4a862f2654ef | 金山文档 | https://www.kdocs.cn/welcome | website | work / 文档与笔记 (section-be853d7abe) | fas fa-file-excel | 通用字体 | 缺失、需要补充 |
| res-045262fdb9df | Google Docs | https://docs.google.com/ | website | work / 文档与笔记 (section-be853d7abe) | fab fa-google | 品牌字体 | 仅需 CSS 规范化 |
| res-4f1bcebf4af3 | Microsoft 365 | https://m365.cloud.microsoft/ | website | work / 文档与笔记 (section-be853d7abe) | fab fa-microsoft | 品牌字体 | 仅需 CSS 规范化 |
| res-d37be745462e | diagrams.net | https://www.draw.io/ | website | work / 图表与白板 (work-diagrams) | fas fa-project-diagram | 通用字体 | 缺失、需要补充 |
| res-0769dc5c4e2e | Whimsical | https://whimsical.com/ | website | work / 图表与白板 (work-diagrams) | fas fa-brain | 通用字体 | 缺失、需要补充 |
| res-85794320b9fe | Excalidraw | https://excalidraw.com/ | website | work / 图表与白板 (work-diagrams) | fas fa-pencil-alt | 通用字体 | 缺失、需要补充 |
| res-55aed948bf9c | MindMeister | https://www.mindmeister.com/ | website | work / 图表与白板 (work-diagrams) | fas fa-sitemap | 通用字体 | 缺失、需要补充 |
| res-eb640f905ca9 | Miro | https://miro.com/ | website | work / 图表与白板 (work-diagrams) | fas fa-chalkboard | 通用字体 | 缺失、需要补充 |
| res-732fa7eab1be | Lucidchart | https://lucidchart.com/ | website | work / 图表与白板 (work-diagrams) | fas fa-chart-bar | 通用字体 | 缺失、需要补充 |
| res-e2b7d141a061 | SmallPDF | https://smallpdf.com/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-file-pdf | 通用字体 | 缺失、需要补充 |
| res-0f267a098943 | 万兴优转在线端（Media.io） | https://www.media.io/zh/ | website | av / 视频工具 (section-ac0f75ea54) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-b6a9c8a0879f | Convertio | https://convertio.co/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-sync-alt | 通用字体 | 缺失、需要补充 |
| res-a2032bb7e364 | Online-Convert | https://www.online-convert.com/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-file-archive | 通用字体 | 缺失、需要补充 |
| res-920e46e0b7d8 | CloudConvert | https://cloudconvert.com/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-cloud-upload-alt | 通用字体 | 缺失、需要补充 |
| res-f77636ac2752 | FreeConvert | https://www.freeconvert.com/ | website | work / 文件处理 (section-a30e17f8a2) | fas fa-file-download | 通用字体 | 缺失、需要补充 |
| res-68fedf649248 | Figma | https://www.figma.com/ | website | art / 工具 (art-visual-tools) | fab fa-figma | 品牌字体 | 仅需 CSS 规范化 |
| res-02a7cca093b2 | Sketch | https://www.sketch.com/ | website | art / 工具 (art-visual-tools) | fas fa-vector-square | 通用字体 | 缺失、需要补充 |
| res-9dbc2f574fa5 | Adobe XD | https://www.adobe.com/products/xd.html | website | art / 工具 (art-visual-tools) | fab fa-adobe | 空白字形（content none / 高0） | 缺失、需要补充 |
| res-5d8706949079 | Balsamiq | https://balsamiq.com/ | website | art / 工具 (art-visual-tools) | fas fa-lightbulb | 通用字体 | 缺失、需要补充 |
| res-ee76fbba7792 | Canva | https://www.canva.com/ | website | art / 工具 (art-visual-tools) | fas fa-palette | 通用字体 | 缺失、需要补充 |
| res-814cc8aa38db | ProtoPie | https://www.protopie.io/ | website | art / 工具 (art-visual-tools) | fas fa-mobile-alt | 通用字体 | 缺失、需要补充 |
| res-24ac848c2368 | Trello | https://trello.com/ | website | work / 项目管理 (section-587797433c) | fab fa-trello | 品牌字体 | 仅需 CSS 规范化 |
| res-e5b40c7fcd19 | Asana | https://asana.com/ | website | work / 项目管理 (section-587797433c) | fas fa-list-check | 通用字体 | 缺失、需要补充 |
| res-7c726d842f83 | Jira | https://www.atlassian.com/software/jira | software | work / 项目管理 (section-587797433c) | fab fa-jira | 品牌字体 | 仅需 CSS 规范化 |
| res-83e921a5d723 | ClickUp | https://clickup.com/ | website | work / 项目管理 (section-587797433c) | fas fa-rocket | 通用字体 | 缺失、需要补充 |
| res-9e5109a0eb1a | Monday.com | https://monday.com/ | website | work / 项目管理 (section-587797433c) | fas fa-calendar-alt | 通用字体 | 缺失、需要补充 |
| res-23c7898f8bd4 | Basecamp | https://basecamp.com/ | website | work / 项目管理 (section-587797433c) | fas fa-campground | 通用字体 | 缺失、需要补充 |
| res-e5d304c1d5d0 | Slack | https://slack.com/ | website | work / 沟通与会议 (work-communication) | fab fa-slack | 品牌字体 | 仅需 CSS 规范化 |
| res-f056c4fec3a2 | Microsoft Teams | https://www.microsoft.com/microsoft-teams/ | website | work / 沟通与会议 (work-communication) | fab fa-microsoft | 品牌字体 | 仅需 CSS 规范化 |
| res-45d5192022e4 | 钉钉 | https://www.dingtalk.com/ | website | work / 沟通与会议 (work-communication) | fas fa-bell | 通用字体 | 缺失、需要补充 |
| res-0625bbe4ab49 | 企业微信 | https://work.weixin.qq.com/ | website | work / 沟通与会议 (work-communication) | fab fa-weixin | 品牌字体 | 仅需 CSS 规范化 |
| res-724af556ca10 | Discord | https://discord.com/ | community | work / 沟通与会议 (work-communication) | fab fa-discord | 品牌字体 | 仅需 CSS 规范化 |
| res-976eeac66264 | Zoom | https://www.zoom.com/ | website | work / 沟通与会议 (work-communication) | fas fa-video | 通用字体 | 缺失、需要补充 |
| res-9931966bedbc | GitLab | https://gitlab.com/ | website | development / 代码与协作 (development-code-collaboration) | fab fa-gitlab | 品牌字体 | 仅需 CSS 规范化 |
| res-39625eb27383 | Bitbucket | https://bitbucket.org/ | website | development / 代码与协作 (development-code-collaboration) | fab fa-bitbucket | 品牌字体 | 仅需 CSS 规范化 |
| res-b8dc840fe342 | Replit | https://replit.com/ | website | development / 开发工具与环境 (section-cac953817e) | fas fa-terminal | 通用字体 | 缺失、需要补充 |
| res-fc646e755422 | CodeSandbox | https://codesandbox.io/ | website | development / 开发工具与环境 (section-cac953817e) | fas fa-code | 通用字体 | 缺失、需要补充 |
| res-6d5a929c971e | StackBlitz | https://stackblitz.com/ | website | development / 开发工具与环境 (section-cac953817e) | fas fa-bolt | 通用字体 | 缺失、需要补充 |
| res-5c80faa79378 | MuseScore 乐谱社区 | https://musescore.com/sheetmusic | asset | music-study / 乐谱资源 (section-fe06f6fbba) | fas fa-file-lines | 通用字体 | 缺失、需要补充 |
| res-ed87a0dbc4cd | 8 Notes | https://www.8notes.com/ | website | music-study / 乐谱资源 (section-fe06f6fbba) | fas fa-music | 通用字体 | 缺失、需要补充 |
| res-b02efc4268e3 | IMSLP - Petrucci Music Library | https://imslp.org/ | asset | music-study / 乐谱资源 (section-fe06f6fbba) | fas fa-book | 通用字体 | 缺失、需要补充 |
| res-80e0fca407d8 | Mutopia Project | https://www.mutopiaproject.org/ | website | music-study / 乐谱资源 (section-fe06f6fbba) | fas fa-book-open | 通用字体 | 缺失、需要补充 |
| res-ce669eca53a5 | Every Noise at Once | https://www.everynoise.com/ | website | music-study / 音乐探索 (section-89ad56ac78) | fas fa-globe | 通用字体 | 缺失、需要补充 |
| res-79f0be38132d | MusicTheory.net | https://www.musictheory.net/ | tutorial | music-study / 音乐学习 (section-934281eab5) | fas fa-chalkboard-user | 通用字体 | 缺失、需要补充 |
| res-13fb5bfd515d | Teoria | https://www.teoria.com/ | tutorial | music-study / 音乐学习 (section-934281eab5) | fas fa-book-reader | 通用字体 | 缺失、需要补充 |
| res-a3a2d6e482de | EarMaster | https://www.earmaster.com/ | software | music-study / 音乐学习 (section-934281eab5); software / 阅读与学习 (software-reading-learning) | fas fa-ear-listen | 通用字体 | 缺失、需要补充 |
| res-cb5f4135fa61 | Reddit 音乐理论社区 | https://www.reddit.com/r/musictheory/ | community | music-study / 音乐社区 (section-c890983057) | fab fa-reddit | 品牌字体 | 仅需 CSS 规范化 |
| res-38fdc79516ea | Reddit 作曲社区 | https://www.reddit.com/r/composer/ | community | music-study / 音乐社区 (section-c890983057) | fab fa-reddit | 品牌字体 | 仅需 CSS 规范化 |
| res-f8db0988b3a0 | VI-Control 社区 | https://vi-control.net/community/ | community | av / 音频社区 (av-audio-community) | fas fa-keyboard | 通用字体 | 缺失、需要补充 |
| res-66f28f89c243 | KVR Audio 论坛 | https://www.kvraudio.com/forum/ | community | av / 音频社区 (av-audio-community) | fas fa-sliders | 通用字体 | 缺失、需要补充 |
| res-cb06d96dbe69 | Spotify | https://open.spotify.com/ | website | music / 收听与发现 (section-f1f553c5bc) | fab fa-spotify | 品牌字体 | 仅需 CSS 规范化 |
| res-d44f5592ef75 | Rate Your Music | https://rateyourmusic.com/ | website | music-study / 音乐探索 (section-89ad56ac78) | fas fa-star-half-stroke | 通用字体 | 缺失、需要补充 |
| res-5f035db35b6c | TonedEar | https://tonedear.com/ | website | music-study / 音乐学习 (section-934281eab5) | fas fa-wave-square | 通用字体 | 缺失、需要补充 |
| res-b939645bed96 | Ableton Live | https://www.ableton.com/ | software | av / 音频制作工具 (section-2ef48c0866); software / 音频与视频 (software-audio-video) | fas fa-table-cells | 通用字体 | 缺失、需要补充 |
| res-75ae98f287b2 | REAPER | https://www.reaper.fm/ | software | av / 音频制作工具 (section-2ef48c0866); software / 音频与视频 (software-audio-video) | fas fa-wave-square | 通用字体 | 缺失、需要补充 |
| res-d130cc2e9c59 | Audacity | https://www.audacityteam.org/ | software | av / 音频制作工具 (section-2ef48c0866); software / 音频与视频 (software-audio-video) | fas fa-scissors | 通用字体 | 缺失、需要补充 |
| res-efe4c2b50a33 | Native Instruments | https://www.native-instruments.com/ | website | av / 音频制作工具 (section-2ef48c0866); extensions / 音频插件与音源 (section-3ce54de4b7) | fas fa-drum | 通用字体 | 缺失、需要补充 |
| res-20dbab3b0c2f | Gearspace | https://www.gearslutz.com/board/ | website | av / 音频社区 (av-audio-community) | fas fa-microphone-lines | 通用字体 | 缺失、需要补充 |

## 附录 B：全部本地图标文件

透明按实际像素检测，不仅依据文件格式；ICO 尺寸为解码默认帧，附带帧集合。资源ID为空表示仅历史来源引用。

| 文件 | 实际编码 | 像素 | 透明像素 | 字节 | active resourceIds | ICO帧 |
| --- | --- | --- | --- | --- | --- | --- |
| assets/icons/3dcoat.png | PNG | 48×48 | 无 | 4273 | res-59a8c3235c8e | — |
| assets/icons/4k1080.ico | JPEG | 32×32 | 无 | 2308 | res-ccfaf1fc8479 | — |
| assets/icons/555dy.ico | ICO | 32×32 | 有 | 4286 | — | [[32, 32]] |
| assets/icons/adobe.ico | ICO | 32×32 | 无 | 4286 | res-83dbf3146b95 | [[32, 32]] |
| assets/icons/app-cleaner.jpg | JPEG | 48×48 | 无 | 1648 | res-61e2540c5015 | — |
| assets/icons/artstation.jpg | JPEG | 48×48 | 无 | 1588 | res-41947f4aba53 | — |
| assets/icons/baiduwangpan.ico | ICO | 32×32 | 有 | 4286 | res-305ce2f2af53 | [[32, 32]] |
| assets/icons/bandizip.png | PNG | 48×48 | 有 | 1091 | res-9eeb06a2a9b2 | — |
| assets/icons/blender-market.png | PNG | 32×32 | 有 | 1690 | res-7b921cd30d30 | — |
| assets/icons/blender.ico | ICO | 16×16 | 有 | 1150 | res-3a9f5c96c220, res-b60e9fdc1539 | [[16, 16]] |
| assets/icons/calibre.jpg | JPEG | 48×48 | 无 | 20416 | res-2bb4c3b6b003 | — |
| assets/icons/cctalk.ico | ICO | 32×32 | 有 | 4286 | res-66fd9da32db8 | [[32, 32]] |
| assets/icons/cg3da.png | PNG | 48×48 | 有 | 1793 | res-aa38f347cac6 | — |
| assets/icons/chrome.png | PNG | 32×32 | 有 | 1406 | res-9cc8c6489d5f | — |
| assets/icons/clash.ico | ICO | 32×32 | 无 | 4286 | res-d7b68315ffd9 | [[32, 32]] |
| assets/icons/csp.png | JPEG | 48×48 | 无 | 2047 | res-9fe35e6ae85e | — |
| assets/icons/ddys.png | PNG | 32×32 | 有 | 1321 | res-eef9f29322f0 | — |
| assets/icons/deviantart.jpg | JPEG | 48×48 | 无 | 13019 | res-090b4ba32518 | — |
| assets/icons/epic-games.jpg | JPEG | 48×48 | 无 | 14196 | res-215f7a9368ce | — |
| assets/icons/epic.ico | ICO | 48×48 | 有 | 15086 | — | [[16, 16], [32, 32], [48, 48]] |
| assets/icons/fandom.png | PNG | 48×48 | 无 | 868 | res-a01807eb90d6 | — |
| assets/icons/flicker.jpg | JPEG | 48×48 | 无 | 13607 | res-8edd6193981e | — |
| assets/icons/gaea.ico | ICO | 32×32 | 无 | 4286 | res-5193234cd6bc, res-684127ed910a | [[32, 32]] |
| assets/icons/gfxcamp.png | PNG | 48×48 | 有 | 2403 | res-d2e7f9db431e | — |
| assets/icons/github.ico | ICO | 32×32 | 有 | 4286 | res-09a8b930c8b7 | [[32, 32]] |
| assets/icons/gog.jpg | JPEG | 48×48 | 无 | 13599 | res-a64307bca0d1 | — |
| assets/icons/google-earth.jpg | JPEG | 30×30 | 无 | 10548 | res-bcfdaf9dbd16 | — |
| assets/icons/google.ico | ICO | 24×24 | 无 | 1886 | res-ce617efd8c66 | [[24, 24]] |
| assets/icons/hdmoli.ico | ICO | 48×48 | 有 | 15406 | — | [[16, 16], [32, 32], [48, 48]] |
| assets/icons/huaban.png | PNG | 60×60 | 无 | 1838 | res-d132a3ea8572 | — |
| assets/icons/huorong.jpg | PNG | 48×48 | 无 | 2339 | res-787fd06cb08e | — |
| assets/icons/iina.png | PNG | 48×48 | 有 | 2771 | res-1c23a7b77657 | — |
| assets/icons/imdb.ico | ICO | 32×32 | 无 | 4286 | res-d740a4987e2c | [[32, 32]] |
| assets/icons/languangdy.ico | ICO | 16×16 | 有 | 1150 | res-5ef708a662da | [[16, 16]] |
| assets/icons/leishen.ico | JPEG | 48×48 | 无 | 2035 | res-b62262cabd66 | — |
| assets/icons/libvio.png | PNG | 39×40 | 无 | 2562 | — | — |
| assets/icons/marvelous-designer.jpg | JPEG | 48×48 | 无 | 1730 | res-19b4b0a8487e | — |
| assets/icons/mumu.ico | ICO | 32×32 | 无 | 4286 | res-2e471096b9d3 | [[32, 32]] |
| assets/icons/office.jpg | JPEG | 48×48 | 无 | 1658 | res-26ce40a4e924 | — |
| assets/icons/pexels.ico | ICO | 64×64 | 有 | 32038 | res-ae709e35efc3 | [[16, 16], [32, 32], [48, 48], [64, 64]] |
| assets/icons/picabay.png | PNG | 32×32 | 无 | 519 | res-8b3350fc81fd | — |
| assets/icons/picsee.png | PNG | 48×48 | 有 | 2678 | res-2b3e20dff7b4 | — |
| assets/icons/pinterest.ico | ICO | 24×24 | 无 | 1886 | res-f09c21614e7f | [[24, 24]] |
| assets/icons/pixiv.png | PNG | 48×48 | 无 | 1122 | res-f0ab0082d108 | — |
| assets/icons/pureref.ico | ICO | 32×32 | 无 | 4286 | res-3a81b1e5a03c | [[32, 32]] |
| assets/icons/qq.webp | JPEG | 48×48 | 无 | 1904 | res-ea0447bcb5e0 | — |
| assets/icons/quixelbridge.ico | ICO | 32×32 | 无 | 4286 | res-5ee7019b67b3 | [[32, 32]] |
| assets/icons/scroll-reverser.jpg | JPEG | 48×48 | 无 | 1215 | res-e95bace475c6 | — |
| assets/icons/sketchfab.png | PNG | 48×48 | 无 | 1759 | res-2df2e56cb739 | — |
| assets/icons/steam.ico | JPEG | 48×48 | 无 | 3283 | res-882fd7527ef0 | — |
| assets/icons/textures.ico | ICO | 16×16 | 有 | 1150 | res-75c876058f32 | [[16, 16]] |
| assets/icons/ubisoft.jpg | JPEG | 48×48 | 无 | 14112 | res-f0c8b430c2cf | — |
| assets/icons/ue5.jpg | JPEG | 48×48 | 无 | 1750 | res-f2f3d51ddf39 | — |
| assets/icons/unsplash.png | PNG | 32×32 | 有 | 144 | res-cd850a13d51b | — |
| assets/icons/wangyiyun.png | PNG | 32×32 | 有 | 3484 | res-90dd5ea957ab | — |
| assets/icons/wechat.ico | PNG | 32×32 | 有 | 827 | res-5932a896098b | — |
| assets/icons/wikipedia.ico | ICO | 48×48 | 有 | 2734 | res-d71ec714e950 | [[16, 16], [32, 32], [48, 48]] |
| assets/icons/xmind.png | PNG | 48×48 | 无 | 3280 | res-526a4ab431c7 | — |
| assets/icons/yinfans.ico | ICO | 32×32 | 无 | 4286 | res-fc2e950464ae | [[32, 32]] |
| assets/icons/youdaocidian.ico | ICO | 16×16 | 有 | 1150 | res-1b6dc2711caf | [[16, 16]] |
| assets/icons/ziyou.jpg | JPEG | 48×48 | 无 | 13680 | res-79e7b4b278c2 | — |
