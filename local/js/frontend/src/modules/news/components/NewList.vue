<template>
  <div :class="$style['b-newList']">
    <NewCard
        v-for="item in items"
        :key="item.id"
        :item="item"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { NewItem } from "@/modules/news/models";
import NewCard from "@/modules/news/components/NewCard.vue";

const items = ref<NewItem[]>([
  {
    id: 1,
    name: "Новость 1",
    section: "Здоровье",
    picture: {
      src: '/local/js/frontend/dist/img/img_1.jpg'
    },
    tag: 'Новость',
    date: '21.07.2025'
  },
  {
    id: 2,
    name: "Новость 2",
    section: "Политика",
    picture: {
      src: '/local/js/frontend/dist/img/img_2.jpg'
    },
    tag: 'Статья',
    date: '21.07.2025'
  },
  {
    id: 3,
    name: "Новость 3",
    section: "Дом",
    picture: {
      src: '/local/js/frontend/dist/img/img_3.jpg'
    },
    tag: 'Статья',
    date: '21.07.2025'
  }
]);
</script>
<style scoped module lang="scss">
.b-newList {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
</style>