<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-04-15 14:39:14
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-08-07 08:39:37
 * @FilePath: \yto-engine\docs\examples\text-ellipsis\customizeAction.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <yto-c-text-ellipsis :content="text">
    <template #action="{ expanded }"> {{ expanded ? 'Collapse' : 'Expand' }} </template>
  </yto-c-text-ellipsis>
</template>
<script lang="tsx">
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.'
    return { text }
  },
}
</script>
