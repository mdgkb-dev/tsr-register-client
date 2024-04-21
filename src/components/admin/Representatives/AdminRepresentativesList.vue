<template>
  <AdminListWrapper v-if="mounted" pagination show-header>
    <AdminRepresentativesListFilters @load="load" />

    <div class="scroll-block">
      <div class="patient-count">Количество представителей: {{ count }}</div>
      <div v-for="representative in representatives" :key="representative.id">
        <CollapseItem :is-collaps="false" padding="0 8px">
          <template #inside-title>
            <div class="flex-block" @click.prevent="() => undefined">
              <div class="item-flex">
                <div class="line-item-left">
                  <Button button-class="edit-button" color="#006bb4" icon="edit" icon-class="edit-icon"
                    @click="Router.ToAdmin('representatives/' + representative.id)" />
                  <FioToggleForm :human="representative.human" />
                </div>

                <div class="line-item-right">
                  <Button button-class="gender-button" :text="representative.human.getGender()"
                    @click="updateIsMale(representative.human)" />
                </div>
              </div>
              <div class="item-flex">
                <GridContainer max-width="1920px" custom-class="grid"
                  grid-template-columns="repeat(auto-fit, minmax(220px, 1fr))">
                  <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(80px, 1fr))">
                    <InfoItem title="дата рождения" margin="0" :with-open-window="false">
                      <SmallDatePicker v-model:model-value="representative.human.dateBirth" placeholder="Выбрать"
                        @change="updateHuman(representative.human)" />
                    </InfoItem>
                  </GridContainer>
                  <ToggleDocumentsForm :human="representative.human" />
                </GridContainer>
              </div>
            </div>
          </template>
        </CollapseItem>
      </div>
    </div>
  </AdminListWrapper>
  <ModalWindow :show="showAddModal" title="Добавить представителя" @close="showAddModal = false">
    <CreateRepresentativeForm @add="showAddModal = false" />
  </ModalWindow>
</template>

<script lang="ts" setup>
import Human from '@/classes/Human';
import Representative from '@/classes/Representative';
import FioToggleForm from '@/components/admin/FioToggleForm.vue';
import AdminRepresentativesListFilters from '@/components/admin/Representatives/AdminRepresentativesListFilters.vue';
import ToggleDocumentsForm from '@/components/admin/ToggleDocumentsForm.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import RepresentativesSortsLib from '@/libs/sorts/RepresentativesSortsLib';
import Button from '@/services/components/Button.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import ModalWindow from '@/services/components/ModalWindow.vue';
import SmallDatePicker from '@/services/components/SmallDatePicker.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';
import AdminListWrapper from '@/views/adminLayout/AdminListWrapper.vue';

import CreateRepresentativeForm from '../Patients/CreateRepresentativeForm.vue';

const showAddModal: Ref<boolean> = ref(false);
const representatives: Ref<Representative[]> = computed(() => Provider.store.getters['representatives/items']);
const count: Ref<number> = computed(() => Provider.store.getters['representatives/count']);
const mounted = ref(false);

const loadRepresentatives = async () => {
  await Provider.store.dispatch('representatives/getAll', { filterQuery: Provider.filterQuery.value });
};

const load = async () => {
  await Provider.store.dispatch('representatives/ftsp');
  mounted.value = true;
};

const addRepresentative = async (): Promise<void> => {
  showAddModal.value = !showAddModal.value;
};

Hooks.onBeforeMount(load, {
  adminHeader: {
    title: 'Представители',
    buttons: [{ text: 'Добавить', type: 'normal-button', action: addRepresentative }],
  },
  pagination: { storeModule: 'representatives', action: 'ftsp' },
  sortsLib: RepresentativesSortsLib,
});

const selectSearch = async (event: ISearchObject): Promise<void> => {
  await Provider.router.push(`/admin/representatives/${event.value}`);
};

const updateHuman = async (human: Human): Promise<void> => {
  await Provider.withHeadLoader(async () => {
    await Provider.store.dispatch('humans/update', human);
  });
};

const updateIsMale = async (human: Human): Promise<void> => {
  human.isMale = !human.isMale;
  await updateHuman(human);
};
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
  grid-gap: 10px;
  margin: 0;
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
  margin: 0;
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
  height: 100%;
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
