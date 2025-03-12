import { defineComponent, Transition, Fragment } from 'vue'
import { jdataViewerProps } from './ijdata-viewer'
import { useView } from './use-view'

export default defineComponent({
  name: 'JdataViewer',
  components: {
    Transition,
  },
  props: jdataViewerProps,
  setup(props: any) {
    const { _nodes, isCollapsed, toggleRoot, handleCopy } = useView(props)

    // 修复拼写错误：paseKey -> parseKey
    const parseKey = (key: string) => {
      const keys = key.split('.')
      return keys[keys.length - 1]
    }

    // 将颜色定义提取为常量，便于维护
    const COLORS = ['#fa541c', '#fa8c16', '#faad14', '#fadb14', '#a0d911', '#722ed1', '#eb2f96']

    const isHtml = (node: any) => {
      return /<[^>]*>/g.test(node.value)
    }

    // 优化 valueRender 函数，提高可读性
    const valueRender = (node: any) => {
      if (node.value === null) {
        return <span class="jv-n">null</span>
      }

      switch (node.nodeType) {
        case 'string':
          try {
            // 只有在 renderHTag 为 true 时才处理 HTML 标签
            if (props.renderHTag && isHtml(node)) {
              // 移除字符串两端的引号
              const htmlStr = node.value.replace(/^"|"$/g, '')
              // 解析可能包含的JSON字符串
              const processJsonInHtml = (str: string) => {
                return str.replace(/\{([^}]+)\}/g, (match) => {
                  try {
                    const jsonObj = JSON.parse(match)
                    return JSON.stringify(jsonObj)
                  } catch {
                    return match
                  }
                })
              }
              const processedHtml = processJsonInHtml(htmlStr)
              return <div class="html-content" innerHTML={processedHtml}></div>
            }
            return <span class="jv-greed">{JSON.stringify(node.value)}</span>
          } catch {
            return <span class="jv-greed">{JSON.stringify(node.value)}</span>
          }
        case 'number':
          return <span class="jv-red">{node.value}</span>
        case 'boolean':
          return <span class="jv-red">{String(node.value)}</span>
        default:
          return <span class="jv-greed">{JSON.stringify(node.value)}</span>
      }
    }

    const toggleExpand = (node: any) => {
      node.collapse = !node.collapse
    }

    // 定义一个箭头组件，用于显示展开和收起的状态
    const CollapseArrow = ({ toggleClick, isCollapsed }: any) => (
      <div
        style={{ cursor: 'pointer', display: 'inline-block' }}
        class={`color-f triangle-arrow ${isCollapsed ? 'triangle-right' : 'triangle-down'}`}
        onClick={toggleClick}
      ></div>
    )

    // 渲染单个节点的组件
    const JsonNode = ({ node }: any) => {
      // 渲染节点内容
      const renderNode = (key: string, value: any, children: [], type: string, index = 0, childNode: any) => {
        const _node = childNode || node
        if ((type === 'object' || type === 'array') && value !== null) {
          const colorIndex = index % COLORS.length
          return (
            <div
              style={{
                padding: '2px 0',
                transition: 'background-color 0.2s',
              }}
            >
              <CollapseArrow toggleClick={() => toggleExpand(_node)} isCollapsed={_node.collapse} />
              <div style="display:inline-block;word-break: break-all;">
                {!_node.isArrayChild && (
                  <Fragment>
                    <span>{parseKey(key)}</span>
                    <span style="fontWeight:bold">：</span>
                  </Fragment>
                )}
                <strong style={{ color: COLORS[colorIndex] }}>{type === 'object' ? '{' : '['}</strong>
              </div>
              {_node.collapse ? <span style={{ color: COLORS[colorIndex] }}>...</span> : ''}
              <Transition name="expand">
                <div v-show={!_node.collapse} style={{ paddingLeft: '16px' }}>
                  {children.map((child: any) => {
                    return (
                      <div key={child.level}>
                        {renderNode(child.key, child.value, child._children, child.nodeType, child.level, child)}
                      </div>
                    )
                  })}
                </div>
              </Transition>
              <span style={{ color: COLORS[colorIndex] }}>
                <strong>{type === 'object' ? '}' : ']'}</strong>
              </span>
              {_node.isArrayChild && <span>，</span>}
            </div>
          )
        } else {
          return (
            <div
              style={{ display: props.renderHTag && isHtml(node) ? 'flex' : 'inline-block', wordBreak: 'break-all' }}
            >
              {type !== 'array' && (
                <Fragment>
                  {!_node.isArrayChild && (
                    <Fragment>
                      <span class="json-key-span" style="display:inline-block">
                        {parseKey(key)}
                      </span>
                      <span style="fontWeight:bold">：</span>
                    </Fragment>
                  )}
                </Fragment>
              )}
              {valueRender(_node)}
              {_node.isArrayChild && <span>，</span>}
            </div>
          )
        }
      }

      return <div>{renderNode(node.key, node.value, node._children, node.nodeType, 0, node)}</div>
    }

    // 根组件，渲染整个JSON树
    const JsonTree = (data = []) => {
      return (
        <div>
          <div>
            <CollapseArrow toggleClick={toggleRoot} isCollapsed={isCollapsed.value} />
            <span class="json-key-span">{props.rootTagStart}</span>
            {isCollapsed.value && (
              <Fragment>
                <span>...</span>
                <span class="json-key-span">{props.rootTagEnd}</span>
              </Fragment>
            )}
          </div>
          <Transition>
            <div v-show={!isCollapsed.value} style={{ marginLeft: '16px' }}>
              <div style={{ paddingLeft: '16px' }}>
                {data.map((node: any) => (
                  <JsonNode node={node} />
                ))}
              </div>
              <span class="json-key-span">{props.rootTagEnd}</span>
            </div>
          </Transition>
        </div>
      )
    }

    return () => {
      return (
        <div class={`jdata-viewer ${props.theme === 'light' ? 'jdata-viewer-light' : 'jdata-viewer-dark'}`}>
          {props.copy && (
            <div class="json-copy" onClick={handleCopy}>
              复制
            </div>
          )}
          <div class="jdata-tree">{JsonTree(_nodes.value)}</div>
        </div>
      )
    }
  },
})
