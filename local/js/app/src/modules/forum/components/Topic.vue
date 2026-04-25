<template>
  <el-card
    class="b-forum-topic"
    header-class="b-forum-topic__header"
    footer-class="b-forum-topic__footer"
  >
    <template #header>
      <div class="b-forum-topic__header-left">
        <h3 class="b-forum-topic__title">
          {{ item.name }}
        </h3>
        <div
          v-if="item.tags && item.tags.length > 0"
          class="b-forum-topic__tags"
        >
          <Tag
            v-for="tag in item.tags"
            :key="tag.code"
            :tag="tag"
          />
        </div>
      </div>
      <div class="b-forum-topic__watch">
        <el-icon>
          <View />
        </el-icon>
        <span>{{ item.views ?? 0 }}</span>
      </div>
    </template>
    <el-collapse
      v-model="activeGroupIds"
      class="b-forum-topic__container"
    >
      <el-collapse-item
        class="b-forum-topic__container-item"
        :name="item.id"
        :title="t('forum.topic.showMoreTitle')"
      >
        <div class="b-forum-topic__slider">
          <Gallery
            v-if="item.pictures && item.pictures.length > 0"
            :items="item.pictures"
            custom-class="b-gallery_small"
          />
        </div>
        <div
          v-if="'description' in item"
          class="b-forum-topic__desc"
          v-html="item.description"
        />
        <div
          v-else
          class="b-forum-topic__desc-wrap"
        >
          <div
            v-if="'previewText' in item && item.previewText"
            class="b-forum-topic__desc"
            v-html="item.previewText"
          />
          <div
            v-if="'detailText' in item && item.detailText"
            class="b-forum-topic__desc"
            v-html="item.detailText"
          />
        </div>
        <a
          v-if="!('detailText' in item)"
          class="b-btn b-btn_secondary b-btn_medium b-btn_icon"
          :href="item.detailUrl"
        >
          <span>
            {{ t('forum.topic.detailText') }}
            <ArrowIcon class="b-btn__arrow" />
          </span>
        </a>
      </el-collapse-item>
    </el-collapse>
    <template #footer>
      <Account
        custom-class="b-account_row"
        :author="item.author"
      />
      <div
        v-if="dateCreated"
        class="b-forum-topic__date"
      >
        {{ t('forum.topic.datePublishTitle') + dateCreated }}
      </div>
    </template>
  </el-card>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { ElCard, ElIcon, ElCollapse, ElCollapseItem } from 'element-plus';
import { View } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { DateHelper } from '@/core';
import { Tag, Gallery, ArrowIcon } from '@/ui';
import { Topic, TopicDetail } from '@/modules/forum/models';
import Account from '@/modules/forum/components/Account.vue';

const { item } = defineProps({
  item: {
    type: Object as PropType<Topic | TopicDetail>,
    required: true,
  },
});

const { t } = useI18n();

const activeGroupIds = ref<number[]>([]);

const dateCreated = computed<string>(() => {
  if (!item.date || !(item.date instanceof Date)) {
    return '';
  }
  return DateHelper.formatToDDMMYYYY(item.date);
});

const onInit = () => {
  if ('detailText' in item) {
    activeGroupIds.value.push(item.id);
  }
};

onInit();
</script>
