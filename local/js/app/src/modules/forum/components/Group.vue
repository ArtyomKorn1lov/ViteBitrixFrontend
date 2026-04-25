<template>
  <el-collapse-item
    class="b-forum-group"
    :name="group.id"
  >
    <template #title>
      <div class="b-forum-group__top">
        <h2 class="b-forum-group__title">
          {{ group.title }}
        </h2>
        <div
          v-if="group.description"
          class="b-forum-group__desc"
          v-html="group.description"
        />
      </div>
    </template>
    <div class="b-forum-group__topics">
      <TopicComponent
        v-for="item in topics"
        :key="item.id"
        :item="item"
      />
      <el-button
        v-if="showNextBtn"
        class="b-btn b-btn_medium b-btn_primary"
        :loading="isLoading"
        @click="nextPage"
      >
        {{ t('forum.topic.nextPageTitle') }}
      </el-button>
    </div>
  </el-collapse-item>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElCollapseItem, ElButton } from 'element-plus';
import { DependencyContainer, useFetch } from '@/core';
import { ITEMS_LIST_LENGTH } from '@/modules/forum/constants';
import { Group, Topic } from '@/modules/forum/models';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import TopicComponent from '@/modules/forum/components/Topic.vue';

const topicRepository: TopicRepositoryInterface = DependencyContainer.get(TopicRepositoryServiceId);

const { group } = defineProps({
  group: {
    type: Object as PropType<Group>,
    required: true,
  },
});

const { t } = useI18n();

const topics = ref<Topic[]>(group.topics ?? []);
const page = ref<number>(1);
const showNextBtn = ref<boolean>(true);

const { fetch: fetchTopics, isLoading } = useFetch<Topic[]>({
  callback: async (groupId?: number, page?: number) => await topicRepository.getTopics(groupId, page),
});

const nextPage = async (): Promise<void> => {
  page.value++;
  const response: Topic[] = await refresh();
  topics.value = [...topics.value, ...(response ?? [])];
};

const refresh = async (): Promise<Topic[]> => {
  try {
    const response: Topic[] = await fetchTopics(group.id, page.value);
    checkLength(response.length);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return [];
  }
};

const checkLength = (length: number): void => {
  const result: boolean = length < ITEMS_LIST_LENGTH;
  if (result) {
    showNextBtn.value = false;
  }
};

const onInit = () => {
  checkLength(topics.value.length);
};

onInit();
</script>
