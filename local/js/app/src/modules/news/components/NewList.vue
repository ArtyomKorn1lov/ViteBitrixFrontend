<template>
  <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px">
    <div>{{ count }}</div>
    <el-button @click="increment">Increment</el-button>
    <el-button @click="decrement">Decrement</el-button>
  </div>
  <div
    class="news-list"
    :class="$style['b-newList']"
    v-loading="isLoading"
  >
    <NewCard
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
  <el-pagination
    background
    layout="prev, pager, next"
    v-model:current-page="page"
    :page-count="3"
    @change="nextPage"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElButton, ElPagination } from 'element-plus';
import { DependencyInjection, TemplateHelper, useFetch } from '@/core';
import { useCounterHook } from '@/modules/catalog';
import { News } from '@/modules/news/models';
import { GetNews } from '@/modules/news/use-case';
import NewCard from '@/modules/news/components/NewCard.vue';

const { count, increment, decrement } = useCounterHook();

const getNews: GetNews = DependencyInjection.resolve('GetNews');

const fetchNews = useFetch<GetNews, News[]>({
  useCase: getNews,
});

const items = ref<News[]>([]);
const page = ref<number>(1);
const isLoading = ref<boolean>(false);

const nextPage = async (): Promise<void> => {
  try {
    TemplateHelper.scrollToElement('.news-list');
    isLoading.value = true;
    items.value = await fetchNews(page.value);
    isLoading.value = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    isLoading.value = false;
  }
};

nextPage();
</script>
<style scoped module lang="scss">
.b-newList {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 10px;
}
</style>
