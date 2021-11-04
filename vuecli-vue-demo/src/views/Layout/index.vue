<template>
  <a-layout style="min-height: 100vh">
    <Header />
    <a-layout>
      <Sider />
      <a-layout>
        <Content />
        <Footer />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import components from './components'

export default defineComponent({
  components: {
    ...components
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    }
  },
})
</script>

<style>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
