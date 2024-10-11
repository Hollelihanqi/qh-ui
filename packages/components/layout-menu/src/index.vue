<template>
  <div class="layout-menu flex flex-col justify-between bg-slate-100">
    <YtoStickyContainer>
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
                <template
                  v-for="(itemSecond, indexSecond) in itemSub.children"
                  :key="`${index}-${indexSub}-${indexSecond}`"
                >
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
    </YtoStickyContainer>
  </div>
</template>
<script lang="ts" setup name="LayoutMenu">
import { computed, ref } from 'vue'
import { ElMenu, ElMenuItem, ElSubMenu, ElInput } from 'element-plus'
import { useMenu } from './use-menu'
import { isArray } from 'gold-core'
import InnerNodeMenu from './NodeMenu.vue'
import { YtoStickyContainer } from '@yto-custom/components/sticky-container'
import Logo from './Logo.vue'
import { logger } from '@yto-custom/utils'
const props = defineProps({
  keyLabel: String,
  keyIcon: String,
  keyHref: String,
  keySession: String,
  collapse: Boolean,
  menus: Array,
  searchable: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: { type: String, default: '菜单查询' },
  width: { type: String, default: '210px' },
  title: String,
  logo: String,
  linkType: { type: String, default: 'paneAdd' },
  formatMenu: Function,
  defaultActive: { type: String, default: '' },
})
const menuRef = ref()
const emit = defineEmits(['menuClick', 'update:collapse'])
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
  logger('menuClick', props.linkType, item)
  if (props.linkType === 'paneAdd') {
    paneAdd(props.formatMenu ? await props.formatMenu(item) : item)
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
<style lang="scss">
:root,
body[layout-theme] {
  --el-menu-base-level-padding: 18px;
  --el-menu-level-padding: 18px;
  --ElMenuItem-height: 48px;
  --el-menu-sub-item-height: 34px;
}
</style>
<style lang="scss" scoped>
@import '../../../theme-chalk/icon-font/iconfont.css';

.layout-menu {
  @apply bg-[var(--yto-layout-menu-background)];
  .layout-menu-search {
    @apply overflow-hidden;
    &.disappear {
      animation: cutWidth 0.2s;
      @apply h-0 p-0;
    }
    &.appear {
      animation: addWidth 0.2s;
      @apply h-[56px] p-[12px];
    }
  }
  @keyframes cutWidth {
    0% {
      height: 56px;
      padding: 12px;
    }
    100% {
      height: 0px;
      padding: 0;
    }
  }
  @keyframes addWidth {
    0% {
      height: 0px;
      padding: 0;
    }

    100% {
      height: 56px;
      padding: 12px;
    }
  }
  .menu-logo-title {
    @apply text-[var(--yto-layout-menu-color-title)] bg-[var(--yto-layout-menu-background-title)];
    box-shadow: var(--yto-layout-menu-header-box-shadow);
  }
  .layout-menu-search {
    @apply bg-[var(--yto-layout-menu-background)];
    box-shadow: var(--yto-layout-menu-header-box-shadow);
    :deep(.el-input) {
      .el-input__wrapper {
        box-shadow: none;
        background: var(--yto-layout-menu-background-search);
        &:is-focus {
          box-shadow: none;
        }
        .el-input__inner {
          color: var(--yto-layout-menu-color-text);
          background: var(--yto-layout-menu-background-search);
        }
      }
    }
  }
  :deep(.el-menu) {
    @apply bg-[var(--yto-layout-menu-background)] border-none;
    &:not(.el-menu--collapse) {
      width: v-bind('props.width');
    }
    /**************处理菜单折叠后图标对不齐的问题*****************/
    &.el-menu--collapse {
      .ElSubMenu .ElSubMenu__title,
      .ElMenuItem {
        .el-icon {
          @apply ml-0;
        }
        .img-icon {
          @apply m-0 ml-[4px];
        }
      }
    }
    /**************开始：公共样式*****************/
    .ElMenuItem,
    .ElSubMenu .ElSubMenu__title {
      @apply text-[var(--yto-layout-menu-color-text)] border-none;
      &:hover {
        @apply bg-transparent;
      }
      .el-icon {
        @apply mr-[4px] ml-[-8px];
      }
    }
    /**************结束：公共样式*****************/
    .ElSubMenu {
      /**************开始：处理展开折叠三角形*****************/
      .ElSubMenu__title .el-icon.ElSubMenu__icon-arrow {
        svg {
          @apply hidden;
        }
        &::after {
          content: '';
          @apply w-0 h-0 border-solid;
          border-color: transparent;
          border-width: 5px 0 5px 5px;
          border-left-color: var(--yto-layout-menu-color-triangle);
        }
      }
      &.is-opened:not(.second-sub-menu) {
        > .ElSubMenu__title .el-icon.ElSubMenu__icon-arrow {
          transform: rotateZ(90deg) !important;
        }
      }
      &.is-opened.second-sub-menu {
        > .ElSubMenu__title .el-icon.ElSubMenu__icon-arrow {
          transform: rotateZ(90deg) !important;
        }
      }
      /**************处理激活状态叶子节点左侧的小圆点*****************/
      .leaf-menu.is-active div {
        @apply relative;
        &::before {
          content: '';
          @apply absolute w-[4px] h-[4px] rounded-[4px] absolute left-[-8px] top-[50%] transform translate-y-[-50%] bg-[var(--yto-layout-menu-color-text-active)];
        }
      }
      /**************结束：处理展开折叠三角形*****************/
      .ElSubMenu__title {
        .el-icon {
          @apply mr-[4px] ml-[-8px];
        }
      }
    }
    .menu-level-1 {
      @apply bg-[var(--yto-layout-menu-level-1-background-color)];
      box-shadow: var(--yto-layout-menu-level-1-box-shadow);
      &.ElMenuItem:hover {
        @apply bg-[var(--yto-layout-menu-level-1-background-color-hover)];
      }
      &.ElSubMenu:not(.is-active) .ElSubMenu__title:hover {
        @apply bg-[var(--yto-layout-menu-level-1-background-color-hover)];
      }
      &.is-active {
        @apply bg-[var(--yto-layout-menu-level-1-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.is-active:hover {
        @apply bg-[var(--yto-layout-menu-level-1-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.ElSubMenu.is-active {
        @apply bg-[var(--yto-layout-menu-level-1-background-color-expand)] text-[var(--yto-layout-menu-color-text-active)];
      }
    }
    .menu-level-2 {
      .ElSubMenu__title {
        @apply h-[var(--el-menu-sub-item-height)];
      }
      @apply bg-[var(--yto-layout-menu-level-2-background-color)];
      &.ElMenuItem:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.ElSubMenu .ElSubMenu__title:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.is-active:not(.ElSubMenu) {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.is-active:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.ElSubMenu.is-active {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-expand)] text-[var(--yto-layout-menu-color-text-active)];
      }
    }
    .menu-level-3 {
      @apply bg-[var(--yto-layout-menu-level-2-background-color)];
      &:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.is-active {
        @apply bg-[var(--yto-layout-menu-level-3-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.is-active:hover {
        @apply bg-[var(--yto-layout-menu-level-3-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
    }
  }
  :deep(.el-scrollbar) {
    .el-scrollbar__bar.is-vertical {
      @apply bg-[var(--yto-layout-menu-background-scrollbar)];
      .el-scrollbar__thumb {
        @apply bg-[var(--yto-layout-menu-background-scrollbar-thumb)];
      }
    }
  }
}
</style>
<style lang="scss">
.el-popper.layout-menu-popper {
  .el-menu--popup-container .el-menu {
    @apply bg-[var(--yto-layout-menu-background)];

    .ElMenuItem,
    .ElSubMenu .ElSubMenu__title {
      @apply text-[var(--yto-layout-menu-color-text)] border-none;
    }
    .ElMenuItem,
    .ElMenuItem > div,
    .ElSubMenu,
    .ElSubMenu .ElSubMenu__title {
      @apply h-[var(--el-menu-sub-item-height)] leading-[var(--el-menu-sub-item-height)];
    }
    /**************处理激活状态叶子节点左侧的小圆点*****************/
    .leaf-menu.is-active div {
      @apply relative;
      &::before {
        content: '';
        @apply absolute w-[4px] h-[4px] rounded-[4px] absolute left-[-8px] top-[50%] transform translate-y-[-50%] bg-[var(--yto-layout-menu-color-text-active)];
      }
    }
    .menu-level-2 {
      .ElSubMenu__title > div {
        display: block !important;
      }
      @apply bg-[var(--yto-layout-menu-level-2-background-color)];
      &.ElMenuItem:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.ElSubMenu .ElSubMenu__title:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.is-active:not(.ElSubMenu) {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.is-active:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.ElSubMenu.is-active {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-expand)] text-[var(--yto-layout-menu-color-text-active)];
      }
    }
    .menu-level-3 {
      @apply bg-[var(--yto-layout-menu-level-2-background-color)];
      &:hover {
        @apply bg-[var(--yto-layout-menu-level-2-background-color-hover)];
      }
      &.is-active {
        @apply bg-[var(--yto-layout-menu-level-3-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
      &.is-active:hover {
        @apply bg-[var(--yto-layout-menu-level-3-background-color-active)] text-[var(--yto-layout-menu-color-text-active)];
      }
    }
  }
}
</style>
