//initializations
const tbody = document.querySelector('tbody');
tbody.addEventListener('click', onTableClick);

document.querySelector('#loadBooks').addEventListener('click', loadAllBooks);

const createForm = document.querySelector('#submitForm');
createForm.addEventListener('submit', createBook);

const editForm = document.querySelector('#editForm');
editForm.addEventListener('submit', onEditBook);



loadAllBooks();

//handle createForm
async function createBook(event) {
    event.preventDefault();

    const newBook = new FormData(event.target);

    const title = newBook.get('title');
    const author = newBook.get('author');

    const result = await createBookRequest({ title, author });

    loadAllBooks();
    event.target.reset();
    return result;


}

//handles editForm
async function onEditBook(event) {
    event.preventDefault();

    const newBook = new FormData(event.target);

    const id = newBook.get('id');
    const title = newBook.get('title');
    const author = newBook.get('author');

    const result = await updateBook(id,{ title, author });    
    
    event.target.reset();

    createForm.style.display = 'none';
    editForm.style.display = 'block';

    loadAllBooks();
}



//handle event on delete and edit buttons
function onTableClick(event) {
    if (event.target.className == 'edit') {

        onEdit(event.target);

    } else if (event.target.className == 'delete') {
        onDelete(event.target);
    }
}

//handles editButton
async function onEdit(button) {

const id = button.dataset.id;
const book = await loadBook(id);

createForm.style.display = 'none';
editForm.style.display = 'block';

editForm.querySelector('[name="id"]').value = id;
editForm.querySelector('[name="title"]').value = book.title;
editForm.querySelector('[name="author"]').value = book.author;

}

//handles deleteBtn
async function onDelete(button) {

    const id = button.dataset.id;
    await deleteBook(id);

    button.parentNode.parentNode.remove();

}


function createRow(id, book) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td>
    <button class="edit" data-id=${id}>Edit</button>
    <button class="delete" data-id=${id}>Delete</button>
</td>`;

    return tr;
}

//load all books
async function loadAllBooks() {

    const url = 'http://localhost:3030/jsonstore/collections/books';

    const data = await request(url);

    const result = Object.entries(data).map(([id, book]) => createRow(id, book));

    tbody.replaceChildren(...result);
}

//load a book to edit
async function loadBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;

    const book = await request(url);

    return book;

}

//create a new book
async function createBookRequest(book) {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const newBook = await request(url, {
        method: 'POST',
        body: JSON.stringify(book)
    });

    return newBook;
}



//update a book
async function updateBook(id, book) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;

    const updatedBook = await request(url, {
        method: 'PUT',
        body: JSON.stringify(book)
    });
    return updatedBook;
}


//Delete a book
async function deleteBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;
    const result = await request(url, { method: 'DELETE' });
    return result;
}

//reuseful request function
async function request(url, options) {

    if (options && options.body !== undefined) {

        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const res = await fetch(url, options);

    if (res.ok != true) {
        const err = await res.json();
        alert(err.message);
        throw new Error(err.message);
    }

    const result = await res.json();

    return result;
}

