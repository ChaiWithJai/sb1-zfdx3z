import { createRouter, createWebHistory } from 'vue-router';
import DealRoom from '../views/DealRoom.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/deal-room'
    },
    {
      path: '/deal-room',
      component: DealRoom,
      children: [
        {
          path: '',
          name: 'upload',
          component: () => import('../views/UploadView.vue')
        },
        {
          path: ':docId/analysis',
          name: 'analysis',
          component: () => import('../views/AnalysisView.vue')
        },
        {
          path: ':docId/criteria',
          name: 'criteria',
          component: () => import('../views/CriteriaView.vue')
        },
        {
          path: ':docId/memo',
          name: 'memo',
          component: () => import('../views/MemoView.vue')
        }
      ]
    }
  ]
});