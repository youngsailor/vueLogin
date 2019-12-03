<template>
    <a-layout :style="{ background: '#fff', minHeight: '750px' }">
        <a-layout>
          <a-layout-sider :style="{background:'#fff'}">
           <div :style="{background:'rgb(176, 192, 207)','height':'39px','text-align':'center'}">
             <p :style="{'line-height':'39px'}">任务列表</p>
           </div>
           <TaskList /> 
          </a-layout-sider>
          <a-layout-content>
            <TaskContent />
          </a-layout-content>
        </a-layout>
        <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
</template>
<script>
import TaskList from './TaskList'
import TaskContent from './TaskContent'
export default {
  data(){
    return {
      
    }
  },
  components:{
    TaskList,
    TaskContent,
  }

}
</script>

<style>
  #components-layout-demo-basic {
    text-align: center;
  }
  #components-layout-demo-basic .ant-layout-header,
  #components-layout-demo-basic .ant-layout-footer {
    background: #7dbcea;
    color: #fff;
  }
  #components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
  }
  #components-layout-demo-basic .ant-layout-sider {
    background: #3ba0e9;
    color: #fff;
    line-height: 120px;
  }
  #components-layout-demo-basic .ant-layout-content {
    background: rgba(16, 142, 233, 1);
    color: #fff;
    min-height: 120px;
    line-height: 120px;
  }
  #components-layout-demo-basic > .ant-layout {
    margin-bottom: 48px;
  }
  #components-layout-demo-basic > .ant-layout:last-child {
    margin: 0;
  }
</style>