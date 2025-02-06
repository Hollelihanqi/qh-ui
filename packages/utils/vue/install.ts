import type { App, Directive } from 'vue'
import type { SFCInstallWithContext, SFCWithInstall } from './typescript'
import { NOOP } from '@vue/shared'

/**
 * 为组件添加安装方法的高阶函数
 * @param main 主组件
 * @param extra 额外的组件对象（可选）
 * @returns 带有install方法的组件
 * 
 * 功能：
 * 1. 为组件添加 install 方法，使其可以通过 app.use() 进行安装
 * 2. 自动注册主组件和额外组件到 Vue 应用中
 * 3. 组件名称会自动添加 'Yto' 前缀
 */
export const withInstall = <T, E extends Record<string, any>>(
  main: T,
  extra?: E
) => {
  ; (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(`Yto${comp.name}`, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ; (main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

/**
 * 为函数式组件添加安装方法的高阶函数
 * @param fn 待处理的函数组件
 * @param name 组件名称
 * @returns 带有install方法和上下文的函数组件
 * 
 * 功能：
 * 1. 为函数式组件添加 install 方法
 * 2. 将函数挂载到 Vue 实例的全局属性上
 * 3. 保存应用上下文到组件的 _context 属性
 */
export const withInstallFunction = <T>(fn: T, name: string) => {
  ; (fn as SFCWithInstall<T>).install = (app: App) => {
    ; (fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

/**
 * 为指令添加安装方法的高阶函数
 * @param directive 待处理的指令
 * @param name 指令名称
 * @returns 带有install方法的指令
 * 
 * 功能：
 * 1. 为自定义指令添加 install 方法
 * 2. 通过 app.directive() 注册指令到 Vue 应用
 */
export const withInstallDirective = <T extends Directive>(
  directive: T,
  name: string
) => {
  ; (directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive)
  }

  return directive as SFCWithInstall<T>
}

/**
 * 为组件添加空操作的安装方法
 * @param component 待处理的组件
 * @returns 带有空install方法的组件
 * 
 * 功能：
 * 1. 为组件添加一个不执行任何操作的 install 方法
 * 2. 用于需要满足组件接口但不需要实际安装逻辑的场景
 * 
 * 注意：这里需要导入或定义 NOOP 常量，建议添加：
 * const NOOP = () => {}
 */
export const withNoopInstall = <T>(component: T) => {
  ; (component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}