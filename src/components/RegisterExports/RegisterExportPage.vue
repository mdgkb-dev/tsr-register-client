<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" :status-icon="true" :inline-message="true" :model="registerQuery" label-width="20%" label-position="left">
          <el-form-item
            label="Наименование"
            prop="name"
            :rules="[{ required: true, message: 'Необходимо указать название экспорта', trigger: 'blur' }]"
          >
            <el-input v-model="registerQuery.name" />
          </el-form-item>

          <el-form-item
            label="Регистр"
            prop="registerId"
            :rules="[{ required: true, message: 'Необходимо выбрать регистр', trigger: 'change' }]"
          >
            <el-select v-model="registerQuery.registerId" @change="setIsAddProperty">
              <el-option v-for="register in registers" :key="register.id" :label="register.name" :value="register.id" />
            </el-select>
          </el-form-item>

          <el-form-item
            label="Тип экспорта"
            prop="type"
            :rules="[{ required: true, message: 'Необходимо выбрать тип экспорта', trigger: 'change' }]"
          >
            <el-select v-model="registerQuery.type" @change="setIsAddProperty">
              <el-option v-for="type in queryTypes" :key="type.id" :label="type.label" :value="type.value" />
            </el-select>
          </el-form-item>

          <el-collapse
            v-if="
              registerQuery.type === RegisterQueryTypes.plain.value ||
              registerQuery.type === RegisterQueryTypes.group.value ||
              registerQuery.type === RegisterQueryTypes.aggregate.value
            "
          >
            <el-collapse-item v-if="registerQuery.type === RegisterQueryTypes.plain.value">
              <template #title>
                <h2 class="collapseHeader">Плоский список</h2>
              </template>
              <RegisterExportPropertyFormPlain />
            </el-collapse-item>

            <el-collapse-item v-if="registerQuery.type === RegisterQueryTypes.group.value">
              <template #title>
                <h2 class="collapseHeader">Список с группировкой</h2>
              </template>
              <!-- <Компонент /> -->
            </el-collapse-item>

            <el-collapse-item v-if="registerQuery.type === RegisterQueryTypes.aggregate.value">
              <template #title>
                <h2 class="collapseHeader">Список с группировкой и агрегацией данных</h2>
              </template>
              <!-- <Компонент /> -->
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RegisterQuery from '@/classes/registers/RegisterQuery';
import RegisterQueryTypes from '@/classes/registers/RegisterQueryTypes';
import MainHeader from '@/classes/shared/MainHeader';
import RegisterExportPropertyFormPlain from '@/components/RegisterExports/RegisterExportPropertyFormPlain.vue';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterQuery from '@/interfaces/registers/IRegisterQuery';
import IRegisterQueryType from '@/interfaces/registers/IRegisterQueryType';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterExportPage',
  components: { RegisterExportPropertyFormPlain },
  setup() {
    const store = useStore();
    const route = useRoute();

    const form = ref();
    const mount: Ref<boolean> = ref(false);
    const isEditMode: Ref<boolean> = ref(!!route.params.registerExportId);
    const queryTypes: ComputedRef<IRegisterQueryType[]> = computed<IRegisterQueryType[]>(() => RegisterQueryTypes.toArray());
    const registers: ComputedRef<IRegister[]> = computed<IRegister[]>(() => store.getters['registers/registers']);
    const registerQuery: ComputedRef<IRegisterQuery> = computed<IRegisterQuery>(() => store.getters['registerQueries/registerQuery']);

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.registerExportId) {
        store.commit('registerQueries/set', new RegisterQuery());
        title = 'Создать экспорт';
      } else {
        isEditMode.value = true;
        title = 'Редактировать экспорт';
        await store.dispatch('registerQueries/get', route.params.registerExportId);
      }

      await store.dispatch('registers/getAll');
      pushToLinks(['/register-exports'], ['Экспорт регистров']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'RegisterExports');
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(registerQuery, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const setIsAddProperty = async (): Promise<void> => {
      if (
        !registerQuery.value.type ||
        !registerQuery.value.registerId ||
        registerQuery.value.type.length <= 0 ||
        registerQuery.value.registerId.length <= 0
      ) {
        store.commit('registerQueries/setIsAddProperty', true);
        return;
      }

      await store.dispatch('registerProperties/getAllForRegisterId', registerQuery.value.registerId);
      store.commit('registerQueries/clearQueryToProperty');
      store.commit('registerQueries/setIsAddProperty', false);
    };

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;
      await submitHandling('registerQueries', registerQuery.value, next, 'register-exports');
    };

    return {
      form,
      mount,
      queryTypes,
      registerQuery,
      RegisterQueryTypes,
      registers,
      setIsAddProperty,
      submitForm,
    };
  },
});
</script>
