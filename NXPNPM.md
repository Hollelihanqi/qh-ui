# PNPM Monorepo 涓?Nx 闆嗘垚鎸囧崡

鏈枃妗ｈ缁嗚鏄庝簡濡備綍鍦ㄩ」鐩腑闆嗘垚鍜屼娇鐢?PNPM Workspace 涓?Nx 鏋勫缓宸ュ叿锛屼互瀹炵幇楂樻晥鐨?monorepo 绠＄悊銆?

## 鐩綍缁撴瀯

```
.
鈹溾攢鈹€ packages/          # 鏍稿績鍖呯洰褰?
鈹?  鈹溾攢鈹€ hd-custom/   # 鑷畾涔夌粍浠跺簱
鈹?  鈹斺攢鈹€ share/    # 宸ュ叿搴?
鈹溾攢鈹€ play/             # 缁勪欢婕旂ず椤圭洰
鈹溾攢鈹€ docs/             # 鏂囨。绔欑偣
鈹溾攢鈹€ internal/         # 鍐呴儴宸ュ叿鍜屾瀯寤鸿剼鏈?
鈹溾攢鈹€ pnpm-workspace.yaml  # PNPM workspace 閰嶇疆
鈹溾攢鈹€ nx.json           # Nx 閰嶇疆鏂囦欢
鈹溾攢鈹€ package.json      # 鏍归」鐩厤缃?
鈹斺攢鈹€ .npmrc           # NPM 閰嶇疆鏂囦欢
```

## PNPM Workspace 閰嶇疆

### pnpm-workspace.yaml

```yaml
packages:
  - packages/* # 鎵€鏈夋牳蹇冨寘
  - play # 缁勪欢婕旂ず椤圭洰
  - docs # 鏂囨。绔欑偣
  - internal/* # 鍐呴儴宸ュ叿
```

杩欎釜閰嶇疆瀹氫箟浜?monorepo 鐨勫伐浣滅┖闂寸粨鏋勶紝鎸囧畾鍝簺鐩綍琚涓哄伐浣滅┖闂寸殑涓€閮ㄥ垎銆?

### .npmrc 閰嶇疆

```ini
# 宸ヤ綔绌洪棿閰嶇疆
recursive-install=true              # 閫掑綊瀹夎渚濊禆
workspace-concurrency=10            # 宸ヤ綔绌洪棿骞跺彂鏁?
child-concurrency=10               # 瀛愯繘绋嬪苟鍙戞暟
network-concurrency=20             # 缃戠粶璇锋眰骞跺彂鏁?
ignore-workspace-root-check=true   # 蹇界暐宸ヤ綔绌洪棿鏍圭洰褰曟鏌?
git-checks=false                   # 绂佺敤 Git 妫€鏌?

# 闀滃儚閰嶇疆
@hd:registry=https://registry.npmjs.org/
registry=https://registry.npmmirror.com/

# Node.js 閰嶇疆
node-options=--experimental-specifier-resolution=node
```

杩欎簺閰嶇疆浼樺寲浜嗕緷璧栧畨瑁呮€ц兘骞惰缃簡閫傚綋鐨?registry銆?

## Nx 閰嶇疆

### nx.json

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"], // 鏋勫缓鏃朵緷璧栧叧绯诲鐞?
      "cache": true // 鍚敤鏋勫缓缂撳瓨
    }
  },
  "defaultBase": "master", // 榛樿鍩哄噯鍒嗘敮
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "!{projectRoot}/**/node_modules/**/*"],
    "production": ["default"]
  }
}
```

杩欎釜閰嶇疆瀹氫箟浜嗭細

- 鏋勫缓浠诲姟鐨勪緷璧栧叧绯?
- 鏋勫缓缂撳瓨绛栫暐
- 鏂囦欢鐩戝惉鑼冨洿

### 椤圭洰绾у埆鐨?project.json

浠?hd-custom 鍖呬负渚嬶細

```json
{
  "name": "hd-custom",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/hd-custom",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm build"
      }
    },
    "version": {
      "executor": "@jscutlery/semver:version",
      "options": {
        "preset": "conventional",
        "trackDeps": true,
        "push": true,
        "postTargets": ["hd-custom:npm"]
      }
    },
    "npm": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm publish --access public",
        "cwd": "dist/hd-custom"
      }
    }
  }
}
```

## 渚濊禆绠＄悊

### 宸ヤ綔绌洪棿渚濊禆

鍦?package.json 涓娇鐢?workspace 鍗忚鏉ュ紩鐢ㄥ唴閮ㄥ寘锛?

```json
{
  "dependencies": {
    "@hd-custom/utils": "workspace:*",
    "@hd-custom/components": "workspace:^"
  }
}
```

- `workspace:*`: 鍏佽浠绘剰鐗堟湰
- `workspace:^`: 閬靛惊璇箟鍖栫増鏈?

## 甯哥敤鍛戒护

### 渚濊禆瀹夎

```bash
# 瀹夎鎵€鏈変緷璧?
pnpm install

