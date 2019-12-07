function storeBooks(){}
storeBooks.getBooks = function getBooks(){
    const books = JSON.parse(localStorage.getItem('books'));
    if (books === null){
        return [];
    }
    return books;
}
storeBooks.addBook = function addBook(book){
    const books = storeBooks.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}
storeBooks.removeBook = function removeBook(isbn){
    const books = storeBooks.getBooks();
    books.forEach((book, index)=> {
        if (book.isbn === isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books', JSON.stringify(books));
}
function book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}
function displayBooks(){
    const books = storeBooks.getBooks();
    books.forEach((book)=> addBook(book))
}

function addBook(book){
    const list = document.querySelector("#book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger delete">X</a></td>
    `;
    list.appendChild(row);
}
function deleteRow(row){
    if (row.classList.contains('delete')){
        row.parentElement.parentElement.remove();
        storeBooks.removeBook();
    }
}
function showAlerts(message, type){
    const div = document.createElement('div');
    div.className = `alert alert-${type}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.form-container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(()=> {
        div.remove()
    }, 4000)
}
function clearFields(){
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = ""
}
document.addEventListener('DOMContentLoaded', ()=> {
    displayBooks();
    const form = document.querySelector('#book-form');
    form.addEventListener('submit', (e)=> {
        //prevent normal submit behaviour
        e.preventDefault();
        //extract values from inputs
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const isbn = document.querySelector("#isbn").value;
        if (title === '' || author === '' || isbn === ''){
            showAlerts('Please fill all the details', 'danger');
        }
        else{
            const newBook = new book(title, author, isbn);
            addBook(newBook);
            storeBooks.addBook(newBook);
            clearFields();
            showAlerts('Book added successfully', 'success');
        }
    })
    const list = document.querySelector("#book-list");
    list.addEventListener("click", (e)=> {
        deleteRow(e.target)
        storeBooks.removeBook(e.target.parentElement.previousElementSibling.innerText)
    })
    
})