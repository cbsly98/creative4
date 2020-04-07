import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Rituals from '../views/Rituals.vue'
import AdminResource from '../views/Admin-Resource.vue'
import Resources from '../views/Resources.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin-ritual',
    name: 'admin',
    component: Admin
  },
  {
    path: '/rituals',
    name: 'rituals',
    component: Rituals
  },
  {
    path: '/admin-resource',
    name: 'adminResource',
    component: AdminResource
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
