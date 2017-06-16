const state = {
    socket: null
};

// mutations
const mutations = {
    CHANGESOCKET(state_, socket) {
        state_.socket = socket;
    },
    REMOVESOCKET(state_) {
        state_.socket = null;
    }
};

export default {
    state,
    mutations
};
