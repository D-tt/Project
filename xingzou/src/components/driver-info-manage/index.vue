<template>
    <div>
        <div class="box">
            <ul class="list"></ul>
        </div>
        <div class="child-box"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods:{

    },
}
</script>

<style lang="scss" scoped>
.list{
    width: 300px;
    height: 400px;
    border: 1px solid #ddd;
}
.child-box{
    width: 300px;
    height: 100px;
    border: 1px solid #ddd;
}
</style>