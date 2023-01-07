<template>
  <div class="grid grid-cols-3 gap-5">
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Tổng số lớp: {{ classData.length }}
    </div>
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Số lớp hoạt động: {{ countClassActive }}
    </div>
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Số lớp kết thúc: {{ countClassDeactive }}
    </div>
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Tổng số sinh viên: {{studentData.length  }}
    </div>
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Số sinh viên hoạt động: {{ countstudentActive }}
    </div>
    <div class="cols-span-1 p-6 bg-blue-50 rounded shadow text-xl">
      Số sinh viên đình chỉ:{{ countStudentDeactive }}
    </div>
  </div>
</template>

<script>
import { getListStudent } from "../../apis/student";
import _ from "lodash";
import { getListClass } from "../../apis/class";
export default {
  name: "PyDaIndex",

  data() {
    return {
      classData: [],
      studentData: [],
    };
  },
  created() {
    this.fetchListStudent();
    this.fetchListClass();
  },
  methods: {
    fetchListStudent() {
      const keys = [
        "id",
        "name",
        "code",
        "birthday",
        "address",
        "classId",
        "status",
        "sex",
      ];
      getListStudent()
        .then((result) => {
          this.studentData = _.map(result.data, (item) =>
            _.zipObject(keys, item)
          );
          console.log(this.studentData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchListClass() {
      const keys = ["id", "name", "year", "note", "status"];
      getListClass()
        .then((result) => {
          this.classData = _.map(result.data, (item) =>
            _.zipObject(keys, item)
          );
          console.log(this.classData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    countClassActive() {
      return _.filter(this.classData, { status: 1 }).length;
    },
    countClassDeactive() {
      return _.filter(this.classData, { status: 0 }).length;
    },
    countstudentActive() {
      return _.filter(this.studentData, { status: 1 }).length;
    },
    countStudentDeactive() {
      return _.filter(this.studentData, { status: 0 }).length;
    },
  },
};
</script>

<style lang="scss" scoped></style>
