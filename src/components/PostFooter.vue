<template>
  <div>
    <div class="post_footer" v-show="!status">
      <input type="text" placeholder="写跟帖" @focus="handelFocus" />
      <span>
        <router-link :to="'/comment/'+detail.id">
          <i class="iconfont iconpinglun- comment">
            <em>{{detail.comment_length}}</em>
          </i>
        </router-link>
        <i class="iconfont iconshoucang" :class="{star:detail.has_star}" @click="$emit('click')"></i>
        <i class="iconfont iconfenxiang"></i>
      </span>
    </div>

    <div class="footer" v-show="status">
      <textarea rows="3" @blur="handleBlur" ref="textarea" :autofocus="false" v-model="value"></textarea>
      <span class="btn" @click="handleSubmit">发送</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail", "replay"],

  data() {
    return {
      status: false,
      placeholder: "发跟帖",
      value: ""
    };
  },
  watch: {
    replay() {
      this.status = true;
      this.$refs.textarea.placeholder = "@" + this.replay.user.nickname;
      this.$refs.textarea.autofocus = true;
      console.log(this.replay);
    }
  },
  methods: {
    handelFocus() {
      this.status = true;
      this.$refs.textarea.autofocus = true;
      this.$refs.textarea.placeholder = this.placeholder;
    },
    handleBlur() {
      if (!this.value) {
        this.status = false;
        this.$refs.textarea.autofocus = true;
        if (this.replay) {
          this.$emit("handleReplay", null, "isReplay");
        }
      }
    },
    handleSubmit() {
      this.value = this.$refs.textarea.value;
      const data = {
        content: this.value
      };
      if (!this.value) {
        return;
      }
      if (this.replay) {
        data.parent_id = this.replay.id;
      }
      this.$axios({
        url: "/post_comment/" + this.detail.id,
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data,
        method: "post"
      }).then(res => {
        const { message } = res.data;
        if (message === "评论发布成功") {
          this.$emit("getComment", this.detail.id, "isReplay");
          this.value = "";
          this.status = false;
          this.$toast.success(message);
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.post_footer {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  input {
    width: 50%;
    padding: 10px 15px;
    background: #d7d7d7;
    border-radius: 50px;
    font-size: 12px;
  }
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 30%;
    padding-right: 5px;
    .star {
      color: red;
    }
    .comment {
      position: relative;
      em {
        display: block;
        position: absolute;
        top: -10px;
        left: 5px;
        padding: 2px 5px;
        border-radius: 50px;
        background: red;
        font-size: 10px;
        color: #fff;
      }
    }
    i {
      font-size: 22px;
    }
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  textarea {
    width: 70%;
    padding: 15px 20px;
    background: #d7d7d7;
    border: none;
    border-radius: 10px;
    padding-right: 5px;
  }
  .btn {
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 50px;
    color: #fff;
    font-size: 12px;
    background: red;
  }
  /deep/.none {
    display: none;
  }
}
</style>