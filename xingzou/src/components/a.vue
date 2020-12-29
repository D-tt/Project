<template>
  <div>
      这是a组件

      <el-button @click="toBcom">跳到B组件-query</el-button>
      <el-button @click="toBcomName">跳到B组件-name</el-button>

      <router-link to='/b'>跳到B组件</router-link>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        toBcom(){
            // path + query
            this.$router.push({
                path:'/b',
                query:{name:'tom',age:10}
            })
        },
        toBcomName(){
            this.$router.push({
                name:'b',
                params:{name:'tom',age:10}
            })
        }
    }
}
</script>

<style>

</style>