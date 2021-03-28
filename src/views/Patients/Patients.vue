<Patients>
  <div>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click="patientCreate = true"
        >Create</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="patients.patients"
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

    <el-dialog title="Createpatient" v-model="patientCreate" width="30%">
      <create-patient v-model="dialogVisible" @close="close" />
    </el-dialog>
    <el-dialog title="Editpatient" v-model="patientEdit" width="30%">
      <edit-patient :patient="patient" @close="close" />
    </el-dialog>
  </div>
</Patients>

<script lang="ts">
import { defineComponent } from "vue";
import CreateModal from "./CreateModal.vue";
import EditModal from "./EditModal.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "Users",
  components: { CreateModal, EditModal },
  data() {
    return {
      patient: {},
      dialogVisible: false,
      patientEdit: false,
      patientCreate: false,
      patientRow: null
    };
  },
  computed: {
    ...mapState(["patients"])
  },
  methods: {
    ...mapActions("patients", ["getAll"]),
    edit(id: number) {
      this.patient = this.$store.getters["patients/getById"](id);
      this.patientEdit = true;
    },
    delete(id: number) {
      this.$store.dispatch("patients/delete", id);
    },
    close() {
      this.patientEdit = false;
      this.patientCreate = false;
    }
  },
  async mounted() {
    await this.getAll();
  }
});
</script>
