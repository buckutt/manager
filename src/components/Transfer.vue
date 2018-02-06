<template>
    <div class="b-transfer b--centered">
        <div class="mdl-card mdl-card--maximized mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Réaliser un virement</h2>
            </div>
            <form @submit.prevent="transferWrapper(currentPin, amount, user)">
                <div class="mdl-card__supporting-text b--fullwidth">
                    <b-autocomplete label="Destinataire" id="b-name" @input="defineUser" class="b--inputwidth" required="required" error="Un utilisateur doit être sélectionné"></b-autocomplete><br />
                    <mdl-textfield type="password" floating-label="Code PIN actuel" v-model="currentPin" class="b--inputwidth"></mdl-textfield><br />
                    <mdl-textfield floating-label="Montant" v-model="amount" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth">Valider</mdl-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Autocomplete   from './Autocomplete';

export default {
    components: {
        'b-autocomplete': Autocomplete
    },

    data() {
        return {
            currentPin: '',
            amount    : '',
            user      : undefined
        };
    },

    methods: {
        ...mapActions([
            'transfer',
            'notify'
        ]),

        defineUser(user) {
            this.user = user;
        },

        transferWrapper(currentPin, amount, user) {
            this.transfer({ currentPin, amount, user })
                .then(message => this.notify(message))
                .catch(error => this.notify(error));
        }
    }
};
</script>

<style>
    .b-transfer {
        max-width: 800px;
    }
</style>
