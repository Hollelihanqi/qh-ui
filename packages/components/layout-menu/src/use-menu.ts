import { EnumSessionKey } from './constants'
import { tabPaneAdd, isBlank, session } from 'gold-core'
import { provide, inject, reactive } from 'vue'

export function useMenu(props: any): any {
  function paneAdd(item: any) {
    const href: string = getHref(item)
    console.log('useMenu--paneAdd', href, { ...item, href })
    tabPaneAdd(href, { ...item, href })
  }

  function getHref(item: any) {
    const key: string = props.keyHref as string
    return Reflect.get(item, isBlank(key) ? 'href' : key)
  }

  function getLabel(item: any) {
    const key: string = props.keyLabel as string
    return Reflect.get(item, isBlank(key) ? 'label' : key)
  }
  provide(EnumSessionKey.MenuKeyLabel, props.keyLabel)
  provide(EnumSessionKey.MenuKeyIcon, props.keyIcon)
  provide(EnumSessionKey.MenuWidth, props.width)

  // 当前激活的菜单
  const activate = inject<any>(EnumSessionKey.TabsActivate)
  // const listRoute = inject<any>(EnumSessionKey.TabsListRoute);

  const data = reactive<any[]>(
    props.menus ? props.menus : session.get(props.keySession || EnumSessionKey.Navigation, { defaultValue: [] }),
  )
  return { data, activate, paneAdd, getHref, getLabel }
}
