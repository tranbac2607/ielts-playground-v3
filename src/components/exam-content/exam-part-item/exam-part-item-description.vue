<script setup lang="ts">
import { defineProps } from 'vue';

import { NumericalOrder } from '../models';

defineProps<{
  isListening?: boolean;
  isReading?: boolean;
  isWriting?: boolean;
  partActive: number;
  numericalOrderInPart: NumericalOrder;
}>();
</script>

<template>
  <div class="part-description-container">
    <h1 class="part-content">
      <div v-if="isWriting">Academic Writing Part {{ partActive }}</div>
      <div v-else>
        Part {{ partActive }}
        {{ isReading ? `: Reading passage ${partActive}` : '' }}
      </div>
    </h1>
    <p class="part-description">
      {{
        isWriting
          ? `
          You should spend about ${
            partActive === 1 ? 20 : 40
          } minutes on this task. Write at least ${partActive === 1 ? 150 : 250}
          words.`
          : isListening
          ? `Listen and answer question ${numericalOrderInPart.firstNumber} to ${numericalOrderInPart.lastNumber}`
          : `You should spend about 20 minutes on Questions
          ${numericalOrderInPart.firstNumber}-${numericalOrderInPart.lastNumber}, which are
          based on Reading Passage ${partActive} below.`
      }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.part-description-container {
  background-color: $background-secondary;
  border-radius: 6px;
  box-shadow: $box-shadow-primary;
  margin-bottom: 8px;
  min-height: 80px;
  height: $height-part-description;
  padding: 20px;
  margin-bottom: 10px;

  .part-content {
    font-size: 28px;
    margin: 0;
  }

  .part-description {
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 0;
  }
}
</style>
