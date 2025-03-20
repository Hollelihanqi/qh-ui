<template>
  <div class="demo-descriptions">
    <Descriptions :data="data" :list="list">
      <!-- 使用插槽自定义标签（优先级最高） -->
      <template #label-name="{ label }">
        <span class="custom-label-slot">
          <el-icon><User /></el-icon>
          {{ label }}
        </span>
      </template>

      <!-- 使用插槽自定义内容 -->
      <template #age="{ prop }">
        <span class="custom-content">{{ data[prop] }} 岁</span>
      </template>
    </Descriptions>
  </div>
</template>

<script setup lang="tsx">
import { User } from '@element-plus/icons-vue'

const data = {
  name: '张三',
  age: 18,
  gender: '男',
  email: 'zhangsan@example.com',
}

const list = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '年龄',
    prop: 'age',
  },
  {
    label: '性别',
    prop: 'gender',
    // 使用 labelRender 自定义标签（优先级第二）
    labelRender: (item) => (
      <span class="custom-label-render">
        <el-tag size="small" type="success">
          {item.label}
        </el-tag>
      </span>
    ),
  },
  {
    label: '邮箱',
    prop: 'email',
  },
]
</script>

<style scoped>
.demo-descriptions {
  padding: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.custom-label-slot {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #409eff;
}

.custom-label-render {
  display: inline-block;
}

.custom-content {
  color: #67c23a;
  font-weight: bold;
}
</style>
