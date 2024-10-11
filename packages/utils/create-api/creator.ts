/**
 * 1. 创建vnode
 * 2. 挂载
 */

import { render, h, VNode } from 'vue'
import type { Component } from 'vue'
let mountDom: Element | null = null
let appendToContainer: Element = document.body

type IObj = {
  [k: string]: any
}

interface IReturnObj {
  $destroy: Function
}

export const createMountContainer = (customClass?: string[]): Element => {
  const container = document.createElement('div')
  console.log('customClass', customClass)
  container.className = `creator-api-container ${customClass ? customClass : ''}`
  return container
}

export const createVnode = (component: Component, props: IObj, slots?: IObj): VNode => {
  const vnode = h(component, { ...props }, { ...slots })
  return vnode
}

const destroy = () => {
  if (mountDom) {
    appendToContainer.removeChild(mountDom)
  }
}

export const mount = (vnode: VNode, appendToContainer: Element = document.body, customClass?: string[]): IReturnObj => {
  destroy()
  mountDom = createMountContainer(customClass)
  render(vnode, mountDom)
  appendToContainer.appendChild(mountDom)

  function $destroy(mountDom: Element) {
    if (mountDom) {
      appendToContainer.removeChild(mountDom)
    }
  }
  return {
    $destroy,
  }
}

type ICreator = (component: Component, props: IObj, customClass?: string[]) => void

/**
 *  1. 给组件实例扩充 createAPI
 */
export const creator: ICreator = (component: Component, props: IObj, customClass?: string[]) => {
  appendToContainer = props.appendTo || document.body

  Object.assign(component!, {
    $creator: function (props: IObj, customClass?: string[], slots?: IObj) {
      const vnode = createVnode(this, props, slots)
      mount(vnode, appendToContainer, customClass)
    },
  })
}
