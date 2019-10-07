<template>
  <div>
    <div class="header">
      <span class="iconfont iconnew logo"></span>

      <div class="header_search">
        <router-link to="/new_search">
          <span class="iconfont iconsearch"></span>
          <i>搜索新闻</i>
        </router-link>
      </div>

      <router-link to="/personal" class="user">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <!-- 栏目组件 -->
      <van-tab v-for="(item,index) in category" :key="index" :title="item.name">
        <!-- 列表下滑加载组件 -->
        <van-list
          v-model="category[active].loading"
          :finished="category[active].finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- 列表渲染 -->
          <AuthList v-for="(posts,index) in category[active].posts" :key="index" :post="posts" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import AuthList from "@/components/AuthList";
export default {
  name:"index",
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0,
      cid: 999,
      category: [],
      pageSize: 5
    };
  },
  methods: {
    onLoad() {
      setTimeout(() => {
        this.$axios({
          url: `/post?pageIndex=${this.category[this.active].pageIndex}&pageSize=${this.pageSize}&category=${this.cid}`
        }).then(res => {
          const { data } = res.data;
          if (data.length < this.pageSize) {
            this.category[this.active].finished = true;
          }
          this.category[this.active].posts = [
            ...this.category[this.active].posts,
            ...data
          ];
          this.category[this.active].pageIndex++;
          this.category[this.active].loading = false;
        });
      }, 2000);
    }
  },
  watch: {
    active() {
      this.cid = this.category[this.active].id;
      this.onLoad();
    }
  },
  mounted() {
    const comfig = {
      url: "/category"
    };
    if (localStorage.getItem("token")) {
      comfig.headers = {
        Authorization: localStorage.getItem("token")
      };
    }
    // 获取栏目列表数据
    this.$axios(comfig).then(res => {
      const { data } = res.data;

      const newData = [];
      data.forEach(item => {
        item.posts = [];
        item.loading = false;
        item.finished = false;
        item.pageIndex = 1;
        newData.push(item);
      });
      this.category = newData;
      //   获取文章列表数据
      this.$axios({
        url: `/post?pageIndex=1&pageSize=5&category=${this.cid}`
      }).then(res => {
        const { data } = res.data;
        this.category[this.active].posts = data;
        this.category[this.active].pageIndex++;
      });
    });
  },
  components: {
    AuthList
  }
};
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60/360 * 100vw;
  padding: 0 10px;
  background: #f00;
  color: #ffe9e9;
  .header_search {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 40/360 * 100vw;
    margin: 0 20/360 * 100vw;
    border-radius: 50px;
    font-size: 14px;
    background: #f97979;
    a{
      color: #fff;
    }
  }
  .logo {
    font-size: 60/360 * 100vw;
  }
  .user {
    span {
      font-size: 25/360 * 100vw;
      color: #ffe9e9;
    }
  }
}
/deep/ .van-tabs__nav {
  background: #e4e4e4;
}
</style>