/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 13:12:55
 * @LastEditTime: 2023-05-10 13:16:10
 */
// index
import Menu from './src/index.vue'

import { install } from '@yto-custom/utils'

export const YtoMenu = install(Menu)
export default YtoMenu

export * from './src/interface'
export type MenuInstance = InstanceType<typeof Menu>
