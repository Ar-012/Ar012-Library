# 音频与视频信息架构整理报告

日期：2026-10-04。依据现有审计和用户指定方案，仅重组18项资源并新增MuseScore关联。未联网、未 commit、未 push。

## 整理前后

| 原section | 数量 |
| --- | ---: |
| 音效 | 5 |
| 音乐制作 | 11 |
| 视频制作 | 2 |

| 新section | 数量 |
| --- | ---: |
| 音频素材 | 5 |
| 音频制作工具 | 8 |
| 音频社区 | 3 |
| 视频工具 | 2 |

## 四组完整清单

### 音频素材

| 名称 | catalog ID |
| --- | --- |
| Freesound | `res-a52cf5ddd10b` |
| Artlist | `res-d7eb5223b94b` |
| Sonniss GameAudioGDC | `res-081fc086a730` |
| 爱给网_音效配乐 | `res-b2d8bb124ac1` |
| soundsnap | `res-c9e943cc2f82` |

### 音频制作工具

| 名称 | catalog ID |
| --- | --- |
| jsfxr | `res-4936c36df3f4` |
| FMOD | `res-9f9c9e89ce78` |
| MuseScore | `res-af8ef348cd3d` |
| Ableton Live | `res-b939645bed96` |
| REAPER | `res-75ae98f287b2` |
| Audacity | `res-d130cc2e9c59` |
| Spitfire LABS | `res-6ef506a8e309` |
| Native Instruments | `res-efe4c2b50a33` |

### 音频社区

| 名称 | catalog ID |
| --- | --- |
| VI-Control 社区 | `res-f8db0988b3a0` |
| KVR Audio 论坛 | `res-66f28f89c243` |
| Gearspace | `res-20dbab3b0c2f` |

### 视频工具

| 名称 | catalog ID |
| --- | --- |
| OBS Studio | `res-5cc0e67257c0` |
| 万兴优转 | `res-0f267a098943` |

## 18项集合完整性

写入前比较审计清单、原navigation及拟定四组：18个ID集合完全一致。新四组5/8/3/2，共18个引用、18个唯一ID，无遗漏、重复或隐藏，每项恰好出现一次。catalog仍489实体。

逐实体比较确认：仅MuseScore新增relatedResources，其他488实体逐字段不变；MuseScore原有字段也不变。所有name、description、URL、links、tags/topics及ID保持不变。

## 游戏制作与设备共享

游戏制作navigation逐字段不变，原6项共享保留：

| 资源 | ID | 音频与视频新组 | 游戏制作原组 |
| --- | --- | --- | --- |
| Freesound | `res-a52cf5ddd10b` | 音频素材 | 音频资源 |
| Artlist | `res-d7eb5223b94b` | 音频素材 | 音频资源 |
| Sonniss GameAudioGDC | `res-081fc086a730` | 音频素材 | 音频资源 |
| 爱给网_音效配乐 | `res-b2d8bb124ac1` | 音频素材 | 音频资源 |
| jsfxr | `res-4936c36df3f4` | 音频制作工具 | 制作工具 |
| FMOD | `res-9f9c9e89ce78` | 音频制作工具 | 制作工具 |

设备与环境navigation逐字段不变，原7项共享保留：MuseScore（res-af8ef348cd3d）、OBS Studio（res-5cc0e67257c0）、Ableton Live（res-b939645bed96）、REAPER（res-75ae98f287b2）、Audacity（res-d130cc2e9c59）、Spitfire LABS（res-6ef506a8e309）、Native Instruments（res-efe4c2b50a33）。未新增FMOD、万兴优转或jsfxr的设备区引用。

## MuseScore关联

MuseScore（`res-af8ef348cd3d`）新增：

```js
relatedResources: ["res-5c80faa79378"]
```

仅引用现有MuseScore 乐谱社区，不复制字段，不建立反向关联。目标仍在学习与研究→音乐独立显示，未加入音频与视频navigation；该关联不计作view共享。原有展开组件未修改，其他关联未变。

