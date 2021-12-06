<template>
  <div v-if="mount" class="wrapper">
    <el-form
      ref="form"
      :status-icon="true"
      :inline-message="true"
      :rules="rules"
      :model="register"
      label-width="20%"
      label-position="left"
      style="width: 100%"
    >
      <div class="table-background" style="margin-bottom: 20px; height: unset">
        <el-form-item label="Название регистра" prop="name">
          <el-input v-model="register.name"></el-input>
        </el-form-item>
      </div>
      <el-collapse>
        <RegisterGroupForm />
        <el-collapse-item>
          <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
          <MkbForm :store-module="'registers'" />
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Register from '@/classes/registers/Register';
import MainHeader from '@/classes/shared/MainHeader';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import RegisterGroupForm from '@/components/Registers/RegisterGroupForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    RegisterGroupForm,
    MkbForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const register: Ref<IRegister> = computed(() => store.getters['registers/item']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.registerId);
    const mount: Ref<boolean> = ref(false);
    const rules = { name: [{ required: true, message: 'Необходимо заполнить название регистра', trigger: 'blur' }] };

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      await store.dispatch('registers/getValueTypes');
      let title: string;
      if (!route.params.registerId) {
        store.commit('registers/set', new Register());
        title = 'Создать регистр';
      } else {
        title = 'Редактировать регистр';
        const query = store.getters['filter/filterQuery'];
        query.id = route.params.registerId;
        await store.dispatch('registers/get', query);
      }

      pushToLinks(['/registers'], ['Регистры пациентов']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'Registers');
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(register, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('registers', register.value, next);
    };

    return {
      form,
      register,
      links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
