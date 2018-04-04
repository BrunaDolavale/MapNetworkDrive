import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
    name: 'home',
    component: require('@/components/home').default
  },
  {
    path: '/nc-login',
    name: 'nc-login',
    component: require('@/components/NcLogin').default
  },
  {
    path: '/nc-redes',
    name: 'nc-redes',
    component: require('@/components/NcRedes').default
  },
  {
    path: '/nc-nova-rede',
    name: 'nc-nova-rede',
    component: require('@/components/NcNovaRede').default
  },
  ,
  {
    path: '*',
    redirect: '/'
  }
  ]
})
