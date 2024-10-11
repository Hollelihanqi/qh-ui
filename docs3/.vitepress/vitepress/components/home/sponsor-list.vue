<script lang="ts" setup>
import { computed } from "vue";
import { isDark } from "../../composables/dark";
import { sendEvent } from "../../../config/analytics";
const onItemClick = (item: any) => {
  sendEvent("sp_click", item.name, "index");
};
defineProps({
  sponsors: Array,
  sponsorType: String,
});
</script>

<template>
  <h2 class="text-center mb-4 text-xl">测试Test</h2>
  <div class="grid gap-1 sponsor-list platinum">
    <a
      v-for="(sponsor, i) in sponsors"
      :key="i"
      :class="['sponsor flex px-4 rounded-md', sponsor.className]"
      :href="sponsor.url"
      target="_blank"
      @click="onItemClick(sponsor)"
    >
      <img :class="sponsor.isDark && isDark ? 'filter invert' : ''" width="45" :src="sponsor.img" :alt="sponsor.name" />
      <div>
        <p>
          <span class="name">测试文本</span>
        </p>
        <p>测试文本</p>
      </div>
    </a>
  </div>
</template>
