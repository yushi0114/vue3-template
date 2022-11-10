import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import { registerElementIcons } from './components';
const app = createApp(App);
app.use(createPinia());
app.use(router);
registerElementIcons(app);

app.mount('#app');
import '@/style';
