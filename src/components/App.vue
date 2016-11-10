<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
        <Sidebar></Sidebar>
        <main class="mdl-layout__content">
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Sidebar from './Sidebar.vue';

export default {
    components: {
        Sidebar
    },

    methods: {
        ...mapActions([
            'updateLogged'
        ])
    },

    computed: {
        ...mapState({
            logged: state => state.global.logged
        })
    },

    mounted() {
        if (sessionStorage.hasOwnProperty('token')) {
            this.updateLogged(true);
        }
    }
}
</script>