import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', () => {
  const isLoading = ref(false);
  const setIsLoading = (value: boolean) => {
    isLoading.value = value;
  };

  return { isLoading, setIsLoading };
});
