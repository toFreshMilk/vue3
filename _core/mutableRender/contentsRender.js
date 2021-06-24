import applicationConfig from '../../config'
import EditablePageParams from '../common/editablePageParams'
import { actionTypes } from '../store/page'
import DefaultEditable from './DefaultEditable'

export default {
  ...DefaultEditable,
  methods: {
    ...DefaultEditable.methods,
  },
}
