<template>
    <div class="b-generatepin b--centered">
        <div class="mdl-card mdl-shadow--2dp" v-if="!key">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Code PIN oublié</h2>
            </div>
            <form @submit.prevent="ask(mail)">
                <div class="mdl-card__supporting-text fullwidth">
                    <mdl-textfield floating-label="Adresse mail" v-model="mail" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth" v-show="!loading">Envoyer</mdl-button>
                    <div class="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect b--inputwidth" v-show="loading">Traitement en cours...</div>
                    <router-link to="/" class="mdl-button mdl-button--colored mdl-button--raised mdl-js-button mdl-js-ripple-effect b--inputwidth">
                        Retour
                    </router-link>
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
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import bcrypt       from 'bcryptjs';
import { get, put } from '../lib/fetch';

export default {
    data () {
        return {
            mail        : '',
            pin         : '',
            confirmedPin: '',
            key         : this.$route.query.key,
            loading     : false
        };
    },

    methods: {
        change(key, pin, confirmedPin) {
            let message = null;

            if (pin != confirmedPin) {
                message = 'Les deux codes PIN ne sont pas identiques';
            }

            if (pin.length != 4) {
                message = 'Le nouveau code PIN ne fait pas la bonne longueur';
            }

            if (message) {
                const data = {
                    message,
                    timeout: 3000
                };

                this.$root.$emit('snackfilter', data);

                return;
            }

            bcrypt.hash(pin, 10, (err, hash) => {
                put('generatepin', {
                        key,
                        pin: hash
                    })
                    .then(result => {
                        if (result.status) {
                            const eData = {
                                message: 'Ce mail a déjà été utilisé pour changer de mot de passe.',
                                timeout: 3000
                            };

                            this.$root.$emit('snackfilter', eData);
                            return;
                        }
                        this.pin          = '';
                        this.confirmedPin = '';

                        const cData = {
                            message: 'Le code PIN a bien été changé',
                            timeout: 1000
                        };

                        this.$root.$emit('snackfilter', cData);

                        setTimeout(() => this.$router.push('/'), 1000);
                    })
                    .catch(err => {
                        this.$root.$emit('snackfilter', {
                            message: 'Une erreur inconnue a eu lieu',
                            timeout: 2000
                        });
                    });
            });
        },
        ask(mail) {
            this.loading = true;
            get(`askpin?mail=${mail}`)
                .then(result => {
                    this.loading = false;
                    if (result.status) {
                        this.$root.$emit('snackfilter', {
                            message: 'Cette adresse mail est inconnue',
                            timeout: 2000
                        });
                        return;
                    }

                    this.$root.$emit('snackfilter', {
                        message: 'Un mail vient de vous être envoyé à l\'adresse indiquée',
                        timeout: 2000
                    });
                })
                .catch(err => {
                    this.$root.$emit('snackfilter', {
                        message: 'Une erreur inconnue a eu lieu',
                        timeout: 2000
                    });
                });
        }
    }
}
</script>

<style lang="scss">
    @import '../main.scss';

    .b-generatepin {
        max-width: 800px;
    }
</style>
