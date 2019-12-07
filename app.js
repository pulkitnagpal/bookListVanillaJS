
function book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}
function displayBooks(){
    const books = [
        {
            title: "Pulkit",
            author: "Poki",
            isbn: 123
        },
        {
            title: "simple",
            author: "dn",
            isbn: 1234
        },
        {
            title: "jdajkf",
            author: "df",
            isbn: 12
        }
    ]
    books.forEach((book)=> addBook(book))
}
function addBook(book){
    const list = document.querySelector("#book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger">X</a></td>
    `;
    list.appendChild(row);
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
        const newBook = new book(title, author, isbn);
        addBook(newBook);
    })
})