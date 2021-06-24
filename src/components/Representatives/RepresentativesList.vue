<template>
  <ListHead :title="title" @create="create" />
  <div class="table-background">
    <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
    <el-table :data="filterTable(representatives)" class="table-shadow" header-row-class-name="header-style" @row-dblclick="edit" border>
      <!-- <el-table-column type="expand">
        <template #default="props">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Представляет</span>
              </div>
            </template>
            <div v-for="item in props.row.representativeToPatient" :key="item.patient.human" class="text item">
              {{ item.patient.human }}
            </div>
          </el-card>
        </template>
      </el-table-column> -->
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column min-width="150" label="ФИО" :filters="filterName" :filter-method="filter.filterNameMethod">
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Пол">
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>

      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" min-width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" min-width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" min-width="150" />
      <el-table-column min-width="150" label="Привязанные дети">
        <template #default="scope">
          <div v-for="rep in scope.row.representativeToPatient" :key="rep">
            <el-tooltip
              class="item"
              effect="dark"
              :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
              placement="top-end"
            >
              <el-check-tag @click="this.$router.push(`/patients/${rep.patient.id}`)">{{ children(rep) }}</el-check-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="" width="140">
        <template #default="scope">
          <el-button @click="edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="remove(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';

import Filter from '@/classes/filters/Filter';
import IFilter from '@/interfaces/filters/IFilter';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import ListHead from '../ListHead.vue';

@Options({
  components: {
    ListHead,
  },
  computed: {
    ...mapState('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      getAll: 'representatives/getAll',
    }),
  },
})
export default class RepresentativesList extends Vue {
  $message!: {
    error: any;
  };

  representatives!: IRepresentative[];
  getAll!: () => Promise<void>;
  search = '';

  filterName: IFilter[] = [];
  filterDate: IFilter[] = [];
  filter = new Filter();
  title = 'Представители';

  async mounted(): Promise<void> {
    try {
      await this.getAll();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.filterName = this.representatives.map((r: IRepresentative) => ({ text: r.human.getFullName(), value: r.human.getFullName() }));
    this.filterDate = this.representatives.map((r: IRepresentative) => ({ text: r.human.dateBirth, value: r.human.dateBirth }));
  }

  edit(id: number): void {
    this.$router.push(`/representatives/${id}`);
  }

  create(): void {
    this.$router.push('/representatives/new');
  }

  remove(id: number): void {
    this.$store.dispatch('representatives/delete', id);
  }

  filterTable = (representatives: IRepresentative[]) => {
    const search = this.search.toLowerCase();
    return representatives.filter((representative: IRepresentative) => {
      const name = representative.human.getFullName().toLowerCase();
      const date = representative.human.dateBirth;
      return !this.search || name.includes(search) || date.includes(search);
    });
  };

  children = (representative: IRepresetnationType) => {
    if (representative.patient) {
      return representative.patient.human.isMale ? representative.representativeType?.childMaleType : representative.representativeType?.childWomanType;
    }
    return '';
  };
}
</script>
