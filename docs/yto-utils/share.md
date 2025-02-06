<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-11 13:40:14
 * @LastEditTime: 2023-12-11 13:52:15
-->

# 分享

## 分享渠道

- 钉钉： 钉钉
- 网点管家： 钉钉、圆钉、微信
- 驾驶舱： 钉钉、圆钉、微信
- 行者： 钉钉、圆钉、微信
- 星辰： 钉钉

## 如何使用

- 嵌入圆通 app 页面分享:(网点管家、驾驶舱、行者、星辰)
- 钉钉端分享

### 嵌入圆通 app 页面分享

安装依赖

```
pnpm install  @yto/utils

```

分享方法调用: （ 如果调用方法失败，请联系对应 app 的开发人员，确保已注册分享方法 ）

```typescript
import { brdige } from '@yto/utils'
brdige.callHandler('ShareVideo', {
  url:'分享的url',
  title:'标题',
  content: '内容'
  thumburl:'图标url',
  type: type
})
```

type 字段取值范围：

- dingding（钉钉）： 钉钉分享 url 必须拼接 corpId（cordId 获取及钉钉授权方式参考：钉钉分享）
- yuanding（圆钉）：分享 url 了务必去除 corpId 等不必要参数
- weixin（微信）： 分享 url 了务必去除 corpId 等不必要参数。微信分享无法授权，页面需要免登处理， 涉及接口权限需放开。

### 钉钉分享

安装依赖： 使用钉钉 SDK

```
pnpm install  dingtalk-jsapi

```

钉钉免登授权： 单页应用只需授权一次，建议放在鉴权 sdk 登录成功(hookLoginSuccess)的钩子中调用。

```typescript
export const dingdingAuthConfig = async () => {
  getDdConfig({ url: location.href }).then((data: any) => {
    data.corpId && sessionStorage.setItem('corpId', data.corpId)
    dd.config({
      agentId: data.agentId, // 必填，微应用ID
      corpId: data.corpId, // 必填，企业ID
      timeStamp: data.timeStamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，自定义固定字符串。
      signature: data.signature, // 必填，签名
      // type: 0 / 1, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
      jsApiList: [
        'biz.contact.departmentsPicker',
        'biz.contact.complexPicker',
        'biz.chat.openSingleChat',
        'biz.clipboardData.setData',
        'biz.contact.setRule',
        'dd.biz.auth.requestAuthInfo',
        'biz.util.share',
        'biz.navigation.setRight',
      ], // 必填，需要使用的jsapi列表，注意：不要带dd。
    })
    dd.error(function (err) {
      // 该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
      console.log('dd error: ' + JSON.stringify(err))
    })
  })
}
```

调用钉钉分享方法： 分享的 url 上必须拼接 corpId

```typescript
dd.biz.util.share({
  type: 1,
  url: '分享的url',
  title: '标题',
  content: '内容',
  image: '图标url',
})
```
