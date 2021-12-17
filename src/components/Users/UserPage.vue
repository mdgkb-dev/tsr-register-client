<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">Пользователи <i class="el-icon-arrow-right"> </i> Профиль</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-button type="success" round native-type="submit" @click="submitForm">Сохранить изменения</el-button>
    </el-col>
  </el-row>
  <!--  <el-row v-if="mount">-->
  <!--    <PageInfo :human="user.human" />-->
  <!--  </el-row>-->
  {{ user.registersUsers }}
  <el-checkbox v-for="register in registers" :key="register.id" :label="register.id" @change="user.addRegister($event, register.id)">{{
    register.name
  }}</el-checkbox>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import HumanRules from '@/classes/humans/HumanRules';
import MainHeader from '@/classes/shared/MainHeader';
import User from '@/classes/user/User';
import IRegister from '@/interfaces/registers/IRegister';
import IUser from '@/interfaces/users/IUser';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'UserPage',
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const isEditMode: Ref<boolean> = ref(false);
    const mount: Ref<boolean> = ref(false);

    const registers: Ref<IRegister[]> = computed(() => store.getters['registers/registers']);

    const rules: ComputedRef = computed(() => {
      return { human: HumanRules };
    });
    const user: ComputedRef<IUser> = computed(() => store.getters['users/user']);

    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { links, pushToLinks } = useBreadCrumbsLinks();

    onBeforeMount(async (): Promise<void> => {
      let title: string;
      if (!route.params.userId) {
        isEditMode.value = false;
        store.commit('users/set', new User());
        title = 'Создать пользователя';
      } else {
        isEditMode.value = true;
        title = 'Редактировать пользователя';
        await store.dispatch('users/get', route.params.userId);
      }

      pushToLinks(['/users'], ['Список пользователей']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      await store.dispatch('registers/getAll');

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(user, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (): Promise<void> => {
      saveButtonClick.value = true;

      try {
        if (isEditMode.value) {
          await store.dispatch('users/edit', user.value);
        } else {
          await store.dispatch('users/create', user.value);
        }
      } catch (e) {
        if (!ElMessage.error) {
          return;
        }
        ElMessage.error(String(e));
        return;
      }

      await router.push('/users');
    };

    return {
      registers,
      mount,
      rules,
      user,
      submitForm,
    };
  },
});
</script>
