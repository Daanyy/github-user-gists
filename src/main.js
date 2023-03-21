import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AppConstants from './plugins/constants.js'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(AppConstants)

app.mount('#app')
