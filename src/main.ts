import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';
import withInstall, { registerElementIcons } from './components';

const app = createApp(App);
withInstall(app);
app.use(createPinia());
app.use(router);
registerElementIcons(app);

app.mount('#app');
import '@/style';
