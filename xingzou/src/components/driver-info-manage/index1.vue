<template>
	<div>
        <el-form ref="searchForm" :model="formData" label-width="80px" class="container">
		    <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="司机编号">
                        <el-input size="medium" v-model="formData.order"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="司机姓名">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                </el-col>
				<el-col :span="8">
					<el-form-item label="所在省份">
						<el-select v-model="formData.province"  clearable>
							<el-option label="江苏省" value="0"></el-option>
							<el-option label="上海市" value="1"></el-option>
							<el-option label="湖北省" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
		    </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
					<el-form-item label="所在城市">
						<el-select v-model="formData.city"  clearable>
							<el-option label="南京市" value="0"></el-option>
							<el-option label="徐州市" value="1"></el-option>
							<el-option label="无锡市" value="2"></el-option>
							<el-option label="苏州市" value="3"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
                <el-col :span="8">
					<el-form-item label="所在区">
						<el-select v-model="formData.area"  clearable>
							<el-option label="玄武区" value="0"></el-option>
							<el-option label="鼓楼区" value="1"></el-option>
							<el-option label="雨花台区" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-button type="primary" @click="fetch">查询</el-button>
                        <el-button type="primary" @click="reset">重置</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
		<div class="operate">
			<el-button type="primary">详情</el-button>
			<el-button type="primary" @click="openDialog" >新增</el-button>
			<el-button type="primary">修改</el-button>
			<el-button type="primary" @click="deleteRows">删除</el-button>
		</div>
		
		<!-- {{formData}} -->
 <!-- stripe="true"设置表格斑马纹      border="true" 设置表格的垂直方向的边框 -->
		<el-table :data="tableData" border @selection-change="getRows">    
          <el-table-column align="center" type="selection"></el-table-column>       
          <el-table-column align="center" prop="order" label="司机编号"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机"></el-table-column>
          <el-table-column align="center" prop="id" label="身份证"></el-table-column>
          <el-table-column align="center" prop="account" label="账号"></el-table-column>
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
		
		<el-dialog  :visible.sync="dialogVisible" width="60%" title="新增司机">
			<el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
				<el-row>
					<el-col :span="12">
						<el-form-item label="司机姓名" prop="name">
							<el-input v-model="dialogForm.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="联系电话" prop="phone">
							<el-input v-model="dialogForm.phone"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="账号" prop="account">
							<el-input v-model="dialogForm.account"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="密码" prop="password">
							<el-input v-model="dialogForm.password"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="id">
                            <el-input v-model="dialogForm.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在省份" prop="province">
                            <el-select v-model="dialogForm.province"  clearable>
                                <el-option label="江苏省" value="0"></el-option>
                                <el-option label="上海市" value="1"></el-option>
                                <el-option label="湖北省" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
				</el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所在城市" prop="city">
                            <el-select v-model="dialogForm.city"  clearable>
                                <el-option label="南京市" value="0"></el-option>
                                <el-option label="徐州市" value="1"></el-option>
                                <el-option label="无锡市" value="2"></el-option>
                                <el-option label="苏州市" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所在区" prop="area">
                            <el-select v-model="dialogForm.area"  clearable>
                                <el-option label="玄武区" value="0"></el-option>
                                <el-option label="鼓楼区" value="1"></el-option>
                                <el-option label="雨花台区" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
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
		data(){
			return {
				dialogVisible:false,
				pageInfo:{
					pageIndex:1,
					pageSize:5,
					total:0
            	},
				formData:{
                    order:'',
                    name:'',
                    province:'',
                    city:'',
                    area:'',
				},
				tableData: [],
				allTableData:[
                {order:'SJ0001',name:'admin',phone:'18952216028',id:'32030216521534212X',account:'sj001',},
                {order:'SJ0001',name:'李四',phone:'18952216028',id:'32030216521534212X',account:'sj001',},
				],
				currentRows:'',
				dialogType:'',
				dialogForm:{
					name:'',
					phone:'',
					account:'',
					password:'',
					id:'',
					province:'',
					city:'',
					area:'',
				},
				dialogFormrules:{
					name: [ { required: true, message: '请输入司机姓名', trigger: 'change' } ],
					phone: [ { required: true, message: '请输入联系电话', trigger: 'change' } ],
					account: [ { required: true, message: '请输入司机账号', trigger: 'change' } ],
					password: [ { required: true, message: '请输入密码', trigger: 'change' } ],
					id: [ { required: true, message: '请输入身份证号', trigger: 'change' } ],
					province: [ { required: true, message: '请选择省份', trigger: 'change' } ],
					city: [ { required: true, message: '请选择城市', trigger: 'change' } ],
					area: [ { required: true, message: '请选择区县', trigger: 'change' } ],
				}
			}
		},
		mounted (){     //生命周期函数
			this.fetch()
		},
		methods:{
			fetch () {
				this.pageInfo.pageIndex=1

				this.search()
			},
			search(){
				this.tableData=this.allTableData.filter(item => {
					return item.order.includes(this.formData.order) && item.name.includes(this.formData.name) && item.province.includes(this.formData.province)  && item.city.includes(this.formData.city)  && item.area.includes(this.formData.area) 
				}).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

				this.pageInfo.total = this.allTableData.length
			},
			reset(){
				this.$refs.searchForm.resetFields()

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
			openDialog(){
			this.dialogVisible=true
			this.dialogType='add'
			},
			cancel(){
				this.$refs.dialogForm.resetFields()
				this.dialogVisible=false
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
			dialogConfirm(){
				if(this.dialogType==="add"){
					this.$refs.dialogForm.validate(valid => {
						if(valid){
							
							let newDialogForm=Object.assign({},this.dialogForm,{
								id:new Date().getTime()
							} )   //源数据

							this.allTableData.push(newDialogForm)

							this.search()
							// console.log(this.tableData)

							this.$refs.dialogForm.resetFields()  //清空

							this.dialogVisible=false

							console.log('表单校验通过！')
						}else{
							return false
						}
					})
				}
				else if(this.dialogType==='set'){
					this.$refs.dialogForm.validate(valid => {
						if(valid){
							let index=this.allTableData.findIndex(item =>{
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
		},
		
}
</script>

<style lang="scss" scoped>
	.container{
		padding: 20px;
	}
	.operate{
		margin-left: 24px;
		margin-bottom: 20px;
	}
	.pages{
		margin-top: 20px;
		margin-left: 24px;
	}
	
</style>
