import { createApp } from 'vue'
import antd from "ant-design-vue"
import App from './App.vue'
import "./index.css"
import 'ant-design-vue/dist/antd.css';
import router from './routes';


createApp(App).use(antd).use(router).mount('#app')
