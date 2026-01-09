<template>
  <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px">
    <div>{{ count }}</div>
    <el-button @click="increment">Increment</el-button>
    <el-button @click="decrement">Decrement</el-button>
  </div>
  <div
    :id="item.id.toString()"
    :class="$style['b-newsDetail']"
  >
    <div :class="$style['b-newsDetail__top']">
      <div :class="$style['b-newsDetail__img-wrap']">
        <img
          v-if="item.picture?.src"
          :src="item.picture.src"
          :class="$style['b-newsDetail__img']"
        />
      </div>
      <div :class="$style['b-newsDetail__info']">
        <div
          v-if="item.tag"
          :class="$style['b-newsDetail__tag']"
          v-html="item.tag"
        />
        <div
          v-if="item.section"
          :class="$style['b-newsDetail__section']"
          v-html="item.section"
        />
        <time
          v-if="item.date"
          :class="$style['b-newsDetail__time']"
          v-html="item.date"
        />
      </div>
    </div>
    <p
      v-if="item.description"
      v-html="item.description"
    />
    <div :class="$style['b-newsDetail__bottom']">
      <CatalogSlider />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { CatalogSlider, useCounterHook } from '@/modules/catalog';
import { News } from '@/modules/news';
import { ElButton } from 'element-plus';

const { count, increment, decrement } = useCounterHook();

const item = ref<News>({
  id: 1,
  date: '27.05.2010',
  description:
    'Получено новое прочное водостойкое клеевое соединение.Изобретение относится к области получения и применения клеящих составов, используемых в деревообрабатывающей, мебельной и строительной промышленности. Данная клеевая композиция предназначена только для горячего прессования и имеет в своем составе многокомпонентный отвердитель.',
  name: 'Получено прочное водостойкое соединение',
  picture: {
    src: '/local/js/frontend/dist/img/img_1.jpg',
  },
  section: 'Новости',
  tag: 'Новинка',
});
</script>
<style scoped module lang="scss">
.b-newsDetail {
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-wrap {
      max-width: 195px;
      aspect-ratio: 195/250;
      padding: 5px;
      overflow: hidden;
    }
  }

  &__top {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;
  }

  &__tag {
    padding: 5px 8px;
    border-radius: 5px;
    background-color: rgba(224, 49, 33, 0.24);
    text-decoration: none;
    color: rgb(224 49 33);
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    position: relative;
  }

  &__section {
    padding: 5px 8px;
    border-radius: 5px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    position: relative;
  }

  &__time {
    font-size: 12px;
    color: #999;
  }

  &__name {
    font-size: 24px;
    font-weight: 500;
  }

  &__bottom {
    max-width: 200px;
  }
}
</style>
