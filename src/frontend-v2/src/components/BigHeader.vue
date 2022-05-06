<template>
    <div class="bigheader-container">
            <h1 id="stats-header" class="profile-header" style="font-size: 55px;">{{this.text}}</h1>
    </div>
</template>

<script>
export default {
    props: {
        text: ""
    }
}
</script>

<style scoped>

.bigheader-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
#stats-header{  
    box-shadow: rgb(26, 112, 173) 0px 0px 0px 2px inset, 
    #303841 10px -10px 0px -3px, 
    rgb(18, 104, 17) 10px -10px, 
    #303841 20px -20px 0px -3px, 
    rgb(234, 195, 5) 20px -20px, 
    #303841 30px -30px 0px -3px, 
    rgb(85, 221, 255) 30px -30px, 
    #303841 40px -40px 0px -3px, 
    rgb(18, 150, 47) 40px -40px; padding: 5px;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 15px;
}
.profile-header{
  font-weight: lighter;font-size: 22px;color: #969ca3; letter-spacing: 1px;
}
</style>
