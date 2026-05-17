<template>
  <div class="b-body">
    <div class="b-section b-section_pt b-section_pb">
      <div class="b-section__top">
        <h1 v-html="t('forum.main.title')" />
        <p v-html="t('forum.main.description')" />
      </div>
      <el-collapse
        v-model="activeGroupIds"
        class="b-forum"
      >
        <GroupComponent
          v-for="group in groups"
          :key="group.id"
          :group="group"
        />
      </el-collapse>
      <div class="b-section__bottom">
        <el-button
          v-if="showNextBtn"
          class="b-btn b-btn_medium b-btn_primary"
          :loading="isLoading"
          @click="nextPage"
        >
          {{ t('forum.topic.nextPageTitle') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElCollapse, ElButton } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { DependencyContainer, useFetch } from '@/core';
import { GROUPS_LIST_LENGTH } from '@/modules/forum/constants';
import { Group } from '@/modules/forum/models';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import GroupComponent from '@/modules/forum/components/Group.vue';

const topicRepository: TopicRepositoryInterface = DependencyContainer.get(TopicRepositoryServiceId);

const { t } = useI18n();

const activeGroupIds = ref<number[]>([]);
const groups = ref<Group[]>([]);
const page = ref<number>(1);
const showNextBtn = ref<boolean>(true);

const { fetch: fetchGroups, isLoading } = useFetch<Group[]>({
  callback: async (page?: number) => await topicRepository.getGroups(page),
});

const nextPage = async (): Promise<void> => {
  page.value++;
  const response: Group[] = await refresh();
  groups.value = [...groups.value, ...(response ?? [])];
};

const refresh = async (): Promise<Group[]> => {
  try {
    const response: Group[] = await fetchGroups(page.value);
    checkLength(response.length);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return [];
  }
};

const checkLength = (length: number): void => {
  const result: boolean = length < GROUPS_LIST_LENGTH;
  if (result) {
    showNextBtn.value = false;
  }
};

const onInit = async (): Promise<void> => {
  groups.value = await refresh();
};

onInit();
</script>
