<template>
  <button @click="handleClick">{{text}}</button>
</template>

<script>
export default {
    props:['text'],
    methods:{
        handleClick(){
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="less">
button{
    width: 100%;
    height: 56 / 360 *100vw;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    border-radius: 50px;
    color: #f8e4dd;
    font-size: 20/360 * 100vw;
    background: #ff0000;
}
</style>