<template>
    <div id="container">
        <div id="suggestion">
            <div id="content">Moonlight</div>
            <div id="poster-container"><img id="poster" src="https://cdn.pastemagazine.com/www/system/images/photo_albums/best-movie-posters-2016/large/moonlight-ver2-xlg.jpg?1384968217" alt=""></div>
            <div id="footer">8/10</div>
        </div>
        <div id="suggestee">
            <div class="suggestee-card">
                <div id="name">Suggested by: name</div>
                <div id="Karma">Karma: 7.5</div>
            </div>
            <div class="suggestee-card">
                <div id="name">Suggested by: name</div>
                <div id="Karma">Karma: 7.5</div>
            </div>
        </div>
    </div>    
</template>

<script>

</script>

<style scoped>
#container{
    width: 400px;
    display: flex;
    justify-content: space-evenly;
    flex-flow: row;
}
#suggestion{
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 10px;
    border-radius: 0.15em;
    box-shadow: 0.5px 0.5px 0.5px 0.5px rgb(221, 221, 221);
}
#suggestee{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    padding: 10px;
    border-radius: 0.15em;
    box-shadow: 0.5px 0.5px 0.5px 0.5px rgb(221, 221, 221);
}
.suggestee-card{
    padding: 10px;
    border-radius: 0.15em;
    box-shadow: 0.5px 0.5px 0.5px 0.5px rgb(221, 221, 221);
}
#content{
    padding: 2px;
    font-size: 30px;
}
#poster{
    max-width: 150px;
    max-height: 400px; 
}
#footer{
    color: rgb(100, 100, 100);
}
</style>