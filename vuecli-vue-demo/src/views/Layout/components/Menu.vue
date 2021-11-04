<template>
  <template v-for="menu in menus" :key="basePath + '/' + menu.path">
    <template v-if="menu.children && menu.children.length">
      <a-sub-menu :key="basePath + '/' + menu.path">
        <template #title>
          <span>{{ menu.meta.title }}</span>
        </template>
        <Menu :menus="menu.children" :base-path="menu.path" />
      </a-sub-menu>
    </template>
    <template v-else>
      <a-menu-item :key="basePath + '/' + menu.path">
        <router-link :to="basePath + '/' + menu.path">{{ menu.meta.title }}</router-link>
      </a-menu-item>
    </template>
  </template>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    basePath: {
      type: String,
      default: '',
    },
  },
})
</script>
