<template>
  <div class="container">
      <div class="form-box">
          <div class="form-title">请登录</div>
          <el-form ref="form" :model="formData" :rules="formRules">
              <el-form-item prop="userName">
                  <el-input v-model="formData.userName" placeholder="请输入账号"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                  <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>

              <el-form-item>
                  <el-button @click="login" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>


user-manage---用户管理
menu-manage---菜单管理
goods-manage---商品管理
home-img-manage---首页轮播图管理
goods-classify-manage---商品分类管理
customer-manage---客户管理
order-manage---订单管理
hot-goods-manage---热门位商品管理
shop-info-manage---门店信息管理
driver-info-manage---司机信息管理
<script>
export default {
    data(){
        return{
            formData:{
                userName:'',
                password:''
            },
            formRules:{
                userName: [
                    {required: true, message: '请输入账号', trigger: 'change'}
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } //trigger: 'blur' ,失去焦点触发校验
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                ],
            },
        }
    },
    
    methods:{
        login(){
            this.$refs.form.validate(valid => {
                if(valid){
                    this.$router.push({
                        path:'/parent'           //登录之后跳转到parent页面
                    })
                }else{
                    return false
                }
            })
        }
    }
}
</script>

<style scoped>
    /deep/ .el-form-item__content{
        text-align: center;
    }
    .form-title{
        text-align: center;
        color: #ddd;
        font-size: 16px;
        font-weight: bold;
        margin-top: 50px;
        margin-bottom: 30px;
    }
    .form-box{
        position: absolute;
        width: 300px;
        height: 300px;
        top:50%;
        right: 50px;
        transform: translate(0,-50%);
        background: rgba(225, 225, 225,0.2);
        padding: 0 30px;
        box-sizing: border-box;
    }
    .container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url(../assets/images/u0.jpg);
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    
   
    
</style>