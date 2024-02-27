<template>
  <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="showDoctorsList(true)" />
  <div class="scroll-block">
    <draggable tag="el-collapse" :list="commission.commissionsDoctors" item-key="id" @end="sortDoctors">
      <template #item="{ element }">
        <PersonalityItem :title="element.doctor.getNameWithPosition()" @remove="removeCommissionDoctor(element)" />
      </template>
    </draggable>
  </div>

  <div v-if="doctorsListShowed" class="blur" @click="doctorsListShowed = false"></div>
  <div v-if="doctorsListShowed" class="add-doctor">
    <div class="scroll-block">
      <PersonalityItem
        v-for="doctor in doctors.filter((d) => !commission.doctorExists(d.id))"
        :key="doctor.id"
        :with-icon="false"
        :title="doctor.getNameWithPosition()"
        @click="addCommissionDoctor(doctor)"
      />
    </div>
  </div>
  <!-- <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="showDoctorsList(true)" />
  <div class="scroll-block">
    <draggable tag="el-collapse" :list="commission.commissionsDoctors" item-key="id" @end="sortDoctors">
      <template #item="{ element }">
        <PersonalityItem :title="element.doctor.getNameWithPosition()" @remove="removeCommissionDoctor(element)" />
      </template>
    </draggable>
  </div> -->
  <!-- <div style="display: flex">


    <div class="doctor-name">{{ element.doctor.name }}</div>

    <Button icon="del" icon-class="edit-icon" @click="removeCommissionDoctor(element)" />
  </div> -->
  <!-- </template>
</draggable> -->
  <!-- <el-button @click="showDoctorsList(true)">Добавить члена комиссии</el-button> -->
  <!-- <template v-if="doctorsListShowed">
    <div v-for="doctor in doctors" :key="doctor.id" @click="addCommissionDoctor(doctor)">
      {{ doctor.name }}
    </div>
  </template> -->
  <!-- <Del />
  <Move /> -->
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import Commission from '@/classes/Commission';
import CommissionDoctor from '@/classes/CommissionDoctor';
import Doctor from '@/classes/Doctor';
import PersonalityItem from '@/components/admin/Patients/PersonalityItem.vue';
import Button from '@/services/components/Button.vue';
import ClassHelper from '@/services/ClassHelper';
import Provider from '@/services/Provider/Provider';
import sort from '@/services/sort';

export default defineComponent({
  name: 'CommissionDoctors',
  components: {
    draggable,
    Button,
    PersonalityItem,
  },
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

    const updateOrder = async (commission: Commission): Promise<void> => {
      sort(commission.commissionsDoctors);
      await Provider.store.dispatch('commissions/update', commission);
    };

    return {
      updateOrder,
      sort,
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

.icon-move {
  //visibility: hidden;
  width: 24px;
  height: 24px;
  //fill: #dff2f8;
  //stroke: #747474;
  animation-name: ripple;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.doctor-name {
  &:hover {
    cursor: pointer;
  }
}

.hidden {
  display: none;
}

.scroll-block {
  min-height: 35vh;
  max-height: 75vh;
  overflow: hidden;
  overflow-y: auto;
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
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
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
  align-items: flex-end;
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
    padding: 0;
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

.plus-button {
  width: calc(100% - 20px);
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 10px;
  // box-sizing: border-box;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  // width: 40px;
  height: 40px;
  cursor: pointer;
}

.add-doctor {
  position: absolute;
  z-index: 2;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  min-width: 300px;
  background: #ffffff;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 5px;
}

.blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>
