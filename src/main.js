import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FileReader from 'vue-filereader'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)





createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component(FileReader.name, FileReader)
.use(store)
.use(router)
.mount('#app')


