/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2024-03-20 10:12:47
 * @LastEditTime: 2024-03-20 10:13:28
 */
import { IProps } from './index.vue'
import { ExtractPropTypes } from 'vue'

/** table 组件 props 类型 */
export type TimeLineProps = ExtractPropTypes<IProps>
