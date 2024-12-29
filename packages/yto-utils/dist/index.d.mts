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

interface BridgeParams {
    timeout?: number;
}
declare class Bridge {
    constructor();
    callHandler<T = any>(funName: string, funParams?: Record<string, any>, otherParams?: BridgeParams): Promise<T>;
}
declare const bridge: Bridge;

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

declare const downloadFileStream: (streamData: any, fileName?: string) => void;
/**
 *作者 ： lbr
 *日期 ： 2023/11/18
 *时间 ： 12:56
 *功能描述 ：数据编辑文件下载  以下是示例
 *          downloadFileDataCSV({
 *           tableHeadArr:['姓名','年龄'],
 *           fileDataArr:[{name:'李',age:'55'},{name:'李',age:'44'},{name:'李',age:'33'}],
 *            formatter:function (item) {
 *               return `${item.name}\t,${item.age}\t \n`
 *              }
 *         })
 */
interface DownLoadType {
    tableHeadArr: string[];
    fileDataArr: any[];
    formatter: Function;
    fileName?: string;
}
declare const downloadFileDataCSV: (params: DownLoadType) => void;

/**
 * 水印参数接口定义
 */
interface WatermarkParams {
    /** 水印文字内容 */
    content: string;
    /** 目标DOM节点或选择器 */
    elNode: HTMLElement | string | null;
    /** 字体样式 */
    font?: string;
    /** 填充样式 */
    fillStyle?: string;
    /** 旋转角度 */
    rotate?: number;
    /** z-index层级 */
    zIndex?: string;
    /** 单个水印宽度 */
    width?: number;
    /** 单个水印高度 */
    height?: number;
}
/**
 * 添加水印
 * @param params 水印配置参数
 * @returns void
 */
declare const addWaterMarker: (params?: Partial<WatermarkParams>) => void;
/**
 * 移除水印
 * @param elNode 目标节点或选择器
 */
declare const removeWatermark: (elNode: HTMLElement | string | null) => void;

/**
 * 添加千位分隔符
 * @param num 需要格式化的数字
 * @returns 格式化后的字符串
 */
declare const thousandsSeparator: (num: number) => string;
/**
 * 判断是否为整数
 * @param num 需要判断的数字
 * @returns 是否为整数
 */
declare const isInteger: (num: number) => boolean;
/**
 * 格式化大数字，添加单位（万/亿/兆）
 * @param num 需要格式化的数字或字符串
 * @param fixedNum 小数位数
 * @param nullStr 无效数字的替代显示
 * @returns 格式化后的字符串
 */
declare const formatNumber: (num: number | string, fixedNum?: number, nullStr?: string) => string;

type TimeUnit = 'day' | 'hour' | 'minute' | 'second' | 'millisecond';
type InputType = 'minute' | 'second' | 'millisecond';
/**
 * 格式化时间持续时间为易读字符串
 * @param timeInput 输入的时间值
 * @param inputType 输入时间的单位类型
 * @param showUnits 需要显示的时间单位数组
 * @returns 格式化后的时间字符串
 */
declare const formatDuration: (timeInput: number, inputType?: InputType, showUnits?: TimeUnit[]) => string;

export { addWaterMarker, bridge, copyStr, debounceFun, downloadFileDataCSV, downloadFileStream, formatDuration, formatNumber, guid, isEmptyFun, isFunctionFun, isInteger, ocrValueMapping, removeWatermark, thousandsSeparator };
