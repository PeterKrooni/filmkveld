<template>
  <div id="home">
    <div v-if="loaded">
      <div v-for="i in this.suggestions" :key="i" id="suggestions">
          <Suggestion class="sugg"
            :title="i.title"
            :external_rating="i.external_rating"
            :runtime="i.runtime"
            :source="i.source"
            :director="i.director"
            :suggestor_username="i.suggestor_name"
            :poster="i.poster"
            :suggestionID="i.suggestionid"
          />
      </div>
    </div>
  </div>
</template>

<script>
import Suggestion from '../components/Suggestion.vue'
import { apiGetAllSuggestions } from '../api/suggestion'
import { apiGetUser } from '../api/user'
import { apiGetMovie } from '../api/movie'

export default {
  name: 'Home',
  components: {
    Suggestion
  },
  data() {
    return {
      suggestions: [],
      loaded: false,
    }
  },
  methods: {
  },
  async created(){
    const suggestionsRequest = await apiGetAllSuggestions();
    const suggestions = suggestionsRequest.data; 
    for (var i = 0; i<suggestions.length; i++){
      const user = await apiGetUser(suggestions[i].suggested_by)
      const movie = await apiGetMovie(suggestions[i].movie_id)
      
      var s_rating = movie.data.rating;
      var s_runtime = movie.data.runtime;
      var s_source = movie.data.source;
      var s_title = movie.data.title;
      var s_director = movie.data.director;
      var s_suggestionid = suggestions[i]._id
      var s_suggestor_name = user.username;

      //todo
      var s_poster = "https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg?x81279"; 

      const sugg = { 
        external_rating: s_rating, 
        runtime: s_runtime, 
        source: s_source, 
        title: s_title, 
        director: s_director, 
        suggestionid: s_suggestionid,
        suggestor_name: s_suggestor_name, 
        poster: s_poster 
      }

      this.suggestions.push(sugg);
    }
    this.loaded = true;
  }
}
</script>

<style scoped>
#home{
   display: flex;
  justify-content: center; 
  flex-flow: column;
}
#suggestions {
  display: flex; 
  justify-content: space-evenly;
  flex-flow: row;
}
.sugg{
  margin: 40px;
}
</style>