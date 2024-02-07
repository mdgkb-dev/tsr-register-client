<template>
  <RightTabsContainer :is-toggle="isToggle" slider-on-width="180px" @toggle="toggle">
    <template #icon>
      <svg class="icon-plus">
        <use xlink:href="#plus"></use>
      </svg>
    </template>
    <template #slider-body>
      <div class="slider-body">
        <div class="slider-item-search">
          <RemoteSearch key-value="representative" placeholder="Начните вводить" />
        </div>
        <div class="slider-item" @click="addDisability">Добавить инвалидность</div>
      </div>
    </template>
    <template #tabs></template>
    <template #body>
      <div class="body">
        <div v-for="disability in patient.disabilities" :key="disability.id">
          <ResearcheContainer background="#DFF2F8">
            <template #header>
              <div class="researche-name">Инвалидность</div>
              <div class="line-item">
                <div class="item-left">
                  <div class="diagnosis-doctorName">
                    <div class="doctor-title">Период инвалидности:</div>
                    <el-date-picker v-model="disability.dateStart" @change="updateDisability(disability)"></el-date-picker>
                    <el-date-picker v-model="disability.dateEnd" @change="updateDisability(disability)"></el-date-picker>

                    <div class="doctor-title">Серия:</div>
                    <el-input v-model="disability.series" @blur="updateDisability(disability)" />

                    <div class="doctor-title">Номер:</div>
                    <el-input v-model="disability.number" @blur="updateDisability(disability)" />
                  </div>
                </div>
                <div class="item-right">
                  <Button
                    text="Удалить"
                    :with-icon="false"
                    width="auto"
                    height="40px"
                    font-size="16px"
                    border-radius="5px"
                    color="#343E5C"
                    background="#ffffff"
                    :color-swap="true"
                    @click="removeDisability(disability.id)"
                  >
                  </Button>
                </div>
              </div>
            </template>
            <template #body>
              <div class="tools">
                <Button
                  text="Добавить ЕДВ"
                  :with-icon="false"
                  width="100%"
                  height="60px"
                  font-size="16px"
                  border-radius="5px"
                  color="#00B5A4"
                  background="#C7ECEA"
                  background-hover="#C7ECEA"
                  :color-swap="false"
                  @click="addEdv(disability)"
                >
                </Button>
              </div>
              <div class="scroll-block">
                <el-timeline style="margin-top: 20px">
                  <el-timeline-item v-for="edv in disability.edvs" :key="edv.id" placement="top" center>
                    <CollapseItem title="Справка ЕДВ" :is-collaps="true" background="#DFF2F8" margin-top="0px">
                      <template #inside-content>
                        <div class="background-container">
                          <el-date-picker v-model="edv.dateStart" @change="changeParameter(edv, '')"></el-date-picker>
                          <el-date-picker v-model="edv.dateEnd" @change="changeParameter(edv, '')"></el-date-picker>
                          <div class="choice">
                            <div
                              v-for="parameter in [
                                { letter: 'A', parameter: edv.parameter1 },
                                { letter: 'B', parameter: edv.parameter2 },
                                { letter: 'C', parameter: edv.parameter3 },
                              ]"
                              :key="parameter.letter"
                              class="choice-item"
                            >
                              <Button
                                :text="parameter.letter"
                                :with-icon="false"
                                width="100%"
                                height="40px"
                                margin="10px 0 0 0"
                                font-size="16px"
                                border-radius="5px"
                                color="#343E5C"
                                :background="parameter.parameter ? '#DFF2F8' : '#ffffff'"
                                background-hover="#DFF2F8"
                                :color-swap="false"
                                @click="changeParameter(edv, parameter.letter)"
                              >
                              </Button>
                            </div>
                          </div>
                          <Button
                            text="Удалить ЕДВ"
                            :with-icon="false"
                            width="auto"
                            height="40px"
                            margin="10px 0 0 0"
                            font-size="16px"
                            border-radius="5px"
                            color="#343E5C"
                            background="#ffffff"
                            :color-swap="true"
                            @click="removeEdv(disability, edv.id)"
                          >
                          </Button>
                        </div>
                      </template>
                    </CollapseItem>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </template>
          </ResearcheContainer>
        </div>
      </div>
    </template>
  </RightTabsContainer>

  <svg width="0" height="0" class="hidden">
    <symbol id="plus" stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M17.5 11.0714H11.0714V17.5H8.92857V11.0714H2.5V8.92857H8.92857V2.5H11.0714V8.92857H17.5V11.0714Z"></path>
    </symbol>
  </svg>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';

