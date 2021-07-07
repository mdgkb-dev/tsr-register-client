<template>
  <div class="wrapper" v-if="mount" style="height:100%">
    <PageHead :title="title" @create="create" :showAddButton="true" />
    <div class="table-background">
      <el-input prefix-icon="el-icon-search" style="border-radius: 90%" v-model="search" placeholder="Поиск" class="table-search" />
      <el-table
        :data="filterTable(representatives)"
        class="table-shadow"
        header-row-class-name="header-style"
        row-class-name="no-hover"
        style="width: 100%;margin-bottom: 20px; max-height: calc(100vh - 310px); overflow: auto;"
      >
        <el-table-column type="index" width="60" align="center" />
        <el-table-column width="150" align="left">
          <template #header>
            <el-input v-model="searchFullName" size="mini" placeholder="Поиск по имени..." />
          </template>
          <el-table-column label="ФАМИЛИЯ ИМЯ ОТЧЕСТВО" sortable align="left" min-width="150" resizable>
            <template #default="scope">
              {{ scope.row.human.getFullName() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <template #header> </template>
          <el-table-column width="75" label="ПОЛ" sortable prop="human.isMale" align="center">
            <template #default="scope">
              {{ scope.row.human.getGender() }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.dateBirth" label="ДАТА РОЖДЕНИЯ" width="120" align="center" sortable>
            <template #default="scope">
              {{ fillDateFormat(scope.row.human.dateBirth) }}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <template #header>
            <el-input v-model="searchAddress" size="mini" placeholder="Поиск по адресу..." />
          </template>
          <el-table-column prop="human.addressRegistration" label="АДРЕС РЕГИСТРАЦИИ" width="130" />
        </el-table-column>

        <el-table-column>
          <el-table-column width="120" label="ПОДОПЕЧНЫЕ" align="center">
            <template #default="scope">
              <div v-for="rep in scope.row.representativeToPatient" :key="rep">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
                  placement="top-end"
                >
                  <el-tag class="tag-link" @click="this.$router.push(`/patients/${rep.patient.id}`)">{{ children(rep) }}</el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.contact.phone" label="ТЕЛЕФОН" width="150" align="center" />
        </el-table-column>

        <el-table-column>
          <el-table-column prop="human.contact.email" label="EMAIL" min-width="150" align="center" />
        </el-table-column>

        <el-table-column>
          <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
            <template #default="scope">
              <div v-for="document in scope.row.human.documents" :key="document">
                <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
                  <el-tag size="small">
                    <i class="el-icon-document" style="margin-right: 3px"></i>
                    <span>{{ document.documentType.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column width="40" fixed="right" align="center">
          <template #default="scope">
            <TableButtonGroup @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" :showEditButton="true" :showRemoveButton="true" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapState } from 'vuex';

import Filter from '@/classes/filters/Filter';
import PageHead from '@/components/PageHead.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IFilter from '@/interfaces/filters/IFilter';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';

@Options({
  name: 'RepresentativesList',
  components: {
    PageHead,
    TableButtonGroup,
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
  searchFullName = '';
  searchAddress = '';
  filter = new Filter();
  title = 'Представители';
  mount = false;

  async mounted(): Promise<void> {
    try {
      await this.getAll();
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    this.filterName = this.representatives.map((r: IRepresentative) => ({ text: r.human.getFullName(), value: r.human.getFullName() }));
    this.filterDate = this.representatives.map((r: IRepresentative) => ({ text: r.human.dateBirth, value: r.human.dateBirth }));
    this.mount = true;
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

  children = (representative: IRepresetnationType) => {
    if (representative.patient) {
      return representative.patient.human.isMale ? representative.representativeType?.childMaleType : representative.representativeType?.childWomanType;
    }
    return '';
  };

  filterTable = (representatives: IRepresentative[]) => {
    let filteredRepresentatives = representatives;

    const search = this.search.toLowerCase();
    const searchFullName = this.searchFullName.toLowerCase();
    const searchAddress = this.searchAddress.toLowerCase();

    filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
      const address = representative.human.addressRegistration.toLowerCase();
      return !this.searchAddress || address.includes(searchAddress);
    });

    filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
      const name = representative.human.getFullName().toLowerCase();
      return !this.searchFullName || name.includes(searchFullName);
    });

    filteredRepresentatives = filteredRepresentatives.filter((representative: IRepresentative) => {
      const name = representative.human.getFullName().toLowerCase();
      const date = representative.human.dateBirth;
      return !this.search || name.includes(search) || date.includes(search);
    });

    return filteredRepresentatives;
  };

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>
