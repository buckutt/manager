<template>
    <div class="home">
        <div class="login">
            <div class="mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Connexion</h2>
                </div>
                <form @submit.prevent="login(mail, password)">
                    <div class="mdl-card__supporting-text">
                        <mdl-textfield floating-label="Mail" v-model="mail"></mdl-textfield><br />
                        <mdl-textfield type="password" floating-label="Mot de passe" v-model="password"></mdl-textfield>
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <mdl-button colored>Connexion</mdl-button>
                    </div>
                </form>
            </div>
        </div>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { post, updateBearer }   from '../lib/fetch';

export default {
    data () {
        return {
            mail    : '',
            password: ''
        };
    },

    methods: {
        ...mapActions([
            'updateLogged'
        ]),
        login(mail, password) {
            post('login', { meanOfLogin: 'etuMail', data: mail, password })
                .then(result => {
                    if (!result.isAPIError && result.user) {
                        sessionStorage.setItem('user', JSON.stringify(result.user));
                        sessionStorage.setItem('token', result.token);
                        this.isToken = true;
                        this.updateLogged(true);
                        updateBearer(result.token);

                        this.$router.push('/history');
                    } else {
                        const data = {
                            message: 'La connexion a échoué.',
                            timeout: 2000
                        };

                        this.$root.$emit('snackfilter', data);
                    }
                });
        }
    },

    computed: {
        ...mapState({
            logged: state => state.global.logged
        })
    },

    mounted() {
        if (sessionStorage.hasOwnProperty('token')) {
            this.updateLogged(true);
        }

        if (this.logged) {
            this.$router.push('/history');
        }
    }
}
</script>

<style lang="sass">
    @import '../main.scss';

    .mdl-layout__content {
        margin-left: 0 !important;
        width: 100% !important;
    }

    .login {
        > div {
            width: 500px;
            margin: 50px auto;

            .mdl-textfield {
                width: 100%;
            }
        }
    }
</style>