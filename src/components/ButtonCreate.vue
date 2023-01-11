<template>
 <div class=" w-full bg-white">
     <router-link :to="toLink">
      <span type="button" class="border flex p-7 justify-center  rounded border-dashed border-blue-400">
      {{name.toUpperCase()}}
     </span>
     </router-link>
 </div>
</template>

<script>
export default {
  name: "PyDaButtonCreate",
  props:{
    name:{
      type:String,
      default:"Not Value "
    },
    toLink:{
      type:String,
      default:""
    }
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
