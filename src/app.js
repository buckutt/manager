import 'material-design-lite/material.min.js';
import 'material-design-lite/material.min.css';

import Vue       from 'vue';
import VueRouter from 'vue-router';
import VueMdl    from 'vue-mdl';

Vue.use(VueRouter);
Vue.use(VueMdl);

import App     from './components/App.vue';
import Home    from './components/Home.vue';

const routes = [
    {
        path     : '/',
        component: Home
    }
];

const router = new VueRouter({ routes });

const app = Vue.extend({
    router,
    components: { App },
    template  : '<App></App>'
});

new app().$mount('#app');
