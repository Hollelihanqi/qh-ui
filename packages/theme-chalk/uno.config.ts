import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetWind,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWind()
  ],
  transformers: [
    transformerDirectives({
      enforce: 'pre',
      applyVariable: ['@apply'],
    })
  ]
}) 
