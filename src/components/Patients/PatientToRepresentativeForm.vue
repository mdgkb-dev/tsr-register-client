<template>
  <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="add">Добавить представителя</el-button>
  <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="openRepresentativeModal">Создать представителя</el-button>

  <el-table v-if="mount" :data="representativeToPatient" style="width: 800px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Выбрать представителя" sortable align="start">
      <template #default="scope">
        <el-form-item
          v-if="isEditMode"
          label-width="0"
          style="margin: 0"
          :rules="rules.representativeId"
          :prop="`representativeToPatient.${scope.$index}.representativeId`"
        >
          <el-select
            :model-value="representativeToPatient[scope.$index].representativeId"
            filterable
            placeholder="Представитель"
            @change="selectRepresentative($event, scope.$index)"
          >
            <el-option v-for="item in representativeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>
        <!--        <span v-else>-->
        <!--          {{ scope.row.representative.human.getFullName() }}-->
        <!--        </span>-->
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="start" width="200">
      <template #default="scope">
        <el-form-item
          v-if="isEditMode && representativeToPatient[scope.$index].representativeId"
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
        <el-button v-else-if="isEditMode" @click="openRepresentativeModal(scope.$index)">Создать</el-button>
        <span v-else>{{ getRepresentativeTypeLabel(scope.row.representativeType, scope.$index) }}</span>
      </template>
    </el-table-column>

    <el-table-column label="Телефон" align="start">
      <template v-if="representativeToPatient" #default="scope">
        <div v-if="representativeToPatient[scope.$index].representative && representativeToPatient[scope.$index].representativeId">
          {{ representativeToPatient[scope.$index].representative.human.contact.phone }}
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Email" align="start">
      <template v-if="representativeToPatient" #default="scope">
        <div v-if="representativeToPatient[scope.$index].representative && representativeToPatient[scope.$index].representativeId">
          {{ representativeToPatient[scope.$index].representative.human.contact.email }}
        </div>
      </template>
    </el-table-column>

    <el-table-column v-if="isEditMode" width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup
          :show-edit-button="
            !!representativeToPatient[scope.$index].representative && !!representativeToPatient[scope.$index].representative
          "
          :show-remove-button="true"
          @remove="remove(scope.row)"
          @edit="$router.push(`/representatives/${representativeToPatient[scope.$index].representativeId}`)"
        />
      </template>
    </el-table-column>
  </el-table>
  <RepresentativeModal :show="representativeModal" @close="representativeModal = false" @save="saveAndAddRepresentative" />
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import RepresentativeToPatientRules from '@/classes/representatives/RepresentativeToPatientRules';
import RepresentativeModal from '@/components/Patients/RepresentativeModal.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import IOptionHuman from '@/interfaces/shared/IOptionHuman';

export default defineComponent({
  name: 'PatientToRepresentativeForm',
  components: {
    TableButtonGroup,
    RepresentativeModal,
  },
  setup() {
    const store = useStore();

    const mount = ref(false);
    const rules = RepresentativeToPatientRules;
    const representativeModal: Ref<boolean> = ref(false);
    const representativeOptions: Ref<IOptionHuman[]> = ref([]);
    const representatives: ComputedRef<IRepresentative[]> = computed(() => store.getters['representatives/representatives']);
    const lastInsertedId: ComputedRef<string> = computed(() => store.getters['representatives/lastInsertedId']);
    const representative: ComputedRef<IRepresentative> = computed(() => store.getters['representatives/representative']);
    const creatingIndex: Ref<number | undefined> = ref(undefined);
    const representativeTypes: ComputedRef<IRepresentativeType[]> = computed(
      () => store.getters['representativeTypes/representativeTypes']
    );
    const representativeToPatient: ComputedRef<IRepresentativeToPatient[]> = computed(
      () => store.getters['patients/representativeToPatient']
    );
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

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

    const selectRepresentative = async (representativeId: string, indexOfRepresentative: number) => {
      if (representativeToPatient.value.some((rtp: IRepresentativeToPatient) => rtp.representativeId === representativeId)) {
        ElMessage({
          type: 'warning',
          message: 'Выбранный представитель уже добавлен',
        });
        return;
      }
      await store.dispatch('representatives/get', representativeId);
      representativeToPatient.value[indexOfRepresentative].representative = representative.value;
      representativeToPatient.value[indexOfRepresentative].representativeId = representative.value.id;
    };

    const openRepresentativeModal = (index: number) => {
      creatingIndex.value = index;
      representativeModal.value = true;
      store.commit('representatives/resetRepresentative');
    };

    const saveAndAddRepresentative = () => {
      if (!creatingIndex.value) {
        add();
      }
      updateOptions();
      const i = creatingIndex.value ? creatingIndex.value : representativeToPatient.value.length - 1;
      selectRepresentative(lastInsertedId.value, i);
      representativeModal.value = false;
    };

    return {
      saveAndAddRepresentative,
      representativeModal,
      openRepresentativeModal,
      selectRepresentative,
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
