import {html, render} from './node_modules/lit-html/lit-html.js'


//on submit parse input 
//render template 
const root = document.querySelector('#root');
document.querySelector('form').addEventListener('submit',(event) => {
    event.preventDefault();

    const towns = document.querySelector('#towns').value.split(',').map(t => t.trim()); //we trim each element to prevent unexpected results if user set more spaces

    const result = template(towns);


    render(result, root);
})

//template - ul with li for every item 

const template = (towns) => html`
<ul>
${towns.map(town => html`<li>${town}</li>`)}
</ul>`;