<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <UploaderSingleScan :file-info="representative.human.photo" :height="300" @ratio="(e) => (element.ratio = e)" />
        </div>
        <h1 class="semi-bold-header">Контакты</h1>
        <el-space direction="vertical" class="light-title" :size="15" alignment="start">
          <el-space alignment="center">
            <el-icon size="25" style="margin-right: 5px"><Message /></el-icon>
            <span>{{ representative.human.contact.email ? representative.human.contact.email : 'Не указан' }}</span>
          </el-space>
          <el-space alignment="center">
            <el-icon size="25" style="margin-right: 5px"><Phone /></el-icon>
            <span>{{ representative.human.contact.phone ? representative.human.contact.phone : 'Не указан' }}</span>
          </el-space>
        </el-space>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Зак. представитель</el-tag>
        <h2 style="margin-bottom: 60px">{{ representative.human.getFullName() }}</h2>
        <el-row>
          <el-col :span="12" class="light-title upper">Дата рождения</el-col>
          <el-col :span="12">
            {{ representative.human.dateBirth ? $dateTimeFormatter.format(representative.human.dateBirth) : 'Не указана' }}</el-col
          >
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Пол</el-col>
          <el-col :span="12"> {{ representative.human.getGender(true) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Языки</el-col>
          <el-col :span="12"> Русский, английский </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" class="light-title upper">Адрес</el-col>
          <el-col :span="12">
            {{ representative.human.addressRegistration ? representative.human.addressRegistration : 'Не указан' }}
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row align="middle">
          <el-col :span="12" class="light-title upper flex-center">Прикрепленные документы</el-col>
          <el-col :span="12">
            <el-space v-if="representative.human.documents.length" :wrap="true">
              <div v-for="document in representative.human.documents" :key="document">
                <el-tooltip class="item" effect="light" :content="document.documentType.name" placement="top-end">
                  <el-tag>
                    <el-icon style="margin-right: 3px"><Document /></el-icon>
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
import { Document, Message, Phone } from '@element-plus/icons-vue';
import { defineComponent, PropType } from 'vue';

import Representative from '@/classes/Representative';
import UploaderSingleScan from '@/services/components/UploaderSingleScan.vue';
export default defineComponent({
  name: 'RepresentativePageInfo',
  components: { Message, Phone, Document, UploaderSingleScan },
  props: {
    representative: {
      type: Object as PropType<Representative>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
</style>
