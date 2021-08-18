<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" :show-save-button="true" @submitForm="submitForm" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="registerGroup"
          label-width="20%"
          label-position="left"
          :rules="rules"
        >
          <el-form-item label="Название группы" prop="name">
            <el-input v-model="registerGroup.name"></el-input>
          </el-form-item>
          <RegisterPropertyForm
            :in-register-property-to-register-group="registerGroup.registerPropertyToRegisterGroup"
            :in-register-property-options="registerProperties"
          />
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import RegisterGroup from '@/classes/registers/RegisterGroup';
import PageHead from '@/components/PageHead.vue';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'RegisterGroupPage',
  components: {
    PageHead,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const registerGroup: Ref<IRegisterProperty> = computed(() => store.getters['registerGroups/registerGroup']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);
    const rules = {
      name: [{ required: true, message: 'Необходимо указать название группы', trigger: 'blur' }],
    };
    const title: Ref<string> = ref('');

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate } = useValidate();

    onBeforeMount(async () => {
      if (!route.params.registerGroupId) {
        isEditMode.value = false;
        store.commit('registerGroups/set', new RegisterGroup());
        title.value = 'Создать группу';
      } else {
        isEditMode.value = true;
        title.value = 'Редактировать группу';
        await store.dispatch('registerGroups/get', route.params.registerGroupId);
      }

      pushToLinks(['/register-groups'], ['Группы для регистров']);
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(registerGroup, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;
      await submitHandling('registerGroups', registerGroup.value, next, 'register-groups');
    };

    return {
      registerGroup,
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
