/**
 * 水印参数接口定义
 */
interface WatermarkParams {
  /** 水印文字内容 */
  content: string;
  /** 目标DOM节点或选择器 */
  elNode: HTMLElement | string | null;
  /** 字体样式 */
  font?: string;
  /** 填充样式 */
  fillStyle?: string;
  /** 旋转角度 */
  rotate?: number;
  /** z-index层级 */
  zIndex?: string;
  /** 单个水印宽度 */
  width?: number;
  /** 单个水印高度 */
  height?: number;
}

/**
 * 添加水印
 * @param params 水印配置参数
 * @returns void
 */
export const addWaterMarker = (
  params: Partial<WatermarkParams> = {
    content: '',
    elNode: null,
    font: '14px Inter, Avenir',
    fillStyle: 'rgba(0, 0, 0, 0.08)',
    rotate: -28,
    zIndex: '99999',
    width: 200,
    height: 100,
  }
): void => {
  const { content, elNode, fillStyle, font, zIndex, rotate, width, height } = params

  // 如果没有水印内容则返回
  if (!content) return

  // 处理目标节点
  let node: HTMLElement = getTargetNode(elNode)

  try {
    // 创建canvas绘制水印
    const canvas = createWatermarkCanvas(content, {
      width,
      height,
      rotate,
      font,
      fillStyle
    })

    // 创建水印容器
    const watermarkDiv = createWatermarkContainer(canvas, zIndex)

    // 添加水印到目标节点
    node.style.position = 'relative'
    node.appendChild(watermarkDiv)
  } catch (error) {
    console.error('添加水印失败:', error)
  }
}

/**
 * 移除水印
 * @param elNode 目标节点或选择器
 */
export const removeWatermark = (elNode: HTMLElement | string | null): void => {
  const node = getTargetNode(elNode)
  const waterMarkEl = node.querySelector('.water-mark')
  waterMarkEl && node.removeChild(waterMarkEl)
}

/**
 * 获取目标DOM节点
 * @param elNode 目标节点或选择器
 * @returns HTMLElement
 */
const getTargetNode = (elNode: HTMLElement | string | null): HTMLElement => {
  if (!elNode) {
    return document.body
  }
  if (typeof elNode === 'string') {
    const node = document.querySelector(elNode)
    if (!node) {
      throw new Error(`未找到目标节点: ${elNode}`)
    }
    return node as HTMLElement
  }
  return elNode
}

/**
 * 创建水印Canvas
 */
const createWatermarkCanvas = (
  content: string,
  options: {
    width?: number,
    height?: number,
    rotate?: number,
    font?: string,
    fillStyle?: string
  }
): HTMLCanvasElement => {
  const { width = 200, height = 100, rotate = -28, font, fillStyle } = options

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('无法获取canvas上下文')
  }

  ctx.rotate((rotate * Math.PI) / 180)
  ctx.font = font || '14px Inter, Avenir'
  ctx.fillStyle = fillStyle || 'rgba(0, 0, 0, 0.08)'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(content, 0, canvas.height)

  return canvas
}

/**
 * 创建水印容器div
 */
const createWatermarkContainer = (
  canvas: HTMLCanvasElement,
  zIndex?: string
): HTMLDivElement => {
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
  div.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`

  return div
}
