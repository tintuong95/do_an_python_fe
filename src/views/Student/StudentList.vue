<template>
  <a-table :columns="columns" :data-source="data">
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
      <template v-else-if="column.key === 'action'">
        <span class="flex gap-4">
          <span
            @click="getClassDetails(record)"
            role="button"
            class="text-blue-400"
            ><file-outlined :style="{ fontSize: '20px' }" />
          </span>
          <a-popconfirm @confirm="confirm(record.id)" title="Bạn muốn xóa ？">
            <template #icon
              ><question-circle-outlined style="color: red"
            /></template>
            <a class="text-red-600"
              ><delete-outlined :style="{ fontSize: '20px' }" />
            </a>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
  <ButtonCreate :name="'Tạo mới sinh viên'" :to-link="'student-create'" />
</template>
<script>
import { defineComponent } from "vue";
import { deleteStudentById, getListStudent } from "../../apis/student";
import ButtonCreate from "../../components/ButtonCreate.vue";
import _ from "lodash";
import { FileOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import emitter from "../../utils/mitt";

export default defineComponent({
  components: {
    ButtonCreate,
    FileOutlined,
    DeleteOutlined,
  },
  data() {
    return {
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
        {
          title: "Action",
          key: "action",
        },
      ],
      data: [],
    };
  },
  created() {
    this.fetchListStudent();
    this.classId = this.$route.params?.id || null;
  },
  methods: {
    fetchListStudent() {
       emitter.emit("setLoading",true)
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
          this.data = _.map(result.data, (item) => _.zipObject(keys, item));
          this.data = _.filter(this.data, (item) => {
            if (this.classId) {
              return item.classId == this.classId;
            } else {
              return true;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        }).finally(()=>{
           emitter.emit("setLoading",false)
        });
    },
    getClassDetails(row) {
      this.$router.push("/student-update/" + row.id);
    },
    confirm(id) {
      deleteStudentById(id)
        .then(() => {
          this.fetchListStudent();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
