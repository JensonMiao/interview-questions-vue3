export default {
  path: 'singletonComponent',
  name: 'SingletonComponent',
  meta: {
    title: '组件缓存',
    menuTitle: '附加题'
  },
  // @ts-ignore
  component: () => import('./index.md')
}