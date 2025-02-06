<template>
  <div class="p-[16px]">
    <div class="flex items-center justify-center pt-4">
      <el-button type="primary" @click="isReadonly = true">只读模式</el-button>
      <el-button type="primary" plain @click="isReadonly = false">编辑模式</el-button>
    </div>
    <el-form
      ref="FormInstance"
      :inline="true"
      :model="formModel"
      :rules="rules"
      label-position="right"
      label-width="140px"
      class="py-[16px]"
      :disabled="isReadonly"
      :class="isReadonly ? 'readonly-form' : ''"
    >
      <el-form-item prop="contact_way" label="对接人联系方式" class="w-[100%]">
        <el-input v-model="formModel.contact_way" placeholder="请输入" :disabled="isReadonly"></el-input>
      </el-form-item>
      <el-form-item label="对接单位名称" prop="unit_name" class="w-[100%]">
        <el-input
          v-model="formModel.unit_name"
          maxlength="50"
          placeholder="请输入对接单位名称"
          clearable
          :disabled="isReadonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="对接数据内容" prop="data_info" :disabled="isReadonly" class="w-[100%]">
        <el-input
          v-model="formModel.data_info"
          type="textarea"
          maxlength="5000"
          :rows="3"
          placeholder="请输入对接数据内容"
          clearable
          :disabled="isReadonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="对接方式" prop="method" class="w-[100%]">
        <el-select v-model="formModel.method" clearable placeholder="请选择" :disabled="isReadonly" class="w-[100%]">
          <el-option
            v-for="(item, index) in DOCK_METHOD"
            :key="index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否全网数据" prop="is_all" class="w-[100%]">
        <el-switch
          v-model="formModel.is_all"
          inline-prompt
          :active-value="1"
          style="--el-switch-on-color: #444cff; --el-switch-off-color: #bfbfbf"
          active-text="是"
          inactive-text="否"
          :disabled="isReadonly"
        ></el-switch>
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="formModel.type">
          <el-checkbox value="Online activities" name="type"> Online activities </el-checkbox>
          <el-checkbox value="Promotion activities" name="type"> Promotion activities </el-checkbox>
          <el-checkbox value="Offline activities" name="type"> Offline activities </el-checkbox>
          <el-checkbox value="Simple brand exposure" name="type"> Simple brand exposure </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="formModel.resource">
          <el-radio value="Sponsor">Sponsor</el-radio>
          <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="对接日期" prop="start_time">
        <el-date-picker
          v-model="formModel.start_time"
          clearable
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          type="date"
          placeholder="请选择对接日期"
          :disabled="isReadonly"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="security_name" label="安保责任人" class="w-[100%]">
        <yto-c-user-search v-model="formModel.security_name" model-item :disabled="isReadonly"></yto-c-user-search>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const DOCK_METHOD = [{ label: '我方推送' }, { label: '对方查询' }]
const TASK_STATUS = [
  { label: '需求确认', value: 0, color: 'info' },
  { label: '对接中', value: 1, color: 'default' },
  { label: '开发中', value: 2, color: 'default' },
  { label: '已上线', value: 3, color: 'success' },
  { label: '已暂停', value: 4, color: 'warning' },
  { label: '已终止', value: 5, color: 'danger' },
]
const isReadonly = ref(false)
const formModel = reactive<any>({
  unit_name: '',
  task_state: '',
  is_all: 0,
  is_sm: 0,
  is_sensitive: 0,
  is_push_encrypt: 0,
  job_state: 0,
  is_data_encrypt: 0,
  yto_insensitive: 0,
  ip_whitelist: 0,
})
const rules = {
  unit_name: [{ required: true, message: '请输入', trigger: 'blur' }],
  task_state: [{ required: true, message: '请选择', trigger: ['blur', 'change'] }],
}
</script>
<style lang="scss">
.readonly-form {
  .el-form-item.is-required:not(.is-no-asterisk).asterisk-left > .el-form-item__label:before {
    display: none;
  }
  .placeholder-text-color {
    color: #a8abb2;
  }
  .el-textarea.is-disabled .el-textarea__inner {
    background: #fff;
    box-shadow: none;
  }
  .el-select__wrapper.is-disabled,
  .el-input.is-disabled .el-input__wrapper {
    box-shadow: none;
    background: #fff;
  }
  .el-select__wrapper:hover {
    box-shadow: none;
  }
  .el-select .el-input.is-disabled .el-input__wrapper:hover {
    box-shadow: none;
  }
  .el-select .el-input.is-disabled .el-input__suffix {
    display: none;
  }
  .el-textarea.is-disabled .el-textarea__inner,
  .el-select .el-input.is-disabled .el-input__wrapper,
  .el-input.is-disabled .el-input__wrapper,
  .el-input.is-disabled .el-input__inner,
  .el-select .el-input.is-disabled .el-input__inner {
    cursor: default;
    color: #606266;
    -webkit-text-fill-color: #606266;
  }

  .el-select__selected-item span {
    color: rgb(96, 98, 102);
  }

  textarea {
    resize: none;
  }
  .el-select__suffix,
  .el-input__prefix {
    display: none;
  }
  .el-select__selected-item.el-select__placeholder.is-transparent,
  .el-form-item__error,
  textarea::placeholder,
  input::placeholder {
    opacity: 0;
  }
}
</style>
