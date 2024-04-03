<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

import { markdownToHtml } from './utils';
import { DataContentType } from './models';

const props = defineProps<{ listQuestion: DataContentType[]; numberOrder: number }>();

const listQuestionTransform = computed(() => {
  return props.listQuestion.filter((item) => item.numberOrder === props.numberOrder);
});

const emit = defineEmits<{
  (e: 'onClickQuestionInput', values: number): void;
  (e: 'onChangeValue', event: Event, values: number): void;
}>();
</script>

<template>
  <div v-for="(question, index) in listQuestionTransform" :key="question.id">
    <span v-html="markdownToHtml(question.text || '')"></span>
    <input
      :style="{ margin: '4px 8px' }"
      autoComplete="off"
      autoCapitalize="off"
      spellCheck="false"
      :id="`question${question.id}`"
      class="input-answer"
      type="text"
      :placeholder="String(question.id)"
      :value="question.value"
      @click="() => emit('onClickQuestionInput', question.id)"
      @change="(event) => emit('onChangeValue', event, question.id)"
    />
    <br v-if="question.isDownLine" />
    <span v-if="index === listQuestionTransform.length - 1">{{
      listQuestionTransform[0].lastText
    }}</span>
  </div>
</template>

<style scoped lang="scss">
.input-answer {
  width: 170px;
  height: 32px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 4px 2px;
  font-size: 16px;
}

.input-answer:focus {
  outline: #0096d6 auto 5px;
}

.input-answer::placeholder {
  font-weight: bold;
  font-size: 18px;
  color: #757575;
}

.input-answer:focus::-webkit-input-placeholder {
  opacity: 0;
}
</style>
