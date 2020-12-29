<template>
    <div>
        <div class="container">
            <div class="aside">
                <div class="operate">
                    <el-button type="primary" @click="openDialog">新增</el-button>
                    <el-button type="primary" @click="updateMenu">修改</el-button>
                    <el-button type="primary" @click="deleteMenu">删除</el-button>
                    <el-button type="primary">刷新</el-button>
                </div>
                <div class="menu">
                    <el-tree 
                        :data="data" 
                        :props="defaultProps" 
                        @node-click="handleNodeClick">
                    </el-tree>   <!-- :expand-on-click-node="false"  只有点击三角符号才展开 /收缩  -->
                </div>
            </div>
            <div class="content">
                <div class="details">分类详情</div>
                <div class="form">
                    <el-row>
                        <el-form ref="formData" :model="formData" label-width="80px">
                            <el-col :span="12">
                                <el-form-item label="分类名称" prop="label">
                                    <el-input v-model="formData.label" placeholder="请输入分类名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="备注" prop="remark">
                                    <el-input v-model="formData.remark" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </el-row>
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="dialogVisible" width="50%" title="新增分类">
                <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
                    <el-col :span="24">
                        <el-form-item label="分类名称" prop="classifyName">
                            <el-input v-model="dialogForm.classifyName" placeholder="请输入分类名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="dialogForm.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            
            <span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</span>
            <!-- {{dialogForm}} -->
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return {
            data:[{
                label: '传记',id:'1',
                children:[{label:'名人传记',id:'1-1', children: [] },{label:'帝王传记',id:'1-2', children: [] },{label:'君侯列传',id:'1-3', children: []}]
                }, {
                label: '历史',id:'2',
                children: [{label: '中国历史',id:'2-1', children: [] },{label: '外国历史',id:'2-2', children: [] }]
                }, {
                label:'教育',id:'3',
                children:[{label:'中小教辅',id:'3-1', children: [] },{label:'外语学习',id:'3-2', children: [] },{label:'字典词典',id:'3-3', children: [] },{label:'教师资格',id:'3-4',children:[]},]
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            dialogVisible:false,
            formData:{
                label:'',
                remark:'',
            },
            dialogForm:{
                classifyName:'',
                remark:'',
            },
            currentData:{},
            currentNode: {},
            dialogFormrules:{
                classifyName: [ { required: true, message: '请输入分类名称', trigger: 'change' } ],
            },
        }
    },
    methods:{
        // 点击节点方法
		handleNodeClick (data, node) {
			this.currentData = data
			this.currentNode = node

			this.formData = Object.assign({}, data)
		},
       openDialog () {
			if (!Object.keys(this.currentData).length) {
				this.$message({
					type: 'error',
					message: '请先勾选父级节点'
				})
				return
			}
            this.dialogVisible = true
        },
        cancel(){
            this.$refs.dialogForm.resetFields()

            this.dialogVisible=false
        },
        dialogConfirm(){
            this.$refs.dialogForm.validate(valid => {
                if(valid){
                        let newDialogFrom = Object.assign({}, this.dialogForm, {
                        label: this.dialogForm.classifyName,
                        id: new Date().getTime().toString(),
                        children: []
                        })

                        this.currentData.children.push(newDialogFrom)
                        this.$refs.dialogForm.resetFields()
                        this.currentData = {}
                        this.dialogVisible = false

                        this.$message({
                            type: 'success',
                            message: '新增成功'
                        })

                        console.log('表单校验通过！')
                 }else {
                    return false
                 }
            })
        },
        updateMenu(){
            // this.$set(this.menuList, this.currentMenuIndex, this.formData)      //方法一   this.$set(要修改的，需要修改地方的下标，需要放进去的值)
            // this.menuList.splice(this.currentMenuIndex,1,this.formData)     //方法二

            if(!this.currentNode.parent) {
                this.$message({
                    type:'error',
                    message:'请勾选父节点'
                })
                return
            }
            if(!this.currentNode.parent.data.children){
                this.$message({
                    type:'error',
                    message:'不能修改父节点'
                })
                return
            }
            let index = this.currentNode.parent.data.children.findIndex(item => {
                return item.id === this.currentNode.data.id
            })

            this.currentNode.parent.data.children.splice(index,1,Object.assign({},this.formData,{label: this.formData.label}))
        },
        deleteMenu(){
            if(!Object.keys(this.currentData).length) {
				this.$message({
					type: 'error',
					message: '请先勾选要删除的节点'
				})
                return
            }
            if(this.currentNode.level === 1) {
				this.$message({
					type: 'error',
					message: '该节点为根节点，不允许被删除'
				})
                return
            }    
            this.$confirm('确定要删除该节点吗').then(() => {
				let index = this.currentNode.parent.data.children.findIndex(item => {
					return item.id === this.currentNode.data.id
				})
	
				this.currentNode.parent.data.children.splice(index, 1)
	
				this.currentNode = {}

				this.$refs.formData.resetFields()
			})
        },
    }
}
</script>

<style lang="scss" scoped>
.container{
    margin: 10px;
    display: flex;
}
.aside{
    border: 1px solid #ddd;
    height: 600px;
    width: 400px;
}
.content{
    border: 1px solid #ddd;
    height: 600px;
    width: 500px;
}
.operate{
    padding: 15px;
    border-bottom: 1px solid #ddd;
}
.menu{
    padding: 5px 10px;
    height: 30px;
    line-height: 30px;
}
.details{
    height: 70px;
    width: 450px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    line-height: 70px;
    text-align: center;
}
.form{
    padding: 20px;
}
</style>