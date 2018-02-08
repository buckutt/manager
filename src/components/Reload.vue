<template>
    <div class="b-reload">
        <div class="mdc-card">
            <section class="mdc-card__primary">
                <h1 class="mdc-card__title mdc-card__title--large">Recharger en ligne</h1>
            </section>
            <form @submit.prevent="reload(amount)">
                <section class="mdc-card__supporting-text">
                    Vous serez redirigé vers un site bancaire <strong>sécurisé</strong>.

                    <label class="mdc-text-field" ref="amount">
                        <input
                            type="number"
                            class="mdc-text-field__input"
                            required max="100" min="5" step="0.10" pattern="[0-9]*(\.[0-9]+)?"
                            error="Veuillez entrer un montant correct"
                            v-model="amount">
                        <span class="mdc-text-field__label">Montant</span>
                        <div class="mdc-text-field__bottom-line"></div>
                    </label>
                </section>
                <section class="mdc-card__actions">
                    <button class="mdc-button mdc-button--raised" v-show="!loading">Valider</button>
                    <button class="mdc-button mdc-button--raised" disabled v-show="loading">Valider</button>
                    <div class="b-space"></div>
                </section>
            </form>
        </div>
    </div>
</template>

<script>
import { MDCTextField } from '@material/textfield/dist/mdc.textfield.min.js';
import { mapActions }   from 'vuex';
import { post }         from '../lib/fetch';

export default {
    data() {
        return {
            loading: false,
            amount : 5
        };
    },

    methods: {
        reload(amount) {
            this.loading = true;

            post('reload', { amount: parseInt(amount * 100, 10) })
                .then((data) => {
                    if (data.status) {
                        this.notify(data.message);

                        setTimeout(() => {
                            this.loading = false;
                        }, 200);
                    }

                    if (data.type === 'url') {
                        window.location.href = data.res;
                    }
                });
        },


        ...mapActions(['notify'])
    },

    mounted() {
        MDCTextField.attachTo(this.$refs.amount);
    }
};
</script>
