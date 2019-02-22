import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "form" */ './components/Form.vue'),
      children: [
        {
          name: 'create',
          path: '',
          redirect: {name:'form-step-1'}
        },
        {
          name: 'form-step-1',
          path:'step1',
          component: () => import(/* webpackChunkName: "form-step1" */ './components/FormStep1.vue'),
        },
        {
          name: 'form-step-2',
          path:'step2',
          component: () => import(/* webpackChunkName: "form-step2" */ './components/FormStep2.vue'),
        },
        {
          name: 'form-step-3',
          path:'step3',
          component: () => import(/* webpackChunkName: "form-step3" */ './components/FormStep3.vue'),
        },
        {
          name: 'form-step-4',
          path:'step4',
          component: () => import(/* webpackChunkName: "form-step4" */ './components/FormStep4.vue'),
        },
        {
          name: 'form-step-5',
          path:'step5',
          component: () => import(/* webpackChunkName: "form-step5" */ './components/FormStep5.vue'),
        }
      ]
    }
  ]
})
