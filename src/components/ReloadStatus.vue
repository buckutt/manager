<template>
    <div class="b-reload-status">
        <div class="mdc-card">
            <section class="mdc-card__primary">
                <h1 class="mdc-card__title mdc-card__title--large">Rechargement</h1>
            </section>
            <section class="mdc-card__supporting-text" v-if="status === 'success'">
                Le paiement <strong>a bien été pris en compte</strong>. Il sera effectif d'ici quelques instants.
            </section>
            <section class="mdc-card__supporting-text" v-else>
                Le paiement <strong>n'a pas été pris en compte</strong>. Contactez votre banque si vous ne pensez pas que cela correspond à un fonctionnement normal.
            </section>
            <section class="mdc-card__actions">
                <router-link tag="button" to="/" class="mdc-button mdc-button--raised">Retour à l'accueil</router-link>
            </section>
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

<style lang="scss">
.b-reload-status section.mdc-card__supporting-text {
    padding-top: 16px;
    font-size: 16px;
}
</style>
