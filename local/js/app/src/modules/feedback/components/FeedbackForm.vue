<template>
  <el-form
    ref="formRef"
    style="max-width: 400px"
    label-width="auto"
    label-position="top"
    :model="formData"
    :rules="rules"
    @submit.prevent="submit(formRef)"
  >
    <el-form-item
      :label="t('feedback.form.fields.name.title')"
      prop="name"
    >
      <el-input
        v-model="formData['name']"
        :placeholder="t('feedback.form.fields.name.placeholder')"
      />
    </el-form-item>
    <el-form-item
      :label="t('feedback.form.fields.email.title')"
      prop="email"
    >
      <el-input
        v-model="formData['email']"
        :placeholder="t('feedback.form.fields.email.placeholder')"
      />
    </el-form-item>
    <el-form-item
      :label="t('feedback.form.fields.description.title')"
      prop="description"
    >
      <el-input
        v-model="formData['description']"
        type="textarea"
        :placeholder="t('feedback.form.fields.description.placeholder')"
      />
    </el-form-item>
    <el-button
      type="primary"
      native-type="submit"
      :loading="isLoading"
    >
      {{ t('feedback.form.submitTitle') }}
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, FormInstance, FormRules } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { CommonResponse, DependencyContainer, EmailRegex, MessageHelper, MessageTypes, ResponseStatus, useFetchOld } from '@/core';
import { FeedbackModel } from '@/modules/feedback/models';
import { SendFeedback } from '@/modules/feedback/use-case';

const { t } = useI18n();

const fetchFeedback = useFetchOld<SendFeedback, CommonResponse>({
  useCase: DependencyContainer.get(SendFeedback),
  messageType: MessageTypes.messageBox,
});

const formRef = ref<FormInstance>();
const isLoading = ref<boolean>();

const emailValidator = (rule: any, value: any, callback: any): any => {
  if (EmailRegex.test(value)) {
    return callback();
  }
  return callback(new Error(t('feedback.form.validators.invalidEmail')));
};

const formData = reactive<FeedbackModel>({
  name: '',
  email: '',
  description: '',
});

const rules = reactive<FormRules<FeedbackModel>>({
  name: [
    {
      required: true,
      message: t('feedback.form.validators.isRequired'),
      trigger: 'blur',
    },
    {
      required: true,
      message: t('feedback.form.validators.isRequired'),
      trigger: 'change',
    },
  ],
  email: [
    {
      required: true,
      message: t('feedback.form.validators.isRequired'),
      trigger: 'blur',
    },
    {
      required: true,
      message: t('feedback.form.validators.isRequired'),
      trigger: 'change',
    },
    {
      validator: emailValidator,
      trigger: 'blur',
    },
    {
      validator: emailValidator,
      trigger: 'change',
    },
  ],
});

const submit = async (formRef: FormInstance | undefined): Promise<void> => {
  if (!formRef) {
    return;
  }

  await formRef.validate(async (valid) => {
    if (!valid) {
      return;
    }
    await sendForm(formRef);
  });
};

const sendForm = async (formRef: FormInstance | undefined): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await fetchFeedback(formData);
    isLoading.value = false;
    await MessageHelper.showMessageBox({
      title: t('feedback.form.successTitle'),
      message: response?.message,
      type: ResponseStatus.success,
      callback: () => {
        formRef?.resetFields();
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    isLoading.value = false;
  }
};
</script>
