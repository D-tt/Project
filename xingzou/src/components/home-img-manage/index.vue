<template>
	<div>
		<el-row class="user-container">
			<el-form ref="searchForm" :model="formData" label-width="80px" inline>
				<el-col :span="6">
					<el-form-item label="状态" prop="state">
						<el-select v-model="formData.state"  clearable>
							<el-option
								v-for="(item, index) in stateOptions"
								:key="index"
								:label="item.label"
								:value="item.value">
							</el-option>
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
			<el-button type="primary" @click="deleteRows">删除</el-button>
			<el-button type="primary" @click="startRow">启用</el-button>
			<el-button type="primary" @click="disabledRow">禁用</el-button>
		</div>
		
		<!-- {{formData}} -->

		<el-table :data="tableData" border @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
			<el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
			<el-table-column align="center" prop="order" label="排序"></el-table-column>
			<el-table-column align="center" prop="imgName" label="图片名称"></el-table-column>
			<el-table-column align="center" prop="state" label="状态">
					<template slot-scope="scope">
						<span>{{getstate(scope.row.state)}}</span>
					</template>
			</el-table-column>
			<!-- <el-table-column align="center" prop="preview" label="预览"></el-table-column> -->
			<el-table-column align="center" prop="sinceValidity" label="有效期起">
					<template slot-scope="scope">
						<span>{{momentDate(scope.row.sinceValidity)}}</span>
					</template>
			</el-table-column>
			<el-table-column align="center" prop="periodValidity" label="有效期止">
					<template slot-scope="scope">
						<span>{{momentDate(scope.row.periodValidity)}}</span>
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
		
		<el-dialog  :visible.sync="dialogVisible" width="60%" title="新增轮播图">
			<el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="轮播图片" prop="imgName">
							<el-input v-model="dialogForm.imgName" placeholder="请输入轮播图片名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序" prop="order">
							<el-input v-model="dialogForm.order" placeholder="请选择排序"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="有效期起" prop="sinceValidity">
							<el-date-picker 
							v-model="dialogForm.sinceValidity"
							type="date"
							placeholder="年/月/日">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="有效期止" prop="periodValidity">
							<el-date-picker 
							v-model="dialogForm.periodValidity"
							type="date"
							placeholder="年/月/日">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="商品" prop="goodsName">
                            <el-input v-model="dialogForm.goodsName" placeholder="请输入商品名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary">选择</el-button>
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
					state:'',
				},
				stateOptions:[
					{label: '全部', value: '0'},
					{label: '启用', value: '1'},
					{label: '禁用', value: '2'},
				],
				allTableData: [],
				tableData:[
					// {order:'001',src:'admin',state:'启用',preview:'图片',sinceValidity:'2020-02-10',periodValidity:'2020-03-10',},
					// {order:'002',src:'admin',state:'禁用',preview:'图片',sinceValidity:'2020-02-10',periodValidity:'2020-03-10',},
				],
				currentRows:[],
				dialogType:'',
				dialogForm:{
					imgName:'',
					order:'',
					sinceValidity:'',
					periodValidity:'',
					goodsName:'',
				},
				dialogFormrules:{
					imgName: [ { required: true, message: '请输入图片名称', trigger: 'change' } ],
					order: [ { required: true, message: '请输入排序', trigger: 'change' } ],
					sinceValidity: [ { required: true, message: '请选择有效期起', trigger: 'change' } ],
					periodValidity: [ { required: true, message: '请选择有效期止', trigger: 'change' } ],
				}
			}
		},
		methods:{
			fetch () {
				this.pageInfo.pageIndex=1

				this.search()
			},
			search(){
				// 排序 代码
				// this.allTableData=this.allTableData.sort((prev,next) => {
				// 	return Number(prev.order) - Number(next.order)
				// })

				this.pageInfo.total=this.allTableData.filter(item => {
					return item.state.includes(this.formData.state)
				}).length

				this.tableData=this.allTableData.filter(item => {
					return item.state.includes(this.formData.state)
				}).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

			},
			reset(){
				this.$refs.searchForm.resetFields()

				this.fetch()
			},
			momentDate(date) {
				if (!date) {
					return ''
				}
				let year = new Date(date).getFullYear()
				let month = new Date(date).getMonth() + 1
				let day = new Date(date).getDate()

				return year + '-' + month + '-' + day
			},
			getstate (value) {
				if (value === '0') {
					return ''
				}

				return this.stateOptions.filter(item => {
					return item.value === value
				})[0].label
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
					return item.id
				})

				indexList.forEach(indexItem => {
					let currentIndex=this.allTableData.findIndex(item => {
						return item.id === indexItem
					})

					console.log(currentIndex)
					// allTableData : [{}, {}] // 2
					
					this.allTableData[currentIndex]=Object.assign({},this.allTableData[currentIndex],{
						state:'1'
					})
				})

				this.search()
			},
			//禁用
			disabledRow(){
				if(this.currentRows.length <=0) {
					this.$message({
						type:'error',
						message:'请至少勾选一条需要禁用的数据！'
					})
					return
				}

				let indexList=this.currentRows.map(item => {
					return item.id
				})

				indexList.forEach(indexItem => {
					let currentIndex=this.allTableData.findIndex(item => {
						return item.id === indexItem
					})

					this.allTableData[currentIndex]=Object.assign({},this.allTableData[currentIndex],{
						state:'2'
					})
				})

				this.search()
			},
			dialogConfirm(){
				if(this.dialogType==="add"){
					this.$refs.dialogForm.validate(valid => {
						if(valid){
							
							let newDialogForm=Object.assign({},this.dialogForm,{
								id:new Date().getTime(),
								preview:'图片',
								state:'0'
							} )   //源数据

							let index = this.allTableData.findIndex(item => {
								return Number(item.order) === Number(newDialogForm.order)
								})

								if (index >= 0) {
								this.allTableData.splice(index,0,newDialogForm)
							}else {
								this.allTableData.push(newDialogForm)
							}

							this.allTableData=this.allTableData.map((item,index) => {
								return Object.assign({},item,{
									order:index + 1
								})
							})

							this.allTableData = this.allTableData.sort((prev,next) => {
								return Number(prev.order) - Number(next.order)
							})
							
							this.search()
							// console.log(this.tableData)

							this.$refs.dialogForm.resetFields()  //清空dialogForm

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
