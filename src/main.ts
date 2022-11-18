import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import { realImg } from './directives';
const app = createApp(App);
app.use(createPinia());
app.use(router);
realImg(app);

app.mount('#app');
import '@/style';
