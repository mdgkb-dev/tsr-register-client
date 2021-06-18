<template>
  <PageHead :titleParent="'Свойства для регистров'" :title="title" @submitForm="submitForm" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <el-form v-if="mount" ref="form" label-width="150px" label-position="left" style="max-width: 800px">
        <el-form-item label="Название свойства">
          <el-input v-model="registerProperty.name"></el-input>
        </el-form-item>
        <el-form-item label="Тип данных">
          <el-select v-model="registerProperty.valueTypeId">
            <el-option v-for="item in valueTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapActions, mapGetters } from 'vuex';

import PageHead from '@/components/PageHead.vue';

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IValueType from '@/interfaces/valueTypes/IValueType';
import RegisterProperty from '@/classes/registers/RegisterProperty';

@Options({
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
export default class RegisterPropertyPage extends Vue {
  // Types.
  isEditMode!: boolean;
  $message!: any;

  registerPropertyGet!: (registerId: string) => Promise<void>;
  getValueTypes!: () => Promise<void>;

  // Local state.
  registerProperty: IRegisterProperty = new RegisterProperty();
  valueTypes!: IValueType[];
  title = '';
  mount = false;

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
    await this.getValueTypes();
    this.valueTypes = this.$store.getters['registerProperties/valueTypes'];
    this.mount = true;
  }

  async submitForm(): Promise<void> {
    try {
      if (this.isEditMode) {
        this.$store.dispatch('registerProperties/edit', this.registerProperty);
      } else {
        this.$store.dispatch('registerProperties/create', this.registerProperty);
      }
    } catch (e) {
      this.$message.error(e.toString());
      return;
    }
    await this.$router.push('/register-properties');
  }
}
</script>
