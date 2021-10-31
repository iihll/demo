<script lang="jsx">
import { defineComponent } from 'vue'
import h from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div class="home">
        <a-button>test</a-button>
      </div>
    )
  },
})
</script>
