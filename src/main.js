import 'promise-polyfill';
import 'whatwg-fetch';

import 'material-design-lite/material.min';
import 'material-design-lite/material.min.css';

import Vue       from 'vue';
import VueRouter from 'vue-router';
import Vuex      from 'vuex';
import VueMdl    from 'vue-mdl';

import './assets/font.css';

import App            from './App.vue';
import ChangePin      from './components/ChangePin.vue';
import GeneratePin    from './components/GeneratePin.vue';
import History        from './components/History.vue';
import Reload         from './components/Reload.vue';
import Home           from './components/Home.vue';
import Logout         from './components/Logout.vue';
import Transfer       from './components/Transfer.vue';
import PaginatedTable from './components/PaginatedTable.vue';

import store from './store/index';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/assets/sw.js');
}

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMdl);

Vue.component('b-table', PaginatedTable);

const routes = [
    {
        path     : '/',
        component: Home
    },
    {
        path     : '/history',
        component: History
    },
    {
        path     : '/reload',
        component: Reload
    },
    {
        path     : '/pin',
        component: ChangePin
    },
    {
        path     : '/generate',
        component: GeneratePin
    },
    {
        path     : '/transfer',
        component: Transfer
    },
    {
        path     : '/logout',
        component: Logout
    }
];

const router = new VueRouter({ routes });

router.beforeEach((route, from, next) => {
    if ((route.path !== '/' && route.path !== '/generate') && !router.app.$store.getters.logged) {
        next('/');
    } else if (route.path === '/' && router.app.$store.getters.logged) {
        next('/history');
    } else {
        next();
    }
});

router.afterEach(() => {
    const $sidebar = document.querySelector('.b-sidebar');

    if ($sidebar) {
        $sidebar.classList.remove('is-visible');
        document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible');
    }
});

store.dispatch('createNeededData');

const Manager = Vue.extend({
    router,
    store,
    components: { App },
    template  : '<App></App>'
});

const vueApp = new Manager().$mount('#app');

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'UPDATENOTIFY':
            vueApp.$root.$emit('snackfilter', {
                message: mutation.payload.message
            });
            break;
        default:
            break;
    }
});
