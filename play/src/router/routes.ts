
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        'path': '/adaption-container',
        'name': 'adaption-container',
        'component': () => import('@/views/adaption-container/Index.vue'),
        'meta': {
          'title': 'adaption-container'
        }
      },
      {
        'path': '/custom-field-config',
        'name': 'custom-field-config',
        'component': () => import('@/views/custom-field-config/Index.vue'),
        'meta': {
          'title': 'custom-field-config'
        }
      },
      {
        'path': '/custom-field-container',
        'name': 'custom-field-container',
        'component': () => import('@/views/custom-field-container/Index.vue'),
        'meta': {
          'title': 'custom-field-container'
        }
      },
      {
        'path': '/date-picker',
        'name': 'date-picker',
        'component': () => import('@/views/date-picker/Index.vue'),
        'meta': {
          'title': 'date-picker'
        }
      },
      {
        'path': '/descriptions',
        'name': 'descriptions',
        'component': () => import('@/views/descriptions/Index.vue'),
        'meta': {
          'title': 'descriptions'
        }
      },
      {
        'path': '/ellipsis-tag',
        'name': 'ellipsis-tag',
        'component': () => import('@/views/ellipsis-tag/Index.vue'),
        'meta': {
          'title': 'ellipsis-tag'
        }
      },
      {
        'path': '/empty',
        'name': 'empty',
        'component': () => import('@/views/empty/Index.vue'),
        'meta': {
          'title': 'empty'
        }
      },
      {
        'path': '/jdata-viewer',
        'name': 'jdata-viewer',
        'component': () => import('@/views/jdata-viewer/Index.vue'),
        'meta': {
          'title': 'jdata-viewer'
        }
      },
      {
        'path': '/remote-search',
        'name': 'remote-search',
        'component': () => import('@/views/remote-search/Index.vue'),
        'meta': {
          'title': 'remote-search'
        }
      },
      {
        'path': '/search-form',
        'name': 'search-form',
        'component': () => import('@/views/search-form/Index.vue'),
        'meta': {
          'title': 'search-form'
        }
      },
      {
        'path': '/sticky-container',
        'name': 'sticky-container',
        'component': () => import('@/views/sticky-container/Index.vue'),
        'meta': {
          'title': 'sticky-container'
        }
      },
      {
        'path': '/table',
        'name': 'table',
        'component': () => import('@/views/table/Index.vue'),
        'meta': {
          'title': 'table'
        }
      },
      {
        'path': '/tabs',
        'name': 'tabs',
        'component': () => import('@/views/tabs/Index.vue'),
        'meta': {
          'title': 'tabs'
        }
      },
      {
        'path': '/tarea-tag',
        'name': 'tarea-tag',
        'component': () => import('@/views/tarea-tag/Index.vue'),
        'meta': {
          'title': 'tarea-tag'
        }
      },
      {
        'path': '/uploader',
        'name': 'uploader',
        'component': () => import('@/views/uploader/Index.vue'),
        'meta': {
          'title': 'uploader'
        }
      }
    ]
  }
]