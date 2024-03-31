<script setup lang="ts">
import { ref } from 'vue';
import Login from '../components/Login.vue';

import { registerApi } from '../services/auth';

const isLoading = ref(false);

const handleSubmit = async (values: any) => {
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
  <Login @onSubmit="handleSubmit" />
</template>
