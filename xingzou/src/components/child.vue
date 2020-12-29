<template>
  <div>
      {{parentValue}}

      <el-button @click="getParentValue">this is child component</el-button>
  </div>
</template>

<script>
export default {
    props:{
        parentValue:{
            type:String
        }
    },
    data(){
        return {
            childValue:'this is child value'
        }
    },
    methods:{
        childFunc(){
            console.log(this.childValue+'1234')
        },
        getParentValue(){                               //子组件拿父组件的东西
            console.log(this.$parent.str)
            this.$parent.add()              
        }
    }
}
</script>

<style>

</style>