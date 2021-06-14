<template>
  <div class="register-page-container">
    <PageHead :titleParent="'Регистры пациентов'" :title="title" @submitForm="submitForm" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form ref="form" label-width="20%" label-position="left">
          <el-form-item label="Название регистра">
            <el-input v-model="register.name"></el-input>
          </el-form-item>
          <!-- <el-button>Добавить группу</el-button> -->
          <!-- <el-collapse>
            <el-collapse-item>
              <template #title>
                <el-form-item label="Название группы" label-width="200px" label-position="left"> <el-input></el-input> </el-form-item>
              </template>
              <div class="form-under-collapse">
                <el-button>Добавить поле</el-button>
              </div>
            </el-collapse-item>
          </el-collapse> -->
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import Register from '@/classes/registers/Register';
import IRegister from '@/interfaces/registers/IRegister';

@Options({
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('registers', ['register']),
  },
  methods: {
    ...mapActions({
      registerGet: 'registers/get',
    }),
  },
})
export default class RegisterPage extends Vue {
  // Types.
  isEditMode!: boolean;
  register: IRegister = new Register();
  $message!: any;

  // Local state.
  registerGet!: (registerId: string) => Promise<void>;
  title = '';
  mount = false;

  async created(): Promise<void> {
    if (!this.$route.params.registerId) {
      this.isEditMode = false;
      this.title = 'Создать регистр';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать регистр';
      await this.registerGet(`${this.$route.params.registerId}`);
      this.register = this.$store.getters['registers/register'];
    }
    this.mount = true;
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

<style lang="scss" scoped>
.register-page-container:deep {
  @import '@/assets/elements/patientAndRepresPage.scss';
}
</style>
