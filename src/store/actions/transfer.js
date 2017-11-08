import { get, post } from '../../lib/fetch';

export function searchUsers({ commit }, name) {
    const strName = encodeURIComponent(name);
    get(`searchuser?name=${strName}`).then((users) => {
        commit('CHANGEUSERS', users);
    });
}

export function transfer({ state, dispatch }, data) {
    return new Promise((resolve, reject) => {
        let message = '';

        if (data.currentPin.length !== 4) {
            message = 'L\'ancien code est faux';
        }

        if (!data.user) {
            message = 'Merci de sélectionner un utilisateur';
        }

        if (!data.amount || isNaN(data.amount)) {
            message = 'Le montant doit être un nombre';
        }

        if (message) {
            return reject({ message });
        }

        post('transfer', {
            currentPin : data.currentPin,
            amount     : +(+data.amount * 100).toFixed(1),
            reciever_id: data.user.id
        })
            .then((result) => {
                if (!result.newCredit) {
                    return reject({ message: result.message });
                }

                const newUser  = state.app.loggedUser;
                newUser.credit = result.newCredit;

                dispatch('updateLoggedUser', newUser);

                resolve({ message: 'Le virement a bien été effectué' });
            });
    });
}
