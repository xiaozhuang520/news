<template>
  <div>
    <AuthTopBar text="我的跟帖" @click="handleClick"/>
    <div class="follow" v-for="(item,index) in list" :key="index">
      <div class="time">2019-10-10 10:20</div>
      <div class="parent" v-if="item.parent">
        <div class="parent_name">@:{{item.parent.user.nickname}}</div>
        <div class="parent_content">{{item.parent.content}}</div>
      </div>
      <div class="content">{{item.content}}</div>
      <router-link to="#" class="post_link">
        <p>原文：{{item.post.title}}</p>
        <span class="iconfont iconjiantou1"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import AuthTopBar from "@/components/AuthTopBar.vue";
export default {
    data(){
        return{
            list:[]
        }
    },
  mounted() {
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>{
        const {data}=res.data;
        this.list=data;
    })
  },
  components: {
    AuthTopBar
  },
  methods:{
      handleClick(){
          this.$router.back()
      }
  }
};
</script>

<style scoped lang="less">
.follow {
  padding: 20px;
  border-bottom: 1px solid #999;
  .time {
    margin-bottom: 10px;
    color: #a1a1a1;
  }
  .parent {
    padding: 10px;
    border-radius: 5px;
    background: #e4e4e4;
    color: #939393;
    .parent_name {
      margin-bottom: 10px;
      font-size: 12px;
    }
  }
  .content {
    margin: 10px 0;
  }
  .post_link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>