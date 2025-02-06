import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()],
  rules: [
    // 如果需要添加自定义规则可以在这里添加
  ],
  // content: {
  //   filesystem: [
  //     '*.{vue,tsx,jsx}',
  //   ]
  // }
})
