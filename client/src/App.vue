<script >
  export default {
    name: "App",
    data(){
      return {
        
      }
    }
  }
</script>

<template>
  <div class="container">
        <div class="box">
            <div class="title-container">
                <h1>Simple Chat App</h1>
            </div>

            
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped>
  .container{
      width: 100%;
      height: 100vh;

      background-color: #146356;
      color: #FFF1BD;

      display: flex;
      justify-content: center;
      align-items: center;

      overflow: hidden;
  }

  .box{
      width: 98%;
      height: 98%;

      /* background-color: aqua; */
  }

  .title-container{
      width: 100%;
      height: 130px;
      /* background-color: bisque; */

      font-size: 40px;
      text-shadow: 1px 1px 20px rgba(0, 0, 0, .3);

      display: flex;
      justify-content: center;
      align-items: center;
  }

  .leave-left{
    position: relative;
    animation-name: leaveLeft;
    animation-duration: .5s;
    animation-timing-function: ease-in-out;
  }

  @keyframes leaveLeft{
    from{
      right: 0;
    }

    to{
      right: 100%;
      opacity: 0;
    }
  }

  .leave-right{
    position: relative;
    animation-name: leaveRight;
    animation-duration: .5s;
    animation-timing-function: ease-in-out;
  }

  @keyframes leaveRight{
    from{
      left: 0;
    }

    to{
      left: 100%;
      opacity: 0;
    }
  }
</style>
