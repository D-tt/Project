<template>
	<div class="user-container">
    <el-form ref="searchForm" label-width="80px" :model="formData" inline>
      <el-form-item label="商品名称" prop="goodsName">
        <el-input v-model="formData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品状态" prop="goodsStatus">
        <el-select v-model="formData.goodsStatus" clearable>
          <el-option
            v-for="(item, index) in goodsStatusOptions" :key="index" :label="item.label" :value="item.value">
          </el-option>
          <!-- <el-option label="在售" value="0"></el-option>
          <el-option label="已下架" value="1"></el-option>
          <el-option label="未发布" value="2"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="广告词" prop="theAd">
        <el-input v-model="formData.theAd"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="press">
        <el-input v-model="formData.press"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="auth">
        <el-input v-model="formData.auth"></el-input>
      </el-form-item>
      <el-button type="primary" @click="fetch">搜索</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form>

    <el-button type="primary" @click="openDialog">新增</el-button>
    <el-button type="primary" @click="openUpdateDialog">修改</el-button>
    <el-button type="primary" @click="deleteRows">删除</el-button>
    <el-button type="primary" @click="shelvesRows">上架</el-button>
    <el-button type="primary" @click="theShelvesRows">下架</el-button>

    <el-table :data="tableData" border @selection-change="getRows">
			<el-table-column align="center" type="selection"></el-table-column>
			<el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>
			<el-table-column align="center" label="定价" prop="costPrice"></el-table-column>
			<el-table-column align="center" label="售价" prop="price"></el-table-column>
			<!-- <el-table-column align="center" label="销售量" prop="sex"></el-table-column> -->
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
			<el-table-column align="center" label="广告词" prop="theAd"></el-table-column>
			<el-table-column align="center" label="商品介绍" prop="goodsIntroduce"></el-table-column>
			<el-table-column align="center" label="商品状态" prop="goodsStatus">
        <template slot-scope="scope">
          <span>{{getGoodsStatusLabel(scope.row.goodsStatus)}}</span>
        </template>
      </el-table-column>
			<!-- <el-table-column align="center" label="浏览量" prop=""></el-table-column> -->
			<!-- <el-table-column align="center" label="商家编码" prop=""></el-table-column> -->
			<el-table-column align="center" label="商家名称" prop="merchantsName">
        <template slot-scope="scope">
          <span>{{getMerchantsNameOptions(scope.row.merchantsName)}}</span>
        </template>
      </el-table-column>
			<el-table-column align="center" label="库存" prop="inventory"></el-table-column>
			<el-table-column align="center" label="isbn书号" prop="bookCode"></el-table-column>
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
        <el-form ref="dialogForm" :model="dialogForm" label-width="100px" inline>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="dialogForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书号" prop="bookCode">
              <el-input v-model="dialogForm.bookCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="一级分类" prop="oneClassify">
              <el-select v-model="dialogForm.oneClassify" clearable>
                <el-option v-for="(item, index) in oneClassifyOptions" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二级分类" prop="twoClassify">
              <el-select v-model="dialogForm.twoClassify" clearable>
                <el-option
                  v-for="(item, index) in twoClassifyOptions"
                  :key="index"
                  :label="item.classifyName"
                  :value="item.classifyValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="广告词" prop="theAd">
              <el-input v-model="dialogForm.theAd"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品介绍" prop="goodsIntroduce">
              <el-input v-model="dialogForm.goodsIntroduce"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商家名称" prop="merchantsName">
              <el-select v-model="dialogForm.merchantsName">
                
                <el-option label="当当网" value="0"></el-option>
                <el-option label="新华书店" value="1"></el-option>
                <el-option label="先锋书店" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存" prop="inventory">
              <el-input v-model="dialogForm.inventory"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成本价" prop="costPrice">
              <el-input v-model="dialogForm.costPrice"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="在售价" prop="price">
              <el-input v-model="dialogForm.price"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
    {{allTableData}}
	</div>
</template>

<script>

