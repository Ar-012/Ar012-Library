# UI / UX 优化 · 第一批现有交互问题

执行日期：2026-10-08。依据：`docs/ui-ux-audit.md`。本轮三项已完成，浏览器回归、validator、git diff --check 与数据不变性检查均 PASS。

## 1. 修改范围

仅处理授权后恢复原站内地址、普通笔记本 / 窄内容区卡片可读性、小屏导航可达性。长文本全文访问与 section DOM 顺序作为卡片布局的一部分同步处理。

继续使用原生 HTML/CSS/JS；没有重写资源关系、分类或导航数据，没有引入框架、Masonry、UI 库或搜索。

## 2. 授权 return URL 实现

采用 query：未授权进入受保护页时，将当前 pathname + search + hash 编码到 `password.html?returnTo=...`。

`js/auth.js` 提供统一 resolveReturnTarget / getReturnTarget；password.html 在“已有今日授权”和“验证成功”两条路径都使用同一校验后的目标。跳转使用 location.replace，使授权过渡页不额外占用历史步骤。

授权标记名称、每日日期规则、正式密码 hash、密码校验和成功授权写入规则保持不变。

实际浏览器测试使用独立 localhost 端口和临时测试凭据，仅在测试服务器响应中替换密码 hash；正式文件中的密码 hash 逐字一致。报告不记录真实密码。没有对生产授权机制做测试绕过。

| 未授权打开 / returnTo 情况 | 授权后实际结果 |
| --- | --- |
| index.html | index.html |
| library.html?view=3d | library.html?view=3d |
| library.html?view=art#art-visual | 完整恢复 query + domain hash |
| library.html?view=art#art-visual-color | 完整恢复 query + section hash |
| library.html?view=3d#3d-manuals-plugins | 完整恢复普通 view 的 section hash |
| 直接 password.html，无 returnTo | index.html |
| returnTo=https://example.com | index.html，未跳外站 |
| returnTo=javascript:alert(1) | index.html，未执行脚本 |

以上浏览器流程均 PASS。临时 Node 验证另确认 4 个合法返回目标、19 个非法 / 缺失目标、今日授权与过期判断均 PASS。

## 3. return URL 安全限制

目标必须为相对 / 本站路径，不接受任何带 scheme 的输入，即使 absolute URL 恰为本站 origin 也拒绝。拒绝 //、反斜杠、空白 / 控制字符、外部 origin、越出当前站点部署目录的路径。

解析后只接受当前站点 17 个非密码 HTML 页面文件的白名单：统一资源页、首页、404 页与 14 个 legacy 入口。password.html、未知文件、其他目录和编码伪装文件名均回 index.html。白名单是返回地址安全约束，不是另一套 view 导航；未来新增 HTML 时需要显式更新。

同时测试根路径及 /Ar012-Library/ 子目录部署。允许的目标保留 search / hash；相对路径经过 URL 规范化后再次检查 origin、部署目录和页面名。未修改任何资源 URL。

## 4. 卡片布局修改

