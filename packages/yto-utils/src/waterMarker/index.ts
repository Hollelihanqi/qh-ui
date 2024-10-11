/*
 * @Author: weichunpei
 * @Date: 2024-01-24 17:37:59
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-25 15:46:37
 * @Description: 增加水印
 * @param {string} text 文字
 */

export const addWaterMarker = (
  params = {
    content: '',
    elNode: '',
    font: '',
    fillStyle: '',
    rotate: -28,
    zIndex: '99999',
    width: 200,
    height: 100,
  },
) => {
  const { content, elNode, fillStyle, font, zIndex, rotate, width, height } = params
  let node: any = elNode
  if (!content) return
  if (!elNode) {
    node = document.body
  }
  if (elNode && typeof elNode === 'string') {
    node = document.querySelector(node) as HTMLElement
  }
  try {
    const can: HTMLCanvasElement = document.createElement('canvas')
    can.width = width ? width : 200
    can.height = height ? height : 100
    const cans = can.getContext('2d') as CanvasRenderingContext2D
    cans.rotate(rotate ? (rotate * Math.PI) / 180 : (-28 * Math.PI) / 180)
    cans.font = font || '14px Inter, Avenir'
    cans.fillStyle = fillStyle || 'rgba(0, 0, 0, 0.08)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle' as CanvasTextBaseline
    cans.fillText(content, 0, can.height)

    const div = document.createElement('div')
    div.classList.add('water-mark')
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = zIndex || '99999'
    div.style.width = '100%'
    div.style.height = '100%'
    div.style.backgroundRepeat = 'repeat'
    div.style.backgroundPosition = '0px 0px'
    div.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
    node.style.position = 'relative'
    node.appendChild(div)
  } catch (error) {
    console.error('addWaterMarker error: ', error)
  }
}

/*
 * @Author: weichunpei
 * @Date: 2024-01-24 17:37:59
 * @LastEditors: weichunpei
 * @LastEditTime: 2024-01-25 15:30:11
 * @Description: 移除水印
 */
export const removeWatermark = (elNode) => {
  let node: any = elNode
  if (!elNode) {
    node = document.body
  }
  if (elNode && typeof elNode === 'string') {
    node = document.querySelector(node) as HTMLElement
  }
  const waterMarkEl = node.querySelector('.water-mark')
  waterMarkEl && node.removeChild(waterMarkEl)
}