export default {
	data () {
    return {
      dialogVisible: false,
      formData: {
        goodsName: '',
        goodsStatus: '',
        theAd: '',
        press: '',
        auth: '',
      },
      dialogForm: {
        goodsName: '',
        bookCode: '',
        oneClassify: '',
        twoClassify: '',
        theAd: '',
        goodsIntroduce: '',
        merchantsName: '',
        inventory: '',
        costPrice: '',
        price: ''
      },
      pageInfo: {
				pageIndex: 1,
				pageSize: 5,
				total: 0
      },
      goodsStatusOptions: [
        {label: '在售', value: '0'},
        {label: '已下架', value: '1'},
        {label: '未发布', value: '2'}
      ],
      merchantsNameOptions: [
        {label: '当当网', value: '0'},
        {label: '新华书店', value: '1'},
        {label: '先锋书店', value: '2'}
      ],
      oneClassifyOptions: [
        {label: '传记', value: '0'},
        {label: '历史', value: '1'},
        {label: '教育', value: '2'},
        {label: '文学', value: '3'}
      ],
      // twoClassifyOptions: [],
      allTwoClassifyOptions: [ // 100000
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
        {classifyName: '百年独孤', classifyValue: '11', oneClassify: '3'}
      ],
      allTableData: [],
      tableData: [],
      currentRows: [],
      dialogType: ''
    }
  },
  computed: {
    twoClassifyOptions () { // 100
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
    search () {
      this.tableData = this.allTableData.filter(item => {
        return item.goodsName.includes(this.formData.goodsName) && item.goodsStatus.includes(this.formData.goodsStatus) && item.theAd.includes(this.formData.theAd) && item.merchantsName.includes(this.formData.press)
      }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)

      this.pageInfo.total = this.allTableData.length
    },
    reset () {
      this.$refs.searchForm.resetFields()

      this.fetch()
    },
    shelvesRows () {
      if (this.currentRows.length === 0) {
        this.$message({
          type: 'error',
          message: '请勾选需要操作的数据'
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
          goodsStatus: '2'
        })

        this.allTableData.splice(currentIndex, 1, newFormData)
        this.search()
      })
    },
    theShelvesRows () {
      if (this.currentRows.length === 0) {
        this.$message({
          type: 'error',
          message: '请勾选需要操作的数据'
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
        console.log(this.allTableData)

        this.allTableData.splice(currentIndex, 1, newFormData)
        this.search()
      })
    },
    getMerchantsNameOptions (value) {
      let currentObj = this.merchantsNameOptions.filter(item => {
        return value === item.value
      })[0]

      return currentObj.label
    },
    getGoodsStatusLabel (value) {
      let currentObj = this.goodsStatusOptions.filter(item => {
        return value === item.value
      })[0]

      return currentObj.label
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
    openDialog () {
      this.dialogVisible = true
      this.dialogType = 'add'
    },
    openUpdateDialog () {
      if (this.currentRows.length > 1) {
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

      this.$nextTick(() => {
        this.dialogForm.twoClassify = this.currentRows[0].twoClassify
      })

      // 伪异步事件
      // setTimeout(() => {
      //   this.dialogForm.twoClassify = this.currentRows[0].twoClassify
      // })
    },
    deleteRows () {
      if (!this.currentRows.length) {
        this.$message({
          type: 'error',
          message: '请勾选数据'
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
      console.log('rows', rows)
      this.currentRows = rows
    },
    dialogConfirm () {
      if (this.dialogType === 'add') {
        let newDialogForm = Object.assign({}, this.dialogForm, {
          id: new Date().getTime(),
          goodsStatus: '0'
        })
        // 源数据
        this.allTableData.push(newDialogForm)
  
        this.search()
  
        this.$refs.dialogForm.resetFields()
  
        this.dialogVisible = false
      } else if (this.dialogType === 'set') {
        let index = this.allTableData.findIndex(item => {
          return item.id === this.dialogForm.id
        })

        let newFormData = Object.assign({}, this.dialogForm)

        this.allTableData.splice(index, 1, newFormData)

        this.$refs.dialogForm.resetFields()

        this.dialogVisible = false

        this.search()
        console.log(index)
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
.user-container {
  padding-top: 20px;
}
</style>
