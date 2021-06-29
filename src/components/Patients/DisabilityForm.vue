<template>
  <el-button @click="addDisability()" style="margin-bottom: 20px">Добавить инвалидность</el-button>
  <el-table :data="disabilities" style="width: 100%; margin-bottom: 20px" row-key="id" border :tree-props="{ hasChildren: 'hasChildren', children: 'edvs' }">
    <el-table-column label="" width="150">
      <template #default="scope">
        <span v-if="isEdv(scope.row)">ЕДВ</span>
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
        <div v-if="isEdv(scope.row)">
          <el-button :type="scope.row.parameter1 ? 'primary' : undefined" circle @click="scope.row.parameter1 = !scope.row.parameter1">A</el-button>
          <el-button :type="scope.row.parameter2 ? 'primary' : undefined" circle @click="scope.row.parameter2 = !scope.row.parameter2">B</el-button>
          <el-button :type="scope.row.parameter3 ? 'primary' : undefined" circle @click="scope.row.parameter3 = !scope.row.parameter3">C</el-button>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Действия" width="500" sortable>
      <template #default="scope">
        <div v-if="!isEdv(scope.row)">
          <el-button @click="addEdv(scope.row)">Добавить справку ЕДВ</el-button>
          <el-button type="text" size="small" @click.prevent="removeDisability(scope.row)">Удалить инвалидность</el-button>
        </div>
        <div v-else>
          <el-button-group v-if="!fileInfos.some((info) => info.category === scope.row.id)">
            <el-button @click="$refs[scope.row.id].click()">Приложить файл</el-button>
            <input
              type="file"
              :ref="scope.row.id"
              hidden
              @change="
                (event) => {
                  addReplaceFile(event, scope.row.id);
                }
              "
            />
          </el-button-group>
          <el-button-group v-else>
            <el-button v-if="fileInfos.find((info) => info.category === scope.row.id).isDraft" disabled>Файл добавлен</el-button>
            <el-button v-else :data-file-id="fileInfos.find((info) => info.category === scope.row.id).id" @click.prevent="downloadFile">Скачать файл</el-button>
            <el-tooltip content="Загрузить новый файл (это заменит предыдущий)">
              <el-button @click="$refs[scope.row.id].click()" icon="el-icon-upload" />
            </el-tooltip>
            <input
              type="file"
              :ref="scope.row.id"
              hidden
              @change="
                (event) => {
                  addReplaceFile(event, scope.row.id);
                }
              "
            />
            <el-tooltip content="Удалить приложенный файл">
              <el-button icon="el-icon-delete" @click.prevent="removeFile(scope.row.id)" />
            </el-tooltip>
          </el-button-group>
          <el-button-group>
            <el-button type="text" size="small" @click.prevent="removeEdv(scope.row)">Удалить справку</el-button>
          </el-button-group>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <a ref="fileAnchor" style="display: none" />
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { Options, Vue } from 'vue-class-component';
import { mapActions } from 'vuex';

import Disability from '@/classes/disability/Disability';
import Edv from '@/classes/disability/Edv';
import FileInfo from '@/classes/files/FileInfo';
import PeriodRules from '@/classes/shared/PeriodRules';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import IFileInfo from '@/interfaces/files/IFileInfo';

@Options({
  name: 'DisabilityForm',
  props: ['disabilities', 'birthDate', 'fileInfos'],
  emits: ['update:disabilities', 'update:fileInfos', 'addEdv', 'removeEdv'],
  methods: {
    ...mapActions({
      generateDownloadLink: 'files/generateLink',
    }),
  },
})
export default class DisabilityForm extends Vue {
  // Types.
  declare $refs: {
    fileAnchor: HTMLAnchorElement
  };

  fileInfos!: IFileInfo[];
  birthDate!: string;
  disabilities!: IDisability[];

  generateDownloadLink!: (fileId: string) => Promise<void>;

  // Methods.
  addDisability(): void {
    const disability = new Disability();
    disability.id = uuidv4();
    this.$emit('update:disabilities', [...this.disabilities, disability]);
  }

  addEdv = (disability: IDisability): void => {
    const edv = new Edv();
    edv.id = uuidv4();
    edv.disabilityId = disability.id;
    this.$emit('addEdv', edv);
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

  getProp = (scope: any): string | undefined => {
    if (!this.isEdv(scope.row) && this.disabilities.indexOf(scope.row) >= 0) {
      return `disabilities.${this.disabilities.indexOf(scope.row)}.period.startDate`;
    }

    const disabilityIndex = this.disabilities.findIndex((d: IDisability) => d.id === scope.row.disabilityId);

    if (disabilityIndex < 0) {
      return undefined;
    }

    let edvIndex = -1;

    if (this.disabilities[disabilityIndex].edvs) {
      edvIndex = this.disabilities[disabilityIndex].edvs.indexOf(scope.row);
    }

    if (edvIndex >= 0) {
      return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.startDate`;
    }

    return undefined;
  };

  removeDisability(item: IDisability): void {
    this.$emit('update:disabilities', [...this.disabilities.filter((disability: IDisability): boolean => disability.id !== item.id)]);
  }

  disabledDate(time: any) {
    return time.getTime() < Date.parse(this.birthDate);
  }

  removeEdv = (edv: IEdv): void => {
    this.$emit('removeEdv', edv);
  };

  validateDisabilityDates = (rule: any, value: any, callback: any): void => {
    this.disabilities.forEach((disability: IDisability) => {
      if (disability.period && disability.period.dateStart && disability.period.dateEnd && disability.period.dateStart > disability.period?.dateEnd) {
        callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
      }
    });
    callback();
  };

  // eslint-disable-next-line class-methods-use-this
  isEdv(row: { ['parameter1']: boolean | undefined }): boolean {
    return typeof row.parameter1 === 'boolean';
  }

  addReplaceFile(event: InputEvent, category: string): void {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files) {
      return;
    }

    const file = Array.from(target.files)[0];
    const newInfo: IFileInfo = new FileInfo({
      id: uuidv4(), category, originalName: file.name, file, isDraft: true,
    });

    this.$emit('update:fileInfos', [...this.fileInfos.filter((info: IFileInfo): boolean => info.category !== category), newInfo]);
  }

  removeFile(id: string): void {
    this.$emit('update:fileInfos', [...this.fileInfos.filter((info: IFileInfo): boolean => info.category !== id)]);
  }

  async downloadFile(event: MouseEvent): Promise<void> {
    if (!event || !event.target) {
      return;
    }

    const anchorElement = (event.target as HTMLSpanElement).parentElement as HTMLAnchorElement;
    const { fileId } = anchorElement.dataset;

    if (!fileId) {
      return;
    }

    try {
      await this.generateDownloadLink(fileId);
    } catch (error) {
      return;
    }

    const anchor: IFileAnchor = this.$store.getters['files/fileAnchor'];
    this.$refs.fileAnchor.href = anchor.href;
    this.$refs.fileAnchor.download = String(anchor.download);
    this.$refs.fileAnchor.click();
  }
}

</script>
<style>
.but {
  border-radius: 50%;
}
</style>
