<template>
    <div id="container">
        <div id="header">
            <div id="title"><p>Snatch</p></div>
            <div id="rating"><p>8.3 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png?20200406194337" style="width: 20px; height: 10px;" alt=""></p></div>
        </div>
        <div id="body">
            <div id="information">
                <p>⌛ 1h 44m</p>
                <p>🔗 <a href="https://www.imdb.com/title/tt0208092/" target="_blank">Link</a></p>
                <p>🎬 Guy Ritchie</p>
                <p>🙉 Froske Faen</p>
            </div>
            <div id="poster">
                <img src="https://m.media-amazon.com/images/I/91+1XVS3MdL._AC_SY606_.jpg" id="poster-img" alt="">
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
    box-shadow: rgba(104, 104, 104, 0.719) 0px 48px 100px 0px;
}

#title{
    height: 40px;
    width: 75%;
    font-size: 15px;
}
#title p{
    font-weight: bolder;
    margin-left: 10%;
}
#rating{
    color: rgba(255, 217, 0, 0.863);
    height: 40px;
    font-size: 15px;
    width: 25%;
    font-style: italic;
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
#information a{
    color: rgb(221, 217, 217);
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
    transition-duration: 150ms;
}
#footer:hover{
    transition-duration: 150ms;
    box-shadow: rgba(133, 133, 133, 0.1) 0px 10px 50px;
}
#rating-text{
    text-align: center;
    margin-bottom: 1%;
}
#rating-stars{
    margin-left: 10%;
}
</style>