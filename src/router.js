import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user/register'
    },
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
    },
    {
      path: '/randomFood',
      name: 'randomFood',
      component: () => import(/* webpackChunkName: "user" */'./views/FoodMenu/randomFood')
    },
    {
      path: '/addFood',
      name: 'addFood',
      component: () => import(/* webpackChunkName: "user" */'./views/FoodMenu/addFood')
    }
  ]
})
