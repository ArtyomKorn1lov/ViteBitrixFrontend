<template>
  <el-form
    v-if="!isLoading && !error"
    label-width="auto"
    label-position="top"
    :model="formData"
    :rules="rules"
  >
    <el-form-item
      :label="t('forum.form.fields.name.title')"
      prop="name"
    >
      <el-input
        v-model="formData.name"
        :placeholder="t('forum.form.fields.name.placeholder')"
      />
    </el-form-item>
    <el-form-item
      :label="t('forum.form.fields.section.title')"
      prop="sectionId"
    >
      <el-select
        v-model="formData.sectionId"
        :placeholder="t('forum.form.fields.section.placeholder')"
      >
        <el-option
          v-for="item in topicCreateData?.groups"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="t('forum.form.fields.tags.title')"
      prop="tagIds"
    >
      <el-select
        v-model="formData.tagIds"
        :placeholder="t('forum.form.fields.tags.placeholder')"
        multiple
      >
        <el-option
          v-for="item in topicCreateData?.tags"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :label="t('forum.form.fields.previewText.title')"
      prop="previewText"
    >
      <el-input
        v-model="formData.previewText"
        type="textarea"
        :rows="4"
        :placeholder="t('forum.form.fields.previewText.placeholder')"
      />
    </el-form-item>
    <el-form-item
      :label="t('forum.form.fields.detailText.title')"
      prop="detailText"
    >
      <el-input
        v-model="formData.detailText"
        type="textarea"
        :rows="10"
        :placeholder="t('forum.form.fields.detailText.placeholder')"
      />
    </el-form-item>
    <el-form-item
      :label="t('forum.form.fields.pictures.title')"
      prop="pictureIds"
    >
      <el-upload
        multiple
        drag
        :before-upload="beforeFileUpload"
        :on-success="(response) => handleFileUpload(formData, 'pictureIds', response)"
        :http-request="sendUploadRequest"
        :disabled="isLoadingUpload"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-button
      type="primary"
      native-type="submit"
      :loading="isLoading"
    >
      {{ t('forum.form.submitText') }}
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import { PropType, reactive } from 'vue';
import { ElForm, ElInput, ElSelect, ElOption, ElUpload, ElIcon, FormRules, ElButton } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { DependencyContainer, useFetching, useFileUpload } from '@/core';
import { FormTypes } from '@/modules/forum/enums';
import { TopicCreateData, TopicCreate, TopicUpdate } from '@/modules/forum/models';
import { GetTopicCreateData } from '@/modules/forum/use-cases';

const getTopicCreateData: GetTopicCreateData = DependencyContainer.get(GetTopicCreateData);

const { type, topicId } = defineProps({
  type: {
    type: Object as PropType<FormTypes>,
    default: () => FormTypes.create,
  },
  topicId: {
    type: Number,
    default: 0,
  },
});

const {
  data: topicCreateData,
  error,
  isLoading,
} = useFetching<TopicCreateData>({
  callback: () => getTopicCreateData.execute(),
});

const { isLoading: isLoadingUpload, beforeFileUpload, sendRequest: sendUploadRequest, handleFileUpload } = useFileUpload();

const { t } = useI18n();

const rules = reactive<FormRules<TopicCreate>>({
  name: [
    {
      required: true,
      message: t('forum.form.validators.isRequired'),
      trigger: 'blur',
    },
    {
      required: true,
      message: t('forum.form.validators.isRequired'),
      trigger: 'change',
    },
  ],
  sectionId: [
    {
      required: true,
      message: t('forum.form.validators.isRequired'),
      trigger: 'blur',
    },
    {
      required: true,
      message: t('forum.form.validators.isRequired'),
      trigger: 'change',
    },
  ],
});

const buildInitFormData = (): TopicCreate | TopicUpdate => {
  const object: TopicCreate = {
    name: '',
    sectionId: 0,
    tagIds: [],
    previewText: '',
    detailText: '',
    pictureIds: [],
  };
  if (type === FormTypes.edit) {
    return object;
  }
  return {
    ...object,
    id: topicId,
  } as TopicUpdate;
};

const formData = reactive<TopicCreate | TopicUpdate>(buildInitFormData());
</script>
