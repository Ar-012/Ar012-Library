# 资源图标规范化 · 第一阶段

日期：2026-10-09。依据：`docs/resource-icon-audit.md`。范围：图标 class、显示占位与 fallback；未下载新图标，未批量补充 Logo，未 commit / push。

## 1. 16 个空字形

逐项以当前项目加载的 Font Awesome 6.4.0 CSS 和浏览器伪元素为依据。以下原 class 在该版本当前加载样式中均没有有效 `::before` 字形定义，浏览器 `content: none`，并非图片加载失败。不同来源的旧名称、未包含的图标名称不能直接用于当前字体；本轮统一换成该项目实际可用的语义近似图标，不升级库。

| resourceId | 名称 | 原 class | 新 class | 处理与验证 |
| --- | --- | --- | --- | --- |
| res-d08195ed9949 | BlenderBros的Gumroad | `fas fa-brothers` | `fas fa-users` | 创作者团队 / 社区；实际字形已显示 |
| res-0b621b7aa006 | 书生CG资源网 | `fas fa-sky` | `fas fa-cloud` | 云端 CG 资源；实际字形已显示 |
| res-5d9354f7cb0e | Chat GPT | `fab fa-openai` | `fas fa-comment` | 对话助手；实际字形已显示 |
| res-b3d6087b0983 | zbrush central | `fas fa-sculpture` | `fas fa-cubes` | 三维雕刻 / 模型；实际字形已显示 |
| res-f4a013f097d8 | List of Battle Rifles | `fas fa-rifle` | `fas fa-crosshairs` | 枪械瞄准 / 参考；实际字形已显示 |
| res-ded5d0b9adbe | List of Assault Rifles | `fas fa-rifle` | `fas fa-crosshairs` | 枪械瞄准 / 参考；实际字形已显示 |
| res-c5c5aa7eaf25 | AR15主页 | `fas fa-rifle` | `fas fa-crosshairs` | 枪械瞄准 / 参考；实际字形已显示 |
| res-fce4787393ff | Vikings | `fas fa-helmet-battle` | `fas fa-shield-alt` | 历史武备；实际字形已显示 |
| res-42e8acd0b6b6 | History of France | `fas fa-tower-eiffel` | `fas fa-landmark` | 历史建筑 / 文化；实际字形已显示 |
| res-a6f1dae2decd | Ancient Egypt | `fas fa-pyramid` | `fas fa-monument` | 历史纪念建筑；实际字形已显示 |
| res-2093fb1cd899 | 4K影视 | `fas fa-hd` | `fas fa-film` | 影视内容；实际字形已显示 |
| res-b88617d2ae76 | adobe color | `fab fa-adobe` | `fas fa-palette` | 配色工具；实际字形已显示 |
| res-b879287bf3b7 | 千图网 | `fas fa-picture-o` | `fas fa-image` | 图片素材；实际字形已显示 |
| res-e10a2d4fafe2 | 图品汇 | `fas fa-photo` | `fas fa-image` | 图片素材；实际字形已显示 |
| res-641b04a8fdc6 | 本墨字库 | `fas fa-ink-pen` | `fas fa-pen-fancy` | 字体 / 书写；实际字形已显示 |
| res-9dbc2f574fa5 | Adobe XD | `fab fa-adobe` | `fas fa-vector-square` | 矢量设计工具；实际字形已显示 |

16 项均在真实浏览器中显示新字形，未通过 fallback 掩盖修复结果。仅修改这些实体的 icon 字段。

## 2. 两个字体前缀错配

| resourceId | 名称 | 修改前 | 修改后 | 证据 |
| --- | --- | --- | --- | --- |
| res-b2d8bb124ac1 | 爱给网_音效配乐 | `fas fa-soundcloud` | `fab fa-soundcloud` | 同一 fa-soundcloud 字形属于 Brands；原 fas 使用 Free，新 fab 使用 Font Awesome 6 Brands，字形实际显示 |
| res-97cbe37bc82d | Gun Wiki | `fas fa-wikipedia-w` | `fab fa-wikipedia-w` | 同一 fa-wikipedia-w 字形属于 Brands；原 fas 使用 Free，新 fab 使用 Font Awesome 6 Brands，字形实际显示 |

可以确认前缀错误，故只修正 fas → fab。品牌标识与资源身份是否对应是另一项问题；本轮不替换其图标名称，也不把它们认定为网站专属 Logo。审计中另外的搜狐汉服 / PCGamingWiki 品牌语义问题未处理。

## 3. 七个扩展名与编码异常文件

| 文件 | 扩展名 | 实际编码 | 本轮处理 |
| --- | --- | --- | --- |
| assets/icons/4k1080.ico | ICO | JPEG | 保留 |
| assets/icons/csp.png | PNG | JPEG | 保留 |
| assets/icons/huorong.jpg | JPG | PNG | 保留 |
| assets/icons/leishen.ico | ICO | JPEG | 保留 |
| assets/icons/qq.webp | WebP | JPEG | 保留 |
| assets/icons/steam.ico | ICO | JPEG | 保留 |
| assets/icons/wechat.ico | ICO | PNG | 保留 |

七个文件均正常解码、加载。本轮改名对用户显示没有实际收益，却需要同步 catalog 和历史来源 / 旧页面引用；采用保守方案，原始字节、路径和全部引用保持不变。没有重新压缩、格式转换或删除文件。

## 4. 最终显示规范

