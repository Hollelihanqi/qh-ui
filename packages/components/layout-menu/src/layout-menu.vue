<template>
  <div class="layout-menu flex flex-col justify-between bg-slate-100">
    <StickyContainer>
      <!-- <template v-if="!collapse" #header>
        <Logo :title="title" :logo="logo" />
      </template> -->
      <ElMenu
        ref="menuRef"
        v-bind="$attrs"
        class="layout-menu-v h-[100%]"
        :collapse="collapse"
        :default-active="activeMenu"
        popper-class="layout-menu-popper"
      >
        <Logo :title="title" :logo="logo" :collapse="collapse" />
        <div
          v-if="searchable"
          class="layout-menu-search w-full bg-[#fff] p-[12px] box-border"
          :class="!collapse ? 'appear' : 'disappear'"
        >
          <ElInput v-model="searchVal" :placeholder="searchPlaceholder" />
        </div>
        <!-- 二级菜单 -->
        <template v-for="(item, index) in menuData" :key="index">
          <ElSubMenu v-if="isArray(item.children)" :index="item.code || getLabel(item)" class="menu-level-1">
            <template #title>
              <slot name="label" v-bind="item">
                <inner-node-menu
                  :collapse="collapse"
                  :data="item"
                  :show-icon="!!item.icon || !!item.imgsrc"
                ></inner-node-menu>
              </slot>
            </template>
            <!-- 三级菜单 -->
            <template v-for="(itemSub, indexSub) in item.children" :key="`${index}-${indexSub}`">
              <ElSubMenu
                v-if="isArray(itemSub.children)"
                class="second-sub-menu menu-level-2"
                :index="itemSub.code || getLabel(itemSub)"
              >
                <template #title>
                  <slot name="label" v-bind="itemSub">
                    <inner-node-menu
                      :collapse="collapse"
                      :data="itemSub"
                      :show-icon="!!itemSub.icon || !!itemSub.imgsrc"
                    ></inner-node-menu>
                  </slot>
                </template>
                <template v-for="itemSecond in itemSub.children" :key="`${index}-${indexSub}-${indexSecond}`">
                  <ElMenuItem :index="itemSecond.code" class="leaf-menu menu-level-3" @click="menuClick(itemSecond)">
                    <slot name="label" v-bind="itemSecond">
                      <inner-node-menu :data="itemSecond" :show-icon="false"></inner-node-menu>
                    </slot>
                  </ElMenuItem>
                </template>
              </ElSubMenu>
              <ElMenuItem v-else :index="itemSub.code" class="leaf-menu menu-level-2" @click="menuClick(itemSub)">
                <slot name="label" v-bind="itemSub">
                  <inner-node-menu :data="itemSub" :show-icon="false"></inner-node-menu>
                </slot>
              </ElMenuItem>
            </template>
          </ElSubMenu>
          <!-- 一级菜单 -->
          <ElMenuItem v-else :index="item.code" class="menu-level-1" @click="menuClick(item)">
            <slot name="label" v-bind="item">
              <inner-node-menu
                :collapse="collapse"
                :data="item"
                :show-icon="!!item.icon || !!item.imgsrc"
              ></inner-node-menu>
            </slot>
          </ElMenuItem>
        </template>
      </ElMenu>
    </StickyContainer>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, unref, nextTick } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElInput } from 'element-plus'
import { layoutMenuProps, layoutMenuEmits } from './layout-menu'
import { useMenu } from './use-menu'
import { isArray } from 'gold-core'
import InnerNodeMenu from './NodeMenu.vue'
import StickyContainer from '@yto-custom/components/sticky-container'
import Logo from './Logo.vue'

defineOptions({
  name: 'LayoutMenu',
})

const props = defineProps(layoutMenuProps)
const emit = defineEmits(layoutMenuEmits)

const menuRef = ref()

// 菜单过滤
const searchVal = ref('')
const activeMenu = computed(() => {
  return activate.value || props.defaultActive
})
const fileNavMenu = (arr: any) => {
  return arr.filter((e: any) => {
    if (e.label.includes(searchVal.value)) {
      return e
    } else if (e.children) {
      e.children = fileNavMenu(e.children)
      if (e.children.length > 0) {
        return e
      }
    }
  })
}

const menuClick = async (item: any) => {
  emit('menuClick', item)
  console.log('menuClick', props.linkType, item)
  const tmpItem = props.formatMenu ? await props.formatMenu(item) : item
  if (tmpItem?.isInactive) {
    //此逻辑用于点击后不需要激活菜单,自定义点击行为
    const tmpActive = unref(activate)
    activate.value = ''
    await nextTick()
    activate.value = tmpActive
    return
  }
  if (tmpItem && props.linkType === 'paneAdd') {
    paneAdd(tmpItem)
  }
}
const menuData = computed(() => {
  const tmpData = JSON.parse(JSON.stringify(data))
  return searchVal.value ? fileNavMenu(tmpData) : tmpData
})
const { paneAdd, getLabel, data, activate } = useMenu(props)
defineExpose(
  new Proxy(
    {},
    {
      get(target, key) {
        return menuRef.value?.[key]
      },
      has(target: any, key) {
        return key in menuRef.value
      },
    },
  ),
)
</script>
