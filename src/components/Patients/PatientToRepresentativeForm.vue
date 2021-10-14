<template>
  <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="add">Добавить представителя</el-button>
  <el-table v-if="mount" :data="representativeToPatient" style="width: 600px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Представитель" sortable align="start">
      <template #default="scope">
        <el-form-item
          v-if="isEditMode"
          label-width="0"
          style="margin: 0"
          :rules="rules.representativeId"
          :prop="`representativeToPatient.${scope.$index}.representativeId`"
        >
          <el-select v-model="representativeToPatient[scope.$index].representativeId" filterable placeholder="Представитель">
            <el-option v-for="item in representativeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <span v-else>
          {{ scope.row.representative.human.getFullName() }}
        </span>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="start">
      <template #default="scope">
        <el-form-item
          v-if="isEditMode"
          label-width="0"
          style="margin: 0"
          :rules="rules.representativeTypeId"
          :prop="`representativeToPatient.${scope.$index}.representativeTypeId`"
        >
          <el-select
            v-model="representativeToPatient[scope.$index].representativeTypeId"
            placeholder="Роль представителя"
            :disabled="representativeToPatient[scope.$index].representativeId ? false : true"
          >
            <el-option
              v-for="item in representativeTypes"
              :key="item.id"
              :label="getRepresentativeTypeLabel(item, scope.$index)"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span v-else>{{ getRepresentativeTypeLabel(scope.row.representativeType, scope.$index) }}</span>
      </template>
    </el-table-column>

    <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import IOptionHuman from '@/interfaces/shared/IOptionHuman';

export default defineComponent({
  name: 'PatientToRepresentativeForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const representativeOptions: Ref<IOptionHuman[]> = ref([]);
    const representatives: ComputedRef<IRepresentative[]> = computed(() => store.getters['representatives/representatives']);
    const representativeTypes: ComputedRef<IRepresentativeType[]> = computed(
      () => store.getters['representativeTypes/representativeTypes']
    );
    const representativeToPatient: ComputedRef<IRepresentativeToPatient[]> = computed(
      () => store.getters['patients/representativeToPatient']
    );
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      await store.dispatch('representatives/getAll');

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
      mount.value = true;
    });

    const add = (): void => {
      store.commit('patients/addRepresentative');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('patients/removeRepresentative', item);
    };

    const getRepresentativeTypeLabel = (item: IRepresentativeType, index: number): string => {
      const representative = representatives.value.find((i: IRepresentative) => {
        return i.id === representativeToPatient.value[index].representativeId;
      });
      if (representative?.human.isMale) {
        return item.parentMaleType;
      } else {
        return item.parentWomanType;
      }
    };

    return {
      mount,
      rules,
      representativeTypes,
      representativeOptions,
      representativeToPatient,
      remove,
      add,
      getRepresentativeTypeLabel,
      isEditMode,
    };
  },
});
</script>
