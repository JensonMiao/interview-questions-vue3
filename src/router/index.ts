/**
 * @file 路由文件
 * @author Jenson Miao 2022/4/15
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import docsRotes, { defaultRotes } from '@docs/router'
import Nothing from '@/layout/Nothing.vue'

const modules = import.meta.glob('../views/**/index.vue')
const pageData = import.meta.glob('../views/**/page.ts',{
  eager: true,
  import: 'default',
})
const pages = {}
Object.keys(modules).forEach((key) => {
  const item = modules[key]
  if (!key.includes('/components')) {
    pages[key] = item
  }
})
type MapRouteData = {
  path: string,
  menuPath: string,
  value:any,
  children: [MapRouteData]
}

const routeModuleList: RouteRecordRaw[] =Object.entries(pages).map(([key, value]) => {
  return getRouteData(key,value)
})

function getRouteData(path:string,value:Function) {
  const routerPath:string = path.replace('../views','').replace('/index.vue','')||'/'
  return {
    path: routerPath.substring(routerPath.lastIndexOf('/')),
    name: routerPath.split('/').filter(Boolean).join('-')||'index',
    component: value,
    meta:pageData[path.replace('index.vue', 'page.ts')]
  }
}


if (import.meta.env.VITE_DOCS === 'true') {
  routeModuleList.push(docsRotes)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Docs' },
  },
  ...routeModuleList,
  {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: () => import('@/views/errorPage/404.vue'),
  },
]

function checkComponent(routeList: any[]) {
  routeList.forEach(route => {
    if (!route.component) {
      route.component = Nothing
    }
    if (route.children) {
      checkComponent(route.children)
    }
  })
}

checkComponent(routes)
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
