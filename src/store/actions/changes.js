import io from 'socket.io-client';

export function initSocket({ commit, dispatch, state }, token) {
    commit('CHANGESOCKET', io('', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    }));

    state.changes.socket.on('connected', () => {
        console.log('Connecté');
        dispatch('registerUserCredit');
    });

    state.changes.socket.on('APIError', (error) => {
        console.error(error);
    });
}

export function registerUserCredit({ state, dispatch }) {
    state.changes.socket.emit('userCredit');

    state.changes.socket.on('userCredit', credit =>
        dispatch('updateLoggedUserField', {
            field: 'credit',
            value: credit
        })
    );
}

export function closeSocket({ commit, state }) {
    state.changes.socket.close();

    commit('REMOVESOCKET');
}
