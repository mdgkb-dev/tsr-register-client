<template>
  <el-collapse-item>
    <template #title>
      <h2 class="collapseHeader">Группы</h2>
    </template>
    <el-button @click="register.addRegisterGroup()">Добавить группу </el-button>

    <div v-for="(registerGroup, i) in register.registerGroups" :key="i">
      <el-card>
        <el-button @click="register.removeRegisterGroup(i)">Удалить группу</el-button>
        <el-form-item label="Название группы" prop="name">
          <el-input v-model="registerGroup.name"></el-input>
        </el-form-item>

        <el-button @click="registerGroup.addRegisterProperty()">Добавить свойство</el-button>
        <RegisterPropertyForm :register-group="registerGroup" />
      </el-card>
    </div>
  </el-collapse-item>
</template>

<script lang="ts">
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import RegisterPropertyForm from '@/components/Registers/RegisterPropertyForm.vue';
import IRegister from '@/interfaces/registers/IRegister';

export default defineComponent({
  name: 'RegisterGroupForm',
  components: {
    RegisterPropertyForm,
  },
  setup() {
    const store = useStore();

    const register: Ref<IRegister> = computed<IRegister>(() => store.getters['registers/item']);

    return {
      register,
    };
  },
});
</script>
