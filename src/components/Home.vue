<template>
    <div class="b-home">
        <div class="b-home__login">
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Connexion</h2>
                </div>
                <form @submit.prevent="log(mail, pin)">
                    <div class="mdl-card__supporting-text">
                        <mdl-textfield floating-label="Mail" v-model="mail"></mdl-textfield><br />
                        <mdl-textfield type="password" floating-label="Code PIN" v-model="pin"></mdl-textfield>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <mdl-button colored class="b--left">Connexion</mdl-button>
                        <router-link to="/generate" class="mdl-button mdl-button--colored mdl-js-button b--right">
                            PIN oublié
                        </router-link>
                        <div class="b--clear"></div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            mail: '',
            pin : ''
        };
    },

    methods: {
        ...mapActions([
            'login',
            'notify'
        ]),
        log(mail, pin) {
            this.login({ meanOfLogin: 'etuMail', data: mail, pin })
                .then(() => this.$router.push('/reload'))
                .catch(() => this.notify({ message: 'La connexion a échoué.' }));
        }
    },

    computed: {
        ...mapGetters([
            'logged'
        ])
    }
};
</script>

<style>
    .b-home__login {
        & > div {
            max-width: calc(100% - 20px);
            width: 500px;

            & .mdl-textfield {
                width: 100%;
            }
        }
    }
</style>
