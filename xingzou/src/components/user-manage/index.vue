<template>
	<div>
		<el-row class="user-container">
			<el-form ref="searchForm" :model="formData" label-width="80px" inline>
				<el-col :span="6">
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="formData.userName" placeholder="请输入用户姓名"></el-input>
					</el-form-item>
				</el-col>	
				<el-col :span="6">
					<el-form-item label="用户账号" prop="account">
						<el-input v-model="formData.account" placeholder="请输入用户账号"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="角色" prop="role">
						<el-select v-model="formData.role"  clearable>
							<el-option label="管理员" value="0"></el-option>
							<el-option label="店长" value="1"></el-option>
							<el-option label="司机" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-button type="primary" @click="fetch">查询</el-button>
					<el-button type="primary" @click="reset">重置</el-button>
				</el-col>	
			</el-form>
		</el-row>
		<div class="operate">
			<el-button type="primary" @click="openDialog" >新增</el-button>
				<!-- <el-dialog  :visible.sync="dialogVisible">
					<el-form ref="Form" :model="Form" label-width="80px" rules="Formrules">
						<el-row>
							<el-col :span="12">
								<el-form-item label="用户账号" prop="account">
									<el-input v-model="Form.account"></el-input>
								</el-form-item>
							</el-col>	
							<el-col :span="12">
								<el-form-item label="用户姓名" prop="userName">
									<el-input v-model="Form.userName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="12">
								<el-form-item label="用户账号" prop="account">
									<el-input v-model="Form.account"></el-input>
								</el-form-item>
							</el-col>	
							<el-col :span="12">
								<el-form-item label="用户姓名" prop="userName">
									<el-input v-model="Form.userName"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-dialog> -->
			<el-button type="primary" @click="openUpdateDialog">修改</el-button>
			<el-button type="primary" @click="deleteRows">删除</el-button>
		</div>
		
		<!-- {{formData}} -->

		<el-table :data="tableData" border @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
          <el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
          <el-table-column align="center" prop="account" label="账号"></el-table-column>
          <el-table-column align="center" prop="userName" label="姓名"></el-table-column>
          <el-table-column align="center" prop="role" label="角色">
		  	<template slot-scope="scope">
          		<span>{{scope.row.role === '0' ? '管理员' : scope.row.role === '1' ? '店长' : scope.row.role === '2' ? '司机' : ''}}</span>
        	</template>
		  </el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
          <el-table-column align="center" prop="phone" label="手机"></el-table-column>
          <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
          <el-table-column align="center" prop="idCard" label="身份证"></el-table-column>
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
		
		<el-dialog  :visible.sync="dialogVisible" width="60%" title="新增">
			<el-row>
				<el-form ref="dialogForm" :model="dialogForm" label-width="100px" :rules="dialogFormrules" inline>
					<el-col :span="12">
						<el-form-item label="用户账号" prop="account">
							<el-input v-model="dialogForm.account" placeholder="请输入用户账号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户姓名" prop="userName">
							<el-input v-model="dialogForm.userName" placeholder="请输入用户姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户性别" prop="sex">
							<el-input v-model="dialogForm.sex" placeholder="请输入用户性别"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="dialogForm.phone" placeholder="请输入手机号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户邮箱" prop="email">
							<el-input v-model="dialogForm.email" placeholder="请输入用户邮箱"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="身份证" prop="idCard">
							<el-input v-model="dialogForm.idCard" placeholder="请输入用户身份证"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户密码" prop="password">
							<el-input v-model="dialogForm.password" placeholder="请输入用户密码"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="用户角色" prop="role">
							<el-select v-model="dialogForm.role">
								<el-option label="管理员" value="0"></el-option>
								<el-option label="店长" value="1"></el-option>
								<el-option label="司机" value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>

			<span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</span>
		</el-dialog >
	</div> 
</template>

<script>

