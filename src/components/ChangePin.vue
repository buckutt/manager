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
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            currentPin  : '',
            pin         : '',
            confirmedPin: ''
        };
    },

    methods: {
        ...mapActions([
            'changePin',
            'notify'
        ]),
        change(currentPin, pin, confirmedPin) {
            this.changePin({ currentPin, pin, confirmedPin })
                .then((message) => {
                    this.currentPin   = '';
                    this.pin          = '';
                    this.confirmedPin = '';
                    this.notify(message);
                })
                .catch(error => this.notify(error));
        }
    }
};
</script>

<style>
    .b-changepin {
        max-width: 800px;
    }
</style>
