<template>
  <el-button @click="add" style="margin-bottom: 20px">Добавить представителя</el-button>
  <el-table v-if="mount" :data="representativeToPatient" style="width: 950px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Представитель" width="250" sortable align="center">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeId">
          <el-option v-for="item in representativeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="center">
      <template #default="scope">
        <el-select
          v-model="representativeToPatient[scope.$index].representativeTypeId"
          :disabled="representativeToPatient[scope.$index].representativeId ? false : true"
        >
          <el-option
            v-for="item in getRepresentativeTypes(representativeToPatient[scope.$index].representativeId)"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import IOption from '@/interfaces/shared/IOption';

export default defineComponent({
  name: 'PatientToRepresentativeForm',
  components: {
    TableButtonGroup,
  },
  setup() {
    const store = useStore();

    const rules = RepresentativeToPatientRules;
    const representativeOptions = ref([{}]);
    const representatives: Ref<IRepresentative[]> = computed(() => store.getters['representatives/representatives']);
    const mount = ref(false);
    const representativeTypes: Ref<IRepresentativeType[]> = computed(() => store.getters['representativeTypes/representativeTypes']);
    const representativeToPatient: Ref<IRepresentativeToPatient[]> = computed(() => store.getters['patients/representativeToPatient']);

    onBeforeMount(async () => {
      await store.dispatch('representativeTypes/getAll');
      await store.dispatch('representatives/getAll');

      representativeOptions.value.splice(0, 1);
      for (const item of representatives.value) {
        representativeOptions.value.push({
          label: `${item.human.surname} ${item.human.name} ${item.human.patronymic}`,
          value: item.id,
          human: item.human,
        });
      }
      mount.value = true;
    });

    const add = (): void => {
      store.commit('patients/addRepresentative');
    };

    const remove = (item: IRepresentativeToPatient): void => {
      store.commit('patients/removeRepresentative', item);
    };

    const getRepresentativeTypes = (id: string): IRepresentativeType[] => {
      const representative = representatives.value.find((i: IRepresentative) => i.id === id);
      return representativeTypes.value.filter((i: IRepresentativeType) => i.isMale === representative?.human.isMale);
    };

    return {
      mount,
      rules,
      representativeTypes,
      representativeOptions,
      representativeToPatient,
      remove,
      add,
      getRepresentativeTypes,
    };
  },
});
</script>
