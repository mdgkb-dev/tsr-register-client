<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="create"
        >Создать параметр антропометрии</el-button
      >
    </el-button-group>

    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="anthropometry"
      style="width: 100%"
    >
      <el-table-column prop="№" label="№" width="150" />
      <el-table-column prop="name" label="Название параметра" width="150" />
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
      <ModalForm :anthropometry="anthropometryItem" :is-create-form="isCreateForm" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import ModalForm from './ModalForm.vue';

@Options({
  components: {
    ModalForm,
  },
  computed: {
    ...mapState('anthropometry', ['anthropometry']),
  },
  methods: {
    ...mapActions('anthropometry', ['getAll']),
  },
})
export default class Anthropometry extends Vue {
  anthropometry!: [];

  getAll!: () => Promise<void>;

  anthropometryItem: IAnthropometry = {
    name: '',
    measure: '',
  };

  isCreateForm = false;

  modalVisible = false;

  modalTitle = '';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.anthropometryItem = this.$store.getters['anthropometry/getById'](id);
    this.modalVisible = true;
  }

  create(): void {
    this.anthropometryItem = {
      name: '',
      measure: '',
    };
    this.isCreateForm = true;
    this.modalVisible = true;
    this.modalTitle = 'Добавить параметр антропометрии';
  }

  delete(id: number): void {
    this.$store.dispatch('anthropometry/delete', id);
  }

  close(): void {
    this.modalVisible = false;
  }
}
</script>
