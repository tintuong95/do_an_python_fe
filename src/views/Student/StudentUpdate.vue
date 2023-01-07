<template>
  <form>
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'name')"
      :label="'Họ tên sinh viên'"
      :content="studentDetails.name"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'code')"
      :label="'Số chứng mình nhân dân'"
      :content="studentDetails.code"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'birthday')"
      :label="'Ngày sinh'"
      :content="studentDetails.birthday"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'address')"
      :label="'Địa chỉ thường trú'"
      :content="studentDetails.address"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'classId')"
      :label="'Lớp học'"
      :content="studentDetails.classId"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'status')"
      :label="'Trạng thái'"
      :content="studentDetails?.status"
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateStudent($event, 'sex')"
      :label="'Giới tính'"
      :content="studentDetails?.sex"
    />
    <hr class="my-6" />
  </form>
</template>

<script>
import { notification } from "ant-design-vue";
import { getStudentById, updateStudentById } from "../../apis/student";
import BaseInput from "../../components/BaseInput.vue";
import _ from "lodash";

export default {
  name: "PyDaStudentDetail",
  data() {
    return {
      studentDetails: {},
    };
  },
  created() {
    this.studentId = this.$route.params.id;
    this.fetchStudentDetails();
  },
  methods: {
    fetchStudentDetails() {
      getStudentById(this.studentId)
        .then((result) => {
          const keys = ["id", "name", "code", "birthday", "address", "classId","status","sex"];
          this.studentDetails = _.zipObject(keys, _.head(result.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchUpdateStudent(payload, name) {
      const newDetails = _.assign(this.studentDetails, { [name]: payload });
      const data = new FormData();
      data.append("name", newDetails.name);
      data.append("code", newDetails.code);
      data.append("birthday", newDetails.birthday);
      data.append("address", newDetails.address);
      data.append("sex", newDetails.sex);
      data.append("classId", newDetails.classId);
      data.append("status", newDetails.status);
      updateStudentById(this.studentId, data)
        .then((result) => {
          console.log(result);
          notification.success({ message: "Cập nhật thành công!" });
        })
        .catch((err) => {
          console.log(err);
          notification.error({ message: "Cập nhật thất bại!" });
        });
    },
  },
  components: { BaseInput },
};
</script>

<style lang="scss" scoped></style>
