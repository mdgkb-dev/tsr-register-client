<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="registerProperty"
          :rules="rules"
          label-width="150px"
          label-position="left"
          style="max-width: 800px"
        >
          <el-form-item label="Название свойства" prop="name">
            <el-input v-model="registerProperty.name"></el-input>
          </el-form-item>
          <el-form-item label="Короткое название свойства" prop="shortName">
            <el-input v-model="registerProperty.shortName"></el-input>
          </el-form-item>
          <el-form-item label="Стандартная ширина столбца" prop="colWidth">
            <el-input v-model="registerProperty.colWidth"></el-input>
          </el-form-item>
          <el-form-item label="Тип данных" prop="valueTypeId">
            <el-select v-model="registerProperty.valueTypeId" @change="changeRelation">
              <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showSet || showRadio" label="Добавить поле 'Другое'">
            <el-checkbox v-model="registerProperty.withOther" />
          </el-form-item>

          <div v-if="showSet">
            <el-button style="margin-bottom: 20px" @click="addSetItem">Добавить в набор свойства</el-button>
            <el-row v-for="(item, i) in registerProperty.registerPropertySet" :key="i">
              <el-col :span="20">
                <el-form-item>
                  <el-input v-model="item.name" placeholder="Please input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="2">
                <el-button @click.prevent="removeSetItem(i)">Удалить поле</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="showRadio">
            <el-button style="margin-bottom: 20px" @click="addRadioItem">Добавить в набор свойства</el-button>
            <el-row v-for="(item, i) in registerProperty.registerPropertyRadio" :key="i">
              <el-col :span="20">
                <el-form-item>
                  <el-input v-model="item.name" placeholder="Please input"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="2">
                <el-button @click.prevent="removeRadioItem(i)">Удалить поле</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import MainHeader from '@/classes/shared/MainHeader';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import ValueRelation from '@/interfaces/valueTypes/ValueRelation';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RepresentativeTypePage',
  setup() {
    const store = useStore();
    const route = useRoute();

    const registerProperty: Ref<IRegisterProperty> = computed(() => store.getters['registerProperties/registerProperty']);
    const valueTypes: Ref<IValueType[]> = computed(() => store.getters['registerProperties/valueTypes']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.registerPropertyId);
    const mount: Ref<boolean> = ref(false);
    const rules = {
      name: [{ required: true, message: 'Необходимо заполнить название свойства', trigger: 'blur' }],
      valueTypeId: [{ required: true, message: 'Необходимо выбрать тип данных', trigger: 'change' }],
    };
    const showSet: Ref<boolean> = ref(false);
    const showRadio: Ref<boolean> = ref(false);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.registerPropertyId) {
        store.commit('registerProperties/set', new RegisterProperty());
        title = 'Создать свойство';
      } else {
        title = 'Редактировать свойство';
        await store.dispatch('registerProperties/get', route.params.registerPropertyId);
      }
      if (registerProperty.value.valueTypeId) changeRelation(registerProperty.value.valueTypeId);
      await store.dispatch('registerProperties/getValueTypes');

      pushToLinks(['/register-properties'], ['Свойства для регистров']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(registerProperty, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const changeRelation = (valueTypeId: string): void => {
      const valueType = valueTypes.value.find((i) => i.id === valueTypeId);
      if (valueType) {
        if (valueType.valueRelation === ValueRelation.manyToMany) {
          showSet.value = true;
          showRadio.value = false;
        }
        if (valueType.valueRelation === ValueRelation.oneToMany) {
          showRadio.value = true;
          showSet.value = false;
        }
        if (valueType.valueRelation === ValueRelation.simple) {
          showRadio.value = false;
          showSet.value = false;
        }
      }
    };

    const addSetItem = (): void => {
      store.commit('registerProperties/addSetItem');
    };
    const addRadioItem = (): void => {
      store.commit('registerProperties/addRadioItem');
    };

    const removeSetItem = (i: number): void => {
      store.commit('registerProperties/removeSetItem', i);
    };
    const removeRadioItem = (i: number): void => {
      store.commit('registerProperties/removeRadioItem', i);
    };

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;
      await submitHandling('registerProperties', registerProperty.value, next, 'register-properties');
    };

    return {
      addSetItem,
      addRadioItem,
      removeSetItem,
      removeRadioItem,
      registerProperty,
      valueTypes,
      form,
      links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>
