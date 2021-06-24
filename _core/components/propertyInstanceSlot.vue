<script>
export default {
  props: {
    pid: {
      type: String,
    },
    instanceOrInstances: {
      type: Array,
      default: () => [],
    },
    minHeight: {
      type: Number,
    },
    minWidth: {
      type: Number,
    },
    maxLength: {
      type: Number,
    },
  },

  methods: {
    renderInstances (ce) {
      if (Array.isArray(this.instanceOrInstances)) {
        if (this.instanceOrInstances.length === 0) {
          return ce('builder-placeholder', {
            props: {
              title: 'Drop Image Here',
              height: '200px',
              width: '200px',
              inlineBlock: true,
            },
          }, 'Test Image')
        }

        return this.instanceOrInstances.map(instance =>
          ce('instance-renderer', {
            props: {
              instance,
            },
          }),
        )
      } else {
        return ce('instance-renderer', {
          props: {
            instance: this.instanceOrInstances,
          },
        })
      }
    },
  },

  render (ce) {
    const attrs = {
      'ice-prop-slot': this.pid,
    }

    if (this.maxLength > 0) {
      attrs['ice-prop-slot-max'] = this.maxLength
    }

    return ce(
      'div',
      {
        props: {
          // 'ice-prop-slot': this.pid,
        },

        class: {
          'property-instance-slot': true,
        },

        attrs,

        style: {
          minHeight: this.minHeight,
          minWidth: this.minWidth,
        },
      },
      [this.renderInstances(ce)],
    )
  },
}
</script>
