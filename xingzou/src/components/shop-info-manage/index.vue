<template>
  <div>
      {{$store.state.count}}
        <input v-model="inpValue" type="text">
        <button @click="handlerArr">push</button>
      <ul>
          <li v-for="(item,index) in arr " :key="index"> 
              {{item}}
              <button @click="deleteItem(index) ">delete</button>
          </li>
      </ul>
      <ul class="page-info">
          <li v-for="(item,index) in Math.ceil(AllArr.length/this.pageSize)" 
          :key="index" 
          @click="handlerPageIndex(item)"
          :class="{active:pageIndex === item}">
            {{item}}
          </li>
      </ul>
      {{'pageSize:'+ pageSize}}
      <button @click="handlerPageSize">点击一次 每页条数+1</button>
      <br>
      {{'arr.length:'+arr.length}}
      <br>
      {{'arr元素:'+arr}}
      <br>
      {{'AllArr元素:'+AllArr}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            inpValue:'',
            // arr:[],
            AllArr:[],
            activeVisible:false,
            pageIndex:1,
            pageSize:3,
        }
    },
    computed:{
        arr(){
            // 三个变量 =>   this.AllArr    this.pageIndex       this.pageSize
            //所有已定义的变量变动  都会重新触发计算属性的计算
            return this.AllArr.slice((this.pageIndex-1)*this.pageSize,this.pageIndex * this.pageSize)
        }
    },
    methods:{
        changeStore(){
            this.$store.commit('increment')
        },
        //添加
        handlerArr(){
            //将input框的值push到arr里
            this.AllArr.push(this.inpValue)    
            //清空input里的值
            this.inpValue=''               
        },
        //删除
        deleteItem(index){
            this.AllArr.splice(index,1)
        },
        //改变class样式
        changeActive(){
            this.activeVisible=!this.activeVisible
        },
        handlerPageIndex(currentIndex){
            this.pageIndex = currentIndex

            // console.log(pageIndex)    
        },
        //改变每页条数  pageSize
        handlerPageSize(){
            this.pageSize = this.pageSize+1
        },
    }
        
}
</script>

<style lang="scss" scoped>
.active{
    color: darkred;
    font-size: 20px;
}
.page-info{
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li{
        width: 40px;
        height: 40px;
        background: #ddd;
        text-align: center;
        line-height: 40px;
        margin: 0 5px;
    }

    li.active{
        color: #fff;
        background: darkred;
    }
}
</style>