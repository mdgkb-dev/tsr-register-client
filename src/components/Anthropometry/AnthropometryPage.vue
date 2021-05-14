<template>
  <el-form ref="form" :model="anthropometry" @submit.prevent="submitForm" label-width="120px" :rules="rules">
    <el-form-item label="Название параметра" label-width="20vw" prop="name">
      <el-input v-model="anthropometry.name"></el-input>
    </el-form-item>

    <el-form-item label="Единицы измерения" label-width="20vw" prop="measure">
      <el-input v-model="anthropometry.measure"></el-input>
    </el-form-item>

    <div class="center-align">
      <el-button type="primary" native-type="submit">Сохранить</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import Anthropometry from '@/classes/anthropometry/Anthropometry';
import { mapActions, mapGetters } from 'vuex';
import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  computed: {
    ...mapGetters('anthropometry', ['anthropometry']),
  },
  methods: {
    ...mapActions({
      anthropometryGet: 'anthropometry/get',
    }),
  },
})
export default class AnthropometryPage extends Vue {
  $refs!: {
    form: any;
  };

  anthropometryGet!: (anthropometryId: string) => Promise<void>;

  isEditMode!: boolean;
  anthropometry: IAnthropometry = new Anthropometry();
  title = '';

  rules = {
    name: [
      {
        required: true,
        message: 'Пожалуйста, введите название параметра',
        trigger: 'blur',
      },
    ],
    measure: [
      {
        required: true,
        message: 'Пожалуйста, введите единицы измерения',
        trigger: 'blur',
      },
    ],
  };

  async created(): Promise<void> {
    if (!this.$route.params.anthropometryId) {
      this.isEditMode = false;
      this.title = 'Создать параметр';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать параметр';
      await this.anthropometryGet(`${this.$route.params.anthropometryId}`);
      this.anthropometry = this.$store.getters['anthropometry/anthropometry'];
    }
  }

  submitForm(): void {
    let validationResult = true;

    this.$refs.form.validate((valid: boolean) => {
      if (!valid) {
        validationResult = false;
        return false;
      }
      return true;
    });

    if (!validationResult) {
      return;
    }

    if (this.isEditMode) {
      this.$store.dispatch('anthropometry/edit', this.anthropometry);
    } else {
      this.$store.dispatch('anthropometry/create', this.anthropometry);
    }

    this.$router.push('/anthropometry');
  }
}
</script>
