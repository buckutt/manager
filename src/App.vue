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
import { mapState } from 'vuex';
import Header       from './components/Header.vue';

export default {
    components: {
        'b-header': Header
    },

    computed: {
        ...mapState({
            logged: state => !!state.app.loggedUser
        })
    }
};
</script>

<style>
    @import './main.css';

    main.mdl-layout__content {
        overflow: visible;
    }

    div.mdl-card {
        width: 90%;
        margin: 50px auto;

        &.mdl-card--maximized {
            max-width: 500px;
        }
    }

    .b-forcedMain {
        width: 100%;
        margin-left: 0px !important;
    }

    .b-responsive-table {
        overflow-x: auto;
    }

    @media (max-height: 700px) {
        div.mdl-card {
            margin: 15px auto;
        }
    }
</style>
