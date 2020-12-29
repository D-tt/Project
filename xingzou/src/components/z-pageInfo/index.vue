<template>
  <div>
      <el-input v-model="addValue" @keydown.native.enter="add"></el-input>
      <el-button @click="add">添加</el-button>
      <el-input v-model="searchValue"></el-input>
      <el-button @click="search">查询</el-button>

      <ul>
          <li v-for="(item,index) in list" :key="index">{{item}} 
            <el-button @click="deleteItem(index)">删除</el-button>
          </li>
      </ul>

        <!-- 每页3条   总数7条 -->
      <ul class="pageInfo">
          <li v-for="(item,index) in pageCount" :class="{active: pageIndex=== Number(item) }" :key="index" @click="changePageIndex(item) ">{{item}} </li>
      </ul>

      allList: {{allList}}
      <br>
      pageCount:{{pageCount}}
      当前是第几页：{{pageIndex}}
  </div>
</template>

<script>
export default {
    data(){
        return {
            addValue:'',
            searchValue:'',
            allList:[],
            pageIndex:'1'
        }
    },
    methods:{
        add(){
            this.allList.push(this.addValue)

            this.addValue=''      //清空输入框里的值
        },
        search(){

        },
        deleteItem(index){
            this.allList.splice(index,1)     //splice(index,length,[item])它也可以用来替换/删除/添加数组内某一个或者几个值     length: 替换/删除的长度 
        },
        changePageIndex(item){
            this.pageIndex=Number(item)
        }
        //已知每页3条数据，当前是第一页 (pageIndex =1)
        // 0-3 (含头不含尾) (this.pageIndex -1) *3 ,this.pageIndex *3
        // 3-6 (含头不含尾)  (this.pageIndex -1) *3 ,this.pageIndex *3
        // 6-9 (含头不含尾)  (this.pageIndex -1) *3 ,this.pageIndex *3
        // 9-12 (含头不含尾)  (this.pageIndex -1) *3 ,this.pageIndex *3
    },
    computed:{
        list(){
            return this.allList.filter(item => {
                return item.includes(this.searchValue)
            }).slice((this.pageIndex -1) * 3, this.pageIndex * 3)     
            // slice()接受一个或两个参数，即要返回项的起始和结束位置。当只给slice()传递一个参数时，该方法返回从该参数指定位置开始到当前数组末尾的所有项。            
        },

        // pageCount 是分页的个数
        pageCount(){
            return Math.ceil(this.allList.length / 3)    //Math.ceil()    上取整
        }
    }
}
</script>

<style lang="scss" scoped>
.pageInfo {
    display: flex;
    list-style: none;

    li{
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        background: #ddd;
        margin: 0 5px;
    }

    li.active {
        background: red;
        color: #fff;
    }
}
</style>