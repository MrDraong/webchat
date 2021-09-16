import Vue from 'vue';
import VueRouter from 'vue-router';
import Join from '../views/Join.vue';
import Chat from '../views/Chat.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Join',
    component: Join
  },
  {
    path: '/chat/:username',
    name: 'Chat',
    component: Chat,
    props: {default:true}
  }
]

const router = new VueRouter({
  routes
})

export default router
