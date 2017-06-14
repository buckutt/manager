/**
 * Notifications actions
 */

export function notify({ commit }, message) {
    commit('UPDATENOTIFY', message);
}
