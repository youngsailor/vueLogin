<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" :style="{color: 'white','text-align':'center','line-height':'35px','font-weight':'bold'}">小亿CC</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="[route]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="/home/userHome"><router-link to="/home/userHome">用户首页</router-link></a-menu-item>
        <a-menu-item key="/home/outCall"><router-link to="/home/outCall">外呼平台</router-link></a-menu-item>
        <a-menu-item key="/home/inCall"><router-link to="/home/inCall">呼入平台</router-link></a-menu-item>
        <p slot="aa"><font :style="{color:'white'}">Tag1</font></p>
        <a-button :style="{'float':'right','line-height':'64px'}" type="link"><a-icon type="logout" />退出</a-button>
      </a-menu>

    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ margin: '16px 0' }">
        热线资源 &nbsp; | &nbsp;  待办事项
      </div>
        <div :style="{ background: '#fff', minHeight: '750px' }">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
        </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<style>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
</style>
<script>
export default {
    name:"Home",
    data(){
        let path = this.$route.path
        // 如果是首页的话，设置defaultselectkey为/home/userHome
        if(path == '/'){
          path = '/home/userHome'
        }

        return {
          route: path
        }
    }
}
</script>
