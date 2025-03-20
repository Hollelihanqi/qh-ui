<template>
  <ClientOnly>
    <yto-text-ellipsis rows="3" :content="text" expand-text="expand" collapse-text="collapse" />
  </ClientOnly>
</template>
<script lang="tsx">
export default {
  setup() {
    const text =
      "That day, I turned twenty-one. In the golden age of my life, I was full of dreams. I wanted to love, to eat, and to instantly transform into one of these clouds, part alight, part darkened. It was only later that I understood life is but a slow, drawn-out process of getting your balls crushed. Day by day, you get older. Day by day, your dreams fade. In the end you are no different from a crushed ox. But I hadn't foreseen any of it on my twenty-first birthday. I thought I would be vigorous forever, and that nothing could ever crush me."
    return { text }
  },
}
</script>
