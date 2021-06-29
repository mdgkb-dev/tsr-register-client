<template>
  <PageHead :titleParent="'Типы представителей'" :title="title" :link="'/representative-types'" @submitForm="submitForm" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form ref="form" :model="representativeType" :rules="rules" label-width="30%" label-position="left" style="max-width: 800px">
        <el-form-item label="Название типа" prop="name">
          <el-input v-model="representativeType.name"></el-input>
        </el-form-item>

        <el-form-item label="Подопечный мужского пола" prop="name">
          <el-input v-model="representativeType.childMaleType"></el-input>
        </el-form-item>

        <el-form-item label="Подопечный женского пола" prop="name">
          <el-input v-model="representativeType.childWomanType"></el-input>
        </el-form-item>

        <el-form-item label="Пол" prop="isMale">
          <el-select v-model="representativeType.isMale" placeholder="Выберите пол">
            <el-option label="Мужчина" :value="true"></el-option>
            <el-option label="Женщина" :value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import RepresentativeType from '@/classes/representatives/RepresentativeType';
import RepresentativeTypeRules from '@/classes/representatives/RepresentativeTypeRules';
import PageHead from '@/components/PageHead.vue';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('representativeTypes', ['representativeTypes']),
  },
  methods: {
    ...mapActions({
      representativeTypeGet: 'representativeTypes/get',
    }),
  },
})
export default class RepresentativeTypePage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin) {
  representativeTypeGet!: (representativeTypeId: string) => Promise<void>;

  representativeType: IRepresentativeType = new RepresentativeType();
  title = '';

  rules = RepresentativeTypeRules;

  async created(): Promise<void> {
    if (!this.$route.params.representativeTypeId) {
      this.isEditMode = false;
      this.title = 'Создать тип';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать тип';
      await this.representativeTypeGet(`${this.$route.params.representativeTypeId}`);
      this.representativeType = this.$store.getters['representativeTypes/representativeType'];
    }
  }

  submitForm(): void {
    if (!this.validate(this.$refs.form)) return;

    if (this.isEditMode) {
      this.$store.dispatch('representativeTypes/edit', this.representativeType);
    } else {
      this.$store.dispatch('representativeTypes/create', this.representativeType);
    }

    this.$router.push('/representative-types');
  }
}
</script>
