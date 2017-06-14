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
            'updateLoggedUser'
        ])
    },

    mounted() {
        sessionStorage.clear();
        this.updateLoggedUser(null);

        this.$router.push('/');
    }
};
</script>
