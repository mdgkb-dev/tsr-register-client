<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <template #header>
      <RemoteSearch
        :must-be-translated="true"
        key-value="representative"
        placeholder="Начните вводить ФИО представителя"
        @select="selectSearch"
      />
      <!--      <FiltersList default-label="Пол" :models="createSexFilters()" @load="loadPatients" />-->
      <!--      <SortList class="filters-block" :models="createSortList()" :store-mode="true" @load="loadPatients" />-->
    </template>
    <template #sort>
      <SortList :max-width="400" @load="loadItems" />
    </template>
    <el-table :data="representatives" class="table-shadow" header-row-class-name="header-style" row-class-name="no-hover">
      <el-table-column type="index" width="60" align="center" />
      <el-table-column align="left" min-width="110" resizable>
        <template #header>
          <span class="table-header">
            <span>Фамилия Имя Отчество</span>
          </span>
        </template>
        <template #default="scope">
          {{ scope.row.human.getFullName() }}
        </template>
      </el-table-column>

      <el-table-column width="130" prop="human.isMale" align="center">
        <template #header>
          <span class="table-header">
            <span>Пол</span>
          </span>
        </template>
        <template #default="scope">
          {{ scope.row.human.getGender() }}
        </template>
      </el-table-column>

      <el-table-column prop="human.dateBirth" width="150" align="center">
        <template #header>
          <span class="table-header">
            <span>Дата рождения</span>
          </span>
        </template>
        <template #default="scope">
          {{ $dateTimeFormatter.format(scope.row.human.dateBirth) }}
        </template>
      </el-table-column>

      <el-table-column prop="human.addressRegistration" label="АДРЕС РЕГИСТРАЦИИ" width="130" />

      <el-table-column width="120" label="ПОДОПЕЧНЫЕ" align="center">
        <template #default="scope">
          <div v-for="rep in scope.row.representativeToPatient" :key="rep">
            <el-tooltip
              class="item"
              effect="dark"
              :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
              placement="top-end"
            >
              <el-tag class="tag-link" @click="$router.push(`/patients/${rep.patient.id}`)">
                {{ rep.getRepresentativeChildType() }}
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="ТЕЛЕФОН" width="150" align="center">
        <template #default="scope">
          {{ scope.row.human.contact.phone }}
        </template>
      </el-table-column>

      <el-table-column prop="human.contact.email" label="EMAIL" min-width="150" align="center" />

      <el-table-column label="ДОКУМЕНТЫ" width="115" align="center">
        <template #default="scope">
          <div v-for="document in scope.row.human.documents" :key="document">
            <el-tooltip class="item" effect="dark" :content="document.documentType.name" placement="top-end">
              <el-tag size="small">
                <el-icon style="margin-right: 3px"><Document /></el-icon>
                <span>{{ document.documentType.getTagName() }}</span>
              </el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="50" align="center" class-name="sticky-right">
        <template #default="scope">
          <TableButtonGroup :show-edit-button="true" :show-remove-button="true" @edit="edit(scope.row.id)" @remove="remove(scope.row.id)" />
        </template>
      </el-table-column>
    </el-table>
  </AdminListWrapper>
</template>

<script lang="ts">
import { Document } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref, ref } from 'vue';

import Representative from '@/classes/Representative';
import RemoteSearch from '@/components/RemoteSearch.vue';
import SortList from '@/components/SortList.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import RepresentativesSortsLib from '@/libs/sorts/RepresentativesSortsLib';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';
export default defineComponent({
  name: 'AdminRepresentativesList',
  components: {
    RemoteSearch,
    TableButtonGroup,
    AdminListWrapper,
    SortList,
    Document,
  },
  setup() {
    const representatives: Ref<Representative[]> = computed(() => Provider.store.getters['representatives/items']);

    const queryStringsRepresentative: Ref<string> = ref('');

    const loadRepresentatives = async () => {
      await Provider.store.dispatch('representatives/getAll', Provider.filterQuery.value);
    };

    const load = async () => {
      // Provider.setSortModels(PatientsSortsLib.byFullName());
      await Provider.loadItems();
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Представители',
        buttons: [{ text: 'Добавить представителя', type: 'primary', action: Provider.createAdmin }],
      },
      sortsLib: RepresentativesSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/representatives/${event.value}`);
    };

    return {
      loadRepresentatives,
      selectSearch,
      queryStringsRepresentative,
      representatives,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
