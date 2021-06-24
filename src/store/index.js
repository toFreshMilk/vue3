import Vue from 'vue'
import Vuex from 'vuex'
import * as root from '../../_core/store/root';
import * as page from '../../_core/store/page';
import * as http from '../../_core/store/http';
import * as site from '../../_core/store/site';
import * as session from '../../_core/store/sessionService';
import * as device from '../../_core/store/device';
import * as nodeType from './modules/nodeType';
import * as interior from './modules/interior';
import * as cookie from '../../_core/store/cookie';
import * as storage from '../../_core/store/storage';
import * as contentFragment from '../../_core/store/contentFragment';
import * as util from './util'
import * as storeCategory from './modules/storeCategory';
import * as productCategory from './modules/product/productCategory';

Vue.use(Vuex)
const createStore = () => {
    return new Vuex.Store({
        state: root.state(),
        getters: root.getters,
        mutations: root.mutations,
        actions: root.actions,
        modules: {
            page,
            contentFragment,
            http,
            session,
            site,
            device,
            nodeType,
            cookie,
            storage,
            util,
            interior,
            storeCategory,
            productCategory,
        },
    });
};

export default createStore;
