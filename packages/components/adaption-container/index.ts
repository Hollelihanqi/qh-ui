import { withInstall } from '@yto-custom/utils'
import AdaptionContainer from './src/adaption-container.vue'
import type { SFCWithInstall } from '@yto-custom/utils'
export const YtoAdaptionContainer: SFCWithInstall<typeof AdaptionContainer> = withInstall(AdaptionContainer)
export default AdaptionContainer

export * from './src/adaption-container'