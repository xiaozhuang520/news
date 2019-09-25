<template>
  <div class="user_page">
    <AuthTopBar text="编辑资料" @click="handleClick"></AuthTopBar>
    <div class="user_img">
      <img :src="userinfo.head_img" alt />
      <van-uploader :after-read="afterRead" class="uploader" />
    </div>
    <AuthBar name="昵称" :text="userinfo.nickname" @click="show1 = !show1"></AuthBar>
    <AuthBar name="密码" text="******" type="password" @click="show2 = !show2"></AuthBar>
    <AuthBar name="性别" :text="userinfo.gender===1?'男':'女'"  @click="show3 = !show3"></AuthBar>

    <van-dialog v-model="show1" title="请输入昵称" show-cancel-button @confirm="handlEditNickname">
      <van-field :value="userinfo.nickname" placeholder="请输入昵称" ref="nickname" />
    </van-dialog>

    <van-dialog v-model="show2" title="请输入密码" show-cancel-button @confirm="handlEditPassword">
      <van-field :value="userinfo.password" placeholder="请输入密码" ref="password" />
    </van-dialog>

    <van-dialog v-model="show3" title="请输入密码" show-cancel-button @confirm="handlEditGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = '1'">
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = '0'">
            <van-radio slot="right-icon" name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import AuthTopBar from "@/components/AuthTopBar.vue";
import AuthBar from "@/components/AuthBar.vue";
export default {
  data() {
    return {
      userinfo: "",
      show1: false,
      show2: false,
      show3:false,
      gender:'1'
    };
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("user_id"),
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res => {
      const { data } = res.data;
      this.userinfo = data;
      if (this.userinfo.head_img) {
        this.userinfo.head_img =
          this.$axios.defaults.baseURL + this.userinfo.head_img;
      } else {
        this.userinfo.head_img = "/static/images/timg.jpg";
      }
    });
  },

  methods: {
    // 封装共用函数
    common(data, callback) {
      if (!data) return;
      this.$axios({
        url: "/user_update/" + localStorage.getItem("user_id"),
        method: "post",
        headers: {
          Authorization: localStorage.getItem("token")
        },
        data
      }).then(res => {
        const { message } = res.data;
        if (message == "修改成功") {
          if (callback) {
            callback();
          }
          this.$toast.success(message);
        }
      });
    },
    // 返回上一页
    handleClick() {
      this.$router.back();
    },
    // 上传文件
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const filedata = new FormData();
      filedata.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: filedata,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(res => {
        const { data } = res.data;
        this.userinfo.head_img = this.$axios.defaults.baseURL + data.url;
        this.common({ head_img: data.url });
      });
    },
    // 修改昵称
    handlEditNickname() {
      const value = this.$refs.nickname.$refs.input.value;
      this.common({ nickname: value }, () => {
        this.userinfo.nickname = value;
      });
    },
    //编辑密码
    handlEditPassword() {
      const value = this.$refs.password.$refs.input.value;
      this.common({ password: value }, () => {
        this.userinfo.password = value;
      });
    },
    //编辑性别
    handlEditGender(){
      const gender=this.gender;
      this.common({gender},()=>{
        this.userinfo.gender=gender;
      });
    }
  },

  components: {
    AuthTopBar,
    AuthBar
  }
};
</script>

<style scoped lang="less">
.user_page {
  .user_img {
    display: flex;
    justify-content: center;
    position: relative;
    img {
      display: inline-block;
      width: 100/360 * 100vw;
      height: 100/360 * 100vw;
      border-radius: 50%;
    }
    .uploader {
      position: absolute;
      opacity: 0;
    }
  }
}
/deep/ .van-uploader__upload {
  width: 100/360 * 100vw;
  height: 100/360 * 100vw;
}
</style>