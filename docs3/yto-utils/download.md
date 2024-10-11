<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-11 13:40:14
 * @LastEditTime: 2023-12-11 13:52:15
-->

# 文件下载

安装依赖

```
pnpm install  @yto/utils

```

## 支持下载方式

文件流下载, 数据下载

### 文件流下载

```typescript
import { downloadFileStream } from '@yto/utils'
downloadFileStream('流数据', `文件名称（选填）`)
```

### 数据下载

```typescript
import { downloadFileDataCSV } from '@yto/utils'
downloadFileDataCSV({
  tableHeadArr: ['姓名', '年龄'],
  fileDataArr: [
    { name: '李', age: '55' },
    { name: '李', age: '44' },
    { name: '李', age: '33' },
  ],
  formatter: function (item) {
    return `${item.name}\t,${item.age}\t \n`
  },
})
```
