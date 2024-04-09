<template>
  <el-form>
    <LeftRightContainer left-width="280px">
      <template #right>
        <div class="container">
          <el-form-item label="Название" prop="surname">
            <el-input v-model="user.name" placeholder="Введите название" formatter="firstLetterUpper" @blur="update" />
          </el-form-item>
        </div>
      </template>
    </LeftRightContainer>
  </el-form>
</template>

<script lang="ts" setup>
import User from '@/classes/User';

const user: Ref<User> = Store.Item('users');

const update = async () => {
  Provider.withHeadLoader(async () => {
    await Store.Update();
  });
};
</script>

<style lang="scss" scoped>
@import '@/assets/elements/pageInfo.scss';
@import '@/assets/styles/elements/base-style.scss';

.container {
  width: 100%;
}

.register-tag {
  &:hover {
    cursor: pointer;
    border-width: 2px;
  }
}

:deep(.el-upload--picture-card) {
  width: 150px;
  font-size: 50px;
}

:deep(.el-upload--picture-card i) {
  font-size: 50px;
  color: #00b5a4;
  padding: 0 114px;
}

.left-title {
  font-size: 14px;
  font-weight: bold;
  color: $site_dark_gray;
  margin-top: 28px;
  margin-left: 10px;
  text-transform: uppercase;
  display: flex;
  justify-content: left;
  align-items: center;
}

.left-info {
  font-size: 12px;
  color: $site_dark_gray;
  margin-top: 3px;
  margin-left: 10px;
}

.info-title {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #b83616;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-top: 40px;
}

.el-select {
  width: 100%;
}

:deep(.el-date-editor.el-input, .el-date-editor.el-input__inner) {
  width: 100%;
}

:deep(.el-form-item) {
  display: block;
  margin-bottom: 16px;
}

:deep(.el-input__inner) {
  height: 40px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

:deep(.el-input__inner::placeholder) {
  color: $site_light_pink;
}

:deep(.el-input__icon) {
  color: $site_dark_gray;
}

:deep(.el-form-item__label) {
  color: $site_light_pink;
  padding: 0 !important;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
  margin-bottom: 6px;
}

:deep(.el-input-number__increase) {
  border-radius: 0;
}

:deep(.el-input-number__decrease) {
  border-radius: 0;
}

:deep(.el-textarea__inner) {
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: $site_dark_gray;
}

.button-add {
  border: none;
  background: inherit;
  color: #00b5a4;
  transition: 0.3s;
  cursor: pointer;
}

.button-add:hover {
  color: darken($color: #00b5a4, $amount: 10%);
}

.button-del {
  position: absolute;
  top: 13px;
  right: 36px;
  border: none;
  background: inherit;
  color: #a3a9be;
  transition: 0.3s;
  cursor: pointer;
}

.button-del:hover {
  color: darken($color: #cf3d19, $amount: 5%);
}

.bottom-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 15px;
}

.list-number {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #1979cf;
  border-radius: 20px;
}

.title {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #c4c4c4;
  margin: 10px;
  color: $site_light_pink;
  text-transform: uppercase;
  margin-left: 5px;
  font-size: 14px;
}

.place-item {
  width: calc(100% - 22px);
  position: relative;
  padding: 0 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  margin: 0px;
  background: #dff2f8;
}

.place-item-item {
  position: relative;
  width: calc(100% - 42px);
  margin: 0px 10px 20px 10px;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  padding: 12px 10px;
  background: #f9fafb;
}

.session-edit {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1px solid #343e5c;
  border-radius: 5px;
  width: 100%;
  background: #ffffff;
  padding: 10px;
  z-index: 5;
}

.icon-alarm {
  width: 40px;
  height: 40px;
  fill: #b83616;
  margin: 0 10px 0 0;
}
</style>
