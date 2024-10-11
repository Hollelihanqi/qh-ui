# ElForm 表单状态

基于 element-plus：el-form 的样式进行修改，在编辑和 只读状态下的不同样式状态

### 功能

- 编辑和只读页面只需要写一个，通过样式控制不同状态
- 每个 el-form 控件 或者在整改 el-form 中必须动态绑定 disabled 属性
- 在 el-form 中动态绑定只读模式下的 class 名称

## 基本使用

<template>
  <FormReadonlyClass/>
</template>
<script setup>
import FormReadonlyClass from './components/FormReadonlyClass.vue'

</script>

## 只读模式下的样式

```js
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
```
