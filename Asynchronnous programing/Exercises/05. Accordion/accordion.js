async function solution() {
    //make the requests to the server
    //create the DoM elements of the articles
    // add event listener to the buttons and change the button text on clck "More"/"Less"
    //make the hidden info to show via accordion/toggle bar

    const section = document.querySelector('#main');

const articles = await getArticles();

const articleCards = articles.map(article =>createArticlePreview(article));

articleCards.forEach(c => section.appendChild(c));

const btns = section.querySelectorAll('button');

[...btns].forEach(b=>b.addEventListener('click',renderText));

console.log(btns)

}

async function renderText(e) {
    
    const btn = e.target;
   
    const article = await getArticle(btn.id);

    const accordionDiv = e.target.parentElement.parentElement;
   const newElement =  accordionDiv.replaceChildren(articleCard(article));
   

   if (btn.textContent == 'More') {
    btn.textContent = 'Less';
   } else {
    btn.textContent = 'More';
   }
}


async function getArticles() {

    const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);

    const data =  await response.json();

    return Object.values(data);
}

async function getArticle(id) {

    const res = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/`+id);

    const data = await res.json();

    return data;
}

function createArticlePreview(article) {
let result = e('div', {className:'accordion'},
e('div', {className: 'head'},
e('span', {},article.title),
e('button', {className: 'button', id: article._id},'More')));

return result;

}

function articleCard(article) {
const resulElement = e('div', {className: 'accordion'},
e('div', {className: 'head'},
e('span', {},article.title),
e('button', {className: 'button', id: article._id},'More')),
e('div', {className: 'extra'},
e('p',{},article.content)));

return resulElement;
}

//Creates DOM Element by choise
function e(type, attributes, ...content) {
    const result = document.createElement(type);

    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }

    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

    content.forEach(e => {
        if (typeof e == 'string' || typeof e == 'number') {
            const node = document.createTextNode(e);
            result.appendChild(node);
        } else {
            result.appendChild(e);
        }
    });

    return result;
}