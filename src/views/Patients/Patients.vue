<template>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="modalCreate = true"
        >Создать пациента</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients.patients"
      style="width: 100%"
    >
      <el-table-column prop="id" label="№" width="150" />
      <el-table-column prop="human.name" label="Имя" width="150" />
      <el-table-column prop="human.surname" label="Фамилия" width="150" />
      <el-table-column prop="human.patronymic" label="Отчество" width="150" />
      <el-table-column
        prop="human.dateBirth"
        label="Дата рождения"
        width="150"
      />
      <el-table-column prop="human.gender" label="Пол" width="150" />
      <el-table-column
        prop="human.addressRegistration"
        label="Адрес регистрации"
        width="150"
      />
      <el-table-column
        prop="human.addressResidential"
        label="Адрес проживания"
        width="150"
      />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column
        prop="human.contact.email"
        label="Эл.почта"
        width="150"
      />
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

    <el-dialog title="Создать Пациента" v-model="modalCreate" width="30%">
      <create-form v-model="modalCreate" @close="close" />
    </el-dialog>
    <el-dialog title="Отредактировать пациента" v-model="modalEdit" width="30%">
      <edit-form :item="item" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateForm from "./CreateForm.vue";
import EditForm from "./EditForm.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "Patients",
  components: { CreateForm, EditForm },
  data() {
    return {
      item: {},
      modalCreate: false,
      modalEdit: false
    };
  },
  computed: {
    ...mapState(["patients"])
  },
  methods: {
    ...mapActions("patients", ["getAll"]),
    edit(id: number) {
      this.item = this.$store.getters["patients/getById"](id);
      this.modalEdit = true;
    },
    delete(id: number) {
      this.$store.dispatch("patients/delete", id);
    },
    close() {
      this.modalEdit = false;
      this.modalCreate = false;
    }
  },
  async mounted() {
    await this.getAll();
  }
});
</script>
