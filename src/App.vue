<template>
  <BaseLayout >
    <router-view></router-view>
  </BaseLayout>
</template>
 
<script>
import BaseLayout from "./layout/BaseLayout.vue";
export default {
  components: {
    BaseLayout,
  },
};
</script>
