<template>
  <div class="wrapper">
    <el-button class="table-button" icon="el-icon-download" v-if="showDownloadButton" @click="$emit('download')" />
    <el-button class="table-button" icon="el-icon-edit" v-if="showEditButton" @click="$emit('edit')" />
    <el-button class="table-button" icon="el-icon-delete" v-if="showRemoveButton" @click="$emit('remove')" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'TableButtonGroup',
  props: ['showDownloadButton', 'showEditButton', 'showRemoveButton'],
})
export default class TableButtonGroup extends Vue {
  showDownloadButton!: boolean;
  showEditButton!: boolean;
  showRemoveButton!: boolean;
}
</script>
