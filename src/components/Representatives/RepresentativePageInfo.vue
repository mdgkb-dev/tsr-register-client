<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <Uploader :store-module="'representatives'" :set-file-mutation="'setPhoto'" :remove-file-mutation="'removePhoto'" />
        </div>
        <h1 class="semi-bold-header">Контакты</h1>
        <el-space direction="vertical" class="light-title" :size="15" alignment="start">
          <el-space alignment="center">
            <i class="el-icon-message contact-icon"></i>
            <span>{{ representative.human.contact.email ? representative.human.contact.email : 'Не указан' }}</span>
          </el-space>
          <el-space alignment="center">
            <i class="el-icon-phone contact-icon"></i>
            <span>{{ representative.human.contact.phone ? representative.human.contact.phone : 'Не указан' }}</span>
          </el-space>
        </el-space>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Зак. представитель</el-tag>
        <h2 style="margin-bottom: 60px" v-html="representative.human.getFullName()"></h2>
        <el-row>
          <el-col :span="12" class="light-title upper">Дата рождения</el-col>
          <el-col :span="12"> {{ representative.human.dateBirth ? formatDate(representative.human.dateBirth) : 'Не указана' }}</el-col>
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
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import Uploader from '@/components/Uploader.vue';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import useDateFormat from '@/mixins/useDateFormat';
export default defineComponent({
  name: 'RepresentativePageInfo',
  components: { Uploader },
  setup() {
    const { formatDate } = useDateFormat();
    const store = useStore();
    const representative: Ref<IRepresentative> = computed(() => store.getters['representatives/representative']);

    return {
      representative,
      formatDate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
</style>
