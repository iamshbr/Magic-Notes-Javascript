let addBtn = document.getElementById("addBtn");
showNotes();
addBtn.addEventListener('click', function (e) {
    e.preventDefault;
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes_obj = [];
    }
    else {
        notes_obj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value, 
        notes: addTxt.value, 
    };
    notes_obj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notes_obj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

//function to show notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notes_obj = [];
    }
    else {
        notes_obj = JSON.parse(notes);
    }
    let html = "";
    notes_obj.forEach(function (element, index) {
        html += ` 
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.notes}</p>
                        <button onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`
    });

    let showNote = document.getElementById('notes');
    if (notes_obj.length != 0) {
        showNote.innerHTML = html;
    }
    else {
        showNote.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`
    }
}


//function to delete note.
function deleteNote(index){
    notes_obj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes_obj));
    showNotes();
}


//searching note
let search = document.getElementById("search-txt");
search.addEventListener("input", function(){
    let inputval = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});

/*

Further Features
1. Add Title
2. Mark a note as important
3. Seperate notes by user.
4. Sync and host to a web server
*/