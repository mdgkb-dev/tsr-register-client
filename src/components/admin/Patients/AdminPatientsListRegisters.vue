<template>
  <InfoItem title="регистры" margin="0 0 0 0px" close-window-overflow="hidden" open-width="100%" :with-hover="editMode" :with-open-window="editMode">
    <div v-for="(patientRegister, i) in patient.patientsRegisters" :key="patientRegister.id">
      <StringItem :string="patientRegister.register.getTagName() + (i === patient.patientsRegisters.length - 1 ? '' : ',&nbsp')" font-size="14px" />
    </div>

    <template #open-inside-content>
      <GridContainer custom-class="grid">
        <Button
          v-for="register in registers"
          :key="register.id"
          :text="register.name"
          button-class="button-register"
          background-hover="#DFF2F8"
          :is-toggle="patient.inRegister(register.id) ? true : false"
          :toggle-mode="true"
          @click="toggleRegister(register, patient)"
        />
      </GridContainer>
    </template>
  </InfoItem>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';

import Patient from '@/classes/Patient';
import PatientRegister from '@/classes/PatientRegister';
import Register from '@/classes/Register';
import User from '@/classes/User';
import Button from '@/services/components/Button.vue';
import ClassHelper from '@/services/ClassHelper';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminPatientsListRegisters',
  components: {
    StringItem,
    InfoItem,
    GridContainer,
    Button,
  },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
    editMode: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup() {
    const registers: Ref<Register[]> = computed(() => Provider.store.getters['registers/items']);
    const user: Ref<User> = computed(() => Provider.store.getters['auth/user']);
    const toggleRegister = async (register: Register, patient: Patient): Promise<void> => {
      let patientRegister = patient.patientsRegisters.find((pr: PatientRegister) => pr.registerId === register.id);
      if (patientRegister) {
        ClassHelper.RemoveFromClassById(patientRegister.id, patient.patientsRegisters, []);
        return await Provider.store.dispatch('patientsRegisters/remove', patientRegister.id);
      }
      patientRegister = patient.addRegister(register, user.value);
      return await Provider.store.dispatch('patientsRegisters/create', patientRegister);
    };

    return {
      registers,
      toggleRegister,
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
  min-width: none;
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
  max-width: auto;
  grid-gap: 7px;
  margin: 0;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
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
  width: auto;
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
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
    margin: 0 0px 10px 0;
  }
}
</style>
