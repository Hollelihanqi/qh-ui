import { isFunctionFun } from '@yto/utils'
/**
 * @description: 将MapOptions转换为options
 * @param {any} options
 * @return {*}
 */
export const getOptiops = (options: any) => {
  return isFunctionFun(options.toObject) ? options.toObject() : options
}
