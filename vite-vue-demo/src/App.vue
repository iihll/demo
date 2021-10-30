<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <a-config-provider>
        <router-view />
      </a-config-provider>
    )
  }
})
</script>