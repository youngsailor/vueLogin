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
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions"><a-tag color="green">已签入</a-tag></a>
      <div :style="{'word-break': 'break-all', 'word-wrap': 'break-word', 'margin-left':'5px'}">12月8日任务</div>
    </a-list-item>
  </a-list>
</template>
<script>
  import reqwest from 'reqwest';

  const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

  export default {
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        bordered: true,
        data: [],
      };
    },
    mounted() {
      this.getData(res => {
        this.loading = false;
        this.data = res.results;
      });
    },
    methods: {
      getData(callback) {
        reqwest({
          url: fakeDataUrl,
          type: 'json',
          method: 'get',
          contentType: 'application/json',
          success: res => {
            callback(res);
          },
        });
      },
      onLoadMore() {
        this.loadingMore = true;
        this.getData(res => {
          this.data = this.data.concat(res.results);
          this.loadingMore = false;
          this.$nextTick(() => {
            // window.dispatchEvent(new Event('resize'));
          });
        });
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
</style>