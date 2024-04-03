<script setup lang="ts">
import { defineEmits } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import { EMAIL_REG_EXP } from './constants';
import { LoginValues } from './models';

import FormInput from './common/FormInput.vue';

const validate = Yup.object({
  email: Yup.string().matches(EMAIL_REG_EXP, 'Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const emit = defineEmits<{
  (e: 'onLogin', values: LoginValues): void;
}>();
</script>

<template>
  <div class="form-container">
    <div class="p-4">
      <div class="card-body">
        <Form
          @submit="(values) => emit('onLogin', values as LoginValues)"
          :validationSchema="validate"
          v-slot="{ errors }"
        >
          <FormInput title="Email" name="email" type="email" :errors="errors.email" />
          <FormInput title="Password" name="password" type="password" :errors="errors.password" />
          <div class="form-group">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
