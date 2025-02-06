import { JsBridge } from './basic'

// 定义接口类型
interface BridgeParams {
  timeout?: number
}

class Bridge {
  constructor() {
    console.log('JsBridge.first：setupWebViewJavascriptBridge')
    JsBridge.first()
  }

  callHandler<T = any>(
    funName: string,
    funParams: Record<string, any> = {},
    otherParams: BridgeParams = { timeout: 3000 }
  ): Promise<T> {
    let isCallback = false // 回调方法是否返回值

    return new Promise<T>((resolve, reject) => {
      try {
        JsBridge.init((bridge: any) => {
          console.log('JsBridge.init：setupWebViewJavascriptBridge', bridge)

          bridge.registerHandler(
            funName,
            (data: unknown, responseCallback: (data: unknown) => void) => {
              responseCallback(data)
            }
          )

          bridge.callHandler(funName, funParams, (res: T) => {
            isCallback = true
            resolve(res)
          })

          // 超时处理
          setTimeout(() => {
            if (!isCallback) {
              resolve({
                code: -1,
                data: null,
                message: '调用超时'
              } as T)
            }
          }, otherParams.timeout)
        })
      } catch (error) {
        reject(error instanceof Error ? error : new Error('未知错误'))
      }
    })
  }
}

// 修正拼写错误
const bridge = new Bridge()

export { bridge }
