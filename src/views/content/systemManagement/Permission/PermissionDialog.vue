<template>
  <el-dialog :close-on-click-modal="false" :title="(isUpdate?'修改':'添加')+'权限'" :visible.sync="isShow" width="400px">
    <el-form :model="form" label-width="80px">
      <el-form-item label="所属层级">
        <el-cascader :options="permissionTree" :props="prop" style="width: 100%" clearable v-model="form.parentIdForVModel"></el-cascader>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name" placeHolder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请输入" style="width: 100%">
          <el-option label="分组" value="group"></el-option>
          <el-option label="页面" value="page"></el-option>
          <el-option label="权限" value="permission"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input v-model="form.permission" placeHolder="重要！影响功能访问"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="form.isEnable" active-text="可用" inactive-color="red" inactive-text="停用"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.indexNum"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="isOk()">保 存</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import PermissionApi from 'src/api/permission-api';
  import { showResMsg } from 'src/utils/operation-result-message';

  export default {
    name: 'Add',
    props: {},
    data() {
      return {
        permissionTree: [],
        isUpdate: false,
        isShow: false,
        form: {},
        formEmpty: {
          name: '',
          type: '',
          permission: '',
          isEnable: true,
          parentIdForVModel: [],
          parentId: null,
          indexNum: 1000,
        },
        prop: {
          checkStrictly: true,
          value: 'id',
          label: 'name',
        },
      };
    },
    methods: {
      show(isUpdate, rowInfo, treeInfo) {
        this.isShow = true;
        this.isUpdate = isUpdate;
        this.permissionTree = treeInfo;
        if (isUpdate) {
          this.form = rowInfo;
          this.form.parentIdForVModel = rowInfo.parentId;
          this.form.parentId = 0;
        } else {
          this.form = JSON.parse(JSON.stringify(this.formEmpty));
          if (rowInfo !== undefined) {
            this.form.parentIdForVModel = rowInfo.id;
          }
        }
      },
      isOk() {
        if (Array.isArray(this.form.parentIdForVModel)) {
          if (this.form.parentIdForVModel.length === 0) {
            this.form.parentId = 0;
          } else {
            this.form.parentId = this.form.parentIdForVModel[this.form.parentIdForVModel.length - 1];
          }
        } else {
          this.form.parentId = this.form.parentIdForVModel;
        }
        if (this.isUpdate) {
          PermissionApi.updatePermission(this.form)
            .then(({ data }) => {
              showResMsg(data);
              if (data.result) {
                this.isShow = false;
                this.$emit('up-data');
              }
            });
        } else {
          PermissionApi.addPermission(this.form)
            .then(({ data }) => {
              showResMsg(data);
              if (data.result) {
                this.isShow = false;
                this.$emit('up-data');
              }
            });
        }
      },
    },
  };
</script>

<style scoped>
  body {
    margin: 0;
  }
</style>
