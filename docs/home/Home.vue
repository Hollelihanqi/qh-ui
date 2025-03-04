<template>
  <div class="home-page">
    <!-- 顶部横幅 -->
    <div class="hero-banner">
      <div class="hero-content">
        <!-- Logo动画 -->
        <div class="logo-animation">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <!-- 标题区域 -->
        <h1 class="main-title">技术平台部 | 业务UI组件库</h1>
        <p class="sub-title">基于 Element Plus，助力业务快速开发的 Vue3 组件库</p>
        
        <!-- 按钮组 -->
        <div class="button-group">
          <ElButton type="primary" size="large" class="start-btn" @click="handleStart">
            开始使用
          </ElButton>
          <ElButton class="github-btn" size="large" @click="handleToGithub">
            GitHub
          </ElButton>
        </div>
      </div>
    </div>

    <!-- 特性卡片 -->
    <div class="features">
      <div v-for="(feature, index) in features" 
           :key="index"
           class="feature-card">
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus'
import { useRouter } from 'vitepress'

const router = useRouter()
const handleStart = () => {
  router.go('/guide/fast')
}

const handleToGithub = () => {
}

const features = [
  {
    title: '组件丰富',
    desc: '提供 50+ 个业务组件，覆盖常见业务场景'
  },
  {
    title: '开发提效',
    desc: '降低开发成本，提升开发效率'
  },
  {
    title: '灵活定制',
    desc: '支持主题定制，满足个性化需求'
  }
]

</script>

<style>
:root {
  --primary: #9547EC;
  --primary-light: #B375FF;
  --primary-lighter: #CEA5FF;
  --bg-gradient: linear-gradient(170deg, 
    rgba(149, 71, 236, 0.2) 0%,
    rgba(149, 71, 236, 0.02) 100%
  );
}

/* 页面基础布局 */
.home-page {
  position: relative;
  min-height: 90vh;
  width: 100%;
  background-color: #fff;
}

/* Hero 区域样式 */
.hero-banner {
  position: relative;
  padding: 80px 40px;
  background: var(--bg-gradient);
  min-height: 44vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-content {
  width: 100%;
  text-align: center;
  position: relative;
  padding: 0;
  z-index: 1;
}

/* Logo 动画 */
.logo-animation {
  position: relative;
  height: 100px;
  margin-bottom: 40px;
}

.circle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0;
  animation: pulseAndRotate 3s infinite;
  background: linear-gradient(135deg, 
    rgba(149, 71, 236, 0.3) 0%, 
    rgba(179, 117, 255, 0.3) 100%
  );
}

.circle:nth-child(1) { width: 60px; height: 60px; }
.circle:nth-child(2) { width: 80px; height: 80px; animation-delay: 1s; }
.circle:nth-child(3) { width: 100px; height: 100px; animation-delay: 2s; }

/* 标题样式 */
.main-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(to right, var(--primary) 0%, var(--primary-light) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInDown 1s;
}

.sub-title {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  animation: fadeIn 1s ease-out;
}

/* 按钮样式 */
.button-group {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.start-btn {
  background: var(--primary) !important;
  border: none !important;
  transition: all 0.3s !important;
  padding: 0 32px !important;
}

.start-btn:hover {
  background: var(--primary-light) !important;
  transform: translateY(-2px);
}

.github-btn {
  border: 1px solid var(--primary) !important;
  color: var(--primary) !important;
  transition: all 0.3s !important;
  padding: 0 32px !important;
}

.github-btn:hover {
  background: var(--primary) !important;
  color: white !important;
}

/* 特性卡片 */
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px;
  padding: 160px 15%;
  max-width: 2000px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h3 {
  color: var(--primary);
  font-size: 24px;
  margin-bottom: 16px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 动画关键帧 */
@keyframes pulseAndRotate {
  0% {
    transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1) rotate(180deg);
    opacity: 0.2;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8) rotate(360deg);
    opacity: 0.6;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .hero-banner {
    padding: 60px 20px;
    min-height: auto;
  }

  .main-title {
    font-size: 32px;
  }

  .features {
    grid-template-columns: 1fr;
    padding: 60px 20px;
    gap: 30px;
  }

  .button-group {
    flex-direction: column;
    padding: 0 20px;
  }
}
</style>
