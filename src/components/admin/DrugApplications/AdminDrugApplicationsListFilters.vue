<template>
  <RSContainer :menu-width="'300px'" :mobile-width="'1215px'">
    <template #visability>
      <GridContainer max-width="300px" grid-gap="0 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
        <InfoItem title="поиск и сортировка" margin="0" :with-open-window="false" height="98px" background="#F5F5F5" border-color="#C4C4C4" :with-hover="false">
          <div :style="{ width: '100%' }">
            <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="load" />
          </div>
        </InfoItem>
      </GridContainer>
    </template>

    <template #filter>
      <GridContainer max-width="900px" grid-gap="70px 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0 0 0 10px">
        <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))" margin="0px">
          <FiltersButtonsMultiply
            :filter-model="filterByStatus"
            :options="createStatusesOptions()"
            default-label="статус"
            :inverse="true"
            :grid-template-columns="mobileWindow ? 'repeat(auto-fit, minmax(calc(50% - 7px), 1fr))' : 'repeat(auto-fit, minmax(calc(30% - 7px), 1fr))'"
            :height="mobileWindow ? '134px' : '98px'"
            @load="$emit('load')"
          />
        </GridContainer>
        <GridContainer max-width="500px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(95px, 1fr))" margin="0px" background="#F5F6F8"> </GridContainer>
      </GridContainer>
    </template>
  </RSContainer>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';

import Status from '@/classes/Status';
import FiltersButtonsMultiply from '@/components/TableFilters/FiltersButtonsMultiply.vue';
import IOption from '@/interfaces/shared/IOption';
import DrugApplicationsFiltersLib from '@/libs/filters/DrugApplicationsFiltersLib';
import FilterModel from '@/services/classes/filters/FilterModel';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import RSContainer from '@/services/components/RSContainer.vue';
import SortList from '@/services/components/SortList.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminDrugApplicationsListFilters',
  components: {
    FiltersButtonsMultiply,
    SortList,
    InfoItem,
    GridContainer,
    RSContainer,
  },
  emits: ['load'],
  setup() {
    const filterByStatus: Ref<FilterModel> = ref(DrugApplicationsFiltersLib.byStatus());
    const statuses: Ref<Status[]> = computed(() => Provider.store.getters['statuses/items']);
    const mobileWindow = ref(window.matchMedia('(max-width: 1330px)').matches);
    const createStatusesOptions = (): IOption[] => {
      const ids: IOption[] = [];
      statuses.value.forEach((r: Status) => ids.push({ value: r.id as string, label: r.name }));
      return ids;
    };

    return {
      createStatusesOptions,
      filterByStatus,
      mobileWindow,
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
