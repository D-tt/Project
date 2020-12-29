var express = require('express');
var router = express.Router();

let tableData = []

router.get('/getTableData', function(req, res, next) {
  if (req.query.pageIndex === undefined) {
    res.send({
      data: false,
      message: '缺少参数pageIndex'
    })
  }

  if (req.query.pageSize === undefined) {
    res.send({
      data: false,
      message: '缺少参数pageSize'
    })
  }

  if (req.query.userName === undefined) {
    res.send({
      data: false,
      message: '缺少参数userName'
    })
  }

  if (req.query.account === undefined) {
    res.send({
      data: false,
      message: '缺少参数account'
    })
  }

  if (req.query.role === undefined) {
    res.send({
      data: false,
      message: '缺少参数role'
    })
  }

  let pageIndex = Number(req.query.pageIndex)
  let pageSize = Number(req.query.pageSize)

// this.tableData = this.allTableData.filter(item => {
      //   return item.userName.includes(this.formData.userName) && item.account.includes(this.formData.account) && item.role.includes(this.formData.role)
      // }).slice((this.pageInfo.pageIndex - 1) * this.pageInfo.pageSize, this.pageInfo.pageIndex * this.pageInfo.pageSize)


  res.send({
    data: tableData.filter(item => {
      return item.userName.includes(req.query.userName) && item.account.includes(req.query.account) && item.role.includes(req.query.role)
    }).slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    pageIndex: pageIndex,
    pageSize: pageSize,
    total: tableData.length
  })
});

router.post('/adduser', function (req, res, next) {
  // account: '',
  // userName: '',
  // role: '',
  // sex: '',
  // phone: '',
  // email: '',
  // idCard: '',
  // password: ''

  for (let i = 0; i < Object.keys(req.body).length; i ++) {
    if (!req.body[Object.keys(req.body)[i]]) {
      
      res.send({
        data: false,
        message: '新增失败,缺少参数' + Object.keys(req.body)[i]
      })
      
      return;
    }
  }

  tableData.push(Object.assign({}, req.body, {
    id: new Date().getTime()
  }))

  res.send({
    data: true,
    message: '新增成功'
  })
})

router.post('/updateUser', function (req, res, next) {
  // account: '',
  // userName: '',
  // role: '',
  // sex: '',
  // phone: '',
  // email: '',
  // idCard: '',
  // password: ''

  for (let i = 0; i < Object.keys(req.body).length; i ++) {
    if (!req.body[Object.keys(req.body)[i]]) {
      
      res.send({
        data: false,
        message: '修改失败,缺少参数' + Object.keys(req.body)[i]
      })

      return;
    }
  }

  let index = tableData.findIndex(item => {
    return item.id === req.body.id
  })

  tableData.splice(index, 1, req.body)

  res.send({
    data: true,
    message: '修改成功'
  })
})

router.post('/deleteUser', function (req, res, next) {
  if (!req.body.ids.length) {
    res.send({
      data: false,
      message: '删除失败,idList不能为空'
    })
  }

  console.log(req.body.ids.split(''))
  let idList = req.body.ids.split(',')

  idList.forEach(idItem => {
    let currentIndex = tableData.findIndex(tableItem => {
      return Number(tableItem.id) === Number(idItem)
    })

    tableData.splice(currentIndex, 1)
  })

  res.send({
    data: true,
    message: '删除成功'
  })
})

module.exports = router;
