<script setup lang="ts">
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { isArray } from 'gold-core'

defineProps({
  item: { type: Object, required: true },
  collapse: Boolean,
  level: { type: Number, default: 1 }
});

const emit = defineEmits(['click']);
</script>

<template>
  <template v-if="isArray(item.children)">
    <ElSubMenu :index="item.code" :class="`menu-level-${level}`">
      <template #title>
        <slot name="label" v-bind="item">
          <InnerNodeMenu 
            :collapse="collapse" 
            :data="item" 
            :show-icon="!!item.icon || !!item.imgsrc"
          />
        </slot>
      </template>
      <MenuNode 
        v-for="child in item.children" 
        :key="child.code"
        :item="child" 
        :collapse="collapse" 
        :level="level + 1"
        @click="emit('click', $event)"
      />
    </ElSubMenu>
  </template>
  <ElMenuItem v-else :index="item.code" :class="`menu-level-${level}`" @click="emit('click', item)">
    <slot name="label" v-bind="item">
      <InnerNodeMenu 
        :data="item" 
        :show-icon="level === 1 ? !!item.icon : false" 
      />
    </slot>
  </ElMenuItem>
</template>
