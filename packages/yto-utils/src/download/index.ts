export const downloadFileStream = (streamData: any, fileName?: string) => {
  const blob = new Blob([streamData], { type: streamData.type })
  // 创建 URL 对象
  const url = URL.createObjectURL(blob)
  // 创建链接
  const link = document.createElement('a')
  link.href = url
  link.download = fileName || new Date().getTime().toString()
  // 模拟点击链接进行下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  // 释放 URL 对象
  URL.revokeObjectURL(url)
}
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
interface downLoadType {
  tableHeadArr: string[]
  fileDataArr: any[]
  formatter: Function
  fileName?: string
}

export const downloadFileDataCSV = (params: downLoadType) => {
  let str = `${params.tableHeadArr.toString()}\n`
  params.fileDataArr.forEach((item: any) => {
    str += params.formatter(item)
  })
  const url = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  const link = document.createElement('a')
  link.href = url
  link.download = `${params.fileName || new Date().getTime()}.csv`
  link.click()
  document.removeChild(link)
}
/*
 ocr 字段映射使用方法
ocrValueMapping(res2.successData,{
  businessScope:'businessScope',
  companyName:'companyName',
  expireDate:'expireDate',
  issueDate:'issueDate',
  licenseNumber:'licenseNumber',
  regionScope:'regionScope'
})
*/
export const ocrValueMapping = (originalData, field) => {
  const obj = {}
  Object.values(field).forEach((item, index) => {
    console.log('xxxx', Object.keys(field)[index])
    // @ts-expect-error
    console.log('originalData[item]', originalData[item])
    // @ts-expect-error
    obj[Object.keys(field)[index]] = originalData[item]
  })
  return obj
}
