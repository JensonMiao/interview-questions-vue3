import type {
  ComponentRenderProxy,
  VNode,
  VNodeChild,
  ComponentPublicInstance,
  FunctionalComponent,
  PropType as VuePropType,
} from 'vue';

declare global {

  // vue
  declare type PropType<T> = VuePropType<T>;


  interface ImportMetaEnv extends ViteEnv {
    /**
     * 是否显示项目文档
     */
    VITE_DOCS: string
    __: unknown;
  }

  declare enum MenuType {
    QUSETION , // 普通题目
    ADDITIONAL_QUSETION // 附加题
  }
}

declare module 'vue' {
  export type JSXComponent<Props = any> =
    | { new(): ComponentPublicInstance<Props> }
    | FunctionalComponent<Props>;
}
