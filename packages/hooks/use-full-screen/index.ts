// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export function useFullScreen(): any {
  /**判断是否全屏*/
  function isFullScreen() {
    return document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement
      ? true
      : false
  }

  /**实现F11全屏效果*/
  function fullScreen() {
    if (isFullScreen()) return
    const docElm = document.documentElement
    /*W3C*/
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen()
    } /*FireFox */ else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen()
    } /*Chrome等 */ else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen()
    } /*IE11*/ else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen()
    }
  }
  /**退出F11全屏*/
  function exitFullScreen() {
    if (!isFullScreen()) return
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
  // 在全屏与非全屏之间来回切换
  function toggleFullScreen() {
    const cfun = isFullScreen() ? exitFullScreen : fullScreen
    cfun()
  }
  return {
    toggleFullScreen,
  }
}
