<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <Uploader :store-module="'patients'" :set-file-mutation="'setPhoto'" :remove-file-mutation="'removePhoto'" />
        </div>
        <h1 class="semi-bold-header">Диагноз</h1>
        <el-space v-if="patient.patientDiagnosis.length" direction="vertical" :size="5" alignment="start">
          <div v-for="item in patient.patientDiagnosis" :key="item.id">
            <el-space v-if="item.mkbSubDiagnosis" direction="horizontal" alignment="center">
              <span v-if="item.mkbSubDiagnosis" class="underline-label"
                >{{ item.mkbDiagnosis.code }}.{{ item.mkbSubDiagnosis.subCode }}</span
              >
              <PopoverInfo v-if="item.mkbSubDiagnosis" :content="item.mkbSubDiagnosis.name" />
            </el-space>
            <div v-else>
              <span v-if="item.mkbDiagnosis" class="underline-label">{{ item.mkbDiagnosis.code }}</span>
              <PopoverInfo v-if="item.mkbDiagnosis" :content="item.mkbDiagnosis.name" />
            </div>
          </div>
        </el-space>
        <div v-else>Не установлен</div>
        <el-divider></el-divider>

        <h1 class="semi-bold-header">Инвалидность</h1>
        <div v-if="patient.getActuallyDisability()">
          <el-space v-if="patient.getActuallyDisability()" direction="vertical" alignment="start" :size="20">
            <div style="color: #a1a8bd">До {{ formatDate(patient.getActuallyDisability().period.dateEnd) }}</div>
            <el-space v-if="patient.getActuallyDisability().getActuallyEdv()" :size="20" class="disability-circles">
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle
                >A</el-button
              >
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle
                >B</el-button
              >
              <el-button disabled :type="patient.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle
                >C</el-button
              >
            </el-space>
            <div v-else>Нет справок ЕДВ</div>
          </el-space>
        </div>
        <div v-else>Не установлена</div>
      </el-col>

      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Пациент</el-tag>
        <h2 style="margin-bottom: 60px">{{ patient.human.getFullName() }}</h2>
        <el-row>
          <el-col :span="12" class="light-title upper">Дата рождения</el-col>
          <el-col :span="12"> {{ patient.human.dateBirth ? formatDate(patient.human.dateBirth) : 'Не указана' }}</el-col>
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
          <el-col :span="12">
            <span>{{ patient.getHeightWeightShort() ? patient.getHeightWeightShort() : 'Нет данных' }}</span>
            <ColoredGroupTag :parameter="lastHeightWeightBmiGroup?.color ? lastHeightWeightBmiGroup : null" />
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Окружность головы</el-col>
          <el-col :span="12">
            <span>
              {{
                patient.getLastCircumference(patient.headCircumference)
                  ? patient.getLastCircumference(patient.headCircumference).value
                  : 'Нет данных'
              }}
            </span>
            <ColoredGroupTag :parameter="lastHeadCircumferenceGroup?.color ? lastHeadCircumferenceGroup : null" />
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Окружность груди</el-col>
          <el-col :span="12">
            <span>
              {{
                patient.getLastCircumference(patient.chestCircumference)
                  ? patient.getLastCircumference(patient.chestCircumference).value
                  : 'Нет данных'
              }}
            </span>
            <ColoredGroupTag :parameter="lastChestCircumferenceGroup?.color ? lastChestCircumferenceGroup : null" />
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- <el-row>
          <el-col :span="12" class="light-title upper">ИМТ</el-col>
          <el-col :span="12">
            {{ patient.getLastHeightWeight().getBmiGroup(patient.human.dateBirth, patient.human.isMale) }}
          </el-col>
        </el-row>
        <el-divider></el-divider> -->
        <el-row>
          <el-col :span="12" class="light-title upper">Адрес</el-col>
          <el-col :span="12"> {{ patient.human.addressRegistration ? patient.human.addressRegistration : 'Не указан' }} </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper flex-center">Значится в регистрах</el-col>
          <el-col :span="12">
            <el-space v-if="patient.registerToPatient.length" :wrap="true">
              <div v-for="registerToPatient in patient.registerToPatient" :key="registerToPatient.id">
                <el-tooltip class="item" effect="light" :content="registerToPatient.register.name" placement="top-end">
                  <el-tag class="tag-link" @click="$router.push(`/registers/patients/${registerToPatient.register.id}`)">{{
                    registerToPatient.register.name
                  }}</el-tag>
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
            <el-space v-if="patient.human.documents.length" :wrap="true">
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
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import ColoredGroupTag from '@/components/Patients/ColoredGroupTag.vue';
import PopoverInfo from '@/components/PopoverInfo.vue';
import Uploader from '@/components/Uploader.vue';
import IPatient from '@/interfaces/patients/IPatient';
import IColorPercentile from '@/interfaces/shared/IColorPercentile';
import useDateFormat from '@/mixins/useDateFormat';
export default defineComponent({
  name: 'PatientPageInfo',
  components: {
    Uploader,
    PopoverInfo,
    ColoredGroupTag,
  },
  setup() {
    const { formatDate } = useDateFormat();
    const store = useStore();
    const patient: ComputedRef<IPatient> = computed(() => store.getters['patients/patient']);
    const lastHeightWeightBmiGroup: ComputedRef<IColorPercentile | string | undefined> = computed(() => {
      return patient.value.getLastHeightWeight()?.getBmiGroup(patient.value.human.dateBirth, patient.value.human.isMale);
    });
    const lastChestCircumferenceGroup: ComputedRef<IColorPercentile | string | undefined> = computed(() => {
      return patient.value
        .getLastCircumference(patient.value.chestCircumference)
        ?.getChestCircumferenceGroup(patient.value.human.dateBirth, patient.value.human.isMale);
    });
    const lastHeadCircumferenceGroup: ComputedRef<IColorPercentile | string | undefined> = computed(() => {
      return patient.value
        .getLastCircumference(patient.value.headCircumference)
        ?.getHeadCircumferenceGroup(patient.value.human.dateBirth, patient.value.human.isMale);
    });

    // Local state.
    const checked = ref(true);
    const notChecked = ref(false);

    return {
      checked,
      notChecked,
      patient,
      formatDate,
      lastHeightWeightBmiGroup,
      lastChestCircumferenceGroup,
      lastHeadCircumferenceGroup,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
.register-tag {
  &:hover {
    cursor: pointer;
    border-width: 2px;
  }
}
</style>
