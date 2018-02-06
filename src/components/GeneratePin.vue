<template>
    <div class="b-generatepin b--centered">
        <div class="mdl-card mdl-card--maximized mdl-shadow--2dp" v-if="!key">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Code PIN oublié</h2>
            </div>
            <form @submit.prevent="ask(mail)">
                <div class="mdl-card__supporting-text fullwidth">
                    <mdl-textfield floating-label="Adresse mail" v-model="mail" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <router-link to="/" class="mdl-button mdl-button--colored mdl-js-button b--left">
                        Retour
                    </router-link>
                    <mdl-button colored raised class="b--right" v-show="!loading">Envoyer</mdl-button>
                    <div class="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect b--right" v-show="loading">Traitement en cours...</div>
                    <div class="b--clear"></div>
                </div>
            </form>
        </div>
        <div class="mdl-card mdl-shadow--2dp" v-else>
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Choix du nouveau code PIN</h2>
            </div>
            <form @submit.prevent="change(key, pin, confirmedPin)">
                <div class="mdl-card__supporting-text fullwidth">
                    <mdl-textfield type="password" floating-label="Nouveau code PIN" v-model="pin" class="b--inputwidth"></mdl-textfield><br />
                    <mdl-textfield type="password" floating-label="Nouveau code PIN (confirmation)" v-model="confirmedPin" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth">Modifier</mdl-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            mail        : '',
            pin         : '',
            confirmedPin: '',
            key         : this.$route.query.key,
            loading     : false
        };
    },

    methods: {
        ...mapActions([
            'askPin',
            'generatePin',
            'notify'
        ]),

        change(key, pin, confirmedPin) {
            this.generatePin({ key, pin, confirmedPin })
                .then((message) => {
                    this.pin          = '';
                    this.confirmedPin = '';
                    this.notify(message);
                    this.$router.push('/');
                })
                .catch(error => this.notify(error));
        },

        ask(mail) {
            this.loading = true;
            this.askPin(mail)
                .then((message) => {
                    this.loading = false;
                    this.notify(message);
                })
                .catch(error => this.notify(error));
        }
    }
};
</script>

<style>
    .b-generatepin {
        max-width: 800px;
    }
</style>
