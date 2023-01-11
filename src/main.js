import { createApp } from 'vue'
import antd from "ant-design-vue"
import App from './App.vue'
import "./index.css"
import 'ant-design-vue/dist/antd.css';
import router from './routes';

import mitt from "mitt";
const emitter = mitt();

const app =createApp(App).use(antd).use(router)

app.config.globalProperties.emitter = emitter;

app.mount("#app");
