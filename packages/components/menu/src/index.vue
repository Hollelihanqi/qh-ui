<!-- eslint-disable vue/no-reserved-component-names -->
<script lang="ts">
import { defineComponent, h } from 'vue'
import { Props, IMenuData } from './props'
import { ElMenu, ElMenuItem, ElSubMenu, ElMenuItemGroup } from 'element-plus'
import { logger } from '@yto-custom/utils'

export default defineComponent({
  name: 'Menu',
  props: Props,
  emits: ['itemClick'],
  setup(props, context) {
    const renderTitle = (e: IMenuData) => {
      const title = [h('span', e.name)]
      if (e.icon) title.unshift(h('i', { class: `iconfont ${e.icon}` }))
      return title
    }
    const renderChildren = (meu: IMenuData[]) => {
      logger('***', meu)

      return meu.map((e: IMenuData) => {
        if (e.type === 'group') {
          return h(
            ElMenuItemGroup,
            { title: e.name },
            {
              default: () => renderChildren(e.children),
            },
          )
        } else if (e.children && e.children.length) {
          return h(
            ElSubMenu,
            {
              index: e.path || e.name,
              ...props.subMenuConfig,
            },
            {
              default: () => renderChildren(e.children),
              title: () => renderTitle(e),
            },
          )
        } else {
          return h(
            ElMenuItem,
            {
              onClick: () => {
                context.emit('itemClick', e)
              },
              ...props.subMenuConfig,
              index: e.path,
            },
            {
              title: () => renderTitle(e),
            },
          )
        }
      })
    }
    return () =>
      h(
        ElMenu,
        {
          ...context.attrs,
        },
        () => renderChildren(props.menuData),
      )
  },
})
</script>
