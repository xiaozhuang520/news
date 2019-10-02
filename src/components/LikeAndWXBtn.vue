<template>
  <div class="like_wx">
    <div class="like" :class="{like_success:detail.has_like}" @click="$emit('click')">
      <i class="iconfont icondianzan"></i>
      <span>{{detail.like_length}}</span>
    </div>
    <div class="wx">
      <i class="iconfont iconweixin"></i>
      <span>微信</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail"]
};
</script>

<style scoped lang="less">
.like_wx {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0;
  .like {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    border: 1px solid #939393;
    border-radius: 50px;
  }
  .like_success {
    border: 1px solid red;
    i{
      color: red;
    }
  }

  .wx {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 30px;
    border: 1px solid #939393;
    border-radius: 50px;

    i {
      color: #00c800;
    }
  }
  i {
    padding-right: 5px;
  }
  span {
    font-size: 13px;
  }
}
</style>