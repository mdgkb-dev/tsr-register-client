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
      :data="humans"
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
      <CreateHuman v-model="dialogVisible" @close="close" />
    </el-dialog>
    <el-dialog title="EditHuman" v-model="humanEdit" width="30%">
      <EditHuman :human="human" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import CreateHuman from './CreateModal.vue';
import EditHuman from './EditForm.vue';

@Options({
  components: {
    CreateHuman,
    EditHuman,
  },
  computed: {
    ...mapState({
      humans: 'humans/humans',
    }),
    ...mapActions({
      getAll: 'humans/getAll',
    }),
  },
})
export default class HumansList extends Vue {
  humans!: [];

  getAll!: () => Promise<void>;

  human = {};

  dialogVisible = false;

  humanEdit = false;

  humanCreate = false;

  humanRow = null;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.human = this.$store.getters['humans/getById'](id);
    this.humanEdit = true;
  }

  delete(id: number): void {
    this.$store.dispatch('humans/delete', id);
  }

  close(): void {
    this.humanEdit = false;
    this.humanCreate = false;
  }
}
</script>
