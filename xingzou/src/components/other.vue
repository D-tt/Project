<template>
  <div>
      <el-table :data="tableData" border @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
          <el-table-column align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="age" label="年龄"></el-table-column>
          <el-table-column align="center" prop="height" label="身高"></el-table-column>
          <el-table-column align="center" prop="weight" label="体重"></el-table-column>
          <el-table-column align="center" prop="sex" label="性别"></el-table-column>
      </el-table>

    <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageInfo.pageSize" 
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
    </el-pagination>

    <el-button @click="openDialog">打开代码框</el-button>

    <el-dialog :visible.sync="dialogVisible"
        width="80%"
        title="这是我的dialog框" >

        <el-row>
            <el-col :span="6">123</el-col>
            <el-col :span="6" :offset="12">123</el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>

    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,
            pageInfo:{
                pageIndex:1,
                pageSize:5,
                total:15
            },
            tableData:[
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
                {name:'tom1',age:'10',height:'170',weight:'100',sex:'男'},
            ]
        }
    },
    methods:{
        openDialog(){
            this.dialogVisible=true
        },
        getRows(rows){
            console.log(rows)
        },
        handleSizeChange(val){
            console.log('每页' +val+'条数据')
        },
        handleCurrentChange(val){
            console.log('当前是第' +val+'页')
        }
    }
}
</script>

<style>

</style>