<script lang="tsx">
import { Props } from './props'
import { useController } from './useControl'
import MyTransition from './MyTransition.vue'
export default defineComponent({
  name: 'JsonViewer',
  components: {
    // 使用不同的名称
    MyTransition,
  },
  props: Props,
  setup(props) {
    const { _nodes, isCollapsed, toggleRoot, handleCopyClick } = useController(props)
    const paseKey = (key: string) => {
      const keys = key.split('.')
      return keys[keys.length - 1]
    }
    const _colors = ['#2f54eb', '#722ed1', '#eb2f96', '#fa541c', '#fa8c16']
    const valueFormat = (node: any) => {
      if (node.value === null) {
        return <span class="jv-n">null</span>
      } else if (node.nodeType === 'string') {
        return <span class="jv-greed">{JSON.stringify(node.value)}</span>
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
          return (
            <div>
              <CollapseArrow toggleClick={() => toggleExpand(_node)} isCollapsed={_node.collapse} />
              <div style="display:inline-block;word-break: break-all;">
                {!_node.isArrayChild && (
                  <>
                    <span>{paseKey(key)}</span>
                    <span style="fontWeight:bold">：</span>
                  </>
                )}
                <strong style={{ color: _colors[index] }}>{type === 'object' ? '{' : '['}</strong>
              </div>
              {_node.collapse ? '...' : ''}
              <MyTransition>
                {/* {!_node.collapse && (
                  <div style={{ marginLeft: "20px" }}>
                    {children.map((child: any, index2) => {
                      return (
                        <div key={index2}>
                          {renderNode(child.key, child.value, child._children, child.nodeType, index2, child)}
                        </div>
                      );
                    })}
                  </div>
                )} */}
                <div v-show={!_node.collapse} style={{ marginLeft: '20px' }}>
                  {children.map((child: any) => {
                    return (
                      <div key={child.level}>
                        {renderNode(child.key, child.value, child._children, child.nodeType, child.level, child)}
                      </div>
                    )
                  })}
                </div>
              </MyTransition>
              <span style={{ color: _colors[index] }}>
                <strong style={{ color: _colors[index] }}>{type === 'object' ? '}' : ']'}</strong>
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
          <MyTransition>
            {/* {!isCollapsed.value && (
              <>
                <div style={{ marginLeft: "20px" }}>
                  {data.map((node, index) => (
                    <JsonNode node={node} />
                  ))}
                </div>
                <span class="json-key-span">{props.rootTagEnd}</span>
              </>
            )} */}
            {/* 使用 v-show 控制子节点的显示和隐藏 */}
            <div v-show={!isCollapsed.value} style={{ marginLeft: '20px' }}>
              <div style={{ paddingLeft: '16px' }}>
                {data.map((node) => (
                  <JsonNode node={node} />
                ))}
              </div>
              <span class="json-key-span">{props.rootTagEnd}</span>
            </div>
          </MyTransition>
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
            <div class="json-copy" onClick={handleCopyClick}>
              复制
            </div>
          )}
          {/* {JsonSearch()} */}
          {JsonTree(_nodes.value)}
        </div>
      )
    }
  },
})
</script>

<style lang="scss">
@import './index.scss';
</style>
