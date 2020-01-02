import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,
  state: {
    MyCustomerScroll: 0,
    OutCallRecordScroll: 0,
    OutCallReportScroll: 0,
    clickedTaskInfo:{
      name:'请选择任务进行搜索',
      task_customer_field_group:{
        profile:{
          
        }
      }
    },
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
    },
    getClickedTaskInfo(state:any,newTask:any){
      state.clickedTaskInfo = newTask
    }
  },
  actions: {
  },
  modules: {

  }
})
