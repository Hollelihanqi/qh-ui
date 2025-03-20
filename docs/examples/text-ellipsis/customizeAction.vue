<template>
  <ClientOnly>
    <yto-text-ellipsis :content="text">
      <template #action="{ expanded }"> {{ expanded ? 'Collapse' : 'Expand' }} </template>
    </yto-text-ellipsis>
  </ClientOnly>
</template>
<script lang="tsx">
export default {
  setup() {
    const text =
      'Take your time and be patient. Life itself will eventually answer all those questions it once raised for you.'
    return { text }
  },
}
</script>
