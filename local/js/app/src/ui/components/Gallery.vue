<template>
  <el-carousel
    class="b-gallery"
    :class="customClass"
    :autoplay="false"
    indicator-position="outside"
  >
    <el-carousel-item
      v-for="(picture, index) in items"
      :key="index"
      class="b-gallery__item"
    >
      <div class="b-gallery__img-wrap">
        <img
          class="img-cover"
          :src="picture.src"
          :alt="index.toString()"
        />
      </div>
    </el-carousel-item>
  </el-carousel>
</template>
<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { Picture } from '@/core';
import { PropType } from 'vue';

const { customClass, items } = defineProps({
  customClass: {
    type: String,
    default: '',
  },
  items: {
    type: Array as PropType<Picture[]>,
    default: () => [],
  },
});
</script>
