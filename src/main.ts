import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const pinia = createPinia();

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast);

app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
