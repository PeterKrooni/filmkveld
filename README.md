# Filmkveld

A web application for organization of movie nights.



## Key features 

"Filmkveld" aims to solve the problem of organisation of "movie nights". The application keeps track of what movies have been watched by a collective, and showes who attened a given movie night, what movies where watched, and who suggested each movie. In addition every movie suggestion can be given a downvote or an upvote by each user that attended the movie night afer the collective/group has watched that movie, this affects the "karma" score of the user that suggested the movie.


## Project goal

The goal of the prioject is to get well aquinted and familiar with production of a modern full stack web application. We aim to get familier with modern component based frontend frameworks and how to ustilise them. We also aim to get familair with Node.js as our choice of backend technology.




## Tech stack

We have choosen to use the MEVN (MongoDB, Express, Vue, Node) tech stack for this project.


## How to run
#### Prerequisites:
1. Node Package Manager (npm)
2. Git clone the repository or download as .zip
3. .env files (see Envorinment Variables section at the bottom of this README) 
---

### Backend:
1. open a terminal
2. navigate to filmkveld\src\backend
3. install node dependecies by running `npm install`
4. run the backend by using `npm run server`

### Frontend:
1. open your terminal
2. navigete to filmkveld\src\frontend-v2
3. install node dependecies by running `npm install`
4. run the front-end by using  `npm run serve`

After running both the frontend and backend, navigate to `localhost:8080` or the port specified in the frontend terminal.

## Known issue
There is a known bug with login handling (the page might end up loading forever), but simply refreshing (hard refresh) the site should fix this.
If this does not work, try deleting the site cookies and logging in again.

## Environment Variables

The backend and frontend both run using environment variables, partly to enable integration to MongoDB, Cloudinary and OMDB.
Environment files (simple files with no name and the extension `.env`) are placed in the source directory of `.src/frontend-v2` and `./src/backend` respectively.

---

##### Frontend .env 
```
VUE_APP_SERVER=http://localhost:5000
VUE_APP_REST=/rest/api/
VUE_APP_CRUD=/crud/api/
```

##### Backend .env
```
FILMKVELD_DB_URI=<MongoDB atlas uri>
FILMKVELD_NS=filmkveld
NODE_ENV=production
PORT=5000
JWT_SECRET=<randomly generated secret>
OMDB_API_KEY=<OMDB API key>
CLOUDINARY_URL=<Cloudinary url> 
```


To run this as your own website, the backend requires setting up a MongoDB Atlas cluster, an OMDB API key and a Cloudinary environment, however all of these are free to set up without needing to add credit cards to use the free tier service. 
