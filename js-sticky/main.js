// retrieve all existing notes from local storage into browser
const notesContainer = document.getElementById("container");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// save new notes to local storage
function saveNotes(notes){
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// build new HTML elem to represent note
function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", () =>{
        updateNote(id, element.value);
    });

    element.addEventListener("dblclick", () =>{
        const doDelete = confirm("Delete sticky note?");
        if (doDelete){
            deleteNote(id, element);
        }
    });
    return element;
}

// add note
function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() *100000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent){
    console.log("Updating note...");
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element){
    console.log("Deleting note...");
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}