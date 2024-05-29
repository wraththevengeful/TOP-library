//Logic for library

const myLibrary = [];

const observer = new MutationObserver( mutationList =>{
    for (let mutation of mutationList){
        if(mutation.type == 'childList'){
            myLibrary.forEach(element=>{
                displayBooks(element);
            })
        }
    }
})

//UI Logics:
//variables for UI:
const addBookButton = document.getElementById(`addBook`);
const header = document.querySelector(`header`);
const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const form = document.querySelector(`form`);
const closeFormButton = document.querySelector(`.closeForm`);
const bookTemplate = document.getElementById(`bookTemplate`);

// observer.observe(main,{childList:true, subtree:true});

function getCurrent() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
}

//constructor to add book:
function Book(id, title, author, bookPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.bookPages = bookPages;
    this.readStatus = readStatus;
}


//create and add a book:
function createBook(id, title, author, bookPages, readStatus) {
    let book = new Book(id, title, author, bookPages, readStatus);
    myLibrary.push(book);
    console.log(book);
    displayBooks(book);
}

//use our form to create a book:
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const titleInput = document.getElementById('bookTitleInput').value;
    const authorInput = document.getElementById('bookAuthorInput').value;
    const pagesInput = document.getElementById('bookPagesInput').value;
    const readStatusInput = document.getElementById('readStatusInput').checked;
    createBook(getCurrent(), titleInput, authorInput, pagesInput, readStatusInput);
    toggleHides();
    console.log(myLibrary);
})


//show form to add book:
function toggleHides() {
    header.classList.toggle("hidden");
    main.classList.toggle("hidden");
    footer.classList.toggle("hidden");
    form.classList.toggle("hidden");
    form.reset();
}

addBookButton.addEventListener("click", toggleHides);
closeFormButton.addEventListener("click", toggleHides);

//function to show books:
function displayBooks(element) {
    const bookTemplate = document.querySelector('template');
    let clone = bookTemplate.content.cloneNode(true);
    let article = clone.querySelector('article');
    let deleteButton = clone.querySelector('.bookDelete');

    // Set the data attribute with the unique ID
    article.dataset.id = element.id;
    
    clone.querySelector('.bookTitle').textContent = element.title;
    clone.querySelector('.bookAuthor').textContent = element.author;
    clone.querySelector('.bookPages').textContent = element.bookPages;
    clone.querySelector('.bookReadToggle').textContent = "Mark as Read";

    
    //function to delete book
    deleteButton.addEventListener('click',function(event){
        const articleElement = event.target.closest('article');
        if(articleElement){
            const bookID = articleElement.dataset.id;
            let index = myLibrary.findIndex(book=>book.id === bookID);
            console.log(bookID);
            if(index != -1){
                myLibrary.splice(index,1);
                console.log(myLibrary);
            }
        }

    })

    document.querySelector('main').appendChild(clone);
}

//sync book tiles with array:
document.addEventListener('DOMContentLoaded', () => {
    myLibrary.forEach(element => {
        displayBooks(element);
    });
});