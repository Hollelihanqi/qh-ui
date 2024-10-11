### 将数值类型时间换为 xx 天 xx 小时 xx 分钟 xx 秒 xx 毫秒

```typescript
import { formatTime } from '@yto/utils'
/**
 * @description 将数值类型时间换为 xx 天 xx 小时 xx 分钟 xx 秒 xx 毫秒
 * @param {number} time 输入时间
 * @param {string} 输入时间类型
 * @param {string[]} 输出时间格式
 * @returns {string} 返回时间
 */
formatTime(123456789, 'millisecond', ['day', 'hour', 'minute', 'second', 'millisecond'])
```
