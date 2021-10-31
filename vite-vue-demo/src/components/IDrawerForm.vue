<template>
  <a-drawer
    :title="drawerConfig.title"
    :width="drawerConfig.width"
    v-model:visible="inVisible"
  >
    <div class="drawer-form-container">
      <a-form ref="formRef" :model="inModel" :rules="rules">
        <a-form-item
          v-for="row in formRows"
          :key="row.prop"
          :name="row.prop"
          :label="row.label"
        >
          <a-input
            v-if="row.type === 'input'"
            v-model:value="inModel[row.prop]"
            :placeholder="row.placeholder"
          />
          <a-textarea
            v-if="row.type === 'textarea'"
            v-model:value="inModel[row.prop]"
            :placeholder="row.placeholder"
          />
          <a-radio-group
            v-if="row.type === 'radio'"
            v-model:value="inModel[row.prop]"
          >
            <a-radio
              v-for="option in row.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-radio>
          </a-radio-group>
          <a-select
            v-if="row.type === 'select'"
            v-model:value="inModel[row.prop]"
            :placeholder="row.placeholder"
          >
            <a-select-option
              v-for="option in row.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </a-select-option>
          </a-select>
          <a-date-picker
            v-if="row.type === 'date'"
            v-model:value="inModel[row.prop]"
            show-time
            :type="row.dateType ?? 'date'"
            :placeholder="row.placeholder"
          />
          <a-cascader
            v-if="row.type === 'cascader'"
            v-model:value="inModel[row.prop]"
            :field-names="row.fieldNames"
            :options="row.options"
            :placeholder="row.placeholder"
          />
        </a-form-item>
      </a-form>
    </div>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button @click="onCancel" style="margin-right: 8px">取消</a-button>
      <a-button @click="onSubmit" type="primary">保存</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'IDrawerForm',
  props: {
    rules: {
      type: Object,
      default: () => ({}),
    },
    visible: {
      type: Boolean,
      default: false,
    },
    drawerConfig: {
      type: Object,
      default: () => ({
        title: '',
        width: 720,
      }),
    },
    formState: {
      type: Object,
      default: () => ({}),
    },
    formRows: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:visible', 'update:formState', 'submit', 'cancel'],
  setup(props, { emit }) {
    const formRef = ref()

    const inVisible = computed({
      get() {
        return props.visible
      },
      set(value) {
        emit('update:visible', value)
      },
    })

    const inModel = computed({
      get() {
        return props.formState
      },
      set(value) {
        emit('update:formState', value)
      },
    })

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          emit('submit', inModel.value)
          inVisible.value = false
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    const onCancel = () => {
      emit('cancel')
      inVisible.value = false
    }

    return {
      formRef,
      inVisible,
      inModel,
      onSubmit,
      onCancel,
    }
  },
})
</script>

<style scoped>
.drawer-form-container {
  padding: 0 60px;
}
</style>