<template>
  <!-- <div class="mb-4 flex justify-end">
    <input class="border py-1" type="text" />
    <button class="border py-1 px-3 bg-green-300">Tìm kiếm</button>
  </div> -->
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
         <RouterLink :to="'/students/'+record.id">
           <a>
            {{ record.name }}
          </a>
         </RouterLink>
        </span>
      </template>
      <template v-else-if="column.key === 'status'">
        <div
          class="bg-green-400 border text-white text-center rounded-lg p-1 w-28"
          v-if="record.status == 1"
        >
          Hoạt động
        </div>
        <div class="bg-gray-200 border text-center rounded-lg p-1 w-28" v-else>
          Kết thúc
        </div>
      </template>
      <template v-else-if="column.key === 'action'">
        <span class="flex gap-4">
          <a @click="getClassDetails(record)" class="text-blue-400"
            ><file-outlined :style="{ fontSize: '20px' }" />
          </a>

          <a-popconfirm @confirm="confirm(record.id)" title="Bạn muốn xóa ？">
            <template #icon
              ><question-circle-outlined style="color: red"
            /></template>
            <a class="text-red-600">
              <delete-outlined :style="{ fontSize: '20px' }" />
            </a>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
  <ButtonCreate :name="'Tạo mới lớp học'" :to-link="'class-create'" />
</template>
<script>
import {
  QuestionCircleOutlined,
  FileOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { defineComponent } from "vue";
import { deleteClassById, getListClass } from "../../apis/class";
import ButtonCreate from "../../components/ButtonCreate.vue";
import _ from "lodash";

export default defineComponent({
  components: {
    ButtonCreate,
    QuestionCircleOutlined,
    FileOutlined,
    DeleteOutlined,
  },
  data() {
    return {
      data: [],
      columns: [
        {
          name: "Tên lớp",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Niêm khóa",
          dataIndex: "year",
          key: "year",
        },
        {
          title: "Ghi chú",
          dataIndex: "note",
          key: "note",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Thao tác",
          key: "action",
        },
      ],
    };
  },
  created() {
    this.fetchListClass();
    this.data = [];
  },
  methods: {
    fetchListClass() {
      const keys = ["id", "name", "year", "note", "status"];
      getListClass()
        .then((result) => {
          this.data = _.map(result.data, (item) => _.zipObject(keys, item));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getClassDetails(row) {
      this.$router.push("class-update/" + row.id);
    },
    confirm(id) {
      deleteClassById(id)
        .then(() => {
          this.fetchListClass();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>
