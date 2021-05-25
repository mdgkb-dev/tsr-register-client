<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="representativeTypes" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="Название типа" width="150" />
      <el-table-column prop="childMaleType" label="Подопечный мужского пола" width="150" />
      <el-table-column prop="childWomanType" label="Подопечный женского пола" width="150" />
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

import ListHead from '@/components/ListHead.vue';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions('representativeTypes', ['getAll']),
  },
})
export default class RepresentativeTypesList extends Vue {
  representativeTypes!: IRepresentativeType[];
  getAll!: () => Promise<void>;
  title = 'Типы представителей';

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.$router.push(`/representative-types/${id}`);
  }

  create(): void {
    this.$router.push('/representative-types/new');
  }

  delete(id: number): void {
    this.$store.dispatch('representativeTypes/delete', id);
  }
}
</script>
