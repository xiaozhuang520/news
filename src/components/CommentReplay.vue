<template>
  <div>
     
      <div class="comment_replay" >
        <div class="user_replay">
          <span>1 {{data.user.nickname}}</span>
          <i>2小时前</i>
          <em @click="handleReplay(data)">回复</em>
        </div>
        <p>{{data.content}}</p>
      </div>
       <Comment :data="data.parent" v-if="data.parent"  @handleReplay="handleReplay"/>
  </div>
</template>

<script>

export default {
    data(){
        return{
            
        }
    },
    name:'Comment',
    props:["data",],
    methods:{
      handleReplay(data){
        
        this.$emit('handleReplay',data)
      }
    },
    mounted(){
      
       
        
    }
}
</script>

<style scoped lang="less">
.comment_replay {
    padding: 15px 10px;
    border: 1px solid #d7d7d7;
    background: #eee;
    .user_replay{
        display: flex;  
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        i{
            flex: 1;
            padding-left: 15px;
            color: #707070;
            font-size: 12px;
        }
        em{
            font-size: 13px;
            color: #707070;
        }
    }
  }
</style>