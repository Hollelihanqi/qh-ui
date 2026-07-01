<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="eyebrow">Vue 3 · Element Plus · Business Components</div>
          <h1>HD Custom</h1>
          <p class="hero-subtitle">
            面向后台系统与业务中台的 Vue 3 组件库，沉淀高频业务模式，让表单、表格、上传、搜索等场景更快落地。
          </p>

          <div class="hero-actions">
            <button class="primary-action" type="button" @click="handleStart">开始使用</button>
            <button class="secondary-action" type="button" @click="handleComponents">查看组件</button>
          </div>

          <div class="hero-metrics" aria-label="组件库概览">
            <div v-for="metric in metrics" :key="metric.label" class="metric-item">
              <strong>{{ metric.value }}</strong>
              <span>{{ metric.label }}</span>
            </div>
          </div>
        </div>

        <div class="preview-board" aria-label="组件能力预览">
          <div class="preview-toolbar">
            <span></span>
            <span></span>
            <span></span>
            <b>SearchForm · Table</b>
          </div>
          <div class="preview-filter">
            <div class="field wide">
              <label>业务类型</label>
              <span>全部场景</span>
            </div>
            <div class="field">
              <label>状态</label>
              <span>启用中</span>
            </div>
            <button type="button">查询</button>
          </div>
          <div class="preview-table">
            <div class="table-head">
              <span>组件</span>
              <span>场景</span>
              <span>状态</span>
            </div>
            <div v-for="row in previewRows" :key="row.name" class="table-row">
              <span>{{ row.name }}</span>
              <span>{{ row.scene }}</span>
              <span class="status">{{ row.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-wrap">
      <div class="section-heading">
        <span>Why HD Custom</span>
        <h2>围绕业务研发体验设计</h2>
        <p>不是展示型组件堆叠，而是把项目里反复出现的交互、数据结构和样式规范沉淀成稳定能力。</p>
      </div>

      <div class="feature-grid">
        <article v-for="feature in features" :key="feature.title" class="feature-card">
          <div class="feature-index">{{ feature.index }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.desc }}</p>
        </article>
      </div>
    </section>

    <section class="workflow-section">
      <div class="workflow-copy">
        <span>Workflow</span>
        <h2>从安装到交付，路径更短</h2>
        <p>统一组件前缀、按需解析、主题构建与类型声明输出已经接入构建链，文档、预览和发布产物保持同一套入口。</p>
      </div>
      <div class="workflow-steps">
        <div v-for="step in workflow" :key="step.title" class="workflow-step">
          <span>{{ step.no }}</span>
          <div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress'

const router = useRouter()

const handleStart = () => {
  router.go('/guide/fast')
}

const handleComponents = () => {
  router.go('/components/table')
}

const metrics = [
  { value: '16+', label: '当前组件' },
  { value: 'ESM', label: '按需产物' },
  { value: 'TS', label: '类型声明' },
]

const previewRows = [
  { name: 'HdSearchForm', scene: '筛选查询', status: 'Ready' },
  { name: 'HdTable', scene: '数据列表', status: 'Ready' },
  { name: 'HdUploader', scene: '文件上传', status: 'Ready' },
]

const features = [
  {
    index: '01',
    title: '业务组件沉淀',
    desc: '覆盖搜索表单、数据表格、上传、文本省略、远程搜索等后台高频场景，减少重复封装。',
  },
  {
    index: '02',
    title: '发布结构清晰',
    desc: '组件、主题、解析器和类型声明统一进入主包产物，文档可直接消费构建后的发布结果。',
  },
  {
    index: '03',
    title: '类型体验稳定',
    desc: '基于 vue-tsc 生成 Vue SFC 类型声明，并在发布目录中重写路径，保证 IDE 跳转与类型提示可用。',
  },
  {
    index: '04',
    title: '主题样式独立',
    desc: '主题产物独立输出，支持全量样式与组件样式并行维护，方便在业务项目中精确引入。',
  },
]

const workflow = [
  { no: 'A', title: '安装组件库', desc: '通过 @rdeam/hd-ui 引入组件、主题样式和解析器。' },
  { no: 'B', title: '配置按需解析', desc: '在 Vite 中接入 HdCustomResolver，减少手写 import。' },
  { no: 'C', title: '组合业务页面', desc: '使用沉淀组件快速搭建表单、表格、详情和上传页面。' },
]
</script>

<style scoped>
.home-page {
  --hd-home-primary: #7c3aed;
  --hd-home-primary-deep: #5b21b6;
  --hd-home-cyan: #0f766e;
  --hd-home-ink: #111827;
  --hd-home-muted: #5f6675;
  --hd-home-line: #e7e9f2;
  min-height: 100vh;
  color: var(--hd-home-ink);
  background: #ffffff;
}

.hero-section {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--hd-home-line);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.96)),
    linear-gradient(120deg, rgba(124, 58, 237, 0.12), rgba(15, 118, 110, 0.08) 46%, rgba(37, 99, 235, 0.08)), #f8fafc;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(17, 24, 39, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 24, 39, 0.05) 1px, transparent 1px);
  background-size: 44px 44px;
  mask-image: linear-gradient(to bottom, #000 0%, transparent 82%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 520px);
  gap: 56px;
  align-items: center;
  max-width: 1180px;
  min-height: 610px;
  margin: 0 auto;
  padding: 88px 28px 96px;
}

