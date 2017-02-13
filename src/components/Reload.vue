<template>
    <div class="b-reload b--centered">
        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Recharger en ligne</h2>
            </div>
            <form @submit.prevent="reload(amount)">
                <div class="mdl-card__supporting-text b--fullwidth">
                    <mdl-textfield type="number" max="100" min="5" step="0.10" pattern="[0-9]*(\.[0-9]+)?" error="Veuillez entrer un prix correct" floating-label="Montant" v-model="amount" class="b--inputwidth"></mdl-textfield>
                    <p>Vous serez redirigé vers un site bancaire sécurisé.</p>
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth">Valider</mdl-button>
                </div>
            </form>
        </div>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            amount: ''
        };
    },

    methods: {
        reload(amount) {
            console.log(amount);
        }
    }
}
</script>

<style lang="sass">
    @import '../main.scss';

    .b-reload {
        max-width: 800px;
    }
</style>
