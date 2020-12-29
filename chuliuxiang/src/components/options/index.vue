<template>
  <div class="system">
    <div class="form">
      <el-form  ref="searchForm" :model="formData" label-width="80px" >
        <el-row :gutter="30">
          <el-col :span="6">
            <el-form-item label="标题" prop="caption">
              <el-input v-model="formData.caption" clearable placeholder="请输入意见标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" clearable placeholder="请输入提交人"></el-input>
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
			<el-table-column align="center" prop="serial" label="编号"></el-table-column>
			<el-table-column align="center" prop="userName" label="提交人"></el-table-column>
			<el-table-column align="center" prop="caption" label="意见标题"></el-table-column>
			<el-table-column align="center" prop="matter" label="意见内容"></el-table-column>
			<el-table-column align="center" prop="subTime" label="提交时间"></el-table-column>
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
        caption:'',
        phone:'',
      },
      pageInfo:{
        pageIndex:1,
        pageSize:5,
        total:0
      },
      tableData:[],
      allTableData:[
        {serial:'1000001',userName:'张三',caption:'宝贵意见',matter:'太一般啦！',subTime:'2012-12-12 10:10'},
        {serial:'1000002',userName:'李四',caption:'吐槽',matter:'太不好看啦！',subTime:'2012-12-14 11:10'},
        {serial:'1000003',userName:'王五',caption:'垃圾箱',matter:'太好看啦叭！',subTime:'2013-01-12 21:05'},
        {serial:'1000004',userName:'赵六',caption:'宝贵意见',matter:'太不好看啦！',subTime:'2013-02-12 00:10'},
        {serial:'1000005',userName:'谭七',caption:'吐槽',matter:'还不错叭',subTime:'2013-02-24 21:40'},
        {serial:'1000006',userName:'Tom',caption:'宝贵意见',matter:'太不好看啦！',subTime:'2013-04-12 14:15'},
      ],
      currentRows:[],
      dialogType:'',
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
        return item.caption.includes(this.formData.caption) && item.userName.includes(this.formData.phone)
      }).length

      // this.pageInfo.total = this.tableData.length
      
      this.tableData = this.allTableData.filter(item => {
        return item.caption.includes(this.formData.caption) && item.userName.includes(this.formData.phone)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      
    },
    //表单 重置
    reset(){
      this.$refs.searchForm.resetFields()

      this.fetch()
      console.log(this.tableData)
    },
    //新增
    openDialog(){
      this.dialogVisible=true

			this.dialogType='add'
    },
    // 修改
    openUpdateDialog(){
      if(this.currentRows.length === 0) {
					this.$message({
						type:'error',
						message:'请勾选要修改的数据'
					})
          return
        }
      if(this.currentRows.length>1){
        this.$message({
          type:'error',
          message:'修改--只能勾选一条数据'
        })
        return
      }
				
				this.dialogVisible=true
				this.dialogType='set'
				this.dialogForm=Object.assign({},this.currentRows[0])   //对象给对象赋值，需要注意用 Object.assign
    },
    // 删除
    deleteRows(){
      if(! this.currentRows.length){
					this.$message({
						type:'error',
						message:'请勾选要删除的数据'
					})
					return
				}

      this.$confirm('确定要删除选中的数据吗？').then(()=>{
        let indexList=this.currentRows.map(item => {
          return item.id
        })

        indexList.forEach(indexItem => {
          console.log(indexItem)
          let currentIndex = this.allTableData.findIndex(item => {
            return item.id ===indexItem
          })
          console.log('currentIndex',currentIndex)
          this.allTableData.splice(currentIndex,1)
        })

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