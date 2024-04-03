<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import ExamContentContainer from '@/components/exam-content/ExamContentContainer.vue';
import { DataContentType, TypeQuestionType } from '@/components/exam-content/models';
import { transformDataExam } from '@/components/exam-content/utils';
import { DATA_MOCK_LISTENING } from '@/components/exam-content/constants';

const listQuestion = ref<DataContentType[]>([
  {
    id: 1,
    subId: 1,
    part: 1,
    type: 'answer-paragraph-listening',
    numberOrder: 2,
    questionTitle: '',
    text: ' Complete the notes below.\n\nWrite **ONE WORD AND/OR A NUMBER** for each answer.\n\n\n\n<div class="title">Riverdale Pre-school</div>\n\n **Classes:**\n\nFirst group - Mrs. Oliver.\n\nSecond group - Mrs. ',
    lastText: '. ',
    isDownLine: false,
    options: null,
    value: '',
    isAnswer: false,
    isReview: false,
  },
]);
const listTypeQuestion = ref<TypeQuestionType | undefined>(undefined);
console.log('listTypeQuestion', listTypeQuestion.value);

onBeforeMount(() => {
  const getData = () => {
    const data = transformDataExam(DATA_MOCK_LISTENING);
    console.log('🚀 ~ onBeforeMount ~ data:', data.listTypeQuestion);
    listQuestion.value = data.dataContent;
    listTypeQuestion.value = data.listTypeQuestion;
  };
  getData();
});
</script>

<template>
  <ExamContentContainer :listQuestion="listQuestion" :listTypeQuestion="listTypeQuestion" />
</template>
