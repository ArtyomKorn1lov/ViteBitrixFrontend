<template>
  <div>
    <h2>{{ t('catalog.related.title') }}</h2>
    <el-carousel
      v-if="showItems"
      :autoplay="false"
      height="auto"
      indicator-position="outside"
    >
      <el-carousel-item
        style="height: 390px"
        v-for="item in items"
        :key="item.id"
      >
        <CatalogCard :item="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { DependencyContainer, useFetchingOld } from '@/core';
import { CatalogItem } from '@/modules/catalog/models';
import { GetRelated } from '@/modules/catalog/use-case';
import CatalogCard from '@/modules/catalog/components/CatalogCard.vue';

const { t } = useI18n();

const getRelated: GetRelated = DependencyContainer.get(GetRelated);

const {
  data: items,
  isLoading,
  error,
} = useFetchingOld<GetRelated, CatalogItem[]>({
  useCase: getRelated,
});

const showItems = computed<boolean>(() => {
  return !!items.value && items.value.length > 0 && !isLoading.value && !error.value;
});
</script>
