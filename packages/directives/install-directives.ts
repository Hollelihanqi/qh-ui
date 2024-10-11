import { App } from 'vue'
import Copy from './copy'
import Draggable from './draggable'
import ResizeElement from './resize-element'
import ShowTip from './show-tip'
import WaterMarker from './water-marker'

export const directivesList: any = {
  Copy,
  Draggable,
  ResizeElement,
  ShowTip,
  WaterMarker,
}

export const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}
