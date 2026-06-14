const inputText = document.getElementById("input-area");
const btn = document.getElementById("save-button");
const savedNote = document.getElementById("saved-notes");
let noteList = JSON.parse(localStorage.getItem("note-data")) || [];

function updateData(){
    // Don't save empty notes if the user just clicks the button blindly
    if(inputText.value.trim() === "") return; 

    let data = inputText.value;
    noteList.push(data);
    localStorage.setItem("note-data", JSON.stringify(noteList));
    renderNote();
    inputText.value = ""; // Clear the input box for the next note!
}

function renderNote(){
    savedNote.innerHTML = "";
    
    // Fallback check: If the array is empty, show a friendly message
    if(noteList.length === 0) {
        savedNote.innerText = "No notes saved yet";
        return;
    }

    noteList.forEach(function(log){
        let newItem = document.createElement("p"); // Added 'let' to avoid global variable leak
        newItem.innerText = log;
        savedNote.appendChild(newItem);
    });      
}

btn.addEventListener("click", updateData);

// Run the engine instantly when the browser boots up!
renderNote();