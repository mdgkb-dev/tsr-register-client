<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :model="representativeType"
          :rules="rules"
          label-width="30%"
          label-position="left"
          style="max-width: 800px"
        >
          <el-form-item label="Представитель мужского пола" prop="parentMaleType">
            <el-input v-model="representativeType.parentMaleType"></el-input>
          </el-form-item>

          <el-form-item label="Представитель женского пола" prop="parentWomanType">
            <el-input v-model="representativeType.parentWomanType"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный мужского пола" prop="childMaleType">
            <el-input v-model="representativeType.childMaleType"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный женского пола" prop="childWomanType">
            <el-input v-model="representativeType.childWomanType"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RepresentativeType from '@/classes/representatives/RepresentativeType';
import RepresentativeTypeRules from '@/classes/representatives/RepresentativeTypeRules';
import MainHeader from '@/classes/shared/MainHeader';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RepresentativeTypePage',
  setup() {
    const store = useStore();
    const route = useRoute();

    const representativeType: Ref<IRepresentativeType> = ref(new RepresentativeType());
    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.representativeTypeId);
    const mount: Ref<boolean> = ref(false);
    const rules = RepresentativeTypeRules;

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.representativeTypeId) {
        store.commit('representativeTypes/set', new RepresentativeType());
        title = 'Создать тип';
      } else {
        title = 'Редактировать тип';
        await store.dispatch('representativeTypes/get', route.params.representativeTypeId);
        representativeType.value = store.getters['representativeTypes/representativeType'];
      }

      pushToLinks(['/representative-types'], ['Типы представителей']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      store.commit('main/setActiveMenu', 'RepresentativeTypes');
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(representativeType, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('representativeTypes', representativeType.value, next, 'representative-types');
    };

    return {
      representativeType,
      form,
      links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>
