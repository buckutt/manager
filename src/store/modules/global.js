const state = {
    logged: false
};

// mutations
const mutations = {
    UPDATELOGGED(state_, logged) {
        state_.logged = logged;
    }
};

export default {
    state,
    mutations
};
