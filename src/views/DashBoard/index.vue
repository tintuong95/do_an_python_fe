<template>
  <div class="grid grid-cols-3 gap-5">
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Tổng số lớp: <span class="text-3xl font-semibold text-gray-600">{{ classData.length }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Số lớp hoạt động :  <span class="text-3xl font-semibold text-gray-600">{{ countClassActive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Số lớp kết thúc : <span class="text-3xl font-semibold text-gray-600">{{ countClassDeactive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Tổng số sinh viên : <span class="text-3xl font-semibold text-gray-600">{{studentData.length  }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Số sinh viên hoạt động : <span class="text-3xl font-semibold text-gray-600">{{ countstudentActive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-blue-50 rounded shadow-sm text-xl">
      Số sinh viên đình chỉ : <span class="text-3xl font-semibold text-gray-600">{{ countStudentDeactive }}</span>
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
