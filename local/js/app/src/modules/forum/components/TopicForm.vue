<template>
  <el-form
    v-if="!isLoading && !error"
    class="b-form"
    ref="formRef"
    label-width="auto"
    label-position="top"
    :model="formData"
    :rules="rules"
    @submit.prevent="submit(formRef)"
  >
    <h2>{{ formTitle }}</h2>
    <el-form-item
      class="b-form-item"
      :label="t('forum.form.fields.name.title')"
      prop="name"
    >
      <el-input
        v-model="formData.name"
        :placeholder="t('forum.form.fields.name.placeholder')"
      />
    </el-form-item>
    <el-form-item
      class="b-form-item"
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
      class="b-form-item"
      :label="t('forum.form.fields.tags.title')"
      prop="tagUIds"
    >
      <el-select
        v-model="formData.tagUIds"
        :placeholder="t('forum.form.fields.tags.placeholder')"
        multiple
      >
        <el-option
          v-for="item in topicCreateData?.tags"
          :key="item.uId"
          :label="item.title"
          :value="item.uId"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      class="b-form-item"
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
      class="b-form-item"
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
      class="b-form-item"
      :label="t('forum.form.fields.pictures.title')"
      prop="pictureIds"
    >
      <el-upload
        class="b-upload"
        multiple
        drag
        :before-upload="beforeFileUpload"
        :on-success="(response: any) => handleFileUpload(formData, 'pictures', response)"
        :on-remove="(response: any) => removeFile(formData, 'pictures', response?.response)"
        :http-request="sendUploadRequest"
        :disabled="isLoadingUpload"
        :limit="5"
        list-type="picture"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
    </el-form-item>
    <el-button
      class="b-btn b-btn_medium b-btn_primary"
      type="primary"
      native-type="submit"
      :loading="isLoadingForm"
    >
      {{ t('forum.form.submitText') }}
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElIcon, ElInput, ElOption, ElSelect, ElUpload, FormInstance, FormRules } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import {
  CommonResponse,
  DependencyContainer,
  MessageHelper,
  MessageTypes,
  ResponseStatus,
  UrlHelper,
  useFetch,
  useFetching,
  useFileUpload,
} from '@/core';
import { FormTypes } from '@/modules/forum/enums';
import { TopicCreate, TopicCreateData, TopicFormData, TopicUpdate } from '@/modules/forum/models';
import { CreateTopic, GetTopicCreateData, UpdateTopic } from '@/modules/forum/use-cases';
import { TopicMapper } from '@/modules/forum/mappers';

const getTopicCreateData: GetTopicCreateData = DependencyContainer.get(GetTopicCreateData);
const topicCreate: CreateTopic = DependencyContainer.get(CreateTopic);
const topicUpdate: UpdateTopic = DependencyContainer.get(UpdateTopic);

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

const { t } = useI18n();

const {
  data: topicCreateData,
  error,
  isLoading,
} = useFetching<TopicCreateData>({
  callback: async () => await getTopicCreateData.execute(),
});
const { fetch: fetchCreate, isLoading: isLoadingCreate } = useFetch<CommonResponse>({
  callback: async (object: TopicCreate) => await topicCreate.execute(object),
  messageType: MessageTypes.messageBox,
});
const { fetch: fetchUpdate, isLoading: isLoadingUpdate } = useFetch<CommonResponse>({
  callback: async (object: TopicUpdate) => await topicUpdate.execute(object),
  messageType: MessageTypes.messageBox,
});

const { isLoading: isLoadingUpload, beforeFileUpload, sendRequest: sendUploadRequest, handleFileUpload, removeFile } = useFileUpload();

const rules = reactive<FormRules<TopicFormData>>({
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
const formData = reactive<TopicFormData>({
  name: '',
  sectionId: undefined,
  tagUIds: [],
  previewText: '',
  detailText: '',
  pictures: [],
});
const formRef = ref<FormInstance>();

const isEdit = computed(() => type === FormTypes.edit);
const formTitle = computed<string>(() => (isEdit.value ? t('forum.form.title.edit') : t('forum.form.title.create')));
const isLoadingForm = computed<boolean>(() => isLoadingCreate.value || isLoadingUpdate.value);

const submit = async (formRef: FormInstance | undefined): Promise<void> => {
  if (!formRef) {
    return;
  }

  await formRef.validate(async (valid: boolean) => {
    if (!valid) {
      return;
    }
    await sendRequest(formRef);
  });
};

const sendRequest = async (formRef: FormInstance | undefined): Promise<void> => {
  try {
    let object: TopicCreate | TopicUpdate;
    let response: CommonResponse;
    if (isEdit.value) {
      object = TopicMapper.fromFormDataToCreate(formData);
      response = await fetchUpdate(object);
    } else {
      object = TopicMapper.fromFormDataToUpdate(formData, topicId);
      response = await fetchCreate(object);
    }
    await MessageHelper.showMessageBox({
      title: t('core.messages.successTitle'),
      message: response.message,
      type: ResponseStatus.success,
      callback: () => {
        formRef?.resetFields();
        UrlHelper.reloadPage();
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    /* empty */
  }
};
</script>
