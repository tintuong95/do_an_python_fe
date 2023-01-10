<template>
  <form action="">
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Họ tên sinh viên</label>
      </div>
      <div class="col-span-5">
        <input v-model="name" class="border w-full rounded p-2" type="text" />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Số chứng minh nhân dân</label>
      </div>
      <div class="col-span-5">
        <input v-model="code" class="border w-full rounded p-2" type="text" />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Ngày sinh</label>
      </div>
      <div class="col-span-5">
        <input
          v-model="birthday"
          class="border w-full rounded p-2"
          type="text"
        />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Địa chỉ thường trú</label>
      </div>
      <div class="col-span-5">
        <input
          v-model="address"
          class="border w-full rounded p-2"
          type="text"
        />
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Lớp học</label>
      </div>
      <div class="col-span-5">
        <a-select  v-model:value="classId" style="width: 220px" @change="handleChange"> 
         <a-select-option value="">Vui lòng chọn</a-select-option>
          <a-select-option v-for="item in classList" :key="item.id">
      {{ item?.name }}</a-select-option>
        </a-select>
      </div>
    </div>
    <hr class="my-6" />
    <div class="grid grid-cols-6">
      <div class="col-span-1">
        <label for="">Giới tính</label>
      </div>
      <div class="col-span-5 flex gap-4">
        <div class="flex items-center gap-2">
          <input
            id="1"
            @input="getVal"
            type="radio"
            value="1"
            name="sex"
            checked
          />

          <label for="1">Nam</label>
        </div>
        <div class="flex items-center gap-2">
          <input id="0" @input="getVal" type="radio" value="0" name="sex" />

          <label for="1">Nữ</label>
        </div>
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

          <label for="1">Bình thường</label>
        </div>
        <div class="flex items-center gap-2">
          <input id="0" @input="getVal" type="radio" value="0" name="status" />

          <label for="0">Đình chỉ</label>
        </div>
      </div>
    </div>
    <hr class="my-6" />
    <div class="flex justify-end">
      <div class="flex gap-4">
        <span
          role="button"
          class="border bg-gray-100 rounded text-center w-24 p-3"
          >Trở lại</span
        >
        <span
          role="button"
          @click="fetchCreateStudent"
          class="border bg-blue-200 rounded text-center w-24 p-3"
          >Lưu
        </span>
      </div>
    </div>
  </form>
</template>

<script>
import { notification } from "ant-design-vue";
import { getListClass } from "../../apis/class";
import { createStudent } from "../../apis/student";
import _ from "lodash";

export default {
  name: "PyDaStudentCreate",

  data() {
    return {
      name: "",
      code: "",
      birthday: "",
      address: "",
      classId: "",
      status: 1,
      sex: 1,
      classList: [],
    };
  },
  created() {
    this.fetchListClass();
  },
  methods: {
    fetchCreateStudent() {
      const data = new FormData();
      data.append("name", this.name);
      data.append("code", this.code);
      data.append("birthday", this.birthday);
      data.append("address", this.address);
      data.append("classId", this.classId);
      data.append("status", this.status);
      data.append("sex", this.sex);
      createStudent(data)
        .then((result) => {
          console.log(result);
          notification.success({ message: "Cập nhật thành công!" });
        })
        .catch((err) => {
          console.log(err);
          notification.error({ message: "Cập nhật thất bại!" });
        });
    },
    getVal(evt) {
      const { name, value } = evt.target;
      this[name] = value;
    },
    fetchListClass() {
      const keys = ["id", "name", "year", "note", "status"];
      getListClass()
        .then((result) => {
          this.classList = _.map(result.data, (item) =>
            _.zipObject(keys, item)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
