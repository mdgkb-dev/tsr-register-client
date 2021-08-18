<template>
  <el-popover placement="bottom-end" width="auto" trigger="click">
    <template #reference>
      <el-button><FilterFilled /></el-button>
    </template>
    <el-form label-position="top">
      <el-form-item label="Пол">
        <el-radio-group>
          <el-radio label="М"></el-radio>
          <el-radio label="Ж"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Дата рождения">
        <div class="flex-row">
          <el-date-picker size="mini" type="daterange" start-placeholder="От" end-placeholder="до"></el-date-picker>
        </div>
      </el-form-item>
      <el-button-group>
        <el-button size="mini" type="success">Применить</el-button>
        <el-button size="mini">Сбросить</el-button>
      </el-button-group>
    </el-form>
  </el-popover>
</template>

<script lang="ts">
import { FilterFilled } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PatientsFilters',
  components: {
    FilterFilled,
  },
});
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  font-weight: 600;
  padding: 0;
}
:deep(.el-form-item) {
  margin-bottom: 10px;
}
.flex-row {
  display: flex;
  text-align: center;
}
// :deep(.el-form-item__content) {
//   margin: auto 0;
// }
</style>