import axios from 'axios'

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
					userName:'',
					account:'',
					role:''
				},
				allTableData: [],
				tableData:[
                // {account:'admin',userName:'admin',role:'管理员',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'3023651319799'},
                // {account:'12354',userName:'张三',role:'店长',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'3023651319799'},
                // {account:'12354654',userName:'李四',role:'司机',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'3023651319799'},
                // {account:'qwerq123',userName:'赵六',role:'管理员',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'3023651319799'},
                // {account:'afdada',userName:'谭七',role:'管理员',sex:'男',phone:'18952216028',email:'18952216028@adf.com',idCard:'3023651319799'},
				],
				currentRows:'',
				dialogType:'',
				// Form:{
				// 	account:'',
				// 	userName:''
				// },
				// Formrules:{
				// 	account: [ { required: true, message: '请输入密码', trigger: 'change' } ],
				// 	userName: [ { required: true, message: '请输入密码', trigger: 'change' } ],
				// },
				dialogForm:{
					account:'',
					userName:'',
					phone:'',
					email:'',
					idCard:'',
					password:'',
					sex:'',
					role:'',
					// selection:'',
				},
				dialogFormrules:{
					account: [ { required: true, message: '请输入账号', trigger: 'change' } ],
					userName: [ { required: true, message: '请输入用户名', trigger: 'change' } ],
					sex: [ { required: true, message: '请输入性别', trigger: 'change' } ],
					phone: [ { required: true, message: '请输入手机', trigger: 'change' } ],
					password: [ { required: true, message: '请输入密码', trigger: 'change' } ],
					role: [ { required: true, message: '请输入角色', trigger: 'change' } ],
				}
			}
		},
		mounted () {
			// console.log(axios)

			this.fetch()
		},
		methods:{
			fetch () {
				this.pageInfo.pageIndex=1

				this.search()
			},
			search(){
				// 调接口的方法
				axios({
					url:'http://localhost:3000/userManage/getTableData',
					method:'get',
					params:{
						pageIndex:this.pageInfo.pageIndex,
						pageSize:this.pageInfo.pageSize,
						userName:this.formData.userName,
						account:this.formData.account,
						role:this.formData.role,       //三条formData 可以简写为 ...this.formData

						// ...this.formData
					}
				}).then(result => {    // 渲染到页面上
						this.tableData = result.data.data
						this.pageInfo.pageIndex = result.data.pageIndex
						this.pageInfo.pageSize = result.data.pageSize
						this.pageInfo.total = result.data.total
						console.log('result: ',result)
					})
				// 老方法
				// this.pageInfo.total=this.allTableData.filter(item => {
				// 	return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) && item.role.includes(this.formData.role)
				// }).length
					
				// this.tableData=this.allTableData.filter(item => {
				// 	return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) && item.role.includes(this.formData.role)
				// }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

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
					let idList=this.currentRows.map(item => {
						return item.id
					})

					// idList.forEach(indexItem => {      // 之前是 indexList
					// 	console.log(indexItem)
					// 	let currentIndex = this.allTableData.findIndex(item => {
					// 		return item.id ===indexItem
					// 	})
					// 	console.log('currentIndex',currentIndex)
					// 	this.allTableData.splice(currentIndex,1)
					// })

					axios({
						url:'http://127.0.0.1:3000/userManage/deleteUser',
						method:'POST',
						data:{
							ids:idList.toString()
						}
					}).then( result => {
						this.search()
						console.log(result)
					})
				})
			},
			/* dialogConfirm(){
				//单独只有必填校验
				this.$refs.dialogForm.validate(valid => {
					if(valid){
						
						let newDialogForm=Object.assign({},this.dialogForm)   //源数据

						this.allTableData.push(newDialogForm)

						// this.tableData=this.allTableData.filter(item => {
						// 	return item.userName.includes(this.formData.userName)
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
			}, */
			dialogConfirm(){
				if(this.dialogType==="add"){
					this.$refs.dialogForm.validate(valid => {
						if(valid){
							// let newDialogForm=Object.assign({},this.dialogForm,{
							// 	id:new Date().getTime()
							// } )   //源数据

							// this.allTableData.push(newDialogForm)
							// this.search()
							// // console.log(this.tableData)

							// this.$refs.dialogForm.resetFields()  //清空

							// this.dialogVisible=false

							// console.log('表单校验通过！')

							axios({
								url:'http://127.0.0.1:3000/userManage/addUser',
								method:'POST',
								data:this.dialogForm
							}).then(result => {
								this.search()
								console.log(result)
								this.$refs.dialogForm.resetFields()
								this.dialogVisible=false
							})
						}else{
							return false
						}
					})
				}
				else if(this.dialogType==='set'){
					this.$refs.dialogForm.validate(valid => {
						if(valid){
							// let index=this.allTableData.findIndex(item =>{
							// return item.id===this.dialogForm.id
							// })
							// let newFormData=Object.assign({},this.dialogForm)

							// this.allTableData.splice(index,1,newFormData)

							// this.$refs.dialogForm.resetFields()

							// this.dialogVisible=false

							// this.search()
							// console.log(index)

							axios({
								url:'http://127.0.0.1:3000/userManage/updateUser',
								method:'POST',
								data:this.dialogForm
							}).then(result => {
								this.search()
								console.log(result)
								this.$refs.dialogForm.resetFields()
								this.dialogVisible=false
							})
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
	.user-container{
		padding-top: 20px;
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
