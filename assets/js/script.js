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
	
	const noteItemId = createNoteItem(newNoteTitleInput.value)
	
	openNote(noteItemId)

	newNoteTitleInput.value = ''
	textArea.focus()
})

function createNoteItem(noteData) {

	const tempItemId = noteData.id || generateUniqueID()
	const listItem = document.createElement("li")
	const title = document.createElement("span")
	const deleteBtn = document.createElement("button")
	const trachIcon = document.createElement("img")

	trachIcon.src = "assets/svg/trash-can.svg"
	trachIcon.width = "16"
	trachIcon.height = "16"

	title.textContent = noteData.title || noteData
	title.dataset.id = tempItemId
	title.tabIndex = 0
	deleteBtn.appendChild(trachIcon)
	deleteBtn.classList.add = 'delete-btn'
	deleteBtn.dataset.id = tempItemId

	listItem.appendChild(title)
	listItem.appendChild(deleteBtn)

	notesList.appendChild(listItem);

	notes[tempItemId] = {
		id: tempItemId,
		title: title.textContent,
		content: noteData.content || ''
	}

	title.addEventListener('click', () => { openNote(tempItemId) })
	deleteBtn.addEventListener('click', () => { deleteNote(tempItemId) })

	return tempItemId
}
textArea.addEventListener('input', () => { handleTextAreaInput() })

function openNote(noteId) {
	if (!noteId) return
	currentNoteId = noteId
	
	textArea.value = notes[currentNoteId]?.content || ''
	
	textArea.style.display = 'block'
}

function deleteNote(noteId) { 
	if (!noteId) return
	currentNoteId = noteId
	
	delete notes[currentNoteId]
	localStorage.setItem("local-notes", JSON.stringify(notes))
	populateNotesList()
}

function handleTextAreaInput() {
	notes[currentNoteId].content = textArea.value

	localStorage.setItem("local-notes", JSON.stringify(notes));
}

function populateNotesList() { 
	notesList.innerHTML = ''
	if (notes.length == 0 || notes === null) return
	
	for (const [id, note] of Object.entries(notes)) {	
		createNoteItem(note)
	}
}

function generateUniqueID() {
	return Date.now() + "-" + Math.floor(Math.random() * 1000);
}

populateNotesList()