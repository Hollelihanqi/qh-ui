<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-11 13:40:14
 * @LastEditTime: 2023-12-11 13:52:15
-->

安装依赖

```
pnpm install  @yto/utils

```

### 字符串复制方法

```typescript
import { copyStr } from '@yto/utils'
copyStr('字符串内容')
```

### 前端生成 UUID

```typescript
import { guid } from '@yto/utils'
guid()
```

### 判断是否是一个方法

```typescript
import { isFunctionFun } from '@yto/utils'
isFunctionFun(() => {})
```

### 判断非空校验 接受值 string object

```typescript
import { isEmptyFun } from '@yto/utils'
isEmptyFun()
```

### 防抖函数 参数1 函数,参数2 时间

```typescript
import { debounceFun } from '@yto/utils'
debounceFun(() => {}, 300)
```

### 判断是否为整数 接受参数 number

```typescript
import { isInteger } from '@yto/utils'
isInteger(200)
```

### 式化数字：显示单位为万/亿/兆

```typescript
import { formatNumber } from '@yto/utils'
formatNumber(20000)
```

### 数字格式化 使用 ','分割

```typescript
import { thousandsSeparatoe } from '@yto/utils'
thousandsSeparatoe(20000)
```

### 字段映射

```typescript
import { ocrValueMapping } from '@yto/utils'
ocrValueMapping(res2.successData, {
  businessScope: 'businessScope',
  companyName: 'companyName',
  expireDate: 'expireDate',
  issueDate: 'issueDate',
  licenseNumber: 'licenseNumber',
  regionScope: 'regionScope',
})
```
