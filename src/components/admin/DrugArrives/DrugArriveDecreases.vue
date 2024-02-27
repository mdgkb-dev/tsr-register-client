<template>
  <div class="background-container">
    <div>Расходы</div>
    <el-button @click="addDrugDecrease(drugArrive)">Добавить расход лекарств</el-button>
    <div v-for="drugDecrease in drugArrive.drugDecreases" :key="drugDecrease.id">
      <hr />

      <div class="inblock">
        <svg class="icon-minus" @click.stop="updateDrugDecreaseQuantity(0, 1, drugArrive, drugDecrease)">
          <use xlink:href="#minus"></use>
        </svg>
        <div class="text">{{ drugDecrease.quantity }}</div>
        <svg class="icon-plus" @click.stop="updateDrugDecreaseQuantity(1, 0, drugArrive, drugDecrease)">
          <use xlink:href="#plus"></use>
        </svg>
      </div>

      <el-input v-model="drugDecrease.comment" @blur="updateDrugDecrease(drugDecrease)" />
      <el-date-picker v-model="drugDecrease.date" @change="updateDrugDecrease(drugDecrease)" />
      <RemoteSearch key-value="patient" placeholder="Введите имя пациента" @click.stop="() => undefined" @select="(e) => setPatientToDecrease(e, drugDecrease)" />
      <el-button @click="removeDrugDecrease(drugArrive, drugDecrease)" />
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, defineComponent, PropType, Ref } from 'vue';

import DrugArrive from '@/classes/DrugArrive';
import DrugDecrease from '@/classes/DrugDecrease';
import Patient from '@/classes/Patient';
import ISearchObject from '@/interfaces/ISearchObject';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DrugArriveDecreases',
  components: {
    RemoteSearch,
  },
  props: {
    drugArrive: {
      type: Object as PropType<DrugArrive>,
      required: true,
    },
  },
  setup() {
    const patient: Ref<Patient> = computed(() => Provider.store.getters['patients/item']);

    const createDrugArrive = async () => {
      const item = DrugArrive.Create();
      await Provider.store.dispatch('drugArrives/create', item);
      Provider.store.commit('drugArrives/unshiftToAll', item);
    };

    const addDrugDecrease = async (drugArrive: DrugArrive): Promise<void> => {
      const item = drugArrive.addDrugDecrease();
      await Provider.store.dispatch('drugDecreases/create', item);
    };

    const updateDrugDecrease = async (item: DrugDecrease): Promise<void> => {
      await Provider.store.dispatch('drugDecreases/update', item);
    };

    const updateDrugArrive = async (item: DrugArrive): Promise<void> => {
      await Provider.store.dispatch('drugArrives/update', item);
    };

    const removeDrugDecrease = async (drugArrive: DrugArrive, item: DrugDecrease): Promise<void> => {
      // ClassHelper.RemoveFromClassById(item.id, drugArrive.drugDecreases, []);
      await Provider.store.dispatch('drugDecreases/remove', item.id);
    };

    const updateDrugDecreaseQuantity = async (cur: number, prev: number, drugArrive: DrugArrive, drugDecrease: DrugDecrease): Promise<void> => {
      const succeedMove = drugArrive.drugMove(cur, prev, drugDecrease);
      if (succeedMove) {
        return await updateDrugDecrease(drugDecrease);
      }
      ElMessage.warning('Перерасход');
    };

    const setPatientToDecrease = async (event: ISearchObject, drugDecrease: DrugDecrease) => {
      await Provider.store.dispatch('patients/get', event.value);
      drugDecrease.setPatient(patient.value);
      await updateDrugDecrease(drugDecrease);
    };

    return {
      updateDrugArrive,
      updateDrugDecreaseQuantity,
      setPatientToDecrease,
      updateDrugDecrease,
      removeDrugDecrease,
      addDrugDecrease,
      createDrugArrive,
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
  max-width: auto;
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
    margin: 0 0px 10px 0;
  }
}
</style>
