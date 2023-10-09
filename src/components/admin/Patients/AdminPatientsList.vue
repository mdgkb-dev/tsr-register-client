<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <AdminPatientsListFilters @load="loadPatients" />

    <div class="scroll-block">
      <div class="patient-count">Количество пациентов: {{ count }}</div>
      <div v-for="patient in patients" :key="patient.id">
        <CollapseItem :is-collaps="false" padding="0 8px">
          <template #inside-title>
            <div class="flex-block" @click.prevent="() => undefined">
              <div class="item-flex">
                <div class="line-item-left">
                  <Button button-class="edit-button" color="#006bb4" icon="edit" icon-class="edit-icon" @click="edit(patient.id)" />
                  <FioToggleForm :human="patient.human" />
                </div>

                <div class="line-item-right">
                  <Button button-class="gender-button" :text="patient.human.getGender()" @click="updateIsMale(patient.human)" />
                  <InfoItem title="дата рождения" margin="0" :with-open-window="false" :with-hover="editMode">
                    <DateInput v-model:model-value="patient.human.dateBirth" placeholder="Выбрать" @change="updateHuman(patient.human)" />
                  </InfoItem>
                </div>
              </div>
              <div class="item-flex">
                <GridContainer max-width="1920px" custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))" margin="0">
                  <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))" margin="0px">
                    <ToggleDocumentsForm :human="patient.human" />
                  </GridContainer>

                  <AdminPatientsListRepresentatives :patient="patient" :edit-mode="editMode" />
                  <AdminPatientsListMkb :patient="patient" :edit-mode="editMode" />
                  <InfoItem title="создан" margin="0" :with-open-window="false" :with-hover="editMode">
                    {{ patient.getLastMeta() }}
                  </InfoItem>
                </GridContainer>
              </div>
            </div>
          </template>
        </CollapseItem>
      </div>
    </div>
  </AdminListWrapper>
  <ModalWindow :show="showAddModal" title="Добавить пациента" @close="showAddModal = false">
    <CreatePatientForm @add="showAddModal = false" />
  </ModalWindow>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import Patient from '@/classes/Patient';
import FioToggleForm from '@/components/admin/FioToggleForm.vue';
import AdminPatientsListFilters from '@/components/admin/Patients/AdminPatientsListFilters.vue';
import AdminPatientsListMkb from '@/components/admin/Patients/AdminPatientsListMkb.vue';
import AdminPatientsListRepresentatives from '@/components/admin/Patients/AdminPatientsListRepresentatives.vue';
import CreatePatientForm from '@/components/admin/Patients/CreatePatientForm.vue';
import ToggleDocumentsForm from '@/components/admin/ToggleDocumentsForm.vue';
import Button from '@/components/Base/Button.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import ModalWindow from '@/components/Base/ModalWindow.vue';
import PatientsSortsLib from '@/libs/sorts/PatientsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import DateInput from '@/services/components/DateInput.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminPatientsList',
  components: {
    CreatePatientForm,
    AdminPatientsListFilters,
    AdminListWrapper,
    CollapseItem,
    Button,
    FioToggleForm,
    InfoItem,
    GridContainer,
    AdminPatientsListRepresentatives,
    AdminPatientsListMkb,
    DateInput,
    ToggleDocumentsForm,
    ModalWindow,
  },
  setup() {
    const showAddModal: Ref<boolean> = ref(false);
    const patients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/items']);
    const count: Ref<number> = computed(() => Provider.store.getters['patients/count']);

    // const filteredPatients: Ref<Patient[]> = computed(() => Provider.store.getters['patients/filteredPatients']);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const editMode: Ref<boolean> = ref(true);
    const authModalVisible = computed(() => Provider.store.getters['auth/authModalVisible']);
    const loadPatients = async () => {
      await Provider.loadItems();
    };

    const loadQuestions = async () => {
      // await Provider.store.dispatch('questions/getAll');
    };

    const load = async () => {
      await Promise.all([loadPatients(), loadQuestions()]);
    };

    const addPatient = async (): Promise<void> => {
      showAddModal.value = !showAddModal.value;
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Пациенты',
        buttons: [
          { text: 'Добавить', type: 'normal-button', action: addPatient },
          // {
          //   text: computed(() => (editMode.value ? 'Просмотр' : 'Редактирование')),
          //   action: () => (editMode.value = !editMode.value),
          //   type: 'normal-button',
          // },
        ],
      },
      sortsLib: PatientsSortsLib,
      getAction: 'getAll',
    });

    const updateHuman = async (human: Human): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('humans/update', human);
      });
    };

    const updateIsMale = async (human: Human): Promise<void> => {
      human.isMale = !human.isMale;
      await updateHuman(human);
    };

    return {
      showAddModal,
      updateIsMale,
      updateHuman,
      count,
      filterByStatus,
      authModalVisible,
      loadPatients,
      patients,
      ...Provider.getAdminLib(),
      editMode,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.button {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  font-size: 12px;

  &-filter {
    background: #ffffff;
  }

  &-download {
    background: #dff2f8;
  }
}

:deep(.button-register) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

:deep(.name-item) {
  margin: 0;
  width: auto;
  border-color: #ffffff;
  padding: 0;
}

.grid {
  max-width: initial;
  grid-gap: 10px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(99px, 1fr));
}

.plus-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
}

.save-picker-button {
  width: 100%;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

.gender-button {
  width: 42px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 18px;
}

.save-button {
  width: 100%;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 2px 10px 0 0;
  font-size: 14px;
}

:deep(.edit-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin-right: 10px;
}

:deep(.files-buttons) {
  width: auto;
  height: 34px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  font-size: 12px;

  &:hover {
    background: #dff2f8;
  }
}

.edv {
  font-size: 14px;
  padding: 0;
  margin: 0 5px 0 0;

  &-active {
    color: #b0a4c0;
  }
}

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 150px;
  width: 100%;
  padding: 0;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}

.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 10px;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  min-width: 210px;
  padding: 0;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-filter {
  width: 24px;
  height: 24px;
  cursor: pointer;
  stroke: #006bb4;
  fill: none;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0 10px 0;
  }
}
</style>
