<template>
  <RemoteSearch
    :must-be-translated="true"
    key-value="representative"
    placeholder="Начните вводить название диагноза"
    @select="addRepresentative"
  />
  <el-button style="margin-bottom: 20px" @click="openRepresentativeModal()">Создать представителя</el-button>
  <el-table
    v-if="mount"
    :data="patient.patientsRepresentatives"
    style="width: 800px"
    class="table-shadow"
    header-row-class-name="header-style"
  >
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="ФИО" align="start">
      <template #default="scope">
        <div>
          {{ scope.row.representative.human.getFullName() }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="start" width="200">
      <template #default="scope">
        <el-select
          v-model="scope.row.representativeTypeId"
          placeholder="Роль представителя"
          :disabled="!scope.row.representativeId"
          @change="selectRepresentativeType(scope.row)"
        >
          <el-option
            v-for="item in representativeTypes"
            :key="item.id"
            :label="getRepresentativeTypeLabel(item, scope.$index)"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!--        <el-button v-else-if="isEditMode" @click="openRepresentativeModal(scope.$index)">Создать</el-button>-->
        <!--        <span v-else>{{ getRepresentativeTypeLabel(scope.row.representativeType, scope.$index) }}</span>-->
      </template>
    </el-table-column>

    <el-table-column label="Телефон" align="start">
      <template #default="scope">
        <div>
          {{ scope.row.representative.human.contact.phone }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Email" align="start">
      <template #default="scope">
        <div>
          {{ scope.row.representative.human.contact.email }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Email" align="start">
      <template #default="scope">
        <div>
          {{ scope.row.patientId }}
        </div>
      </template>
    </el-table-column>

    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row.id)" />
      </template>
    </el-table-column>
  </el-table>
  <RepresentativeModal :show="showModal" @close="showModal = false" @save="createAndSaveRepresentative" />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import PatientRepresentative from '@/classes/PatientRepresentative';
import Representative from '@/classes/Representative';
import RepresentativeToPatientRules from '@/classes/RepresentativeToPatientRules';
import RepresentativeType from '@/classes/RepresentativeType';
import RepresentativeModal from '@/components/admin/Patients/RepresentativeModal.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientRepresentatives',
  components: {
    TableButtonGroup,
    RepresentativeModal,
    RemoteSearch,
  },
  // props: {
  //   patient: {
  //     type: Object as PropType<Patient>,
  //     required: true,
  //   },
  // },
  setup(props) {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const showModal: Ref<boolean> = ref(false);
    const representatives: ComputedRef<Representative[]> = computed(() => store.getters['representatives/items']);
    const patient: ComputedRef<Patient> = computed(() => store.getters['patients/item']);
    const lastInsertedId: ComputedRef<string> = computed(() => store.getters['representatives/lastInsertedId']);
    const representative: ComputedRef<Representative> = computed(() => store.getters['representatives/item']);
    const creatingIndex: Ref<number | undefined> = ref(undefined);
    const representativeTypes: ComputedRef<RepresentativeType[]> = computed(() => store.getters['representativeTypes/items']);

    // const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      mount.value = true;
    });

    const getRepresentativeTypeLabel = (item: RepresentativeType, index: number): string => {
      // if (!representatives.value) {
      //   return '';
      // }
      const representative = representatives.value.find((i: Representative) => {
        return i.id === patient.value.patientsRepresentatives[index].representativeId;
      });
      if (representative?.human.isMale) {
        return item.parentMaleType;
      } else {
        return item.parentWomanType;
      }
    };

    const addRepresentative = async (event: ISearchObject) => {
      if (patient.value.representativeExists(event.value)) {
        return ElMessage.warning('Выбранный представитель уже добавлен');
      }
      await store.dispatch('representatives/get', event.value);
      const item = patient.value.addRepresentative(representative.value);
      await store.dispatch('patientsRepresentatives/create', item);
    };
    //
    const openRepresentativeModal = (index?: number) => {
      creatingIndex.value = index;
      showModal.value = true;
      // store.commit('representatives/resetRepresentative');
    };

    const createAndSaveRepresentative = async (representative: Representative) => {
      await Provider.store.dispatch(`representatives/create`, representative);
      const patientRepresentative = patient.value.addRepresentative(representative);
      await store.dispatch('patientsRepresentatives/create', patientRepresentative);
      // if (!creatingIndex.value) {
      //   add();
      // }
      // const i = creatingIndex.value ? creatingIndex.value : representativeToPatient.value.length - 1;
      // console.log(i);
      // selectRepresentative(lastInsertedId.value, i);
      showModal.value = false;
    };

    const remove = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, patient.value.patientsRepresentatives, []);
      await store.dispatch('patientsRepresentatives/remove', id);
    };

    const selectRepresentativeType = async (patientRepresentative: PatientRepresentative): Promise<void> => {
      await Provider.store.dispatch('patientsRepresentatives/update', patientRepresentative);
    };

    return {
      selectRepresentativeType,
      remove,
      createAndSaveRepresentative,
      showModal,
      patient,
      // saveAndAddRepresentative,
      // representativeModal,
      openRepresentativeModal,
      addRepresentative,
      mount,
      rules,
      representativeTypes,
      // representativeToPatient,
      // remove,
      // add,
      getRepresentativeTypeLabel,
      // isEditMode,
    };
  },
});
</script>
