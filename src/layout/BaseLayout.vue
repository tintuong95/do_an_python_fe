<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        minHeight: '100vh',
        backgroundColor: 'white',
      }"
    >
      <div class="logo">
        <h1 class="text-xl text-center my-4 text-green-700">AppV1.0</h1>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="white" mode="inline">
         <router-link to="/">
           <a-menu-item key="1">
          <audit-outlined />
          <span>Trang chủ </span>
        </a-menu-item>
         </router-link>
       
        <router-link to="/class-list">
          <a-menu-item key="2">
            <audit-outlined />
            <span>Lớp học </span>
          </a-menu-item>
        </router-link>
        <router-link to="/class-create">
          <a-menu-item key="3">
            <audit-outlined />
            <span>Tạo lớp học </span>
          </a-menu-item>
        </router-link>
        <router-link to="/student-list">
          <a-menu-item key="4">
            <user-outlined />
            <span>Sinh viên </span>
          </a-menu-item>
        </router-link>
        <router-link to="/student-create">
          <a-menu-item key="5">
            <user-outlined />
            <span>Tạo sinh viên</span>
          </a-menu-item>
        </router-link>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
        }"
      >
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AuditOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AuditOutlined,
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
