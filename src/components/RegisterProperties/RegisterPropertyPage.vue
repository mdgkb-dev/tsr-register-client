<template>
  <div v-if="mount">
    <PageHead :title="title" :links="links" @submitForm="submitForm" :showSaveButton="true" />
    <el-row>
      <div class="table-background" style="width: 100%; margin-bottom: 20px">
        <el-form :status-icon="true" :inline-message="true" :model="registerProperty" :rules="rules" ref="form" label-width="150px" label-position="left" style="max-width: 800px">
          <el-form-item label="Название свойства" prop="name">
            <el-input v-model="registerProperty.name"></el-input>
          </el-form-item>
          <el-form-item label="Тип данных" prop="valueTypeId">
            <el-select @change="changeRelation" v-model="registerProperty.valueTypeId">
              <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>

          <div v-if="showSet">
            <el-button @click="addSetItem" style="margin-bottom: 20px">Добавить в набор свойства</el-button>
            <el-row v-for="(item, i) in registerProperty.registerPropertySet" :key="i">
              <el-col :span="20">
                <el-form-item>
                  <el-input placeholder="Please input" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="2">
                <el-button @click.prevent="removeSetItem(i)">Удалить поле</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="showRadio">
            <el-button @click="addRadioItem" style="margin-bottom: 20px">Добавить в набор свойства</el-button>
            <el-row v-for="(item, i) in registerProperty.registerPropertyRadio" :key="i">
              <el-col :span="20">
                <el-form-item>
                  <el-input placeholder="Please input" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="2">
                <el-button @click.prevent="removeRadioItem(i)">Удалить поле</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { mapActions, mapGetters } from 'vuex';

import RegisterProperty from '@/classes/registers/RegisterProperty';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import PageHead from '@/components/PageHead.vue';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import ValueRelation from '@/interfaces/valueTypes/ValueRelation';
import BreadCrumbsLinks from '@/mixins/BreadCrumbsLinks.vue';
import ConfirmLeavePage from '@/mixins/ConfirmLeavePage.vue';
import FormMixin from '@/mixins/FormMixin.vue';
import ValidateMixin from '@/mixins/ValidateMixin.vue';

@Options({
  name: 'RegisterPropertyPage',
  components: {
    PageHead,
  },
  computed: {
    ...mapGetters('registerProperties', ['registerProperty']),
    ...mapGetters('registerProperties', ['valueTypes']),
  },
  methods: {
    ...mapActions({
      registerPropertyGet: 'registerProperties/get',
      getValueTypes: 'registerProperties/getValueTypes',
    }),
  },
})
export default class RegisterPropertyPage extends mixins(ValidateMixin, ConfirmLeavePage, FormMixin, BreadCrumbsLinks) {
  // Types.
  valueTypes!: IValueType[];

  registerPropertyGet!: (registerId: string) => Promise<void>;
  getValueTypes!: () => Promise<void>;

  // Local state.
  registerProperty: IRegisterProperty = new RegisterProperty();
  title = '';
  mount = false;
  showSet = false;
  showRadio = false;

  rules = {
    name: [{ required: true, message: 'Необходимо заполнить название свойства', trigger: 'blur' }],
    valueTypeId: [{ required: true, message: 'Необходимо выбрать тип данных', trigger: 'change' }],
  };

  // Lifecycle methods.
  async created(): Promise<void> {
    if (!this.$route.params.registerPropertyId) {
      this.isEditMode = false;
      this.title = 'Создать свойство';
    } else {
      this.isEditMode = true;
      this.title = 'Редактировать свойство';
      await this.registerPropertyGet(`${this.$route.params.registerPropertyId}`);
      this.registerProperty = this.$store.getters['registerProperties/registerProperty'];
    }
    if (this.registerProperty.valueTypeId) this.changeRelation(this.registerProperty.valueTypeId);
    await this.getValueTypes();
    this.valueTypes = this.$store.getters['registerProperties/valueTypes'];

    this.pushToLinks(['/register-properties'], ['Свойства для регистров']);
    this.mount = true;

    window.addEventListener('beforeunload', this.beforeWindowUnload);
    this.$watch('registerProperty', this.formUpdated, { deep: true });
  }

  beforeRouteLeave(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    this.showConfirmModal(this.submitForm, next);
  }

  // Methods.
  changeRelation(valueTypeId: string): void {
    const valueType = this.valueTypes.find((i) => i.id === valueTypeId);
    if (valueType) {
      if (valueType.valueRelation === ValueRelation.manyToMany) {
        this.showSet = true;
        this.showRadio = false;
      }
      if (valueType.valueRelation === ValueRelation.oneToMany) {
        this.showRadio = true;
        this.showSet = false;
      }
      if (valueType.valueRelation === ValueRelation.simple) {
        this.showRadio = false;
        this.showSet = false;
      }
    }
  }

  addSetItem(): void {
    this.registerProperty.registerPropertySet.push(new RegisterPropertySet());
  }
  addRadioItem(): void {
    this.registerProperty.registerPropertyRadio.push(new RegisterPropertyRadio());
  }
  removeSetItem(i: number): void {
    this.registerProperty.registerPropertySet.splice(i, 1);
  }
  removeRadioItem(i: number): void {
    this.registerProperty.registerPropertyRadio.splice(i, 1);
  }
  async submitForm(next?: NavigationGuardNext): Promise<void> {
    this.saveButtonClick = true;
    if (!this.validate(this.$refs.form)) return;

    await this.submitHandling('registerProperties', this.registerProperty, next, 'register-properties');
  }
}
</script>
