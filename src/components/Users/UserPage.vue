<template>
  <div v-if="mount">
    <el-row>
      <div class="table-background" style="width: 100%">
        <b>Логин: </b>
        <span>{{ user.login }}</span>
      </div>
    </el-row>

    <el-row>
      <el-collapse>
        <el-collapse-item>
          <template #title><h2 class="collapseHeader">Регистры</h2></template>

          <el-table
            ref="tableRegisters"
            :default-sort="{ prop: 'id', order: 'ascending' }"
            :data="registers"
            class="table-shadow"
            header-row-class-name="header-style"
            border
          >
            <el-table-column prop="name" label="Название регистра" min-width="150">
              <template #default="scope">
                <el-checkbox :key="scope.row.id" :label="scope.row.id" @change="user.addRegister($event, scope.row.id)">
                  {{ scope.row.name }}
                </el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import HumanRules from '@/classes/humans/HumanRules';
import MainHeader from '@/classes/shared/MainHeader';
import User from '@/classes/User';
import IRegister from '@/interfaces/IRegister';
import IUser from '@/interfaces/IUser';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';

export default defineComponent({
  name: 'UserPage',
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

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>
