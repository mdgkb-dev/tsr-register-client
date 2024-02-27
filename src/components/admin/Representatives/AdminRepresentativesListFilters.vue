<template>
  <RSContainer :menu-width="'300px'" :mobile-width="'1215px'">
    <template #visability>
      <GridContainer max-width="300px" grid-gap="0 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0px">
        <InfoItem title="поиск и сортировка" margin="0" :with-open-window="false" height="98px" background="#F5F5F5" border-color="#C4C4C4" :with-hover="false">
          <div :style="{ width: '100%' }">
            <RemoteSearch key-value="representative" placeholder="Начните вводить ФИО" max-width="100%" @select="selectSearch" />
            <SortList class="filters-block" :store-mode="true" label-name="" max-width="100%" @load="$emit('load')" />
          </div>
        </InfoItem>
      </GridContainer>
    </template>

    <template #filter>
      <GridContainer max-width="1500px" grid-gap="70px 10px" grid-template-columns="repeat(auto-fit, minmax(200px, 1fr))" margin="0 0 0 10px">
        <GridContainer max-width="500px" grid-gap="10px" grid-template-columns="repeat(auto-fit, minmax(95px, 1fr))" margin="0px" background="#F5F6F8">
          <InfoItem max-width="150px" title="пол" margin="0" :with-open-window="false" height="98px" background="#F5F5F5" border-color="#C4C4C4" padding="7px" :with-hover="false">
            <Switch3Pos max-width="150px" :first-model="onlyMaleFilter" :second-model="onlyFemaleFilter" default-label="пол" @load="$emit('load')" />
          </InfoItem>
        </GridContainer>
      </GridContainer>
    </template>
  </RSContainer>
</template>

<script setup lang="ts">
import ISearchObject from '@/interfaces/ISearchObject';
import RepresentativesFiltersLib from '@/libs/filters/RepresentativesFiltersLib';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import RSContainer from '@/services/components/RSContainer.vue';
import SortList from '@/services/components/SortList.vue';
import Switch3Pos from '@/services/components/Switch3Pos.vue';
import Provider from '@/services/Provider/Provider';
const emits = defineEmits(['load']);

const onlyMaleFilter = RepresentativesFiltersLib.onlyMale();
const onlyFemaleFilter = RepresentativesFiltersLib.onlyFemale();
const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/admin/representatives/${event.value}`);
};
</script>