# 鍦ㄧ壒瀹氬寘涓畨瑁呬緷璧?
pnpm add <package> --filter <workspace-name>
```

### 鏋勫缓鍛戒护

```bash
# 鏋勫缓鎵€鏈夊寘
nx run-many -t build

# 鏋勫缓鐗瑰畾鍖?
nx build hd-custom

# 鏋勫缓渚濊禆鍥句腑鍙楀奖鍝嶇殑鍖?
nx affected -t build
```

### 鍙戝竷鍛戒护

```bash
# 鍙戝竷鍖?
nx publish hd-custom

# 鐗堟湰鏇存柊
nx version hd-custom
```

## 涓轰粈涔堥€夋嫨杩欑閰嶇疆锛?

1. \*_PNPM 鐨勪紭鍔?_
   - 楂樻晥鐨勪緷璧栧瓨鍌?
   - 涓ユ牸鐨勪緷璧栫鐞?
   - 蹇€熺殑瀹夎閫熷害
   - 宸ヤ綔绌洪棿鏀寔

2. \*_Nx 鐨勪紭鍔?_
   - 鏅鸿兘鏋勫缓缂撳瓨
   - 澧為噺鏋勫缓
   - 渚濊禆鍥惧垎鏋?
   - 浠诲姟缂栨帓

3. **缁勫悎浼樺娍**
   - PNPM 澶勭悊渚濊禆绠＄悊
   - Nx 澶勭悊鏋勫缓鍜屼换鍔℃祦绋?
   - 涓よ€呬紭鍔夸簰琛ワ紝鎻愪緵瀹屾暣鐨?monorepo 瑙ｅ喅鏂规

## 鏈€浣冲疄璺?

1. **渚濊禆绠＄悊**
   - 浣跨敤 workspace 鍗忚寮曠敤鍐呴儴鍖?
   - 鏄庣‘鎸囧畾澶栭儴渚濊禆鐗堟湰
   - 浣跨敤 peerDependencies 澹版槑妗嗘灦渚濊禆

2. **鏋勫缓浼樺寲**
   - 鍒╃敤 Nx 缂撳瓨鍔犻€熸瀯寤?
   - 閰嶇疆鍚堥€傜殑渚濊禆鍏崇郴
   - 浣跨敤 affected 鍛戒护杩涜澧為噺鏋勫缓

3. **鐗堟湰鎺у埗**
   - 浣跨敤 conventional commits
   - 閰嶇疆 @jscutlery/semver 鑷姩鍖栫増鏈鐞?
   - 淇濇寔 changelog 鏇存柊

4. **CI/CD 闆嗘垚**
   - 閰嶇疆 Nx 缂撳瓨
   - 浣跨敤 affected 鍛戒护浼樺寲 CI 娴佺▼
   - 鑷姩鍖栧彂甯冩祦绋?

## 娉ㄦ剰浜嬮」

1. 纭繚 .npmrc 涓厤缃簡姝ｇ‘鐨?registry
2. 娉ㄦ剰鍖呬箣闂寸殑渚濊禆鍏崇郴锛岄伩鍏嶅惊鐜緷璧?
3. 鍚堢悊浣跨敤 Nx 缂撳瓨锛岄伩鍏嶄笉蹇呰鐨勯噸澶嶆瀯寤?
4. 閬靛惊 conventional commits 瑙勮寖锛屼究浜庤嚜鍔ㄥ寲鐗堟湰绠＄悊
5. 瀹氭湡娓呯悊鏋勫缓缂撳瓨锛岄伩鍏嶅崰鐢ㄨ繃澶氱鐩樼┖闂?

## 鏋勫缓渚濊禆涓庢墦鍖呭叧绯?

### 宸ヤ綔绌洪棿缁撴瀯璁捐

1. \*_鏍稿績鍖呰璁?_

```
packages/
鈹溾攢鈹€ hd-custom/        # 缁勪欢搴撲富鍖?
鈹溾攢鈹€ share/         # 宸ュ叿搴?
鈹溾攢鈹€ theme-chalk/       # 涓婚鏍峰紡鍖?
鈹斺攢鈹€ internal/          # 鍐呴儴宸ュ叿鍖?
    鈹溾攢鈹€ build/         # 涓绘瀯寤虹郴缁燂紝鍩轰簬 Gulp 鐨勬瀯寤烘祦绋?
    鈹溾攢鈹€ build-constants/ # 鏋勫缓甯搁噺瀹氫箟锛屾彁渚涙瀯寤鸿繃绋嬩腑浣跨敤鐨勫父閲忓€?
    鈹溾攢鈹€ build-utils/   # 鏋勫缓宸ュ叿鍑芥暟锛屾彁渚涙瀯寤鸿剼鏈娇鐢ㄧ殑宸ュ叿鏂规硶
    鈹溾攢鈹€ resolvers/     # 缁勪欢瑙ｆ瀽鍣紝鐢ㄤ簬鑷姩瀵煎叆缁勪欢
    鈹斺攢鈹€ metadata/      # 缁勪欢鍏冩暟鎹紝鐢ㄤ簬鏂囨。鐢熸垚鍜岀被鍨嬫彁绀?
