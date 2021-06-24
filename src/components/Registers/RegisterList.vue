<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table v-if="mount" :default-sort="{ prop: 'id', order: 'ascending' }" :data="registers" class="table-shadow" header-row-class-name="header-style" border>
      <el-table-column type="index" label="№" width="50" />
      <el-table-column prop="name" label="Название регистра" min-width="150" />
      <el-table-column label="Действия" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="this.remove(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IRegister from '@/interfaces/registers/IRegister';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('registers', ['registers']),
  },
  methods: {
    ...mapActions({
      getAll: 'registers/getAll',
    }),
  },
})
export default class RegisterList extends Vue {
  registers!: IRegister[];
  title = 'Регистры пациентов';
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/registers/${id}`);
  }

  create(): void {
    this.$router.push('/registers/new');
  }

  remove(id: number): void {
    this.$store.dispatch('registers/delete', id);
  }
}
</script>
