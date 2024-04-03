<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import ExamContentContainer from '@/components/exam-content/exam-content-container.vue';
import { DataContentType, TypeQuestionType } from '@/components/exam-content/models';
import { transformDataExam } from '@/components/exam-content/utils';
import { DATA_MOCK_LISTENING } from '@/components/exam-content/constants';

const listQuestion = ref<DataContentType[]>([]);
const listTypeQuestion = ref<TypeQuestionType | undefined>(undefined);

onBeforeMount(() => {
  const getData = () => {
    const data = transformDataExam(DATA_MOCK_LISTENING);
    listQuestion.value = data.dataContent;
    listTypeQuestion.value = data.listTypeQuestion;
  };
  getData();
});
</script>

<template>
  <ExamContentContainer :listQuestion="listQuestion" :listTypeQuestion="listTypeQuestion" />
</template>
