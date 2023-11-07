<template>
  <RightTabsContainer v-if="mounted" :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div v-for="registerItem in registers" :key="registerItem.id" class="slider-item" @click="addRegister(registerItem.id)">
          {{ registerItem.name }}
        </div>
      </div>
    </template>
    <template #tabs>
      <div
        v-for="patientRegisterItem in patient.patientsRegisters"
        :key="patientRegisterItem.id"
        :class="{ 'tabs-item-active': patientRegisterItem.registerId === patientRegister.registerId, 'tabs-item': patientRegisterItem.registerId !== patientRegister.registerId }"
        @click="selectPatientRegister(patientRegisterItem.id)"
      >
        <div class="tab-item-text">
          {{ patientRegisterItem.register.name }}
        </div>
      </div>
    </template>
    <template #body>
      <div class="body">
        <ResearcheContainer background="#DFF2F8">
          <template #header>
            <div class="patientRegister">
              <div class="patientRegister-info">Пациент включен в регистр пользователем</div>
              <div class="patientRegister-user">{{ patientRegister.user.email }}</div>
            </div>
          </template>
        </ResearcheContainer>
      </div>
    </template>
  </RightTabsContainer>
  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol id="back" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
      <path
        d="M7.33333 7.8C13.901 7.20467 18.1253 9.738 20 15.4C16.4217 11.4227 11.9681 10.6905 7.33333 12.8667V16.6667L1 10.3333L7.33333 4V7.8Z"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Patient from '@/classes/Patient';
import PatientRegister from '@/classes/PatientRegister';
import Register from '@/classes/Register';
import User from '@/classes/User';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PatientResearches',
  components: {
    RightTabsContainer,
    ResearcheContainer,
  },
  setup() {
    const mounted = ref(false);
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const register: Ref<Register> = computed(() => Provider.store.getters['registers/item']);
    const patientRegister: Ref<PatientRegister> = computed(() => Provider.store.getters['patientsRegisters/item']);
    const isToggle: Ref<boolean> = ref(false);

    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);
    const addRegister = async (id: string) => {
      if (patient.value.hasRegister(id)) {
        return ElMessage.warning('Пациент уже включен в этот регистр');
      }
      await Provider.store.dispatch('registers/get', id);
      const patientRegister = patient.value.addRegister(register.value, user.value);
      await Provider.store.dispatch('patientsRegisters/create', patientRegister);
      await toggle(false);
    };

    const selectPatientRegister = async (id: string): Promise<void> => {
      if (id === patientRegister.value.id) {
        return;
      }
      await Provider.store.dispatch('patientsRegisters/get', id);
    };
    onBeforeMount(async () => {
      if (patient.value.patientsRegisters[0]) {
        await selectPatientRegister(patient.value.patientsRegisters[0].id as string);
      }
      mounted.value = true;
    });

    const toggle = async (toggle: boolean) => {
      if (toggle) {
        await Provider.store.dispatch('registers/getAll');
      }
      isToggle.value = toggle;
    };

    return {
      patientRegister,
      selectPatientRegister,
      addRegister,
      isToggle,
      toggle,
      registers,
      register,
      mounted,
      patient,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

.slider-body {
  width: 180px;
  height: auto;
  border: 1px solid #379fff;
  border-top-left-radius: $normal-border-radius;
  border-bottom-left-radius: $normal-border-radius;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  display: grid;
  grid-gap: 6px;
  grid-template-rows: repeat(0 0px);
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 6px;
}

.slider-body > div {
  object-fit: cover;
}

.slider-item-search {
  width: 164px;
  height: 40px;
  border-radius: $normal-border-radius;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item {
  width: 163px;
  height: 40px;
  border: 1px solid #b0a4c0;
  border-radius: $normal-border-radius;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:hover {
  border: 1px solid #379fff;
  background: $base-background;
  color: #379fff;
}

.slider-item-active {
  width: 163px;
  height: 40px;
  border: 1px solid #379fff;
  border-radius: $normal-border-radius;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.slider-item:active {
  border: 1px solid #379fff;
  background: $custom-background;
  color: #343e5c;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
  cursor: pointer;
}

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: none;
  background: $custom-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  font-weight: bold;
  color: #343e5c;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 0;
  margin-top: 5px;
  z-index: 2;
  cursor: default;
}

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
}

.researche-title {
  width: calc(100% - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.researche-name {
  min-height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #343e5c;
  font-size: 14px;
  text-transform: uppercase;
}

.icon-back {
  width: 24px;
  height: 24px;
}

.patient-research {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: calc(100% - 32px);
  height: 40px;
  border-radius: $normal-border-radius;
  border: $light-pink-border;
  background: #ffffff;
  padding: 0 10px;
  margin: 10px 10px 10px 0;
  cursor: pointer;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000;
  opacity: 0.3;
  z-index: 20;
}

.research-info {
  position: fixed;
  top: 46%;
  left: 50%;
  width: calc(99% - 22px);
  height: calc(92% - 22px);
  transform: translate(-50%, -50%);
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  margin: 10px 10px 0 0;
  padding: 10px 10px 10px 10px;
  overflow: hidden;
  overflow-y: auto;
  z-index: 21;
}

.tools {
  display: flex;
  justify-content: left;
  align-items: center;
  height: auto;
  padding: 10px 0;
  width: calc(100% - 2px);
  background: #dff2f8;
}

.scroll-block {
  width: 100%;
  height: calc(100% - 220px);
  overflow: hidden;
  overflow-y: auto;
}

.question-item {
  background: #dff2f8;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  margin-bottom: 10px;
  background: #ffffff;
}

.question-name {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 22px;
  color: #343e5c;
  margin-bottom: 10px;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

.patient-name {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  height: 40px;
  color: #343e5c;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.researche-title-name {
  font-size: 20px;
  display: block;
  color: #343e5c;
  padding: 10px 0;
}

.researche-counter {
  font-size: 20px;
  color: #379fff;
  display: flex;
  justify-content: right;
  align-items: flex-start;
  text-transform: uppercase;
  white-space: nowrap;
  height: 100%;
}

.patientRegister {
  min-height: 100px;
  max-width: 768px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  border-color: #00b5a4;

  background: #c7ecea;
}

.patientRegister-info {
  color: #00b5a4;
  font-size: 20px;
  text-transform: uppercase;
}

.patientRegister-user {
  margin-left: 10px;
  color: #379fff;
  font-size: 20px;
  // text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  .tabs-item {
    width: 40px;
    height: 100px;
  }

  .tabs-item:hover {
    width: 44px;
  }

  .tabs-item-active {
    position: relative;
    width: 45px;
    height: 100px;
  }

  .tabs-item-active:hover {
    width: 45px;
  }

  .tab-item-text {
    transform: rotate(90deg);
  }
}
</style>
