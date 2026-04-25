<template>
  <div class="b-section b-section_pt b-section_pb b-forum">
    <div class="b-section__top">
      <a
        class="b-btn b-btn_medium b-btn_primary"
        href="/forum"
      >
        {{ t('forum.topic.backTitle') }}
      </a>
    </div>
    <div
      v-if="!isLoading && !error"
      class="b-forum__detail"
    >
      <TopicComponent
        v-if="topicDetail"
        :key="topicDetail.id"
        :item="topicDetail"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { DependencyContainer, useFetching } from '@/core';
import { TopicDetail } from '@/modules/forum/models';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import TopicComponent from '@/modules/forum/components/Topic.vue';

const topicRepository: TopicRepositoryInterface = DependencyContainer.get(TopicRepositoryServiceId);

const { id } = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const { t } = useI18n();

const {
  data: topicDetail,
  isLoading,
  error,
} = useFetching<TopicDetail>({
  callback: async (id: number) => await topicRepository.getTopicById(id),
  args: [id],
});
</script>
