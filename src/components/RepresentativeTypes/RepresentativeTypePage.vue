<template>
  <el-form ref="form" :model="representativeType" @submit.prevent="submitForm" :rules="rules">
    <el-form-item label="Название типа" label-width="20vw" prop="name">
      <el-input v-model="representativeType.name"></el-input>
    </el-form-item>

    <el-form-item label="Подопечный мужского пола" label-width="20vw" prop="name">
      <el-input v-model="representativeType.childMaleType"></el-input>
    </el-form-item>

    <el-form-item label="Подопечный женского пола" label-width="20vw" prop="name">
      <el-input v-model="representativeType.childWomanType"></el-input>
    </el-form-item>
    <div class="center-align">
      <el-button type="primary" native-type="submit">Сохранить</el-button>
    </div>
  </el-form>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import { mapActions, mapGetters } from 'vuex';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import RepresentativeType from '@/classes/representatives/RepresentativeType';
import RepresentativeTypeRules from '@/classes/representatives/RepresentativeTypeRules';

@Options({
  computed: {
    ...mapGetters('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions({
      representativeTypeGet: 'representativeTypes/get',
    }),
  },
})
export default class RepresentativeTypePage extends Vue {
  $refs!: {
    form: any;
    message: any;
  };

  $message!: any;

  representativeTypeGet!: (representativeTypeId: string) => Promise<void>;

  isEditMode!: boolean;
  representativeType: IRepresentativeType = new RepresentativeType();
  title = '';

  rules = RepresentativeTypeRules;

  async created(): Promise<void> {
    if (!this.$route.params.representativeTypeId) {
      this.isEditMode = false;
      this.title = 'Создать компанию';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать компанию';
      await this.representativeTypeGet(`${this.$route.params.representativeTypeId}`);
      this.representativeType = this.$store.getters['representativeTypes/representativeType'];
    }
  }

  submitForm(): void {
    let validationResult = true;

    this.$refs.form.validate((valid: boolean, errorFields: any) => {
      let errorMessage = '<strong>Проверьте правильность введенных данных:</strong><ul>';
      for (const item of Object.keys(errorFields)) {
        errorMessage += `<li>${errorFields[item][0].message}</li>`;
      }
      errorMessage += '</ul>';
      if (!valid) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: errorMessage,
          type: 'error',
        });
        validationResult = false;
        return false;
      }
      this.$message({
        message: 'Изменения успешно сохранены',
        type: 'success',
      });
      return true;
    });

    if (!validationResult) {
      return;
    }

    if (this.isEditMode) {
      this.$store.dispatch('representativeTypes/edit', this.representativeType);
    } else {
      this.$store.dispatch('representativeTypes/create', this.representativeType);
    }

    this.$router.push('/representative-types');
  }
}
</script>
