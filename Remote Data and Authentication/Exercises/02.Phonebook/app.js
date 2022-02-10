const ulElement = document.getElementById('phonebook');
function attachEvents() {
   document.getElementById('btnLoad').addEventListener('click',loadAllContacts);
   document.getElementById('btnCreate').addEventListener('click',onCreate);
   //This marks the button via event Delegation
   ulElement.addEventListener('click',onDelete);

   loadAllContacts();
}

attachEvents();

const nameInput = document.querySelector('#person');
const phoneInput = document.querySelector('#phone');

async function onDelete(ev) {
    const id =ev.target.dataset.id;
    if (id != undefined) {
        await deleteContact(id);
        ev.target.parentNode.remove();
    }
}

async function onCreate() {
    const person = nameInput.value;
    const phone = phoneInput.value;
    const result = await createContact({person, phone});
    
    ulElement.appendChild(createContactElement(result));
}

async function loadAllContacts() {
    const url ='http://localhost:3030/jsonstore/phonebook';
    
    const response = await fetch(url);
    const data = await response.json();
ulElement.replaceChildren(...Object.values(data).map(c=>createContactElement(c)));
}


function createContactElement(contact) {
    const li = document.createElement('li');
    li.innerHTML = `${contact.person}: ${contact.phone} <button data-id=${contact._id}>Delete</button>`;
return li;
}

async function createContact(contact){
    const url ='http://localhost:3030/jsonstore/phonebook';
    
    const response = await fetch(url,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(contact)
    });
    const result = await response.json();

    return result;
}

async function deleteContact(id){
    const url ='http://localhost:3030/jsonstore/phonebook/'+id;
    
    const response = await fetch(url,{method:'DELETE'});
    const result = await response.json();

    return result;

}