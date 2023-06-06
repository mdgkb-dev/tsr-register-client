<template>
  <el-timeline style="margin-top: 20px">
    <el-timeline-item v-for="commissionDoctor in commission.commissionsDoctors" :key="commissionDoctor.id" placement="top" center>
      {{ commissionDoctor.doctor.name }} - <i>{{ commissionDoctor.doctor.position }}</i>
      <el-button @click="removeCommissionDoctor(commissionDoctor)">Удалить члена комиссии</el-button>
    </el-timeline-item>
  </el-timeline>
  <el-button @click="showDoctorsList(true)">Добавить члена комиссии</el-button>
  <template v-if="doctorsListShowed">
    <div v-for="doctor in doctors" :key="doctor.id" @click="addCommissionDoctor(doctor)">
      {{ doctor.name }}
    </div>
  </template>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';

import Commission from '@/classes/Commission';
import CommissionDoctor from '@/classes/CommissionDoctor';
import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'CommissionDoctors',
  props: {
    commission: {
      type: Object as PropType<Commission>,
      required: true,
    },
  },
  setup(props) {
    const doctorsListShowed: Ref<boolean> = ref(false);
    const doctors: ComputedRef<Doctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const showDoctorsList = async (show: boolean): Promise<void> => {
      await Provider.store.dispatch('doctors/getAll');
      doctorsListShowed.value = show;
    };
    const removeCommissionDoctor = async (commissionDoctor: CommissionDoctor): Promise<void> => {
      if (!props.commission) {
        return;
      }
      ClassHelper.RemoveFromClassById(commissionDoctor.id, props.commission.commissionsDoctors, []);
      await Provider.store.dispatch('commissionsDoctors/remove', commissionDoctor.id);
    };

    const addCommissionDoctor = async (doctor: Doctor): Promise<void> => {
      if (!props.commission) {
        return;
      }
      const item = props.commission?.addDoctor(doctor);
      await Provider.store.dispatch('commissionsDoctors/create', item);
      doctorsListShowed.value = false;
    };
    return {
      doctors,
      doctorsListShowed,
      showDoctorsList,
      addCommissionDoctor,
      removeCommissionDoctor,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-edit {
  width: 28px;
  height: 28px;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
}

.icon-plus {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-block {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: end;
  width: calc(100% - 20px);
  padding: 10px 10px 24px 10px;
  background: #f5f5f5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 10px;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>
