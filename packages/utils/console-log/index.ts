const ProxyConsole = new Proxy(console, {
  get(target: any, propKey: string) {
    const originalMethod = target[propKey]
    if (originalMethod instanceof Function) {
      const session = window?.sessionStorage
      if (session.getItem('YTO-ENGINE-DEBUGGER')) {
        return originalMethod
      }
      return (): void => {}
    }
    return originalMethod
  },
})

export function error(msg: string, ...rest: any[]) {
  ProxyConsole.error(`[yto-engine: error]: ${msg}`, rest)
}

export function warning(msg: string) {
  ProxyConsole.warn(`[yto-engine: warning]: ${msg}`)
}

export function logger(msg: string, ...rest: any[]) {
  ProxyConsole.log(`[yto-engine: logger]: ${msg}`, rest)
}
