<template>
  <div class="wrapper">
    <el-button style="margin-bottom: 20px" @click="addDisability()">Добавить инвалидность</el-button>
    <el-table
      :data="disabilities"
      style="width: 950px; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ hasChildren: 'hasChildren', children: 'edvs' }"
      class="table-shadow"
      header-row-class-name="header-style"
    >
      <el-table-column label="" width="150" align="center">
        <template #default="scope">
          <span v-if="isEdv(scope.row)">ЕДВ</span>
          <span v-else>Инвалидность</span>
        </template>
      </el-table-column>

      <el-table-column prop="period.dateStart" label="Дата начала" sortable width="230" align="center">
        <template #default="scope">
          <el-form-item :prop="getProp(scope)" :rules="getRuleStart(scope)" label-width="0" style="margin-bottom: 0">
            <el-date-picker
              ref="picker"
              v-model="scope.row.period.dateStart"
              :disabled-date="disabledDate"
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              type="date"
            ></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="period.dateEnd" label="Дата окончания" sortable width="230" align="center">
        <template #default="scope">
          <el-form-item :prop="getProp(scope)" :rules="getRuleEnd(scope)" label-width="0" style="margin-bottom: 0">
            <el-date-picker
              v-model="scope.row.period.dateEnd"
              type="date"
              :disabled-date="disabledDate"
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
            ></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="Инвалидность" width="180" sortable align="center">
        <template #default="scope">
          <div v-if="isEdv(scope.row)">
            <el-button :type="scope.row.parameter1 ? 'primary' : undefined" circle @click="scope.row.parameter1 = !scope.row.parameter1"
              >A</el-button
            >
            <el-button :type="scope.row.parameter2 ? 'primary' : undefined" circle @click="scope.row.parameter2 = !scope.row.parameter2"
              >B</el-button
            >
            <el-button :type="scope.row.parameter3 ? 'primary' : undefined" circle @click="scope.row.parameter3 = !scope.row.parameter3"
              >C</el-button
            >
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #default="scope">
          <div v-if="!isEdv(scope.row)" class="card-button-group">
            <el-tooltip effect="light" placement="top-end" content="Добавить справку ЕДВ">
              <el-button icon="el-icon-document-add" @click="addEdv(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip effect="light" placement="top-end" content="Удалить инвалидность">
              <el-button icon="el-icon-delete" @click.prevent="removeDisability(scope.row)"></el-button>
            </el-tooltip>
          </div>

          <div v-else class="card-button-group">
            <el-button-group v-if="!fileInfos.some((info) => info.category === scope.row.id)">
              <el-tooltip
                v-if="!fileInfos.some((info) => info.category === scope.row.id)"
                effect="light"
                placement="top-end"
                content="Приложить файл"
              >
                <el-button icon="el-icon-paperclip" @click="$refs[scope.row.id].click()"></el-button>
              </el-tooltip>
              <input
                :ref="scope.row.id"
                type="file"
                hidden
                @change="
                  (event) => {
                    addReplaceFile(event, scope.row.id);
                  }
                "
              />
            </el-button-group>

            <el-button-group v-else>
              <el-tooltip
                v-if="fileInfos.find((info) => info.category === scope.row.id).isDraft"
                effect="light"
                placement="top-end"
                content="Файл добавлен"
              >
                <el-button disabled icon="el-icon-document-checked"></el-button>
              </el-tooltip>
              <el-tooltip v-else placement="top-end" effect="light" content="Скачать файл">
                <el-button
                  :data-file-id="fileInfos.find((info) => info.category === scope.row.id).id"
                  icon="el-icon-download"
                  @click.prevent="downloadFile"
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="light" placement="top-end" content="Загрузить новый файл (это заменит предыдущий)">
                <el-button icon="el-icon-paperclip" @click="$refs[scope.row.id].click()" />
              </el-tooltip>
              <input
                :ref="scope.row.id"
                type="file"
                hidden
                @change="
                  (event) => {
                    addReplaceFile(event, scope.row.id);
                  }
                "
              />
              <el-tooltip effect="light" placement="top-end" content="Удалить приложенный файл">
                <el-button icon="el-icon-document-delete" @click.prevent="removeFile(scope.row.id)" />
              </el-tooltip>
            </el-button-group>

            <el-tooltip effect="light" placement="top-end" content="Удалить справку">
              <el-button icon="el-icon-delete" @click.prevent="removeEdv(scope.row)"></el-button>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <a ref="fileAnchor" style="display: none" />
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, defineComponent, onBeforeMount, Ref, ref } from 'vue';
import { useStore } from 'vuex';

