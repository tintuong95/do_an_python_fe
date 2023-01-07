<template>
  <div class="grid grid-cols-6">
    <div class="col-span-1 flex items-center">
      <label for="">{{ label }}</label>
    </div>
    <div class="col-span-5 flex items-center gap-4">
      <template v-if="!isEdited">
        <input
          readonly
          class="w-full rounded p-2 border-0"
          type="text"
          v-model="newContent"
        />
        <div>
          <span @click="isEdited = true" class="bg-gray-100 p-1 px-2 rounded"
            ><edit-outlined
          /></span>
        </div>
      </template>
      <template v-else>
        <input
          class="w-full rounded p-2 border"
          type="text"
          v-model="newContent"
        />
        <div class="flex gap-4">
          <span
            role="button"
            @click="isEdited = false"
            class="bg-yellow-200 p-1 px-2 rounded"
            >Hủy
          </span>
          <span
            role="button"
            @click="sendEditValue"
            class="bg-green-300 p-1 px-2 rounded"
            >Lưu
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { EditOutlined } from "@ant-design/icons-vue";
export default {
  name: "PyDaBaseInput",
  components: {
    EditOutlined,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isEdited: false,
      newContent: "",
    };
  },
  
  mounted() {},

  methods: {
    sendEditValue() {
      this.isEdited = false;
      this.$emit("send-edit-value",this.newContent);
    },
  },
  watch: {
    content(newVal) {
      this.newContent = newVal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
