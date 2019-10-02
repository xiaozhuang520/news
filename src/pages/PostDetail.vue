<template>
  <div>
    <div class="post" v-if="detail.type===1">
      <div class="post_header">
        <div class="post_logo">
          <em class="iconfont iconjiantou2"></em>
          <i class="iconfont iconnew" @click="$router.back()"></i>
        </div>
        <span class="comment" v-if="!detail.has_follow" @click="handleFollow">+ 关注</span>
        <span class="comment follow" v-if="detail.has_follow" @click="handleunFollow"> 已关注</span>
      </div>
      <div class="post_content">
        <h3>{{detail.title}}</h3>
        <div class="post_user">
          <span>{{detail.user.nickname}}</span>
          <i>2019-10-10</i>
        </div>
        <div class="content" v-html="detail.content"></div>
      </div>
      <LikeAndWXBtn @click="handleLike" :detail="detail" />
      <PostFooter @click="handleStar" :detail="detail" />
    </div>

    <div class="post_video" v-if="detail.type===2">
      <video
        src="https://video.pearvideo.com/mp4/adshort/20190929/cont-1607714-14436895_adpkg-ad_hd.mp4"
        class="video"
        controls="controls"
        :poster="detail.cover[0].url"
      ></video>
      <div class="user">
        <div class="user_info">
          <div class="head_name">
            <img :src="$axios.defaults.baseURL+detail.user.head_img" alt />
            <span>{{detail.user.nickname}}</span>
          </div>
          <span class="comment" v-if="!detail.has_follow" @click="handleFollow">关注</span>
          <span class="comment follow" v-else @click="handleunFollow">已关注</span>
        </div>
        <div class="content">{{detail.title}}</div>
      </div>
      <LikeAndWXBtn @click="handleLike" :detail="detail" />
      <PostFooter @click="handleStar" :detail="detail" />
    </div>
  </div>
</template>

<script>
import LikeAndWXBtn from "@/components/LikeAndWXBtn";
import PostFooter from "@/components/PostFooter";
export default {
  data() {
    return {
      detail: {
        user: {}
      }
    };
  },
  mounted() {
    // 获取文章数据
    const { id } = this.$route.params;
    const config = {
      url: "/post/" + id
    };
    if (localStorage.getItem("token")) {
      config.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    this.$axios(config).then(res => {
      const { data } = res.data;

      this.detail = data;
      
    });
  },
  methods: {
    // 关注文章
    handleFollow() {
      const id = this.detail.user.id;

      const config = {
        url: "/user_follows/" + id
      };
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }
      this.$axios(config).then(res => {
        const { message } = res.data;
        if (message === "已关注" || message === "关注成功") {
          this.detail.has_follow = true;
          this.$toast.success(message);
        }
      });
    },
    // 取消关注
    handleunFollow() {
      const id = this.detail.user.id;
      const config = {
        url: "/user_unfollow/" + id
      };
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }
      this.$axios(config).then(res => {
        const { message } = res.data;
        if (message === "取消关注成功") {
          this.detail.has_follow = false;
          this.$toast.success(message);
        }
      });
    },
    // 点赞与取消点赞
    handleLike() {
      const { id } = this.$route.params;
      const config = {
        url: "/post_like/" + id
      };
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }
      this.$axios(config).then(res => {
        const { message } = res.data;
        if (message === "点赞成功") {
          this.detail.has_like = true;
          this.detail.like_length++;
          this.$toast.success(message);
        }
        if (message === "取消成功") {
          this.detail.has_like = false;
          this.detail.like_length--;
          this.$toast.success(message);
        }
      });
    },
    // 添加收藏与取消收藏
    handleStar() {
      const { id } = this.$route.params;
      const config = {
        url: "/post_star/" + id
      };
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: localStorage.getItem("token")
        };
      }
      this.$axios(config).then(res => {
        const { message } = res.data;
        if (message === "收藏成功") {
          this.detail.has_star = true;
          this.$toast.success(message);
        }
        if (message === "取消成功") {
          this.detail.has_star = false;
          this.$toast.success(message);
        }
      });
    }
  },

  components: {
    LikeAndWXBtn,
    PostFooter
  }
};
</script>

<style scoped lang="less">
.post {
  margin-top: 80px;
  margin-bottom: 60px;
  .post_header {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 10px;

    .comment {
      display: block;
      width: 60px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border: solid #d8d8d8 1px;
      border-radius: 50px;
      font-size: 13px;
      background: red;
      color: #fff;
    }
    .follow {
      background: #f6f6f6;
      color: #333333;
    }
    .post_logo {
      display: flex;
      align-items: center;
      i {
        font-size: 40/360 * 100vw;
      }
    }
  }

  .post_content {
    padding: 0 10px;
    .post_user {
      margin: 10px 0 20px 0;
      font-size: 12px;
      color: #868686;
    }
    .content {
      line-height: 2;
      /deep/ img {
        max-width: 100%;
      }
    }
  }
}
.post_video {
  .video {
    width: 100%;
  }
  .user {
    padding: 10px;
    .user_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .head_name {
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
          font-size: 10px;
          color: #868694;
        }
        img {
          width: 30/360 * 100vw;
          height: 30/360 * 100vw;
        }
      }
      .comment {
        display: block;
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: solid #d8d8d8 1px;
        border-radius: 50px;
        font-size: 13px;
        background: red;
        color: #fff;
      }
      .follow {
        display: block;
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        background: #f6f6f6;
        color: #333333;
        border: solid #868694 1px;
        font-size: 13px;
        border-radius: 50px;
      }
    }
  }
}
</style>