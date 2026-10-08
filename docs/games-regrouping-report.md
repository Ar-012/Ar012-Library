# 日常与生活 → 游戏重组实施报告

实施日期：2026-10-05

实施对象：`data/navigation.js` 中 view key 为 `games` 的结构，以及 3DM、Steam 的两个单向 `relatedResources`

实施依据：`docs/daily-life-overview-audit.md`、`docs/games-resource-audit.md` 与用户确认的最终方案

限制：本轮未联网；未修改其他 view 的结构；未处理额外数据质量问题；未新增 UI、CSS、JS、HTML 或交互；未 commit；未 push。

## 1. 修改前结构

实施前 `games` 有 7 个 section、30 个资源引用、30 个唯一 ID：

| 顺序 | section | 数量 |
|---:|---|---:|
| 1 | 互动小游戏 | 1 |
| 2 | 游戏社区/攻略 | 6 |
| 3 | 游戏下载 | 2 |
| 4 | MOD下载 | 5 |
| 5 | 官方网站 | 6 |
| 6 | 游戏购买 | 5 |
| 7 | 其他资源 | 5 |

主要问题是“游戏社区/攻略”混合媒体、攻略、社区和综合下载，“官方网站”与“其他资源”不能准确表达组内用途。

## 2. 修改后八组结构

实施后 `games` 有 8 个 section，仍为 30 个资源引用、30 个唯一 ID：

| 顺序 | section | 数量 | 变化 |
|---:|---|---:|---|
| 1 | 互动小游戏 | 1 | 原样保留 |
| 2 | 资讯与攻略 | 3 | 从原“游戏社区/攻略”提取媒体与攻略入口 |
| 3 | 玩家社区 | 2 | 从原“游戏社区/攻略”提取社区入口 |
| 4 | 游戏下载 | 3 | 原两项保留，加入3DM |
| 5 | MOD 与补丁 | 5 | 原“MOD下载”五项整体改名 |
| 6 | 游戏平台与商店 | 6 | 原“官方网站”六项整体改名 |
| 7 | 购买与优惠 | 5 | 原“游戏购买”五项整体改名 |
| 8 | 资料与查询 | 5 | 原“其他资源”五项整体改名 |

最终数量严格为 `1 / 3 / 2 / 3 / 5 / 6 / 5 / 5`。

为兼容现有 migration section 标题，仅在必要的新 section 设置 `previousTitles`：

- 资讯与攻略、玩家社区、游戏下载：追溯“游戏社区/攻略”
- MOD 与补丁：追溯“MOD下载”
- 游戏平台与商店：追溯“官方网站”
- 购买与优惠：追溯“游戏购买”
- 资料与查询：追溯“其他资源”

## 3. 八组完整资源清单与 ID

### 3.1 互动小游戏（1）

1. It's Adoorable — `res-baf622d2b50c`

### 3.2 资讯与攻略（3）

1. 游民星空 — `res-597e0d6992d2`
2. 游侠攻略 — `res-a279f861f6aa`
3. IGN中国 — `res-07c130430e1c`

### 3.3 玩家社区（2）

1. 其乐Keylol — `res-0b2c7e6d8348`
2. NGA玩家社区 — `res-27a56307e731`

### 3.4 游戏下载（3）

1. 3DM — `res-0c78ece82080`
2. Gamer520（仅供学习）— `res-f40af01b4876`
3. 1LOU（仅供学习）— `res-26efb6488262`

### 3.5 MOD 与补丁（5）

1. 3DM MOD站 — `res-c619a3f5aaaa`
2. 游侠补丁 — `res-f4bcc11a5817`
3. Nexus Mods — `res-39d5fb06b8f9`
4. Mod DB — `res-6573c42d45b0`
5. Steam创意工坊 — `res-b05a90020690`

### 3.6 游戏平台与商店（6）

1. Ubisoft — `res-f0c8b430c2cf`
2. Steam — `res-882fd7527ef0`
3. Epic Games Store — `res-215f7a9368ce`
4. GOG — `res-a64307bca0d1`
5. Origin/EA App — `res-1de799c618db`
6. Xbox — `res-5f8a223f9113`

