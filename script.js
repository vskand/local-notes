const newNoteTitleInput = document.getElementById('new-note-title')
const addNewButton = document.getElementById('add-new')
const notesList = document.getElementById("notes-list")
const textArea = document.querySelector('textarea')
let currentNoteId = null
const notes = JSON.parse(localStorage.getItem("local-notes")) || {};

addNewButton.addEventListener('click', (e) => { 	
	e.stopPropagation()
	e.preventDefault()
	if (newNoteTitleInput.value.length <= 0) return

	const tempItemId = generateUniqueID()
	const listItem = document.createElement("li")
	listItem.textContent = newNoteTitleInput.value
	listItem.dataset.id = tempItemId

	notesList.appendChild(listItem);

	notes[tempItemId] = {
		id: tempItemId,
		title: listItem.textContent,
		content: ''
	}

	listItem.addEventListener('click', () => { openNote(tempItemId) });
	openNote(tempItemId)

	newNoteTitleInput.value = ''
	textArea.focus()
})


textArea.addEventListener('input', () => { handleTextAreaInput() })

function openNote(noteId) {
	if (!noteId) return
	currentNoteId = noteId
	
	textArea.value = notes[currentNoteId]?.content || ''
	
	textArea.style.display = 'block'
}

function handleTextAreaInput() {
	console.log(notes);
	console.log(notes[currentNoteId]?.content);
	
	notes[currentNoteId].content = textArea.value

	localStorage.setItem("local-notes", JSON.stringify(notes));
}

function generateUniqueID() {
	return Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function populateNotesList() { 
	if (notes.length == 0 || notes === null) return
	
	for (const [id, note] of Object.entries(notes)) {	
		const listItem = document.createElement("li")
		listItem.textContent = note.title
		listItem.dataset.id = id
		listItem.addEventListener('click', () => { openNote(id) });

		notesList.appendChild(listItem)
	}
}

populateNotesList()