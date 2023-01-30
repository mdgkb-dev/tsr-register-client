<template>
  <div class="table-under-collapse">
    <HeightWeightTable />
    <ChestCircumferenceTable />
    <HeadCircumferenceTable />
    <ChopScaleTable />
    <HmfseScaleTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ChestCircumferenceTable from '@/components/Patients/Anthropometry/ChestCircumferenceTable.vue';
import ChopScaleTable from '@/components/Patients/Anthropometry/ChopScaleTable.vue';
import HeadCircumferenceTable from '@/components/Patients/Anthropometry/HeadCircumferenceTable.vue';
import HeightWeightTable from '@/components/Patients/Anthropometry/HeightWeightTable.vue';
import HmfseScaleTable from '@/components/Patients/Anthropometry/HmfseScaleTable.vue';

export default defineComponent({
  name: 'AnthropometryForm',
  components: {
    ChestCircumferenceTable,
    HeadCircumferenceTable,
    ChopScaleTable,
    HmfseScaleTable,
    HeightWeightTable,
  },
  setup() {
    return {};
  },
});
</script>
