<template>
  <div class="p-4">
    <h3>基本使用</h3>
    <yto-empty> </yto-empty>
  </div>
  <div class="p-4">
    <h3>调整尺寸</h3>
    <yto-c-empty size="large"> </yto-c-empty>
    <yto-c-empty size="small"> </yto-c-empty>
    <yto-c-empty size="mini"> </yto-c-empty>
    <h3>自定义大小</h3>
    <yto-empty size="small" :small-size="{ width: '300px', height: '150px' }"> </yto-empty>
  </div>
  <div class="p-4">
    <h3>自定文字</h3>
    <yto-empty desc="逝者如斯夫"> </yto-empty>
  </div>
</template>
