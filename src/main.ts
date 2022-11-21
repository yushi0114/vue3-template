import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import { installDirective } from '@/directive/index';

const app = createApp(App);
app.use(createPinia());
app.use(router);
installDirective(app);

app.mount('#app');
import '@/style';
