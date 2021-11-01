<template>
  <div class="wrapper">
    <el-button v-if="isEditMode" style="margin-bottom: 20px" @click="addDisability">Добавить инвалидность</el-button>
    <el-table
      :data="disabilities"
      style="width: 950px; margin-bottom: 20px"
      row-key="id"
      :default-expand-all="true"
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

      <el-table-column prop="period.dateStart" label="Дата начала" sortable width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            :prop="getProp(scope, true)"
            :rules="[{ required: true, message: 'Пожалуйста, укажите дату начала', trigger: 'change' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-date-picker
              ref="picker"
              v-model="scope.row.period.dateStart"
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              type="date"
              @change="isEdv(scope.row) ? edvDateStartChangeHandler(scope.row.id) : null"
            ></el-date-picker>
          </el-form-item>
          <span v-else>{{ formatDate(scope.row.period.dateStart) }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="period.dateEnd" label="Дата окончания" sortable width="250" align="center">
        <template #default="scope">
          <el-form-item
            v-if="isEditMode"
            :prop="getProp(scope, false)"
            :rules="[{ required: true, message: 'Пожалуйста, укажите дату конца', trigger: 'change' }]"
            label-width="0"
            style="margin-bottom: 0"
          >
            <el-date-picker
              v-model="scope.row.period.dateEnd"
              type="date"
              :disabled-date="(time) => disabledDate(time, scope.row.period.dateStart)"
              format="DD.MM.YYYY"
              placeholder="Выберите дату"
              :disabled="!isEdv(scope.row) && scope.row.period.dateStart ? false : true"
            ></el-date-picker>
          </el-form-item>
          <span v-else>{{ formatDate(scope.row.period.dateEnd) }}</span>
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
          <div v-if="isEditMode">
            <div v-if="!isEdv(scope.row)" class="card-button-group">
              <el-tooltip effect="light" placement="top-end" content="Добавить справку ЕДВ">
                <el-button icon="el-icon-document-add" @click="addEdv(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip effect="light" placement="top-end" content="Удалить инвалидность">
                <el-button icon="el-icon-delete" @click.prevent="removeDisability(scope.row)"></el-button>
              </el-tooltip>
            </div>
            <div v-else class="card-button-group">
              <el-button-group v-if="!scope.row.fileInfo">
                <el-tooltip v-if="!scope.row.fileInfo" effect="light" placement="top-end" content="Приложить файл">
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
                <el-tooltip v-if="scope.row.fileInfo.isDraft" effect="light" placement="top-end" content="Файл добавлен">
                  <el-button disabled icon="el-icon-document-checked"></el-button>
                </el-tooltip>
                <el-tooltip v-else placement="top-end" effect="light" content="Скачать файл">
                  <el-button :data-file-id="scope.row.fileInfo.id" icon="el-icon-download" @click.prevent="downloadFile"></el-button>
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
          </div>
          <div v-else></div>
        </template>
      </el-table-column>
    </el-table>
    <a ref="fileAnchor" style="display: none" />
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

import FileInfo from '@/classes/files/FileInfo';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import { MyCallbackWithOptParam } from '@/interfaces/elements/Callback';
import IFileAnchor from '@/interfaces/files/IFileAnchor';
import useDateFormat from '@/mixins/useDateFormat';

export default defineComponent({
  name: 'DisabilityForm',
  setup() {
    const store = useStore();
    const { formatDate } = useDateFormat();

    const birthDate: ComputedRef<string> = computed(() => store.getters['patients/birthDate']);
    const disabilities: ComputedRef<IDisability[]> = computed(() => store.getters['patients/disabilities']);
    const fileAnchor = ref();
    const isEditMode: ComputedRef<boolean> = computed<boolean>(() => store.getters['patients/isEditMode']);

    const addDisability = (): void => store.commit('patients/addDisability');

    const addEdv = (disability: IDisability): void => {
      store.commit('patients/addEdv', disability.id);
    };

    const removeEdv = (edv: IEdv): void => {
      store.commit('patients/removeEdv', edv);
    };

    const getProp = (scope: any, isStartDate: boolean): string | undefined => {
      if (isStartDate && !isEdv(scope.row) && disabilities.value.indexOf(scope.row) >= 0) {
        return `disabilities.${disabilities.value.indexOf(scope.row)}.period.dateStart`;
      }
      if (!isStartDate && !isEdv(scope.row) && disabilities.value.indexOf(scope.row) >= 0) {
        return `disabilities.${disabilities.value.indexOf(scope.row)}.period.dateEnd`;
      }
      const disabilityIndex = disabilities.value.findIndex((d: IDisability) => d.id === scope.row.disabilityId);

      if (disabilityIndex < 0) {
        return undefined;
      }

      let edvIndex = -1;
      if (disabilities.value[disabilityIndex].edvs) {
        edvIndex = disabilities.value[disabilityIndex].edvs.indexOf(scope.row);
      }
      if (edvIndex >= 0 && isStartDate) {
        return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.dateStart`;
      }
      if (edvIndex >= 0 && !isStartDate) {
        return `disabilities.${disabilityIndex}.edvs.${edvIndex}.period.dateEnd`;
      }

      return undefined;
    };

    const removeDisability = (item: IDisability): void => {
      store.commit('patients/removeDisability', item);
    };

    const edvDateStartChangeHandler = (id: string): void => {
      store.commit('patients/setEdvDateEnd', id);
    };
    const disabledDate = (time: Date, dateStart: Date) => {
      if (dateStart) {
        return time.getTime() < new Date(dateStart).getTime();
      }
    };

    const validateDisabilityDates = (_: unknown, __: unknown, callback: MyCallbackWithOptParam): void => {
      disabilities.value.forEach((disability: IDisability) => {
        if (disability.dateIsCorrect()) callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
      });
      callback();
    };

    const isEdv = (row: { ['parameter1']: boolean | undefined }): boolean => {
      return typeof row.parameter1 === 'boolean';
    };

    const addReplaceFile = (event: InputEvent, edvId: string): void => {
      const target = event.target as HTMLInputElement;
      if (!target || !target.files) {
        return;
      }
      const file = Array.from(target.files)[0];

      disabilities.value.forEach((i: IDisability) => {
        i.edvs.forEach((e: IEdv) => {
          if (e.id === edvId) {
            const newInfo = FileInfo.CreateDraft(file, edvId);
            e.fileInfoId = newInfo.id;
            e.fileInfo = newInfo;
          }
        });
      });
    };

    const removeFile = (id: string): void => {
      disabilities.value.forEach((i: IDisability) => {
        i.edvs.forEach((e: IEdv) => {
          if (e.id === id) {
            e.fileInfoId = undefined;
            e.fileInfo = undefined;
          }
        });
      });
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
      disabilities,
      fileAnchor,
      downloadFile,
      removeFile,
      addReplaceFile,
      isEdv,
      getProp,
      removeDisability,
      disabledDate,
      validateDisabilityDates,
      addEdv,
      removeEdv,
      birthDate,
      addDisability,
      edvDateStartChangeHandler,
      isEditMode,
      formatDate,
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
