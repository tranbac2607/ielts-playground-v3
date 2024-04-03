<script setup lang="ts">
import { ref } from 'vue';
import Register from '../components/register.vue';

import { registerApi } from '../services/auth';
import { RegisterValues } from '../components/models';

const isLoading = ref(false);

const handleRegister = async (values: RegisterValues) => {
  console.log(values);
  isLoading.value = true;
  const res = await registerApi({ ...values, subscription: 'FREE' });
  console.log(res);

  // if (res.code === CODE_SUCCESS) {
  //   router.push('/verify');
  //   notify('success', 'Register successfully, please verify!');
  //   dispatch(setEmailVerify(values.email));
  // } else {
  //   notify('error', 'Something error!');
  // }
  isLoading.value = false;
};
</script>

<template>
  <Register @onRegister="handleRegister" />
</template>
