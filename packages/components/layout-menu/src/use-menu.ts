import { EnumSessionKey } from '@yto-custom/build-constants'
import { tabPaneAdd, isBlank, session } from 'gold-core'
import { logger } from '@yto-custom/utils'

export function useMenu(props: any): any {
  function paneAdd(item: any) {
    const href: string = getHref(item)
    logger('useMenu--paneAdd', href, { ...item, href })
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
