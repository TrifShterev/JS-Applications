function attachEvents() {
    //add event listener to "Send" buttom
    document.getElementById('submit').addEventListener('click',displayPost);
    //add event listener to "Refresh" buttom
    document.getElementById('refresh').addEventListener('click',loadMessages);


    loadMessages();
   
}

attachEvents();

const textarea = document.querySelector('#messages');
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');




//load and displays all messages
async function loadMessages() {
    const url = `http://localhost:3030/jsonstore/messenger`

    const response = await fetch(url);

    const data = await response.json();

    const messages = Object.values(data);

    textarea.value = messages.map(message => `${message.author}: ${message.content}`).join('\n');


}


//post message
async function createMessage(message){
    const url = `http://localhost:3030/jsonstore/messenger`;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
    };

    const response = await fetch(url, options);

    const data = await response.json();

    return data;
}


//add single message to list
async function displayPost(){

    const author = authorInput.value;
    const content = contentInput.value;

   
    await createMessage({author, content});

    contentInput.value ='';
    textarea.value +='\n' + `${author} : ${content}`; 
}