```

2. \*_鍐呴儴宸ュ叿鍖呰鏄?_

- **build**: 鏍稿績鏋勫缓绯荤粺
  - 鍖呭惈鍩轰簬 Gulp 鐨勪换鍔″畾涔?
  - 绠＄悊鏁翠釜鏋勫缓娴佺▼
  - 澶勭悊鏂囦欢杞崲銆佹墦鍖呭拰杈撳嚭
  - 鏄瀯寤虹郴缁熺殑"鍐呭眰"鎺у埗涓績

- **build-constants**: 鏋勫缓甯搁噺
  - 瀹氫箟鍖呭悕銆佽矾寰勭瓑甯搁噺
  - 鎻愪緵鏋勫缓閰嶇疆鍙傛暟
  - 纭繚鏋勫缓杩囩▼涓殑涓€鑷存€?
  - 闆嗕腑绠＄悊鍙厤缃」

- **build-utils**: 鏋勫缓宸ュ叿鍑芥暟
  - 鎻愪緵鏂囦欢澶勭悊鍑芥暟
  - 鍖呭惈璺緞瑙ｆ瀽宸ュ叿
  - 鎻愪緵鏃ュ織鍜岄敊璇鐞?
  - 灏佽甯哥敤鐨勬瀯寤烘搷浣?

- **resolvers**: 缁勪欢瑙ｆ瀽鍣?
  - 瀹炵幇缁勪欢鐨勮嚜鍔ㄥ鍏?
  - 鏀寔 IDE 鏅鸿兘鎻愮ず
  - 涓庢墦鍖呭伐鍏烽泦鎴?
  - 浼樺寲寮€鍙戜綋楠?

- **metadata**: 鍏冩暟鎹鐞?
  - 鏀堕泦缁勪欢淇℃伅
  - 鐢熸垚 API 鏂囨。鏁版嵁
  - 鏀寔绫诲瀷鐢熸垚
  - 杈呭姪鏂囨。绔欑偣鏋勫缓

3. \*_渚濊禆鍏崇郴鍥?_

```
hd-custom
  鈹溾攢鈹€ share
  鈹溾攢鈹€ theme-chalk
  鈹斺攢鈹€ internal/*
      鈹溾攢鈹€ build 鈫?渚濊禆鍏朵粬鎵€鏈夊唴閮ㄥ寘
      鈹溾攢鈹€ build-constants
      鈹溾攢鈹€ build-utils 鈫?渚濊禆 build-constants
      鈹溾攢鈹€ resolvers
      鈹斺攢鈹€ metadata 鈫?渚濊禆 build-utils
```

### 渚濊禆绠＄悊璇﹁В

1. **宸ヤ綔绌洪棿渚濊禆澹版槑**

```json
// packages/hd-custom/package.json
{
  "name": "@hd-custom/components",
  "version": "1.0.0",
  "dependencies": {
    "@hd-custom/utils": "workspace:*", // 宸ヤ綔绌洪棿渚濊禆锛屼换鎰忕増鏈?
    "@hd-custom/theme-chalk": "workspace:^" // 宸ヤ綔绌洪棿渚濊禆锛岄伒寰涔夊寲鐗堟湰
  },
  "peerDependencies": {
    "vue": "^3.5.13" // 澶栭儴渚濊禆澹版槑
  },
  "devDependencies": {
    "@types/node": "^18.18.5", // 寮€鍙戜緷璧?
    "vite": "^5.4.10" // 鏋勫缓宸ュ叿渚濊禆
  }
}
```

2. **渚濊禆绫诲瀷璇存槑**

- `workspace:*`锛氬厑璁镐娇鐢ㄥ伐浣滅┖闂翠腑鐨勪换鎰忕増鏈紝閫傜敤浜庡紑鍙戦樁娈?
- `workspace:^`锛氶伒寰涔夊寲鐗堟湰锛岄€傜敤浜庣ǔ瀹氱増鏈?
- `peerDependencies`锛氬０鏄庢鏋朵緷璧栵紝閬垮厤閲嶅瀹夎
- `devDependencies`锛氫粎鍦ㄥ紑鍙戝拰鏋勫缓鏃朵娇鐢ㄧ殑渚濊禆

### 鏋勫缓娴佺▼璇﹁В

1. **鏋勫缓椤哄簭鎺у埗**

```json
// nx.json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"], // 纭繚渚濊禆椤瑰厛鏋勫缓
      "cache": true // 鍚敤鏋勫缓缂撳瓨
    }
  },
  "namedInputs": {
    "default": [
      "{projectRoot}/**/*", // 鐩戝惉鎵€鏈夋簮鏂囦欢
      "!{projectRoot}/**/node_modules/**/*",
      "!{projectRoot}/dist/**/*" // 鎺掗櫎鏋勫缓浜х墿
    ],
    "production": [
      "default",
      "!{projectRoot}/**/*.spec.ts" // 鎺掗櫎娴嬭瘯鏂囦欢
    ]
  }
}
```

2. \*_棰勬瀯寤洪厤缃瑙?_

```json
// root package.json
{
  "scripts": {
    "prebuild": "npx nx run-many -t build -p share,internal-build-constants,internal-build-utils,internal-resolvers",
    "build": "pnpm run -C internal/build2 build",
    "utils:build": "pnpm run -C packages/share build",
    "build:theme": "pnpm run -C packages/theme-chalk build"
  }
}
```

鏋勫缓娴佺▼璇存槑锛?

1. `prebuild` 棣栧厛鏋勫缓鍩虹渚濊禆锛?
   - share锛氬熀纭€宸ュ叿搴?
   - internal-build-constants锛氭瀯寤哄父閲?
   - internal-build-utils锛氭瀯寤哄伐鍏?
   - internal-resolvers锛氫緷璧栬В鏋愬櫒

2. 涓绘瀯寤烘祦绋嬶細

   ```bash
   # 1. 鏋勫缓宸ュ叿搴擄紙骞惰锛?
   pnpm run utils:build

   # 2. 鏋勫缓涓婚锛堜緷璧栧伐鍏峰簱锛?
   pnpm run build:theme

   # 3. 鏋勫缓缁勪欢搴擄紙渚濊禆涓婅堪鎵€鏈夛級
   pnpm run build
   ```

### 椤圭洰绾ф瀯寤洪厤缃?

1. \*_缁勪欢搴撴瀯寤洪厤缃?_

```json
// packages/hd-custom/project.json
{
  "name": "hd-custom",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "pnpm build",
        "outputs": [
          "dist/hd-custom", // 涓绘瀯寤轰骇鐗?
          "dist/types" // 绫诲瀷鏂囦欢
        ],
        "cwd": "packages/hd-custom" // 鎵ц鐩綍
      },
      "dependsOn": [
        "^build", // 渚濊禆鍏朵粬鍖呯殑鏋勫缓
        "build:theme", // 渚濊禆涓婚鏋勫缓
        {
          "projects": "dependencies", // 鑷姩璇嗗埆渚濊禆椤?
          "target": "build"
        }
      ],
      "inputs": [
        "production", // 浣跨敤鐢熶骇鐜閰嶇疆
        "{workspaceRoot}/tsconfig.json" // 鍏ㄥ眬 TypeScript 閰嶇疆
      ]
    }
  }
}
```

2. \*_宸ュ叿搴撴瀯寤洪厤缃?_

```json
// packages/share/project.json
{
  "name": "share",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "vite build",
        "outputs": ["dist/share"],
        "cwd": "packages/share"
      }
    }
  }
}
```

### 缂撳瓨鏈哄埗璇﹁В

1. **缂撳瓨閰嶇疆瀹屾暣绀轰緥**

```json
// nx.json
{
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        "cacheableOperations": ["build", "test", "lint"],
        "cacheDirectory": ".nx/cache",
        "parallel": 3,
        "remoteCache": {
          "url": "http://nx-cache.internal",
          "timeout": 30000
        }
      }
    }
  }
}
```

2. **缂撳瓨宸ヤ綔鍘熺悊**

- **杈撳叆鍝堝笇**锛?

  ```json
  "inputs": [
    "{projectRoot}/src/**/*",     // 婧愭枃浠?
    "{projectRoot}/package.json", // 椤圭洰閰嶇疆
    "{workspaceRoot}/tsconfig.json" // 鍏变韩閰嶇疆
  ]
  ```

  Nx 浼氳绠楄繖浜涙枃浠剁殑缁勫悎鍝堝笇鍊?

- \**缂撳瓨閿敓鎴?*锛?

  ```
  cache-key = hash(inputs + command + dependencies-outputs)
  ```

- **缂撳瓨瀛樺偍**锛?
  ```
  .nx/cache/
  鈹溾攢鈹€ file-hashes/      # 鏂囦欢鍝堝笇缂撳瓨
  鈹溾攢鈹€ run/              # 杩愯缁撴灉缂撳瓨
  鈹斺攢鈹€ terminalOutputs/  # 缁堢杈撳嚭缂撳瓨
  ```

3. **缂撳瓨鐢熷懡鍛ㄦ湡**

```bash
# 寮€鍙戞祦绋嬩腑鐨勭紦瀛樹娇鐢?
1. 妫€鏌ヨ緭鍏ユ枃浠跺搱甯屽€?
2. 妫€鏌ヤ緷璧栭」鏋勫缓鐘舵€?
3. 鏌ユ壘缂撳瓨鍛戒腑
4. 濡傛湭鍛戒腑锛屾墽琛屾瀯寤哄苟缂撳瓨
5. 濡傚懡涓紝鐩存帴鎭㈠缂撳瓨

