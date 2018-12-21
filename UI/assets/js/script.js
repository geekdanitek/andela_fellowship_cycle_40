/* Delete Modal Script Starts*/
var deleteMeetupModal = document.getElementById('deleteMeetupModal');

var deleteModalButton = document.getElementById('deleteMeetupButton');

var closeModal = document.getElementById('closeModal');


deleteModalButton.addEventListener('click', function() {
	deleteMeetupModal.classList.toggle("show-modal");
});


window.addEventListener('click', function() {
	if (event.target == deleteMeetupModal) {
	    deleteMeetupModal.classList.toggle("show-modal");
	}
});

closeModal.addEventListener('click', function() {
	deleteMeetupModal.classList.toggle("show-modal");
});
/* Delete Modal Script Ends*/
