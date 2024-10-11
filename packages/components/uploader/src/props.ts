import type { ExtractPropTypes } from 'vue'

export const Props = {
  options: {
    type: Object,
    default: () => ({}),
  },
  isSlice: {
    type: Boolean,
    default: true,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 0,
  },
  listHide: {
    type: Boolean,
    default: false,
  },
  accept: {
    type: String,
    default: '',
  },
  isCheckFileType: {
    type: Boolean,
    default: true,
  },
  statusText: {
    type: [Object, Function],
    default: () => {
      return {
        success: '成功',
        error: '错误',
        uploading: '上传中...',
        paused: '暂停',
        md5: '计算MD5...',
        waiting: '等待中...',
      }
    },
  },
  headers: {
    type: [Object, Function],
    default: () => ({}),
  },
  requestParams: {
    type: Object,
    default: () => ({}),
  },
  onFileAdded: {
    type: Function,
    default: null,
  },
  onFileSuccess: {
    type: Function,
    default: null,
  },
  onFileError: {
    type: Function,
    default: null,
  },
  onFileComplete: {
    type: Function,
    default: null,
  },
  onFileRemoved: {
    type: Function,
    default: null,
  },
  getInstance: {
    type: Function,
    default: () => ({}),
  },
}

export type UploaderProps = ExtractPropTypes<typeof Props>
