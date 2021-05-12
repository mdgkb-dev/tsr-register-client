<template>
  <ListHead :title="title" @create="create" />
  <div v-if="mount" class="table-background">
    <el-table
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="anthropometries"
      class="table-shadow"
      :header-cell-style="{ color: '#a1a7bd', 'font-size': '12px', background: '#eff1f7', 'font-family': 'Open Sans' }"
    >
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
import ListHead from '@/components/ListHead.vue';

@Options({
  components: {
    ListHead,
  },
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
  title = 'Антропометрия';

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
