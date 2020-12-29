<template>
  <div class="system">
    <div class="form">
      <el-form  ref="searchForm" :model="formData" label-width="80px" inline>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="formData.userName" clearable placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formData.phone" clearable placeholder="请输入手机号"></el-input>
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
			<el-button type="primary" @click="startRow">启用</el-button>
			<el-button type="primary" @click="disabledRow">停用</el-button>
			<el-button type="primary" @click="deleteRows">删除</el-button>
    </div>

    <el-table :data="tableData" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
			<el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
			<el-table-column align="center" prop="jobNumber" label="工号"></el-table-column>
			<el-table-column align="center" prop="userName" label="姓名"></el-table-column>
			<el-table-column align="center" prop="phone" label="手机号"></el-table-column>
			<el-table-column align="center" prop="idNumber" label="身份证号"></el-table-column>
			<el-table-column align="center" prop="state" label="状态">
        <template slot-scope="scope">
          <span>{{getStatusLable(scope.row.state)}}</span>
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

    <el-dialog  :visible.sync="dialogVisible" width="500px" title="新增">
			<el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
					<el-col>
						<el-form-item label="姓名" prop="userName">
							<el-input v-model="dialogForm.userName" placeholder="请输入姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="身份证号" prop="idNumber">
							<el-input v-model="dialogForm.idNumber" placeholder="请输入身份证号"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="dialogForm.phone" placeholder="请输入手机号"></el-input>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="角色" prop="role">
              <el-select v-model="dialogForm.role"  clearable>
                <el-option
                  v-for="(item, index) in roleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
						</el-form-item>
					</el-col>
					<el-col>
						<el-form-item label="性别" prop="sex">
              <el-select v-model="dialogForm.sex"  clearable>
                <el-option
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
        userName:'',
        phone:'',
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
      statusOptions:[
        {label: '', value: '0'},
        {label: '启用', value: '1'},
        {label: '停用', value: '2'},
      ],
      dialogForm:{
        userName:'',
        idNumber:'',
        phone:'',
        role:'',
        sex:'',
      },
      roleOptions:[
        {label: '管理员', value: '0'},
        {label: '配送员', value: '1'},
        {label: '店长', value: '2'},
      ],
      sexOptions:[
        {label: '男', value: '0'},
        {label: '女', value: '1'},
      ],
      dialogFormrules:{
        userName: [ { required: true, message: '请输入姓名', trigger: 'change' } ],
        idNumber: [ { required: true, message: '请输入身份证号', trigger: 'change' } ],
        phone: [ { required: true, message: '请输入手机号', trigger: 'change' } ],
        role: [ { required: true, message: '请输入角色', trigger: 'change' } ],
        sex: [ { required: true, message: '请输入性别', trigger: 'change' } ],
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
        return item.userName.includes(this.formData.userName) && item.phone.includes(this.formData.phone)
      }).length

      // this.pageInfo.total = this.tableData.length
      
      this.tableData = this.allTableData.filter(item => {
        return item.userName.includes(this.formData.userName) && item.phone.includes(this.formData.phone)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      console.log(this.tableData)
    },
    //表单 重置
    reset(){
      this.$refs.searchForm.resetFields()

      this.fetch()
    },
    // 表格 状态
    getStatusLable (value) {
     let currentObj = this.statusOptions.filter(item => {
       return value === item.value
     })[0]
    
      return currentObj.label
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
    //启用
    startRow(){
      if(this.currentRows.length <=0) {
        this.$message({
          type:'error',
          message:'请至少勾选一条需要启用的数据！'
        })
        return
      }

      let indexList=this.currentRows.map(item => {
        return item.jobNumber
      })

      indexList.forEach(indexItem => {
        let currentIndex=this.allTableData.findIndex(item => {
          return item.jobNumber === indexItem
        })

        console.log(currentIndex)
        // allTableData : [{}, {}] // 2
        
        this.allTableData[currentIndex]=Object.assign({},this.allTableData[currentIndex],{
          state:'1'
        })
      })

      this.search()
    },
    // 停用
    disabledRow(){
      if(this.currentRows.length <=0) {
        this.$message({
          type:'error',
          message:'请至少勾选一条需要停用的数据！'
        })
        return
      }

      let indexList=this.currentRows.map(item => {
        return item.jobNumber
      })

      indexList.forEach(indexItem => {
        let currentIndex=this.allTableData.findIndex(item => {
          return item.jobNumber === indexItem
        })

        this.allTableData[currentIndex]=Object.assign({},this.allTableData[currentIndex],{
          state:'2'
        })
      })

      this.search()
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
          return item.jobNumber
        })

        indexList.forEach(indexItem => {
          console.log(indexItem)
          let currentIndex = this.allTableData.findIndex(item => {
            return item.jobNumber ===indexItem
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
            let newDialogForm=Object.assign({},this.dialogForm,{
              // id:new Date().getTime(),
              jobNumber:new Date().getTime(),
              state:'1'
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
              return item.jobNumber===this.dialogForm.jobNumber
            })
            let newFormData=Object.assign({},this.dialogForm,{
              jobNumber :new Date().getTime(),
              
            })

            this.allTableData.splice(index,1,newFormData)

            this.$refs.dialogForm.resetFields()

            this.dialogVisible=false

            this.search()
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
  }
  .operate{
    padding: 30px;
  }
  .pages{
    margin-left: 300px;
    margin-top: 50px;
  }
</style>