import { JsBridge } from './basic'
class Bridge {
  constructor() {
    console.log('JsBridge.first：setupWebViewJavascriptBridge')
    JsBridge.first()
  }
  callHandler(funName, funParams = {}, otherParams = { timeout: 3000 }) {
    let isCallback = false //回调方法是否返回值
    return new Promise<any>((resolve, reject) => {
      try {
        JsBridge.init((bridge: any) => {
          console.log('JsBridge.init：setupWebViewJavascriptBridge', bridge)
          bridge.registerHandler(funName, (data, responseCallback) => {
            responseCallback(data)
          })
          bridge.callHandler(funName, funParams, (res: any) => {
            isCallback = true
            resolve(res)
          })
          setTimeout(() => {
            if (!isCallback) resolve('返回值为空')
          }, otherParams.timeout)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
const brdige = new Bridge()

export { brdige }
