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
                    <ul>
                        <li 
                        :class="{active: currentMenuIndex === index}" 
                        :style="{color: item.isMenu === '0' ? 'red' : 'black'}"                        v-for="(item,index) in menuList" 
                        @click="handlerCurrentMenu(index)" 
                        :key="index">

                        {{item.menuName}}</li>    <!--  :style="{color: item.isMenu === '0' ? 'red' : 'black'}"   当是目录的时候，字体是红色-->
                    </ul>
                </div>
            </div>
            <div class="content">
                <div class="details">菜单详情</div>
                <div class="form">
                    <el-row>
                        <el-form ref="formData" :model="formData" label-width="80px">
                            <el-col :span="12">
                                <el-form-item label="菜单名称" prop="menuName">
                                    <el-input v-model="formData.menuName" placeholder="请输入菜单名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="菜单路由" prop="menuPath">
                                    <el-input v-model="formData.menuPath" placeholder="请输入菜单路由"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="是否菜单" prop="isMenu">
                                    <el-select v-model="formData.isMenu" clearable>
                                        <el-option label="菜单" value="1"></el-option>
                                        <el-option label="目录" value="0"></el-option>
                                    </el-select>
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
        <el-dialog :visible.sync="dialogVisible" width="50%" title="新增菜单">
                <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
                    <el-col :span="24">
                        <el-form-item label="名称" prop="menuName">
                            <el-input v-model="dialogForm.menuName" placeholder="请输入菜单或路由名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="是否菜单" prop="isMenu">
                            <el-select v-model="dialogForm.isMenu">
                                <el-option label="菜单" value="1"></el-option>
                                <el-option label="目录" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>   
                    <el-col :span="24">
                        <el-form-item label="路径" prop="menuPath">
                            <el-input v-model="dialogForm.menuPath" placeholder="请输入菜单路径"></el-input>
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
        <!-- {{menuList}} &nbsp;当前下标：{{currentMenuIndex}} -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,
            formData:{
                menuName:'',
                menuPath:'',
                isMenu:'',
                remark:'',
            },
            dialogForm:{
                menuName:'',
                menuPath:'',
                isMenu:'',
                remark:'',
            },
            currentMenuIndex: -1,
            menuList:[
                {menuName:'用户管理',menuPath:'/path',isMenu:'1',remark:'备注1'},
                {menuName:'菜单管理',menuPath:'/path',isMenu:'1',remark:'备注2'},
                {menuName:'商品管理',menuPath:'/path',isMenu:'0',remark:'备注3'},
                {menuName:'轮播图管理',menuPath:'/path',isMenu:'1',remark:'备注4'},
                {menuName:'分类管理',menuPath:'/path',isMenu:'0',remark:'备注5'},
                {menuName:'客户管理',menuPath:'/path',isMenu:'1',remark:'备注6'},
                {menuName:'订单管理',menuPath:'/path',isMenu:'1',remark:'备注7'},
            ],
            dialogFormrules:{
                menuName: [ { required: true, message: '请输入菜单名称', trigger: 'change' } ],
                isMenu: [ { required: true, message: '请选择是否菜单', trigger: 'change' } ],
            },
        }
    },
    methods:{
        openDialog(){
            this.dialogVisible=true
        },
        cancel(){
            this.$refs.dialogForm.resetFields()

            this.dialogVisible=false
        },
        dialogConfirm(){
            this.$refs.dialogForm.validate(valid => {
                if(valid){
                    let newDialogForm=Object.assign({},this.dialogForm)
                    this.menuList.push(newDialogForm)

                    this.$refs.dialogForm.resetFields()

                    this.dialogVisible=false

                    console.log('表单校验通过！')
                }else {
                    return false
                }
            })
        },
        updateMenu(){
            let newFormData = Object.assign({},this.formData)
            this.$set(this.menuList, this.currentMenuIndex, newFormData)      //方法一   this.$set(要修改的，需要修改地方的下标，需要放进去的值)

            this.$refs.formData.resetFields()
            // this.menuList.splice(this.currentMenuIndex,1,this.formData)     //方法二

            console.log(this.menuList)
        },
        deleteMenu(){
            if(this.currentMenuIndex < 0){
                this.$message({
                    type:'error',
                    message:'请选择需要删除的菜单/目录!'
                })
                return
            }    
            this.$confirm('是否要删除当前选中的菜单/目录').then(() => {
                this.menuList.splice(this.currentMenuIndex, 1)

                this.$refs.formData.resetFields()

                this.currentMenuIndex = -1
            })
        },
        handlerCurrentMenu (index) {
            this.currentMenuIndex = index

            this.formData = Object.assign({},this.menuList[index])      //让表单的值为选中的li(menuList)的值
        }
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
.menu ul li{
    list-style: none;
    cursor: pointer;
}
.menu ul li:hover{
    color: #409EFF;
    background: rgb(236, 245, 255)
}
.menu ul li.active{        //这个是设置选中li的时候的样式
    color: #409EFF  !important;
    background: rgb(236, 245, 255)
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