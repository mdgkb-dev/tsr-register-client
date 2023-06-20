<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <div class="filter-block">
      <GridContainer max-width="900px" grid-gap="27px 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
        <template #grid-items>
          <InfoItem
            margin="0"
            :with-open-window="false"
            :with-icon="false"
            height="76px"
            background="#F5F5F5"
            border-color="#C4C4C4"
            padding="7px"
            :with-hover="false"
          >
            <template #title>
              <StringItem string="поиск и сортировка" font-size="10px" padding="0" />
            </template>
            <template #close-inside-content>
              <div :style="{ width: '100%' }">
                <RemoteSearch
                  :must-be-translated="true"
                  :key-value="schema.patient.key"
                  placeholder="Начните вводить ФИО"
                  max-width="100%"
                  @select="selectSearch"
                />
                <!--                <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="loadPatients" />-->
              </div>
            </template>
          </InfoItem>
        </template>
      </GridContainer>
    </div>
    <div class="scroll-block">
      <div class="patient-count">Количество комиссий: {{ count }}</div>
      <CollapseContainer>
        <template #default="scope">
          <CollapseItem
            v-for="(commission, i) in commissions"
            :key="commission.id"
            :tab-id="i + 1"
            :active-id="scope.activeId"
            padding="0 8px"
            @changeActiveId="scope.changeActiveId"
          >
            <template #inside-title>
              <div class="flex-block" @click.prevent="() => undefined">
                <div class="item-flex">
                  <div class="line-item-left">
                    <Button
                      :with-icon="true"
                      width="40px"
                      height="40px"
                      border-radius="5px"
                      color="#006BB4"
                      background="#DFF2F8"
                      background-hover="#DFF2F8"
                      :color-swap="false"
                      @click.prevent="edit(patient.id)"
                    >
                      <template #icon>
                        <svg class="icon-edit">
                          <use xlink:href="#edit"></use>
                        </svg>
                      </template>
                    </Button>
                    <StringItem :string="`№${commission.number}`" color="#006BB4" font-size="17px" min-width="240px" width="100%" />
                    <GridContainer
                      max-width="auto"
                      grid-gap="10px"
                      grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))"
                      margin="0px"
                    >
                      <template #grid-items>
                        <InfoItem title="дата комиссии" margin="0" open-height="auto" :with-open-window="false">
                          <template #close-inside-content>
                            <SmallDatePicker
                              v-model:model-value="commission.date"
                              placeholder="Выбрать"
                              width="100%"
                              height="34px"
                              @change="updateCommission(commission)"
                            />
                          </template>
                        </InfoItem>
                      </template>
                    </GridContainer>

                    <InfoItem
                      :close="infoItemToggle"
                      margin="0 0 0 10px"
                      open-height="auto"
                      width="auto"
                      border-color="#ffffff"
                      :with-icon="false"
                      :with-hover="false"
                      :with-open-window="editMode"
                    >
                      <template #close-inside-content>
                        <StringItem :string="commission.patient.human.getFullName()" custom-class="patient-name" />
                      </template>

                      <template #open-inside-content>
                        <GridContainer
                          max-width="auto"
                          grid-gap="10px"
                          grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))"
                          margin="0px"
                        >
                          <template #grid-items>
                            <div>{{ commission.patient.human.getFullName() }}</div>
                            <InfoItem
                              title="фамилия"
                              margin="0"
                              open-height="auto"
                              width="auto"
                              :with-icon="false"
                              :with-open-window="false"
                              :with-hover="false"
                              border-color="#ffffff"
                              padding="0"
                            >
                              <RemoteSearch
                                :must-be-translated="true"
                                key-value="patient"
                                placeholder="Введите имя пациента"
                                @click.stop="() => undefined"
                                @select="(e) => setPatient(e, commission)"
                              />
                            </InfoItem>
                          </template>
                        </GridContainer>
                      </template>
                    </InfoItem>
                  </div>
                </div>
              </div>
            </template>
            <template #inside-content>
              <div class="background-container">
                <div style="display: flex">
                  <div>
                    <CommissionDoctors :commission="commission" />
                  </div>
                  <div v-if="commission.patient.id">
                    <CommissionDrug :commission="commission" @select="updateCommission(commission)" />
                  </div>
                  <el-select
                    v-if="commission.patient.id"
                    v-model="commission.patientDiagnosisId"
                    @change="(e) => setPatientDiagnosis(e, commission)"
                  >
                    <el-option
                      v-for="patientDiagnosis in commission.patient.patientDiagnosis"
                      :key="patientDiagnosis.id"
                      :label="patientDiagnosis.mkbItem.getFullName()"
                      :value="patientDiagnosis"
                    />
                  </el-select>

                  {{ commission.canGetProtocol() }}
                  <div v-if="commission.canGetProtocol()">
                    <el-button @click="fillCommissionDownload(commission)">Сформировать протокол врачебной комиссии</el-button>
                  </div>
                </div>
              </div>
            </template>
          </CollapseItem>
        </template>
      </CollapseContainer>
    </div>
  </AdminListWrapper>
  <el-dialog :model-value="templatesOpened" title="Выбрать шаблон комиссии" :close-on-click-modal="false" :close-on-press-escape="false">
    <div v-for="template in commissionsTemplates" :key="template.id" @click="createCommission(template)">
      {{ template.name }}
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Patient from '@/classes/Patient';
import PatientDiagnosis from '@/classes/PatientDiagnosis';
import CommissionDoctors from '@/components/admin/Commissions/CommissionDoctors.vue';
import CommissionDrug from '@/components/admin/Commissions/CommissionDrug.vue';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import InfoItem from '@/components/admin/Patients/InfoItem.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import CollapseContainer from '@/components/Base/Collapse/CollapseContainer.vue';
import CollapseItem from '@/components/Base/Collapse/CollapseItem.vue';
import RemoteSearch from '@/components/RemoteSearch.vue';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import CommissionsSortsLib from '@/libs/sorts/CommissionsSortsLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

