export default class notesView{
    constructor (root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}){
          this.root = root;
          this.onNoteSelect = onNoteSelect;
          this.onNoteAdd = onNoteAdd;
          this.onNoteEdit = onNoteEdit;
          this.onNoteDelete = onNoteDelete;

          this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add plant!</button>
                <div class="notes__list">
                </div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="Enter plant name...">
                <textarea class="notes__body" >Add plant info...</textarea>
            </div>`;

            const btnAddNote = this.root.querySelector(".notes__add");
            const inputTitle = this.root.querySelector(".notes__title");
            const inputBody = this.root.querySelector(".notes__body");

            btnAddNote.addEventListener("click",() =>{
                this.onNoteAdd();
            });
            //update title and body
            [inputTitle, inputBody].forEach(inputField =>{
                inputField.addEventListener("blur", ()=>{
                    const updatedTitle = inputTitle.value.trim();
                    const updatedBody = inputBody.value.trim();
                    this.onNoteEdit(updatedTitle, updatedBody);
                });
            });
            //TODO: hide note preview 
            //create new item in sidebar
    }
    //underscore denotes priv method
    //create HTML stream for sidebar items
    _createListItemHTML(id, title, body, updated){
        // max characters that appears 
        const MAX_BODY_LENGTH = 60; //TODO: edit values to adjust
        return `
            <div class ="notes__list-item" data-note-id="${id}">
                <div class = "notes__small-title">${title}</div>
                <div class = "notes__small-body">${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class = "notes__small-updated">${updated.toLocaleString(undefined, {dateStyle: "full", timeStyle:"short"})}</div> #use built in time 
            </div>
        `;
    }

    updateNoteList(notes){
        const notesListContainer = this.root.querySelector(".notes__list");
        //empty out list
        notesListContainer.innerHTML ="";
        
        for (const note of notes){
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
    }
    
}