### 3.7 购买与优惠（5）

1. SteamPY — `res-2a3e5c56f461`
2. CDKEY No Gap — `res-f7478d75cebd`
3. Humble Bundle — `res-7292d666d261`
4. Fanatical — `res-c7fcd660aca2`
5. IsThereAnyDeal — `res-090783dfb634`

### 3.8 资料与查询（5）

1. Steam Database — `res-904869b055cb`
2. HowLongToBeat — `res-5c6453057fed`
3. OpenCritic — `res-c93e7faa4f75`
4. Metacritic — `res-08761e40b186`
5. PCGamingWiki — `res-751a6d512a90`

清单检查：共 30 项、30 个唯一 ID；修改前后的 ID 集合完全一致，没有新增、删除、重复或悬空引用。

## 4. 3DM 移动依据

3DM `res-0c78ece82080` 从“游戏社区/攻略”移动到“游戏下载”。现有 description 为“游戏下载、攻略、汉化补丁”，明确是多用途实体；确认方案按其主要用途“游戏下载”放置。

仅修改 navigation 引用位置，没有修改 3DM 的 name、description、URL、type、links、tags、topics、contexts 或 sources。它仍通过原 section 的 `previousTitles` 保持 migration 可追溯。

## 5. section 重命名依据

- **资讯与攻略**：游民星空、IGN中国偏媒体资讯，游侠攻略以攻略为主；不再与玩家社区混放。
- **玩家社区**：其乐Keylol、NGA的主要用途均为玩家讨论；其乐的折扣信息是次要用途。
- **MOD 与补丁**：组内还包含补丁、修改器、创意工坊、社区与独立游戏信息，“MOD下载”覆盖不足。
- **游戏平台与商店**：六项主要是官方平台、数字商店、启动/管理入口或发行商生态，而不是泛化官网。
- **购买与优惠**：同时覆盖 Key、Bundle、交易、折扣和价格追踪，比“游戏购买”更完整。
- **资料与查询**：五项都用于玩家侧数据库、时长、评分或运行资料查询，“其他资源”不再需要。

没有新增 Tab、组件或交互；现有普通 section 渲染会自然生成八组顶部快速导航。

## 6. 两个 relatedResources 新增说明

### 6.1 3DM → 3DM MOD站

`res-0c78ece82080.relatedResources` 新增：

```text
res-c619a3f5aaaa
```

依据：3DM 是综合主站，3DM MOD站的 description 明确写明“3DM旗下的MOD分享平台”，URL 为 `mod.3dmgame.com`，属于主站 → 专门子站。

没有添加反向关系。

### 6.2 Steam → Steam创意工坊

`res-882fd7527ef0.relatedResources` 新增：

```text
res-b05a90020690
```

依据：Steam 是平台实体，Steam创意工坊的 description 明确为“Steam官方MOD平台”，属于平台 → 官方专门入口。

没有添加反向关系。

两个实体原本都没有 `relatedResources` 数组，因此不存在覆盖已有关系的情况。

## 7. 明确未新增的关系

基线逐边检查确认，games 相关新增边只有上一节两条。没有新增：

- 游侠攻略 → 游侠补丁：两者是同平台专门栏目，游侠攻略不是总主站。
- Steam → Steam Database：Steam Database 是第三方数据站。
- Steam → SteamPY：SteamPY 是第三方交易入口。
- Steam → Epic Games Store：二者是竞争平台。
- OpenCritic ↔ Metacritic：二者是同类评分网站。
- 任何反向关联。
- 任何同类网站、竞品或第三方站点关系。

## 8. 跨 view 共享验证

重组后 games 仍只有三项当前同 ID 跨 view 共享：

| ID | 名称 | games 位置 | 共享位置 |
|---|---|---|---|
| `res-882fd7527ef0` | Steam | 日常与生活 → 游戏 → 游戏平台与商店 | 设备与环境 → 软件 → 游戏平台 |
| `res-215f7a9368ce` | Epic Games Store | 日常与生活 → 游戏 → 游戏平台与商店 | 设备与环境 → 软件 → 游戏平台 |
| `res-751a6d512a90` | PCGamingWiki | 日常与生活 → 游戏 → 资料与查询 | 设备与环境 → 系统与设备 → 游戏运行与优化 |

