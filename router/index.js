import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: ()=> import('../views/Main'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/index')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('.././views/User/index')
            },
            {
                path: '/addinvoice',
                name: 'addinvoice',
                component: () => import('.././views/add/addInvoice')
            },
            {
                path: '/adduser',
                name: 'adduser',
                component: () => import('.././views/add/addUser')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login')
    }
]

const router = new VueRouter({
    model: 'history',
    routes
})

export default router

