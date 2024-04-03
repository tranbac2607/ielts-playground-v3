<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue';

import MainExamContent from './MainExamContent.vue';
import QuestionNavigator from './QuestionNavigator.vue';
import ExamPartItemDescription from '../exam-content/exam-part-item/exam-part-item-description.vue';

import { DataContentType, NumericalOrder, TypeQuestionType } from './models';

const props = defineProps<{
  listQuestion: DataContentType[];
  listTypeQuestion?: TypeQuestionType;
}>();

const questionActive = ref(1);
const isReview = ref(false);
const partActive = ref(1);
const numericalOrderInPart = ref<NumericalOrder>({
  firstNumber: 0,
  lastNumber: 0,
});

const listQuestionInPart = computed(() => {
  return props.listQuestion.filter((item) => item.part === 1 || item.part === 1);
});

const listQuestionTypeInPart = computed(() => {
  return props.listTypeQuestion ? props.listTypeQuestion[`part${1}`] : [];
});

watch(
  [props.listQuestion, questionActive.value, partActive.value] as const,
  ([newListQuestion, newQuestionActive, newPartActive]) => {
    let numericalOrder = { first: 0, last: 0 };
    let questionInActive: DataContentType | undefined;
    questionInActive = newListQuestion.find((item) => item.subId === newQuestionActive);
    if (!questionInActive) {
      questionInActive = newListQuestion.find((item) => item.subId === newQuestionActive + 1);
    }

    const listQuestionFilterWithPart = newListQuestion.filter(
      (item) => item.part === newPartActive || item.part === questionInActive?.part
    );

    numericalOrder = {
      first: listQuestionFilterWithPart[0]?.id,
      last: listQuestionFilterWithPart[listQuestionFilterWithPart.length - 1]?.id,
    };

    // setNumericalOrderInPart(numericalOrder);
    // setPartActive(questionInActive?.part || 1);
  }
);
</script>

<template>
  <ExamPartItemDescription
    isListening
    :partActive="partActive"
    :numericalOrderInPart="numericalOrderInPart"
  />

  <MainExamContent
    isListening
    :listQuestionInPart="listQuestionInPart"
    :listQuestionTypeInPart="listQuestionTypeInPart"
    :leftContent="[]"
  />

  <QuestionNavigator
    :listQuestion="listQuestion"
    :questionActive="questionActive"
    :isReview="isReview"
  />
</template>
