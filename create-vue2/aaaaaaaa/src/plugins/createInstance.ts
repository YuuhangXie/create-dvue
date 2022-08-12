import Vue from 'vue'
import '@/assets/styles/main.css'

Vue.config.productionTip = false

export default (main: any, router?: any, store?: any) => {
  new Vue({
    ...(router ? { router } : ''),
    ...(store ? { store } : ''),
    render: (h) => h(main)
  }).$mount('#app')
}
