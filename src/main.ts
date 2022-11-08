import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import '@/style';
import withInstall from './components';

const app = createApp(App);
withInstall(app);
app.use(createPinia());
app.use(router);

app.mount('#app');
