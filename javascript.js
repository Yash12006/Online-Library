console.log('Hello');
show();
let form = document.getElementById('form');
form.addEventListener('submit', addBook);

class Booklist {
    constructor(name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }


}
function addBook(e) {
    e.preventDefault();
    let name = document.getElementById('book').value;
    let author = document.getElementById('Author').value;
    let romance = document.getElementById('Romance');
    let mystery = document.getElementById('Mystery');
    let fiction = document.getElementById('Fiction');
    let ans;
    if (fiction.checked) {
        ans = fiction.value;
    }
    else if (romance.checked) {
        ans = romance.value;
    }
    else if (mystery.checked) {
        ans = mystery.value;
    }
    let bookObj = new Booklist(name, author, ans);
    console.log(bookObj);

    let books = [];
    let note = JSON.parse(localStorage.getItem('books'));
    if(note==null)
    {
        books.push(bookObj);
        localStorage.setItem('books',JSON.stringify(books));

    }
    else{
        let note=JSON.parse(localStorage.getItem('books'));
        if(containsObject(bookObj,note))
        {
            let msg=document.getElementById('message');
            msg.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Already Present!</strong> Please insert only new books.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
            setTimeout(()=>{
                msg.innerHTML=``;
            },2000)

        }
        else
        {
        note.push(bookObj);
        localStorage.setItem('books',JSON.stringify(note));
        console.log(note);
        }
    }
    show();
}



function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name==obj.name && list[i].author==obj.author) {
            return true;
        }
    }

    return false;
}

function show()
{
    let note=JSON.parse(localStorage.getItem('books'));
    let books=document.getElementById('insertbooks')
    books.innerHTML=``;
    for( i=0;i<note.length;i++)
    {
        books.innerHTML+=`<tr id='${i}'>
                        <td>${note[i].name}</td>
                        <td>${note[i].author}</td>
                        <td>${note[i].genre}</td>
                        <td><button type="button" class="btn btn-link" onclick='Delete(${i})'>Link</button></td>
                        </tr>`
    }
}

function Delete(index)
{
    let note=JSON.parse(localStorage.getItem('books'));
    note.splice(index,1);
    localStorage.setItem('books',JSON.stringify(note));
    show();
}