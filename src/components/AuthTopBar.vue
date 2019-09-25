<template>
  <div class="template">
    <span class="iconfont iconjiantou" @click="$emit('click')"></span>
    <i>{{text}}</i>
  </div>
</template>

<script>
export default {
    props:['text']
};
</script>

<style scoped lang="less">
.template {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  height: 50/360 * 100vw;
  span{
      color: #222222;
  }
  i {
    flex: 1;
    display: flex;
    justify-content: center;
    padding-right: 25px;
  }
}
</style>