资源 grid 使用：

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
```

列数由资源内容容器宽度自然决定，最小 section 宽度目标 280px；容器本身更窄时可缩至容器宽度。≤768px 继续单列。

删除旧 viewport 4 / 3 / 2 列设置，以及 JS 计算列数、选择最短列、创建 column wrapper 的逻辑。renderer 仅按原 sections 顺序创建 section-card；资源数组和 section 数组均未修改。

DOM / Tab 顺序现在与 section 目录顺序一致。3D 为“软件与工具 → 手册与插件 → 模型与素材 → 材质与环境 → 教程与社区”，视觉按普通 Grid 从左到右、从上到下阅读，不使用 dense 重排。

CSS 自行重排，不再用 resize 清空并重建卡片；实测 Blender 展开状态跨 1366 → 1024 保留，10 条相关链接仍在。没有改变 relatedResources UI 或关系数据。

取舍：普通 Grid 按同行最高 section 留出行高，短 section 下方可能出现空白；没有继续追求瀑布流填满空隙。换来可读宽度、稳定 DOM 与更一致的键盘阅读顺序，本轮没有引入复杂布局算法。

## 5. 六种窗口尺寸实测

每种尺寸分别实测 3D 与美术与设计默认概念设计 domain，均刷新后测量。数值约为 px；首资源位置为距文档顶部的坐标，不是强制滚动值。两页资源 grid 列数与 section 宽度相同。

| 窗口 | 导航初始状态 | 资源列数 | section 宽 | Blender 主链接宽 | 首资源位置：3D / art | 横向滚动 |
| --- | --- | --- | --- | --- | --- | --- |
| 1920×1080 | 固定侧栏 260px | 4 | 330 | 246 | 444 / 559 | 无 |
| 1366×768 | 固定侧栏 260px | 3 | 317 | 233 | 436 / 551 | 无 |
| 1024×768 | 固定侧栏 240px | 2 | 325 | 241 | 419 / 535 | 无 |
| 820×1024 | 固定侧栏 240px | 1 | 465 | 381 | 410 / 554 | 无 |
| 768×1024 | 默认收起，56px 导航按钮 | 1 | 673 | 593 | 461 / 577 | 无 |
| 390×844 | 默认收起，56px 导航按钮 | 1 | 295 | 221 | 487 / 682 | 无 |

1366px 的 section 从约 233px 增至 317px，Blender 主链接从约 149px 增至 233px；1024px 从三列降为两列。1920px 保持四列，820px 的正文可用宽度不足以容纳两个 280px section，因此自然单列，没有再硬挤两列。

390×844 的 3D 首资源从前次审计约 853px 提前到约 487px；导航不再占据半屏。art 有 domain 和细分类目录，首资源约 682px，仍保留当前信息层级。

六尺寸、两页均无 document 横向溢出。Blender 的关联按钮仍可操作；Quixel Bridge 保留完整 description，并具备第 6 节的全文访问方式。

## 6. 长文本处理

默认 name / description 仍最多两行，不删除或缩写数据文本。

较长 name（超过 16 个字符）和 description（超过 24 个字符）在对应文本节点添加完整 title。这是“可能较长”的轻量阈值策略，不做逐字段高度测量，也没有给所有短字段重复 title。

不只依赖原生 title 的键盘支持：资源主链接获得 focus-visible 时，名称 / 描述临时解除两行 clamp，并显示清晰焦点 outline；离开后恢复原样。没有新增“展开全文”按钮。

实测 Quixel Bridge：完整 title 与 description 一致；键盘焦点下 focus-visible=true，描述可见高度与全文高度均约 50px，完整显示弃用和 Fab 迁移说明。短字段无重复 title，屏幕阅读器仍可读取原有完整 DOM 文本。

桌面键盘全文实测截图：

![1366px 桌面：三列布局与 Quixel Bridge 焦点全文](/tmp/ui-ux-batch-1/desktop.jpg)

## 7. 小屏导航实现

复用现有 sidebar DOM 和同一份 20 view 数据，没有复制导航链接。增加原生 button，显示“当前 view · 导航”，具备 aria-expanded / aria-controls。

≤768px 按钮固定在顶部，高 56px；页面预留同等空间。侧栏默认 display:none，展开后作为按钮下方的固定下拉区域显示，可纵向滚动访问全部四区、20 个 view。背景沿用现有主题，没有 off-canvas 框架。

Enter / Space 可开关，Escape 可收起；在菜单内 Escape 会把焦点交回按钮。点击 view 正常导航，新页面手机初始状态默认收起。跨桌面 / 小屏边界会将折叠状态归为初始收起。

实测深处 #art-visual-color，正文 scrollY=563.5；真实点击或键盘开关导航前后仍为 563.5，URL / query / hash 全部不变，没有回顶、重置 domain 或清除 hash。一次展开后可以访问末尾“系统与设备”，进入后按钮显示新 view 且默认收起。

手机初始状态截图：

![390px 手机：导航收起且首屏显示资源](/tmp/ui-ux-batch-1/mobile.jpg)

## 8. 桌面行为回归

>768px 折叠按钮隐藏，侧栏维持固定模型：通常 260px，≤1024px 为 240px，仍独立滚动。菜单 Escape 行为只作用于小屏，不改变桌面焦点行为。

实际遍历全部 20 个 view，均正常渲染，active 高亮均恰为 1，桌面折叠按钮均隐藏，没有资源加载失败。

Blender 展开 / 收起、主卡片与关联按钮分离、10 条关联链接、外链 target / rel 保持。没有修改关联数量文案、长列表 UI、secondary 文案、reviewNotes 或无 URL 状态。

旧 3d-art.html 实测仍显示兼容提示、44 个实体及 7 个可进入新目录的分类标题链接；其他 legacy 页面共用同一运行链，原文件和 legacy 数据完全不变。

## 9. URL / hash / history 回归

art 普通 domain 点击仍 preventDefault + pushState；从顶部切换视觉设计时 scrollY=0，不触发原生 domain 锚点跳转。

点击配色 section、后退、前进、刷新后，URL 仍为 library.html?view=art#art-visual-color，domain 为视觉设计，目标 section 顶部约在视口 20px。

没有改 catalog-view 的 view / domain 解析、旧 sectionAliases、section ID、history 监听或复制 URL 行为。导航开关不参与 history，不写 URL。授权返回保留目标原有 query + hash。

没有引入 section sticky 目录、scroll spy 或应用级全站滚动历史。

## 10. 数据不变性

修改前保存全部既有项目文件 SHA-256，以及六个待修改文件的原始副本。最终比较：仅第 13 节六个既有 UI / auth 文件变化，唯一新增为本报告；其余既有文件逐字节不变。

因此 catalog 470 个完整对象、navigation 数据、legacy、migration original / sourceKey / destinations、corrections、17 条 retired、11 条 mergedSources、全部 relatedResources、previousTitles、name / description / type / tags 与资源 URL 完整不变。旧审计和此前报告不变；validator 文件不变。

| 指标 | 修改前 | 修改后 |
| --- | --- | --- |
| entities | 470 | 470 |
| sources | 498 | 498 |
| mergedSources | 11 | 11 |
| retired | 17 | 17 |
| views | 20 | 20 |
| activeURLs | 463 | 463 |
| NO_ACTIVE_URL | 11 | 11 |
| corrections | 43 | 43 |
| relatedResources edges | 21 | 21 |
| legacyPages | 14 | 14 |
| art mappings | 165 | 165 |
| internalLinks | 209 | 209 |

## 11. validator 与实现检查

`node scripts/validate.mjs`：**PASS**，退出码 0。

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 470,
  "mergedSources": 11,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 463,
  "confirmedCorrections": 43,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

auth / navigation / render-resources 的 node --check 均 PASS。返回目标正反向测试及浏览器回归均 PASS。未修改 validator 或增加 exception。

## 12. git diff --check

`git diff --check`：**PASS**，退出码 0；新报告另检查无行尾空白。

## 13. 修改文件

修改六个既有文件：

- `js/auth.js`：返回目标传递与统一安全校验。
- `password.html`：已有授权 / 授权成功后恢复目标。
- `js/render-resources.js`：按原 section 顺序生成 Grid 子项，较长文本 title，移除 resize 重建。
- `js/navigation.js`：复用 sidebar 的小屏开关及状态。
- `css/resource-page.css`：容器宽度驱动 Grid，默认截断与键盘全文 / 焦点样式。
- `css/theme-arc.css`：小屏顶部按钮、导航下拉区域与内容占位。

新增：`docs/ui-ux-improvements-batch-1.md`。无其他新增或删除项目文件。截图、测试凭据 fixture、测量结果与临时脚本只在 /tmp；正式密码未写入报告。

## 14. 尚未处理的问题

未实现全局 / view 搜索、tag / type 筛选、收藏、最近访问或常用。未处理 relatedResources 数量文案和长列表 UI、secondary 文案、reviewNotes、无 URL 卡片、section sticky 导航、scroll spy、skip link、全面 aria landmark、新主题或动画重做。

普通 Grid 的行间空白是本轮明确取舍；未做 Masonry。手机页面现有大标题、domain / section 目录保持原样，不连带压缩或重新设计信息层级。

本轮 **未实现搜索、未调整信息架构、未修改资源数据、未 commit、未 push**。
