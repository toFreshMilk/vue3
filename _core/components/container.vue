<script>
import get from 'lodash/get'

export default {
  props: {
    isRoot: {
      type: Boolean,
    },
  },

  computed: {
    topClass () {
      /**
			 * 근처영역 마우스 오버 감지후 실제 컨텐츠를 감싸는 높이에 따라 스스로 높이 확장
			 */

      return 'detail_body sys-container ' + (this.isRoot && 'root-container ') + (this.$$inEditing && 'editor-mode')
    },
  },

  render (createElement, a) {
    const slots = get(this.$slots, 'default', [])

    return createElement('children-slot', { class: this.topClass }, slots)
  },
}
</script>

<style scoped lang="scss">
.sys-container {
	width: 100%;
	height: 100%;

	.row-wrapper {
		display: block;
	}
}
</style>
