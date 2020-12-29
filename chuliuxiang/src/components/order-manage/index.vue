<template>
  <div class="system">
    <div class="form">
      <el-form  ref="searchForm" :model="formData" label-width="80px" inline>
        <el-row>
          <el-col :span="6">
            <el-form-item label="客户名" prop="userName">
              <el-input v-model="formData.userName" size="small" clearable placeholder="请输入客户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单状态" prop="orderStatus">
              <el-select v-model="formData.orderStatus" size="small" clearable placeholder="全部">
                <el-option v-for="(item,index) in orderStatusOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="下单时间" prop="orderTime">
              <el-input v-model="formData.orderTime" size="small" clearable placeholder="请输入下单时间"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="formData.address" size="small" clearable placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="fetch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  
    <el-table :data="tableData" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
      <el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
      <el-table-column align="center" prop="serial" label="订单编号"></el-table-column>
      <el-table-column align="center" prop="userName" label="客户名称"></el-table-column>
      <el-table-column align="center" prop="size" label="储存箱规格"></el-table-column>
      <el-table-column align="center" prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column align="center" prop="orderStatus" label="状态">
        <template slot-scope="scope">
          <span>{{getorderStatusLable(scope.row.orderStatus)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="operate" label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.operate === '1' " type="warning" @click="send(scope.row,'1')" plain>发送空箱</el-button>
          <el-button v-if="scope.row.operate === '2' " type="info" @click="send(scope.row,'2')"  plain>收到空箱</el-button>
          <el-button v-if="scope.row.operate === '3' " type="primary" @click="send(scope.row,'3')" plain>发送重箱</el-button>
          <el-button v-if="scope.row.operate === '4' " type="success" @click="send(scope.row,'4')"  plain>收到重箱</el-button>
          <el-button v-if="scope.row.operate === '5' " type="danger" @click="send(scope.row,'5')" plain>已完成</el-button>
        </template>
        
      </el-table-column>
    </el-table>

    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageInfo.pageSize" 
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData:{
        userName:'',
        orderStatus:'',
        orderTime:'',
        address:'',
      },
      pageInfo:{
        pageIndex:1,
        pageSize:5,
        total:0
      },
      orderStatusOptions:[
        // {label:'全部',value:'0'},
        {label:'发送空箱',value:'1'},
        {label:'收到空箱',value:'2'},
        {label:'发送重箱',value:'3'},
        {label:'收到重箱',value:'4'},
        {label:'已完成',value:'5'},
      ],
      tableData:[],
      allTableData:[
        {serial:'1000001',userName:'张三',size:'大',orderTime:'2012-12-12 10:10',orderStatus:'3',operate:'2'},
        {serial:'1000002',userName:'李四',size:'中',orderTime:'2012-12-14 11:10',orderStatus:'1',operate:'5'},
        {serial:'1000003',userName:'王五',size:'大',orderTime:'2013-01-12 21:05',orderStatus:'4',operate:'3'},
        {serial:'1000004',userName:'赵六',size:'小',orderTime:'2013-02-12 00:10',orderStatus:'2',operate:'1'},
        {serial:'1000005',userName:'谭七',size:'小',orderTime:'2013-02-17 15:10',orderStatus:'5',operate:'4'},
        {serial:'1000006',userName:'Jan',size:'大',orderTime:'2013-03-25 21:54',orderStatus:'1',operate:'3'},
        {serial:'1000007',userName:'Tom',size:'中',orderTime:'2013-04-12 14:15',orderStatus:'4',operate:'2'},
      ],
      currentRows:[],
    }
  },
  mounted (){     //生命周期函数
    this.fetch()
  },
  methods:{
    fetch(){
      this.pageInfo.pageIndex=1

      this.search()
    },
    // 表单查询
    search(){

      this.pageInfo.total = this.allTableData.filter(item => {
        return item.userName.includes(this.formData.userName) && item.orderStatus.includes(this.formData.orderStatus) && item.orderTime.includes(this.formData.orderTime) 
      }).length

      this.tableData = this.allTableData.filter(item => {
        return item.userName.includes(this.formData.userName) && item.orderStatus.includes(this.formData.orderStatus) && item.orderTime.includes(this.formData.orderTime) 
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      
    },
    //表单 重置
    reset(){
      this.$refs.searchForm.resetFields()

      this.fetch()
      console.log(this.tableData)
    },
    // 表格 状态
    getorderStatusLable (value) {
     return this.orderStatusOptions.filter(item => {
       return item.value === value
     })[0].label
    },
    // 表格 操作
    send(row,value){
      this.$confirm('确定此操作吗？').then(()=>{
        let index = this.allTableData.findIndex(item => {
          return item.serial === row.serial
        })

      this.$set(this.allTableData,index,Object.assign({},this.allTableData[index],{
        orderStatus: value
      }))

      this.search()
      })
    },
    getRows(rows){
      console.log(rows)
      this.currentRows=rows
    },
    handleSizeChange(val){
      // console.log('每页' +val+'条数据')
      console.log(val)
      this.pageInfo.pageSize=val    //

      this.search()     //
    },
    handleCurrentChange(val){
      // console.log('当前是第' +val+'页')
      console.log('这是当前的pageINDEX', val)
      this.pageInfo.pageIndex = val
      this.search()
    },
  },

}
</script>

<style lang="scss" scoped>
.system {
  padding: 20px;
}
.form{
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}
.pages{
  margin-left: 300px;
  margin-top: 50px;
}
</style>