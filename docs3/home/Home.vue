<template>
  <div ref="target" class="home-page">
    <div class="banner">
      <div class="banner-desc text-center">
        <div class="text-center font-bold text-size-[48px]">技术平台部|业务UI组件库</div>
        <p>一个基于 Element Plus 的综合业务组件库，适用于 vue3 项目当中。</p>
      </div>
    </div>
    <HomeCards />
  </div>
</template>
<style lang="scss">
.home-page {
  .banner-desc {
    h1 {
      font-size: 48px;
      font-weight: 800;
      margin: 0;
      color: var(--text-color);
      font-family: Inter, sans-serif;
    }

    p {
      font-size: 16px;
      margin-top: 20px;
      color: var(--text-color-light);
    }
  }
}
</style>
