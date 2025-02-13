<template>
  <div class="sk-w">
    <yto-sticky-container>
      <div class="context-box">
        <div>主要内容</div>
      </div>
      <template #header>
        <div class="header">header123123</div>
      </template>
      <template #footer>
        <div class="footer">footer123123</div>
      </template>
    </yto-sticky-container>
  </div>
</template>
<style lang="scss">
.sk-w {
  height: 50vh;
  background: #fff;
  padding: 16px;
  .header {
    height: 60px;
    text-align: center;
    line-height: 60px;
    background: pink;
  }
  .footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: yellowgreen;
  }
  .context-box {
    height: 100vh;
    background: paleturquoise;
  }
}
</style>
