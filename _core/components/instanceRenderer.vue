<script>
import _pickBy from 'lodash/pickBy'
import _get from 'lodash/get'
import _isArray from 'lodash/isArray'
import { groupByKey } from '@@/_core/utils/Array'
import { convertToStylesObject } from '../utils/String'

function isAvailable (value) {
  return !(value === null || value === undefined)
}

function buildFlexibleLayout (data) {
  const result = {
    height: data.height,
    width: data.width,
    minHeight: data.minHeight,
    minWidth: data.minWidth,
    left: data.left,
    top: data.top,
    margin: data.margin,
    display: _get(data, 'displayMethod.value'),
    position: _get(data, 'position.value'),
    textAlign: _get(data, 'textAlign.value'),
    verticalAlign: _get(data, 'verticalAlign.value'),
    padding: _get(data, 'padding'),
  }

  // remove null values
  Object.keys(result).forEach(key => (result[key] == null) && delete result[key])

  return result
}

export default {
  props: {
    instance: {
      type: Object,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    flashData () {
      return this.$store.state.page.editorFlashDataStore || {}
    },
  },

  methods: {
    makeElementOptions (
      instance,
      {
        isRoot,
        area,
        zIndex,
        defaultHeight = null,
        defaultWidth = null,
      },
    ) {
      let props = _pickBy(instance.props, isAvailable)
      let layout = _pickBy(instance.layout, isAvailable)
      const layoutId = _get(layout, 'id');

      const useDisplayName = _get(instance, 'component.item.useEmptyContainer') != null ? _get(instance, 'component.item.useEmptyContainer') : true
      const acceptChildren = _get(instance, 'component.item.childrenAcceptable')
      const hasChildren = _get(instance, 'instances.length', 0) > 0
      const displayName = _get(instance, 'component.item.emptyContainerDescription') || _get(instance, 'component.item.label')
      const showEmptyDescription = this.$$inEditing && useDisplayName && acceptChildren && !hasChildren

      const inlineStyles = convertToStylesObject(layout)

      if (
        this.$store.state.page.editorFlashDataStore &&
        this.$store.state.page.editorFlashDataStore.instanceProps &&
        this.$store.state.page.editorFlashDataStore.instanceProps[
          '#' + instance.renderId
        ]
      ) {
        props = {
          ..._pickBy(instance.props, isAvailable),
          ..._pickBy(
            this.$store.state.page.editorFlashDataStore.instanceProps['#' + instance.renderId],
            isAvailable,
          ),
        }
      }

      const flashInstanceLayouts = this.flashData.instanceLayout
      // Merge Flash layout
      if (flashInstanceLayouts) {
        const flashLayout = flashInstanceLayouts['#' + instance.id]

        if (flashLayout) {
          layout = {
            ...layout,
            ..._pickBy(
              flashLayout,
              isAvailable,
            ),
          }
        }
      }

      const elementOpts = {
        attrs: {
          'ice-instance-id': instance.instanceId,
          'ice-instance-type': 'foInstance',
          'ice-component': instance.component.refId,

          ...(showEmptyDescription ? { 'data-display-name': displayName } : null),
          ...(area ? { 'ice-area': area } : null),
          ...(props.dataId ? { 'ice-data': props.dataId.refId || props.dataId } : null),
        },
        style: {
          minWidth: defaultWidth,

          ...(defaultHeight ? { minHeight: defaultHeight } : null),

          ...inlineStyles,
        },
        class: {
          with_named_box: showEmptyDescription,
        },
        props: {
          instanceId: instance.instanceId,
          isRoot,
          layout,
          ...props,
        },
      }

      // if (
      //   instance.commonInstanceIndex &&
      //   instance.commonInstanceIndex.length > 0
      // ) {
      //   elementOpts.attrs['ice-commonid'] =
      //     instance.commonInstanceIndex[0].commonInstanceIndexId;
      //   elementOpts.attrs['ice-commontype'] =
      //     instance.commonInstanceIndex[0].commonType.value;
      // }

      if (!layout.grid) {
        Object.assign(elementOpts.style, buildFlexibleLayout(layout))
      }

      if (layout.bg) {
        if (layout.bg.cssColor) {
          elementOpts.style.backgroundColor = layout.bg.cssColor
        }

        if (layout.bg.image) {
          elementOpts.style.backgroundImage = `url(${this.$cmsSrc(
            layout.bg.image.fileValue,
          )})`
          elementOpts.attrs.alt = layout.bg.image.name
        }

        if (layout.bg.imageSizing) {
          elementOpts.style.backgroundSize = layout.bg.imageSizing.value
        }
      }

      if (zIndex || layout.zIndex) {
        elementOpts.style.zIndex = zIndex || layout.zIndex
      }

      return elementOpts
    },

    renderRecursively (
      createElement,
      target,
      options = {},
    ) {
      if (!_isArray(target.instances) && !target.component) {
      // return createElement('div', {}, ['Instance is null'])
        return null
      }

      // let theme

      // if (this.$store.state.site.theme) {
      //   theme = this.$store.state.site.theme.value
      // } else {
      //   console.error('사이트에 테마가 지정되지 않았습니다.')
      // }

      let componentName
      let element = null
      const originName = target.component.value.replace(/^@?theme-/, '')
      const altComponentName = originName.replace(/^@theme/, '')

      // const layoutTypeKey = 'layout.grid'
      const layoutTypeKey = (item) => {
        const layoutType = _get(item, 'layout.grid')
        const componentId = _get(item, 'component.item.id')

        const excepts = ['column', 'row']

        if (excepts.find(i => (componentId || '').includes(i))) {
          return 'ignore'
          // or
          // return false // currently we only have 2 layout type: grid == true and grid == false
        }

        return layoutType
      }
      const children = groupByKey(target.instances || [], layoutTypeKey, true)

      const renderChildren = children.reduce((result, array) => {
        const firstItem = _get(array, '0')
        const groupType = layoutTypeKey(firstItem)

        if (groupType == true) { // if it is layout grid
          const gridLayoutWrapper = createElement('div', {}, array.map(child => this.renderRecursively(createElement, child)))
          result.push(gridLayoutWrapper)
        } else {
          array.filter(i => i).forEach((child) => {
            result.push(this.renderRecursively(createElement, child))
          })
        }

        return result
      }, [])

      if (target.component) {
        componentName = originName
      } else {
        console.error('인스턴스에 컴포넌트가 지정되지 않았습니다.')
      }

      // ==============================
      // ====== Render Component ======
      // ==============================
      element = createElement(
        componentName,
        this.makeElementOptions(target, options),
        renderChildren,
      )

      if (element.tag === componentName) {
        /**
         *  공통 컴포넌트 매핑 시도
         */
        element = createElement(
          altComponentName,
          this.makeElementOptions(target, options),
          renderChildren,
        )
      } else if (element.tag === altComponentName) {
        /**
           * 에러 표시 컴포넌트 매핑
           */
        element = createElement(
          'div',
          {
            ...this.makeElementOptions(target, options),
            class: {
              'not-defined': true,
            },
          },
          [`Component[${componentName}] not defined`],
        )
      }

      return element
    },
  },
  render (ce) {
    return this.renderRecursively(ce, this.instance, this.options)
  },
}
</script>

<style scoped>
.not-defined {
  /*width: 100%;*/
  color: #fff;
  text-align: center;
  background-color: #d23939;
  padding: 10px;
}
</style>

<style lang="scss">
.with_named_box[ice-prop-type="children"],
.with_named_box [ice-prop-type="children"] {
  position: relative;
  min-height: 70px;

  &:hover {
    content: attr(data-display-name);
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    background-color: rgba(0, 160, 233, 0.6);
    border: 1px dashed #888888;
    pointer-events: none;
  }
}
</style>
