declare module '*.svg?component' {
  import { DefineComponent, SVGAttributes } from 'vue';
  const component: DefineComponent<SVGAttributes>;
  export default component;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
