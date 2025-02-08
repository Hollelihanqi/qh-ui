import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    redirect: '/table',
    children: [
      {
        path: '/table',
        name: 'table',
        component: () => import('@/views/table/Index.vue'),
        meta: {
          title: 'table',
        },
      },
      {
        path: '/uploader',
        name: 'uploader',
        component: () => import('@/views/uploader/Index.vue'),
        meta: {
          title: 'uploader',
        },
      },
    ],
  },
]
