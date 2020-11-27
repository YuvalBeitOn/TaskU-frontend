import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/styles.scss'

// Vue.use(ElementUI, { locale })


import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import {DatePicker} from 'element-ui';
Vue.use(DatePicker);
locale.use(lang)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
