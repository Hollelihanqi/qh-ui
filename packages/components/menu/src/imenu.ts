import type { ExtractPropTypes, PropType } from 'vue'
import type { MenuItemProps, SubMenuProps } from 'element-plus'

import type Menu from './menu'

export interface YtoMenuItemProps {
  label?: string
  prop?: string
  [propsName: string]: any
}
export type CanWrite<T> = {
  -readonly [K in keyof T]?: T[K]
}

export interface IMenuData {
  name: string
  path?: string
  icon?: string
  type?: 'group'
  children: IMenuData[]
}

export const menuProps = {
  menuData: {
    type: Array as PropType<IMenuData[]>,
    default: () => [],
  },
  menuItemConfig: {
    type: Object as PropType<CanWrite<MenuItemProps>>,
    required: false,
    default: () => {
      return {}
    },
  },
  subMenuConfig: {
    type: Object as PropType<CanWrite<SubMenuProps>>,
    required: false,
    default: () => ({}),
  },
  showCollapse: {
    type: Boolean,
    default: false,
  },
}

export const menuEmits = ["itemClick"]

export type MenuProps = ExtractPropTypes<typeof menuProps>

export type MenuInstance = InstanceType<typeof Menu>