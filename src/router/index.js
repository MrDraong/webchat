import Vue from 'vue'
import VueRouter from 'vue-router'
import Join from '../views/Join.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Join',
    component: Join
  },
  {
    path: '/chat',
    name: 'Chat',
    
    component: () => import('../views/Chat.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
