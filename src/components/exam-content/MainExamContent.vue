<script setup lang="ts">
import { Fragment, defineEmits, defineProps, h } from 'vue';

import AnswerInputs from './AnswerInputs.vue';

import { DataContentType } from './models';
import { QUESTION_TYPE } from './constants';
import { countWords } from './utils';

const props = defineProps<{
  isListening?: boolean;
  isReading?: boolean;
  listQuestionInPart: DataContentType[];
  listQuestionTypeInPart: string[];
  leftContent: string[];
}>();

const renderContent = (type: string, numberOrder: number) => {
  switch (type) {
    case QUESTION_TYPE.LISTENING_CHOOSE_ANSWER:
      return h(AnswerInputs, { listQuestion: props.listQuestionInPart, numberOrder });
    default:
      return 'Testt';
  }
};

const emit = defineEmits<{
  (e: 'onChangeAnswerWriting', values: string): void;
}>();
</script>

<template>
  <div
    :class="`exam-content-container ${isListening ? 'listening-container' : 'content-container'}`"
    :style="isListening ? { overflow: 'auto' } : {}"
  >
    <div v-if="isListening" class="listening-content">
      <div v-if="listQuestionTypeInPart.length">
        <div v-for="(_, index) in listQuestionTypeInPart" :key="index">
          <AnswerInputs :listQuestion="listQuestionInPart" :numberOrder="index + 1" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="topic-container left-topic">
        <div class="topic-content">
          <span v-for="(item, index) in leftContent" :key="index" v-html="item" />
        </div>
      </div>
      <div class="topic-container right-topic">
        <div v-if="isReading" class="topic-content">
          <Fragment v-if="listQuestionTypeInPart?.length"
            ><Fragment v-for="(item, index) in listQuestionTypeInPart" :key="index"
              >{{ renderContent(item, index + 1) }}
              <hr v-if="index > 0" /></Fragment
          ></Fragment>
        </div>
        <div v-else class="topic-writing-content">
          <textarea
            autoCapitalize="off"
            spellCheck="false"
            autoComplete="off"
            :value="listQuestionInPart[0]?.value"
            @change="(event: any) => emit('onChangeAnswerWriting', event.target.value)"
          />
          <span>
            Word count:{' '}
            {{ listQuestionInPart[0]?.value && countWords(listQuestionInPart[0]?.value) }}
          </span>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>

<style scoped lang="scss">
$height-footer: 60px;
$padding: 80px;

.exam-content-container {
  background-color: $background-secondary;
  border-radius: 6px;
  box-shadow: $box-shadow-primary;
  margin-bottom: 8px;
  min-height: 80px;
}

.listening-container {
  height: calc(100vh - $header-outer-height - $height-part-description - $height-footer - $padding);

  .listening-content {
    padding: 20px;

    .select-question-container {
      display: flex;
      flex-wrap: wrap;

      .one-question-container {
        display: flex;
        flex-direction: column;
        width: 50%;
        padding: 0 30px 0 20px;

        .answer-container {
          padding-left: 28px;
          margin: 20px 0;
        }

        .namePart {
          margin: 0;
          text-align: center;
        }

        .paragraphContent {
          margin: 16px 0 0;
          font-size: $fs-16;
        }

        .question {
          width: 100%;
          display: flex;
          color: $color-dark;
          font-size: $fs-16;
          padding: 10px;
          margin: 28px 0 0;
          border-radius: 6px;

          .question-number {
            font-size: 18px;
            padding-right: 16px;
            font-weight: 600;
            cursor: pointer;
          }
        }

        .question__active {
          background-color: $background-primary;
          color: $color-white;

          &:hover {
            background-color: $background-primary;
          }
        }
      }
    }
  }
}

.content-container {
  min-height: 80px;
  display: flex;
  justify-content: flex-start;
  height: calc(100vh - $header-outer-height - $height-part-description - $height-footer - $padding);

  .topic-container {
    width: 50%;
    overflow-y: scroll;
  }

  .topic-content {
    margin: 20px auto;
    padding: 0 20px;
    max-width: 562px;
    font-size: 16px;

    .answer-container {
      padding-left: 28px;
      margin: 20px 0;
    }

    .question {
      width: 100%;
      display: flex;
      background-color: $background-question;
      color: $color-white;
      font-size: $fs-16;
      padding: 10px;
      margin: 28px 0;
      border-radius: 6px;

      .question-number {
        font-size: $fs-18;
        padding-right: 16px;
        font-weight: 600;
        cursor: pointer;
      }

      &:hover {
        background-color: $background-primary;
      }

      .question_number {
        font-size: 18px;
        padding-right: 16px;
        font-weight: 600;
        cursor: pointer;
      }
    }

    .question__active {
      background-color: $background-primary;

      &:hover {
        background-color: $background-primary;
      }
    }
  }

  .topic-writing-content {
    height: 90%;
    margin: 20px auto;
    padding: 0 20px;
    max-width: 562px;
    font-size: 16px;

    textarea {
      width: 100%;
      height: 90%;
      resize: none;

      &:focus {
        outline: none !important;
        border-color: $background-primary;
        border: 2px solid $background-primary;
      }
    }
  }

  .right-topic {
    border-left: $box-shadow-primary;
  }
}
</style>
