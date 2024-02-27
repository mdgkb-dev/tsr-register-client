<template>
  <div class="container">
    <div v-if="showAddDoctor" class="blur" @click="showAddDoctor = false"></div>
    <div v-if="showAddDoctor" class="add-doctor">
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
    <Button button-class="plus-button" icon="plus" icon-class="icon-plus" @click="openAddDoctor()" />
    <div class="scroll-block">
      <draggable tag="el-collapse" :list="commission.commissionsDoctors" item-key="id" @end="sortDoctors">
        <template #item="{ element }">
          <PersonalityItem :title="element.doctor.getNameWithPosition()" @remove="removeCommissionDoctor(element)" />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { computed, ComputedRef, defineComponent, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

import Commission from '@/classes/Commission';
import CommissionDoctor from '@/classes/CommissionDoctor';
import Doctor from '@/classes/Doctor';
import PersonalityItem from '@/components/admin/Patients/PersonalityItem.vue';
import Button from '@/services/components/Button.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'PersonalityList',
  components: {
    PersonalityItem,
    Button,
    draggable,
  },
  setup() {
    const showAddDoctor: Ref<boolean> = ref(false);
    const commission: Ref<Commission> = computed(() => Provider.store.getters['commissions/item']);
    const doctors: ComputedRef<Doctor[]> = computed(() => Provider.store.getters['doctors/items']);
    const openAddDoctor = async () => {
      await Provider.store.dispatch('doctors/getAll');
      showAddDoctor.value = true;
    };

    const removeCommissionDoctor = async (commissionDoctor: CommissionDoctor): Promise<void> => {
      // ClassHelper.RemoveFromClassById(commissionDoctor.id, commission.value.commissionsDoctors);
      await Provider.store.dispatch('commissionsDoctors/remove', commissionDoctor.id);
    };

    const sortDoctors = async (): Promise<void> => {
      // sort(commission.value.commissionsDoctors);
      await Provider.store.dispatch('commissions/update', commission.value);
    };

    const addCommissionDoctor = async (doctor: Doctor): Promise<void> => {
      if (commission.value.doctorExists(doctor.id)) {
        ElMessage({
          type: 'warning',
          message: 'Выбранный доктор уже добавлен',
        });
        return;
      }
      // const item = commission.value.addDoctor(doctor);
      // await Provider.store.dispatch('commissionsDoctors/create', item);
    };

    return {
      openAddDoctor,
      showAddDoctor,
      commission,
      removeCommissionDoctor,
      sortDoctors,
      addCommissionDoctor,
      doctors,
    };
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/elements/base-style.scss';

.container {
  width: 100%;
}

.scroll-block {
  height: 60vh;
  overflow: hidden;
  overflow-y: auto;
}

.plus-button {
  width: 100%;
  border-radius: 5px;
  color: #00bea5;
  background: #c1efeb;
  height: 60px;
  margin: 10px 0;
  box-sizing: border-box;
}

:deep(.icon-plus) {
  fill: #00b5a4;
  // width: 40px;
  height: 40px;
  cursor: pointer;
}

.add-doctor {
  position: absolute;
  z-index: 1;
  top: 0;
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
