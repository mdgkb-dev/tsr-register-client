<template>
  <Button
    text="Добавить анамнез"
    :with-icon="false"
    width="100%"
    height="60px"
    font-size="16px"
    border-radius="5px"
    color="#00B5A4"
    background="#C7ECEA"
    background-hover="#C7ECEA"
    :color-swap="false"
    @click="addAnamnesis()"
  />
  <div class="scroll-feild">
    <el-timeline style="margin-top: 20px">
      <el-timeline-item v-for="anamnesis in patient.getAnamnesesByMkbItemId(mkbItem?.id)" :key="anamnesis.id" placement="top" center>
        <CollapseItem :title="$dateTimeFormatter.format(anamnesis.date)" :is-collaps="true" background="#DFF2F8" margin-top="0px">
          <template #inside-content>
            <div class="background-container">
              <AnamnesisForm :anamnesis="anamnesis" @remove="removeAnamnesis(anamnesis.id)" />
            </div>
          </template>
        </CollapseItem>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import MkbItem from '@/classes/MkbItem';
import Patient from '@/classes/Patient';
import AnamnesisForm from '@/components/admin/Patients/Anamnesis/AnamnesisForm.vue';
import ClassHelper from '@/services/ClassHelper';
import Button from '@/services/components/Button.vue';
import CollapseItem from '@/services/components/Collapse/CollapseItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'AnamnesesList',
  components: {
    AnamnesisForm,
    Button,
    CollapseItem,
  },
  props: {
    patient: {
      type: Object as PropType<Patient>,
      required: true,
    },
    mkbItem: {
      type: Object as PropType<MkbItem | undefined>,
      default: undefined,
    },
  },
  emits: ['add', 'remove'],
  setup(props) {
    const addAnamnesis = async (): Promise<void> => {
      const anamnesis = props.patient.addAnamnesis();
      if (props.mkbItem) {
        anamnesis.mkbItem = props.mkbItem;
        anamnesis.mkbItemId = props.mkbItem.id;
      }
      await Provider.store.dispatch('anamneses/create', anamnesis);
    };

    const removeAnamnesis = async (id: string): Promise<void> => {
      ClassHelper.RemoveFromClassById(id, props.patient.anamneses);
      await Provider.store.dispatch('anamneses/remove', id);
    };

    return {
      addAnamnesis,
      removeAnamnesis,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
@import '@/assets/styles/elements/base-style.scss';

.scroll-feild {
  margin-top: 10px;
  height: 47vh;
  overflow-y: auto;
}

.background-container {
  width: auto;
  padding: 10px;
  margin: 0 10px 10px 10px;
  background: #dff2f8;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #c3c3c3;
}

@media screen and (max-width: 822px) {
  .scroll-feild {
    margin-top: 10px;
    height: 40vh;
    overflow-y: auto;
  }
}

@media screen and (max-width: 502px) {
  .scroll-feild {
    margin-top: 10px;
    height: 27vh;
    overflow-y: auto;
  }
}
</style>
