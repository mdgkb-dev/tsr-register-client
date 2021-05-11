<template>
  <div style="width: 100%" v-if="mount">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="create">Создать параметр антропометрии</el-button>
    </el-button-group>

    <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="anthropometries" style="width: 100%">
      <el-table-column prop="№" label="№" width="150" />
      <el-table-column prop="name" label="Название параметра" width="150" />
      <el-table-column label="Действия" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  computed: {
    ...mapState('anthropometry', ['anthropometries']),
  },
  methods: {
    ...mapActions({
      getAll: 'anthropometry/getAll',
    }),
  },
})
export default class Anthropometry extends Vue {
  anthropometries!: IAnthropometry[];
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: string): void {
    this.$router.push(`/anthropometry/${id}`);
  }

  create(): void {
    this.$router.push('/anthropometry/new');
  }

  delete(id: number): void {
    this.$store.dispatch('anthropometry/delete', id);
  }
}
</script>
