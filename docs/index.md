---
title: '个人业务组件库'
sidebar: false
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(() => {
   const router = useRouter()
   router.go('/home/')
})
</script>
