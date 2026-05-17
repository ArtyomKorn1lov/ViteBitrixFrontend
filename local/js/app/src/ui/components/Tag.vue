<template>
  <div
    class="b-tag"
    :class="className"
  >
    {{ tag.title }}
  </div>
</template>
<script setup lang="ts">
import { PropType, computed } from 'vue';
import { Tag } from '@/core';

const { tag } = defineProps({
  tag: {
    type: Object as PropType<Tag>,
    required: true,
  },
});

const className = computed<string>(() => `b-tag_${tag.code}`);
</script>
