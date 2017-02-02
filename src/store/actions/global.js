/**
 * Global actions
 */

export function updateLogged({ commit }, logged) {
    commit('UPDATELOGGED', logged);
}

export function updateLoggedUser({ commit }, loggedUser) {
    sessionStorage.setItem('user', JSON.stringify(loggedUser));
    commit('UPDATELOGGEDUSER', loggedUser);
}
