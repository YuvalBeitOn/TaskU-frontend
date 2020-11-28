import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/styles.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale'


Vue.use(ElementUI, { locale })
Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
