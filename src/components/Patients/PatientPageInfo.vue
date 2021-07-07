<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div>
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </div>
        <h1 class="semi-bold-header">Диагноз</h1>
        <el-space direction="vertical" :size="5" alignment="start" v-if="patient.patientDiagnosis.length">
          <div v-for="item in patient.patientDiagnosis" :key="item.id">
            <el-space direction="horizontal" alignment="center" v-if="item.mkbSubDiagnosis">
              <span class="underline-label" v-if="item.mkbSubDiagnosis" v-html="item.mkbDiagnosis.code + '.' + item.mkbSubDiagnosis.subCode"></span>
              <PopoverInfo v-if="item.mkbSubDiagnosis" :content="item.mkbSubDiagnosis.name" />
            </el-space>
            <div v-else>
              <span class="underline-label" v-if="item.mkbDiagnosis" v-html="item.mkbDiagnosis.code"></span>
              <PopoverInfo v-if="item.mkbDiagnosis" :content="item.mkbDiagnosis.name" />
            </div>
          </div>
        </el-space>
        <div v-else>Не установлен</div>
        <el-divider></el-divider>

        <h1 class="semi-bold-header">Инвалидность</h1>
        <div v-if="patient.getActuallyDisability()">
          <el-space direction="vertical" alignment="start" :size="20" v-if="patient.getActuallyDisability()">
            <div style="color: #a1a8bd">До {{ $dateFormatRu(patient.getActuallyDisability().period.dateEnd) }}</div>
            <el-space :size="20" v-if="patient.getActuallyDisability().getActuallyEdv()" class="disability-circles">
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle>A</el-button>
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle>B</el-button>
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle>C</el-button>
            </el-space>
            <div v-else>
              Нет справок ЕДВ
            </div>
          </el-space>
        </div>
        <div v-else>Не установлена</div>
      </el-col>

      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Пациент</el-tag>
        <h2 v-html="patient.human.getFullName()" style="margin-bottom: 60px"></h2>
        <el-row>
          <el-col :span="12" class="light-title upper">Дата рождения</el-col>
          <el-col :span="12"> {{ patient.human.dateBirth ? $dateFormatRu(patient.human.dateBirth) : 'Не указана' }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Пол</el-col>
          <el-col :span="12"> {{ patient.human.getGender(true) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Языки</el-col>
          <el-col :span="12"> Русский </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Вес - Рост</el-col>
          <el-col :span="12"> {{ patient.getAnthropometryDataFull() ? patient.getAnthropometryDataFull() : 'Нет данных' }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">ИМТ</el-col>
          <el-col :span="12"> {{ patient.getBmiGroup() }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Адрес</el-col>
          <el-col :span="12"> {{ patient.human.addressRegistration ? patient.human.addressRegistration : 'Не указан' }} </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper flex-center">Значится в регистрах</el-col>
          <el-col :span="12">
            <el-space :wrap="true" v-if="patient.registerToPatient.lenght">
              <div v-for="registerToPatient in patient.registerToPatient" :key="registerToPatient.id">
                <el-tooltip class="item" effect="light" :content="registerToPatient.register.name" placement="top-end">
                  <el-tag>{{ registerToPatient.register.name }}</el-tag>
                </el-tooltip>
              </div>
            </el-space>
            <div v-else>В регистрах не значится</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row align="middle">
          <el-col :span="12" class="light-title upper flex-center">Прикрепленные документы</el-col>
          <el-col :span="12">
            <el-space :wrap="true" v-if="patient.human.documents.length">
              <div v-for="document in patient.human.documents" :key="document">
                <el-tooltip class="item" effect="light" :content="document.documentType.name" placement="top-end">
                  <el-tag>
                    <i class="el-icon-document" style="margin-right: 3px"></i>
                    <span>{{ document.documentType.getTagName() }}</span>
                  </el-tag>
                </el-tooltip>
              </div>
            </el-space>
            <div v-else>Документов нет</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import PopoverInfo from '@/components/PopoverInfo.vue';
import IPatient from '@/interfaces/patients/IPatient';

@Options({
  name: 'PatientPageInfo',
  props: ['patient'],
  components: {
    PopoverInfo,
  },
})
export default class PatientPageInfo extends Vue {
  // Types.
  patient!: IPatient;

  // Local state.
  checked = true;
  notChecked = false;
  mount = false;
}
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
</style>
