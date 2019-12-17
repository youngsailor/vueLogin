<template>
  <a-card title="外呼报表" :style="{ 'font-size':'15px' }">
    <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
            <a-col
            v-for="i in 10"
            :key="i"
            :span="4"
            :style="{ display: i < count ? 'block' : 'none' }"
            >
            <a-form-item :label="`Field ${i}`">
                <a-input
                v-decorator="[
                    `field-${i}`,
                    {
                    rules: [
                        {
                        required: true,
                        message: 'Input something!',
                        },
                    ],
                    },
                ]"
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
                Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                Clear
            </a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                Collapse <a-icon :type="expand ? 'up' : 'down'" />
            </a>
            </a-col>
        </a-row>
        </a-form>
        <div class="search-result-list" id="OutCallReport">
          <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1500, y: 300 }" size="middle">
            <a slot="action" slot-scope="text" href="javascript:;" size="middle">action</a>
          </a-table>
        </div>
    </div>
  </a-card>
</template>
<script>
import $ from 'jquery';

export default {
  
  data() {

      const columns = [
        { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name'},
        { title: 'Age', width: 100, dataIndex: 'age', key: 'age' },
        { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
        { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
        { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
        { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
        { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
        { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
        { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
        // { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' },
        },
      ];

      const data = [];
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }

    return {
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' }),
      data,
      columns,
    };
  },
  mounted() {
    let _this = this;
    $("#OutCallReport .ant-table-body").scroll(function() {
      _this.$store.commit('newOutCallReportScroll',this.scrollTop);
      // console.log(_this.$store.state.OutCallReportScroll);
    });
    
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
  },
  activated(){
    // console.log(this.$store.state.OutCallReportScroll);
    if(this.$store.state.OutCallReportScroll > 0){
      $("#OutCallReport .ant-table-body,#OutCallReport .ant-table-fixed-right .ant-table-body-outer .ant-table-body-inner").scrollTop(this.$store.state.OutCallReportScroll);
    }
  },
  deactivated(){
    // console.log(this.$store.state.OutCallReportScroll);
  },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    },
  },
};
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 0px !important;
}
</style>