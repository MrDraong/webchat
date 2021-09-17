import Vue from 'vue';
import VueRouter from 'vue-router';
import Join from '../views/Join.vue';
//import Chat from '../views/Chat.vue';

Vue.use(VueRouter)

const User = {
  template: `<div>User {{ $route.params.id }}</div>`
}

const routes = [
  {
    path: '/',
    name: 'Join',
    component: Join
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
  }
]

const router = new VueRouter({
  routes
})

export default router
