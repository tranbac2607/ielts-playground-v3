<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
import { Field } from 'vee-validate';

type Props = {
  title: string;
  name: string;
  type: string;
  errors?: string;
  addClass?: string;
};

// test default props
withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div class="form-input" :class="addClass ? addClass : ''">
    <label>{{ title }}</label>
    <Field :name="name" :type="type" class="form-control" :class="{ 'is-invalid': errors }" />
    <div class="invalid-feedback">{{ errors }}</div>
  </div>
</template>

<style>
.form-input {
  height: 86px;

  input {
    width: 360px;
  }
}
</style>
