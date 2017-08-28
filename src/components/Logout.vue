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
            'clearHistory',
            'closeSocket'
        ])
    },

    mounted() {
        sessionStorage.clear();
        this.updateLoggedUser(null);
        this.clearHistory();
        this.closeSocket();

        this.$router.push('/');
    }
};
</script>
