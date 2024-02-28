//UI Logics:
//variables for UI:
 const addBookButton = document.getElementById(`addBook`);
 const header = document.querySelector(`header`);
 const main = document.querySelector(`main`);
 const footer = document.querySelector(`footer`);
 const form = document.querySelector(`form`);
 const closeFormButton = document.querySelector(`.closeForm`);
console.log(closeFormButton);

//show form to add book:
function toggleHides(){
    header.classList.toggle("hidden");
    main.classList.toggle("hidden");
    footer.classList.toggle("hidden");
    form.classList.toggle("hidden");
    form.reset();
}
addBookButton.addEventListener("click",toggleHides);
closeFormButton.addEventListener("click",toggleHides);

//Logic for library

const myLibrary = [];

