# AR Library 新版 UI · 视觉微调

日期：2026-10-08

本轮仅修改 `css/theme-arc.css` 和 `css/resource-page.css`，另新增本报告。没有修改 JS、renderer、DOM 顺序、Grid 列模板、数据、搜索、导航、URL/history、auth 或 relatedResources 行为。

## 实际视觉值

| 项目 | 最终值 |
| --- | --- |
| Resource Card 圆角 | 6px |
| Resource 主内容 padding | 14px（原 16px） |
| Resource Grid gap | 14px（原 16px） |
| Header 圆角 | 8px |
| 桌面 Header padding | 12px 24px（原 22px 24px） |
| ≤768px Header padding | 14px 20px（原 20px） |
| 搜索入口、输入框、关闭按钮圆角 | 6px |
| 搜索 dialog 圆角 | 8px |
| 二级导航 active item 圆角 | 保持 6px |
| 一级 rail item、提示标签圆角 | 6px |
| relatedResources 内部区域圆角 | 底部 4px |
| related 按钮、art domain tab 圆角 | 6px |
| 首页 quote 和共用大卡片圆角 | 8px |
| Section 标题到 Grid 距离 | 18px（原 16px） |
| Section 标题分隔线 | 1px #E3E5E1 |
| Section 数量 | 13px / 400 / #939AA1 |

主标题字号不变，Header 不设置固定高度。资源标题、说明字号和行高不变。Section 继续透明、无边框、无阴影，资源卡保持单层边框。保留深色 rail、灰色二级导航、暖白正文、白色卡片的原色彩体系；没有新增阴影、渐变、装饰或 hover 位移。

## 浏览器实测

每种尺寸检查 software、3D、art 概念设计，3D 均展开 Blender 10 条相关资源，共 15 次检查。

| 视口 | 列数 | 单卡宽约 | Header 高约 | 横向溢出 |
| --- | ---: | ---: | ---: | --- |
| 1920×1080 | 4 | 350px | 134px | 无 |
| 1366×768 | 3 | 329px | 134px | 无 |
| 1024×768 | 3 | 288px | 125px | 无 |
| 768×1024 | 2 | 354px | 126px | 无 |
| 390×844 | 1 | 343px | 126px | 无 |

Grid 仍使用原 auto-fill / 280px minimum 模板，列数逻辑与第二批一致；section 均纵向排列。截图检查确认圆角和密度收紧，标题层级仍清楚。Blender 展开自然增高，Enter / Space 与 aria-expanded 正常。

390px 下检查 Quixel Bridge：focus-visible 有 2px 轮廓，说明解除 clamp，完整 DOM 文本及 title 保留，文本无裁切。搜索浮层实测 8px 圆角、输入框 6px，无横向溢出。

使用仅绑定 127.0.0.1 的隔离测试服务，沿用已授权的本机测试会话，正式授权文件未修改。测试服务已停止。

## 验证与不变性

- CSS 检查：两份修改文件的括号及声明语法检查通过；浏览器 `CSS.supports` 对 397 条声明检查全部通过。
- `node scripts/validate.mjs`：PASS。
- `git diff --check`：PASS。
- JS 未修改，无需新增本轮 JS 语法检查。
- 与本轮开始时的 SHA-256 快照比较，只有两份 CSS 运行文件变化，其他已有文件完全不变；此前工作区修改保留。

正式指标完全不变：470 entities、498 sources、11 mergedSources、17 retired、20 views、463 activeURLs、11 NO_ACTIVE_URL、43 corrections、21 relatedResources edges、14 legacyPages、165 art mappings、209 internalLinks。

未 commit，未 push。
