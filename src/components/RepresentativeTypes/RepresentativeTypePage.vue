<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          :status-icon="true"
          ref="form"
          :model="representativeType"
          :rules="rules"
          label-width="30%"
          label-position="left"
          style="max-width: 800px"
        >
          <el-form-item label="Название типа" prop="name">
            <el-input v-model="representativeType.name"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный мужского пола" prop="genderType">
            <el-input v-model="representativeType.childMaleType"></el-input>
          </el-form-item>

          <el-form-item label="Подопечный женского пола" prop="genderType">
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
import { mixins, Options } from 'vue-class-component';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { mapActions, mapGetters, useStore } from 'vuex';

import RepresentativeType from '@/classes/representatives/RepresentativeType';
import RepresentativeTypeRules from '@/classes/representatives/RepresentativeTypeRules';
import PageHead from '@/components/PageHead.vue';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';
import { defineComponent, onBeforeMount, ref, Ref, watch } from 'vue';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import Anthropometry from '@/classes/anthropometry/Anthropometry';
import AnthropometryRules from '@/classes/anthropometry/AnthropometryRules';

export default defineComponent({
  name: 'RepresentativeTypePage',
  components: {
    PageHead,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const representativeType: Ref<IRepresentativeType> = ref(new RepresentativeType());
    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = AnthropometryRules;
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.representativeTypeId) {
        isEditMode.value = false;
        title.value = 'Создать тип';
      } else {
        isEditMode.value = true;
        title.value = 'Редактировать тип';
        await store.dispatch('representativeTypes/get', route.params.representativeTypeId);
        representativeType.value = store.getters['representativeTypes/representativeType'];
      }

      pushToLinks(['/representative-types'], ['Типы представителей']);
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
      title,
      submitForm,
    };
  },
});
</script>
