import Vue from 'vue'
import sceneChildrenSlot from '../components/sceneChildrenSlot.vue'
import deviceSwitch from '../components/deviceSwitch.vue'
import siteSwitch from '../components/siteSwitch.vue'
import propertyInstanceSlot from '../components/propertyInstanceSlot.vue'
// import propertyAssetArea from '../components/propertyAssetArea.vue'
// import propertyTextArea from '../components/propertyTextArea.vue'
import childrenSlot from '../components/childrenSlot.vue'


import { getConfig } from '../../config'

// Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('property-instance-slot', propertyInstanceSlot)
// Vue.component('property-asset-area', propertyAssetArea)
// Vue.component('property-text-area', propertyTextArea)
Vue.component('children-slot', childrenSlot)
Vue.component('system-container', require('../components/container').default)
Vue.component('container', require('../components/container').default)

Vue.component('SceneChildrenSlot', sceneChildrenSlot)
Vue.component('DeviceSwitch', deviceSwitch)
Vue.component('SiteSwitch', siteSwitch)
// Vue.component(
//   'SystemColumnDivision',
//   require('../components/columnDivision').default,
// )
// Vue.component('SystemScene', require('../components/scene').default)
Vue.component('InstanceRenderer', () => import('../components/instanceRenderer'))

const config = getConfig()

export default ({ app }) => {
  Vue.prototype.$$config = config
  app.$$config = config
}
