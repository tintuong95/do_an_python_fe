<template>
  <div class="grid grid-cols-3 gap-5">
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Tổng số lớp: <span class="text-3xl font-semibold text-gray-600">{{ classData.length }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Số lớp hoạt động :  <span class="text-3xl font-semibold text-gray-600">{{ countClassActive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Số lớp kết thúc : <span class="text-3xl font-semibold text-gray-600">{{ countClassDeactive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Tổng số sinh viên : <span class="text-3xl font-semibold text-gray-600">{{studentData.length  }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Số sinh viên hoạt động : <span class="text-3xl font-semibold text-gray-600">{{ countstudentActive }}</span>
    </div>
    <div class="cols-span-1 p-10 border bg-white rounded shadow-sm text-xl">
      Số sinh viên đình chỉ : <span class="text-3xl font-semibold text-gray-600">{{ countStudentDeactive }}</span>
    </div>
  </div>
    <a-table class="mt-10" :pagination="false" :columns="columns" :data-source="studentData.slice(0,7)">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span> Name </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span class="flex gap-4 items-center">
          <a-avatar
            class="shadow-md border-4 border-white"
            style="background-color: #f56a00"
            >{{ record.name.slice(0, 1) }}</a-avatar
          >
          <a>
            {{ record.name }}
          </a>
        </span>
      </template>
      <template v-else-if="column.key === 'status'">
        <div
          class="bg-green-400 border text-white text-center rounded-lg p-1 w-28"
          v-if="record.status"
        >
          Hoạt động
        </div>
        <div class="bg-gray-200 border text-center rounded-lg p-1 w-28" v-else>
          Đình chỉ
        </div>
      </template>
      <template v-else-if="column.key === 'sex'">
        <div
          class="border text-center rounded-lg p-1 w-28"
          v-if="record.sex == 1"
        >
          Nam
        </div>
        <div class="border text-center rounded-lg p-1 w-28" v-else>Nữ</div>
      </template>
    
    </template>
  </a-table>
</template>

<script>
import { getListStudent } from "../../apis/student";
import _ from "lodash";
import { getListClass } from "../../apis/class";
import emitter from "../../utils/mitt";


export default {
  name: "PyDaIndex",

  data() {
    return {
      classData: [],
      studentData: [],
       columns: [
        {
          name: "Họ tên",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "CMND",
          dataIndex: "code",
          key: "code",
        },
        {
          title: "Ngày sinh",
          dataIndex: "birthday",
          key: "birthday",
        },
        {
          title: "Địa chỉ",
          key: "address",
          dataIndex: "address",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Giới tính",
          dataIndex: "sex",
          key: "sex",
        },
       
      ],
      data: [],
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
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchListClass() {
      emitter.emit("setLoading",true)
      const keys = ["id", "name", "year", "note", "status"];
      getListClass()
        .then((result) => {
          this.classData = _.map(result.data, (item) =>
            _.zipObject(keys, item)
          );

        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
           emitter.emit("setLoading",false)
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
