<template>
  <el-space :direction="horizontal ? 'horizontal' : 'vertical'" alignment="center" :size="0">
    <el-button v-if="showDownloadButton" class="table-button" icon="el-icon-download" @click="$emit('download')" />
    <el-button v-if="showEditButton" class="table-button" icon="el-icon-edit" @click="$emit('edit')" />
    <el-popconfirm
      v-if="showRemoveButton"
      confirm-button-text="Да"
      cancel-button-text="Отмена"
      icon="el-icon-info"
      icon-color="red"
      title="Вы уверен, что хотите удалить это?"
      @confirm="$emit('remove')"
      @cancel="() => {}"
    >
      <template #reference>
        <el-button class="table-button" icon="el-icon-delete" />
      </template>
    </el-popconfirm>
  </el-space>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'TableButtonGroup',
  props: ['showDownloadButton', 'showEditButton', 'showRemoveButton', 'horizontal'],
})
export default class TableButtonGroup extends Vue {
  showDownloadButton!: boolean;
  showEditButton!: boolean;
  showRemoveButton!: boolean;
  horizontal!: boolean;
}
</script>
