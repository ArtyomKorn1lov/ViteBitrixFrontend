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
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { ElCollapse } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { Group } from '@/modules/forum/models';
import GroupComponent from '@/modules/forum/components/Group.vue';

const { t } = useI18n();

const activeGroupIds = ref<number[]>([]);

const groups: Group[] = [
  {
    id: 1,
    title: 'Обсуждение модулей для Magisk',
    code: 'code-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et explicabo facilis id laborum, nemo soluta.',
  },
  {
    id: 2,
    title: 'Заявки на русификацию приложений',
    code: 'code-2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et explicabo facilis id laborum, nemo soluta. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et explicabo facilis id laborum, nemo soluta.',
  },
];
</script>
