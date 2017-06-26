<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <b-sidebar></b-sidebar>
        <main class="mdl-layout__content" :class="{ 'b-forcedMain': !logged }">
            <router-view></router-view>
        </main>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar        from './components/Sidebar.vue';

export default {
    components: {
        'b-sidebar': Sidebar
    },

    computed: {
        ...mapGetters([
            'logged'
        ])
    }
};
</script>

<style>
    @import './main.css';

    .mdl-card {
        width: 90%;
        max-width: 1400px;
        margin: 50px auto;
    }

    .b-forcedMain {
        width: 100%;
        margin-left: 0px !important;
    }
</style>
