<template>
  <el-collapse-item
    class="b-forum-group"
    :name="group.id"
  >
    <template #title>
      <div class="b-forum-group__top">
        <h2 class="b-forum-group__title">
          {{ group.title }}
        </h2>
        <div
          v-if="group.description"
          class="b-forum-group__desc"
          v-html="group.description"
        />
      </div>
    </template>
    <div class="b-forum-group__topics">
      <TopicComponent
        v-for="item in topics"
        :key="item.id"
        :item="item"
      />
    </div>
  </el-collapse-item>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { ElCollapseItem } from 'element-plus';
import { Group, Topic } from '@/modules/forum/models';
import TopicComponent from '@/modules/forum/components/Topic.vue';

const { group } = defineProps({
  group: {
    type: Object as PropType<Group>,
    required: true,
  },
});

const topics: Topic[] = [
  {
    id: 1,
    name: 'Каталог программ для Mocor5 OS',
    date: new Date('2026-04-22'),
    author: {
      id: 1,
      name: 'Админ',
      picture: {
        src: '/local/js/app/dist/img/img_2.jpg',
      },
    },
    views: 23,
    detailUrl: '#',
    tags: [
      {
        title: 'Каталог программ',
        code: 'catalog',
      },
      {
        title: 'MocorDroid OS',
        code: 'mocor-droid',
      },
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, sapiente.',
    pictures: [
      {
        src: '/local/js/app/dist/img/img_1.jpg',
      },
      {
        src: '/local/js/app/dist/img/img_2.jpg',
      },
      {
        src: '/local/js/app/dist/img/img_3.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Помощь в поиске программ для Android OS',
    date: new Date('2026-04-21'),
    author: {
      id: 1,
      name: 'Модератор',
    },
    views: 23,
    detailUrl: '#',
    tags: [
      {
        title: 'Редирект',
        code: 'redirect',
      },
    ],
    description: 'Lorem ipsum dolor sit amet.',
  },
];
</script>
