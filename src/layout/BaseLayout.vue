<template>
  <div
    v-show="isLoading"
    class="z-20 w-screen h-screen fixed flex justify-center items-center bg-gray-50 opacity-50"
  >
    <a-spin tip="Loading..." size="large" />
  </div>
  <a-layout class="z-10">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{
        minHeight: '100vh',
        backgroundColor: 'white',
      }"
      class="border-r"
    >
      <div class="logo flex justify-center items-center mt-3">
        <a
          href="#"
          class="flex items-center mb-6 text-xl font-semibold text-gray-900 bg-gray-300 p-3 rounded-sm dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://img.icons8.com/glyph-neue/64/null/hummingbird.png"
            alt="logo"
          />
        </a>
        <hr />
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
        <router-link to="/students">
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
      <a-layout-header
        class="flex justify-between items-center"
        style="background: #fff; padding: 0"
      >
        <div>
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
        </div>
        <div class="mr-3 flex items-center gap-3">
          <button @click="onLogout">Đăng xuất</button>
          <a-avatar size="large">
            <template #icon><UserAddOutlined /></template>
          </a-avatar>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#f0f2f5',
        }"
      >
        <router-view></router-view>
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
  UserAddOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { createVNode, defineComponent, ref } from "vue";
import emitter from "../utils/mitt";
import { Modal } from "ant-design-vue";

export default defineComponent({
  components: {
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AuditOutlined,
    UserAddOutlined,
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
      collapsed: ref(false),
    };
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    emitter.on("setLoading", (e) => {
      this.isLoading = e;
    });
  },
  methods: {
    onLogout() {
      Modal.confirm({
        title: "ĐĂNG XUẤT !",
        icon: createVNode(ExclamationCircleOutlined),
        content: "Vui lòng xác nhận bạn muốn thoát !",
        okText: "Đồng ý",
        cancelText: "Hủy bỏ",
        onOk: () => {
          sessionStorage.removeItem("isLogin");
          this.$router.push({ path: "/login" });
        },
      });
    },
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
