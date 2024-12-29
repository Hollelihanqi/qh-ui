<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-05-10 10:21:00
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-26 16:47:36
 * @FilePath: \yto-engine\docs\examples\empty\basic.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="p-4">
    <h3>基本使用</h3>
    <yto-c-empty> </yto-c-empty>
  </div>
  <div class="p-4">
    <h3>调整尺寸</h3>
    <yto-c-empty size="large"> </yto-c-empty>
    <yto-c-empty size="small"> </yto-c-empty>
    <yto-c-empty size="mini"> </yto-c-empty>
    <h3>自定义大小</h3>
    <yto-c-empty size="small" :small-size="{ width: '300px', height: '150px' }"> </yto-c-empty>
  </div>
  <div class="p-4">
    <h3>自定文字</h3>
    <yto-c-empty desc="逝者如斯夫"> </yto-c-empty>
  </div>
</template>
