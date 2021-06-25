<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-table v-if="mount" :default-sort="{ prop: 'id', order: 'ascending' }" :data="registerProperties" class="table-shadow" header-row-class-name="header-style" border>
      <el-table-column type="index" label="№" width="50" />
      <el-table-column prop="name" label="Название группы" min-width="150" />
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
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import ListHead from '@/components/ListHead.vue';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('registerProperties', ['registerProperties']),
  },
  methods: {
    ...mapActions({
      getAll: 'registerProperties/getAll',
    }),
  },
})
export default class RegisterPropertyList extends Vue {
  registerProperties!: IRegisterProperty[];
  title = 'Свойства для регистров';
  getAll!: () => Promise<void>;
  mount = false;

  async mounted(): Promise<void> {
    await this.getAll();
    this.mount = true;
  }

  edit(id: number): void {
    this.$router.push(`/register-properties/${id}`);
  }

  create(): void {
    this.$router.push('/register-properties/new');
  }

  remove(id: number): void {
    this.$store.dispatch('registerProperties/delete', id);
  }
}
</script>
