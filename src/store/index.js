// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: '',
  },
  mutations: {
    setSearch(state, payload) {
      state.search = payload;
    },
  },
  actions: {
    setSearch(context, payload) {
      context.commit('setSearch', payload);
    },
  },
  getters: {
    getSearch(state) {
      return state.search;
    },
  },
});
