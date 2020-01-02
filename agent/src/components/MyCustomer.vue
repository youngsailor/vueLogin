<template>
  <a-card :title="clickedTaskInfo.name">
    <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
        <a-row :gutter="24">
            <a-col
            v-for="(item, i) in labelName"
            :key="i"
            :span="6"
            :style="{ display: i < count ? 'block' : 'none' }"
            >
              <!-- 输入框\文本框 -->
              <a-form-item :label="item.field_describe" v-if="item.text_type == 1 || item.text_type == 2">
                <a-input
                v-decorator="[
                    `${item.field_name}`,
                    {
                    rules: [
                        {
                        required: false,
                        message: '该项为必选项！',
                        },
                    ],
                    },
                ]"
                placeholder=""
                />
              </a-form-item>
              <!-- 选择框 -->
              <a-form-item :label="item.field_describe" v-if="item.text_type == 3">
                <a-select
                  showSearch
                  placeholder="请选择..."
                  optionFilterProp="children"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                  :filterOption="filterOption"
                  dropdownMatchSelectWidth="true"
                >
                  <a-select-option value="jack">Jack</a-select-option>
                  <a-select-option value="lucy">Lucy</a-select-option>
                  <a-select-option value="tom">Tom</a-select-option>
                </a-select>
              </a-form-item>
              <!-- 日期/时间 -->
              <a-form-item :label="item.field_describe" v-if="item.text_type == 4">
                <a-range-picker
                  :ranges="{ 今天: [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
                  @change="onChange"
                />
              </a-form-item> 
              <a-form-item :label="item.field_describe" v-if="item.text_type == 5">
                <a-range-picker
                  :ranges="{ 今天: [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  @change="onChange"
                />
              </a-form-item> 
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
                搜索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                清空
            </a-button>
            <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                高级 <a-icon :type="expand ? 'up' : 'down'" />
            </a>
            </a-col>
        </a-row>
        </a-form>
        <div class="search-result-list" id="MyCustomer">
          <a-table :columns="columns" :dataSource="data" :scroll="{ x: 1500, y: 300 }" size="middle" id="table1">
            <a slot="action" slot-scope="text" href="javascript:;" size="middle">拨打电话</a>
          </a-table>
        </div>
    </div>
  </a-card>
</template>
<script>
import $ from 'jquery';
import { mapState } from 'vuex';
import moment from 'moment';
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
          title: '动作',
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
      scroll,
    };
  },
  mounted() {
    let _this = this;
    $("#MyCustomer .ant-table-body").scroll(function() {
      _this.$store.commit('newMyCustomerScroll',this.scrollTop);
      // console.log(_this.$store.state.MyCustomerScroll);
    });
    
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
    // clickedTaskInfo(){
    //  return this.$store.state.clickedTaskInfo
    // }
    ... mapState(['clickedTaskInfo']),
    // 搜索框名字
    labelName(){
      console.log(this.$store.state.clickedTaskInfo.task_customer_field_group.profile)
      return this.$store.state.clickedTaskInfo.task_customer_field_group.profile;
    }
  },
  activated(){
    // console.log(this.$store.state.MyCustomerScroll);
    if(this.$store.state.MyCustomerScroll > 0){
      $("#MyCustomer .ant-table-body,#MyCustomer .ant-table-fixed-right .ant-table-body-outer .ant-table-body-inner").scrollTop(this.$store.state.MyCustomerScroll);
    }
  },
  deactivated(){
    // console.log(this.$store.state.MyCustomerScroll);
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
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleBlur() {
      console.log('blur');
    },
    handleFocus() {
      console.log('focus');
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    moment,
    onChange(dates, dateStrings) {
      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
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
.ant-calendar-picker {
  width: auto !important;
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
.ant-form-item-control-wrapper{
  overflow:hidden !important;
}
</style>