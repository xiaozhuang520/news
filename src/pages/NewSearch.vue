<template>
  <div class="new_search">
    <div class="header">
      <em class="iconfont iconjiantou2" @click="$router.back()"></em>
      <div class="search">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="通灵兽消失术" ref="search_content" />
      </div>
      <span class="search_btn" @click="handleSearch">搜索</span>
    </div>
    <div class="history" v-if="status">
      <h4>历史记录</h4>
      <span v-for="(item,index) in histories" :key="index">{{item}}</span>
    </div>
    <AuthList v-for="(post,index) in post" :key="index" :post="post" />
  </div>
</template>

<script>
import AuthList from "@/components/AuthList";
export default {
  data() {
    return {
      post: [],
      histories: [],
      status: true
    };
  },
  mounted() {
    this.histories = JSON.parse(localStorage.getItem("histories")) || [];
  },
  methods: {
    handleSearch() {
      this.status = false;
      const value = this.$refs.search_content.value;
      this.$axios({
        url: "/post_search?keyword=" + value
      }).then(res => {
        const { data } = res.data;
        this.post = data;
        if (JSON.stringify(this.histories).indexOf(value) < 0) {
          this.histories.push(value);
        }

        localStorage.setItem("histories", JSON.stringify(this.histories));
      });
    }
  },
  components: {
    AuthList
  }
};
</script>

<style scoped lang="less">
.new_search {
  padding: 0 20px;
  .header {
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40/360 * 100vw;
    .search {
      flex: 1;
      position: relative;
      margin: 10px 10px;
      i {
        position: absolute;
        top: 13px;
        left: 20px;
      }
      input {
        box-sizing: border-box;
        padding: 10px 20px;
        width: 100%;
        border-radius: 50px;
        background: #f2f2f2;
        border: 1px solid #d7d7d7;
        text-indent: 20px;
      }
    }
  }
  .history {
    padding: 20px 0;
    border-bottom: 1px solid #d7d7d7;
    h4 {
      margin-bottom: 20px;
    }
    span {
      margin-right: 10px;
    }
  }
}
</style>