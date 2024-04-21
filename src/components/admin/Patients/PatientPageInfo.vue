<template>
  <LeftRightContainer left-width="280px">
    <template #left>
      <UploaderSingleScan v-if="patient.id" :file-info="patient.human.photo" :height="280" :default-ratio="1"
        @removeFile="removePhoto" :emit-crop="true" @ratio="(e) => (element.ratio = e)" @crop="savePhoto" />
      <div class="left-title">Диагноз</div>
      <div class="left-info">
        <el-space v-if="patient.patientDiagnosis.length" direction="vertical" :size="5" alignment="start">
          <div v-for="item in patient.patientDiagnosis" :key="item.id">
            <div>
              <span class="underline-label">{{ item.mkbItem.code }}</span>
              <PopoverInfo :content="item.mkbItem.name" />
            </div>
          </div>
        </el-space>
      </div>
      <div class="left-title">Инвалидность</div>
      <div class="left-info">
        <div v-if="patient.getActuallyDisability()">
          <el-space v-if="patient.getActuallyDisability()" direction="vertical" alignment="start" ::size="20">
            <div style="color: #a1a8bd">
              До
              {{ $dateTimeFormatter.format(patient.getActuallyDisability()?.period?.dateEnd) }}
            </div>
            <el-space v-if="patient.getActuallyDisability().getActuallyEdv()" ::size="20" class="disability-circles">
              <el-button disabled
                :type="patient.getActuallyDisability().getActuallyEdv().parameter1 ? 'primary' : undefined" circle>A
              </el-button>
              <el-button disabled
                :type="patient.getActuallyDisability().getActuallyEdv().parameter2 ? 'primary' : undefined" circle>B
              </el-button>
              <el-button disabled
                :type="patient.getActuallyDisability().getActuallyEdv().parameter3 ? 'primary' : undefined" circle>C
              </el-button>
            </el-space>
            <div v-else>Нет справок ЕДВ</div>
          </el-space>
        </div>
        <div v-else>Не установлена</div>
      </div>
      
      <div class="left-info">
        <el-checkbox v-model="patient.isMoscow" label="Пациент из Москвы" @change="update" />
        <el-checkbox v-model="patient.agreed" label="Дано информированное согласие" @change="update" />
      </div>
    </template>
    <template #right>
      <PassportForm store-module="patients" :edit-mode="true" />
    </template>
  </LeftRightContainer>
</template>

<script lang="ts" setup>
import Patient from '@/classes/Patient';
import PassportForm from '@/components/admin/Patients/PassportForm.vue';
import PopoverInfo from '@/components/PopoverInfo.vue';
import LeftRightContainer from '@/services/components/LeftRightContainer.vue';
import Provider from '@/services/Provider/Provider';

const patient: Ref<Patient> = Store.Item('patients')

const savePhoto = async () => {
  await Provider.store.dispatch('fileInfos/create', patient.value.human.photo);
  patient.value.human.photoId = patient.value.human.photo.id;
  await update();
};

const removePhoto = async () => {
  // Store.Remove('fileInfos', patient.value.human.photo.id)
  patient.value.human.removePhoto()
  Store.Update('humans', patient.value.human)
};

const update = async () => {
  await Store.Update('patients')
};

</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
@import '@/assets/styles/elements/base-style.scss';

.register-tag {
  &:hover {
    cursor: pointer;
    border-width: 2px;
  }
}

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 114px;
}

.left-title {
  font-size: 14px;
  font-weight: bold;
  color: $site_dark_gray;
  margin-top: 28px;
  margin-left: 10px;
  text-transform: uppercase;
}

.left-info {
  font-size: 12px;
  color: $site_dark_gray;
  margin-top: 3px;
  margin-left: 10px;
}
</style>
