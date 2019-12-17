import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    MyCustomerScroll: 0,
    OutCallRecordScroll: 0,
    OutCallReportScroll: 0,
  },
  mutations: {
    newMyCustomerScroll(state:any,newScroll:any){
      state.MyCustomerScroll = newScroll;
    },
    newOutCallRecordScroll(state:any,newScroll:any){
      state.OutCallRecordScroll = newScroll;
    },
    newOutCallReportScroll(state:any,newScroll:any){
      state.OutCallReportScroll = newScroll;
    }
  },
  actions: {
  },
  modules: {

  }
})
