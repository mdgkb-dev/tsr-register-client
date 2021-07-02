<template>
  <el-row>
    <el-col :span="8">
      <h2 class="header-top-table">Пользователи <i class="el-icon-arrow-right"> </i> Профиль</h2>
    </el-col>
    <el-col :span="3" :offset="11" style="margin-top: 8px" align="right">
      <el-button type="success" round native-type="submit" @click="submitForm()">Сохранить изменения</el-button>
    </el-col>
  </el-row>
  <el-row v-if="mount"><PageInfo :human="user.human"/></el-row>
  <el-row>
    <div class="table-background" style="width: 100%; height: 100%">
      <el-collapse>
        <el-form ref="form" :model="user" :rules="rules" @submit.prevent="submitForm" label-width="20%" label-position="left">
          <div v-if="mount">
            <el-collapse-item>
              <template #title><h2 class="collapseHeader">Паспортные данные</h2></template>
              <HumanForm :human="user.human" />
            </el-collapse-item>
          </div>
        </el-form>
      </el-collapse>
    </div>
  </el-row>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import HumanRules from '@/classes/humans/HumanRules';
import User from '@/classes/user/User';
import HumanForm from '@/components/HumanForm.vue';
import PageInfo from '@/components/Users/PageInfo.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';

@Options({
  name: 'UserPage',
  components: {
    PageInfo,
    HumanForm,
  },
  computed: {
    ...mapGetters('users', ['user']),
  },
  methods: {
    ...mapActions({
      userGet: 'users/get',
    }),
  },
})
export default class UserPage extends mixins(ConfirmLeavePage) {
  // Types.
  // Local state.
  rules = {
    human: HumanRules,
  };

  isEditMode!: boolean;
  userGet!: (userId: string) => Promise<void>;
  user = new User();
  title = '';
  mount = false;

  // Lifecycle methods.
  async mounted(): Promise<void> {
    if (!this.$route.params.userId) {
      this.isEditMode = false;
      this.title = 'Создать юзера';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать юзера';
      await this.userGet(`${this.$route.params.userId}`);
      this.user = this.$store.getters['users/user'];
    }
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('user', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: any, from: any, next: any) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  async submitForm(): Promise<void> {
    this.saveButtonClick = true;
    try {
      if (this.isEditMode) {
        await this.$store.dispatch('users/edit', this.user);
      } else {
        await this.$store.dispatch('users/create', this.user);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }

    await this.$router.push('/users');
  }
}
</script>
