//initialization
// - find relevant section

import { showCreate } from './create.js';
import { showView, e } from './dom.js';
import {showDetails} from './details.js';

//Here we make caching on the home pageand it will make only one request to the server.
let moviesCache = null;
let lastLoaded = null;
const maxAge = 60000; // 1 min. is the time between the requests

// - detach section from Dom
const section = document.getElementById('home-page');
const catalog = section.querySelector('.card-deck.d-flex.justify-content-center');
section.querySelector('#createLink').addEventListener('click', (event) => {
    event.preventDefault();
    showCreate();
})

catalog.addEventListener('click', (event) => {
    event.preventDefault();
let target = event.target;

//Here we go to the parentNode witch is <a> and have the data-id of the movie we need
if (target.tagName == 'BUTTON') {
    target = target.parentNode;
}
//Here we get the Id of the movie from <a data-id="1243rt432">
if (target.tagName =='A') {
    const movieId = target.dataset.id;

    showDetails(movieId)

   
}

});

section.remove();

//Display logic
export function showHome() {
    showView(section);
    getMovies();
}

async function getMovies() {
catalog.replaceChildren(e('p',{},'Loading...'));

const now = Date.now();

if (moviesCache==null || (now - lastLoaded) > maxAge) {
    
    lastLoaded = now;

    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();
    moviesCache = data;
}
    

    catalog.replaceChildren(...moviesCache.map(createMovieCard))
}

function createMovieCard(movie){
    const element = e('div',{className: 'card mb-4'});
    element.innerHTML =`
    <img class="card-img-top" src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
   <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
   <a data-id=${movie._id} href="#">
       <button type="button" class="btn btn-info">Details</button>
   </a>
</div>`;

return element;
}
