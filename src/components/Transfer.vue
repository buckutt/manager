<template>
    <div class="b-transfer b--centered">
        <div class="mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">Réaliser un virement</h2>
            </div>
            <form @submit.prevent="dispatch(name, currentPin, amount, selectedUser)">
                <div class="mdl-card__supporting-text b--fullwidth">
                    <mdl-textfield floating-label="Destinataire" v-model="name" class="b--inputwidth" v-if="usersFound.length < 1"></mdl-textfield>
                    <mdl-textfield floating-label="Destinataire" v-model="name" class="b--inputwidth" v-if="usersFound.length == 1" readonly></mdl-textfield>
                    <mdl-select label="Destinataire" id="user-select" class="b--inputwidth" v-model="selectedUser" :options="userOptions" v-if="usersFound.length > 1"></mdl-select>
                    <br />
                    <mdl-textfield type="password" floating-label="Code PIN actuel" v-model="currentPin" class="b--inputwidth"></mdl-textfield><br />
                    <mdl-textfield floating-label="Montant" v-model="amount" class="b--inputwidth"></mdl-textfield>
                </div>
                <div class="mdl-card__actions mdl-card--border" transition="fade">
                    <mdl-button type="button" colored raised class="mdl-js-ripple-effect b--inputwidth" @click.native="cancel" v-show="usersFound.length > 0">Annuler</mdl-button>
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth" v-if="usersFound.length < 1">Rechercher</mdl-button>
                    <mdl-button colored raised class="mdl-js-ripple-effect b--inputwidth" v-else>Valider</mdl-button>
                </div>
            </form>
        </div>
        <mdl-snackbar display-on="snackfilter"></mdl-snackbar>
    </div>
</template>

<script>
import { get, post } from '../lib/fetch';

export default {
    data () {
        return {
            name        : '',
            currentPin  : '',
            amount      : '',
            selectedUser: '',
            usersFound  : []
        };
    },

    methods: {
        cancel() {
            this.usersFound   = [];
            this.selectedUser = '';
            this.name         = '';
            this.amount       = '';
            this.currentPin   = '';
        },
        dispatch(name, currentPin, amount, user) {
            if (this.usersFound.length > 0) {
                this.transfer(currentPin, amount, user);
            } else {
                this.search(name);
            }
        },
        transfer(currentPin, amount, user) {
            let message = '';

            if (currentPin.length != 4) {
                message = 'L\'ancien code est faux';
            }

            if (!user) {
                message = 'Merci de sélectionner un utilisateur';
            }

            if (message) {
                const data = {
                    message,
                    timeout: 3000
                };

                this.$root.$emit('snackfilter', data);

                return;
            }

            post('transfer', {
                currentPin,
                amount       : amount * 100,
                'Reciever_id': user
            })
            .then(result => {
                if (!result.newCredit) {
                    this.$root.$emit('snackfilter', {
                        message: result.message,
                        timeout: 3000
                    });
                    return;
                }

                this.cancel();

                this.$root.$emit('snackfilter', {
                    message: 'Le virement a bien été effectué',
                    timeout: 3000
                });
            });
        },
        search(name) {
            if (name.length < 2) {
                this.$root.$emit('snackfilter', {
                    message: 'Merci de rentrer au moins 2 caractères',
                    timeout: 2000
                });

                return;
            }

            const strName = encodeURIComponent(name);

            get(`searchuser?name=${strName}`).then(users => {
                this.selectedUser = '';

                if (users.length < 1) {
                    this.$root.$emit('snackfilter', {
                        message: 'Aucun utilisateur n\'a été trouvé',
                        timeout: 2000
                    });
                } else if(users.length == 1) {
                    this.$root.$emit('snackfilter', {
                        message: 'Un utilisateur a été trouvé, veuillez confirmer',
                        timeout: 2000
                    });

                    const user        = users[0];
                    this.name         = `${user.firstname} ${user.lastname}`;
                    this.selectedUser = user.id;
                } else {
                    this.$root.$emit('snackfilter', {
                        message: 'Plusieurs utilisateurs ont été trouvé, veuillez sélectionner le bon',
                        timeout: 2000
                    });
                }

                this.usersFound = users;
            });
        }
    },

    computed: {
        userOptions() {
            let users = this.usersFound.map(user => {
                return { name: `${user.firstname} ${user.lastname}`, value: user.id };
            });

            return users;
        }
    }
}
</script>

<style lang="sass">
    @import '../main.scss';

    .b-transfer {
        max-width: 800px;
    }
</style>
