# AR Library 新版 UI · 第三批实施报告

日期：2026-10-08

## 1. 实际修改文件

- `js/navigation.js`：根据正式 domain / group / section 数据生成 art 左侧树，接收 renderer 的当前目标状态；保留键盘焦点和既有移动菜单关闭行为。
- `js/render-resources.js`：让左侧目标链接复用现有 hash / alias / domain 解析，通知导航状态，停止生成正文重复目录。
- `css/theme-arc.css`：仅新增 art tree 缩进和 active 样式。
- `docs/ui-redesign-batch-3.md`：本报告。

## 2. 左侧最终目录

当前 view 继续为“美术与设计”。“当前页面”下三个 domain 均保留；只展开当前 domain，其他 domain 为单行链接。

概念设计、视觉设计直接显示各自 6 个 section，不显示无标题的技术 group。设计参考显示“服装与时尚”4 个 section、“武器”5 个 section。明确区分当前 domain、具名 group 和 section，active 只由 URL/hash 决定，无 scroll spy 或手动 accordion。

## 3. 数据来源

domain、group、section 标题、顺序、ID 和归属来自现有 `AR_VIEWS` / `AR_RESOURCE_SECTIONS`。没有手写 section 列表、复制资源或新增导航配置。保留 3 domains、21 sections、165 mappings。

## 4. 切换实现

左侧链接交给 renderer 的既有点击处理。普通点击 preventDefault，同一目标不增加 history；新目标 pushState，然后通过原 renderDomain 逻辑推导 domain、规范化 alias、渲染及定位。

renderer 发布 `ar:domain-rendered` 当前目标事件，左侧据此展开和更新 active，不另建 section → domain 映射系统。domain 链接不触发默认 fragment 跳动；group / section 渲染后定位。支持修饰键的原生链接行为。

## 5. 正文清理

移除正文 domain tabs，停止渲染 group 目录和 section 跳转目录。正文保留 domain 标题、具名 group 标题、section 标题与数量、所有目标节点及 ID。资源内容、纵向结构和 Grid 不变。

## 6. 21 sections

真实浏览器逐项遍历 3 domains、2 个具名 group、21 sections。目标节点、domain、group、section active 和当前 domain section 顺序全部正确。

另核对三个 domain 的所有资源 ID 与顺序：概念设计 6 / 34，视觉设计 6 / 47，设计参考 9 / 84，总计 21 sections / 165 mappings，完全一致。

## 7. 38 aliases

全部 38 条旧 alias 在真实浏览器中逐项验证：replaceState 规范化为原正式 section hash，渲染正确 domain，左侧展开并标记正确 section，目标节点存在。alias 数据未修改。

## 8. history / URL

back、forward、refresh 正常；重复点击当前 domain 后，back 直接回到上一目标，没有多余 history 项。直接打开深层 group / section URL 正常。保留 ?view、原 hash 格式和复制 URL 使用的地址，没有新 query 或路由。

## 9. search placement

搜索“字体”后点击原 placement，进入 `library.html?view=art#art-visual-type`，自动显示视觉设计，左侧展开并标记字体与文字，正确定位。resource-search 文件及匹配、排序、去重、结果、键盘逻辑完全未改。

## 10. auth returnTo

本机隔离测试确认授权后恢复 `library.html?view=art#art-reference-fashion-history`，正确展开设计参考 / 服装与时尚，并激活历史服装。正式 auth、password 未修改。测试服务仅绑定 127.0.0.1，结束后停止。

## 11. 五种尺寸

| 视口 | Resource Grid 列数 | Header 高度约 | 横向溢出 |
| --- | ---: | ---: | --- |
| 1920×1080 | 4 | 134px | 无 |
| 1366×768 | 3 | 134px | 无 |
| 1024×768 | 3 | 125px | 无 |
| 768×1024 | 2 | 126px | 无 |
| 390×844 | 1 | 126px | 无 |

每种尺寸实际点击 domain、group、section。窄桌面和手机点击后菜单关闭，section 顶部约 72px，未被 56px toolbar 遮挡。Escape 关闭菜单并返回 toggle 焦点；桌面键盘 Enter 后链接焦点保留。

维持三档导航布局；没有调整 rail、二级栏背景、Header、卡片、Grid 模板、间距、padding、圆角、字号、主题或搜索浮层。

## 12. 普通 view 回归

3D：5 sections / 47 resources；software：8 / 38；music-study：4 / 12。资源集合与顺序逐项一致，仍为普通 section 目录，没有 art tree。

Blender 10 条 relatedResources 展开正常。资源 renderer 的 createResource、相关资源、secondary、reviewNotes、无 URL 语义和长文本 focus 逻辑未修改。首页与 legacy 未重构。

## 13. 数据不变性

实施前记录全部现有项目文件 SHA-256。核对后只有三份指定运行文件变化，其他已有文件完全不变，工作区此前修改保留。

正式指标保持：470 entities、498 sources、11 mergedSources、17 retired、20 views、463 activeURLs、11 NO_ACTIVE_URL、43 corrections、21 relatedResources edges、14 legacyPages、165 art mappings、209 internalLinks。

catalog、navigation data、migration、corrections、retired、relatedResources、资源 URL 等未修改。

## 14. 检查结果

- `node scripts/validate.mjs`：PASS。
- `node --check js/navigation.js`：PASS。
- `node --check js/render-resources.js`：PASS。
- `git diff --check`：PASS。
- 真实浏览器 64 项 art 目标验证、五种尺寸交互、history、搜索、授权、普通 view 回归：PASS。

已完成 art 导航迁移与正文重复导航清理。未 commit，未 push。
