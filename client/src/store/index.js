import { createStore } from 'vuex';

export const store = createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || {}, // Attempts to recover user data from local storage
        userId: localStorage.getItem('userId') || null, // Gets the userId from local storage, or null if it doesn't exist
    },
    mutations: {
        setUser(state, userData) {
            console.log("Updating user data in Vuex:", userData);
            state.user = { ...state.user, ...userData }; // Use the spread operator to update the user data
            localStorage.setItem('user', JSON.stringify(state.user)); // Save the updated user data to local storage
        },
        
        /*setUserId(state, userId) {
            state.userId = userId;
            localStorage.setItem('userId', userId); //  userId save in localstorage
        }*/
    },
    /*actions: {
        updateUser({ commit }, userData) {
            commit('setUser', userData);
        },
        updateUserId({ commit }, userId) {
            commit('setUserId', userId);
        }
    }*/

    
});

export default store;