# 缂撳瓨缁存姢鍛戒护
nx reset                 # 娓呴櫎鎵€鏈夌紦瀛?
nx reset hd-custom     # 娓呴櫎鐗瑰畾椤圭洰缂撳瓨
nx clean                # 娓呴櫎鏋勫缓浜х墿
```

### 鎬ц兘浼樺寲绛栫暐

1. **骞惰鏋勫缓浼樺寲**

```bash
# 鏈€澶у寲骞惰鏋勫缓
nx run-many -t build -p share,hd-custom --parallel=3

# 浣跨敤 affected 鍙瀯寤哄彉鏇?
nx affected -t build --parallel
```

2. **渚濊禆浼樺寲**

```json
{
  "dependsOn": [
    {
      "projects": "dependencies",
      "target": "build",
      "params": "forward" // 杞彂鏋勫缓鍙傛暟
    }
  ]
}
```

3. **缂撳瓨浼樺寲**

- 绮剧‘瀹氫箟 `inputs` 鍜?`outputs`
- 浣跨敤 `nx graph` 鍒嗘瀽渚濊禆
- 閰嶇疆杩滅▼缂撳瓨鍏变韩
- 瀹氭湡娓呯悊杩囨湡缂撳瓨

4. **甯歌鎬ц兘闂瑙ｅ喅**

```bash
# 鍒嗘瀽鏋勫缓鎬ц兘
nx print-affected --select=tasks

