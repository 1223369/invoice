import Vue from 'vue'
import App from './App.vue'
import store from '../store'
import router from '../router'
import http from 'axios'
import '../api/mock'
import './assets/less/index.less'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.http = http

router.beforeEach((to, from, next) => {
    store.commit('getToken')
    const token = store.state.token
    if(!token && to.name !== 'login') {
        next({name: 'login'})
    }else {
        next()
    }
})

new Vue({
    router,
    store,
    render: function (h) { return h(App) }
}).$mount('#app')
