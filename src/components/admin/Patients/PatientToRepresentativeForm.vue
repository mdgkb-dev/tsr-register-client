<template>
  <RemoteSearch
    :must-be-translated="true"
    key-value="representative"
    placeholder="Начните вводить название диагноза"
    @select="addRepresentative"
  />
  <!--  <el-button style="margin-bottom: 20px" @click="openRepresentativeModal()">Создать представителя</el-button>-->
  <el-table
    v-if="mount"
    :data="patient.representativeToPatient"
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
        <el-form-item
          label-width="0"
          style="margin: 0"
          :rules="rules.representativeTypeId"
          :prop="`representativeToPatient.${scope.$index}.representativeTypeId`"
        >
          <el-select v-model="scope.row.representativeTypeId" placeholder="Роль представителя" :disabled="!scope.row.representativeId">
            <el-option
              v-for="item in representativeTypes"
              :key="item.id"
              :label="getRepresentativeTypeLabel(item, scope.$index)"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!--        <el-button v-else-if="isEditMode" @click="openRepresentativeModal(scope.$index)">Создать</el-button>-->
        <!--        <span v-else>{{ getRepresentativeTypeLabel(scope.row.representativeType, scope.$index) }}</span>-->
      </template>
    </el-table-column>

    <el-table-column label="Телефон" align="start">
      <template #default="scope" v>
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

    <el-table-column width="50" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          @remove="
            $classHelper.RemoveFromClassByIndex(scope.$index, patient.representativeToPatient, patient.representativeToPatientForDelete)
          "
        />
      </template>
    </el-table-column>
  </el-table>
  <RepresentativeModal :show="representativeModal" @close="representativeModal = false" @save="saveAndAddRepresentative" />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import Patient from '@/classes/Patient';
import Representative from '@/classes/Representative';
import RepresentativeToPatientRules from '@/classes/RepresentativeToPatientRules';
import RepresentativeType from '@/classes/RepresentativeType';
import RepresentativeModal from '@/components/admin/Patients/RepresentativeModal.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import IOptionHuman from '@/interfaces/shared/IOptionHuman';

export default defineComponent({
  name: 'PatientToRepresentativeForm',
  components: {
    TableButtonGroup,
    RepresentativeModal,
    RemoteSearch,
  },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const representativeModal: Ref<boolean> = ref(false);
    const representativeOptions: Ref<IOptionHuman[]> = ref([]);
    const representatives: ComputedRef<Representative[]> = computed(() => store.getters['representatives/items']);
    const lastInsertedId: ComputedRef<string> = computed(() => store.getters['representatives/lastInsertedId']);
    const representative: ComputedRef<Representative> = computed(() => store.getters['representatives/item']);
    const creatingIndex: Ref<number | undefined> = ref(undefined);
    const representativeTypes: ComputedRef<RepresentativeType[]> = computed(() => store.getters['representativeTypes/items']);

    // const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    const updateOptions = () => {
      representativeOptions.value = [];
      if (representatives.value) {
        for (const item of representatives.value) {
          if (item.id) {
            representativeOptions.value.push({
              label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
              value: item.id,
              human: item.human,
            });
          }
        }
      }
    };

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      await store.dispatch('representatives/getAll');
      updateOptions();

      mount.value = true;
    });

    const getRepresentativeTypeLabel = (item: RepresentativeType, index: number): string => {
      // if (!representatives.value) {
      //   return '';
      // }
      const representative = representatives.value.find((i: Representative) => {
        return i.id === props.patient.representativeToPatient[index].representativeId;
      });
      if (representative?.human.isMale) {
        return item.parentMaleType;
      } else {
        return item.parentWomanType;
      }
    };

    const addRepresentative = async (event: ISearchObject) => {
      if (props.patient.representativeExists(event.value)) {
        ElMessage({
          type: 'warning',
          message: 'Выбранный представитель уже добавлен',
        });
        return;
      }
      await store.dispatch('representatives/get', event.value);
      props.patient.addRepresentative(representative.value);
    };
    //
    const openRepresentativeModal = (index: number) => {
      creatingIndex.value = index;
      representativeModal.value = true;
      // store.commit('representatives/resetRepresentative');
    };

    // const saveAndAddRepresentative = () => {
    //   if (!creatingIndex.value) {
    //     add();
    //   }
    //   updateOptions();
    //   const i = creatingIndex.value ? creatingIndex.value : representativeToPatient.value.length - 1;
    //   console.log(i);
    //   selectRepresentative(lastInsertedId.value, i);
    //   representativeModal.value = false;
    // };

    return {
      // saveAndAddRepresentative,
      // representativeModal,
      openRepresentativeModal,
      addRepresentative,
      mount,
      rules,
      representativeTypes,
      representativeOptions,
      // representativeToPatient,
      // remove,
      // add,
      getRepresentativeTypeLabel,
      // isEditMode,
    };
  },
});
</script>
