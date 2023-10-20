import { App } from 'vue';
import highlight from '@/directive/highlight';

export default (app: App<Element>) => {
  highlight(app)
}