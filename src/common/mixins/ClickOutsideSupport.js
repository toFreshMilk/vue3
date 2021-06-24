export default {
  data () {
    return {
      boundariesElements: [],
    }
  },

  methods: {

    startDetecting (el) {
      this.boundariesElements.push(el)
    },

    __listenClickWorldwide (e) {
      let current = e.target
      const boundariesElements = this.boundariesElements

      if (boundariesElements.length > 0) {
        while (current) {
          for (let i = 0; i < boundariesElements.length; i++) {
            if (current === boundariesElements[i]) {
              return
            }
          }

          current = current.parentNode
        }

        this.$emit('click-outside', e)
      }
    },
  },

  mounted () {
    document.addEventListener('mouseup', this.__listenClickWorldwide)
  },

  beforeDestroy () {
    document.removeEventListener('mouseup', this.__listenClickWorldwide)
  },
}