import Disability from '@/classes/Disability';
import Edv from '@/classes/Edv';
import Patient from '@/classes/Patient';
import Button from '@/services/components/Button.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import ResearcheContainer from '@/services/components/ResearcheContainer.vue';
import RightTabsContainer from '@/services/components/RightTabsContainer.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DisabilityForm',
  components: {
    RemoteSearch,
    RightTabsContainer,
    ResearcheContainer,
    Button,
    CollapseItem,
  },
  setup() {
    const patient: ComputedRef<Patient> = computed(() => Provider.store.getters['patients/item']);
    const fileAnchor = ref();
    const isToggle: Ref<boolean> = ref(false);
    const toggle = async (toggle: boolean) => {
      isToggle.value = toggle;
    };

    const addDisability = async (): Promise<void> => {
      const item = patient.value.addDisability();
      await Provider.store.dispatch('disabilities/create', item);
    };

    const updateDisability = async (item: Disability): Promise<void> => {
      await Provider.store.dispatch('disabilities/update', item);
    };

    const addEdv = async (disability: Disability): Promise<void> => {
      const item = disability.addEdv();
      await Provider.store.dispatch('edvs/create', item);
    };

    const removeDisability = async (id: string): Promise<void> => {
      patient.value.removeDisability(id);
      await Provider.store.dispatch('disabilities/remove', id);
    };

    const removeEdv = async (disability: Disability, id: string): Promise<void> => {
      disability.removeEdv(id);
      await Provider.store.dispatch('edvs/remove', id);
    };

    const changeParameter = async (edv: Edv, parameterLetter: string): Promise<void> => {
      if (parameterLetter === 'A') {
        edv.parameter1 = !edv.parameter1;
      }
      if (parameterLetter === 'B') {
        edv.parameter2 = !edv.parameter2;
      }
      if (parameterLetter === 'C') {
        edv.parameter3 = !edv.parameter3;
      }
      await Provider.store.dispatch('edvs/update', edv);
    };

    // const getProp = (scope: any, isStartDate: boolean): string | undefined => {
    //   if (isStartDate && !isEdv(scope.row) && disabilities.value.indexOf(scope.row) >= 0) {
    //     return `disabilities.${disabilities.value.indexOf(scope.row)}.period.dateStart`;
    //   }
    //   if (!isStartDate && !isEdv(scope.row) && disabilities.value.indexOf(scope.row) >= 0) {
    //     return `disabilities.${disabilities.value.indexOf(scope.row)}.period.dateEnd`;
    //   }
    //   const disabilityIndex = disabilities.value.findIndex((d: IDisability) => d.id === scope.row.disabilityId);
    //
    //   if (disabilityIndex < 0) {
    //     return undefined;
    //   }
    //
    //   let edvIndex = -1;
    //   if (disabilities.value[disabilityIndex].edvs) {
    //     edvIndex = disabilities.value[disabilityIndex].edvs.indexOf(scope.row);
    //   }
    //   if (edvIndex >= 0 && isStartDate) {
    //     return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.dateStart`;
    //   }
    //   if (edvIndex >= 0 && !isStartDate) {
    //     return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.dateEnd`;
    //   }
    //
    //   return undefined;
    // };

    // const removeDisability = (item: IDisability): void => {
    //   store.commit('patients/removeDisability', item);
    // };
    //
    // const edvDateStartChangeHandler = (id: string): void => {
    //   store.commit('patients/setEdvDateEnd', id);
    // };
    // const disabledDate = (time: Date, dateStart: Date) => {
    //   if (dateStart) {
    //     return time.getTime() < new Date(dateStart).getTime();
    //   }
    // };
    //
    // const validateDisabilityDates = (_: unknown, __: unknown, callback: MyCallbackWithOptParam): void => {
    //   disabilities.value.forEach((disability: IDisability) => {
    //     if (disability.dateIsCorrect()) callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
    //   });
    //   callback();
    // };
    //
    // const isEdv = (row: { ['parameter1']: boolean | undefined }): boolean => {
    //   return typeof row.parameter1 === 'boolean';
    // };
    //
    // const addReplaceFile = (event: InputEvent, edvId: string): void => {
    //   const target = event.target as HTMLInputElement;
    //   if (!target || !target.files) {
    //     return;
    //   }
    //   const file = Array.from(target.files)[0];
    //
    //   disabilities.value.forEach((i: IDisability) => {
    //     i.edvs.forEach((e: IEdv) => {
    //       if (e.id === edvId) {
    //         const newInfo = FileInfo.CreateDraft(file, edvId);
    //         e.fileInfoId = newInfo.id;
    //         e.fileInfo = newInfo;
    //       }
    //     });
    //   });
    // };
    //
    // const removeFile = (id: string): void => {
    //   disabilities.value.forEach((i: IDisability) => {
    //     i.edvs.forEach((e: IEdv) => {
    //       if (e.id === id) {
    //         e.fileInfoId = undefined;
    //         e.fileInfo = undefined;
    //       }
    //     });
    //   });
    // };
    //
    // const downloadFile = async (event: MouseEvent): Promise<void> => {
    //   if (!event || !event.target) {
    //     return;
    //   }
    //
    //   const anchorElement = (event.target as HTMLSpanElement).parentElement as HTMLAnchorElement;
    //   const { fileId } = anchorElement.dataset;
    //
    //   if (!fileId) {
    //     return;
    //   }
    //
    //   try {
    //     await store.dispatch('files/generateLink', fileId);
    //   } catch (error) {
    //     return;
    //   }
    //
    //   const anchor: IFileAnchor = store.getters['files/fileAnchor'];
    //   fileAnchor.value.href = anchor.href;
    //   fileAnchor.value.download = String(anchor.download);
    //   fileAnchor.value.click();
    // };

    return {
      updateDisability,
      changeParameter,
      removeDisability,
      removeEdv,
      patient,
      // disabilities,
      fileAnchor,
      // downloadFile,
      // removeFile,
      // addReplaceFile,
      // isEdv,
      // getProp,
      // removeDisability,
      // disabledDate,
      // validateDisabilityDates,
      addEdv,
      // removeEdv,
      // birthDate,
      addDisability,
      // edvDateStartChangeHandler,
      isToggle,
      toggle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.card-button-group {
  display: flex;
  justify-content: flex-end;
}

.but {
  border-radius: 50%;
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
  z-index: 2;
}

.body {
  width: 100%;
  height: 100%;
  border-right: 1px solid #379fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
  z-index: 5;
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

.diagnosis-doctorName {
  padding: 10px 0;
}

.doctor-title {
  padding: 10px 0;
}

.background-container {
  width: auto;
  padding: 10px;
  background: #ffffff;
  border-radius: 5px;
}

.item-left {
  min-width: calc(100% - 100px);
  color: #343e5c;
  margin-right: 10px;
}

.item-right {
  width: 100px;
  color: #343e5c;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  padding-bottom: 10px;
}

.line-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  max-width: 100%;
}

.choice {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.choice-item {
  width: 30%;
}

.scroll-block {
  max-height: 65vh;
  overflow: hidden;
  overflow-y: auto;
}

.tools {
  padding-bottom: 10px;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

.el-select {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-timeline) {
  padding: 0 0 0 10px;
}

:deep(.el-timeline-item) {
  padding-bottom: 8px;
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
}
</style>
