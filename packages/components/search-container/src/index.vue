<template>
  <div
    :id="containerId"
    class="search-container overflow-hidden relative w-full"
    :class="customClass"
    :style="handleContainerStyle()"
    @keyup.enter="handleEnterKeyup"
  >
    <ElForm
      v-if="isUseForm"
      ref="formInstance"
      v-resize-element="handleResize"
      v-bind="$attrs"
      class="flex flex-wrap container-content w-full"
    >
      <slot></slot>

      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </ElForm>
    <div v-else v-resize-element="handleResize" class="container-content flex flex-wrap w-full">
      <slot></slot>
      <div class="flex-1 text-right container-operation"><slot name="operation"></slot></div>
    </div>
    <div
      v-if="showCollapse"
      class="bg-[#F7F9FA] w-[32px] h-[16px] flex items-center justify-center cursor-pointer container-collapse text-[12px] absolute bottom-0 left-[50%] ml-[-16px]"
      @click="handleCollapse"
    >
      <ElIcon :style="`transform: rotate(${collapse ? 90 : -90}deg)`"><DArrowRight /></ElIcon>
      <!-- {{ collapse ? `展开` : "折叠" }} -->
    </div>
  </div>
</template>
<script lang="ts" setup name="SearchContainer">
import { ElForm, ElIcon } from 'element-plus'
import { ResizeElement as vResizeElement } from '@yto-custom/directives'
import { guid } from '@yto/utils'
import { DArrowRight } from '@element-plus/icons-vue'
import { logger } from '@yto-custom/utils'
// import { IAnyObject } from '../../custom-field-container/src/index.vue'

interface Props {
  isUseForm?: boolean
  itemMinWidth: number
  itemMaxWidth?: number
  customClass?: string
  autoLayout?: boolean //是否自动布局
  isCollapse?: boolean //是否可以折叠
  collapseLine?: number //折叠行数
  defaultCollapse: boolean //是否默认折叠
}
const props = withDefaults(defineProps<Props>(), {
  isUseForm: true,
  itemMinWidth: 300,
  autoLayout: true,
  isCollapse: false,
  defaultCollapse: false,
  collapseLine: 3,
})
const formInstance = ref()
const containerId = computed(() => {
  return `searchContainer_${guid()}`
})
let prevWidth = 0 //记录上一次容器宽度
let containerMaxHeight = 0
let containerMinHeight = 0

const showCollapse = ref(false)
const collapse = ref(false)
const emit = defineEmits(['resize', 'enterKeyup'])

const setContainerMaxMinHeight = (maxHeight = 0, minHeight = 0) => {
  containerMaxHeight = maxHeight || 0
  containerMinHeight = minHeight || 0
}
const handleResize = (info: any, forceUpdate = false) => {
  if ((!props.itemMinWidth || !info.width || prevWidth == info.width) && !forceUpdate) return
  logger('search-container-handleResize', info)
  prevWidth = info.width
  let num = Math.floor(info.width / props.itemMinWidth) // 每行显示数量
  const tmpItemWidth = info.width / num
  if (tmpItemWidth < props.itemMinWidth) {
    num -= 1
  }
  let itemWidth = Math.floor(info.width / num) // 每个元素宽度
  // 超过最大值则按照最大值展示
  if (props.itemMaxWidth && itemWidth > props.itemMaxWidth) {
    itemWidth = props.itemMaxWidth
  }
  emit('resize', itemWidth)
  const tmpChildren: HTMLCollection | undefined = document.querySelector(
    `#${containerId.value} .container-content`,
  )?.children
  if (props.autoLayout) {
    setChildWidth(itemWidth, tmpChildren) // 设置子元素宽度
  }
  nextTick(() => {
    if (props.isCollapse) {
      dealCollapse(num, tmpChildren) // 如果开启了折叠，则处理折叠
    }
  })
}
const setChildWidth = (itemWidth: number, childrenNodes?: HTMLCollection) => {
  if (!childrenNodes || !childrenNodes.length) return
  const children = Array.from(childrenNodes).filter((item: any) => {
    return !item.className.includes('container-operation')
  })
  children.forEach((item: any) => {
    const cols = item.getAttribute('data-cols') || 1
    item.style.width = itemWidth * cols + 'px'
  })
}
const hiddenLastEl = async (elements: any) => {
  // 隐藏最后一个刚好达到限制行数的子元素
  const childrenArr: Array<any> = Array.from(elements).filter((child: any) => {
    return Number(child.getAttribute('data-line-count')) === props.collapseLine
  })
  childrenArr[childrenArr.length - 1].style.display = 'none'
}
const showEl = (el: any) => (el.style.display = el.getAttribute('data-display') || 'block')
const hideEl = (el: any) => (el.style.display = 'none')
const isOperateEl = (el: any) => el.className.includes('container-operation')
const setOrgElDisplay = (elements: any) => {
  Array.from(elements).forEach((el: any) => {
    el.setAttribute('data-display', window.getComputedStyle(el).display)
  })
}
/**
 * 获取元素额外高度
 * */
