<template>
  <form>
    <BaseInput
      @send-edit-value="fetchUpdateClass($event, 'status')"
      :content="classDetails.status"
      label="Trạng thái "
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateClass($event, 'name')"
      :content="classDetails.name"
      label="Tên lớp học "
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateClass($event, 'year')"
      :content="classDetails.year"
      label="Niên khóa "
    />
    <hr class="my-6" />
    <BaseInput
      @send-edit-value="fetchUpdateClass($event, 'note')"
      :content="classDetails.note"
      label="Ghi chú "
    />

  </form>
</template>

<script>
import { getClassById, updateClassById } from "../../apis/class";
import BaseInput from "../../components/BaseInput.vue";
import { notification } from "ant-design-vue";
import _ from "lodash";
export default {
  name: "PyDaStudentCreate",
  data() {
    return {
      classDetails: {},
    };
  },
  created() {
    this.classId = this.$route.params.id;
    this.fetchClassDetails();
  },
  methods: {
    fetchClassDetails() {
      getClassById(this.classId)
        .then((result) => {
          const keys = ["id", "name", "year", "note","status"];
          this.classDetails = _.zipObject(keys, result.data[0]);
        })
        .then((error) => {
          console.log(error);
        });
    },
    fetchUpdateClass(payload, name) {
      const newDetails = _.assign(this.classDetails, { [name]: payload });
      const data = new FormData();
      data.append("name", newDetails.name);
      data.append("year", newDetails.year);
      data.append("note", newDetails.note);
      data.append("status", newDetails.status);
      updateClassById(this.classId, data)
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
