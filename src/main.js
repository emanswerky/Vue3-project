import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/main.css';
import './style.css';
import '/src/plugins/request';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // 👈 استدعاء مكتبة mdi

import 'vuetify/styles'; // 👈 الأساسيات
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// تهيئة مكتبة Toast

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(createPinia());
app.use(ToastPlugin);
app.mount('#app');
