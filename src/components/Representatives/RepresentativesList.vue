<template>
  <div style="width: 100%">
    <el-button-group>
      <el-button type="primary" icon="el-icon-document" @click="this.create">Создать представителя</el-button>
    </el-button-group>

    <el-table :data="representatives" style="width: 100%">
      <el-table-column type="expand">
        <template #default="props">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Представляет</span>
              </div>
            </template>
            <div v-for="item in props.row.representativeToPatient" :key="item.patient.human" class="text item">
              {{ item.patient.human }}
            </div>
          </el-card>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column width="150" label="ФИО">
        <template #default="scope">
          {{ fullName(scope.row.human) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="Пол">
        <template #default="scope">
          {{ gender(scope.row.human) }}
        </template>
      </el-table-column>

      <el-table-column prop="human.addressRegistration" label="Адрес регистрации" width="150" />
      <el-table-column prop="human.contact.phone" label="Телефон" width="150" />
      <el-table-column prop="human.contact.email" label="Эл.почта" width="150" />
      <el-table-column width="150" label="Привязанные дети">
        <template #default="scope">
          <div v-for="rep in scope.row.representativeToPatient" :key="rep">
            <el-tooltip
              class="item"
              effect="dark"
              :content="`${rep.patient.human.surname} ${rep.patient.human.name} ${rep.patient.human.patronymic}`"
              placement="top-end"
            >
              <el-tag size="small">{{ children(rep) }}</el-tag>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button @click="this.edit(scope.row.id)" type="text" size="small">Редактировать</el-button>
          <el-button @click="this.delete(scope.row.id)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { mapState, mapActions } from 'vuex';

import IHuman from '@/interfaces/humans/IHuman';
import IRepresetnationType from '@/interfaces/representatives/IRepresetnationType';
import ModalForm from './RepresentativePage.vue';

@Options({
  components: {
    ModalForm,
  },
  computed: {
    ...mapState('representatives', ['representatives']),
  },
  methods: {
    ...mapActions({
      getAll: 'representatives/getAll',
    }),
  },
})
export default class RepresentativesList extends Vue {
  representatives!: [];

  getAll!: () => Promise<void>;

  async mounted(): Promise<void> {
    await this.getAll();
  }

  edit(id: number): void {
    this.$router.push(`/representatives/${id}`);
  }

  create(): void {
    this.$router.push('/representatives/new');
  }

  delete(id: number): void {
    this.$store.dispatch('representatives/delete', id);
  }

  fullName = (human: IHuman) => `${human.surname} ${human.name} ${human.patronymic}`;

  gender = (human: IHuman) => (human.gender === 'male' ? 'М' : 'Ж');

  children = (representative: IRepresetnationType) => {
    if (representative.patient) {
      return representative.patient.human.gender === 'male' ? 'Сын' : 'Дочь';
    }
    return '';
  };
}
</script>
