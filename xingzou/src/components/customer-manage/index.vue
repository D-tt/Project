<template>
  <div>

      <el-form ref="form" :model="formData" label-width="80px" class="customer-container" inline>
        <el-form-item label="客户名称" prop="userName">
          <el-input v-model="formData.userName" placeholder="请输入客户姓名"></el-input>
        </el-form-item>
        <el-form-item label="客户账号" prop="account">
          <el-input v-model="formData.account" placeholder="请输入客户账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetch">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData" border @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 --> <!--  stripe="true"设置表格斑马纹 -->
          <el-table-column align="center" prop="account" label="客户账号"></el-table-column>
          <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
          <el-table-column align="center" prop="idCard" label="身份证"></el-table-column>
      </el-table>

      <el-pagination class="pages"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageInfo.pageIndex"     
				:page-sizes="[5, 10, 15, 20]"
				:page-size="pageInfo.pageSize" 
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageInfo.total">
			</el-pagination>

      <!-- current-page     当前页面 -->
      <!-- page-sizes     每页多少条 -->
      <!-- pageInfo     页面信息 -->
  </div>
</template>

<script>
export default {
    data(){
        return {
          pageInfo:{
            pageIndex:1,
            pageSize:5,
            total:0
          },
          formData:{
            userName:'',
            account:''
          },
          tableData:[],
          currentRows:'',
          allTableData:[
            {account:'admin',userName:'admin',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'12345',userName:'张三',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'12345654',userName:'李四',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'qwerq',userName:'王五',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'qwer123',userName:'赵六',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'asdfg',userName:'谭七',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
            {account:'asdfg',userName:'tom',sex:'女',phone:'18952216028',email:'18952216028@adf.com',idCard:'32030216521534212X'},
          ]
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
      search(){
				this.pageInfo.total=this.allTableData.filter(item => {
					return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) 
        }).length

				// this.pageInfo.total = this.tableData.length
        
        this.tableData=this.allTableData.filter(item => {
					return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) 
        }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

			},
			reset(){
				this.$refs.form.resetFields()

        this.fetch()
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
    }
}
</script>

<style lang="scss" scoped>
.customer-container{
		padding-top: 20px;
}
.pages{
  margin-top: 20px;
  margin-left: 20px;
}
</style>