# HD 缁勪欢搴撳紑鍙戞枃妗?

HD 缁勪欢搴撴槸鍩轰簬 Element Plus 灏佽鐨勪笟鍔＄粍浠跺簱锛屼娇鐢?Vue 3銆乀ypeScript銆乂ite 鍜?pnpm workspace 绠＄悊婧愮爜銆佹枃妗ｃ€佽皟璇曞伐绋嬩笌鍐呴儴鏋勫缓宸ュ叿銆?

## 椤圭洰缁撴瀯

```text
hd/
鈹溾攢鈹€ dist/                 # 鏋勫缓杈撳嚭
鈹溾攢鈹€ docs/                 # VitePress 鏂囨。绔欑偣
鈹溾攢鈹€ internal/             # 鍐呴儴鏋勫缓宸ュ叿銆佸父閲忓拰 resolver
鈹溾攢鈹€ packages/
鈹?  鈹溾攢鈹€ components/       # 缁勪欢婧愮爜
鈹?  鈹溾攢鈹€ directives/       # 鎸囦护婧愮爜
鈹?  鈹溾攢鈹€ hooks/            # hooks 婧愮爜
鈹?  鈹溾攢鈹€ theme-chalk/      # 涓婚鏍峰紡
鈹?  鈹溾攢鈹€ utils/            # 缁勪欢搴撳唴閮ㄥ伐鍏?鈹?  鈹溾攢鈹€ hd-custom/        # @rdeam/qui 涓诲寘鍏ュ彛
鈹?  鈹溾攢鈹€ share/         # @rdeam/qui/share 宸ュ叿鍖?鈹?  鈹斺攢鈹€ hd-eslint/        # @hd/eslint-config
鈹溾攢鈹€ play/                 # 鏈湴璋冭瘯宸ョ▼
鈹斺攢鈹€ scripts/              # 寮€鍙戝拰鐢熸垚鑴氭湰
```

## 甯哥敤鍛戒护

```bash
pnpm install
pnpm gen-component-import
pnpm build
pnpm play:dev
pnpm docs:dev
```

## 鏋勫缓璇存槑

`pnpm build` 浼氬厛閫氳繃 Nx 鏋勫缓鍐呴儴宸ュ叿鍖呭拰 `@rdeam/qui/share`锛屽啀杩涘叆 `internal/build2` 鎵ц缁熶竴鏋勫缓閾撅細

1. 娓呯悊 `dist/hd-custom`銆?2. 浣跨敤 Vite 鏋勫缓缁勪欢 ES 妯″潡銆?3. 鏋勫缓 `packages/theme-chalk` 涓婚鏍峰紡銆?4. 浣跨敤 `vue-tsc` 鐢熸垚绫诲瀷澹版槑銆?5. 鏋勫缓骞跺鍒?`HdCustomResolver`銆?6. 澶嶅埗 `package.json`銆乣README.md`銆乣global.d.ts` 绛夐檮鍔犳枃浠躲€?

## 鍓嶇紑閰嶇疆

缁勪欢瀵煎嚭鍚嶅墠缂€銆乂ue 娉ㄥ唽鍚嶅墠缂€銆佹牱寮忔枃浠跺悕鍓嶇紑缁熶竴閰嶇疆鍦?`internal/build-constants/src/pkg.ts`锛?

- `COMPONENT_EXPORT_PREFIX = 'Hd'`
- `COMPONENT_STYLE_PREFIX = 'hd'`

鏈潵闇€瑕佹敼缁勪欢鍚嶇О銆佸鍑哄悕绉般€佷富棰樻枃浠跺悕鎴?resolver 瑙ｆ瀽瑙勫垯鏃讹紝浼樺厛鏀硅繖閲岋紝鍐嶆墽琛岋細

```bash
pnpm gen-component-import
pnpm build
```

## 鍙戝竷鍏ュ彛

- 涓诲寘锛歚@rdeam/qui`
- 宸ュ叿鍖咃細`@rdeam/qui/share`
- ESLint 閰嶇疆锛歚@hd/eslint-config`

涓诲寘鏋勫缓浜х墿浣嶄簬 `dist/hd-custom`锛屼富棰樻枃浠朵綅浜?`dist/hd-custom/theme-chalk`銆?
