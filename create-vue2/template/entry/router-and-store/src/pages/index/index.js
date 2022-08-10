import createInstance from '@/plugins/createInstance'
import router from '@/router/index'
import store from '@/stores/index'
import App from './App'

createInstance(App, router, store)
