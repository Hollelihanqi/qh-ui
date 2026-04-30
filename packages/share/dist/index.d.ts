/**
 * 判断一个值是否为空
 * @param value - 要检查的值
 * @returns {boolean} - 如果值为空返回 true，否则返回 false
 * @description
 * - null 或 undefined 返回 true
 * - 空字符串或空数组返回 true
 * - 空对象(没有自身属性)返回 true
 * - 其他情况返回 false
 */
declare const isEmptyFun: (value: any) => boolean;
/**
 * 检查一个值是否为函数
 * @param value - 要检查的值
 * @returns {boolean} - 如果值是函数返回 true，否则返回 false
 */
declare const isFunctionFun: (value: any) => boolean;
/**
 * 创建一个防抖函数
 * @param func - 要防抖的函数
 * @param wait - 等待时间（毫秒）
 * @returns - 返回防抖后的函数
 * @description 在连续调用时，只有在等待了指定时间后才会执行函数
 */
declare function debounceFun<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => Promise<ReturnType<F>>;
/**
 * 生成一个 UUID
 * @returns {string} - 返回生成的 UUID 字符串
 * @description 生成格式为 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' 的 UUID
 */
declare const guid: () => string;
/**
 * 复制文本到剪贴板
 * @param str - 要复制的字符串
 * @returns {Promise<boolean>} - 复制成功返回 true，失败返回 false
 * @description 使用现代的 Clipboard API，如果不支持则回退到传统方法
 */
declare const copyStr: (str: string) => Promise<boolean>;

interface OcrField {
    [key: string]: string;
}
interface OcrData {
    [key: string]: string | number | boolean | null;
}
/**
 * OCR字段映射工具
 * @param originalData - OCR原始数据
 * @param field - 字段映射关系
 * @returns 映射后的数据对象
 * @example
 * const result = ocrValueMapping(data, {
 *   businessScope: 'businessScope',
 *   companyName: 'companyName',
 *   expireDate: 'expireDate'
 * })
 */
declare const ocrValueMapping: (originalData: OcrData, field: OcrField) => OcrData;

export { copyStr, debounceFun, guid, isEmptyFun, isFunctionFun, ocrValueMapping };
