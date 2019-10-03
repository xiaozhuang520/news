<template>
  <div class="comment">
    <div class="comment_header">
      <AuthTopBar text="精彩跟帖" />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 列表渲染 -->
      <div class="comment_content" v-for="(item,index) in comments" :key="index">
        <div class="comment_user">
          <img :src="$axios.defaults.baseURL+item.user.head_img" alt />
          <div class="comment_name_time">
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span class="replay" @click="handleReplay(item)">回复</span>
        </div>

        <CommentReplay :data="item.parent" v-if="item.parent" @handleReplay="handleReplay" />
        <div class="content">{{item.content}}</div>
      </div>
    </van-list>

    <PostFooter :detail="detail" @getComment="getComment" :replay="replay" />
  </div>
</template>

<script>
import AuthTopBar from "@/components/AuthTopBar";
import CommentReplay from "@/components/CommentReplay";
import PostFooter from "@/components/PostFooter";

export default {
  data() {
    return {
      comments: [],
      detail: {},
      replay: null,
     
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      isReplay:''
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        const id = this.$route.params.id;
      
        this.getComment(id)

      }, 2000);
    },
    getComment(id,isReplay) {
      if(isReplay==='isReplay'){
        this.pageIndex=1;
        this.comments=[];
      }
      this.$axios({
        url: `/post_comment/${id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        const { data } = res.data;
        if(data.length<this.pageSize){
          this.finished=true;
        }
        this.comments = [...this.comments,...data];
        this.pageIndex++;
        this.loading=false;
        // console.log(this.comments);
      });
    },
    handleReplay(item) {
      this.replay = item;
      
    }
  },
  mounted() {
    const id = this.$route.params.id;
    // 获取评论列表
    this.getComment(id);
    // 获取文章数据
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
  components: {
    AuthTopBar,
    CommentReplay,
    PostFooter
  }
};
</script>

<style scoped lang="less">
.comment {
  margin-bottom: 50px;
  .comment_content {
    padding: 10px;
    .comment_user {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      img {
        display: block;
        width: 40/360 * 100vw;
        height: 40/360 * 100vw;
        border-radius: 50%;
      }
      .comment_name_time {
        flex: 1;
        padding-left: 10px;
        span {
          font-size: 12px;
          color: #707070;
        }
      }
      .replay {
        font-size: 13px;
        color: #707070;
      }
    }
    .content {
      margin-top: 15px;
    }
  }
}
</style>