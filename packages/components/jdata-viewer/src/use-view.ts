import { JdataViewerProps } from './ijdata-viewer'
import { ElMessage } from 'element-plus'
import { ref, watchEffect } from 'vue'
export const useView = (props: JdataViewerProps) => {
  const _nodes = ref([])
  const isCollapsed = ref(false)
  const toggleRoot = () => {
    isCollapsed.value = !isCollapsed.value
  }
  const copyed = ref(false)
  const handleCopy = async () => {
    try {
      const copyData = JSON.stringify(props.data)

      // 使用现代的 Clipboared API
      await navigator.clipboard.writeText(copyData)
      copyed.value = true
      ElMessage.success('复制成功')
    } catch (error) {
      console.log('复制失败', error)
    }
  }

  watchEffect(() => {
    isCollapsed.value = false
    _nodes.value = jsonToNestedArray(props.data)
  })

  return {
    isCollapsed,
    _nodes,
    handleCopy,
    toggleRoot,
  }
}

function jsonToNestedArray(obj: Record<string, any> | string | undefined) {
  // 处理 undefined 情况
  if (obj === undefined) {
    console.error('JSON Viewer: 输入数据不能为空')
    return []
  }

  let jsonData: Record<string, any>

  // 校验并转换输入数据
  try {
    if (typeof obj === 'string') {
      // 如果是字符串，尝试解析成 JSON 对象
      jsonData = JSON.parse(obj)
    } else if (obj && typeof obj === 'object') {
      // 如果是对象，直接使用
      jsonData = obj
    } else {
      console.error('JSON Viewer: 输入数据必须是 JSON 对象或 JSON 字符串')
      return []
    }
  } catch (error) {
    console.error('JSON Viewer: JSON 字符串解析失败，请检查格式是否正确', error)
    return []
  }

  // 校验转换后的数据是否为有效对象
  if (!jsonData || typeof jsonData !== 'object' || jsonData === null) {
    console.warn('JSON Viewer: 解析后的数据必须是有效的对象或数组')
    return []
  }

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

  const result: any = []
  Object.entries(jsonData).forEach(([key, value]) => {
    result.push(processNode(key, value, '', 0))
  })

  return result
}
