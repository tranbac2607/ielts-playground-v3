<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

import MainExamContent from './main-exam-content.vue';
import QuestionNavigator from './question-navigator.vue';
import ExamPartItemDescription from '../exam-content/exam-part-item/exam-part-item-description.vue';

import { DataContentType, NumericalOrder, TypeQuestionType } from './models';
import useHandleChangeListQuestion from './use-handle-change-list-question';

const props = defineProps<{
  listQuestion: DataContentType[];
  listTypeQuestion?: TypeQuestionType;
}>();

const emit = defineEmits<(e: 'onChangeListQuestion', listQuestion: DataContentType[]) => void>();

const { getNewListWithChangeValue, getNewListWithChangeReview } = useHandleChangeListQuestion();

const listQuestionInPart = ref<DataContentType[]>([]);
const questionActive = ref(1);
const isReview = ref(false);
const partActive = ref(1);
const numericalOrderInPart = ref<NumericalOrder>({
  firstNumber: 0,
  lastNumber: 0,
});

const listQuestionTypeInPart = computed(() => {
  return props.listTypeQuestion?.[`part${partActive.value}`] || [];
});

watch(
  [props.listQuestion, questionActive, partActive],
  ([newListQuestion, newQuestionActive, newPartActive]) => {
    let numericalOrder = { firstNumber: 0, lastNumber: 0 };
    let questionInActive: DataContentType | undefined;
    questionInActive = newListQuestion.find((item) => item.subId === newQuestionActive);
    if (!questionInActive) {
      questionInActive = newListQuestion.find((item) => item.subId === newQuestionActive + 1);
    }

    const listQuestionFilterWithPart = newListQuestion.filter(
      (item) => item.part === newPartActive || item.part === questionInActive?.part
    );

    numericalOrder = {
      firstNumber: listQuestionFilterWithPart[0]?.id,
      lastNumber: listQuestionFilterWithPart[listQuestionFilterWithPart.length - 1]?.id,
    };

    numericalOrderInPart.value = numericalOrder;
    partActive.value = questionInActive?.part || 1;

    listQuestionInPart.value = props.listQuestion.filter(
      (item) => item.part === partActive.value || item.part === questionInActive?.part
    );
  },
  { immediate: true }
);

const handleSetQuestionActive = (questionSubId: number, partActiveBar: number) => {
  const question = props.listQuestion[questionSubId - 1];
  isReview.value = question.isReview;
  questionActive.value = questionSubId;
  partActive.value = partActiveBar;
};

const handleChangeReviewQuestion = (isChecked: boolean) => {
  isReview.value = isChecked;

  const newListQuestion = getNewListWithChangeReview(
    props.listQuestion,
    questionActive.value,
    isChecked
  );
  emit('onChangeListQuestion', newListQuestion);
};

const handleSelectPrevOrNextQuestion = (questionId: number) => {
  if (!questionId || questionId > props.listQuestion[props.listQuestion.length - 1]?.id) {
    return;
  }
  const question = props.listQuestion[questionId - 1];
  isReview.value = question.isReview;
  questionActive.value = questionId;
};
</script>

<template>
  <div class="exam-container">
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
      @onSetQuestionActive="handleSetQuestionActive"
      @onChangeReviewQuestion="handleChangeReviewQuestion"
      @onSelectPrevOrNextQuestion="handleSelectPrevOrNextQuestion"
    />
  </div>
</template>
