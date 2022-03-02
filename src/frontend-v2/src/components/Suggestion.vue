<template>
    <div id="container">
        <div id="header">
            <div id="title"><p>Movie Title</p></div>
            <div id="rating"><p>7.5 ⭐</p></div>
        </div>
        <div id="body">
            <div id="information">
                <p>⌛ 2:25:04</p>
                <p>🎬 Director Directorsen</p>
                <p>🔗 Link</p>
                <p>🙉 Suggested by</p>
            </div>
            <div id="poster">
                <img src="https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279" id="poster-img" alt="">
            </div>
        </div>
        <div id="footer">
            <div id="rating-text">Want to see it?</div>
            <div id="rating-stars"><Rating /></div>
        </div>
    </div>    
</template>

<script>
import Rating from './Rating.vue'

export default {
    name: 'Suggestion',
    components: {
        Rating
    }
}
</script>

<style scoped>
#container{
    width: 250px;
    height: 255px;
    border: 0.1px solid rgba(87, 87, 87, 0.15);
    border-radius: 0.25em;
    background-color: #373b40;
    color: rgb(221, 217, 217);

    transition-duration: 100ms;
    transition-timing-function: ease-out;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
#container:hover{
    transition-duration: 100ms;
    transition-timing-function: ease-out;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
}
#header{
    height: 40px;
    width: 100%;
    border-bottom: 1px solid #2C2F33;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
}

#title{
    height: 40px;
    width: 75%;
    font-size: 16px;
}
#title p{
    margin-left: 10%;
}
#rating{
    height: 40px;
    font-size: 14px;
    width: 25%;
}

#body{
    display: flex;
    flex-flow: row;
    justify-content: center;
    width: 100%;
    height: 155px;
}
#information{
    font-size: 10px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: left;
    height: 100%;
    width: 145px; 
}
#information p {
    margin-left: 10%;
}
#poster{
    height: 100%;
    width: 105px;
    display: flex;
    align-items: center;
}
#poster-img{
    width: 80px;
    height: 120px;
    transform: rotate3d(-90, 40, 20, 2deg);
    filter: drop-shadow(0.1rem 0.2rem 0.75rem rgb(88, 81, 76));
}

#footer{
    font-size: 12px;
    width: 100%;
    height: 70px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    border-top: 1px solid #2C2F33;
}
#rating-text{
    text-align: center;
    margin-bottom: 1%;
}
#rating-stars{
    margin-left: 10%;
}
</style>