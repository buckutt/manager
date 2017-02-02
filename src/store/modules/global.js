const state = {
    logged    : false,
    loggedUser: {}
};

// mutations
const mutations = {
    UPDATELOGGED(state_, logged) {
        state_.logged = logged;
    },
    UPDATELOGGEDUSER(state_, loggedUser) {
        state_.loggedUser = loggedUser;
    }
};

export default {
    state,
    mutations
};
