<template>
	<div class="system">
    <div class="catalog">
      <div class="operate">
        <el-button type="primary" @click="openDialog">新增</el-button>
        <el-button type="primary" @click="UpdateMenu">修改</el-button>
        <el-button type="primary" @click="deleteMenu">删除</el-button>
        <el-button type="primary">刷新</el-button>
      </div>
      <div class="menu">
        <ul>
          <li v-for="(item,index) in menuList"
          :class="{active: currentMenuIndex === index}"
          :style="{color: item.isMenu === '0' ? 'red': 'black'}"
          :key="index"
          @click="handlerCurrentMenu(index)">{{item.menuName}}
          </li>
        </ul>
      </div>
    </div>

    <div class="details">
      <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;菜单详情</div>

      <div class="form">
        <el-form ref="formData" :model="formData" label-width="80px" inline>
          <el-row>
            <el-form-item label="菜单名称" prop="menuName">
              <el-input size="medium" v-model="formData.menuName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="菜单路由" prop="menuPath">
              <el-input size="medium" v-model="formData.menuPath" placeholder="请输入菜单路由"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="菜单类型" prop="isMenu">
              <el-select size="medium" v-model="formData.isMenu" clearable placeholder="请选择">
                <el-option label="菜单" value="1"></el-option>
                <el-option label="路由" value="0"></el-option>
              </el-select>
              <!-- <el-input size="medium" v-model="formData.isMenu"></el-input> -->
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="排序" prop="order">
              <el-input size="medium" v-model="formData.order" placeholder="请输入排序"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="备注" prop="remark">
              <el-input size="medium" v-model="formData.remark" placeholder="请输入备注内容"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" width="400px" title="新增">
      <el-form ref="dialogForm" :model="dialogForm" label-width="80px" :rules="dialogFormrules" inline>
        <el-row>
          <el-form-item label="菜单名称" prop="menuName">
            <el-input size="medium" v-model="dialogForm.menuName"  placeholder="请输入菜单名称"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="菜单路由" prop="menuPath">
            <el-input size="medium" v-model="dialogForm.menuPath" placeholder="请输入菜单路由"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="菜单类型" prop="isMenu">
            <el-select size="medium" v-model="dialogForm.isMenu" clearable placeholder="请选择">
              <el-option label="菜单" value="1"></el-option>
              <el-option label="路由" value="0"></el-option>
            </el-select>
            <!-- <el-input size="medium" v-model="dialogForm.isMenu"></el-input> -->
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="排序" prop="order">
            <el-input size="medium" v-model="dialogForm.order" placeholder="请输入排序"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="备注" prop="remark">
            <el-input size="medium" v-model="dialogForm.remark" placeholder="请输入备注内容"></el-input>
          </el-form-item>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="dialogConfirm">确 定</el-button>
			</span>
    </el-dialog>
	</div>
</template>

<script>

export default {
	data () {
    return {
      dialogVisible:false,
      dialogForm:{
        menuName:'',
        menuPath:'',
        isMenu:'',
        order:'',
        remark:'',
      },
      currentMenuIndex: -1,
      menuList:[
        {menuName:'菜单管理',menuPath:'menu',isMenu:'0',order:'1',remark:'备注'},
        {menuName:'工作人员管理',menuPath:'menu',isMenu:'1',order:'2',remark:'备注'},
        {menuName:'客户管理',menuPath:'menu',isMenu:'0',order:'3',remark:'备注'},
        {menuName:'箱子管理',menuPath:'menu',isMenu:'1',order:'4',remark:'备注'},
        {menuName:'订单管理',menuPath:'menu',isMenu:'0',order:'5',remark:'备注'},
        {menuName:'广告管理',menuPath:'menu',isMenu:'0',order:'6',remark:'备注'},
        {menuName:'意见建议',menuPath:'menu',isMenu:'1',order:'7',remark:'备注'},
      ],
      formData:{
        menuName:'',
        menuPath:'',
        isMenu:'',
        order:'',
        remark:'',
      },
      dialogFormrules:{
        menuName: [ { required: true, message: '请输入菜单名称', trigger: 'change' } ],
        menuPath: [ { required: true, message: '请输入菜单路由', trigger: 'change' } ],
        isMenu: [ { required: true, message: '请输入菜单类型', trigger: 'change' } ],
        order: [ { required: true, message: '请输入排序', trigger: 'change' } ],
        remark: [ { required: true, message: '请输入备注', trigger: 'change' } ],
      },
    }
  },
  methods: {
    //新增
    openDialog(){
      this.dialogVisible=true
    },
    // 修改
    UpdateMenu(){
      let newFormData = Object.assign({}, this.formData)
      this.$set(this.menuList, this.currentMenuIndex, newFormData)

      this.$refs.formData.resetFields()

      this.menuList = this.menuList.sort((prev,next) => {
        return Number(prev.order) - Number(next.order)
      })

      console.log(this.menuList)
    },
    // 删除
    deleteMenu(){
      if(this.currentMenuIndex < 0){
        this.$message({
          type:'error',
          message:'请勾选要删除的数据'
        })
        return
      }
      this.$confirm('确定要删除选中的数据吗？').then(()=>{
        this.menuList.splice(this.currentMenuIndex, 1)

        this.$refs.formData.resetFields()

        this.currentMenuIndex = -1
      })

    },
    // 添加 push
    dialogConfirm(){
      this.$refs.dialogForm.validate(valid => {
        if(valid){
          let newDialogForm = Object.assign({},this.dialogForm)

          let index = this.menuList.findIndex(item => {
            return Number(item.order) === Number(newDialogForm.order)
          })

          console.log(index)
          if(index >= 0){
            this.menuList.splice(index,0,newDialogForm)
          }else {
            this.menuList.push(newDialogForm)
          }

          this.menuList = this.menuList.sort((prev,next) => {
            return Number(prev.order) - Number(next.order)
          })

          console.log(this.menuList)
          this.$refs.dialogForm.resetFields()

          this.dialogVisible = false

          console.log('表单校验通过')
        }else {
          return false
        }
      })
    },
    cancel(){
      this.$refs.dialogForm.resetFields()

      this.dialogVisible=false
    },
    handlerCurrentMenu(index){
      this.currentMenuIndex = index

      this.formData = Object.assign({},this.menuList[index])           //让表单的值为选中的li(menuList)的值
    },
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.system{
  width: 900px;
  height: 650px;
  display: flex;
}
.catalog{
  width: 380px;
  border-right: 1px solid #ddd;
}
.operate{
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.menu{
  padding: 5px 10px;
  line-height: 30px;
}
.menu ul li{
  list-style-type: none;
  cursor: pointer;
}
.menu ul li:hover{
  color: #409EFF;
  background: rgb(236, 245, 255)
}
.menu ul li.active{        //这个是设置选中li的时候的样式
  color: #409EFF  !important;
  background-color: rgb(236, 245, 255)
}
.text{
height: 60px;
line-height: 60px;
font-size: 24px;
width: 520px;
border-bottom: 1px solid #ddd;
}
.form{
  padding: 30px;
}
</style>