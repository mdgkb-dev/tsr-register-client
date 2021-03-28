<template>
  <div>
    <!--    <create-human v-model="dialogVisible" :name="name" />-->
    <el-dialog title="CreateHuman" v-loading="humanEditLoading" width="30%">
      <edit-human :human="human"></edit-human>
    </el-dialog>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-document"
        @click.stop="dialogVisible = true"
        >Create</el-button
      >
    </el-button-group>

    <el-table :data="humans.humans" style="width: 100%">
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
          <el-button @click.stop="this.edit(scope.row)" type="text" size="small"
            >Редактировать</el-button
          >
        </template>
        <!--        <el-button @click="handleClick" type="text" size="small"-->
        <!--          >Удалить</el-button-->
        <!--        >-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateHuman from "./CreateHuman.vue";
import EditHuman from "./EditHuman.vue";
import { mapActions, mapState } from "vuex";
export default defineComponent({
  name: "Humans",
  components: { EditHuman },
  data() {
    return {
      human: {},
      dialogVisible: false,
      humanEdit: false,
      humanEditLoading: false,
      humanRow: null
    };
  },

  computed: {
    ...mapState(["humans"]) // this getter would return the Promise
  },
  methods: {
    ...mapActions("humans", ["getAllHumans"]),
    openModal(row: any) {
      console.log(row);
      this.dialogVisible = true;
      this.humanRow = row;
    },
    edit(id: number) {
      this.humanEdit = true;
      this.humanEditLoading = false;
      const func = this.$store.getters.getHumanById;
      console.log(func);
      this.human = func;
    }
  },
  async mounted() {
    await this.getAllHumans();
  }
});
</script>
