<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
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
          <el-col :span="12"> {{ representative.human.dateBirth ? $dateFormatRu(representative.human.dateBirth) : 'Не указана' }}</el-col>
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
import { Options, Vue } from 'vue-class-component';

import IRepresentative from '@/interfaces/representatives/IRepresentative';

@Options({
  name: 'RepresentativePageInfo',
  props: ['representative'],
})
export default class RepresentativePageInfo extends Vue {
  // Types.
  representative!: IRepresentative;

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
</style>
