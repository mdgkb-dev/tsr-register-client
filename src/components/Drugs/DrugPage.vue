<template>
  <div v-if="mount">
    <el-form ref="form" :inline-message="true" :status-icon="true" :model="drug" label-position="left" style="width: 100%">
      <el-row>
        <div class="table-background" style="width: 100%; margin-bottom: 20px">
          <el-form-item
            label="Наименование лекарства"
            prop="name"
            :rules="{ required: true, message: 'Пожалуйста укажите название лекартсва', trigger: 'blur' }"
          >
            <el-input v-model="drug.name"></el-input>
          </el-form-item>
        </div>
        <el-form ref="newDrugRegimenForm" class="new-regimen-container" :model="newDrugRegimen">
          <el-form-item
            style="width: 100%; margin-right: 10px"
            prop="name"
            :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }"
          >
            <el-input v-model="newDrugRegimen.name" placeholder="Название схемы приема лекартсва"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDrugRegimen">Добавить</el-button>
          </el-form-item>
        </el-form>
        <DrugRegimensForm />
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import DrugRegimen from '@/classes/drugs/DrugRegimen';
import MainHeader from '@/classes/shared/MainHeader';
import DrugRegimensForm from '@/components/Drugs/DrugRegimensForm.vue';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'DrugPage',
  components: { DrugRegimensForm },

  setup() {
    const store = useStore();
    const route = useRoute();

    const drug: Ref<IDrug> = computed(() => store.getters['drugs/drug']);
    const form = ref();
    const newDrugRegimenForm = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.drugId);
    const mount: Ref<boolean> = ref(false);
    const newDrugRegimen: Ref<IDrugRegimen> = ref(new DrugRegimen());

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate, validateWithoutMessageBox } = useValidate();

    const addDrugRegimen = (): void => {
      if (!validateWithoutMessageBox(newDrugRegimenForm.value)) {
        return;
      }
      drug.value.addDrugRegimen(newDrugRegimen.value);
      newDrugRegimen.value.drugRegimenBlocks[0].editDrugRegimenBlock(true);
      newDrugRegimen.value = new DrugRegimen();
      store.commit('drugs/setActiveCollapseName', String(drug.value.drugRegimens.length - 1));
    };

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.drugId) {
        store.commit('drugs/set', new Drug());
        title = 'Добавить лекарство';
      } else {
        await store.dispatch('drugs/get', route.params.drugId);
        title = drug.value.name;
      }

      pushToLinks(['/drugs'], ['Список лекарств']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(drug, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) {
        return;
      }
      store.commit('drugs/updateOrder');
      await submitHandling('drugs', drug.value, next, 'drugs');
    };

    return {
      drug,
      form,
      mount,
      newDrugRegimen,
      newDrugRegimenForm,
      addDrugRegimen,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.new-regimen-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
