const state = {
    loggedUser: null,
    history   : [],
    users     : []
};

const mutations = {
    UPDATELOGGEDUSER(state_, loggedUser) {
        state_.loggedUser = loggedUser;
    },

    ADDHISTORY(state_, data) {
        state_.history.push(...data);
    },

    REPLACEHISTORY(state_, data) {
        // empty the array
        state_.history.splice(0, state_.history.length);

        state_.history.push(...data);
    },

    CLEARHISTORY(state_) {
        state_.history = [];
    },

    CHANGEUSERS(state_, users) {
        state_.users = users;
    }
};

export default {
    state,
    mutations
};
