<template>
  <div
    class="b-account"
    :class="customClass"
  >
    <el-avatar
      class="b-account__avatar"
      :src="avatarSrc"
      :alt="author.name"
    />
    <span class="b-account__name">
      {{ author.name }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ElAvatar } from 'element-plus';
import { Author } from '@/modules/forum/models';

const { customClass, author } = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  author: {
    type: Object as PropType<Author>,
    required: true,
  },
});

const avatarSrc = computed<string>(() => {
  if (!author.picture) {
    return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  }
  return author.picture.src;
});
</script>
