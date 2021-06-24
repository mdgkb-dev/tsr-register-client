<template>
  <PageHead :titleParent="'Регистры пациентов'" v-if="mount" :title="title" :links="links" :hideButton="true" @submitForm="submitForm" />
  <div class="table-background">
    <el-table
      v-if="mount"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      :data="register.registerToPatient"
      class="table-shadow"
      header-row-class-name="header-style"
      border
    >
      <el-table-column type="index" label="№" width="50" />
      <el-table-column label="ФИО" sortable prop="patient.human.surname" align="left" resizable>
        <template #default="scope">
          {{ scope.row.patient.human.getFullName() }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="140">
        <template #default="scope">
          <el-button @click="edit(scope.row.patient.id)" type="text" size="small">Редактировать</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import PageHead from '@/components/PageHead.vue';
import { mapActions, mapGetters } from 'vuex';
import IRegister from '@/interfaces/registers/IRegister';
import Register from '@/classes/registers/Register';
import Link from '@/classes/shared/Link';

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
export default class RegisterPatientsPage extends Vue {
  links: Link[] = [];
  title = '';
  mount = false;
  registerGet!: (registerId: string) => Promise<void>;
  register: IRegister = new Register();

  async mounted(): Promise<void> {
    await this.registerGet(`${this.$route.params.registerId}`);
    this.register = this.$store.getters['registers/register'];
    if (this.register.name) {
      this.links.push(new Link('/register-link-list/', 'Регистры пациентов'));
    }
    if (this.register.name) this.title = this.register.name;
    this.mount = true;
  }

  edit(patientId: string): void {
    this.$router.push(`/registers/patients/${this.$route.params.registerId}/${patientId}`);
  }
}
</script>
