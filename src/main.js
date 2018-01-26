import 'promise-polyfill';
import 'whatwg-fetch';
import 'material-design-lite/material.min';

import Vue    from 'vue';
import VueMdl from 'vue-mdl';

import App            from './App';
import store          from './store/index';
import router         from './router';
import PaginatedTable from './components/PaginatedTable.vue';

import './fonts.css';

import(/* webpackChunkName: "mdl" */ 'material-design-lite/material.min.css');
Vue.config.productionTip = false;

Vue.use(VueMdl);

Vue.component('b-table', PaginatedTable);

store.dispatch('createNeededData');

window.app = new Vue({
    el    : '#app',
    router,
    store,
    render: h => h(App)
});

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'UPDATENOTIFY':
            window.app.$root.$emit('snackfilter', {
                message: mutation.payload.message
            });
            break;
        default:
            break;
    }
});
