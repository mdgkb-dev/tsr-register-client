<template>
  <div v-if="mount" class="wrapper">
    <el-form
      ref="form"
      :status-icon="true"
      :inline-message="true"
      :rules="rules"
      :model="register"
      label-position="top"
      style="width: 100%"
    >
      <div class="table-background" style="margin-bottom: 20px; height: unset">
        <el-form-item label="Название регистра" prop="name">
          <el-input v-model="register.name"></el-input>
        </el-form-item>
      </div>
      <el-form ref="newRegisterGroupForm" class="new-register-group-container" :model="newRegisterGroup">
        <el-form-item
          style="width: 100%; margin-right: 10px"
          prop="name"
          :rules="{ required: true, message: 'Пожалуйста укажите название группы', trigger: 'blur' }"
        >
          <el-input v-model="newRegisterGroup.name" placeholder="Название группы"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addRegisterGroup">Добавить группу</el-button>
        </el-form-item>
      </el-form>
      <el-collapse v-model="activeCollapseName" accordion @change="changeCollapseHadler">
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
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Register from '@/classes/Register';
import Research from '@/classes/Research';
import MainHeader from '@/classes/shared/MainHeader';
import RegisterGroupForm from '@/components/admin/Registers/RegisterGroupForm.vue';
import MkbForm from '@/components/Mkb/MkbForm.vue';
import IRegister from '@/interfaces/IRegister';
import IRegisterGroup from '@/interfaces/IRegisterGroup';

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
    const newRegisterGroup: Ref<IRegisterGroup> = ref(new Research());
    const newRegisterGroupForm = ref();
    const activeCollapseName: ComputedRef<string> = computed(() => store.getters['registers/activeCollapseName']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.registerId);
    const mount: Ref<boolean> = ref(false);
    const rules = { name: [{ required: true, message: 'Необходимо заполнить название регистра', trigger: 'blur' }] };

    // const { links, pushToLinks } = useBreadCrumbsLinks();
    // const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    // const { submitHandling } = useForm(isEditMode.value);
    // const { validate, validateWithoutMessageBox } = useValidate();

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

      // pushToLinks(['/registers'], ['Регистры пациентов']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'Registers');
      mount.value = true;

      // window.addEventListener('beforeunload', beforeWindowUnload);
      // watch(register, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      // showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!validate(form.value)) return;
      //
      // await submitHandling('registers', register.value, next);
    };

    const addRegisterGroup = () => {
      // if (!validateWithoutMessageBox(newRegisterGroupForm.value)) {
      //   return;
      // }
      register.value.addRegisterGroup(newRegisterGroup.value);
      newRegisterGroup.value = new Research();
      store.commit('registers/setActiveCollapseName', String(register.value.registerGroups.length - 1));
    };

    const changeCollapseHadler = (name: string) => {
      // const activeCollapse = document.getElementById(`collapse-${name}`);
      // const pageContainer = document.querySelector('.page-container');
      // if (!activeCollapse || !pageContainer) return;
      // activeCollapse.scrollIntoView()
      // console.log('pageContainer', pageContainer);
      // pageContainer.scrollTo(0, activeCollapse.offsetTop);
    };

    return {
      form,
      register,
      mount,
      rules,
      submitForm,
      newRegisterGroup,
      newRegisterGroupForm,
      addRegisterGroup,
      activeCollapseName,
      changeCollapseHadler,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.new-register-group-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