## 其他view及边界

音频与视频之外19个view、四大区域导航逐字段不变。与AI共享仍为0，Suno、Runway没有加入音频与视频。没有新增跨view共享。

音频制作工具按用户规则兼容DAW、乐谱、音效生成、中间件、虚拟乐器与制作生态，不再细拆；三项社区留在工作区，不移动到学习；视频工具即使仅两项也独立保留，万兴优转的音视频两用性不改变本轮指定位置。

## 文件变更

- 修改 data/navigation.js：仅音频与视频四组；previousTitles保留旧组名称供历史迁移校验，页面只显示新组名。
- 修改 data/catalog.js：仅MuseScore关联ID数组。
- 新增 docs/audio-video-regrouping-report.md。

无文件删除。未修改UI/CSS/JS/HTML、关联组件、审计/迁移文档或校验脚本，继续使用普通section、四项快速导航与原响应式布局。

## 发现但未处理问题

按照本轮要求，Gearspace历史URL、万兴优转media.io入口、主观及授权文案、旧tags/topics、type字段均保持原样。未调查网站有效性、版本或授权，未发现需要扩大范围的新问题。授权页既有favicon请求404未处理，不属于JavaScript pageerror。

## 浏览器验证与校验

- Playwright 72组通过：1440px、390px各覆盖20view、14旧入口和美术另外两个领域。主卡片ID集合、名称、描述与URL/null渲染与数据一致，无遗漏、重复。
- 顶部显示四组新导航。MuseScore默认收起，可展开/收起乐谱社区；目标没有新增到本view，且在音乐学习view仍有独立卡片。
- 两种宽度无横向溢出、零JavaScript pageerror；已查看桌面和手机展开截图。首次连接时本地服务器未运行，启动后完整回归通过。
- node scripts/validate.mjs通过：489实体、498历史来源、20view、14旧入口、209内部引用。git diff --check通过。
- 文件SHA-256核对：仅两份数据文件及本报告变化。Art Notes、Music Library无新增、删除或修改；三仓库HEAD及Git配置不变。未 commit、未 push。

## Git diff/status摘要

- 本轮 data/catalog.js：+3 / -0 行。
- 本轮 data/navigation.js：+24 / -6 行。
- 新增本报告，无删除。下列Git统计包含所有既有未提交阶段，未跟踪文件内容不计入diff，不代表本轮单独差异。

```text
 3d-art.html                   |    7 +-
 ai-art.html                   |    7 +-
 concept-art.html              |    7 +-
 costume-fashion-design.html   |    7 +-
 css/resource-page.css         |   34 +
 daily-essentials.html         |    7 +-
 data/navigation.js            | 1663 +++++++++++++++++++++++++++++++++++++++--
 data/pages.js                 |   28 +-
 development.html              |    7 +-
 game-design.html              |    7 +-
 games.html                    |    7 +-
 gun-design-reference.html     |    7 +-
 history.html                  |    7 +-
 index.html                    |   22 +-
 installation-software.html    |    7 +-
 js/navigation.js              |    8 +-
 js/render-resources.js        |  194 ++++-
 video-film.html               |    7 +-
 visual-communication.html     |    7 +-
 work-tools-collaboration.html |    7 +-
 20 files changed, 1953 insertions(+), 94 deletions(-)
```

```text
 M 3d-art.html
 M ai-art.html
 M concept-art.html
 M costume-fashion-design.html
 M css/resource-page.css
 M daily-essentials.html
 M data/navigation.js
 M data/pages.js
 M development.html
 M game-design.html
 M games.html
 M gun-design-reference.html
 M history.html
 M index.html
 M installation-software.html
 M js/navigation.js
 M js/render-resources.js
 M video-film.html
 M visual-communication.html
 M work-tools-collaboration.html
?? data/catalog.js
?? data/configuration.schema.json
?? data/legacy.js
?? data/resources/README.md
?? docs/
?? js/catalog-view.js
?? library.html
?? output/
?? scripts/
```
