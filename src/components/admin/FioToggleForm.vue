<template>
  <el-form ref="form" :model="humanCopy" style="width: 100%">
    <InfoItem
      title="ФИО"
      :show-save-dialog="true"
      icon="edit-title"
      :with-hover="true"
      :close="closeToggle"
      width="100%"
      @keyup-enter="submit"
      @after-close="resetCopy"
    >
      <StringItem :string="human.getFullName()" />
      <template #open-inside-content>
        <GridContainer custom-class="grid" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0">
          <InfoItem
            title="фамилия"
            icon="edit-title"
            :with-open-window="false"
            :with-hover="false"
            border-color="#ffffff"
            base-box-margin="0 0 15px 0"
            padding="0"
            width="100%"
          >
            <el-form-item style="width: 100%" prop="surname" :rules="human.getValidationRules().surname">
              <el-input v-model="humanCopy.surname" />
              <!-- <el-input :model-value="human.surname" @input="(e) => human.setSurname(e)" @click.stop="() => undefined" /> -->
            </el-form-item>
          </InfoItem>
          <InfoItem
            title="имя"
            icon="edit-title"
            :with-open-window="false"
            :with-hover="false"
            border-color="#ffffff"
            base-box-margin="0 0 15px 0"
            padding="0"
            width="100%"
          >
            <el-form-item style="width: 100%" prop="name" :rules="human.getValidationRules().name">
              <el-input v-model="humanCopy.name" />
              <!-- <el-input :model-value="human.name" @input="(e) => human.setName(e)" @click.stop="() => undefined" /> -->
            </el-form-item>
          </InfoItem>
          <InfoItem
            title="отчество"
            icon="edit-title"
            :with-open-window="false"
            :with-hover="false"
            border-color="#ffffff"
            base-box-margin="0 0 15px 0"
            padding="0"
            width="100%"
          >
            <el-form-item style="width: 100%" prop="patronymic" :rules="human.getValidationRules().patronymic">
              <el-input v-model="humanCopy.patronymic" />
              <!-- <el-input :model-value="human.patronymic" @input="(e) => human.setPatronymic(e)" @click.stop="() => undefined" /> -->
            </el-form-item>
          </InfoItem>
          <Button button-class="save-button" text="Сохранить" @click="submit" />
        </GridContainer>
      </template>
    </InfoItem>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'FioToggleForm',
  components: {
    StringItem,
    InfoItem,
    GridContainer,
    Button,
  },
  props: {
    human: {
      type: Object as PropType<Human>,
      required: true,
    },
  },
  setup(props) {
    const closeToggle: Ref<boolean> = ref(false);
    const form = ref();
    const humanCopy: Ref<Human> = ref(new Human(props.human));

    const resetCopy = () => {
      humanCopy.value = new Human(props.human);
    };

    const updateHuman = async (): Promise<void> => {
      props.human.setFullName(humanCopy.value);
      await Provider.withHeadLoader(async () => {
        await Provider.store.dispatch('humans/update', props.human);
      });
    };

    const submit = async (): Promise<void> => {
      if (!validate(form)) {
        return;
      }
      closeToggle.value = !closeToggle.value;
      await updateHumanName();
    };

    const updateHumanName = async (): Promise<void> => {
      props.human.setEditNameMode(false);
      await updateHuman();
    };

    return {
      closeToggle,
      submit,
      updateHumanName,
      form,
      humanCopy,
      resetCopy,
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
  margin: 0px;
  width: auto;
  border-color: #ffffff;
  padding: 0px;
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
  padding: 0px;
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
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
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
    padding: 0px;
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