- 三项原共享均保持不变。
- 其余 27 项未新增跨 view 共享。
- MOD 类没有共享到游戏制作。
- 媒体与攻略没有共享到游戏设计。

## 9. catalog 数量与字段验证

| 检查 | 结果 |
|---|---|
| catalog 实体总数 | 488，未变化 |
| 新增实体 | 0 |
| 删除实体 | 0 |
| 3DM 的变化 | 只新增指定 relatedResources |
| Steam 的变化 | 只新增指定 relatedResources |
| 其他 486 个实体 | 逐字段完全不变 |

30 个 games catalog ID 的集合完全未增减。

## 10. 未处理的数据质量问题

以下既有问题按要求保持原状：

- Gamer520（仅供学习）和1LOU（仅供学习）的 name、空 description 与 URL 均未修改。
- Origin/EA App 的混合新旧品牌名称、description、旧 Origin URL 与 links 均未修改。
- Steam description 中“全球最大的”保持不变。
- Nexus Mods description 中“国外老牌”保持不变。
- 既有 link-check 中 1LOU 的 DNS 异常，以及其他 403、超时、协议错误均未处理。
- 没有联网复核任何入口。

## 11. 其他 view、legacy 与 migration 不变性

基于实施前快照逐结构比较：

- 除 `games` 外的其他 19 个 view 完全不变。
- 四大区顶层 `AR_NAVIGATION` 完全不变。
- `games` 的 area、title 和 view key 保持不变。
- `data/legacy.js` 与本轮基线逐字节一致，14 个 legacy 页面继续可解析。
- `docs/migration-map.json` 与本轮基线逐字节一致，498 个 source 追踪未丢失。
- `scripts/validate.mjs` 与本轮基线逐字节一致，没有为通过验证而修改规则。

## 12. validate 结果

执行：

```text
node scripts/validate.mjs
```

结果：`PASS`

```json
{
  "result": "PASS",
  "sources": 498,
  "entities": 488,
  "mergedSources": 10,
  "views": 20,
  "legacyPages": 14,
  "activeURLs": 481,
  "confirmedCorrections": 9,
  "urlLessRecords": 11,
  "internalLinks": 209
}
```

`git diff --check`：通过，无空白错误。

## 13. 浏览器验证结果

本轮浏览器验证 **未执行**。

本机有 `npx`，但没有本地或全局安装 `@playwright/cli`；仅使用本地 npm 缓存离线解析时返回 `ENOTCACHED`。用户禁止联网，因此没有下载或安装依赖，也没有启动 1440px / 390px 浏览器测试。

以下项目本轮没有宣称通过：

- 八组快速导航的实机显示
- 30 张卡片的浏览器渲染
- 两个 relatedResources 的浏览器展开交互
- 响应式横向溢出
- JavaScript pageerror

没有引用旧测试结果。静态数据和通用关联渲染机制由 validator 验证，但不替代实机浏览器检查。

## 14. 本轮文件变更

本轮实际修改：

- `data/navigation.js`：只重组 `games` 的 section。
- `data/catalog.js`：只为 3DM、Steam 新增指定的单向 `relatedResources`。
- `docs/games-regrouping-report.md`：本报告。

本轮未修改其他 view、顶层导航、legacy、migration-map、validator、旧资源快照、旧 HTML、UI、CSS、运行时 JS 或其他 catalog 字段。

## 15. Git diff / status 摘要

相对于本轮开始时保存的独立文件快照：

- `data/navigation.js` 的差异只位于 `games` view。
- `data/catalog.js` 的差异只有两个 `relatedResources` 数组。
- legacy、migration-map、validator 无差异。
- 新增本报告。

仓库在本轮开始前已经存在大量已修改和未跟踪文件；本轮没有清理、回退或覆盖这些既有改动。由于 `data/catalog.js` 与 `docs/` 在当前整体工作树中原本已属于未跟踪路径，普通 Git diff 不能完整显示本轮内部变化；上述不变性结论来自本轮开始前快照的逐字段/逐字节比较。

未 commit，未 push。
