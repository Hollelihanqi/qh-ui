import { defineComponent, Transition } from 'vue'
import { jdataViewerProps } from './ijdata-viewer'
import { useView } from './use-view'

export default defineComponent({
  name: 'JsonViewer',
  components: {
    Transition,
  },
  props: jdataViewerProps,
  setup(props: any) {
    const { _nodes, isCollapsed, toggleRoot, handleCopy } = useView(props)
    const paseKey = (key: string) => {
      const keys = key.split('.')
      return keys[keys.length - 1]
    }
    const _colors = ['#fa541c', '#fa8c16', '#faad14', '#fadb14', '#a0d911', '#722ed1', '#eb2f96']
    const valueFormat = (node: any) => {
      if (node.value === null) {
        return <span class="jv-n">null</span>
      } else if (node.nodeType === 'string') {
        try {
          // 只有在 renderHTag 为 true 时才处理 HTML 标签
          if (props.renderHTag && /<[^>]*>/g.test(node.value)) {
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
      } else if (node.nodeType === 'number' || node.nodeType === 'boolean') {
        return <span class="jv-red">{node.nodeType === 'boolean' ? String(node.value) : node.value}</span>
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
          const colorIndex = index % _colors.length
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
                  <>
                    <span>{paseKey(key)}</span>
                    <span style="fontWeight:bold">：</span>
                  </>
                )}
                <strong style={{ color: _colors[colorIndex] }}>{type === 'object' ? '{' : '['}</strong>
              </div>
              {_node.collapse ? <span style={{ color: _colors[colorIndex] }}>...</span> : ''}
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
              <span style={{ color: _colors[colorIndex] }}>
                <strong>{type === 'object' ? '}' : ']'}</strong>
              </span>
              {_node.isArrayChild && <span>，</span>}
            </div>
          )
        } else {
          return (
            <div style="display:inline-block;word-break: break-all;">
              {type !== 'array' && (
                <>
                  {!_node.isArrayChild && (
                    <>
                      <span class="json-key-span" style="display:inline-block">
                        {paseKey(key)}
                      </span>
                      <span style="fontWeight:bold">：</span>
                    </>
                  )}
                </>
              )}
              {valueFormat(_node)}
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
              <>
                <span>...</span>
                <span class="json-key-span">{props.rootTagEnd}</span>
              </>
            )}
          </div>
          <Transition>
            {/* {!isCollapsed.value && (
              <>
                <div style={{ marginLeft: "16px" }}>
                  {data.map((node, index) => (
                    <JsonNode node={node} />
                  ))}
                </div>
                <span class="json-key-span">{props.rootTagEnd}</span>
              </>
            )} */}
            {/* 使用 v-show 控制子节点的显示和隐藏 */}
            <div v-show={!isCollapsed.value} style={{ marginLeft: '16px' }}>
              <div style={{ paddingLeft: '16px' }}>
                {data.map((node) => (
                  <JsonNode node={node} />
                ))}
              </div>
              <span class="json-key-span">{props.rootTagEnd}</span>
            </div>
          </Transition>
        </div>
      )
    }

    // 搜索
    // const JsonSearch = () => {
    //   return (
    //     <div class="json-search">
    //       <input placeholder={props.splacholder} />
    //     </div>
    //   )
    // }

    return () => {
      return (
        <div class={`json-viewer ${props.theme === 'light' ? 'json-viewer-light' : 'json-viewer-dark'}`}>
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
