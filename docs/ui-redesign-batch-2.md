# AR Library 新版 UI · 第二批实施报告

日期：2026-10-08

## 1. 实际修改范围

完成右侧内容的 Section 纵向结构、Resource Grid 和资源卡基础视觉。只修改三份运行文件，另新增本报告。第一批导航、Header、搜索、授权和数据逻辑保持不变。

## 2. Section 纵向结构

`.right-panel` 使用普通 block 流，section 按原顺序纵向排列，间距 36px。`.section-card` 保留 class，容器使用语义化 section，取消背景、边框、圆角、阴影、hover 位移和大面积 padding。

标题保留原文与链接，追加 ` · 数量`。标题 22px / 600，数量 14px / #7A8189；下方 1px #D7DAD6 分隔线，与 Grid 间距 16px。没有修改 section ID、标题数据或资源顺序。

## 3. Resource Grid 实现

Grid 下移到每个 section 的 `.link-group`：

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
gap: 16px;
align-items: start;
```

列数由实际容器宽度决定。没有 viewport 固定列数、Masonry、dense、CSS order、JS 分栏或 resize 重排。

## 4. Resource Card 最终样式

白色 #FFFFFF，1px #D7DAD6 边框，12px 圆角，主内容 padding 16px，无阴影。可点击卡片 hover 只轻微调整背景与边框，无位移、缩放或发光。

名称 16px / 600 / #252B33；说明 14px / #59616B / 行高 1.45。保留原图标、两行 clamp、完整 DOM 文本、长文本 title 和 focus-visible 全文阅读。卡片没有固定高度。

## 5. resource-link / resource-entry

普通资源由 `.resource-link` 承担卡片外观；有附加内容的资源由 `.resource-entry` 承担外观，内部主链接取消背景、边框和圆角。

实测 Blender 外层边框 1px、内层 0px；没有双层白框，没有 a 嵌套 a 或 button。资源链接、相关资源按钮、次入口保持独立语义。

## 6. relatedResources

保留原 button、aria-expanded、aria-controls、hidden、关系顺序和目标链接。展开区使用 #F1F2EF 背景及顶部轻分隔线。

Blender 展开 10 条，Midjourney页面端展开 3 条。Enter 和 Space 正常展开、收起，aria-expanded 与 hidden 同步。展开后卡片自然增高；接受普通 Grid 同行其他卡片下方的空白。

## 7. secondary / reviewNotes

所有渲染 placement 的次入口 URL、label、`其他原始入口`、target 和 rel 均与 catalog 核对一致。次入口 13px，继续使用深金棕链接色。

reviewNotes 原文全部一致，使用 13px / #6B727A / 行高 1.45，自然换行，没有警告框、badge 或弹窗。

## 8. NO_ACTIVE_URL

全部 11 个实体在当前页面中保持 DIV 非链接结构、默认 cursor 和原有 `（暂未记录链接）` 提示。无主链接卡片不使用可点击 hover 强调。没有补 URL 或新增 disabled button。

## 9. art domain 兼容

概念设计、视觉设计、设计参考内部的 section 均使用纵向结构和 Resource Grid。三个正文 domain tabs、当前 domain 状态及正文目录完整保留。

三个 domain 分别为 6 section / 34 mappings、6 / 47、9 / 84，合计 21 section / 165 mappings。

## 10. art group 结构

设计参考继续保留服装与时尚、武器，以及原 group / section 目录。domain 标题 30px、group 标题 26px、section 标题 22px，均不是卡片。group ID、hash 和顺序不变。

## 11. 普通 view

普通页面 section 依次向下，正文数量提示与二级栏目录对应。普通正文目录仍按第一批规则隐藏，没有重新放回正文。

## 12. 响应式列数实测

每种尺寸均检查 software、art 概念设计、art 设计参考和 3D Blender 展开状态，共 28 次核心页面检查。

| 视口 | Grid 列数 | 单卡宽度约 | 横向溢出 |
| --- | ---: | ---: | --- |
| 1920×1080 | 4 | 348px | 无 |
| 1366×768 | 3 | 328px | 无 |
| 1200×800 | 2 | 417px | 无 |
| 1024×768 | 3 | 287px | 无 |
| 820×1024 | 2 | 337px | 无 |
| 768×1024 | 2 | 353px | 无 |
| 390×844 | 1 | 343px | 无 |

section 均纵向排列。≥1200 双栏导航、769–1199 rail + toolbar + overlay、≤768 mobile toolbar 的既有行为保持正常。rail、二级栏宽度、正文偏移、Header、搜索位置及主题背景不变。

## 13. 少量资源 section

采用 auto-fill，保留正常列轨道，避免 auto-fit 将单卡拉满宽屏。1920px 实测 art-study 的单资源 section 和 music 的双资源 section，卡片都约 348px，容器 1440px；没有异常超宽卡片。

## 14. DOM / Tab 顺序

section 与资源按原数组顺序直接生成，Grid 使用默认从左到右、从上到下排列。DOM、视觉和 Tab 顺序一致，没有 CSS order 或 dense。键盘 focus-visible 清楚；Quixel Bridge 在手机宽度下可聚焦阅读完整说明，完整 title 保留。

## 15. URL / history 回归

普通 section hash 及 art domain、group、section 目标保持原 ID。实测武器 group、旧 alias `section-2dbbd8e1b3` 到视觉设计色彩 section、back / forward / refresh 均正常。

全部 38 aliases 数据及解析逻辑原样保留。未修改 ?view、复制 URL 所使用的地址或 history 逻辑。本机隔离测试会话确认授权后恢复 `library.html?view=art#art-weapons-group`；正式密码和授权文件未修改。

