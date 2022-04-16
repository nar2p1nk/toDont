//import todoApp from './todoApp.vue';
import App from './App.vue';
import router from './router';

import {createApp} from 'vue';
import store from './store'

createApp(App).use(store).use(router).mount('#app')
