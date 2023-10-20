import { RouteRecordRaw } from 'vue-router';
import * as fs from 'fs';

const models = import.meta.glob('../../**/doc/index.ts', { eager: true })
const docsRotes: RouteRecordRaw[] = []
Object.keys(models).forEach(key => {
  console.log((models[key] as any)?.default)
  docsRotes.push((models[key] as any)?.default)
})

const defaultRotes: RouteRecordRaw[] = [

  {
    path: 'introductionDoc',
    name: 'IntroductionDoc',
    meta: {
      title: '项目简介'
    },
    // @ts-ignore
    component: () => import('../documents/introduction.md'),
  },
]

export default {
  path: '/docs',
  name: 'Docs',
  redirect: { name: 'IntroductionDoc' },
  component: () => import('../views/index.vue'),
  children: [
    ...docsRotes,
    ...defaultRotes
  ]
}


export {
  docsRotes,
  defaultRotes
}