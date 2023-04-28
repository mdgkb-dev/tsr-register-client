<template>
  <div v-if="mounted" class="representative-page-container">
    <el-row>
      <RepresentativePageInfo :representative="representative" />
    </el-row>
    <el-row>
      <el-collapse>
        <el-form
          ref="form"
          :status-icon="true"
          :inline-message="true"
          :model="representative"
          label-width="150px"
          :rules="rules"
          @submit.prevent="submitForm"
        >
          <!--          <div>-->
          <el-collapse-item>
            <template #title>
              <h2 class="collapseHeader">Паспортные данные</h2>
            </template>
            <HumanForm store-name="representatives" :addresses="representative.getChildrenAddresses()" />
          </el-collapse-item>
          <!--          <el-collapse-item>-->
          <!--            <template #title>-->
          <!--              <h2 class="collapseHeader">Документы</h2>-->
          <!--            </template>-->
          <!--            <DocumentForm :store-module="'representatives'" />-->
          <!--          </el-collapse-item>-->
          <el-collapse-item>
            <template #title>
              <h2 class="collapseHeader">Подопечные</h2>
            </template>
            <RepresentativeToPatientForm :representative="representative" />
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

import Representative from '@/classes/Representative';
import RepresentativeRules from '@/classes/RepresentativeRules';
// import DocumentForm from '@/components/admin/Patients/DocumentForm.vue';
import RepresentativePageInfo from '@/components/admin/Representatives/RepresentativePageInfo.vue';
import RepresentativeToPatientForm from '@/components/admin/Representatives/RepresentativeToPatientForm.vue';
import HumanForm from '@/components/HumanForm.vue';
import Hooks from '@/services/Hooks/Hooks';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AdminRepresentativePage',
  components: {
    HumanForm,
    // DocumentForm,
    RepresentativeToPatientForm,
    RepresentativePageInfo,
  },
  setup() {
    const representative: Ref<Representative> = computed(() => Provider.store.getters['representatives/item']);

    const form = ref();
    const isEditMode: Ref<boolean> = ref(!!Provider.route().params.representativeId);
    const rules = RepresentativeRules;

    const load = async () => {
      await Provider.loadItem();
    };
    Hooks.onBeforeMount(load, {
      adminHeader: {
        title: computed(() => (Provider.route().params['id'] ? representative.value?.human?.getFullName() : 'Добавить представителя')),
        showBackButton: true,
        buttons: [{ action: Hooks.submit() }],
      },
    });
    Hooks.onBeforeRouteLeave();

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      // saveButtonClick.value = true;
      // if (!(await validate(form.value))) {
      //   return;
      // }
      // await submitHandling('representatives', representative.value, next);
    };

    return {
      representative,
      form,
      isEditMode,
      // links,
      mounted: Provider.mounted,
      rules,
      submitForm,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
}
</style>
