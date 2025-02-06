---
title: "A Vue 3 UI Framework Train"
---

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

onMounted(() => {
  const router = useRouter()
  router.go('/home/')
})
</script>


