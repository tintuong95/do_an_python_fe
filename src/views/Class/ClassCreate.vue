<template>
  <form action="">
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Tên lớp</label>
      </div>
      <div class="col-span-5">
        <input v-model="name" class="border w-full rounded p-2" type="text" />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Niên khóa</label>
      </div>
      <div class="col-span-5">
        <input v-model="year" class="border w-full rounded p-2" type="text" />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Ghi chú</label>
      </div>
      <div class="col-span-5">
        <input v-model="note" class="border w-full rounded p-2" type="text" />
      </div>
    </div>

    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Trạng thái</label>
      </div>
      <div class="col-span-5 flex gap-4">
        <div class="flex items-center gap-2">
          <input
            id="1"
            @input="getVal"
            type="radio"
            value="1"
            name="status"
            checked
          />

          <label for="1">Hoạt động</label>
        </div>
        <div class="flex items-center gap-2">
          <input id="0" @input="getVal" type="radio" value="0" name="status" />

          <label for="0">Kết thúc</label>
        </div>
      </div>
    </div>
    <hr class="my-6" />
    <div class="flex justify-end">
      <div class="flex justify-end">
        <div class="flex gap-4">
          <span
            role="button"
            class="border bg-gray-100 rounded text-center w-24 p-3"
            >Trở lại</span
          >
          <span
            role="button"
            @click="fetchCreateClass"
            class="border bg-blue-200 rounded text-center w-24 p-3"
            >Lưu
          </span>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { notification } from "ant-design-vue";
import { createClass } from "../../apis/class";
import emitter from "../../utils/mitt";

export default {
  name: "PyDaStudentCreate",

  data() {
    return {
      name: "",
      year: "",
      note: "",
      status: 1,
    };
  },
  created() {},
  mounted() {},

  methods: {
    fetchCreateClass() {
       emitter.emit("setLoading",true)
      let data = new FormData();
      data.append("name", this.name);
      data.append("year", this.year);
      data.append("note", this.note);
      data.append("status", this.status);
      createClass(data)
        .then((result) => {
          console.log(result);
          notification.success({ message: "Tạo mới thành công!" });
        })
        .catch((err) => {
          console.log(err);
          notification.error({ message: "Tạo mới thất bại!" });
        }).finally(()=>{
           emitter.emit("setLoading",false)
        });
    },
    getVal(evt) {
      const { name, value } = evt.target;
      this[name] = value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
