<template>
  <el-collapse-item
    class="b-forum-group"
    :name="group.id"
  >
    <template #title>
      <div class="b-forum-group__top">
        <div class="b-forum-group__title">
          {{ group.title }}
        </div>
        <div
          v-if="group.description"
          class="b-forum-group__desc"
          v-html="group.description"
        />
      </div>
    </template>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, sapiente.</p>
  </el-collapse-item>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { ElCollapseItem } from 'element-plus';
import { Group } from '@/modules/forum/models';

const { group } = defineProps({
  group: {
    type: Object as PropType<Group>,
    required: true,
  },
});
</script>
