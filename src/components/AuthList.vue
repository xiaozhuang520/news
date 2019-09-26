<template>
  <div>
    <!-- 渲染图片小于3张的列表 -->
    <div
      class="post_list"
      v-if="post.cover.length>0 || post.cover.length<3 && post.type===1"
    >
      <div class="post_content">
        <div class="title">{{post.title}}</div>
        <p>
          <span>{{post.user.nickname}}</span>
          <i>{{post.comment_length}}跟帖</i>
        </p>
      </div>
      <div class="post_img">
        <img :src="post.cover[0].url" alt />
      </div>
    </div>

    <!-- 渲染图片为3张以上的列表 --> 
   <div class="post_list2" v-if="post.cover.length>=3 && post.type===1" >
      <div class="post_content">
        <div class="title">{{post.title}}</div>
      </div>
      <div class="post_img" >
        <img v-for="(item,index) in post.cover" :key="index"  :src="item.url" alt />
      </div>
      <p>
        <span>{{post.user.nickname}}</span>
        <i>{{post.comment_length}}跟帖</i>
      </p>
    </div>

     <!-- //渲染视频列表 --> 
 <div class="post_video"  v-if="post.type===2 && post.cover.length===1">
      <div class="post_content">
        <div class="title">{{post.title}}</div>
      </div>
      <div class="video">
        <img :src="post.cover[0].url" alt />
        <div class="box">
          <i class="iconfont iconshipin"></i>
        </div>
      </div>
      <p>
        <span>{{post.user.nickname}}</span>
        <i>{{post.comment_length}}跟帖</i>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  mounted(){
    //   console.log(this.post)
  }
};
</script>

<style scoped lang="less">
.post_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #999;
  .post_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 75/360 * 100vw;
    .title {
      font-size: 16/360 * 100vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    p {
      color: #868686;
      font-size: 13px;
    }
  }
  .post_img {
    img {
      display: block;
      width: 120/360 * 100vw;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
}
.post_list2 {
  padding: 10px 10px;
  border-bottom: 1px solid #999;
  .post_content {
    margin-bottom: 10px;
    .title {
      font-size: 16/360 * 100vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .post_img {
    display: flex;
    justify-content: space-between;
    img {
      display: block;
      width: 33%;
      object-fit: cover;
    }
  }
  p {
    margin-top: 10px;
    color: #868686;
    font-size: 13px;
  }
}
.post_video {
  padding: 10px 10px;
  border-bottom: 1px solid #999;
  .post_content {
    margin-bottom: 10px;
    .title {
      font-size: 16/360 * 100vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .video {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }

    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 55/360 * 100vw;
      height: 55/360 * 100vw;
      background: #9aa4ad;
      border-radius: 50%;
      opacity: 0.6;
      i {
        color: #ffffff;
        font-size: 46/360 * 100vw;
      }
    }
  }
  p {
    margin-top: 10px;
    color: #868686;
    font-size: 13px;
  }
}
</style>