import {html,render} from './node_modules/lit-html/lit-html.js';
import {towns as townNames} from './towns.js'

//template:
//insorted list
//highlight elements based on search result

const templateList = (towns) => html`
<ul>
   ${towns.map(t => html`<li class=${t.match ? 'active' : ''}>${t.name}</li>`)}
</ul>`;

//start:
//load and parse data
//render template 
//add event listener tosearch field
const towns = townNames.map(t=> ({name: t, match: false}));
const root = document.getElementById('towns');
const input = document.getElementById('searchText');
const output = document.getElementById('result');
document.querySelector('button').addEventListener('click',onSearch);

update();
//update: 
//render template
function update(){
   render(templateList(towns), root);
}
//on search:
//read input value
// compare with town names and modify data 
//output result data
//call update function
function onSearch(){

   const match = input.value.trim().toLocaleLowerCase();

   let matches = 0;
   for (let town of towns) {
      
      if (match && town.name.toLocaleLowerCase().includes(match)) {
      
         town.match = true;
         matches++;

      } else {
         town.match= false;
      }
   }
  

   output.textContent = `${matches} matches found`;

   update();

}

