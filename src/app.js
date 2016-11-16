import 'material-design-lite/material.min.js';
import 'material-design-lite/material.min.css';

import Vue       from 'vue';
import VueRouter from 'vue-router';
import Vuex      from 'vuex';
import VueMdl    from 'vue-mdl';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMdl);

import App     from './components/App.vue';
import History from './components/History.vue';
import Home    from './components/Home.vue';
import Logout  from './components/Logout.vue';

import store from './store/index';

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
        path     : '/logout',
        component: Logout
    }
];

const router = new VueRouter({ routes });

const app = Vue.extend({
    router,
    store,
    components: { App },
    template  : '<App></App>'
});

new app().$mount('#app');
