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
      label="Name"
      prop="name"
    >
      <el-input
        v-model="formData['name']"
        placeholder="Enter name"
      />
    </el-form-item>
    <el-form-item
      label="Email"
      prop="email"
    >
      <el-input
        v-model="formData['email']"
        placeholder="Enter email"
      />
    </el-form-item>
    <el-form-item
      label="Description"
      prop="description"
    >
      <el-input
        v-model="formData['description']"
        type="textarea"
        placeholder="Enter description"
      />
    </el-form-item>
    <el-button
      type="primary"
      native-type="submit"
      :loading="isLoading"
    >
      Submit
    </el-button>
  </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, FormInstance, FormRules } from 'element-plus';
import { CommonResponse, DependencyContainer, EmailRegex, MessageHelper, MessageTypes, ResponseStatus, useFetch } from '@/core';
import { FeedbackModel } from '@/modules/feedback/models';
import { SendFeedback } from '@/modules/feedback/use-case';

const fetchFeedback = useFetch<SendFeedback, CommonResponse>({
  useCase: DependencyContainer.get(SendFeedback),
  messageType: MessageTypes.messageBox,
});

const formRef = ref<FormInstance>();
const isLoading = ref<boolean>();

const emailValidator = (rule: any, value: any, callback: any): any => {
  if (EmailRegex.test(value)) {
    return callback();
  }
  return callback(new Error('Invalid email'));
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
      message: 'Field is required',
      trigger: 'blur',
    },
    {
      required: true,
      message: 'Field is required',
      trigger: 'change',
    },
  ],
  email: [
    {
      required: true,
      message: 'Field is required',
      trigger: 'blur',
    },
    {
      required: true,
      message: 'Field is required',
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
      title: 'success',
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
