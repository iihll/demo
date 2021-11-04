<script lang="jsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => (
      <div class="home">
        <a-button>test</a-button>
        <div className="ca">
        </div>
      </div>
    )
  },
})
</script>
