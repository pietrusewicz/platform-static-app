import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import authStorePlugin from './plugins/authStorePlugin'
import keycloakService from '@/services/keycloak';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const renderApp = () => {
    const app = createApp(App);
    app.use(authStorePlugin, { pinia });
    app.use(pinia);
    app.use(router);
    app.mount('#app');
  }

keycloakService.CallInit(renderApp);
