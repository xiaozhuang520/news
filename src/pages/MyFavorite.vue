<template>
  <div>
    <AuthTopBar text="我的收藏" />
    <AuthList v-for="(post,index) in post" :key="index" :post="post"/>
  </div>
</template>

<script>
import AuthTopBar from "@/components/AuthTopBar";
import AuthList from "@/components/AuthList";
export default {
    data(){
        return{
            post:[]
        }
    },
  mounted() {
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then(res=>{
        const {data}=res.data;
        this.post=data;
    })
  },
  components: {
    AuthTopBar,
    AuthList
  }
};
</script>

<style>
</style>