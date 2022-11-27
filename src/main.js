import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FileReader from 'vue-filereader'
import { Vue3Mq } from "vue3-mq";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret, faHeart)





createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component(FileReader.name, FileReader)
.use(Vue3Mq, {
    breakpoints: {
      mobile: 450,
      tablet: 900,
      laptop: 1250,
      desktop: Infinity,
    }
  })
.use(store)
.use(router)
.mount('#app')



