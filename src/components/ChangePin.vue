<template>
    <div class="b-changepin b--centered">
        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Changement de code PIN</h2>
            </div>
            <form @submit.prevent="change(currentPin, pin, confirmedPin)">
                <div class="mdl-card__supporting-text fullwidth">
                    <mdl-textfield type="password" floating-label="Code PIN actuel" v-model="currentPin" class="b--inputwidth"></mdl-textfield><br />
                    <mdl-textfield type="password" floating-label="Nouveau code PIN" v-model="pin" class="b--inputwidth"></mdl-textfield><br />
                    <mdl-textfield type="password" floating-label="Nouveau code PIN (confirmation)" v-model="confirmedPin" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth">Connexion</mdl-button>
                </div>
            </form>
        </div>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import bcrypt  from 'bcryptjs';
import { put } from '../lib/fetch';

export default {
    data() {
        return {
            currentPin  : '',
            pin         : '',
            confirmedPin: ''
        };
    },

    methods: {
        change(currentPin, pin, confirmedPin) {
            let message = null;

            if (pin !== confirmedPin) {
                message = 'Les deux codes PIN ne sont pas identiques';
            }

            if (currentPin === pin) {
                message = 'L\'ancien et le nouveau code PIN rentrés sont identiques';
            }

            if (pin.length !== 4) {
                message = 'Le nouveau code PIN ne fait pas la bonne longueur';
            }

            if (currentPin.length !== 4) {
                message = 'L\'ancien code est faux';
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
                put('changepin', {
                    currentPin,
                    pin: hash
                })
                    .then((result) => {
                        if (!result.changed) {
                            const eData = {
                                message: 'L\'ancien code est faux',
                                timeout: 3000
                            };

                            this.$root.$emit('snackfilter', eData);
                            return;
                        }
                        this.currentPin   = '';
                        this.pin          = '';
                        this.confirmedPin = '';

                        const cData = {
                            message: 'Le code PIN a bien été changé',
                            timeout: 3000
                        };

                        this.$root.$emit('snackfilter', cData);
                    });
            });
        }
    }
};
</script>

<style>
    .b-changepin {
        max-width: 800px;
    }
</style>
