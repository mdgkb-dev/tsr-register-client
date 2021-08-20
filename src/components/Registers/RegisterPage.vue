<template>
  <div v-if="mount" class="wrapper">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row>
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
          <el-collapse-item>
            <template #title><h2 class="collapseHeader">Группы</h2></template>
            <RegisterGroupForm />
          </el-collapse-item>
          <el-collapse-item>
            <template #title><h2 class="collapseHeader">Диагнозы</h2></template>
            <MkbForm v-model:diagnosisData="register.registerDiagnosis" />
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Register from '@/classes/registers/Register';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import PageHead from '@/components/PageHead.vue';
import RegisterGroupForm from '@/components/Registers/RegisterGroupForm.vue';
import IRegister from '@/interfaces/registers/IRegister';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterPage',
  components: {
    PageHead,
    RegisterGroupForm,
    MkbForm,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const register: Ref<IRegister> = computed(() => store.getters['registers/register']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.registerId);
    const mount: Ref<boolean> = ref(false);
    const rules = { name: [{ required: true, message: 'Необходимо заполнить название регистра', trigger: 'blur' }] };
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.registerId) {
        store.commit('registers/set', new Register());
        title.value = 'Создать регистр';
      } else {
        title.value = 'Редактировать регистр';
        await store.dispatch('registers/get', route.params.registerId);
      }

      pushToLinks(['/registers'], ['Регистры пациентов']);
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
      title,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
