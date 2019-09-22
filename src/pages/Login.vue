<template>
  <div class="content">
    <div class="close">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <div class="username">
      <AuthInput 
      placeholder="请输入手机号" 
      :rule='/^1[0-9]{4,10}$/' 
      :value="form.username" 
      @input="handleInput"
      err_message="手机号格式有误"
      name="iphone"
      ></AuthInput> 
    </div>
    <div class="password">
      <AuthInput 
      name="password"
      type="password"
      placeholder="请输入密码" 
      :rule='/^[0-9a-zA-Z]{3,12}$/' 
      v-model="form.password" 
      err_message="密码格式有误"
      ></AuthInput> 
    </div>
    <AuthBtn @click="handleSubmit" text="登录"></AuthBtn>
  </div>
</template>

<script>
import AuthInput from '@/components/AuthInput.vue';
import AuthBtn from '@/components/AuthBtn.vue';
export default {
    data(){
        return {
            form:{
                username:'',
                password:''
            }
        }
    },
    components:{
        AuthInput,
        AuthBtn
    },
    methods:{
        handleInput(value){
            this.form.username=value;
        },
        handleSubmit(){
           this.$axios({
               url:'/login',
               method:'POST',
               data:this.form
           }).then(res=>{
               const {message}=res.data;
               if(message==="登录成功"){
                   this.$router.push('/')
               }
           })
        }
    }
};
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  .close {
    span {
      font-size: 27 / 360 * 100vw;
    }
  }
  .logo {
      display: flex;
      justify-content: center;
    span {
      font-size: 127/360 * 100vw;
      color: #d81e06;
    }
  }
}
</style>