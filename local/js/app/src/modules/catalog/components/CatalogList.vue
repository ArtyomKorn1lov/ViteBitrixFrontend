<template>
  <div style="margin-bottom: 20px">
    <el-button
      type="primary"
      @click="navigateFeedback"
    >
      Feedback
    </el-button>
  </div>
  <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px">
    <div>{{ count }}</div>
    <el-button @click="increment">Increment</el-button>
    <el-button @click="decrement">Decrement</el-button>
  </div>
  <div :class="$style['b-catalogList']">
    <CatalogCard
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElButton } from 'element-plus';
import { CatalogItem } from '@/modules/catalog/models';
import { useCounterHook } from '@/modules/catalog';
import CatalogCard from '@/modules/catalog/components/CatalogCard.vue';

const { count, increment, decrement } = useCounterHook();

const items = ref<CatalogItem[]>([
  {
    id: 1,
    name: 'Товар 1',
    picture: {
      src: '',
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, error.',
    tag: 'Новинка',
    date: '21.07.2025',
  },
  {
    id: 2,
    name: 'Товар 2',
    picture: {
      src: '',
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, error.',
    tag: 'Хит',
    date: '21.07.2025',
  },
  {
    id: 3,
    name: 'Товар 3',
    picture: {
      src: '',
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, error.',
    tag: 'Хит',
    date: '21.07.2025',
  },
]);

const navigateFeedback = () => {
  window.location.href = '/test-catalog/feedback/';
};
</script>
<style scoped module lang="scss">
.b-catalogList {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
</style>