export default defineComponent({
  name: 'AdminCommissionsList',
  components: {
    CollapseContainer,
    RemoteSearch,
    AdminListWrapper,
    CollapseItem,
    Button,
    StringItem,
    InfoItem,
    GridContainer,
    SmallDatePicker,
    FiltersButtonsMultiply,
    CommissionDoctors,
    CommissionDrug,
  },
  setup() {
    const templatesOpened: Ref<boolean> = ref(false);
    const filterByStatus: Ref<FilterModel> = ref(new FilterModel());
    const commissions: Ref<Commission[]> = computed(() => Provider.store.getters['commissions/items']);
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const count: Ref<number> = computed(() => Provider.store.getters['commissions/count']);
    // const filteredcommissions: Ref<Patient[]> = computed(() => Provider.store.getters['commissions/filteredcommissions']);
    const commissionsTemplates: ComputedRef<CommissionTemplate[]> = computed(() => Provider.store.getters['commissionsTemplates/items']);

    const loadCommissions = async () => {
      await Provider.store.dispatch('commissionsStatuses/getAll');
      await Provider.loadItems();
    };

    const load = async () => {
      await loadCommissions();
    };

    const openCreateCommissionModal = async () => {
      await Provider.store.dispatch('commissionsTemplates/getAll');
      templatesOpened.value = true;
      await loadCommissions();
    };

    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: 'Врачебные комиссии',
        buttons: [{ text: 'Создать комиссию', type: 'normal-button', action: openCreateCommissionModal }],
      },
      sortsLib: CommissionsSortsLib,
      getAction: 'getAllWithCount',
    });

    const selectSearch = async (event: ISearchObject): Promise<void> => {
      await Provider.router.push(`/admin/commissions/${event.value}`);
    };

    const updateCommission = async (commission: Commission): Promise<void> => {
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('commissions/update', commission);
      });
    };

    const setPatient = async (event: ISearchObject, commission: Commission) => {
      await Provider.store.dispatch('patients/get', event.value);
      commission.setPatient(patient.value);
      await updateCommission(commission);
    };

    const createCommission = async (template: CommissionTemplate): Promise<void> => {
      const item = Commission.CreateFromTemplate(template);
      await Provider.store.dispatch('commissions/createAndSetNumber', item);
      Provider.store.commit('commissions/unshiftToAll', item);
      templatesOpened.value = false;
    };

    const fillCommissionDownload = async (commission: Commission): Promise<void> => {
      await Provider.store.dispatch('commissions/filledApplicationDownload', commission);
    };

    const setPatientDiagnosis = async (patientDiagnosis: PatientDiagnosis, commission: Commission): Promise<void> => {
      commission.setPatientDiagnosis(patientDiagnosis);
      await updateCommission(commission);
    };

    return {
      setPatientDiagnosis,
      fillCommissionDownload,
      createCommission,
      templatesOpened,
      commissionsTemplates,
      setPatient,
      filterByStatus,
      updateCommission,
      count,
      selectSearch,
      loadCommissions,
      commissions,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.patient-name {
  color: #006bb4;
  font-size: 17px;
  min-width: 240px;
  width: 100%;
  padding: 0px;
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

.icon-edit {
  width: 28px;
  height: 28px;
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
  width: auto;
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
}

.icon-plus {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-block {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: end;
  width: calc(100% - 20px);
  padding: 10px 10px 24px 10px;
  background: #f5f5f5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 10px;
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
    padding: 0px;
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
    margin: 0 0px 10px 0;
  }
}
</style>
