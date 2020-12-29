<template>
    <div id="a">这是我定义的div</div>
</template>

<script>
export default {
    data () {
        return {
            maData:'1234',
            count:0
        }
    },
    //生命周期函数

    //  // 数据初始化之前
    // beforecreate () {
    //     console.log(111)
    //     console.log(this.myData)
    // },
    // // 数据初始化之后
    // created (){
    //     console.log(222)
    //     console.log(this.myData)
    // },
    // // 页面dom元素挂载之前
    // beforeMount () {
    //     console.log(111)
    //     console.log(document.getElementById('a') )
    // },
    // // 页面dom元素挂载完成之后
    // mounted () {
    //     console.log(222)
    //     console.log(document.getElementById('a') )
    // },
    // // 页面数据更新之前
    beforeUpdate () {
        console.log(this.count)
        console.log('数据更新')
    },
    // 页面数据更新之后
    updated () {
        console.log(this.count)
        console.log('数据更新之后')
    },
}
</script>

<style lang="scss" scoped>

</style>