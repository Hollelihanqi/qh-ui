import { JsBridge, WebViewJavascriptBridge } from './basic'

// 定义接口类型
interface BridgeParams {
  timeout?: number
}

interface BridgeResponse<T> {
  code: number
  data: T | null
  message: string
}

class Bridge {
  private static readonly DEFAULT_TIMEOUT = 3000

  constructor() {
    console.log('初始化JsBridge')
    JsBridge.first()
  }

  /**
   * 调用原生方法
   * @param funName 方法名
   * @param funParams 方法参数
   * @param otherParams 其他参数（如超时时间）
   */
  callHandler<T = any>(
    funName: string,
    funParams: Record<string, any> = {},
    otherParams: BridgeParams = { timeout: Bridge.DEFAULT_TIMEOUT },
  ): Promise<BridgeResponse<T>> {
    let isCallback = false
    const timeout = otherParams.timeout || Bridge.DEFAULT_TIMEOUT

    return new Promise((resolve, reject) => {
      try {
        JsBridge.init((bridge: WebViewJavascriptBridge) => {
          console.log('JsBridge初始化成功')

          // 注册处理器
          bridge.registerHandler(funName, (data: unknown, responseCallback: (data: unknown) => void) => {
            responseCallback(data)
          })

          // 调用原生方法
          bridge.callHandler(funName, funParams, (res: T) => {
            isCallback = true
            resolve({
              code: 0,
              data: res,
              message: '成功',
            })
          })

          // 超时处理
          setTimeout(() => {
            if (!isCallback) {
              resolve({
                code: -1,
                data: null,
                message: `调用超时(${timeout}ms)`,
              })
            }
          }, timeout)
        })
      } catch (error) {
        reject({
          code: -2,
          data: null,
          message: error instanceof Error ? error.message : '未知错误',
        })
      }
    })
  }
}

// 导出单例实例
export const bridge = new Bridge()
