
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'; 
import router from './router';


const app = createApp(App)
store.dispatch("initializeLoginState");

app.use(router);
app.use(store);
app.mount('#app');

