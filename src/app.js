import 'material-design-lite/material.min';
import 'material-design-lite/material.min.css';

import Vue       from 'vue';
import VueRouter from 'vue-router';
import Vuex      from 'vuex';
import VueMdl    from 'vue-mdl';

import App       from './components/App.vue';
import ChangePin from './components/ChangePin.vue';
import History   from './components/History.vue';
import Home      from './components/Home.vue';
import Logout    from './components/Logout.vue';
import Transfer  from './components/Transfer.vue';

import store from './store/index';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueMdl);

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
        path     : '/pin',
        component: ChangePin
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

const Manager = Vue.extend({
    router,
    store,
    components: { App },
    template  : '<App></App>'
});

new Manager().$mount('#app');
