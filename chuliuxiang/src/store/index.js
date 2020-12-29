import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 100,
    msgList: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    handlerMsgList (state, data) {
      state.msgList.push(data)
      // console.log(data)
    },
    deleteMsgList (state, index) {
      state.msgList.splice(index, 1)
    }
  }
})

export default store