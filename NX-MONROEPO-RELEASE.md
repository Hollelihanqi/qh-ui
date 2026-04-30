# Nx Monorepo 鍙戝竷鎸囧崡

鏈枃妗ｈ缁嗚鏄庡浣曞湪 monorepo 椤圭洰涓娇鐢?Nx 杩涜鍖呯殑鍙戝竷绠＄悊锛屽熀浜?`@hd/custom` UI 缁勪欢搴撻」鐩疄璺点€?

## 鐩綍

- [椤圭洰缁撴瀯](#椤圭洰缁撴瀯)
- [鍓嶆彁鏉′欢](#鍓嶆彁鏉′欢)
- [閰嶇疆鏂囦欢璇存槑](#閰嶇疆鏂囦欢璇存槑)
- [鍙戝竷娴佺▼](#鍙戝竷娴佺▼)
- [甯歌闂](#甯歌闂)
- [鏈€浣冲疄璺礭(#鏈€浣冲疄璺?

## 椤圭洰缁撴瀯

```bash
hd-test-ui/
鈹溾攢鈹€ packages/
鈹?  鈹溾攢鈹€ hd-custom/          # 涓昏鍙戝竷鍖?
鈹?  鈹溾攢鈹€ theme-chalk/         # 鏍峰紡鍖?
鈹?  鈹斺攢鈹€ share/          # 宸ュ叿鍖?
鈹溾攢鈹€ internal/
鈹?  鈹溾攢鈹€ build/              # 鏋勫缓鑴氭湰
鈹?  鈹溾攢鈹€ build-constants/    # 鏋勫缓甯搁噺
鈹?  鈹溾攢鈹€ build-utils/        # 鏋勫缓宸ュ叿
鈹?  鈹斺攢鈹€ resolvers/         # 瑙ｆ瀽鍣?
鈹溾攢鈹€ nx.json                 # Nx 閰嶇疆
鈹斺攢鈹€ package.json           # 椤圭洰閰嶇疆
```

### 鍖呰鏄?

1. **@hd/custom**
   - 涓昏鐨?UI 缁勪欢搴撳寘
   - 褰撳墠鐗堟湰锛?.0.0-beta.x
   - 鍙戝竷鐩綍锛歞ist/hd-custom

2. **theme-chalk**
   - UI 缁勪欢鐨勬牱寮忓寘
   - 鏋勫缓閰嶇疆锛歷ite.module.config.ts 鍜?vite.global.config.ts
   - 杈撳嚭浼樺寲閰嶇疆宸叉坊鍔?

3. **share**
   - 宸ュ叿鍑芥暟鍖?
   - 琚富鍖呬緷璧?
   - 闇€瑕佸湪涓诲寘鏋勫缓鍓嶆瀯寤?

## 鍓嶆彁鏉′欢

- Node.js >= 18
- pnpm >= 8
- nx >= 20.5.0
- git

## 鏋勫缓绯荤粺

### 1. 鏋勫缓渚濊禆鍏崇郴

```mermaid
graph TD
    A[share] --> D[@hd/custom]
    B[build-constants] --> D
    C[build-utils] --> D
    E[resolvers] --> D
```

杩欏氨鏄负浠€涔堟垜浠殑 prebuild 鑴氭湰浼氶鍏堟瀯寤鸿繖浜涗緷璧栵細

```json
{
  "prebuild": "npx nx run-many -t build -p share,internal-build-constants,internal-build-utils,internal-resolvers"
}
```

### 2. 缂撳瓨鏈哄埗

褰撳墠椤圭洰浣跨敤浜?Nx 鐨勭紦瀛樻満鍒讹紝鍦?nx.json 涓厤缃細

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true,
      "inputs": ["production", "^production"]
    }
  },
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "!{projectRoot}/**/node_modules/**/*"],
    "production": [
      "default",
      "!{projectRoot}/**/*.test.ts",
      "!{projectRoot}/**/*.spec.ts",
      "!{projectRoot}/tsconfig.spec.json",
      "!{projectRoot}/.eslintrc.json"
    ]
  }
}
```

缂撳瓨鍛戒腑鏃朵細鏄剧ず锛?

```bash
鉁?nx run share:build [existing outputs match the cache, left as is]
```

### 3. 鏋勫缓浼樺寲

theme-chalk 鐨勬瀯寤鸿緭鍑轰紭鍖栵紙vite.module.config.ts锛夛細

```js
{
  build: {
    reportCompressedSize: false,
    cssTarget: false
  }
}
```

## 鍙戝竷閰嶇疆璇﹁В

### 1. nx.json 鍙戝竷閰嶇疆

```json
{
  "release": {
    "projectsRelationship": "independent",
    "releaseTagPattern": "v{version}",
    "changelog": {
      "workspaceChangelog": true,
      "projectChangelogs": true,
      "changelogPath": "CHANGELOG.md",
      "format": {
        "commitMessage": true,
        "types": [
          { "type": "feat", "section": "Features" },
          { "type": "fix", "section": "Bug Fixes" },
          { "type": "chore", "section": "Chores" },
          { "type": "docs", "section": "Documentation" },
          { "type": "style", "section": "Styles" },
          { "type": "refactor", "section": "Code Refactoring" },
          { "type": "perf", "section": "Performance Improvements" },
          { "type": "test", "section": "Tests" }
        ]
      }
    },
    "version": {
      "git": {
        "commitMessage": "chore(release): publish v${version}",
        "push": true,
        "tag": true
      }
    }
  }
}
```

杩欎釜閰嶇疆涓撻棬閽堝 `@hd/custom` 鍖呯殑鍙戝竷锛岀‘淇濓細

- 鐗堟湰鐙珛绠＄悊
- 鑷姩鍒涘缓瑙勮寖鐨?git tag
- 鑷姩鐢熸垚鍙樻洿鏃ュ織
  - 鏀寔宸ヤ綔鍖哄拰椤圭洰绾у埆鐨?changelog
  - 鏍规嵁鎻愪氦绫诲瀷鑷姩鍒嗙被
  - 淇濆瓨鍒?CHANGELOG.md 鏂囦欢
- 鑷姩鎻愪氦鍜屾帹閫?

### Changelog 鐢熸垚璇存槑

鍙樻洿鏃ュ織浼氭牴鎹?git commit 淇℃伅鑷姩鐢熸垚锛屾敮鎸佷互涓嬬被鍨嬶細

- `feat`: 鏂板姛鑳?
- `fix`: Bug 淇
- `chore`: 鏋勫缓/宸ュ叿閾?渚濊禆绛変慨鏀?
- `docs`: 鏂囨。鏇存柊
- `style`: 浠ｇ爜鏍煎紡淇敼
- `refactor`: 浠ｇ爜閲嶆瀯
- `perf`: 鎬ц兘浼樺寲
- `test`: 娴嬭瘯鐩稿叧

涓轰簡纭繚 changelog 姝ｇ‘鐢熸垚锛屾彁浜や俊鎭繀椤婚伒寰?Conventional Commits 瑙勮寖锛?

```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

渚嬪锛?

```bash
feat(button): add size prop to Button component
fix(input): resolve input blur event not firing
docs(readme): update installation instructions
```

### 2. 鍙戝竷鑴氭湰瑙ｆ瀽

```json
{
  "scripts": {
    "check-git": "git diff-index --quiet HEAD || (echo '鍙戠幇鏈彁浜ょ殑浠ｇ爜鏀瑰姩锛岃鍏堟墽琛?pnpm commit 鎻愪氦浠ｇ爜' && exit 1)",
    "update-version": "npx nx release version --projects=@hd/custom",
    "commit-version": "git add packages/hd-custom/package.json && git commit -m \"chore(release): update package version\" || true",
    "build-after-version": "pnpm build",
    "publish-custom": "cd dist/hd-custom && npm publish",
    "push-tags": "git push origin --tags && git push",
    "release:ui": "pnpm check-git && pnpm update-version && pnpm commit-version && pnpm build-after-version && pnpm publish-custom && pnpm push-tags"
  }
}
```

鑴氭湰鎵ц椤哄簭璇存槑锛?

1. `check-git`: 纭繚宸ヤ綔鍖哄共鍑€
2. `update-version`: 浣跨敤 nx 鏇存柊鐗堟湰鍙?
3. `commit-version`: 鎻愪氦鐗堟湰鏇存柊锛堜富瑕佹槸 package.json 鐨勫彉鏇达級
4. `build-after-version`: 鎵ц瀹屾暣鏋勫缓娴佺▼
   - 棣栧厛鎵ц prebuild 鏋勫缓渚濊禆
   - 鐒跺悗鏋勫缓涓诲寘
5. `publish-custom`: 鍙戝竷鏋勫缓浜х墿
6. `push-tags`: 鎺ㄩ€?tag 鍜屼唬鐮?

## 鍙戝竷娴佺▼

### 1. 鍑嗗宸ヤ綔

```bash
# 纭 npm registry
npm config get registry
# 搴旇杈撳嚭: https://registry.npmjs.org/

# 纭鐧诲綍鐘舵€?
npm whoami

# 鎻愪氦鎵€鏈夋洿鏀?
pnpm commit
```

### 2. 鎵ц鍙戝竷

```bash
pnpm release:ui
```

### 3. 鐗堟湰鍙风鐞?

褰撳墠椤圭洰浣跨敤 beta 鐗堟湰鍙凤紝濡傦細2.0.0-beta.15

鐗堟湰鍙烽€掑瑙勫垯锛?

- beta 鐗堟湰锛?.0.0-beta.x 閫掑 x
- 姝ｅ紡鐗堟湰锛?.0.0 閬靛惊璇箟鍖栫増鏈鑼?

## 甯歌闂

### 1. 鍙戝竷澶辫触澶勭悊

濡傛灉鍙戝竷杩囩▼涓嚭鐜伴敊璇細

```bash
# 娓呯悊缂撳瓨
pnpm clean:cache

# 閲嶆柊鏋勫缓
pnpm build

# 閲嶈瘯鍙戝竷
pnpm release:ui
```

### 2. 鐗堟湰鍙峰啿绐?

濡傛灉閬囧埌鐗堟湰鍙峰啿绐侊細

```bash
# 鏌ョ湅褰撳墠 tag
git tag

# 鍒犻櫎鏈夐棶棰樼殑 tag
git tag -d <tag-name>
git push origin :refs/tags/<tag-name>
```

### 3. 鏈彁浜ょ殑鏇存敼

濡傛灉鎻愮ず鏈夋湭鎻愪氦鐨勬洿鏀癸細

```bash
# 鏌ョ湅鐘舵€?
git status

# 鎻愪氦鏇存敼
pnpm commit
```

## 鏈€浣冲疄璺?

1. **鎻愪氦瑙勮寖**
   - 浣跨敤 commitizen 瑙勮寖鎻愪氦淇℃伅
   - 淇濇寔鎻愪氦绮掑害鍚堥€?
   - 纭繚鎻愪氦淇℃伅娓呮櫚鏄庝簡

2. **鐗堟湰绠＄悊**
   - Beta 鐗堟湰锛?.0.0-beta.x
   - 姝ｅ紡鐗堟湰锛?.0.0
   - 姣忔鍙戝竷鍓嶇‘璁ょ増鏈彿閫掑姝ｇ‘

3. **鏋勫缓浼樺寲**
   - 鍒╃敤 Nx 鐨勭紦瀛樻満鍒舵彁鍗囨瀯寤烘晥鐜?
   - 閫傚綋閰嶇疆 `reportCompressedSize` 鍜?`cssTarget` 鎺у埗鏋勫缓杈撳嚭
   - 瀹氭湡娓呯悊缂撳瓨閬垮厤鏋勫缓闂

4. \*_鍙戝竷妫€鏌ユ竻鍗?_
   - [ ] 鎵€鏈変唬鐮佸凡鎻愪氦
   - [ ] 娴嬭瘯宸查€氳繃
   - [ ] 鏂囨。宸叉洿鏂?
   - [ ] 鐗堟湰鍙风鍚堥鏈?
   - [ ] npm registry 閰嶇疆姝ｇ‘

## 娉ㄦ剰浜嬮」

1. 纭繚 npm registry 閰嶇疆姝ｇ‘锛?

```bash
npm config set registry https://registry.npmjs.org/
```

2. 纭繚鏈夊彂甯冩潈闄愶細

```bash
npm whoami
```

3. 淇濇寔宸ヤ綔鐩綍骞插噣锛?

```bash
git status
```

4. 瀹氭湡妫€鏌ュ苟娓呯悊缂撳瓨锛?

```bash
pnpm clean:cache
```

## 鐩稿叧鍛戒护鍙傝€?

```bash
# 鏌ョ湅椤圭洰缂撳瓨鐘舵€?
npx nx show projects --with-target build

# 鏌ョ湅鍙楀奖鍝嶇殑椤圭洰
npx nx show projects --affected

# 娓呯悊鏋勫缓缂撳瓨
pnpm clean:cache

# 鏋勫缓骞舵煡鐪嬭缁嗘棩蹇?
pnpm build:verbose
```

## 閰嶇疆浼樺寲寤鸿

1. **缂撳瓨閰嶇疆**

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true,
      "inputs": ["production", "^production"]
    }
  }
}
```

2. **鏋勫缓杈撳嚭浼樺寲**

```js
{
  build: {
    reportCompressedSize: false,
    cssTarget: false
  }
}
```

## 鏋勫缓杈撳嚭璇存槑

鏋勫缓瀹屾垚鍚庣殑鐩綍缁撴瀯锛?

```bash
dist/hd-custom/
鈹溾攢鈹€ es/                    # ES 妯″潡
鈹溾攢鈹€ theme-chalk/           # 鏍峰紡鏂囦欢
鈹溾攢鈹€ resolvers/            # 瑙ｆ瀽鍣?
鈹溾攢鈹€ package.json          # 鍖呴厤缃?
鈹斺攢鈹€ README.md            # 璇存槑鏂囨。
```

## 鏇存柊鍘嗗彶

| 鏃ユ湡     | 鐗堟湰 | 鏇存柊鍐呭                                         |
| ---------- | ------ | --------------------------------------------------- |
| 2024-03-xx | 1.0.0  | 鍒濆鐗堟湰锛屽熀浜?@hd/custom 2.0.0-beta.15 瀹炶返 |

## 鍙傝€冭祫鏂?

- [Nx 瀹樻柟鏂囨。](https://nx.dev/)
- [璇箟鍖栫増鏈琞(https://semver.org/lang/zh-CN/)
- [Commitizen](https://github.com/commitizen/cz-cli)
