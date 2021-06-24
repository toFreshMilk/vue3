import Vue from 'vue';
import transTimeDir from '@/common/directives/transTimeDir';
import { VueEditor } from "vue2-editor";
Vue.directive('transTimeFormat', transTimeDir)
Vue.component('vue-editor', VueEditor)
