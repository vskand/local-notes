const newNoteTitleInput = document.getElementById('new-note-title')
const addNewButton = document.getElementById('add-new')
const notesList = document.getElementById("notes-list");
const textArea = document.querySelector('textarea')

addNewButton.addEventListener('click', () => { 
	if (newNoteTitleInput.value.length <= 0) return

	const tempItemId = generateUniqueID()
	const listItem = document.createElement("li")
	listItem.textContent = newNoteTitleInput.value
	listItem.dataset.id = tempItemId

	notesList.appendChild(listItem);

	addNewButton.removeEventListener('click', clickHandler);

	function clickHandler() {
		openNote(tempItemId);
	}

	addNewButton.addEventListener('click', clickHandler);
	openNote(tempItemId)

	newNoteTitleInput.value = ''
})


function openNote(noteId) {
	if (!noteId) return
	textArea.value = localStorage.getItem(noteId)

	textArea.removeEventListener('input', inputHandler)

	function inputHandler() {
		handleTextAreaInput(noteId)
	}
	textArea.addEventListener('input', inputHandler);

	textArea.style.display = 'block'
}

function handleTextAreaInput(noteId) {
	console.log(noteId);
	localStorage.setItem(noteId, textArea.value)
}

function generateUniqueID() {
	return Date.now() + "-" + Math.floor(Math.random() * 1000);
}