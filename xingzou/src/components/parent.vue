<template>
  <div>
      <div class="container">
        <div class="header">
            <div class="logo-text">行走书店管理系统</div>
            <div class="user-info">
               <img src="../assets/images/u18.jpg">
                <span>admin</span>
            </div>
        </div>

        <div class="box">
            <div class="aside">
                <div v-for="(item,index) in menuList"
                    :class="{active: $route.path === item.path}"
                    :key="index"
                    @click="toPage(item) ">
                    {{item.name}}
                </div>
            </div>

            <div class="content">
               <router-view />
            </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return {
            menuList:[
                {path: '/user-manage', name: '用户管理'},
                {path: '/menu-manage', name: '菜单管理'},
                {path: '/goods-manage', name: '商品管理'},
                {path: '/home-img-manage', name: '首页轮播图管理'},
                {path: '/goods-classify-manage', name: '商品分类管理'},
                {path: '/customer-manage', name: '客户管理'},
                {path: '/order-manage', name: '订单管理'},
                {path: '/hot-goods-manage', name: '热门位商品管理'},
        //         {path: '/shop-info-manage', name: '门店信息管理'},
        //         {path: '/driver-info-manage', name: '司机信息管理'}
            ]
        }
    },
    methods:{
        toPage(item){  //页面跳转
            if(this.$route.path ===item.path) {
                return
            }
            this.$router.push({
                path: item.path
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
    }
    .user-info{
        height: 60px;
        display: flex;
        align-items: center;
        
        img{
            margin-right: 20px;
        }
    }
    .logo-text{
        color: #409EFF;
        size: 50px;   
    }
    .header{
        width: 100%;
        height: 60px;
        padding: 0 30px;
        display: flex;
        box-sizing: border-box;
        align-items: center;//让垂直居中
        justify-content: space-between;
        height: 60px;
        background: rgb(242,242,242);
    }
    .box{
        flex: 1;
        display: flex;
        width: 100%;
    }
    .aside{
        width: 200px;
        height: 100%;
        margin-right: 20px;
        border-right: 1px solid #ddd;
        background: #fff;

        >div{
            height: 50px;
            line-height: 50px;
            text-align: center;
            cursor: pointer;
        }

        >div:hover{
            background: rgb(236, 245, 255, );
        }

        >div.active{
            background: rgb(236, 245, 255);
            color: #409EFF ;
        }
    }
    .content{
        flex: 1;
    }
</style>