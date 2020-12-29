<template>
  <div>
      <el-form ref="searchForm" :model="formData" label-width="80px" class="hot-goods-manage" inline>
        <el-col>
            <el-form-item label="商品名称" prop="goodsName">
                <el-input v-model="formData.goodsName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品编号" prop="goodsId">
                <el-input v-model="formData.goodsId" placeholder="请输入商品编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetch">查询</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-col>
        <el-col>
            <el-form-item>
                <el-button type="primary" @click="openDialog"  >新增</el-button>
                <el-button type="primary" @click="openUpdateDialog" >修改</el-button>
                <el-button type="primary" @click="deleteRows" >删除</el-button>
                <el-button type="primary" >展示数量设置</el-button>
            </el-form-item>
        </el-col>
      </el-form>

      <el-table :data="tableData" border height="250" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->    <!-- height="250"   固定表头 -->
          <el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
          <el-table-column align="center" prop="serialNumber" label="排序"></el-table-column>
          <el-table-column align="center" prop="goodsCode" label="商品编号"></el-table-column>
          <el-table-column align="center" prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="goodsPrice" label="商品价格"></el-table-column>
          <el-table-column align="center" prop="goodsIntroduce" label="商品介绍"></el-table-column>
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

        <!-- 新增 dialog 框  -->
        <el-dialog :visible.sync="dialogVisible" width="60%" title="新增">
            <el-row>
                <el-form ref="dialogForm" :model="dialogForm" label-width="100px" :rules="dialogFormrules" inline>
                    <el-col :span="24">
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input v-model="dialogForm.goodsName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="热门位排序" prop="serialNumber">
                            <el-input v-model="dialogForm.serialNumber" placeholder="请选择热门位序"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-form>
            </el-row>
            <span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</span>
        </el-dialog>
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
                goodsName:'',
                goodsCode:''
            },
            dialogForm:{
                serialNumber:'',          //排序
                goodsCode:'',               //商品编号
                // goodsName:'',             //商品名称
                // goodsPrice:'',            //商品价格
                // goodsIntroduce:'',        //商品介绍
            },
            dialogFormrules:{
                goodsName: [ { required: true, message: '请输入商品名称', trigger: 'change' } ],
                serialNumber: [ { required: true, message: '请输入序号', trigger: 'change' } ],
            },
            dialogType:'',
            dialogVisible:false,
            currentRows:[],
            tableData:[],
            allTableData:[
                // {serialNumber:'001',goodsCode:'2020123',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'002',goodsCode:'2020456',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'003',goodsCode:'2020789',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'004',goodsCode:'2020321',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'005',goodsCode:'2020654',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'006',goodsCode:'2020987',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'007',goodsCode:'2020147',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},
                // {serialNumber:'008',goodsCode:'2020741',goodsName:'漫长的告别',goodsPrice:'55',goodsIntroduce:'怪不得村上春树读了12遍！每每陷入困境，村上春树便打开《漫长的告别》'},

            ]
        }
    },
    // mounted (){
    //     this.fetch()
    // },
    methods:{
        fetch(){
            this.pageInfo.pageIndex=1

            this.search()
        },
        search(){
            this.pageInfo.total=this.allTableData.filter(item => {
                return item.goodsName.includes(this.formData.goodsName) && item.goodsCode.includes(this.formData.goodsCode) 
            }).length
            
                // this.pageInfo.total = this.tableData.length
                
            this.tableData=this.allTableData.filter(item => {
                return item.goodsName.includes(this.formData.goodsName) && item.goodsCode.includes(this.formData.goodsCode) 
            }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

		},
		reset(){
				this.$refs.searchForm.resetFields()

				this.fetch()
		},
        getRows(rows){
            console.log('rows',rows)
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
        openDialog(){
			this.dialogVisible=true
			this.dialogType='add'
        },
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
        cancel(){
            this.$refs.dialogForm.resetFields()
            this.dialogVisible=false
        },
        dialogConfirm(){
            if(this.dialogType==="add"){
                this.$refs.dialogForm.validate(valid => {
                    if(valid){
                        let newDialogForm=Object.assign({},this.dialogForm,{
                            id:new Date().getTime(),
                            goodsCode: new Date().getTime().toString(),
                            goodsPrice:parseFloat(Math.random()*100).toFixed(2),
                            goodsIntroduce:'这是一段精简的商品介绍'
                        } )   //源数据

                        let index = this.allTableData.findIndex(item => {
                            return Number(item.serialNumber) === Number(newDialogForm.serialNumber)
                        })

                        if (index >= 0) {
                            this.allTableData.splice(index,0,newDialogForm)
                        }else {
                            this.allTableData.push(newDialogForm)
                        }

                        this.allTableData=this.allTableData.map((item,index) => {
                            return Object.assign({},item,{
                                serialNumber:index + 1
                            })
                        })

                        this.allTableData = this.allTableData.sort((prev,next) => {
                            return Number(prev.serialNumber) - Number(next.serialNumber)
                        })
                        // this.tableData=this.allTableData.filter(item => {
                        // 	return item.goodsName.includes(this.formData.goodsName)
                        // })

                        this.search()
                        // console.log(this.tableData)

                        this.$refs.dialogForm.resetFields()  //清空

                        this.dialogVisible=false

                        console.log('表单校验通过！')
                    }else{
                        return false
                    }
                })
            }else if(this.dialogType==='set'){
                this.$refs.dialogForm.validate(valid => {
                    if(valid){
                        let index=this.allTableData.findIndex(item =>{     //findIndex  是查找下标
                        return item.id===this.dialogForm.id
                        })
                        let newFormData=Object.assign({},this.dialogForm)

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
			}
        }
}
</script>

<style lang="scss" scoped>
.hot-goods-manage{
    margin-top: 20px;
    margin-left: 20px;
}
.pages{
  margin-top: 20px;
  margin-left: 20px;
}
</style>