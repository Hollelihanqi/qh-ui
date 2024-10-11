/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-04-07 16:11:35
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-06-28 15:02:37
 * @FilePath: \yto-engine\packages\yto-custom\src\components\json-viewer\src\useControl.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { JsonViewerProps } from './interface'
import { ElMessage } from 'element-plus'
export const useController = (props: JsonViewerProps) => {
  const _nodes = ref([])
  const isCollapsed = ref(false)
  const toggleRoot = () => {
    isCollapsed.value = !isCollapsed.value
  }
  const copyed = ref(false)
  // 复制
  const handleCopyClick = () => {
    const input = document.createElement('input')
    input.value = JSON.stringify(props.data)
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    copyed.value = true
    ElMessage.success('复制成功！')
  }

  watchEffect(() => {
    isCollapsed.value = false
    _nodes.value = jsonToNestedArray(props.data)
  })

  return {
    isCollapsed,
    _nodes,
    handleCopyClick,
    toggleRoot,
  }
}

function jsonToNestedArray(obj: any) {
  // 定义一个帮助函数递归地处理对象和数组，新增一个level参数来表示当前层级
  function processNode(key: any, value: any, path: any, level: any, isArrayChild = false) {
    // 获取完整的路径
    const fullPath = path ? `${path}.${key}` : key
    // 初始化节点，增加level属性
    const node: any = {
      key: fullPath,
      value: '',
      nodeType: typeof value,
      _children: [],
      level: level,
      collapse: false,
    }

    if (typeof value === 'object' && value !== null) {
      // 如果值是一个对象，则为每个子属性创建新的节点
      if (Array.isArray(value)) {
        // 处理数组类型
        node.nodeType = 'array'
        // node.value = value.toString();
        node.value = JSON.stringify(value)
        node.isArrayChild = isArrayChild
        // node.type = "array";
        value.forEach((item, index) => {
          node._children.push(processNode(`${index}`, item, '', level + 1, true))
        })
      } else {
        // 处理对象类型
        node.nodeType = 'object'
        // node.value = value?.toString();
        node.value = JSON.stringify(value)
        node.isArrayChild = isArrayChild
        // node.type = "object";
        Object.entries(value).forEach(([childKey, childValue]) => {
          node._children.push(processNode(childKey, childValue, fullPath, level + 1))
        })
      }
    } else if (typeof value === 'function') {
      // 如果值不是对象或数组，直接设置值和类型
      node.nodeType = 'function'
      node.value = value?.toString()
      node.isArrayChild = isArrayChild
    } else {
      node.nodeType = typeof value
      node.value = value
      node.isArrayChild = isArrayChild
    }
    return node
  }

  // 处理根对象，根层级设置为0
  const result: any = []
  Object.entries(obj).forEach(([key, value]) => {
    result.push(processNode(key, value, '', 0))
  })

  console.log(result)
  return result
}
