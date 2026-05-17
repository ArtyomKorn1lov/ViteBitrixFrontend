<template>
  <div class="b-section b-section_pt b-section_pb b-forum">
    <div class="b-section__top">
      <a
        class="b-btn b-btn_medium b-btn_primary"
        href="/forum"
      >
        {{ t('forum.topic.backTitle') }}
      </a>
      <el-button
        v-if="canEdit && !showEdit"
        class="b-btn b-btn_medium b-btn_primary"
        @click="showEdit = true"
      >
        {{ t('forum.topic.editTitle') }}
      </el-button>
    </div>
    <TopicForm
      v-if="showEdit && canEdit"
      :key="id"
      :topic-id="id"
      :type="FormTypes.edit"
    />
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElButton } from 'element-plus';
import { DependencyContainer, useFetching } from '@/core';
import { FormTypes } from '@/modules/forum/enums';
import { TopicDetail } from '@/modules/forum/models';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import TopicComponent from '@/modules/forum/components/Topic.vue';
import TopicForm from '@/modules/forum/components/TopicForm.vue';

const topicRepository: TopicRepositoryInterface = DependencyContainer.get(TopicRepositoryServiceId);

const { id, canEdit } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();

const showEdit = ref<boolean>(false);

const {
  data: topicDetail,
  isLoading,
  error,
} = useFetching<TopicDetail>({
  callback: async (id: number) => await topicRepository.getTopicById(id),
  args: [id],
});
</script>
