<template>
  <div class="system">
    <div class="form">
      <el-form  ref="searchForm" :model="formData" label-width="80px" inline>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="广告标题" prop="caption">
              <el-input v-model="formData.caption" clearable placeholder="请输入广告标题"></el-input>
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
			<!-- <el-button type="primary" @click="startRow">启用</el-button>
			<el-button type="primary" @click="disabledRow">停用</el-button> -->
			<el-button type="primary" @click="deleteRows">删除</el-button>
    </div>

    <el-table :data="tableData" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
			<el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
			<el-table-column align="center" prop="serialNumber" label="编号"></el-table-column>
			<el-table-column align="center" prop="caption" label="标题"></el-table-column>
			<el-table-column align="center" prop="integration" label="奖励积分"></el-table-column>
			<el-table-column align="center" prop="address" label="图片地址"></el-table-column>
			<el-table-column align="center" prop="order" label="排序"></el-table-column>
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
          <el-form-item label="广告标题" prop="caption">
            <el-input v-model="dialogForm.caption" placeholder="请输入广告标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="奖励积分" prop="integration">
            <el-input v-model="dialogForm.integration" placeholder="请输入奖励积分"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="图片名称" prop="pictureName">
            <el-input v-model="dialogForm.pictureName" placeholder="请输入图片名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="上传内容" prop="text">
            <el-input type="textarea" autosize v-model="dialogForm.text" placeholder="请输入内容"></el-input>
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
        caption:'',
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
        caption:'',
        integration:'',
        pictureName:'',
        text:'',
      },
      dialogFormrules:{
        caption: [ { required: true, message: '请输入广告标题', trigger: 'change' } ],
        integration: [ { required: true, message: '请输入奖励积分', trigger: 'change' } ],
        pictureName: [ { required: true, message: '请输入图片名称', trigger: 'change' } ],
        text: [ { required: true, message: '请输入上传内容', trigger: 'change' } ],
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
      // 排序代码
      // this.allTableData = this.allTableData.sort((prev,next) => {
      //   return Number(prev.serialNumber) - Number(next.serialNumber)
      // })
      this.pageInfo.total = this.allTableData.filter(item => {
        return item.caption.includes(this.formData.caption)
      }).length

      // this.pageInfo.total = this.tableData.length
      
      this.tableData = this.allTableData.filter(item => {
        return item.caption.includes(this.formData.caption)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
      console.log(this.tableData)
    },
    //表单 重置
    reset(){
      this.$refs.searchForm.resetFields()

      this.fetch()
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
    // 停用
  
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
          return item.serialNumber
        })

        indexList.forEach(indexItem => {
          console.log(indexItem)
          let currentIndex = this.allTableData.findIndex(item => {
            return item.serialNumber ===indexItem
          })
          console.log('currentIndex',currentIndex)
          this.allTableData.splice(currentIndex,1)
        })

        // 删除之后 自动排序
        this.allTableData = this.allTableData.map((item,index) => {
          return Object.assign({},item,{
            order:index + 1
          })
        })
        this.allTableData = this.allTableData.sort((prev,next) => {
          return Number(prev.serialNumber) - Number(next.serialNumber)
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
              serialNumber:new Date().getTime(),
              address:'http://www.baidu.com',
              integration:Math.floor(Math.random()*(8000-6000+1) + 6000),
            } )   //源数据

            let index = this.allTableData.findIndex(item => {
              return Number(item.serialNumber) === Number(newDialogForm.serialNumber)
            })
            if(index >=0){
              this.allTableData.splice(index,0,newDialogForm)
            }else {
              this.allTableData.push(newDialogForm)
            }

            this.allTableData = this.allTableData.map((item,index) => {
              return Object.assign({},item,{
                order:index + 1
              })
            })
            this.allTableData = this.allTableData.sort((prev,next) => {
              return Number(prev.serialNumber) - Number(next.serialNumber)
            })

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
              return item.serialNumber===this.dialogForm.serialNumber
            })
            let newFormData=Object.assign({},this.dialogForm,{
              serialNumber :new Date().getTime(),
              
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