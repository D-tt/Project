<template>
	<div class="container">
		<div class="header">
			<div class="logo-text">储留箱后台管理系统</div>

			<div class="user-info">
				<img src="../assets/images/u42.png" alt="">

				<span>admin</span>
			</div>
		</div>

		<div class="box">
			<div class="aside">
				<div
					v-for="(item, index) in menuList"
					:class="{active: $route.path === item.path}"
					:key="index"
					@click="toPage(item)">
						{{item.name}}
				</div>
			</div>

			<div class="content">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			menuList: [
				{path: '/menu-manage', name: '菜单管理'},
				{path: '/staff-manage', name: '工作人员管理'},
				{path: '/customer-manage', name: '客户管理'},
				{path: '/box-manage', name: '箱子管理'},
				{path: '/order-manage', name: '订单管理'},
				{path: '/adv-manage', name: '广告管理'},
				{path: '/options', name: '意见建议'}
			]
		}
	},
	methods: {
		toPage (item) {
			if (this.$route.path === item.path) {
				return
			}

			this.$router.push({
				path: item.path
			})
		}
	}
}
</script>

<style lang="scss" scoped>

.container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
}
.header {
	display: flex;
	justify-content: space-between;
	padding: 0 30px;
	box-sizing: border-box;
	align-items: center;
	width: 100%;
	height: 60px;
	background: rgb(228,228,228);

	.logo-text {
		font-size: 30px;
		color: #409EFF;
	}

	.user-info {
		display: flex;
		height: 60px;
		align-items: center;

		img {
			width: 45px;
			height: 45px;
			margin-right: 20px;
		}

		span{
			color: #fff;
		}
	}
}

.box {
	flex: 1;
	display: flex;
	width: 100%;
}

.aside {
	width: 200px;
	height: 100%;
	background: #fff;
	border-right: 1px solid #ddd;

	>div {
		height: 50px;
		line-height: 50px;
		text-align: center;
		cursor: pointer;
	}

	>div:hover {
		background: rgb(236, 245, 255);
	}

	>div.active {
		background: rgb(236, 245, 255);
		color: #409EFF;
	}
}

.content {
	flex: 1;
}
</style>
