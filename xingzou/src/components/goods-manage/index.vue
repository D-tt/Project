<template>
    <div>
        <div class="header">
            <el-row>
                <el-form ref="searchForm" label-width="80px" :model="formData" inline>
                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input v-model="formData.goodsName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商品状态" prop="goodsStatus">
                            <el-select v-model="formData.goodsStatus" clearable>
                                <el-option v-for="(item, index) in goodsStatusOptions" 
                                    :key="index" 
                                    :label="item.label" 
                                    :value="item.value">
                                </el-option>
                                <!-- <el-option label="在售" value="0"></el-option>
                                <el-option label="已下架" value="1"></el-option>
                                <el-option label="未发布" value="2"></el-option> -->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="广告词" prop="message">
                            <el-input v-model="formData.message" placeholder="请输入广告词"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出版社" prop="press">
                            <el-input v-model="formData.press" placeholder="请输入出版社"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作者" prop="author">
                            <el-input v-model="formData.author" placeholder="请输入作者"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary" @click="fetch">查询</el-button>
                        <el-button type="primary" @click="reset">重置</el-button>
                    </el-col>
                </el-form>
            </el-row>

            <el-button type="primary" @click="openDialog">新增</el-button>
            <el-button type="primary" @click="openUpdateDialog">修改</el-button>
            <el-button type="primary" @click="deleteRows">删除</el-button>
            <el-button type="primary" @click="shelvesRows">上架</el-button>
            <el-button type="primary" @click="theShelvesRows">下架</el-button>
        </div>

        <el-table :data="tableData" border height="300" @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 -->
            <el-table-column fixed align="center" type="selection"></el-table-column>       <!--  stripe="true"设置表格斑马纹 -->
            <el-table-column align="center" prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column align="center" prop="costPrice" label="定价"></el-table-column>
            <el-table-column align="center" prop="price" label="售价"></el-table-column>
            <el-table-column align="center" prop="sales" label="销售量"></el-table-column>
            <el-table-column align="center" label="一级分类" prop="oneClassify">
                <template slot-scope="scope">
                    <span>{{getOneClassifyLabel(scope.row.oneClassify)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="二级分类" prop="twoClassify">
                <template slot-scope="scope">
                    <span>{{getTwoClassifyLabel(scope.row)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="message" label="广告词"></el-table-column>
            <el-table-column align="center" prop="goodsIntroduce" label="商品介绍"></el-table-column>
            <el-table-column align="center" prop="goodsStatus" label="商品状态">
                <template slot-scope="scope">
                    <span>{{getGoodsStatusLabel(scope.row.goodsStatus)}} </span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="Upload" label="上架时间"></el-table-column>
            <el-table-column align="center" prop="views" label="浏览量"></el-table-column>
            <el-table-column align="center" prop="coding" label="商家编码"></el-table-column>
            <el-table-column align="center" prop="name" label="商家名称">
                <template slot-scope="scope">
                    <span>{{getNameLabel(scope.row.name)}} </span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="stock" label="库存"></el-table-column>
            <el-table-column fixed align="center" prop="isbn" label="isbn书号"></el-table-column>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInfo.pageSize" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>

        <el-dialog :visible.sync="dialogVisible" width="60%" title="新增">
            <el-row>
                <el-form ref="dialogForm" :model="dialogForm" label-width="100px" :rules="dialogFormrules" inline>
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="dialogForm.goodsName" placeholder="请输入商品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="书号" prop="isbn">
                        <el-input v-model="dialogForm.isbn" placeholder="请输入书号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="一级分类" prop="oneClassify">
                        <el-select v-model="dialogForm.oneClassify" clearable>
                            <el-option v-for="(item, index) in oneClassifyOptions" 
                                :key="index" 
                                :label="item.label" 
                                :value="item.value">
                            </el-option>
                            <!-- <el-option label="传记" value="0"></el-option>
                            <el-option label="历史" value="1"></el-option>
                            <el-option label="教育" value="2"></el-option>
                            <el-option label="文学" value="3"></el-option> -->
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="二级分类" prop="twoClassify">
                        <el-select v-model="dialogForm.twoClassify" clearable>
                            <el-option v-for="(item,index) in twoClassifyOptions"
                                :key="index"
                                :label="item.classifyName"
                                :value="item.classifyValue">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="广告词" prop="message">
                        <el-input v-model="dialogForm.message" placeholder="请输入广告词"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品介绍" prop="goodsIntroduce">
                        <el-input v-model="dialogForm.goodsIntroduce" placeholder="请输入商品介绍"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商家名称" prop="name">
                            <el-select v-model="dialogForm.name">
                                <el-option label="当当网" value="0"></el-option>
                                <el-option label="新华书店" value="1"></el-option>
                                <el-option label="先锋书店" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存" prop="stock">
                        <el-input v-model="dialogForm.stock" placeholder="请输入库存"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="成本价" prop="costPrice">
                        <el-input v-model="dialogForm.costPrice" placeholder="请输入成本价"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="在售价" prop="price">
                        <el-input v-model="dialogForm.price" placeholder="请输入售价"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
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
                total:0
            },
            formData: {
                goodsName: '',
                goodsStatus: '',
                message: '',
                press: '',
                author: '',
            },
            goodsStatusOptions:[
                {label:'在售',value:'0'},
                {label:'已下架',value:'1'},
                {label:'未发布',value:'2'},
            ],
            dialogForm: {
                goodsName: '',
                isbn: '',
                oneClassify: '',
                twoClassify: '',
                message: '',
                goodsIntroduce: '',
                name: '',
                stock: '',
                costPrice: '',
                price: ''
            },
            dialogFormrules:{
                goodsName: [ { required: true, message: '请输入商品名称', trigger: 'change' } ],
                isbn: [ { required: true, message: '请输入书号', trigger: 'change' } ],
                oneClassify: [ { required: true, message: '请选择一级分类', trigger: 'change' } ],
                name: [ { required: true, message: '请选择商家名称', trigger: 'change' } ],
                stock: [ { required: true, message: '请输入库存', trigger: 'change' } ],
                costPrice: [ { required: true, message: '请输入成本价', trigger: 'change' } ],
                price: [ { required: true, message: '请输入售价', trigger: 'change' } ],
            },
            allTwoClassifyOptions: [
                {classifyName: '红楼梦', classifyValue: '0', oneClassify: '0'},
                {classifyName: '西游记', classifyValue: '1', oneClassify: '0'},
                {classifyName: '三国演义', classifyValue: '2', oneClassify: '0'},
                {classifyName: '水浒传', classifyValue: '3', oneClassify: '0'},
                {classifyName: '论语', classifyValue: '4', oneClassify: '1'},
                {classifyName: '大学', classifyValue: '5', oneClassify: '1'},
                {classifyName: '中庸', classifyValue: '6', oneClassify: '1'},
                {classifyName: '孟子', classifyValue: '7', oneClassify: '1'},
                {classifyName: '安徒生童话', classifyValue: '8', oneClassify: '2'},
                {classifyName: '唐诗三百首', classifyValue: '9', oneClassify: '2'},
                {classifyName: '哈姆雷特', classifyValue: '10', oneClassify: '3'},
                {classifyName: '百年独孤', classifyValue: '11', oneClassify: '4'}
            ],
            oneClassifyOptions: [
                {label: '传记', value: '0'},
                {label: '历史', value: '1'},
                {label: '教育', value: '2'},
                {label: '文学', value: '3'}
            ],
            nameOptions:[
                {label:'当当网',value:'0'},
                {label:'新华书店',value:'1'},
                {label:'先锋书店',value:'2'},
            ],
            tableData:[
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
                // {goodsName:'漫长的告别',setPrice:'22',price:'13',sales:'10',firstClass:'传记',secondClass:'名人传记',message:'12.9-12.12图书嗨购!',goodsIntroduce:'怪不得读了12遍',goodsStatus:'在售',Upload:'2020-02-05 15:00:00',views:'1531',coding:'9e5e8a130fe',name:'当当网',stock:'1000',isbn:'9787521205084',},
            ],
            allTableData: [],
            currentRows: [],
            dialogType: ''
        }
    },
    computed: {
        twoClassifyOptions () { 
            this.dialogForm.twoClassify = ''

            return this.allTwoClassifyOptions.filter(item => {
                return item.oneClassify === this.dialogForm.oneClassify
            })
        }
    },
    methods: {
        fetch () {
            this.pageInfo.pageIndex = 1

            this.search()
        },
        //搜索
        search () {
            this.pageInfo.total = this.allTableData.filter(item => {
                return item.goodsName.includes(this.formData.goodsName) && item.goodsStatus.includes(this.formData.goodsStatus) && item.message.includes(this.formData.message) && item.name.includes(this.formData.press)
            }).length

                // this.pageInfo.total = this.tableData.length
                
            this.tableData = this.allTableData.filter(item => {
                return item.goodsName.includes(this.formData.goodsName) && item.goodsStatus.includes(this.formData.goodsStatus) && item.message.includes(this.formData.message) && item.name.includes(this.formData.press)
            }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

        },
        //重置
        reset () {
            this.$refs.searchForm.resetFields()

            this.fetch()
        },
        //上架
        shelvesRows () {
            if (this.currentRows.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请勾选需要上架的数据'
                })
                return
            }
            let indexList = this.currentRows.map(item => {
                return item.id
            })
            indexList.forEach(indexItem => {
                let currentIndex = this.allTableData.findIndex(item => {
                    return item.id === indexItem
                })

                let newFormData = Object.assign({}, this.allTableData[currentIndex], {
                    goodsStatus: '0'
                })

                this.allTableData.splice(currentIndex, 1, newFormData)
            })
            console.log(this.allTableData)   

            this.search()
        },
        //下架
        theShelvesRows () {
            if (this.currentRows.length === 0) {
                this.$message({
                    type: 'error',
                    message: '请勾选需要下架的数据'
                })
                return
            }

            let indexList = this.currentRows.map(item => {
                return item.id
            })

            indexList.forEach(indexItem => {
                let currentIndex = this.allTableData.findIndex(item => {
                    return item.id === indexItem
                })

                let newFormData = Object.assign({}, this.allTableData[currentIndex], {
                    goodsStatus: '1'
                })

                this.allTableData.splice(currentIndex, 1, newFormData)
            })
  
            this.search()
        },
        getOneClassifyLabel (value) {
            let currentObj = this.oneClassifyOptions.filter(item => {
                return value === item.value
            })[0]

            return currentObj.label
        },
        getTwoClassifyLabel (row) {
            let twoOptions = this.allTwoClassifyOptions.filter(item => {
                return item.oneClassify === row.oneClassify
            })

            let currentObj = twoOptions.filter(item => {
                return row.twoClassify === item.classifyValue
            })[0]

            return currentObj.classifyName
        },
        getGoodsStatusLabel (value) {
            let currentObj = this.goodsStatusOptions.filter(item => {
                return value === item.value
            })[0]

            return currentObj.label
        },
        getNameLabel(value){
            let currentObj = this.nameOptions.filter(item => {
                return value === item.value
            })[0]

            return currentObj.label
        },
        //新增
        openDialog () {
            this.dialogVisible = true
            this.dialogType = 'add'
        },
        //修改
        openUpdateDialog () {
            if (!this.currentRows.length) {
                this.$message({
                    type: 'error',
                    message: '请勾选需要修改的数据'
                })
                return
            }
            if ( this.currentRows.length > 1) {
                this.$message({
                    type: 'error',
                    message: '只能勾选一条数据'
                })
                return
            } 
// 异步
// 执行队列

            this.dialogVisible = true
            this.dialogType = 'set'
            this.dialogForm = Object.assign({}, this.currentRows[0])

            this.$nextTick(() => {   //{放入需要延迟执行的代码}
                this.dialogForm.twoClassify = this.currentRows[0].twoClassify      
            })

            // 伪异步事件
            // setTimeout(() => {
            //   this.dialogForm.twoClassify = this.currentRows[0].twoClassify
            // })
        },
        //删除
        deleteRows () {
            if (!this.currentRows.length) {
                this.$message({
                    type: 'error',
                    message: '请勾选需要删除的数据'
                })
                return
            }
            this.$confirm('确定要删除选中数据吗？').then(() => {
                let indexList = this.currentRows.map(item => {
                    return item.id
                })
        
                indexList.forEach(indexItem => {
                    console.log(indexItem)
                        let currentIndex = this.allTableData.findIndex(item => {
                            return item.id === indexItem
                        })
            
                    console.log('currentIndex', currentIndex)
                    this.allTableData.splice(currentIndex, 1)
                })

                this.search()
            })
                // console.log('currentIndex', currentIndex)
                // console.log(indexList)
        },
        getRows (rows) {
            // console.log('rows', rows)
            this.currentRows = rows
        },
        //dialogForm中的取消按钮
        cancel(){
            this.$refs.dialogForm.resetFields()

            this.dialogVisible=false
        },
        //dialogForm中的确定
        dialogConfirm () {
            if (this.dialogType === 'add') {
                this.$refs.dialogForm.validate(valid => {
                    if(valid){
                        let newDialogForm = Object.assign({}, this.dialogForm, {
                        id: new Date().getTime(),
                        coding:  new Date().getTime().toString(),
                        sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100), //售价
                        message: '精短的广告词',
                        goodsIntroduce: '这是一段精简的商品介绍',
                        Upload: '2019-11-06',                                       // 上架时间
                        views: Math.floor(Math.random() * (4000 - 700 + 1) + 700),  // 浏览量
                        goodsStatus: '2',                                             //  商品状态
                        stock: Math.floor(Math.random() * (1000 - 100 + 1) + 100),    // 库存
                        })
                        // 源数据
                        this.allTableData.push(newDialogForm)
                
                        this.search()
                
                        this.$refs.dialogForm.resetFields()
                
                        this.dialogVisible = false
                    }else {
                        return false
                    }
                })
            }else if (this.dialogType === 'set') {
                this.$refs.dialogForm.validate(valid => {
                    if(valid){
                        let index = this.allTableData.findIndex(item => {
                        return item.id === this.dialogForm.id
                        })

                        let newFormData = Object.assign({}, this.dialogForm)

                        this.allTableData.splice(index, 1, newFormData)

                        this.$refs.dialogForm.resetFields()

                        this.dialogVisible = false

                        this.search()
                        console.log(index)
                    }else{
                        return false
                    }
                })
            }
        },
        handleSizeChange (val) {
            console.log(val)
            this.pageInfo.pageSize = val
            this.search()
        },
        handleCurrentChange (val) {
            this.pageInfo.pageIndex = val
            this.search()
        }
    }
}
</script>

<style lang="scss" scoped>
.header{
    margin: 20px;
}
</style>