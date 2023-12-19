<template>
  <div
    class="human-form-container"
    :style="{
      maxWidth: maxWidth,
    }"
  >
    <el-form>
      <el-form-item label="Телефон">
        <el-input v-model="human.contact.phone" placeholder="Введите номер" @input="human.contact.formatPhoneNumber()" @blur="update()"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="human.contact.email" placeholder="Введите адрес" @blur="update()"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue';

import Human from '@/classes/Human';
import Provider from '@/services/Provider/Provider';
import validate from '@/services/validate';

export default defineComponent({
  name: 'PassportForm',
  components: {},
  props: {
    storeModule: {
      type: String as PropType<string>,
      default: '',
    },

    maxWidth: {
      type: String as PropType<string>,
      default: 'calc(100% - 10px)',
    },
    editMode: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const surnameForm = ref();
    const form = ref();
    const human: Ref<Human> = computed(() => Provider.store.getters[`${props.storeModule}/item`].getHuman());
    const toggleAddress = async (addressesEqual: boolean): Promise<void> => {
      human.value.setResidentialAddress(addressesEqual);
      await update();
    };
    const getForm = (value: string) => {
      switch (value) {
        case 'surname':
          return surnameForm;
        default:
          return form;
      }
    };

    const update = async (form?: string): Promise<void> => {
      if (form) {
        if (!validate(getForm(form))) {
          return;
        }
      }
      await Provider.withHeadLoader(async () => {
        if (props.editMode) {
          await Provider.store.dispatch('contacts/update', human.value.contact);
        }
      });
    };

    return {
      human,
      update,
      toggleAddress,
      form,
      surnameForm,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.human-form-container {
  width: calc(100% - 10px);
  margin-left: 10px;

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
}
</style>
