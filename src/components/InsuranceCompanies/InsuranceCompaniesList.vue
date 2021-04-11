<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="create"
        >Создать страховую компанию</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="insuranceCompanies"
      style="width: 100%"
    >
      <el-table-column prop="№" label="№" width="150" />
      <el-table-column prop="name" label="Название страховой компании" width="150" />
      <el-table-column label="Действия" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small"
            >Редактировать</el-button
          >
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      v-model="modalVisible"
      :close-on-click-modal="false"
      width="85vw"
      top="3vh"
      :title="modalTitle"
      center
    >
      <ModalForm :insurance="insuranceCompany" :is-create-form="isCreateForm" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IInsuranceCompany from '@/interfaces/insuranceCompanies/IInsuranceCompany';
import ModalForm from './ModalForm.vue';

@Options({
  components: {
    ModalForm,
  },
  computed: {
    ...mapState('insuranceCompanies', ['insuranceCompanies']),
  },
  methods: {
    ...mapActions('insuranceCompanies', ['getAll']),
  },
})
export default class InsuranceCompanies extends Vue {
  insuranceCompanies!: [];

  getAll!: () => Promise<void>;

  insuranceCompany: IInsuranceCompany = {
    name: '',
  };

  isCreateForm = false;

  modalVisible = false;

  modalTitle = '';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.insuranceCompany = this.$store.getters['insuranceCompanies/getById'](id);
    this.isCreateForm = false;
    this.modalTitle = 'Редактировать компанию';
    this.modalVisible = true;
  }

  create(): void {
    this.insuranceCompany = {
      name: '',
    };
    this.isCreateForm = true;
    this.modalVisible = true;
    this.modalTitle = 'Добавить страховую компанию';
  }

  delete(id: number): void {
    this.$store.dispatch('insuranceCompanies/delete', id);
  }

  close(): void {
    this.modalVisible = false;
  }
}
</script>
