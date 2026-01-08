<template>
  <div
    :id="item.id.toString()"
    :class="$style['b-catalogCard']"
  >
    <div :class="$style['b-catalogCard__img-wrap']">
      <img
        v-if="item.picture?.src"
        :src="item.picture.src"
        :class="$style['b-catalogCard__img']"
      />
    </div>
    <div style="padding: 14px">
      <div :class="$style['b-catalogCard__top']">
        <span v-html="item.name"></span>
        <div
          v-if="!!item.tag"
          :class="$style['b-catalogCard__tag']"
          v-html="item.tag"
        ></div>
      </div>
      <div :class="$style['b-catalogCard__bottom']">
        <time
          v-if="!!item.date"
          :class="$style['b-catalogCard__time']"
          v-html="item.date"
        ></time>
        <button
          @click="clickButton"
          :class="$style['b-catalogCard__button']"
        >
          Подробнее
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CatalogItem } from '@/modules/catalog/models';
import type { PropType } from 'vue';

const { item } = defineProps({
  item: {
    type: Object as PropType<CatalogItem>,
    required: true,
  },
});

const clickButton = (): void => {
  console.log('click to button');
};
</script>
<style scoped module lang="scss">
.b-catalogCard {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid black;
  padding: 10px;
  gap: 20px;
  max-width: 300px;
  margin-bottom: 20px;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-wrap {
      aspect-ratio: 195/250;
      padding: 5px;
      overflow: hidden;
    }
  }

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13px;
    line-height: 12px;
  }

  &__time {
    font-size: 12px;
    color: #999;
  }

  &__btn {
    padding: 10px;
    min-height: auto;
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
}
</style>
