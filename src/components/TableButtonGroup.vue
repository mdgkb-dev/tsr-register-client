<template>
  <div class="wrapper">
    <el-button icon="el-icon-edit" v-if="showEditButton" @click="$emit('edit')" />
    <el-button icon="el-icon-delete" v-if="showRemoveButton" @click="$emit('remove')" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'TableButtonGroup',
  props: ['showEditButton', 'showRemoveButton'],
})
export default class TableButtonGroup extends Vue {
  showEditButton!: boolean;
  showRemoveButton!: boolean;
}
</script>

<style lang="scss" scoped>
.wrapper:deep {
  .el-button {
    padding: 5px;
    margin: 0;
    min-height: unset;
    border: none;
  }
}
</style>
