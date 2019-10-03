<template>
  <div>
    <div class="personal" @click="handleEdit">
      <img :src="userParticulars.head_img" alt />
      <div class="personal_introduce" >
        <div class="personal_text">
          <span class="iconfont iconxingbienv"></span>
          {{userParticulars.nickname}}
        </div>
        <div class="personal_time">2019-10-10</div>
      </div>
      <span class="iconfont iconjiantou1"></span>
    </div>
    <AuthBar name="我的关注" text="关注的用户" @click="handleMyAttention"></AuthBar>
    <AuthBar name="我的跟帖" text="跟帖/回复"  @click="handleMyFollow"></AuthBar>
    <router-link to="/myfavorite">
      <AuthBar name="我的收藏" text="文章/视频" ></AuthBar>
    </router-link>
    <AuthBar name="退出" @click="handleLoginOut"></AuthBar>
  </div>
</template>

<script>
import AuthBar from "@/components/AuthBar.vue";
export default {
  data() {
    return {
      userParticulars: ""
    };
  },
  components: {
    AuthBar
  },
  methods: {
    handleLoginOut() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      this.$router.replace("/login");
    },
    handleEdit(){
      this.$router.push('/EditUser')
    },
    handleMyAttention(){
      this.$router.push('/myattention')
    },
    handleMyFollow(){
      this.$router.push('/myfollow')
    }
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      headers: {
        Authorization: localStorage.getItem("token")
      },
      method: "get"
    }).then(res => {
      const { data } = res.data;
      if (data) {
        if (res.data.message === "获取成功") {
          this.userParticulars = data;
          if (this.userParticulars.head_img) {
            this.userParticulars.head_img =
              this.$axios.defaults.baseURL + this.userParticulars.head_img;
          }else{
            this.userParticulars.head_img ='/static/images/timg.jpg';
          }
        }
      }
    });
  }
};
</script>

<style scoped lang="less">
.personal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 10px;
  border-bottom: 5px solid #eee;
  .personal_introduce {
    flex: 1;
    padding-left: 10px;
    .personal_text {
      span {
        color: pink;
      }
    }
    .personal_time {
      color: #aba1a1;
      font-size: 12/360 * 100vw;
    }
  }
  img {
    display: inline-block;
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
  }
}
</style>