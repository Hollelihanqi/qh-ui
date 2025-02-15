<template>
  <yto-text-ellipsis :content="text" expand-text="expand" collapse-text="collapse" />
</template>
<script lang="tsx">
export default {
  setup() {
    const text =
      "The fleeting time of one's life is everything that belongs to a person. Only this thing truly belongs to you. Everything else is just a momentary pleasure or misfortune, which will soon be gone with the passing of time."
    return { text }
  },
}
</script>
