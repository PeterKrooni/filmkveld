<template>
    <div class="small-header-container">
        <h1 class="profile-header" style="color: white;font-size: 28px; margin: -50px;">{{this.toptext}}</h1>
        <div class="separator">{{this.bottomtext}}</div>
      
    </div>
</template>

<script>
export default {
    props: {
        toptext: "",
        bottomtext: "",
    }
}
</script>

<style scoped>
.small-header-container{
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}
.profile-header{
  font-weight: lighter;font-size: 22px;color: #969ca3; letter-spacing: 1px;
}
.separator{
    margin-top: 45px;
    width: 150px;
    height: 1px;
    transform: rotate3d(-10, -5, -4, 10deg);
    background-color: #797e84;
    display: flex;
    justify-content: center;
    color: rgb(113, 132, 141);
    font-size: 12px;
}
</style>
