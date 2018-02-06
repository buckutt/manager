<template>
    <div class="b-reload-status b--centered">
        <div class="mdl-card mdl-card--maximized mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Rechargement</h2>
            </div>
            <div class="mdl-card__supporting-text b--fullwidth" v-if="status === 'success'">
                Le paiement a bien été pris en compte. Il sera effectif d'ici quelques instants.
            </div>
            <div class="mdl-card__supporting-text b--fullwidth" v-else>
                Le paiement n'a pas été pris en compte. Contactez votre banque si vous ne pensez pas que cela correspond à un fonctionnement normal.
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <router-link to="/" colored raised class="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect b--inputwidth">Retour à l'accueil</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: {
            type    : String,
            required: true
        }
    }
};
</script>

<style>
    .b-reload-status {
        max-width: 800px;
        text-align: center;

        & > .mdl-card {
            min-height: auto;
        }

        & .mdl-card__title > h2 {
            margin: 0 auto;
        }

        & .mdl-button {
            max-width: 300px;
            margin: 10px auto;
        }
    }
</style>
