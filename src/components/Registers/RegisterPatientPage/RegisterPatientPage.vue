<template>
  <div v-if="mount" class="patient-page-container">
    <el-row>
      <el-collapse v-model="activeCollapseName" class="collapse" accordion @change="collapseChangeHandler">
        <el-form ref="form" label-position="top" :status-icon="true" :model="patient">
          <el-collapse-item name="info">
            <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
            <el-divider></el-divider>
            <HumanForm :readonly="true" store-name="patients" />
          </el-collapse-item>
          <el-collapse-item
            v-for="(registerGroup, i) in register.registerGroups"
            :id="`collapse-${i}`"
            :key="registerGroup"
            :name="String(i)"
          >
            <template #title>
              <h2 class="collapseHeader">{{ registerGroup.name }}</h2>
            </template>
            <el-divider> </el-divider>
            <el-tabs
              v-if="registerGroup.withDates"
              v-model="selectedTab"
              type="card"
              editable
              addable
              @tab-remove="removeTab"
              @tab-add="addTab(registerGroup.id)"
            >
              <el-tab-pane
                v-for="registerGroupToPatient in patient.getRegisterGroupsToPatientByGroupId(registerGroup.id)"
                :key="registerGroupToPatient.id"
                :label="registerGroupToPatient.id + '1'"
                :name="registerGroupToPatient.id"
              >
                <template #label>
                  <span v-if="registerGroupToPatient.editMode">
                    <el-button
                      class="table-button"
                      data-test="tableButtonGroupEditButton"
                      :icon="Document"
                      @click="registerGroupToPatient.editMode = false"
                    />
                    <el-date-picker v-model="registerGroupToPatient.date"></el-date-picker>
                  </span>
                  <span v-else>
                    <span>
                      <el-button
                        class="table-button"
                        :icon="Edit"
                        data-test="tableButtonGroupEditButton"
                        @click="registerGroupToPatient.editMode = true"
                      />
                      {{ $dateTimeFormatter.format(registerGroupToPatient.date) }}
                    </span>
                  </span>
                </template>
                <div v-for="(prop, j) in registerGroup.registerProperties" :key="j" class="register-property-block">
                  <PropertyHeader :prop="prop" :index="j" />
                  <StringProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <TextProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <NumberProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <DataComponentComputed :property="prop" :register-group-to-patient="registerGroupToPatient" />
                  <SetProp
                    v-model="prop.setFilterString"
                    :prop="prop"
                    :register-group-to-patient="registerGroupToPatient"
                    :register-group="registerGroup"
                  />
                  <RadioProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                </div>
              </el-tab-pane>
            </el-tabs>
            <template v-else>
              <template
                v-for="registerGroupToPatient in patient.getRegisterGroupsToPatientByGroupId(registerGroup.id)"
                :key="registerGroupToPatient.id"
                :label="registerGroupToPatient.id + '1'"
                :name="registerGroupToPatient.id"
              >
                <div v-for="(prop, j) in registerGroup.registerProperties" :key="j" class="register-property-block">
                  <PropertyHeader :prop="prop" :index="j" />
                  <StringProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <TextProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <NumberProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                  <DataComponentComputed :property="prop" :register-group-to-patient="registerGroupToPatient" />
                  <SetProp
                    v-model="prop.setFilterString"
                    :prop="prop"
                    :register-group-to-patient="registerGroupToPatient"
                    :register-group="registerGroup"
                  />
                  <RadioProp :prop="prop" :register-group-to-patient="registerGroupToPatient" :register-group="registerGroup" />
                </div>
              </template>
            </template>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Document, Edit } from '@element-plus/icons-vue';
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import MainHeader from '@/classes/shared/MainHeader';
import HumanForm from '@/components/HumanForm.vue';
import DataComponentComputed from '@/components/Registers/DataComponentComputed.vue';
import NumberProp from '@/components/Registers/RegisterPatientPage/NumberProp.vue';
import PropertyHeader from '@/components/Registers/RegisterPatientPage/PropertyHeader.vue';
import RadioProp from '@/components/Registers/RegisterPatientPage/RadioProp.vue';
import SetProp from '@/components/Registers/RegisterPatientPage/SetProp.vue';
import StringProp from '@/components/Registers/RegisterPatientPage/StringProp.vue';
import TextProp from '@/components/Registers/RegisterPatientPage/TextProp.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPatientPage',
  components: {
    HumanForm,
    DataComponentComputed,
    StringProp,
    TextProp,
    NumberProp,
    SetProp,
    RadioProp,
    PropertyHeader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const selectedTab = ref('');
    const register: Ref<IRegister> = computed(() => store.getters['registers/item']);
    const patient: Ref<IPatient> = computed(() => store.getters['patients/patient']);
    const activeCollapseName: Ref<string> = ref('');

    const form = ref();
    const isEditMode: Ref<boolean> = ref(true);
    const mount: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      const query = store.getters['filter/filterQuery'];
      query.id = route.params.registerId;
      await store.dispatch('registers/get', query);
      await store.dispatch('patients/get', route.params.patientId);
      pushToLinks(['/register-link-list/', `/registers/patients/${route.params.registerId}`], ['Регистры пациентов', register.value.name]);
      store.commit('main/setMainHeader', new MainHeader({ title: patient.value.human.getFullName(), links, save: submitForm }));

      mount.value = true;
      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(register, formUpdated, { deep: true });
      watch(patient, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) {
        return;
      }
      patient.value.representativeToPatient = [];
      await submitHandling('patients', patient.value, next, `registers/patients/${route.params.registerId}`);
    };

    const scroll = (groupIndex: number) => {
      const obj = document.getElementById(`collapse-${groupIndex}`);
      if (!obj) return;
      // setTimeout(() => {
      //   obj.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      // }, 500);
    };

    const collapseChangeHandler = (groupIndex: number) => {
      const group = register.value.registerGroups[groupIndex];
      if (!group || !group.id) {
        return;
      }
      if (group.withDates) {
        const selectedGroup = patient.value.registerGroupsToPatient.filter((r: IRegisterGroupToPatient) => r.registerGroupId === group.id);
        if (selectedGroup[0]) {
          selectTab(selectedGroup[0].id);
        }
      } else {
        patient.value.initRegisterGroupsToPatient(group.id);
      }
      scroll(groupIndex);
    };

    const selectTab = (tabId: string | undefined) => {
      if (tabId) {
        selectedTab.value = tabId;
      } else {
        selectedTab.value = '';
      }
    };

    const addTab = (registerGroupId: string) => {
      patient.value.addRegisterGroupToPatient(registerGroupId);
      const sel = patient.value.registerGroupsToPatient[patient.value.registerGroupsToPatient.length - 1].id;
      selectTab(sel);
    };

    const removeTab = (name: string) => {
      console.log(name);
      const group = patient.value.registerGroupsToPatient.find((r: IRegisterGroupToPatient) => r.id === name);
      if (group && group.registerGroupId) {
        const selectedGroup = patient.value.registerGroupsToPatient.filter(
          (r: IRegisterGroupToPatient) => r.registerGroupId === group.registerGroupId
        );
        if (selectedGroup[0]) {
          selectTab(selectedGroup[0].id);
        }
      }
      patient.value.removeRegisterGroupToPatient(name);
    };

    return {
      removeTab,
      addTab,
      selectedTab,
      collapseChangeHandler,
      form,
      patient,
      register,
      isEditMode,
      links,
      mount,
      submitForm,
      activeCollapseName,
      Edit,
      Document,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.register-property-block {
  background-color: #eef1f6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  h3 {
    margin-top: 0;
  }
}
.el-form-item {
  margin: 0;
}
.el-divider {
  margin: 10px 0;
}
</style>
