<template>
  <el-button @click="addDisability()" style="margin-bottom: 20px">Добавить инвалидность</el-button>
  <el-table :data="disabilities" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{ hasChildren: 'hasChildren', children: 'edvs' }">
    <el-table-column label="" width="150">
      <template #default="scope">
        <span v-if="scope.row.parameter1 === true || scope.row.parameter1 === false">ЕДВ</span>
        <span v-else>Инвалидность</span>
      </template>
    </el-table-column>
    <el-table-column prop="period.dateStart" label="Дата начала" sortable width="250">
      <template #default="scope">
        <el-form-item :prop="getProp(scope)" :rules="getRuleStart(scope)" label-width="0" style="margin-bottom: 0">
          <el-date-picker
            :disabled-date="disabledDate"
            format="DD.MM.YYYY"
            placeholder="Выберите дату"
            ref="picker"
            type="date"
            v-model="scope.row.period.dateStart"
          ></el-date-picker>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column prop="period.dateEnd" label="Дата окончания" sortable width="250">
      <template #default="scope">
        <el-form-item :prop="getProp(scope)" :rules="getRuleEnd(scope)" label-width="0" style="margin-bottom: 0">
          <el-date-picker type="date" :disabled-date="disabledDate" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="scope.row.period.dateEnd"></el-date-picker>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="Инвалидность" width="180" sortable>
      <template #default="scope">
        <div v-if="scope.row.parameter1 === true || scope.row.parameter1 === false">
          <el-button :type="scope.row.parameter1 ? 'primary' : undefined" circle @click="scope.row.parameter1 = !scope.row.parameter1">A</el-button>
          <el-button :type="scope.row.parameter2 ? 'primary' : undefined" circle @click="scope.row.parameter2 = !scope.row.parameter2">B</el-button>
          <el-button :type="scope.row.parameter3 ? 'primary' : undefined" circle @click="scope.row.parameter3 = !scope.row.parameter3">C</el-button>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Действия" width="500" sortable>
      <template #default="scope">
        <div v-if="scope.row.parameter1 === undefined">
          <el-button @click="addEdv(scope.row)">Добавить справку ЕДВ</el-button>
          <el-button @click.prevent="removeDisability(scope.row)">Удалить инвалидность</el-button>
        </div>
        <div v-else>
          <el-button @click.prevent="removeEdv(scope.row)">Удалить справку</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IDisability from '@/interfaces/disabilities/IDisability';
import Disability from '@/classes/disability/Disability';
import Edv from '@/classes/disability/Edv';
import IEdv from '@/interfaces/disabilities/IEdv';
import PeriodRules from '@/classes/shared/PeriodRules';
import { v4 as uuidv4 } from 'uuid';

@Options({
  props: ['in-disabilities', 'in-birth-date'],
})
export default class DisabilityForm extends Vue {
  // Types.
  inDisabilities!: IDisability[];
  inBirthDate!: string;
  // Local state.
  disabilities = this.inDisabilities;

  addDisability(): void {
    const d = new Disability();
    d.id = uuidv4();
    this.disabilities.push(d);
  }

  addEdv = (disability: IDisability): void => {
    const edv = new Edv();
    edv.id = uuidv4();
    edv.disabilityId = disability.id;
    if (disability.edvs) {
      disability.edvs.push(edv);
    }
  };

  getRuleStart = (scope: any) => {
    const rule = new PeriodRules();
    rule.dateStart[0].options = scope.row.period;
    return rule.dateStart;
  };

  getRuleEnd = (scope: any) => {
    const rule = new PeriodRules();
    rule.dateEnd[0].options = scope.row.period;
    return rule.dateEnd;
  };

  getProp = (scope: any): string => {
    if (scope.row.parameter1 === undefined) {
      return `disabilities.${this.disabilities.indexOf(scope.row)}.period.startDate`;
    }
    const disabilityIndex = this.disabilities.findIndex((d: IDisability) => d.id === scope.row.disabilityId);
    let edvIndex = -1;
    if (this.disabilities[disabilityIndex].edvs) {
      // TODO: пофиксить
      edvIndex = this.disabilities[disabilityIndex].edvs!.indexOf(scope.row);
    }

    return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.startDate`;
  };

  removeDisability(item: IDisability): void {
    const index = this.disabilities.indexOf(item);
    if (index !== -1) {
      this.disabilities.splice(index, 1);
    }
  }

  disabledDate(time: any) {
    return time.getTime() < Date.parse(this.inBirthDate);
  }

  removeEdv = (edv: IEdv): void => {
    const disability = this.disabilities.find((d: IDisability) => d.id === edv.disabilityId);
    if (disability && disability.edvs) {
      const index = disability.edvs.indexOf(edv);
      if (index !== -1) {
        disability.edvs.splice(index, 1);
      }
    }
  };

  validateDisabilityDates = (rule: any, value: any, callback: any): void => {
    this.disabilities.forEach((disability: IDisability) => {
      if (disability.period && disability.period.dateStart && disability.period.dateEnd && disability.period.dateStart > disability.period?.dateEnd) {
        callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
      }
    });
    callback();
  };
}
</script>
<style>
.but {
  border-radius: 50%;
}
</style>
