<template>
	<div class="container">
		<div class="form-box">
			<div class="form-title">请登录</div>
			<el-form ref="form" label-width="80px" :model="formData" :rules="formRules" >
				<el-row>
					<el-form-item label="用户名" prop="userName">
						<el-input v-model="formData.userName" placeholder="请输入用户名"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="密码" prop="password">
						<el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
					</el-form-item>
				</el-row>
				<el-form-item>
					<el-button @click="reset">取消</el-button>
					<el-button @click="login" type="primary">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			formData: {
				userName: '',
				password: ''
			},
			formRules: {
				userName: [
					{required: true, message: '请输入账号', trigger: 'change'}
				],
				password: [
					{required: true, message: '请输入密码', trigger: 'change'}
				]
			}
		}
	},
	methods: {
		reset(){
			this.$refs.form.resetFields()
		},
		login () {
			console.log(12321321)
			this.$refs.form.validate(valid => {
				if (valid) {
					this.$router.push({
						path: '/parent'
					})
				} else {
					return false
				}
			})
		}
	}
}
</script>

<style scoped>
.container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-image: url('../assets/images/u504.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}

.form-title {
	margin-top: 50px;
	margin-bottom: 30px;
	text-align: center;
	color: #ddd;
	font-size: 20px;
	font-weight: bold;
}

/deep/ .el-form-item__content {
	text-align: center;
}

.form-box {
	position: absolute;
	right: 40%;
	top: 50%;
	transform: translate(0, -50%);
	width: 350px;
	height: 300px;
	padding: 0 30px;
	box-sizing: border-box;
}
</style>
