console.log("TITLE: Project:- Library ");

let myLibrary = [
    { 'title': 'Book 1', 'author': 'Author 1', 'pages': '123', 'status': 'true' },
    { 'title': 'Book 2', 'author': 'Author 2', 'pages': '231', 'status': 'true' },
    { 'title': 'Book 3', 'author': 'Author 3', 'pages': '312', 'status': 'true' },
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = read;
}

function addBookToLibrary() {
    let bookInfo = new Book()
    bookInfo.title = document.getElementById('book_input').value;
    bookInfo.author = document.getElementById('author_input').value;
    bookInfo.pages = document.getElementById('pages_input').value;
    bookInfo.status = document.getElementById('read_input').checked;

    myLibrary.push(bookInfo);
    console.log("MYLIBRARY: ", myLibrary);
    generateTable();

    document.getElementById("form_input").reset();
    document.getElementById("book_input").focus();
}


// borrowed and adapted from https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    tbl.setAttribute("class", "table table-hover");
    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement("tr");
        let cell = document.createElement("th");
        cellText = document.createTextNode(i + 1);
        cell.appendChild(cellText);
        row.appendChild(cell);

        for (const [key, value] of Object.entries(myLibrary[i])) {
            cell = document.createElement("td");
            cellText = document.createTextNode(value);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        cell = document.createElement('td');
        cell.appendChild(generateButton());
        row.appendChild(cell);
        tblBody.appendChild(row);

    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.getElementById("created_table").replaceChildren(tbl);
    deleteEvent();
}

function generateButton() {
    let button = document.createElement('button');
    button.innerHTML = "<img src='img/delete_black_24dp.svg'>";
    button.type = 'button';
    button.className = 'btn generated_buttons';

    return button;
};

generateTable();

document.getElementById('submit_button').addEventListener('click', (event) => {
    validateForm();
});

document.getElementById('submit_button').addEventListener('keydown', (event) => {
    validateForm();
});

function validateForm() {
    let title = document.getElementById('book_input').value;
    let author = document.getElementById('author_input').value;
    let pages = document.getElementById('pages_input').value;

    if (title === "" || author === "" || pages === "") {
        console.log("EMPTY FIELD");
    } else {
        addBookToLibrary();
    }
}

// To delete books in the Library array

function deleteEvent() {
    let buttons = document.getElementsByTagName('button');
    console.log("BUTTONS: ", buttons);
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {
            let index = event.target.closest('tr').firstChild.innerHTML;
            console.log("CLICK TARGET: ", index);
            myLibrary.splice(index - 1, 1);
            generateTable();
        });
    }
}
