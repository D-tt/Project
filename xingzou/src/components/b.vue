<template>
  <div>
      这是b组件

        <el-button @click="getQueryData">获取数据</el-button>
        <br>
        query数据：{{this.$route.query}}

        <br>
        params数据：{{this.$route.params}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    methods:{
        getQueryData(){
            console.log(this.$route)
        }

    }
}
</script>

<style>

</style>