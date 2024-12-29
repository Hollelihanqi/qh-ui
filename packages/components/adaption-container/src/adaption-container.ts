import type AdaptionContainer from './adaption-container.vue'

export type AdaptionContainerProps = {
  list: Array<any>
  minWidth?: number //单个卡片最小宽度
  gap?: number //卡片间距
  minNum?: number // 最少显示几个卡片
  containerMinWidth?: number //容器最小宽度
}

export const adaptionContainerProps = withDefaults(defineProps<AdaptionContainerProps>(), {
  list: () => [],
  minWidth: 200,
  gap: 10,
  minNum: 1,
  containerMinWidth: 0,
})

export type AdaptionContainerInstance = InstanceType<typeof AdaptionContainer>