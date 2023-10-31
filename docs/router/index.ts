import { RouteRecordRaw } from 'vue-router';

const models = import.meta.glob('../../**/doc/index.ts', { eager: true })
const docsRotes: RouteRecordRaw[] = []
Object.keys(models).forEach(key => {
  docsRotes.push((models[key] as any)?.default)
})

const defaultRotes: RouteRecordRaw[] = [

  {
    path: 'introductionDoc',
    name: 'IntroductionDoc',
    meta: {
      title: '必读'
    },
    // @ts-ignore
    component: () => import('../documents/introduction/index.md'),
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