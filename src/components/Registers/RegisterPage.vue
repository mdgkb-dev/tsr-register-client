<template>
  <PageHead :titleParent="'Регистры пациентов'" :title="title" @submitForm="submitForm" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form v-if="mount" ref="form" label-width="20%" label-position="left" style="max-width: 800px">
        <el-form-item label="Название регистра">
          <el-input v-model="register.name"></el-input>
        </el-form-item>
        <RegisterGroupToRegisterForm :inRegisterGroupToRegister="register.registerGroupToRegister" :inRegisterGroupOptions="registerGroups" />
      </el-form>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import Register from '@/classes/registers/Register';
import RegisterGroupToRegisterForm from '@/components/Registers/RegisterGroupToRegisterForm.vue';

import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

@Options({
  components: {
    PageHead,
    RegisterGroupToRegisterForm,
  },
  computed: {
    ...mapGetters('registers', ['register']),
    ...mapGetters('registerGroups', ['registerGroup']),
  },
  methods: {
    ...mapActions({
      registerGet: 'registers/get',
      registerGroupsGetAll: 'registerGroups/getAll',
    }),
  },
})
export default class RegisterPage extends Vue {
  // Types.
  isEditMode!: boolean;
  $message!: any;
  registerGroups!: IRegisterGroup[];

  registerGet!: (registerId: string) => Promise<void>;
  registerGroupsGetAll!: () => Promise<void>;

  // Local state.
  register: IRegister = new Register();
  title = '';
  mount = false;

  async created(): Promise<void> {
    try {
      if (!this.$route.params.registerId) {
        this.isEditMode = false;
        this.title = 'Создать регистр';
      } else {
        this.isEditMode = true;
        this.title = 'Редактировать регистр';
        await this.registerGet(`${this.$route.params.registerId}`);
        this.register = this.$store.getters['registers/register'];
      }

      await this.registerGroupsGetAll();
      this.registerGroups = this.$store.getters['registerGroups/registerGroups'];

      this.mount = true;
    } catch (e) {
      console.log(e);
    }
  }

  async submitForm(): Promise<void> {
    try {
      if (this.isEditMode) {
        this.$store.dispatch('registers/edit', this.register);
      } else {
        console.log('this.register', this.register);
        this.$store.dispatch('registers/create', this.register);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    await this.$router.push('/registers');
  }
}
</script>
