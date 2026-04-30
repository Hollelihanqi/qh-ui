<template>
  <div class="p-4">
    <h3>基本使用</h3>
    <hd-empty> </hd-empty>
  </div>
  <div class="p-4">
    <h3>调整尺寸</h3>
    <hd-empty size="large"> </hd-empty>
    <hd-empty size="small"> </hd-empty>
    <hd-empty size="mini"> </hd-empty>
    <h3>自定义大小</h3>
    <hd-empty size="small" :small-size="{ width: '300px', height: '150px' }"> </hd-empty>
  </div>
  <div class="p-4">
    <h3>自定文字</h3>
    <hd-empty desc="逝者如斯夫"> </hd-empty>
  </div>
</template>
