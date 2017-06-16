<template>
    <div>
        Déconnexion en cours...
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions([
            'updateLoggedUser',
            'closeSocket'
        ])
    },

    mounted() {
        sessionStorage.clear();
        this.updateLoggedUser(null);
        this.closeSocket();

        this.$router.push('/');
    }
};
</script>
