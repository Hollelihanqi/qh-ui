interface OcrField {
  [key: string]: string
}

interface OcrData {
  [key: string]: string | number | boolean | null
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
export const ocrValueMapping = (originalData: OcrData, field: OcrField): OcrData => {
  const mappedData: OcrData = {}

  Object.entries(field).forEach(([key, value]) => {
    mappedData[key] = originalData[value] ?? null
  })

  return mappedData
}