.hero-copy {
  max-width: 650px;
}

.eyebrow,
.section-heading span,
.workflow-copy span {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 12px;
  border: 1px solid rgba(124, 58, 237, 0.18);
  border-radius: 999px;
  color: var(--hd-home-primary-deep);
  background: rgba(124, 58, 237, 0.08);
  font-size: 13px;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 22px 0 0;
  color: var(--hd-home-ink);
  font-size: 64px;
  line-height: 1.04;
  font-weight: 800;
}

.hero-subtitle {
  max-width: 590px;
  margin: 24px 0 0;
  color: var(--hd-home-muted);
  font-size: 18px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 34px;
}

.hero-actions button,
.preview-filter button {
  height: 42px;
  border-radius: 8px;
  padding: 0 22px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.hero-actions button:hover,
.preview-filter button:hover {
  transform: translateY(-2px);
}

.primary-action,
.preview-filter button {
  color: #ffffff;
  background: linear-gradient(135deg, var(--hd-home-primary), #2563eb);
  box-shadow: 0 14px 28px rgba(124, 58, 237, 0.22);
}

.secondary-action {
  color: var(--hd-home-primary-deep);
  background: #ffffff;
  border-color: rgba(124, 58, 237, 0.28) !important;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 120px));
  gap: 14px;
  margin-top: 42px;
}

.metric-item {
  padding: 16px 18px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
}

.metric-item strong {
  display: block;
  color: var(--hd-home-ink);
  font-size: 24px;
  line-height: 1;
}

.metric-item span {
  display: block;
  margin-top: 8px;
  color: var(--hd-home-muted);
  font-size: 13px;
}

.preview-board {
  border: 1px solid rgba(203, 213, 225, 0.82);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.12);
  overflow: hidden;
}

.preview-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 46px;
  padding: 0 18px;
  border-bottom: 1px solid var(--hd-home-line);
  background: rgba(248, 250, 252, 0.84);
}

.preview-toolbar span {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #cbd5e1;
}

.preview-toolbar span:nth-child(1) {
  background: #f97316;
}

.preview-toolbar span:nth-child(2) {
  background: #22c55e;
}

.preview-toolbar span:nth-child(3) {
  background: #3b82f6;
}

.preview-toolbar b {
  margin-left: 8px;
  color: #334155;
  font-size: 13px;
}

