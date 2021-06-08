import { RoversEnum } from '@/views/Rovers/enums/rovers-enum';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/earth-observation',
    name: 'observation',
    component: () => import(/* webpackChunkName: "observation" */ '../views/Observation/Observation.vue'),
  },
  {
    path: '/mars-rovers',
    component: () => import(/* webpackChunkName: "rovers" */ '../views/Rovers/Rovers.vue'),
    children: [
      {
        path: '',
        redirect: RoversEnum.CURIOSITY,
      },
      {
        path: ':rover',
        name: 'rover',
        components: {
          'rovers-form': () =>
            import(/* webpackChunkName: "rovers-form" */ '../views/Rovers/components/RoversForm/RoversForm.vue'),
          'rovers-content': () =>
            import(
              /* webpackChunkName: "rovers-content" */ '../views/Rovers/components/RoversContent/RoversContent.vue'
            ),
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
