<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <a-menu theme="dark" mode="inline">
      <Menu :menus="menus" />
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Menu from './Menu.vue'

export default defineComponent({
  components: { Menu },
  setup() {
    const router = useRouter()
    const store = useStore()
    const menus = computed(() => {
      return router.options.routes.filter((item) => !item.meta.hidden)
    })
    const collapsed = computed({
      get() {
        return store
      }
    })

    return {
      menus,
      collapsed,
    }
  },
})
</script>
