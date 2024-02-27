<template>
  <Button text="Рассчитать потребность" button-class="need-button" @click="calculateDrugNeeding" />
  <el-form>
    <div v-if="actualAnthropometry">
      <el-form-item label="Рост, см">
        <el-input v-model="actualAnthropometry.height" />
      </el-form-item>
      <el-form-item label="Вес, кг">
        <el-input v-model="actualAnthropometry.weight" />
      </el-form-item>
    </div>
    <el-form-item label="Период заявки">
      <el-input :model-value="commission.getFormattedPeriod()" />
    </el-form-item>
    <div v-if="commission.drugRecipe && commission.drugRecipe.drug">
      <el-form-item label="Препарат">
        <el-input :model-value="commission.drugRecipe.drug.name" />
      </el-form-item>
      <el-form-item label="МНН">
        <el-input :model-value="commission.drugRecipe.drug.nameINN" />
      </el-form-item>
      <el-form-item v-if="commission.drugRecipe.drugForm" label="ЛФ">
        <el-input :model-value="commission.drugRecipe.drugForm.name" />
      </el-form-item>
      <el-form-item v-if="commission.drugRecipe.drugDoze" label="Дозировка">
        <el-input :model-value="commission.drugRecipe.drugDoze.name" />
      </el-form-item>
      <el-form-item label="Схема лечения">
        <el-input :model-value="commission.drugNeeding.drugRegimen?.name" />
      </el-form-item>
      <el-form-item label="Схема расчета потребности">
        <el-input :model-value="commission.drugNeeding.calculation" />
      </el-form-item>
      <el-form-item label="Потребность на период в ЕИ">
        <el-input :model-value="commission.drugNeeding.measures" />
      </el-form-item>
      <el-form-item label="Количество, уп">
        <el-input :model-value="commission.drugNeeding.packs" />
      </el-form-item>
    </div>

    <!-- <el-form-item label="Код АТХ">
      <el-input />
    </el-form-item>
    <el-form-item label="Наименование АТХ">
      <el-input />
    </el-form-item> -->
  </el-form>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType } from 'vue';

import Commission from '@/classes/Commission';
import DrugNeeding from '@/classes/DrugNeeding';
import DrugNeedingOptions from '@/classes/DrugNeedingOptions';
import Patient from '@/classes/Patient';
import Button from '@/services/components/Button.vue';
import IAnthropomentry from '@/interfaces/IAnthropomentry';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'NeedingComponent',
  components: {
    Button,
    // DrugSelectForm,
  },
  props: {
    commission: {
      type: Object as PropType<Commission>,
      required: true,
    },
  },
  setup(props) {
    const actualAnthropometry: ComputedRef<IAnthropomentry> = computed(() => Provider.store.getters['patients/actualAnthropometry']);
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const drugNeeding: ComputedRef<DrugNeeding> = computed(() => Provider.store.getters['drugDozes/drugNeeding']);

    const calculateDrugNeeding = async () => {
      await Provider.store.dispatch('patients/getActualAnthropomentry', patient.value.id);
      const opt = DrugNeedingOptions.Create(
        actualAnthropometry.value.weight,
        actualAnthropometry.value.height,
        props.commission.startDate,
        props.commission.endDate,
        props.commission.drugRecipe?.drugDozeId,
        patient.value.id
      );
      console.log(drugNeeding);

      await Provider.store.dispatch('drugDozes/calculateNeeding', opt);

      props.commission.setDrugNeeding(drugNeeding.value);
      await Provider.store.dispatch('commissions/update', props.commission);
    };

    return {
      drugNeeding,
      actualAnthropometry,
      calculateDrugNeeding,
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

.icon-plus {
  width: 40px;
  height: 40px;
  cursor: pointer;
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

.tabs-item-active {
  position: relative;
  width: 106px;
  height: 56px;
  border: 1px solid #379fff;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: #dff2f8;
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
  z-index: 2;
}

.tabs-item {
  width: 101px;
  height: 51px;
  border: 1px solid #b0a4c0;
  border-top-right-radius: $normal-border-radius;
  border-bottom-right-radius: $normal-border-radius;
  border-left: #dff2f8;
  background: $base-background;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 3px 3px;
  font-size: 14px;
  color: #b0a4c0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 5px;
}

:deep(.change-button) {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
  overflow-y: auto;
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

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-name {
  min-height: 42px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  color: #343e5c;
  font-size: 16px;
  margin-bottom: 20px;
}

.el-form-item {
  margin: 0;
}

.el-divider {
  margin: 10px 0;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

.item-left {
  width: 50%;
  color: #343e5c;
  margin-right: 10px;
}

.item-right {
  width: 50%;
  color: #343e5c;
  margin-left: 10px;
}

:deep(.medical-commission-button) {
  width: 33%;
  height: 40px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  margin: 0 10px 0 0;
  background: #ffffff;
}

:deep(.protocol-button) {
  width: 25%;
  height: 62px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  background: #ffffff;
  margin: 0 0 0 10px;
}

:deep(.need-button) {
  width: 100%;
  height: 62px;
  border-radius: $normal-border-radius;
  color: #b0a4c0;
  background: #ffffff;
  margin: 10px 0px;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-block-left {
  width: 75%;
  padding: 10px;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item__node) {
  background: #b0a4c0;
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

  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  .flex-block-left {
    width: calc(100% - 20px);
    padding: 10px;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.protocol-button) {
    width: 100%;
    height: 62px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    background: #ffffff;
    margin: 10px 0 0 0;
  }

  :deep(.need-button) {
    width: 100%;
    height: 62px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    background: #ffffff;
    margin: 10px 0 0 0;
  }
}

@media screen and (max-width: 555px) {
  .flex-block-left {
    width: calc(100% - 20px);
    padding: 10px;
    border: $light-pink-border;
    border-radius: $normal-border-radius;
    border-radius: 5px;
    display: block;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.medical-commission-button) {
    width: 100%;
    height: 40px;
    border-radius: $normal-border-radius;
    color: #b0a4c0;
    margin: 0 10px 10px 0;
    background: #ffffff;
  }

  .line-item {
    display: block;
    justify-content: space-between;
    width: 100%;
  }

  .item-left {
    width: 100%;
    color: #343e5c;
    margin-right: 0px;
  }

  .item-right {
    width: 100%;
    color: #343e5c;
    margin-left: 0px;
  }
}
</style>
