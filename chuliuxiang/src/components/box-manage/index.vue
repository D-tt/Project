<template>
  <div class="system">
    <div class="form">
      <el-form  ref="searchForm" :model="formData" label-width="80px" inline>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="规格" prop="size">
              <el-input v-model="formData.size" clearable placeholder="请输入箱子规格"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="fetch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="operate">
      <el-button type="primary" @click="openDialog" >新增</el-button>
      <el-button type="primary" @click="openUpdateDialog" >修改</el-button>
			<el-button type="primary" @click="deleteRows">删除</el-button>
    </div>

    <el-table :data="tableData" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
			<el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
			<el-table-column align="center" prop="serial" label="序号"></el-table-column>
			<el-table-column align="center" prop="size" label="箱子规格"></el-table-column>
			<el-table-column align="center" prop="total" label="总数量"></el-table-column>
			<el-table-column align="center" prop="usedTotal" label="已使用数量"></el-table-column>
			<el-table-column align="center" prop="scale" label="使用比例"></el-table-column>
			<el-table-column align="center" prop="integration" label="所需积分"></el-table-column>
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

    <el-dialog  :visible.sync="dialogVisible" width="500px" title="新增">
			<el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
					<el-col>
						<el-form-item label="箱子规格" prop="size">
							<el-input v-model="dialogForm.size" placeholder="请输入箱子规格"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="库存数量" prop="stock">
							<el-input v-model="dialogForm.stock" placeholder="请输入库存数量"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="所需积分" prop="integration">
							<el-input v-model="dialogForm.integration" placeholder="请输入所需积分"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="dialogForm.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</span>
		</el-dialog >
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData:{
        size:'',
      },
      dialogVisible:false,
      pageInfo:{
        pageIndex:1,
        pageSize:5,
        total:0
      },
      tableData:[],
      allTableData:[],
      currentRows:[],
      dialogType:'',
      dialogForm:{
        size:'',
        stock:'',
        integration:'',
        remark:'',
      },
      roleOptions:[
        {label: '管理员', value: '0'},
        {label: '店长', value: '1'},
        {label: '司机', value: '2'},
      ],
      sexOptions:[
        {label: '男', value: '0'},
        {label: '女', value: '1'},
      ],
      dialogFormrules:{
        size: [ { required: true, message: '请输入箱子规格', trigger: 'change' } ],
        stock: [ { required: true, message: '请输入库存数量', trigger: 'change' } ],
        integration: [ { required: true, message: '请输入所需积分', trigger: 'change' } ],
        remark: [ { required: true, message: '请输入备注', trigger: 'change' } ],
      },

    }
  },
  methods:{
    fetch(){
      this.pageInfo.pageIndex=1

      this.search()
    },
    // 表单查询
    search(){

      this.pageInfo.total = this.allTableData.filter(item => {
        return item.size.includes(this.formData.size)
      }).length
      
      this.tableData = this.allTableData.filter(item => {
        return item.size.includes(this.formData.size)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      
    },
    //表单 重置
    reset(){
      this.$refs.searchForm.resetFields()

      this.fetch()
      // console.log(this.tableData)
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
          return item.serial           //
        })

        indexList.forEach(indexItem => {
          console.log(indexItem)
          let currentIndex = this.allTableData.findIndex(item => {
            return item.serial ===indexItem        //
          })
          console.log('currentIndex',currentIndex)
          this.allTableData.splice(currentIndex,1)
        })

        this.search()
      })
    },
    // 添加 push
    dialogConfirm(){
      if(this.dialogType === "add"){
        this.$refs.dialogForm.validate(valid => {
          if(valid){
            let usedTotal = Math.floor(Math.random() * (100 - 10 + 1) + 10)       // 随机生成10~100的整数
            let total = Math.floor(Math.random() * (1000 - 100 + 1) + 100)        // 随机生成100~1000的整数

            let newDialogForm=Object.assign({},this.dialogForm,{
              // id:new Date().getTime(),
              serial:new Date().getTime(),
              size: Math.floor(Math.random() * (60 - 5 + 1) + 5)+'*'+ Math.floor(Math.random() * (60 - 5 + 1) + 5) +'*'+Math.floor(Math.random() * (60 - 5 + 1) + 5),
              total:total,
              usedTotal:usedTotal,
              scale: ((Number(usedTotal)/Number(total))*100).toFixed(1) +'%',
            } )   //源数据

            this.allTableData.push(newDialogForm)   

            this.search()

            this.$refs.dialogForm.resetFields()  //清空

            this.dialogVisible=false

            console.log('表单校验通过！')
          }else{
            return false
          }
        })
      }
      else if(this.dialogType === 'set'){
        this.$refs.dialogForm.validate(valid => {
          if(valid){
            let index=this.allTableData.findIndex(item =>{
              return item.serial===this.dialogForm.serial
            })
            let newFormData=Object.assign({},this.dialogForm,{
              serial :new Date().getTime(),
              
            })

            this.allTableData.splice(index,1,newFormData)

            this.$refs.dialogForm.resetFields()

            this.dialogVisible=false

            this.search()
            console.log(index)
          }else {
            return false
          }
        })
      }
    },
    cancel(){
      this.$refs.dialogForm.resetFields()
      this.dialogVisible=false
    },
    getRows(rows){
      console.log(rows)
      this.currentRows=rows
    },
    handleSizeChange(val){
      // console.log('每页' +val+'条数据')
      console.log(val)
      this.pageInfo.pageSize=val //

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
  }
  .operate{
    padding: 30px;
  }
  .pages{
    margin-left: 300px;
    margin-top: 50px;
  }
</style>