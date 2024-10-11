// @ts-nocheck
export const JsBridge = {
  init: function (callback) {
    console.log('jsBridge:init')
    const u = navigator.userAgent
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (!isiOS) {
      // console.log("jsBridge:init:WebViewJavascriptBridge")
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      } else {
        // console.log("jsBridge:init:WebViewJavascriptBridgeReady")
        document.addEventListener(
          'WebViewJavascriptBridgeReady',
          function () {
            callback(WebViewJavascriptBridge)
          },
          false,
        )
      }
    } else {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback)
      }
      window.WVJBCallbacks = [callback]
      const WVJBIframe = document.createElement('iframe')
      WVJBIframe.style.display = 'none'
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
      document.documentElement.appendChild(WVJBIframe)
      setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    }
  },

  first: function () {
    const u = navigator.userAgent
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (!isiOS) {
      try {
        JsBridge.init(function (bridge) {
          bridge.init(function (data, responseCallback) {
            responseCallback(data)
          })
        })
      } catch (error) {
        console.log('jsBridge:first:::!isiOS-error: ', error)
      }
    }
  },

  /**
   * 函数描述：webView调用JS事件
   *
   * jsBridge.registerHandler(method, callBack(response));
   * @param method {string} 方法名
   * @return {Object} 回调
   */
  registerHandler: function (name, fun) {
    // console.log("jsBridge:registerHandler")
    JsBridge.init(function (bridge) {
      bridge.registerHandler(name, fun)
    })
  },

  /**
   * 函数描述：js调用webview事件
   *
   * jsBridge.callHandler(method, data, callBack(response));
   * @param method {string} 方法名
   * @param data {Object} 参数
   * @return {Object} 回调
   */
  callHandler: function (name, data, fun) {
    JsBridge.init(function (bridge) {
      bridge.callHandler(name, data, fun)
    })
  },
}
