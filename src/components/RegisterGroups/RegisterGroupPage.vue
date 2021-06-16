<template>
  <PageHead :titleParent="'Группы для регистров'" :title="title" @submitForm="submitForm" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form v-if="mount" ref="form" label-width="150px" label-position="left" style="max-width: 800px">
        <el-form-item label="Название группы">
          <el-input v-model="registerGroup.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';
import RegisterGroup from '@/classes/registers/RegisterGroup';

import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

@Options({
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('registerGroups', ['registerGroup']),
  },
  methods: {
    ...mapActions({
      registerGroupGet: 'registerGroups/get',
    }),
  },
})
export default class RegisterGroupPage extends Vue {
  // Types.
  isEditMode!: boolean;
  registerGroup: IRegisterGroup = new RegisterGroup();
  $message!: any;

  // Local state.
  registerGroupGet!: (registerId: string) => Promise<void>;
  title = '';
  mount = false;

  async created(): Promise<void> {
    if (!this.$route.params.registerGroupId) {
      this.isEditMode = false;
      this.title = 'Создать группу';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать группу';
      await this.registerGroupGet(`${this.$route.params.registerGroupId}`);
      this.registerGroup = this.$store.getters['registerGroups/registerGroup'];
    }
    this.mount = true;
  }

  // addRegisterGroup(): void {
  //   const registerGroup = new RegisterGroup();
  //   this.registerGroup.registerGroups.push(registerGroup);
  // }

  async submitForm(): Promise<void> {
    try {
      if (this.isEditMode) {
        this.$store.dispatch('registerGroups/edit', this.registerGroup);
      } else {
        this.$store.dispatch('registerGroups/create', this.registerGroup);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    await this.$router.push('/register-groups');
  }
}
</script>