import FileInfo from '@/classes/files/FileInfo';
import PeriodRules from '@/classes/shared/PeriodRules';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import IFileInfo from '@/interfaces/files/IFileInfo';

export default defineComponent({
  name: 'DisabilityForm',
  setup() {
    const store = useStore();

    const birthDate: Ref<string> = computed(() => store.getters['patients/birthDate']);
    const disabilities: Ref<IDisability[]> = computed(() => store.getters['patients/disabilities']);
    const fileInfos: Ref<IFileInfo[]> = computed(() => store.getters['patients/fileInfos']);
    const fileAnchor = ref();

    onBeforeMount(async () => {
      await store.dispatch('disabilities/getAll', 0);
    });

    const add = (): void => {
      store.commit('patients/addDisability');
    };

    const addEdv = (disability: IDisability): void => {
      store.commit('patients/addEdv', disability.id);
    };

    const removeEdv = (edv: IEdv): void => {
      store.commit('patients/removeEdv', edv);
    };

    const getRuleStart = (scope: any) => {
      const rule = new PeriodRules();
      rule.dateStart[0].options = scope.row.period;
      return rule.dateStart;
    };

    const getRuleEnd = (scope: any) => {
      const rule = new PeriodRules();
      rule.dateEnd[0].options = scope.row.period;
      return rule.dateEnd;
    };

    const getProp = (scope: any): string | undefined => {
      if (!isEdv(scope.row) && disabilities.value.indexOf(scope.row) >= 0) {
        return `disabilities.${disabilities.value.indexOf(scope.row)}.period.startDate`;
      }

      const disabilityIndex = disabilities.value.findIndex((d: IDisability) => d.id === scope.row.disabilityId);

      if (disabilityIndex < 0) {
        return undefined;
      }

      let edvIndex = -1;

      if (disabilities.value[disabilityIndex].edvs) {
        edvIndex = disabilities.value[disabilityIndex].edvs.indexOf(scope.row);
      }

      if (edvIndex >= 0) {
        return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.startDate`;
      }

      return undefined;
    };

    const removeDisability = (item: IDisability): void => {
      store.commit('patients/removeDisability', item);
    };

    const disabledDate = (time: Date) => {
      return time.getTime() < Date.parse(birthDate.value);
    };

    const validateDisabilityDates = (rule: any, value: any, callback: any): void => {
      disabilities.value.forEach((disability: IDisability) => {
        if (
          disability.period &&
          disability.period.dateStart &&
          disability.period.dateEnd &&
          disability.period.dateStart > disability.period?.dateEnd
        ) {
          callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
        }
      });
      callback();
    };

    // eslint-disable-next-line class-methods-use-this
    const isEdv = (row: { ['parameter1']: boolean | undefined }): boolean => {
      return typeof row.parameter1 === 'boolean';
    };

    const addReplaceFile = (event: InputEvent, category: string): void => {
      const target = event.target as HTMLInputElement;
      if (!target || !target.files) {
        return;
      }
      const file = Array.from(target.files)[0];
      const newInfo: IFileInfo = new FileInfo({
        id: uuidv4(),
        category,
        originalName: file.name,
        file,
        isDraft: true,
      });
      fileInfos.value = [...fileInfos.value.filter((info: IFileInfo): boolean => info.category !== category), newInfo];
    };

    const removeFile = (id: string): void => {
      fileInfos.value = [...fileInfos.value.filter((info: IFileInfo): boolean => info.category !== id)];
    };

    const downloadFile = async (event: MouseEvent): Promise<void> => {
      if (!event || !event.target) {
        return;
      }

      const anchorElement = (event.target as HTMLSpanElement).parentElement as HTMLAnchorElement;
      const { fileId } = anchorElement.dataset;

      if (!fileId) {
        return;
      }

      try {
        await store.dispatch('files/generateLink', fileId);
      } catch (error) {
        return;
      }

      const anchor: IFileAnchor = store.getters['files/fileAnchor'];
      fileAnchor.value.href = anchor.href;
      fileAnchor.value.download = String(anchor.download);
      fileAnchor.value.click();
    };

    return {
      fileInfos,
      fileAnchor,
      downloadFile,
      removeFile,
      addReplaceFile,
      getRuleStart,
      getRuleEnd,
      isEdv,
      getProp,
      removeDisability,
      disabledDate,
      validateDisabilityDates,
      addEdv,
      removeEdv,
      birthDate,
      add,
    };
  },
});
</script>
<style scoped>
.card-button-group {
  display: flex;
  justify-content: flex-end;
}
.but {
  border-radius: 50%;
}
</style>
