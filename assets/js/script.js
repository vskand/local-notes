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

textArea.addEventListener('input', () => { handleTextAreaInput() })

function createNoteItem(noteData) {

	const tempItemId = noteData.id || generateUniqueID()
	const listItem = document.createElement("li")
	const title = document.createElement("span")
	const deleteBtn = document.createElement("button")
	const trashIcon = document.createElement("img")

	trashIcon.src = "assets/svg/trash-can.svg"
	trashIcon.width = "16"
	trashIcon.height = "16"

	title.textContent = noteData.title || noteData
	title.tabIndex = 0
	title.dataset.id = tempItemId

	deleteBtn.appendChild(trashIcon)
	deleteBtn.classList.add('delete-btn')
	deleteBtn.dataset.id = tempItemId

	listItem.appendChild(title)
	listItem.appendChild(deleteBtn)
	listItem.dataset.id = tempItemId

	notesList.appendChild(listItem);

	notes[tempItemId] = {
		id: tempItemId,
		title: title.textContent,
		content: noteData.content || ''
	}

	title.addEventListener('click', (event) => {
		openNote(tempItemId)
		setAsActive(event.target)
	})
	deleteBtn.addEventListener('click', () => { deleteNote(tempItemId) })

	return tempItemId
}

function openNote(noteId) {
	if (!noteId) return
	currentNoteId = noteId
	
	textArea.value = notes[currentNoteId]?.content || ''
	
	textArea.classList.remove('hidden')
	textArea.focus()
}

function setAsActive(element) {	
	notesList.querySelector('.active')?.classList.remove('active')
	element.closest('li').classList.add('active')
}

function deleteNote(noteId) { 
	if (!noteId) return

	if (noteId === currentNoteId) { 
		textArea.value = ''
	}
	currentNoteId = noteId
	
	delete notes[currentNoteId]
	localStorage.setItem("local-notes", JSON.stringify(notes))
	document.querySelector(`[data-id="${noteId}"]`).classList.add('hidden')	
}

function handleTextAreaInput() {
	notes[currentNoteId].content = textArea.value

	localStorage.setItem("local-notes", JSON.stringify(notes));
}

function populateNotesList() { 
	notesList.innerHTML = ''
	if (Object.keys(notes).length === 0 || notes === null) return
	
	for (const [id, note] of Object.entries(notes)) {	
		createNoteItem(note)
	}
}

function generateUniqueID() {
	return Date.now() + "-" + Math.floor(Math.random() * 1000);
}

populateNotesList()