<template>
  <div class="container" @click="$emit('click')">
    <StringItem :string="String(drugArrive.order + 1)" color="#006BB4" font-size="20px" min-width="110px" margin="0" />
    <InfoItem title="дата поставки" margin="0" open-height="auto" :with-open-window="false" width="100%">
      <SmallDatePicker :model-value="drugArrive.date" placeholder="Выбрать" width="100%" height="34px" @change="updateDrugArriveDate" />
    </InfoItem>
    <Button button-class="del-button" icon="del" icon-class="edit-icon" @click="$emit('remove')" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import DrugArrive from '@/classes/DrugArrive';
import Button from '@/services/components/Button.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DrugArriveItem',
  components: {
    InfoItem,
    SmallDatePicker,
    StringItem,
    Button,
  },
  props: {
    drugArrive: {
      type: Object as PropType<DrugArrive>,
      required: true,
    },
  },
  emits: ['remove', 'click'],
  setup(props) {
    const updateDrugArrive = async () => {
      await Provider.store.dispatch('drugArrives/update', props.drugArrive);
    };

    const updateDrugArriveDate = async (newDate: Date) => {
      props.drugArrive.setDate(newDate);
      await updateDrugArrive();
    };

    return {
      updateDrugArriveDate,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  cursor: pointer;
  border: $normal-border;
  border-radius: $normal-border-radius;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 0 10px 0;
}

.container:hover {
  border-color: #006bb4;
}

:deep(.del-button) {
  width: 42px;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
  border: none;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  fill: #c4c4c4;
}

:deep(.edit-icon):hover {
  fill: red;
}
</style>
