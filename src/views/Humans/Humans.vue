<template>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="humanCreate = true"
        >Создать человека</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="humans.humans"
      style="width: 100%"
    >
      <el-table-column prop="id" label="№" width="150" />
      <el-table-column prop="name" label="Имя" width="150" />
      <el-table-column prop="surname" label="Фамилия" width="150" />
      <el-table-column prop="patronymic" label="Отчество" width="150" />
      <el-table-column prop="dateBirth" label="Дата рождения" width="150" />
      <el-table-column prop="gender" label="Пол" width="150" />
      <el-table-column
        prop="addressRegistration"
        label="Адрес регистрации"
        width="150"
      />
      <el-table-column
        prop="addressResidential"
        label="Адрес проживания"
        width="150"
      />
      <el-table-column prop="contact.phone" label="Телефон" width="150" />
      <el-table-column prop="contact.email" label="Эл.почта" width="150" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="CreateHuman" v-model="humanCreate" width="30%">
      <create-human v-model="dialogVisible" @close="close" />
    </el-dialog>
    <el-dialog title="EditHuman" v-model="humanEdit" width="30%">
      <edit-human :human="human" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateHuman from "./CreateModal.vue";
import EditHuman from "./EditForm.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "Humans",
  components: { CreateHuman, EditHuman },
  data() {
    return {
      human: {},
      dialogVisible: false,
      humanEdit: false,
      humanCreate: false,
      humanRow: null
    };
  },

  computed: {
    ...mapState(["humans"]) // this getter would return the Promise
  },
  methods: {
    ...mapActions("humans", ["getAll"]),
    edit(id: number) {
      this.human = this.$store.getters["humans/getById"](id);
      this.humanEdit = true;
    },
    delete(id: number) {
      this.$store.dispatch("humans/delete", id);
    },
    close() {
      this.humanEdit = false;
      this.humanCreate = false;
    }
  },
  async mounted() {
    await this.getAll();
  }
});
</script>
