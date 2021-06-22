<template>
  <PageHead :titleParent="'Регистры пациентов'" :title="title" :link="'/register-link-list'" :hideButton="true" @submitForm="submitForm" />
  <div class="table-background">
    <el-table v-if="mount" :default-sort="{ prop: 'id', order: 'ascending' }" :data="registers" class="table-shadow" header-row-class-name="header-style" border>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import PageHead from '@/components/PageHead.vue';

@Options({
  components: {
    PageHead,
  },
})
export default class RegisterPatientsPage extends Vue {
  title: string | string[] = '';
  mount = false;

  async mounted(): Promise<void> {
    this.title = this.$route.params.registerName.slice(1);
    this.mount = true;
  }
}
</script>
