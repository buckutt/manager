<template>
    <div class="mdl-layout mdl-js-layout">
        <b-header />
        <main class="mdl-layout__content" :class="{ 'b-forcedMain': !logged }">
            <router-view></router-view>
        </main>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header         from './components/Header.vue';

export default {
    components: {
        'b-header': Header
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

    .mdl-layout__content {
        overflow-y: auto;
        overflow-x: hidden;
    }

    .mdl-card {
        width: 90%;
        max-width: 1400px;
        margin: 50px auto;
    }

    .b-forcedMain {
        width: 100%;
        margin-left: 0px !important;
    }

    .b-responsive-table {
        overflow-x: auto;
    }

    @media (max-height: 700px) {
        .mdl-card {
            margin: 15px auto;
        }
    }
</style>
