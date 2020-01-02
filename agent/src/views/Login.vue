<template>
  <div class="con">
    <div class="kong-d"></div>
    <div class="log-d">
      <h3>登录</h3>
      <div class="user clear">
        <span class="span-user"></span>
        <div class="user-name">用户名</div>
        <input type="text" placeholder="请输入您的用户名" id="user">
      </div>
      <div :style="{'min-height':'20px','clear':'both'}"/>
      <div class="pass clear">
        <span class="span-pass"></span>
        <div class="pass-name">密码</div>
        <input type="password" placeholder="请输入您的密码" id="pass" @keyup.enter="hrefSystem">
      </div>
      <div class="submit">
        <button type="button" class="btn" @click="hrefSystem">登录</button>
      </div>
    </div>
  </div>
</template>
 
<script>
  import $ from 'jquery'
  import axios from 'axios'
  export default {
    name: "LoginContent",
    data(){
      return {
        user :"",
        pass :""
      }
    },
    mounted(){
      console.log(this.user)
      $("#user").focus(function () {
        $(".user-name").css({display:"block"}).animate({bottom:"2px"},400);
      });
      $("#user").blur(function () {
        $(this).css({borderColor:"white",borderBottomColor:"#ccc"});
        $(".user-name").css({display:"none"}).animate({bottom:"-2px"},400);
 
      });
      $("#pass").focus(function () {
        $(".pass-name").css({display:"block"}).animate({bottom:"2px"},400);
      });
      $("#pass").blur(function () {
        $(this).css({borderColor:"white",borderBottomColor:"#ccc"});
        $(".pass-name").css({display:"none"}).animate({bottom:"-2px"},400);
 
      })
    },
    methods:{
      hrefSystem:function () {

        let username = $("#user").val();
        let password = $("#pass").val();
        let data = {username,password};
        axios.post('/api/admin/login', data)
        .then(res=>{
          if(res.data.code !== 200){
            this.$message.error(res.data.message);
          }else{
            console.log(res.data);
            localStorage.setItem('token',res.data.data.token);
            this.$router.push({
              path:"/home/userHome",
              query:{
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })

      }
    }
  }
</script>
 
<style scoped>
  .clear{
    zoom : 1;
  }
.clear::after{
    content : "";
    display : "block";
    height : 0;
    clear : "both";
    visibility : "hidden";
    }
  .con{
    width: 100%;
    height: 100%;
    padding-bottom: 40px;
    background: url("../static/img/bg.jpg") 0 0 no-repeat;
    background-size: cover;
  }
  .kong-d{
    width: 100%;
    height: 200px;
    background: transparent;
  }
  .log-d{
    width: 350px;
    padding: 100px 40px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
  }
  h3{
    color: #000;
    font-size:24px ;
    line-height: 24px;
    margin-bottom: 50px;
  }
  .user,.pass{
    position: relative;
    margin-bottom: 30px;
  }
  .span-user,.span-pass{
    display: block;
    width: 20px;
    height: 20px;
    float: left;
    margin-top: 4px;
  }
  .span-user{
    background: url("../static/img/name.png") 0 0 no-repeat;
    background-size: 20px 20px;
  }
  .span-pass{
 
    background: url("../static/img/password.png") 0 0 no-repeat;
    background-size: 20px 20px;
  }
  .user-name,.pass-name{
    display: none;
    font-size: 14px;
    width: 50px;
    text-align: center;
    line-height: 14px;
    color: dodgerblue;
    position: absolute;
    background: #fff;
    left: 50px;
    bottom: -20px;
    z-index: 30;
  }
  input{
    display: block;
    width: 230px;
    height: 30px;
    border: 1px solid #fff;
    border-bottom-color:#ccc;
    float: left;
    margin-left: 18px;
    outline: none;
    text-indent: 12px;
    box-shadow: inset 0 0 0 1000px #fff !important;
  }
  .submit{
    width: 100%;
  }
  .btn{
    /* display: block; */
    width: 100%;
    font-size: 14px;
    text-align: center;
    line-height: 44px;
    background: dodgerblue;
    border-radius: 5px;
    color: #fff;
    border: none;
    margin: 40px auto 0;
    outline: none;
    cursor: pointer;
  }
</style>
