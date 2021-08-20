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
          <el-form-item label="Название типа" prop="name">
            <el-input v-model="representativeType.name"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный мужского пола" prop="childMaleType">
            <el-input v-model="representativeType.childMaleType"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный женского пола" prop="childWomanType">
            <el-input v-model="representativeType.childWomanType"></el-input>
          </el-form-item>

          <el-form-item label="Пол" prop="isMale">
            <el-select v-model="representativeType.isMale" placeholder="Выберите пол">
              <el-option label="Мужчина" :value="true"></el-option>
              <el-option label="Женщина" :value="false"></el-option>
            </el-select>
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
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = RepresentativeTypeRules;

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.representativeTypeId) {
        isEditMode.value = false;
        store.commit('representativeTypes/set', new RepresentativeType());
        title = 'Создать тип';
      } else {
        isEditMode.value = true;
        title = 'Редактировать тип';
        await store.dispatch('representativeTypes/get', route.params.representativeTypeId);
        representativeType.value = store.getters['representativeTypes/representativeType'];
      }

      pushToLinks(['/representative-types'], ['Типы представителей']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
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

      await submitHandling('representativeTypes', representativeType.value, next);
    };

    return {
      representativeType,
      form,
      isEditMode,
      links,
      mount,
      rules,
      submitForm,
    };
  },
});
</script>