# 鏌ョ湅渚濊禆鍥?
nx graph

# 楠岃瘉缂撳瓨閰嶇疆
nx build hd-custom --skip-nx-cache=false --verbose
```

## 涓ゅ眰鏋勫缓绯荤粺

鏈」鐩噰鐢ㄤ簡涓ゅ眰鏋勫缓绯荤粺鐨勬灦鏋勶紝缁撳悎浜?Nx 鍜?Gulp 鐨勪紭鍔匡細

### 鏋勫缓绯荤粺鏋舵瀯

1. **澶栧眰**: Nx 鐢ㄤ簬浠诲姟缂栨帓鍜岀紦瀛?
   - 鎻愪緵楂樺眰娆＄殑浠诲姟缂栨帓
   - 绠＄悊鏋勫缓缂撳瓨
   - 澶勭悊椤圭洰闂寸殑渚濊禆鍏崇郴

2. **鍐呭眰**: Gulp 鐢ㄤ簬鍏蜂綋鏋勫缓娴佺▼鎺у埗
   - 绠＄悊鍏蜂綋鐨勬瀯寤烘楠?
   - 鎺у埗鏂囦欢杞崲鍜屽鐞?
   - 澶勭悊缁嗙矑搴︾殑渚濊禆鍏崇郴

### 鏋勫缓娴佺▼璇存槑

褰撴墽琛?`pnpm build` (鍗?`nx build internal-build`) 鏃讹細

1. Nx 棣栧厛妫€鏌ョ紦瀛橈紝濡傛灉鏈夊懡涓垯鐩存帴浣跨敤缂撳瓨缁撴灉
2. 濡傛灉娌℃湁缂撳瓨鍛戒腑锛孨x 鍚姩 internal-build 椤圭洰鐨勬瀯寤?
3. internal-build 椤圭洰閫氳繃 Gulp 鎵ц涓€绯诲垪浠诲姟锛?
   - 娓呯悊鏋勫缓鐩綍
   - 鏋勫缓鍩虹宸ュ叿搴?
   - 鏋勫缓涓婚鏍峰紡
   - 鐢熸垚绫诲瀷瀹氫箟
   - 鏋勫缓缁勪欢搴?
   - 澶嶅埗鍜屾暣鍚堟瀯寤轰骇鐗?

### 涓ゅ眰鏋勫缓鐨勪紭鍔?

1. \*_缁撳悎涓よ€呬紭鍔?_
   - Nx 鎻愪緵楂樻晥鐨勭紦瀛樺拰澧為噺鏋勫缓
   - Gulp 鎻愪緵鐏垫椿鐨勬瀯寤烘祦绋嬫帶鍒?

2. **骞虫粦杩囨浮**
   - 淇濈暀鐜版湁鐨勬瀯寤洪€昏緫
   - 閫愭寮曞叆 Nx 鐨勫姛鑳?
   - 闄嶄綆杩佺Щ椋庨櫓

3. \*_鏈€浣冲疄璺?_
   - 浣跨敤 Nx 绠＄悊澶у瀷浠诲姟鍜岀紦瀛?
   - 浣跨敤 Gulp 澶勭悊缁嗚妭鍜屽鏉傛祦绋?
   - 涓よ€呬紭鍔夸簰琛?

### 浣跨敤鏂瑰紡

```bash
# 鎵ц瀹屾暣鏋勫缓
pnpm build

# 娓呯悊鏋勫缓浜х墿
pnpm clean

# 鏋勫缓鐗瑰畾鍖?
pnpm utils:build
pnpm build:theme
```
