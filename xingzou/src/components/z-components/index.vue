<template>
    <div>
        {{childValue}}
        <child ref="child" :parentValue="parentValue"></child>
        <button @click="setCurrentChildValue">setCurrentChildValue</button>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>

</style>