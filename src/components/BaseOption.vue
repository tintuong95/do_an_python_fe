<template>
  <div class="grid grid-cols-6">
    <div class="col-span-1 flex items-center">
      <label for="">{{ label }}</label>
    </div>
    <div class="col-span-5 flex items-center gap-4 justify-between">
      <template v-if="!isEdited">
        <div>
          <div v-if="content == 1">{{ firstName }}</div>
          <div v-else>{{ lastName }}</div>
        </div>
        <div>
          <span @click="isEdited = true" class="bg-gray-100 p-1 px-2 rounded"
            ><edit-outlined
          /></span>
        </div>
      </template>
      <template v-else>
        <div class="flex gap-3">
          <div class="flex items-center gap-2">
          <input
            id="1"
            @input="getVal"
            type="radio"
            value="1"
            :checked="content==1"
          />

          <label for="1">{{ firstName }}</label>
        </div>
        <div class="flex items-center gap-2">
          <input id="0" @input="getVal" type="radio" value="0" name="status"  :checked="content==0" />

          <label for="0">{{ secondName }}</label>
        </div>
        </div>
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
    firstName: {
      type: String,
      default: "",
    },
    secondName: {
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
      this.$emit("send-edit-value", this.newContent);
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
