<template>
  <i-drawer-form
    :form-rows="formRows"
    v-model:formState="formState"
    v-model:visible="visible"
    :drawer-config="drawerConfig"
    :rules="rules"
    @submit="onSubmit"
    @cancel="onCancel"
  />
  <a-button @click="openDrawer">open drawer</a-button>
</template>

<script>
import IDrawerForm from '@/components/IDrawerForm.vue'
import { toRaw } from 'vue'

class FormState {
  constructor() {
    this.name = ''
    this.age = ''
    this.sex = '1'
    this.time = undefined
  }
}

export default {
  components: { IDrawerForm },
  data() {
    return {
      drawerConfig: {
        title: '新增用户',
        width: 720
      },
      visible: false,
      formState: new FormState(),
      formRows: [
        {
          type: 'input',
          label: '姓名',
          prop: 'name',
          placeholder: '请输入姓名',
        },
        {
          type: 'textarea',
          label: '年龄',
          prop: 'age',
          placeholder: '请输入年龄',
        },
        {
          type: 'radio',
          label: '性别',
          prop: 'sex',
          // placeholder: '请选择年龄'
          options: [
            {
              label: '男',
              value: '1',
            },
            {
              label: '女',
              value: '0',
            },
          ],
        },
        {
          type: 'date',
          label: '时间',
          prop: 'time',
          placeholder: '请选择时间',
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
        ],
        age: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
        ],
        time: [
          {
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
            type: 'object',
          },
        ],
        sex: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
          },
        ],
      },
    }
  },
  methods: {
    openDrawer() {
      this.visible = true
    },
    onSubmit(inModel) {
      console.log('inModel', toRaw(inModel))
      console.log('formState', toRaw(this.formState))
    },
    onCancel() {
      this.formState = new FormState()
    }
  },
}
</script>
