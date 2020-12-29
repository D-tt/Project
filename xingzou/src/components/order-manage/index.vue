<template>
  <div>
      <el-form ref="form" :model="formData" label-width="70px" class="order-container" inline>
        <el-row>
            <el-col :span="6">
                <el-form-item label="下单人" prop="orderUser">
                    <el-input v-model="formData.orderUser" placeholder="请输入下单人姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="订单编码" prop="orderCode">
                    <el-input v-model="formData.orderCode" placeholder="请输入订单编码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="付款时间" prop="sinceValidity">
                    <el-date-picker 
                        v-model="formData.sinceValidity"
                        type="date"
                        placeholder="年/月/日">
                    </el-date-picker>—
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item prop="periodValidity">
                    <el-date-picker 
                        v-model="formData.periodValidity"
                        type="date"
                        placeholder="年/月/日">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入下单人手机号"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="订单状态" prop="orderState">
                    <el-select v-model="formData.orderState"  clearable>
                        <el-option
                            v-for="(item, index) in orderStateOptions"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item>
                    <el-button type="primary" @click="fetch">查询</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>

        <div class="operate">
			<!-- <el-button type="primary" >详情</el-button> -->
			<el-button type="primary" @click="handlerOrderState('1')">订单取消</el-button>
			<el-button type="primary" @click="handlerOrderState('2')">订单到货</el-button>
			<el-button type="primary" @click="handlerOrderState('3')">取消到货</el-button>
			<el-button type="primary" @click="handlerOrderState('4')">订单已取货</el-button>
			<el-button type="primary" @click="handlerOrderState('5')">取消已取货</el-button>
			<!-- <el-button type="primary" >导出</el-button> -->
		</div>

        <el-table :data="tableData" border @selection-change="getRows">    <!-- border="true" 设置表格的垂直方向的边框 --> <!--  stripe="true"设置表格斑马纹 -->
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" prop="orderCode" label="订单编码"></el-table-column>
            <el-table-column align="center" prop="orderPrice" label="订单总价"></el-table-column>
            <el-table-column align="center" prop="orderState" label="订单状态">
                <template slot-scope="scope">
                    <span>{{getOrderState(scope.row.orderState)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="payState" label="支付状态"></el-table-column>
            <el-table-column align="center" prop="storeCode" label="门店编码"></el-table-column>
            <el-table-column align="center" prop="orderUser" label="下单人姓名"></el-table-column>
            <el-table-column align="center" prop="phone" label="下单人手机号"></el-table-column>
            <el-table-column align="center" prop="sinceValidity" label="确认付款时间"></el-table-column>
        </el-table>

        <el-pagination class="pages"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageIndex"     
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageInfo.pageSize" 
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total">
        </el-pagination>

        <!-- current-page     当前页面 -->
        <!-- page-sizes     每页多少条 -->
        <!-- pageInfo     页面信息 -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            pageInfo:{
                pageIndex:1,
                pageSize:5,
                total:0
            },
            formData:{
                orderUser:'',
                orderCode:'',
                phone:'',
                orderState:'',
                sinceValidity:'',
                periodValidity:'',
            },
            orderStateOptions:[
                {label: '全部', value: '0'},
                {label: '订单取消', value: '1'},
                {label: '订单到货', value: '2'},
                {label: '取消到货', value: '3'},
                {label: '订单已取货', value: '4'},
                {label: '取消已取货', value: '5'},
            ],
            tableData:[],
            currentRows:[],
            allTableData:[
                {orderCode:'20191129',orderPrice:'200',orderState:'1',payState:'已支付',storeCode:'18952216028',orderUser:'张三',phone:'13814438805',sinceValidity:'2019-02-14'},
                {orderCode:'20191130',orderPrice:'100',orderState:'2',payState:'已支付',storeCode:'18952216028',orderUser:'李四',phone:'13814438805',sinceValidity:'2020-04-17'},
                {orderCode:'20191201',orderPrice:'263',orderState:'3',payState:'已支付',storeCode:'18952216028',orderUser:'王五',phone:'13814438805',sinceValidity:'2019-10-10'},
                {orderCode:'20191204',orderPrice:'86',orderState:'4',payState:'已支付',storeCode:'18952216028',orderUser:'赵六',phone:'13814438805',sinceValidity:'2019-02-10'},
                {orderCode:'20191210',orderPrice:'354',orderState:'5',payState:'已支付',storeCode:'18952216028',orderUser:'谭七',phone:'13814438805',sinceValidity:'2020-11-01'},
                {orderCode:'20201224',orderPrice:'354',orderState:'5',payState:'已支付',storeCode:'18952216028',orderUser:'谭七',phone:'13814438805',sinceValidity:'2020-11-01'},
            ]
        }
    },
    mounted (){     //生命周期函数
        this.fetch()
    },
    methods:{
        fetch(){
            this.pageInfo.pageIndex=1
            this.search()
        },
        search(){
            this.pageInfo.total=this.allTableData.filter(item => {
                return item.orderUser.includes(this.formData.orderUser) && item.orderCode.includes(this.formData.orderCode) && item.sinceValidity.includes(this.formData.sinceValidity) && item.phone.includes(this.formData.phone) && item.orderState.includes(this.formData.orderState)
            }).length

            // this.pageInfo.total = this.tableData.length   

             this.tableData=this.allTableData.filter(item => {
                return item.orderUser.includes(this.formData.orderUser) && item.orderCode.includes(this.formData.orderCode) && item.sinceValidity.includes(this.formData.sinceValidity) && item.phone.includes(this.formData.phone) && item.orderState.includes(this.formData.orderState)
            }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)
            
			},
        reset(){
            this.$refs.form.resetFields()

            this.fetch()
        },
        getOrderState(value){
            return this.orderStateOptions.filter(item => {
                return item.value===value
            })[0].label
        },
        handlerOrderState(value){
            if(! this.currentRows.length){
                this.$message({
                    type:'error',
                    message:'请勾选需要操作的数据！'
                })
                return
            }

            this.currentRows.forEach(item => {
                let index =this.allTableData.findIndex(allTableItem => {
                    return allTableItem.orderCode === item.orderCode
                })

                this.allTableData[index]=Object.assign({},this.allTableData[index],{
                    orderState: value
                })
            })

            this.search()
        },
        getRows(rows){
            console.log(rows)   
            this.currentRows=rows
        },
        handleSizeChange(val){
            // console.log('每页' +val+'条数据')
            console.log(val)
            this.pageInfo.pageSize=val    //

            this.search()     //
        },
        handleCurrentChange(val){
            // console.log('当前是第' +val+'页')
            console.log('这是当前的pageINDEX', val)
            this.pageInfo.pageIndex = val
            this.search()
        },
    }
}
</script>

<style lang="scss" scoped>
.order-container{
		padding-top: 20px;
}
.operate{
    margin-left: 24px;
    margin-bottom: 20px;
}
.pages{
  margin-top: 20px;
  margin-left: 20px;
}
</style>