const getElExtraHeight = (elStyle: any) => {
  return (
    parseInt(elStyle.marginTop) +
    parseInt(elStyle.marginBottom) +
    parseInt(elStyle.paddingBottom) +
    parseInt(elStyle.paddingTop) +
    parseInt(elStyle.borderBottomWidth) +
    parseInt(elStyle.borderTopWidth) +
    parseInt(elStyle.borderLeftWidth) +
    parseInt(elStyle.borderBottomWidth)
  )
}
const dealCollapse = (lineNum: number, childrenNodes?: HTMLCollection) => {
  setContainerMaxMinHeight()
  if (!childrenNodes || !childrenNodes.length) return
  let row = 1,
    rowHeightObj: any = {} //用于保存每一行的最大高度
  let currentTotalLineCols = 0
  Array.from(childrenNodes).forEach((child: any, idx: number) => {
    const cols = Number(child.getAttribute('data-cols')) || 1
    currentTotalLineCols += cols
    child.setAttribute('data-line-count', row)
    // 为了计算高度需要让每一个元素都显示出来
    showEl(child)
    //计算每一行最大高度
    if (!rowHeightObj[row]) rowHeightObj[row] = 0
    const tmpRowHeight = child.offsetHeight + getElExtraHeight(getComputedStyle(child))
    rowHeightObj[row] = tmpRowHeight > rowHeightObj[row] ? tmpRowHeight : rowHeightObj[row]

    // 如果是折叠状态，resize过程中,动态改变元素的display属性,避免元素被隐藏
    if (unref(collapse) && !isOperateEl(child)) {
      if (row < props.collapseLine) {
        showEl(child)
      } else if (row === props.collapseLine) {
        // 折叠行数所在行的最后一个元素需要隐藏
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        currentTotalLineCols >= lineNum ? hideEl(child) : showEl(child)
      } else {
        hideEl(child)
      }
    }
    //换行
    if (currentTotalLineCols >= lineNum && Array.from(childrenNodes)[idx + 1]) {
      currentTotalLineCols = 0
      row++
    }
  })
  // 遍历完所有子元素侯计算容器的最大、最小高度
  let tmpMaxHeight = 0,
    tmpMinHeight = 0
  Object.keys(rowHeightObj).forEach((key: string) => {
    tmpMaxHeight += rowHeightObj[key]
    if (Number(key) <= props.collapseLine) {
      tmpMinHeight += rowHeightObj[key]
    }
  })
  setContainerMaxMinHeight(tmpMaxHeight, tmpMinHeight)
  logger('containerRowMaxHeight', rowHeightObj, tmpMaxHeight, tmpMinHeight)

  setTimeout(() => {
    //判断是否显示折叠按钮
    showCollapse.value = row > props.collapseLine

    const showCollapseValue = unref(showCollapse)
    const collapseValue = unref(collapse)

    if (showCollapseValue && collapseValue) {
      hiddenLastEl(childrenNodes)
    }

    logger('内部元素共显示了大致', row, '行（不包含最后一行可能未满的情况）', showCollapse.value)
    //如果开启了默认折叠 超过最大行数则自动折叠
    if (props.isCollapse && props.defaultCollapse && unref(showCollapse)) {
      doCollapse(childrenNodes)
      collapse.value = true
    }
  }, 10)
}

//处理展开
const doExpand = (elements: any) => Array.from(elements).forEach(showEl)
//处理折叠
const doCollapse = (elements: any) => {
  Array.from(elements).forEach((child: any) => {
    if (!isOperateEl(child) && Number(child.getAttribute('data-line-count')) > props.collapseLine) {
      hideEl(child)
    }
  })
  hiddenLastEl(elements)
}

//点击折叠/展开按钮
const handleCollapse = () => {
  const tmpChildren = document.querySelector(`#${containerId.value} .container-content`)?.children
  if (!tmpChildren || !tmpChildren.length) return
  const isCollapsed = unref(collapse)
  if (isCollapsed) {
    doCollapse(tmpChildren)
  } else {
    doExpand(tmpChildren)
  }
  collapse.value = !unref(collapse)
}
/**
 * 为容器增加动画
 */
const handleContainerStyle = () => {
  if (!props.isCollapse) return
  const containerEl: any = document.querySelector(`#${containerId.value}`)
  if (containerMinHeight === containerMaxHeight) {
    if (containerMinHeight == 0) {
      return
    } else {
      return { height: `${containerMinHeight + getElExtraHeight(getComputedStyle(containerEl))}px` }
    }
  }
  if (!containerEl) return { height: 0 }
  const height = unref(collapse)
    ? `${containerMinHeight + getElExtraHeight(getComputedStyle(containerEl))}px`
    : `${containerMaxHeight + getElExtraHeight(getComputedStyle(containerEl))}px`
  return {
    transition: 'height 0.2s linear',
    height,
  }
}
//处理keyupEnter事件
const handleEnterKeyup = () => {
  logger('search-container inner enter keyup')
  emit('enterKeyup')
}
const observeChildList = (el: HTMLElement) => {
  // 当观察到变动时执行的回调函数
  const callback = async function (mutationsList: any) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // 在这里可以访问到变化后的子元素
        logger('新增子元素', mutation.addedNodes) // 新增的节点
        logger('删除子元素', mutation.removedNodes) // 删除的节点
        setOrgElDisplay(el.children)
        handleResize({ width: el.offsetWidth }, true)
      }
    }
  }
  const observer = new MutationObserver(callback)
  observer.observe(el, { childList: true, subtree: false })
}
onMounted(() => {
  const tmpEl = document.querySelector(`#${containerId.value} .container-content`) as HTMLElement
  if (!tmpEl) return
  setOrgElDisplay(tmpEl.children)
  handleResize({ width: tmpEl.offsetWidth })
  observeChildList(tmpEl)
})
defineExpose({
  formInstance,
})
</script>
<style lang="scss" scoped>
.search-container {
}
</style>