.preview-filter {
  display: grid;
  grid-template-columns: 1.3fr 1fr auto;
  gap: 12px;
  padding: 18px;
  border-bottom: 1px solid var(--hd-home-line);
}

.field {
  min-width: 0;
  min-height: 58px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
}

.field label {
  display: block;
  color: #8a93a5;
  font-size: 12px;
}

.field span {
  display: block;
  margin-top: 6px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 700;
}

.preview-filter button {
  align-self: stretch;
  min-width: 86px;
  height: auto;
}

.preview-table {
  padding: 14px 18px 20px;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 76px;
  gap: 12px;
  align-items: center;
}

.table-head {
  min-height: 36px;
  color: #8a93a5;
  font-size: 12px;
  font-weight: 700;
}

.table-row {
  min-height: 52px;
  border-top: 1px solid #edf0f6;
  color: #334155;
  font-size: 14px;
}

.table-row span:first-child {
  color: var(--hd-home-ink);
  font-weight: 800;
}

.status {
  display: inline-flex;
  justify-content: center;
  min-height: 26px;
  border-radius: 999px;
  padding: 4px 10px;
  color: #047857;
  background: #dff8ec;
  font-size: 12px;
  font-weight: 800;
}

.section-wrap,
.workflow-section {
  max-width: 1180px;
  margin: 0 auto;
  padding: 92px 28px;
}

.section-heading {
  max-width: 700px;
}

.section-heading h2,
.workflow-copy h2 {
  margin: 18px 0 0;
  color: var(--hd-home-ink);
  font-size: 38px;
  line-height: 1.22;
  font-weight: 800;
}

.section-heading p,
.workflow-copy p {
  margin: 16px 0 0;
  color: var(--hd-home-muted);
  font-size: 16px;
  line-height: 1.8;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 42px;
}

.feature-card {
  min-height: 230px;
  padding: 24px;
  border: 1px solid var(--hd-home-line);
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.05);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(124, 58, 237, 0.32);
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.09);
}

.feature-index {
  color: var(--hd-home-cyan);
  font-size: 13px;
  font-weight: 900;
}

.feature-card h3 {
  margin: 22px 0 0;
  color: var(--hd-home-ink);
  font-size: 20px;
  line-height: 1.35;
  font-weight: 800;
}

.feature-card p {
  margin: 12px 0 0;
  color: var(--hd-home-muted);
  font-size: 14px;
  line-height: 1.8;
}

.workflow-section {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 46px;
  margin-bottom: 60px;
  border-top: 1px solid var(--hd-home-line);
}

.workflow-steps {
  display: grid;
  gap: 14px;
}

.workflow-step {
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 16px;
  align-items: start;
  padding: 20px;
  border: 1px solid var(--hd-home-line);
  border-radius: 8px;
  background: #fbfcff;
}

.workflow-step > span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  color: #ffffff;
  background: var(--hd-home-ink);
  font-weight: 900;
}

.workflow-step h3 {
  margin: 0;
  color: var(--hd-home-ink);
  font-size: 17px;
  font-weight: 800;
}

.workflow-step p {
  margin: 7px 0 0;
  color: var(--hd-home-muted);
  font-size: 14px;
  line-height: 1.7;
}

@media (max-width: 980px) {
  .hero-inner,
  .workflow-section {
    grid-template-columns: 1fr;
  }

  .hero-inner {
    min-height: auto;
  }

  .preview-board {
    max-width: 620px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero-inner,
  .section-wrap,
  .workflow-section {
    padding-right: 18px;
    padding-left: 18px;
  }

  .hero-copy h1 {
    font-size: 44px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-metrics,
  .feature-grid,
  .preview-filter {
    grid-template-columns: 1fr;
  }

  .preview-filter button {
    min-height: 42px;
  }

  .table-head,
  .table-row {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 12px 0;
  }

  .table-head {
    display: none;
  }

  .section-heading h2,
  .workflow-copy h2 {
    font-size: 30px;
  }
}
</style>
