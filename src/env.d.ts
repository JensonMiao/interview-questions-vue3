/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface ImportMetaEnv {
  /**
   * 是否显示项目文档
   */
  VITE_DOCS: string
}
