<template>
  <div class="my_attention">
    <AuthTopBar text="我的关注" @click="handleClick"></AuthTopBar>
    <div class="attention_details" v-for="(item,index) in list" :key="index">
      <img :src="$axios.defaults.baseURL + item.head_img" alt />
      <div class="text">
        <span>{{item.nickname}}</span>
        <div class="time">2019-10-10</div>
      </div>
      <button @click="handleUnfollow(index)">取消关注</button>
    </div>
  </div>
</template>

<script>
import AuthTopBar from "@/components/AuthTopBar.vue";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    handleClick() {
      this.$router.back();
    },
    handleUnfollow(index) {
      const id = this.list[index].id;
      this.list.splice(index,1);
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { message } = res.data;
        if (message === "取消关注成功") {
          this.$toast.success(message);
        }
      });
    }
  },
  components: {
    AuthTopBar
  },
  mounted() {
    this.$axios({
      url: "/user_follows",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.list = data;
    });
  }
};
</script>

<style scoped lang="less">
.attention_details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80/360 * 100vw;
  border-bottom: 1px solid #e3e3e3;
  padding: 0 20px;
  .text {
    flex: 1;
    padding-left: 15px;
    .time {
      color: #8e8e8e;
      font-size: 13px;
    }
  }
  img {
    display: inline-block;
    width: 40/360 * 100vw;
    height: 40/360 * 100vw;
    border-radius: 50%;
  }
  button {
    background: #e1e1e1;
    padding: 5px 10px;
    font-size: 12px;
    border-radius: 50px;
  }
}
</style>