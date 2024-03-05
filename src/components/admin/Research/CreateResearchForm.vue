<template>
  <el-form>
    <div>
      <InfoItem title="название" icon="edit-title" :with-open-window="false" :with-hover="false" border-color="#ffffff" base-box-margin="0 0 15px 0" padding="0" width="100%">
        <el-form-item style="width: 100%" prop="surname">
          <el-input v-model="research.name" />
        </el-form-item>
      </InfoItem>
      <Button button-class="save-button" text="Создать" @click="create" />
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue';

import Research from '@/classes/Research';
import Provider from '@/services/Provider/Provider';

const showSnilsForm: Ref<boolean> = ref(true);
const research: Ref<Research> = ref(Research.Create());
const mounted = ref(false);
const emits = defineEmits(['add']);

onBeforeMount(async () => {
  mounted.value = true;
});

// const addToDomain = async (): Promise<void> => {
//   await Provider.store.dispatch('researchsDomains/addToDomain', existingResearch.value.id);
//   await Provider.store.dispatch('researchs/get', existingResearch.value.id);
//   Provider.store.commit('researchs/unshiftToAll', existingResearch.value.id);
//   emit('add');
// };

const create = async (): Promise<void> => {
  await Provider.store.dispatch('researches/create', research.value);
  Provider.store.commit('researches/unshiftToAll', research.value);
  emits('add');
};
</script>
<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.save-button {
  width: 300px;
  border-radius: 5px;
  height: 42px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 auto;
  font-size: 14px;
}
</style>
