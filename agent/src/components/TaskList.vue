<template>
  <a-list class="demo-loadmore-list" :loading="loading"  itemLayout="horizontal" :dataSource="data">
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', 'margin-top': '32px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" :style="{'margin-top':'20px'}"/>
      <a-button v-else @click="onLoadMore">更多任务</a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item" @click="selectTask(item, $event)">
        <a v-if="item.extenStatus == '未签入'" slot="actions"><a-tag color="#87d068">{{ item.extenStatus }}</a-tag></a>
        <a v-if="item.extenStatus == '已签入'" slot="actions"><a-tag color="#f50">{{ item.extenStatus }}</a-tag></a>
        <div :style="{'word-break': 'break-all', 'word-wrap': 'break-word', 'margin-left':'5px'}">{{ item.name }}</div>
    </a-list-item>
  </a-list>
</template>
<script>
  import reqwest from 'reqwest';
  import $ from 'jquery';
  import {http} from '../axios/request.js';
  const fakeDataUrl = '/api/index/task_list';

  export default {
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        bordered: true,
        data: [],
        page: 1,
      };
    },
    mounted() {
      this.getData(res => {
        this.loading = false; // 是否显示加载
        this.data = res; // 加载的数据
        this.page += 1;   // 点击加载的次数
        console.log(this.data);
      });
    },
    methods: {
      getData(callback) {
        let token = localStorage.getItem('token');
        if(!token){
          this.$message.warning("登陆过期，请重新登陆")
          setTimeout(() => {
            this.$router.push({
              path:"/login",
              query:{
              }
            }).catch(err=>{console.log(err)})
            return;
          }, 3000);
        }
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'post',
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
          headers:{
            'token':token
          },
          data:{page:this.page},
          success: res => {
            if(res.code !== 200 && res.code !== 41400){
              console.log(res);
              this.$message.warning(res.msg)
              setTimeout(() => {
                this.$router.push({
                  path:"/login",
                  query:{
                  }
                }).catch(err=>{console.log(err)})
                return;
              }, 3000);
            }else if(res.code == 41400){
              this.$message.warning(res.message)
            }else if(res.code == 200){
              if(!res.data.length){
                this.$message.warning('没有更多数据了');
              }
            }
            if(token){
              console.log(res.data)
              callback(res.data);
            }
          },
        });
      },
      onLoadMore() {
        this.loadingMore = true;
        this.getData(res => {
          this.data = this.data.concat(res);
          this.loadingMore = false;
          this.page += 1; 
          this.$nextTick(() => {
            // window.dispatchEvent(new Event('resize'));
          });
        });
      },
      selectTask(item, event){
        // console.log(item);
        // console.log(event.currentTarget);
        $(event.currentTarget).css('background','rgba(199, 252, 52, 0.22)').siblings().css('background','#fff');
        $(event.currentTarget).css({'border-style':'none solid','border-bottom':'1px solid #e8e8e8'}).siblings().css({'border-style':'none none','border-bottom':'1px solid #e8e8e8'});
        this.$store.commit('getClickedTaskInfo',item);
      },
    },
  };
</script>
<style>
  .demo-loadmore-list {
    height: 681px;
    overflow: auto;
  }
  .ant-spin-dot-spin {
    margin-top:10px !important;
    margin-bottom:10px !important;
  }
  .ant-list-item:hover {
    cursor:pointer
  }
</style>