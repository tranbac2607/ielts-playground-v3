<script setup lang="ts">
import { defineEmits } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

import { EMAIL_REG_EXP, PHONE_REG_EXP } from './constants';
import { RegisterValues } from './models';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';

import FormInput from './common/FormInput.vue';

const validate = Yup.object({
  fullName: Yup.string()
    .min(3, 'Must be 15 characters or less')
    .max(50, 'Must be 50 characters or less')
    .required('Full name required'),
  email: Yup.string().matches(EMAIL_REG_EXP, 'Email is invalid').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(PHONE_REG_EXP, 'Phone number is invalid')
    .required('Phone is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Password must match')
    .required('Confirm password is required'),
});

const emit = defineEmits<{
  (e: 'onRegister', values: RegisterValues): void;
}>();
</script>

<template>
  <div class="form-container">
    <div class="p-4">
      <div class="card-body">
        <Form
          @submit="(values) => emit('onRegister', values as RegisterValues)"
          :validationSchema="validate"
          v-slot="{ errors }"
        >
          <FormInput title="Full name" name="fullName" type="text" :errors="errors.fullName" />
          <FormInput title="Email" name="email" type="email" :errors="errors.email" />
          <FormInput title="Phone" name="phoneNumber" type="text" :errors="errors.phoneNumber" />
          <FormInput title="Password" name="password" type="password" :errors="errors.password" />
          <FormInput
            title="Confirm password"
            name="passwordConfirm"
            type="password"
            :errors="errors.passwordConfirm"
          />

          <div class="form-group">
            <button type="submit" class="btn btn-primary me-2">Register</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </Form>
        <!-- <FontAwesomeIcon :icon="faPhone" /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.form-container {
  background-color: $background-primary;
  box-shadow: $box-shadow-primary;
  border-radius: 10px;
}
</style>
