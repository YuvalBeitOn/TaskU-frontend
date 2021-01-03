import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/styles.scss'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale'
import VTooltip from 'v-tooltip'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme)

Vue.use(VTooltip)

Vue.use(ElementUI, { locale })
Vue.use(require('vue-moment'));
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
