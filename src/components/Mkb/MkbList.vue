<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table :data="mkb1" class="table-shadow" header-row-class-name="header-style" v-if="mount">
      <el-table-column prop="id" label="Класс" width="150" />
      <el-table-column prop="class" label="Класс" width="150" />
      <el-table-column prop="className" label="Название класса" width="150" />
      <el-table-column prop="classRange" label="Диапазон класса" width="150" />
      <el-table-column prop="classComment" label="Комментарий к классу" width="150" />
      <el-table-column prop="groupName" label="Название группы" width="150" />
      <el-table-column prop="groupRange" label="Диапазон группы" width="150" />
      <el-table-column prop="groupComment" label="Комментарий к группе" width="150" />
      <el-table-column prop="subGroupName" label="Название подгруппы" width="150" />
      <el-table-column prop="subGroupRange" label="Диапазон подгруппы" width="150" />
      <el-table-column prop="subGroupComment" label="Комментарий к подгруппе" width="150" />
      <el-table-column prop="subSubGroupName" label="Название подподгруппы" width="150" />
      <el-table-column prop="subSubGroupRange" label="Диапазон подподгруппы" width="150" />
      <el-table-column prop="subSubGroupComment" label="Комментарий к подподгруппе" width="150" />
      <el-table-column prop="diagnosisName" label="Название диагноза" width="150" />
      <el-table-column prop="diagnosisComment" label="Комментарий к диагнозу" width="150" />
      <el-table-column prop="subDiagnosisName" label="Название уточнённого диагноза" width="150" />
      <el-table-column prop="subDiagnosisComment" label="Комментарий к уточнённому диагнозу" width="150" />
      <el-table-column prop="subDiagnosisComment" label="Комментарий к уточнённому диагнозу" width="150" />
      <el-table-column fixed="right" label="Добавить комментарии" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small">Добавить комментарий</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="modalVisible" width="50%" :close-on-click-modal="false">
      <ModalForm :mkbItem="mkbItem" :modalTitle="modalTitle" @close="close" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IMkb from '@/interfaces/mkb/IMkb';

import ListHead from '@/components/ListHead.vue';
import ModalForm from './ModalForm.vue';

@Options({
  components: {
    ModalForm,
    ListHead,
  },
  computed: {
    ...mapState('mkb', ['mkb']),
  },
  methods: {
    ...mapActions({
      getAll: 'mkb/getAll',
    }),
  },
})
export default class MkbList extends Vue {
  getAll!: () => Promise<void>;
  mkb!: IMkb[];
  mkb1!: IMkb[];
  mkbItem: IMkb = {
    id: '',
    class: '',
    className: '',
    classRange: '',
    classComment: '',
    groupName: '',
    groupRange: '',
    groupComment: '',
    subGroupName: '',
    subGroupRange: '',
    subGroupComment: '',
    subSubGroupName: '',
    subSubGroupRange: '',
    subSubGroupComment: '',
    diagnosisName: '',
    diagnosisComment: '',
    subDiagnosisName: '',
    subDiagnosisComment: '',
  };

  mount = false;
  modalTitle = '';
  isCreateForm = false;
  modalVisible = false;
  title = 'МКБ';

  async mounted(): Promise<void> {
    await this.getAll();
    this.mkb1 = this.mkb.slice(1, 100);
    this.mount = true;
  }

  edit(id: number): void {
    this.mkbItem = this.$store.getters['mkb/getById'](id);
    this.modalTitle = 'Добавить комментарий';
    this.modalVisible = true;
  }

  close(): void {
    this.modalVisible = false;
  }
}
</script>
