import { createApp } from 'vue'

import router from './router'

import App from './App.vue'
import './index.css'
import { httpClient } from './api/HttpClient'

// Should really absolutely probably not be hard coded
httpClient.config.baseURL = 'http://localhost:4000'

createApp(App)
  .use(router)
  .mount('#app')
