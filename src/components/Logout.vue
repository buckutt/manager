<template>
    <div>
        Déconnexion en cours...
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
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

    mounted () {
        sessionStorage.clear();
        this.updateLogged(false);

        this.$router.push('/');
    }
}
</script>