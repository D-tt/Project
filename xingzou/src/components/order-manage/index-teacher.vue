<template>
	<div class="user-container">
      <el-form ref="searchForm" label-width="100px" :model="formData" inline>
				<el-form-item label="下单人" prop="orderUser">
					<el-input v-model="formData.orderUser"></el-input>
				</el-form-item>
				<el-form-item label="订单编码" prop="orderCode">
					<el-input v-model="formData.orderCode"></el-input>
				</el-form-item>
				<el-form-item label="付款开始时间" prop="orderStartTime">
					<el-date-picker
						type="date"
						v-model="formData.orderStartTime">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="付款结束时间" prop="orderEndTime">
					<el-date-picker
						type="date"
						v-model="formData.orderEndTime">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="formData.phone"></el-input>
				</el-form-item>
				<el-form-item label="订单状态" prop="orderStatus">
					<el-select v-model="formData.orderStatus">
						<el-option
							v-for="(item, index) in orderStatusList"
							:key="index"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-button type="primary" @click="fetch">搜索</el-button>
				<el-button type="primary" @click="reset">重置</el-button>
		</el-form>

		<el-button type="primary" @click="handlerOrderStatus('1')">订单取消</el-button>
		<el-button type="primary" @click="handlerOrderStatus('2')">订单到货</el-button>
		<el-button type="primary" @click="handlerOrderStatus('3')">取消到货</el-button>
		<el-button type="primary" @click="handlerOrderStatus('4')">订单已取货</el-button>
		<el-button type="primary" @click="handlerOrderStatus('5')">取消已取货</el-button>

    <el-table :data="tableData" border @selection-change="getRows">
			<el-table-column align="center" type="selection"></el-table-column>
			<el-table-column align="center" label="订单编码" prop="orderCode"></el-table-column>
			<el-table-column align="center" label="订单总价" prop="orderTotal"></el-table-column>
			<el-table-column align="center" label="订单状态" prop="orderStatus">
				<template slot-scope="scope">
					<span>{{getOrderStatus(scope.row.orderStatus)}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="支付状态" prop="payStatus"></el-table-column>
			<el-table-column align="center" label="门店编码" prop="shopCode"></el-table-column>
			<el-table-column align="center" label="下单人姓名" prop="orderUser"></el-table-column>
			<el-table-column align="center" label="下单人手机号" prop="phone"></el-table-column>
			<el-table-column align="center" label="确认付款开始时间" prop="orderStartTime"></el-table-column>
			<el-table-column align="center" label="确认付款开结束时间" prop="orderEndTime"></el-table-column>
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
	</div>
</template>

<script>

export default {
	data () {
    return {
      dialogVisible: false,
      formData: {
          orderUser: '',
          orderCode: '',
          orderStartTime: '',
          orderEndTime: '',
          phone: '',
          orderStatus: ''
      },
      dialogForm: {
        account: '',
        userName: '',
        role: '',
        sex: '',
        phone: '',
        email: '',
        idCard: '',
        password: ''
			},
			orderStatusList: [
				{label: '订单正常', value: '0'},
				{label: '订单已取消', value: '1'},
				{label: '订单已到货', value: '2'},
				{label: '订单已取消到货', value: '3'},
				{label: '订单已取货', value: '4'},
				{label: '订单已取消取货', value: '5'}
			],
      pageInfo: {
				pageIndex: 1,
				pageSize: 5,
				total: 0
      },
      allTableData: [
				{orderCode: '001', orderTotal: '100', orderStatus: '0', payStatus: '正常', shopCode: '001', orderUser: '张三', phone: '13511111111', orderStartTime: '2020-12-09', orderEndTime: '2020-12-10'},
				{orderCode: '002', orderTotal: '200', orderStatus: '0', payStatus: '已支付', shopCode: '002', orderUser: '李四', phone: '13522222222', orderStartTime: '2020-12-11', orderEndTime: '2020-12-16'},
				{orderCode: '003', orderTotal: '300', orderStatus: '0', payStatus: '正常', shopCode: '003', orderUser: '汤姆', phone: '13533333333', orderStartTime: '2020-12-12', orderEndTime: '2020-12-17'},
				{orderCode: '004', orderTotal: '400', orderStatus: '0', payStatus: '未支付', shopCode: '004', orderUser: '迈克', phone: '13544444444', orderStartTime: '2020-12-13', orderEndTime: '2020-12-18'},
				{orderCode: '005', orderTotal: '500', orderStatus: '0', payStatus: '正常', shopCode: '005', orderUser: '杰克', phone: '13555555555', orderStartTime: '2020-12-14', orderEndTime: '2020-12-19'}
			],
      tableData: [],
      currentRows: [],
      dialogType: ''
    }
	},
	mounted () {
		this.fetch()
	},
  methods: {
		handlerOrderStatus (value) {
			if (!this.currentRows.length) {
				this.$message.error('请选择需要修改的数据')

				return
			}

			this.currentRows.forEach(item => {
				let index = this.allTableData.findIndex(allTableItem => {
					return allTableItem.orderCode === item.orderCode
				})

				this.allTableData[index] = Object.assign({}, this.allTableData[index], {
					orderStatus: value
				})
			})

			this.search()
		},
    fetch () {
      this.pageInfo.pageIndex = 1

      this.search()
    },
    search () {
      this.tableData = this.allTableData.filter(item => {
        return item.orderUser.includes(this.formData.orderUser) && item.orderCode.includes(this.formData.orderCode) && item.orderStartTime.includes(this.formData.orderStartTime) && item.orderEndTime.includes(this.formData.orderEndTime) && item.phone.includes(this.formData.phone) && item.orderStatus.includes(this.formData.orderStatus) 
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

      this.pageInfo.total = this.allTableData.length
    },
    reset () {
      this.$refs.searchForm.resetFields()

      this.fetch()
		},
		getOrderStatus (value) {
			return this.orderStatusList.filter(item => {
				return item.value === value
			})[0].label
		},
    getRows (rows) {
      console.log('rows', rows)
      this.currentRows = rows
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
.user-container {
  padding-top: 20px;
}
</style>
