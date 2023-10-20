import hljs from 'highlight.js';
import { App } from 'vue';

export default (app: App<Element>) => {
  app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block: HTMLElement) => {
      hljs.highlightBlock(block);
    });
  });
}