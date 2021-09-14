import { createApp } from 'vue'

import router from './router'

import App from './App.vue'
import './index.css'
import { httpClient } from './api/HttpClient'

import { config, loadConfig } from './config'

loadConfig()

// Should really absolutely probably not be hard coded
httpClient.config.baseURL = config.apiURL

createApp(App)
  .use(router)
  .mount('#app')
