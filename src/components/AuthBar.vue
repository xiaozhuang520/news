<template>
  <div class="content">
     <div class="userInfo" @click="$emit('click')">
        <span>{{name}}</span>
        <i>{{type==='possword'?'******': text}}</i>
        <span class="iconfont iconjiantou1"></span>
      </div> 
  </div>
</template>

<script>

export default {
    props:['text','name','type'],
}
</script>

<style scoped lang="less">
.content{
    padding:0 20px;
    .userInfo{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40/360*100vw;
        border-bottom: 1px solid #eee;
        i{
            flex: 1;
            text-align: right;
            font-size: 13px;
            color: #aba1a1;
        }
    }
}
</style>