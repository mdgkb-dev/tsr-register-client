<template>
  <GridContainer grid-gap="5px" margin="10px 0">
    <Button v-for="drug in drugs" :key="drug.id" button-class="change-button" :text="drug.name" @click="selectDrug(drug)" />
  </GridContainer>
  <div v-if="commission.drug">{{ commission.drug.name }}</div>
  <el-button @click="showDrugsList(true)">Выбрать лекарство</el-button>
  <!-- <template v-if="drugsListShowed">
    <div v-for="drug in drugs" :key="drug.id" @click="selectDrug(drug)">
      {{ drug.name }}
    </div>
  </template> -->
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import Drug from '@/classes/Drug';
import GridContainer from '@/services/components/GridContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'CommissionDrug',
  components: {
    GridContainer,
  },
  props: {
    commission: {
      type: Object as PropType<Commission>,
      required: true,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const drugsListShowed: Ref<boolean> = ref(false);
    const drugs: ComputedRef<Drug[]> = computed(() => Provider.store.getters['drugs/items']);

    const selectDrug = async (drug: Drug): Promise<void> => {
      if (!props.commission) {
        return;
      }
      props.commission.setDrug(drug);
      drugsListShowed.value = false;
      emit('select');
    };

    const showDrugsList = async (show: boolean): Promise<void> => {
      await Provider.store.dispatch('drugs/getAll');
      drugsListShowed.value = show;
    };
    return {
      drugs,
      selectDrug,
      showDrugsList,
      drugsListShowed,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

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
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
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
  align-items: flex-end;
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
