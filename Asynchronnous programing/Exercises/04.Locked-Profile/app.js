async function lockedProfile() {
   //create all requestsfrom the servers
   //create card for every user 
   //manipulate the DOm by the requirements of the exercise

   const main = document.querySelector('main');

   const users = await getAllUsers();

   const profileCards = users.map(user =>createUserCard(user));

   main.innerHTML ='';

   profileCards.forEach(card => main.appendChild(card));

   main.addEventListener('click',onClick);
    
}

function createUserCard(user) {

  const result =  e('div', {className: 'profile'},
    e('img',{src: './iconProfile2.png', class: 'userIcon'}),
    e('label',{},'Lock'),
    e('input',{type: 'radio', name: user.username, value: 'lock'}),
    e('label',{},'Unlock'),
    e('input',{type: 'radio', name: user.username, value: 'unlock', checked: 'true'}),
    e('br',{}),
    e('hr',{}),
    e('label',{},'Username'),
    e('input',{type: 'text', name: user.username, value: user.username, disabled: 'true', readonly: ''}),
    e('div',{className: 'hiddenInfo'},
    e('hr',{}),
    e('label',{},'Email:'),
    e('input',{type: 'email', name: user.email, value:  user.email,disabled: 'true', readonly: ''}),
    e('label',{},'Age:'),
    e('input',{type: 'email', name: user.age, value: user.age, disabled: 'true', readonly: ''}),
    ),
    e('button',{},'Show more')
    );
return result;
}

async function getAllUsers(){

    const response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);

  const data = await response.json();

    return Object.values(data);
}
//Creates DOM Element
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

//this function uses Delegation to catch the event from the <MAIN>
function onClick(event) {

    if (event.target.tagName === 'BUTTON') {
        let parent = event.target.parentNode;
        //Check ther radio buttons and if its LOCK - lockout the menu
        const isActive = parent.querySelector('input[type="radio"][value="unlock"]').checked;
       
        if (isActive) {
            if (event.target.textContent === 'Show more') {

                //change the textContent of the <buttov>
                event.target.textContent = 'Hide it';

                parent.querySelector('.hiddenInfo').style.display = 'block';

            } else {
                event.target.textContent = 'Show more';
                
                
                parent.querySelector('.hiddenInfo').style.display = 'none';
            }
        }
    }
}
//disable the radio button when locked
const radio =  Array.from(document.querySelectorAll('input[type="radio"]'));

for (const input of radio) {
    input.addEventListener('click', onLockToggle);
}

function onLockToggle(e){
    const button = e.target.parentElement.querySelector('button');
console.log(e.target.value);
    if (e.target.value == "lock") {
        
        button.disabled = true;

    } else {
        
        button.disabled= false;
    }
}
