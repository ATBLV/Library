console.log("TITLE: Project:- Library ");

let myLibrary = [
    { 'title': 'Dune', 'author': 'Frank Herbert', 'pages': '412', 'status': true },
    { 'title': 'Nineteen Eighty-Four', 'author': 'George Orwell', 'pages': '328', 'status': true },
    { 'title': 'Pride and Prejudice', 'author': 'Jane Austen', 'pages': '345', 'status': true },
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
            if (value === true) {
                cell.appendChild(generateButton('read'));
                row.appendChild(cell);
            } else if (value === false) {
                cell.appendChild(generateButton('unread'));
                row.appendChild(cell);
            } else {
                cellText = document.createTextNode(value);
                cell.appendChild(cellText);
            }
            row.appendChild(cell);
        }
        // add the row to the end of the table body
        cell = document.createElement('td');
        cell.appendChild(generateButton('delete'));
        row.appendChild(cell);
        tblBody.appendChild(row);

    }
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.getElementById("created_table").replaceChildren(tbl);
}

function generateButton(icon) {
    let readIcon = "<img width='20px' src='img/bookmark-check-fill.svg'>";
    let unreadIcon = "<img width='20px' src='img/bookmark-x-fill.svg'>";
    let deleteIcon = "<img src='img/delete_black_24dp.svg'>";

    let button = document.createElement('button');
    if (icon === 'delete') {
        button.innerHTML = deleteIcon;
        button.className = 'btn delete_button';
    } else if (icon === 'read') {
        button.innerHTML = readIcon;
        button.className = 'btn mark_read_button';
    } else if (icon === 'unread') {
        button.innerHTML = unreadIcon;
        button.className = 'btn mark_unread_button';
    }
    button.type = 'button';
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
    } else {
        addBookToLibrary();
    }
}

document.addEventListener('click', (event) => {
    try {
        let index = event.target.closest('tr').firstChild.innerHTML;
        if (event.target.closest('button').classList.contains('delete_button')) {
            myLibrary.splice(index - 1, 1);
        } else if (event.target.closest('button').classList.contains('mark_read_button')) {
            myLibrary[index - 1].status = false;
        } else if (event.target.closest('button').classList.contains('mark_unread_button')) {
            myLibrary[index - 1].status = true;
        }
        generateTable();
    } catch { }
});
