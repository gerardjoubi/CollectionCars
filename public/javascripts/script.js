document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

// Get the modal
var modalCar = document.getElementById("modal-car");
var modalPiece = document.getElementById("modal-piece");

// Get the button that opens the modal
var carFromBtn = document.getElementById("create-car-form");
var pieceFromBtn = document.getElementById("create-piece-form");

// Get the <span> element that closes the modal
var spanCar = document.getElementById("close-car");
var spanPiece = document.getElementById("close-piece");

// When the user clicks on the button, open the modal
carFromBtn.onclick = () => openModal(modalCar);
pieceFromBtn.onclick = () => openModal(modalPiece);

// When the user clicks on <span> (x), close the modal
spanCar.onclick = () => closeModalOnSpan(modalCar);
spanPiece.onclick = () => closeModalOnSpan(modalPiece);
// When the user clicks anywhere outside of the modal, close it

window.onclick = function(event) {
  if (event.target == modalCar) {
    modalCar.style.display = "none";
  } else if (event.target == modalPiece) {
    modalPiece.style.display = "none";
  }
};

function openModal(oneModal) {
  oneModal.style.display = "block";
}

function closeModalOnSpan(oneModal) {
  oneModal.style.display = "none";
}
