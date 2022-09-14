<template>
  <el-space :direction="horizontal ? 'horizontal' : 'vertical'" alignment="center" :size="0">
    <el-button v-if="showCheckButton" class="table-button" :icon="Check" @click="$emit('check')" />
    <el-button v-if="showAddButton" class="table-button" :icon="Plus" @click="$emit('add')" />
    <el-button v-if="showMoveUpButton" class="table-button" :icon="ArrowUp" @click="$emit('moveUp')" />
    <el-button v-if="showMoveDownButton" class="table-button" :icon="ArrowDown" @click="$emit('moveDown')" />
    <el-button v-if="showDownloadButton" class="table-button" :icon="Download" @click="$emit('download')" />
    <el-button v-if="showEditButton" class="table-button" :icon="Edit" data-test="tableButtonGroupEditButton" @click="$emit('edit')" />
    <el-popconfirm
      v-if="showRemoveButton"
      confirm-button-text="Да"
      cancel-button-text="Отмена"
      :icon="InfoFilled"
      icon-color="red"
      title="Вы уверен, что хотите удалить это?"
      @confirm="$emit('remove')"
      @cancel="() => null"
    >
      <template #reference>
        <el-button class="table-button" :icon="Delete" data-test="tableButtonGroupDeleteButton" />
      </template>
    </el-popconfirm>
  </el-space>
</template>

<script lang="ts">
import { ArrowDown, ArrowUp, Check, Delete, Download, Edit, InfoFilled, Plus } from '@element-plus/icons-vue';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TableButtonGroup',
  props: {
    showDownloadButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showEditButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showRemoveButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showMoveUpButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showMoveDownButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showAddButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    showCheckButton: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    horizontal: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  emits: ['download', 'edit', 'remove', 'moveUp', 'moveDown', 'add', 'check'],
  setup() {
    return { Edit, Download, Plus, ArrowUp, ArrowDown, Delete, InfoFilled, Check };
  },
});
</script>
