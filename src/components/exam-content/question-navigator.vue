<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { DataContentType } from './models';
import useHandleChangeListQuestion from './use-handle-change-list-question';

const props = defineProps<{
  listQuestion: DataContentType[];
  questionActive: number;
  isReview: boolean;
}>();

const emit = defineEmits<{
  (e: 'onChangeReviewQuestion', isChecked: boolean): void;
  (e: 'onSetQuestionActive', questionSubId: number, partActiveBar: number): void;
  (e: 'onSelectPrevOrNextQuestion', questionId: number): void;
}>();

const { getQuestionActive } = useHandleChangeListQuestion();

const numberOfPart = computed(() => {
  const partLastNumber = props.listQuestion[props.listQuestion?.length - 1]?.part;
  const arrNumberPart = Array.from({ length: partLastNumber }, (_, index) => index + 1);
  return arrNumberPart;
});
</script>

<template>
  <div class="navigator-question-container">
    <div class="review-container">
      <label class="d-flex gap-1">
        <input
          type="checkbox"
          :checked="isReview"
          @change="(event: any) => emit('onChangeReviewQuestion', event.target.checked)"
        />
        <span class="checkmark"></span>
        <span>Review</span>
      </label>
    </div>
    <div class="list-part-container">
      <div v-for="ele in numberOfPart" :key="ele">
        <div v-if="listQuestion.filter((item) => item.part === ele).length"></div>
        <div class="part-item" key="{ele}">
          <h3 class="part-name" :class="{ 'part-name-right': ele > 1 }">Part {{ ele }}:</h3>
          <button
            v-for="question in listQuestion.filter((item) => item.part === ele)"
            :key="question.id"
            class="question-item"
            :class="{
              question__active: questionActive === question.subId,
              question__answered: question.isAnswer,
              question__review: question.isReview,
            }"
            @click="emit('onSetQuestionActive', question.subId, question.part)"
          >
            <span>{{ question.id }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="list-feature-button">
      <button
        class="button-feature button-previous"
        :class="{ 'button-prev__disable': questionActive === listQuestion[0].id }"
        @click="
          emit('onSelectPrevOrNextQuestion', getQuestionActive(listQuestion, questionActive, false))
        "
      ></button>
      <button
        class="button-feature button-next"
        :class="{
          'button-next__disable': questionActive === listQuestion[listQuestion.length - 1]?.id,
        }"
        @click="emit('onSelectPrevOrNextQuestion', getQuestionActive(listQuestion, questionActive))"
      ></button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navigator-question-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  .review-container {
    display: block;
    position: relative;
    font-size: 16px;
    margin-bottom: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    label {
      cursor: pointer;
    }
  }

  .list-part-container {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: $box-shadow-primary;
    background-color: $color-white;
    border-radius: 6px;
    margin: 0 20px 0 10px;
    padding: 0 20px;
    height: 60px;
    width: calc(100vw - 100px - 120px - 80px);

    .part-item {
      display: flex;
      align-items: center;

      .part-name {
        margin: 0;
        font-weight: bold;
        font-size: 16px;
        color: $color-dark;
        margin-right: 8px;
        white-space: nowrap;
      }

      .part-name-right {
        margin-left: 20px;
      }

      .question-item {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $dark-light;
        color: $color-white;
        height: 36px;
        width: 36px;
        border-radius: 6px;
        margin-right: 5px;
        border: none;

        &:hover {
          background-color: $button-navigate-hover-color;
        }
      }

      .question__active {
        background-color: $button-navigate-hover-color !important;
        color: $color-white !important;

        &:hover {
          background-color: $button-navigate-hover-color !important;
        }
      }

      .question__special {
        padding: 18px 10px;
      }

      .question__answered {
        text-decoration: underline;
        background-color: $background-secondary;
        color: $color-dark;
        box-shadow: $box-shadow-primary;

        &:hover {
          color: $color-white;
          background-color: $background-primary;
        }
      }

      .question__review {
        border-radius: 50%;
      }
    }
  }

  .list-feature-button {
    display: flex;

    .button-feature {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-size: 100%;
      border: none;
      cursor: pointer;
    }

    .button-previous {
      background-image: url('../../../public/svg/prev-question-enable-icon.svg');
      margin-right: 8px;

      &:hover {
        background-image: url('../../../public/svg/prev-question-hover-icon.svg');
      }
    }

    .button-next {
      background-image: url('../../../public/svg/next-question-enable-icon.svg');
      &:hover {
        background-image: url('../../../public/svg/next-question-hover-icon.svg');
      }
    }

    .button-prev__disable {
      opacity: 0.3 !important;
      cursor: default;

      &:hover {
        background-image: url('../../../public/svg/prev-question-enable-icon.svg');
      }
    }

    .button-next__disable {
      opacity: 0.3 !important;
      cursor: default;

      &:hover {
        background-image: url('../../../public/svg/next-question-enable-icon.svg');
      }
    }
  }
}
</style>
