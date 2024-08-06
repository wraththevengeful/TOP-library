// Logic for library
const myLibrary = [];
const elementMap = new Map(); // Map to track book ID to article element

// UI Logics:
// Variables for UI
const addBookButton = document.getElementById(`addBook`);
const header = document.querySelector(`header`);
const main = document.querySelector(`main`);
const footer = document.querySelector(`footer`);
const form = document.querySelector(`form`);
const closeFormButton = document.querySelector(`.closeForm`);
const bookTemplate = document.getElementById(`bookTemplate`);

// Helper function to get current timestamp
function getCurrent() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
}

// Constructor to add book
function Book(id, title, author, bookPages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.bookPages = bookPages;
    this.readStatus = readStatus;
}

// Create and add a book
function createBook(id, title, author, bookPages, readStatus) {
    let book = new Book(id, title, author, bookPages, readStatus);
    myLibrary.push(book);
    console.log(book);
    displayBooks(book);
}

// Use our form to create a book
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

// Show/hide form
function toggleHides() {
    header.classList.toggle("hidden");
    main.classList.toggle("hidden");
    footer.classList.toggle("hidden");
    form.classList.toggle("hidden");
    form.reset();
}

addBookButton.addEventListener("click", toggleHides);
closeFormButton.addEventListener("click", toggleHides);

// Function to display books
function displayBooks(element) {
    const bookTemplate = document.querySelector('template');
    let clone = bookTemplate.content.cloneNode(true);
    let article = clone.querySelector('article');
    let deleteButton = clone.querySelector('.bookDelete');

    // Set the data attribute with the unique ID
    article.dataset.id = element.id;
    elementMap.set(element.id, article); // Map the ID to the DOM element

    clone.querySelector('.bookTitle').textContent = element.title;
    clone.querySelector('.bookAuthor').textContent = element.author;
    clone.querySelector('.bookPages').textContent = element.bookPages;
    clone.querySelector('.bookReadToggle').textContent = "Mark as Read";

    // Function to delete book
    deleteButton.addEventListener('click', function (event) {
        const articleElement = event.target.closest('article');
        if (articleElement) {
            const bookID = articleElement.dataset.id;
            removeBookFromLibrary(bookID); // Remove the book from library and DOM
        }
    });

    document.querySelector('main').appendChild(clone);
}

// Function to remove a book from the library and DOM
function removeBookFromLibrary(bookID) {
    // Find and remove the book from the library array
    const index = myLibrary.findIndex(book => book.id === bookID);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        console.log(`Removed book with ID ${bookID}`);
        console.log(myLibrary);

        // Remove the corresponding DOM element
        const articleElement = elementMap.get(bookID);
        if (articleElement) {
            articleElement.remove();
            elementMap.delete(bookID); // Clean up the map
        }
    }
}
