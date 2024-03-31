<script setup lang="ts">
import { defineEmits } from 'vue';
import { Form } from 'vee-validate';
import * as Yup from 'yup';

// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { faPhone } from '@fortawesome/free-solid-svg-icons';

import FormInput from './common/FormInput.vue';

type Values = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  subscription?: string;
};

const PHONE_REG_EXP =
  /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;

const EMAIL_REG_EXP =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

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
  (e: 'onSubmit', values: Values): void;
}>();
</script>

<template>
  <div class="form-inner m-3">
    <div class="form-container p-4">
      <div class="card-body">
        <Form
          @submit="(values) => emit('onSubmit', values as Values)"
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
            <button type="submit" class="btn btn-primary mr-1">Register</button>
            <button type="reset" class="btn btn-secondary">Reset</button>
          </div>
        </Form>
        <!-- <FontAwesomeIcon :icon="faPhone" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.form-inner {
  background-color: $background-primary;
  box-shadow: $box-shadow-primary;
  border-radius: 10px;
}
</style>
