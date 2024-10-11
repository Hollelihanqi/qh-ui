import type { ExtractPropTypes, PropType } from 'vue'
import type { MenuItemProps, SubMenuProps } from 'element-plus'
export interface ColumnsItemProps {
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
export const Props = {
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

/** table 组件 props 类型 */
export type MenuProps = ExtractPropTypes<typeof Props>
