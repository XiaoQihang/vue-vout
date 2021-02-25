import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  pageIndex: 0,
  pageList: [],
  hasBack: false,
}

const mutations = {
  setPageIndex (state, val) {
    state.pageIndex = val;
  },
  setPageList (state, val) {
    state.pageList.push(val);
  },
  sethasBack (state,val){
    state.hasBack = val
  }
}

export default new Vuex.Store({
  state,
  mutations
})
