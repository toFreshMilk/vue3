import Vue from 'vue'

import * as dateUtils from './date'
import * as numberUtils from './NumberFormat'
import * as textUtils from './TextFormat'

for (let k in dateUtils) {
  Vue.filter(k, dateUtils[k]);
}
for (let k in numberUtils) {
  Vue.filter(k, numberUtils[k]);
}
for (let k in textUtils) {
  Vue.filter(k, textUtils[k]);
}
