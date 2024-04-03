<script setup lang="ts">
import { useToast } from 'vue-toastification';

import Login from '../components/login.vue';

import { loginApi } from '../services/auth';
import { LoginValues } from '../components/models';
import { CODE_SUCCESS } from '../constants';

const toast = useToast();

const handleLogin = async (values: LoginValues) => {
  const res = await loginApi({ ...values });
  console.log('🚀 ~ handleLogin ~ res:', res);

  if (res?.code === CODE_SUCCESS) {
    toast.success('Login successfully');
    // dispatch(setEmailVerify(values.email));
  } else {
    toast.error('Email or password is incorrect');
  }
};
</script>

<template>
  <Login @onLogin="handleLogin" />
</template>