## 16. 搜索 placement 回归

搜索 Blender 仍返回 8 个资源。点击 3D placement 到 `library.html?view=3d#section-09d0e478dd`；点击软件 placement 到 `library.html?view=software#software-3d-creation`，均进入正确 section。

搜索 JS、dialog、结果结构、排序及键盘逻辑未修改。

## 17. 20 view 资源完整性

浏览器遍历全部 20 view；art 分别遍历三个 domain。逐 section 对比 navigation 中 ID、resourceIds 顺序、数量提示，全部一致，无丢失、重复、跨 section 或顺序变化。

| view | section | 资源 placement |
| --- | ---: | ---: |
| art | 21 | 165 |
| 3d | 5 | 47 |
| game-production | 5 | 23 |
| ai | 6 | 23 |
| development | 4 | 21 |
| av | 4 | 17 |
| work | 5 | 31 |
| art-study | 3 | 5 |
| game-study | 1 | 5 |
| history | 4 | 32 |
| music-study | 4 | 12 |
| code-study | 1 | 4 |
| research | 3 | 6 |
| games | 8 | 28 |
| film | 5 | 10 |
| music | 1 | 2 |
| daily | 6 | 26 |
| software | 8 | 38 |
| extensions | 2 | 6 |
| system | 2 | 5 |

共核对 506 个 placement 的名称、说明、URL、链接语义、secondary 和 reviewNotes，全部与 catalog 一致。

## 18. 14 legacy 回归

遍历全部旧入口，按原 allowed / seen 规则逐 section 对比资源顺序与 canonical 标题链接，全部一致；兼容提示保留，Grid 正常，无横向溢出。

| legacy | section | 资源 |
| --- | ---: | ---: |
| 3d-art | 7 | 44 |
| ai-art | 6 | 20 |
| concept-art | 14 | 46 |
| costume-fashion-design | 4 | 44 |
| daily-essentials | 12 | 35 |
| development | 5 | 19 |
| game-design | 6 | 23 |
| games | 7 | 27 |
| gun-design-reference | 5 | 40 |
| history | 6 | 35 |
| installation-software | 17 | 35 |
| video-film | 4 | 9 |
| visual-communication | 8 | 39 |
| work-tools-collaboration | 9 | 42 |

## 19. 首页 / password 回归

首页内容与顺序、导航、搜索保持第一批状态。首页现有 notes / stat / external 卡片样式保留，页面没有资源 Grid；搜索入口仍为一个。

password.html 未修改，资源样式未影响授权页面；本机测试授权及目标返回正常。测试服务只绑定 127.0.0.1，模拟会话没有写入正式授权逻辑。

## 20. 数据不变性

对本轮开始时的文件 SHA-256 快照核对，只有三份指定运行文件变化，其他已有文件未变、未丢失。数据文件、migration、corrections、retired、关系、资源 URL、name、description、type 和 tags 完全不变。

正式基线保持：470 entities、498 sources、11 mergedSources、17 retired、20 views、463 activeURLs、11 NO_ACTIVE_URL、43 corrections、21 relatedResources edges、14 legacyPages、165 art mappings、209 internalLinks。

## 21. validator

`node scripts/validate.mjs`：PASS。

输出：sources 498、entities 470、mergedSources 11、views 20、legacyPages 14、activeURLs 463、confirmedCorrections 43、urlLessRecords 11、internalLinks 209。

`node --check js/render-resources.js`：PASS。

## 22. git diff --check

`git diff --check`：PASS。

## 23. 修改文件

- `js/render-resources.js`：section 容器语义及轻量数量提示。
- `css/resource-page.css`：纵向 section、资源 Grid、尺寸间距及附加区域排版。
- `css/theme-arc.css`：取消 section 卡片外观，统一单层资源卡及附加区域颜色。
- `docs/ui-redesign-batch-2.md`：新增本报告。

没有修改其他运行文件；无需导航或 Header 冲突修复。工作区此前已有修改完整保留。

## 24. 第三批仍未实施内容

- 已完成 Section 纵向 + Resource Grid。
- 已完成资源卡最终基础视觉。
- 尚未迁移 art 完整目录。
- 尚未删除 art 正文 domain / group / section 导航。
- 未修改资源数据。
- 未 commit。
- 未 push。
