const state = {
    notify: null
};

const mutations = {
    UPDATENOTIFY(state_, notify) {
        state_.notify = notify;
    }
};

export default {
    state,
    mutations
};
