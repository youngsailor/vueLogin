<template>
  <div>
    <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit" @change="change" :style="{'margin-left':'10px'}">
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
        <keep-alive>
          <component :is="show" :userInfo="userInfo" @newPan="add"></component>
        </keep-alive>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import MyCustomer from './MyCustomer.vue'
  import OutCallRecord from './OutCallRecord.vue'
  import OutCallReport from './OutCallReport.vue'
  import PopScreen from './PopScreen.vue'
  
  export default {
    data() {
      const panes = [
        { title: '我的客户', content: MyCustomer, key: 'myCustomer', closable: false },
        { title: '外呼记录', content: OutCallRecord, key: 'outCallRecord', closable: false },
        { title: '外呼报表', content: OutCallReport, key: 'outCallReport', closable: false },
        { title: '18771943659', content: PopScreen, key: '4'},
      ];
      const userInfo = {};

      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
        show:'MyCustomer',  // 初始化的pane
        userInfo:userInfo,
      };
    },
    components:{
      MyCustomer,
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      onEdit(targetKey, action) {
        this[action](targetKey);
      },
      add(userInfo) {
        const panes = this.panes;
        const activeKey = this.panes.length+1;
        panes.push({
          title: `New Tab ${activeKey}`,
          content: PopScreen,
          key: activeKey,
        });
        this.panes = panes;
        this.activeKey = activeKey;
        this.show = PopScreen
        this.userInfo = userInfo
      },
      remove(targetKey) {
        let activeKey = this.activeKey;
        let lastIndex;
        this.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.panes = panes;
        this.activeKey = activeKey;
        this.show = this.panes[panes.length-1]['content'];
      },
      change(){
        this.panes.forEach((v)=>{
          if(v['key']==this.activeKey){
            this.show = v['content']
          }
        })
      }
    },
  };
</script>