<template>
  <div class="container">
    <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="addDrugArrive()" />
    <div class="scroll-block">
      <draggable tag="el-collapse" :list="drugApplication.fundContract.drugArrives" item-key="id" @end="sortDrugArrives">
        <template #item="{ element }">
          <DrugArriveItem :drug-arrive="element" @remove="remove(element.id)" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import draggable from 'vuedraggable';

import DrugApplication from '@/classes/DrugApplication';
import DrugArriveItem from '@/components/admin/DrugApplications/DrugArriveItem.vue';
import Arrays from '@/services/Arrays';
import ClassHelper from '@/services/ClassHelper';
import Button from '@/services/components/Button.vue';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'DrugArrivesList',
  components: {
    DrugArriveItem,
    Button,
    draggable,
  },
  setup() {
    const drugApplication: Ref<DrugApplication> = computed(() => Provider.store.getters['drugApplications/item']);

    const remove = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, drugApplication.value.fundContract.drugArrives);
      await Provider.store.dispatch('drugArrives/remove', id);
    };

    const sortDrugArrives = async (): Promise<void> => {
      Arrays.Sort(drugApplication.value.fundContract.drugArrives);
      await Provider.store.dispatch('drugApplications/update');
    };

    const addDrugArrive = async () => {
      const item = drugApplication.value.fundContract.addDrugArrive();
      await Provider.store.dispatch('drugArrives/create', item);
    };

    return { remove, sortDrugArrives, addDrugArrive, drugApplication };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container {
  width: 100%;
}

.scroll-block {
  height: 60vh;
  overflow: hidden;
  overflow-y: auto;
}

.plus-button {
  width: 100%;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 10px 0;
  box-sizing: border-box;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  // width: 40px;
  height: 40px;
  cursor: pointer;
}

.add-doctor {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  min-width: 300px;
  background: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
