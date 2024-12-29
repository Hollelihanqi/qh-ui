<template>
  <div class="p-4">
    <h3>基本使用</h3>
    <yto-c-tarea-tag v-model="textList" placeholder="请输入工号，多个 工号 请使用半角“,”符合、回车、空格进行分割。">
    </yto-c-tarea-tag>
  </div>
  <div class="p-4">
    <h3>自定正则</h3>
    <yto-c-tarea-tag
      v-model="ips"
      :regular="IpReg"
      placeholder="请输入IP，多个 IP 请使用半角“,”符合、回车、空格进行分割。"
    >
    </yto-c-tarea-tag>
  </div>
  <div class="p-4">
    <h3>自定验证函数</h3>
    <yto-c-tarea-tag
      v-model="phone"
      :regular="checkPhone"
      :autosize="{ minRows: 2 }"
      required
      placeholder="请输入手机号，多个手机号请使用半角“,”符合、回车、空格进行分割。例如：187293911xx,187293911xx 187293911xx"
      @on-updated="handleUpdated"
    ></yto-c-tarea-tag>
  </div>
</template>
<script lang="tsx" setup>
const textList = ref<any>([])
const ips = ref<any>([])
const phone = ref<any>([])
const IpReg =
  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
const MobileRegex = /^1[3|4|5|7|8][0-9]{9}$/

const TelRegex = /^(0\d{2,3}-?)?\d{7,8}$/
const checkPhone = (value: string) => {
  return MobileRegex.test(value) || TelRegex.test(value)
}
const handleUpdated = () => {
  //数据更新之后
}
</script>
