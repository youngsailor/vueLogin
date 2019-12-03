<template>
  <div>
    <a-tabs hideAdd v-model="activeKey" type="editable-card" @edit="onEdit" :style="{'margin-left':'10px'}">
      <a-tab-pane v-for="pane in panes" :tab="pane.title" :key="pane.key" :closable="pane.closable">
        {{pane.content}}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      const panes = [
        { title: '我的客户', content: 'Content of Tab 1', key: '1', closable: false },
        { title: '外呼记录', content: 'Content of Tab 2', key: '2', closable: false },
        { title: '外呼报表', content: 'Content of Tab 3', key: '3', closable: false },
        { title: '18771943659', content: 'Content of Tab 3', key: '4'},
      ];
      return {
        activeKey: panes[0].key,
        panes,
        newTabIndex: 0,
      };
    },
    methods: {
      callback(key) {
        console.log(key);
      },
      onEdit(targetKey, action) {
        this[action](targetKey);
      },
      add() {
        const panes = this.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({
          title: `New Tab ${activeKey}`,
          content: `Content of new Tab ${activeKey}`,
          key: activeKey,
        });
        this.panes = panes;
        this.activeKey = activeKey;
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
      },
    },
  };
</script>