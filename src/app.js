import Vue       from 'vue';
import VueRouter from 'vue-router';
import VueMdl    from 'vue-mdl';

Vue.use(VueRouter);
Vue.use(VueMdl);

import Sidebar from './components/Sidebar.vue';
import Home    from './components/Home.vue';

const routes = [
    {
        path     : '/',
        component: Home
    }
];

const router = new VueRouter({ routes });

const App = Vue.extend({
    router,
    components: { Sidebar },
    template  : '<div><Sidebar></Sidebar><router-view></router-view></div>'
});

new App().$mount('#app');