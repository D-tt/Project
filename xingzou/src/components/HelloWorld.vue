<template>
  <div>
    <!-- <el-button @click="add">click</el-button>
    <el-button type="primary">click</el-button>
    <el-button type="success">click</el-button>
    <el-button type="danger">click</el-button>
    <el-button type="warning">click</el-button>
    <el-button type="info">click</el-button>
    <br>

    <el-radio v-model="radioValue" :label="0">选项1</el-radio>
    <el-radio v-model="radioValue" :disabled="true" :label="1">选项2</el-radio>
    <el-radio v-model="radioValue" :label="2">选项3</el-radio>
    {{radioValue}}
    <br>

    <el-checkbox-group v-model="checkboxList">
      <el-checkbox label="a">多选项1</el-checkbox>
      <el-checkbox label="b" :disabled="true">多选项2</el-checkbox>
      <el-checkbox label="c">多选项3</el-checkbox>
    </el-checkbox-group>
    {{checkboxList}}
    <br>

    <el-input v-model="inpValue" type="password"></el-input>
    {{inpValue.split('').reverse().join('')}}
    <br>

    <el-select filterable v-model="selectValue">
      <el-option v-for="(item,index) in optionList "
      :key="index"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select>
    {{selectValue}}
    <br>

    <el-date-picker v-model="dataValue"></el-date-picker>
    {{dataValue && dataValue.getFullYear()}}-{{dataValue && dataValue.getMonth()+1}}-{{dataValue && dataValue.getDate()}}
    
    <div class="box">
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px" >
        <el-form-item label="账号：" prop="userName">
          <el-input v-model="formData.uerName"></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input v-model="formData.password" type="password"></el-input>
        </el-form-item>

        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-model="formData.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="爱好：" prop="loves">
            <el-checkbox-group v-model="formData.loves">
              <el-checkbox label="0">篮球</el-checkbox>
              <el-checkbox label="1">足球</el-checkbox>
              <el-checkbox label="2">排球</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="时间：" prop="dataValue">
          <el-date-picker v-model="formData.dataValue"></el-date-picker>
        </el-form-item>

        <el-form-item label="操作：">
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="resetForm ">重置</el-button>
        </el-form-item>
      </el-form>


      {{formData}}
    </div> -->
    
    <child ref="child" :parentValue="str"></child>
    <el-button @click="getChild">click</el-button>

  </div>
</template>

<script>
import Child from './child.vue'

export default {
  components:{
    Child
  },
  data(){
    return {
      str:'123',
      radioValue:'',
      checkboxList:[],
      inpValue:'',
      selectValue:'',
      optionList:[
        {label:'选项1',value:0},
        {label:'选项2',value:1},
        {label:'选项3',value:2},
        {label:'选项4',value:3},
        {label:'选项5',value:4}
      ],

      dataValue:'',

      formData:{
        uerName:'',
        password:'',
        sex:'',
        loves:[],
        dataValue:'',
      },
      rules: {
          userName: [
            { required: true, message: '请输入账号', trigger: 'change' },    //required: true,必填
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } //trigger: 'blur' ,失去焦点触发校验
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          loves: [
             { required: true, message: '请选择爱好', trigger: 'change' }
          ],
          dataValue: [
            {required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
        
    }
  },
  methods:{
    getChild(){                 //父组件拿子组件的东西
      console.log(this.$refs.child.childValue)        //拿值
      this.$refs.child.childFunc()                    //拿方法
    },
    add(){
      console.log('111')
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log('表单校验通过！')
        } else {
          return false;
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
}
</script>

<style>
  .box{
    width: 400px;
  }
</style>