- 统一 `.resource-icon-slot`：20×20px，`inline-flex` 水平 / 垂直居中，`flex: 0 0 20px`，上边距 1px。
- 本地图片显示区域：16×16px，`object-fit: contain`，原有圆角 3px。CSS 最大尺寸限制为 18px，不修改原图。
- Font Awesome：14px，line-height 1，无额外 margin；字形在同一 slot 居中，颜色继续沿用金棕色。保留字形本身的自然宽度。
- slot 与内容 gap：6px。20px slot + 6px gap 等于原来的 16px 图片 + 10px gap，避免压缩文字宽度、增加换行和卡片高度。
- 卡片仍为 14px padding / 6px radius，Grid gap 14px 及列数规则保持不变。

在 1366px 桌面和 390px 手机上实际比较了 16×16 与 18×18 图片。18px 更醒目，但对原生 16px favicon 会放大，部分实心图案视觉更重；16px 更符合紧凑 V1，最终保留 16px，通过 20px slot 统一对齐。统一占位不代表不同原始留白或字形轮廓的可见面积绝对相等。

## 5. fallback

renderer 只给图标增加一个固定 span 占位；资源卡外层、内容顺序、链接、关联资源逻辑保持不变。

- 图片 error：移除失败 img，以当前库已有 `fas fa-link` 替换，不保留破图标记。
- 无 iconImage / icon：直接使用 `fas fa-link`。
- 无效字体 class：渲染后读取伪元素 content；没有字形定义时替换为 `fas fa-link`。在动画帧、window load、document.fonts.ready 后检查，覆盖普通 view 和 art domain 渲染。
- fallback 保持同一 20px slot，不改变标题起始位置。图标作为装饰设 aria-hidden，链接名称继续由资源文字提供。
- 不增加图标库、第三方 favicon 服务或生成 fallback 的网络请求。仍沿用项目现有 CDN 字体；整套 Font Awesome 字体不可用时，字体型 fallback 同样依赖该字体。本轮未新增字体离线化机制。

隔离测试服务仅绑定 127.0.0.1，沿用已授权本机测试会话；故障数据只在内存响应中模拟，未写入正式 catalog / auth 文件。模拟 Chrome 图片不存在、Koodo Reader class 无效、EarMaster icon 为空，三者均出现 fa-link，slot 20×20、标题距卡片左边缘 41px，无破图或空白错位。

## 6. 浏览器回归

software / 3d / ai 在五种宽度分别检查，共 15 组；另遍历全部 20 views、三个 art domain，覆盖 art 及全部修复对象。

| 宽度 | 主要资源 Grid 列数 | 图片 / 字体 slot | 横向溢出 | 与修改前卡片高度比较 |
| --- | ---: | --- | --- | --- |
| 1920px | 4 | 20×20px | 无 | 全部相同 |
| 1366px | 3 | 20×20px | 无 | 全部相同 |
| 1024px | 3 | 20×20px | 无 | 全部相同 |
| 768px | 2 | 20×20px | 无 | 全部相同 |
| 390px | 1 | 20×20px | 无 | 全部相同 |

修改前保存同样 15 组卡片高度作为基线。修改后逐资源比较：没有高度增加或变化；资源 DOM 顺序相同，Header 高度相同，所有标题起始偏移统一为 41px。长标题 / 描述沿用既有截断与 focus 展示，无新增溢出；手机 Quixel Bridge 的键盘 focus-visible 正常。

覆盖本地 PNG、JPEG、ICO 实际编码，以及带异常扩展名的文件。当前资源图标无 SVG，SVG 样本不适用，没有为测试新增素材。Font Awesome solid / brand、16 个原空字形、2 个错配前缀均覆盖。

全站遍历 506 placements / 470 不同 active entities：所有 slot 为 20×20；59 个图片实体均成功加载；411 个字体实体没有空 content；正常数据没有触发 fallback。18 个修复对象显示的是其新 class，不是 fallback。

Blender 10 个 relatedResources 在五种宽度均可展开；最终 CSS 下复核 Enter 展开 / Space 收起。Midjourney页面端 3 个关联资源手机展开正常。relatedResources 数据未修改。

## 7. 修改文件

1. `data/catalog.js`：18 个 icon 字段（16 个空字形 + 2 个前缀）。
2. `js/render-resources.js`：统一图标 slot、图片失败 fallback、无效 class 检测。
3. `css/resource-page.css`：slot、图片 / 字体尺寸与对齐、资源链接 gap。
4. `docs/resource-icon-normalization-phase-1.md`：本报告。

原 `docs/resource-icon-audit.md` 保留不变。`css/theme-arc.css`、navigation、搜索、auth、URL/history、Grid、Header / Sidebar / Section 均未修改；图标资产文件完全不变。

## 8. 验证与不变性

- `node scripts/validate.mjs`：PASS。
- `node --check js/render-resources.js`：PASS，退出码 0。
- `git diff --check`：PASS，退出码 0。
- catalog 前后 470，ID / 顺序相同。精确比较全部字段：仅上述 18 个实体的 icon 不同；其余 452 个实体完全相同，18 个实体其他字段完全相同。
- 名称、URL、links、description、type、分类、relatedResources 无变化；没有退休或新增实体。
- sources 498、mergedSources 11、views 20、legacyPages 14、activeURLs 463、confirmedCorrections 43、urlLessRecords 11、internalLinks 209 均不变。
- 对执行前所有既有项目文件做 SHA-256 比较，仅三个上述运行文件发生变化；历史 sources、migration / corrections、navigation 与全部图标文件字节不变。不需要同步历史追溯：本轮 icon 修复不改变来源事实、目的实体、URL 或迁移关系，现有 validator 通过。
- 没有 commit、push、下载图标或给通用图标资源批量补 Logo。
