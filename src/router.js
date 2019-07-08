import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      component: () => import(/* webpackChunkName: "user" */'./layouts/UserLayout'),
      redirect: '/user/register',
      children: [
        {
          path: '/user/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "user" */'./views/User/Register')
        }
      ]
    }
  ]
})
