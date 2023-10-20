import { createApp } from 'vue'
import { createPinia } from 'pinia';
import { router } from '@/router'
import App from './App.vue'
import '@/styles/index.scss'
import 'virtual:svg-icons-register' // 注册脚本
import SvgIcon from '@/components/SvgIcon.vue'
import directive from '@/directive';

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(createPinia())
  .use(router)
// 注册自定义指令
directive(app)

app.mount('#app')
