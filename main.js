const main = document.getElementsByClassName("main")[0];
const cards = [];
const dropZones = [];

let draggingCard;
let dropzoneFromDraggingCard;
let changedCard;

function dragOver(event) {
  this.classList.remove("possibleToDrop");
  this.classList.add("highlight");

  changedCard = this.childNodes[0];
  event.preventDefault();
}

function dragLeave() {
  this.classList.add("possibleToDrop");
  this.classList.remove("highlight");
}

function drop() {
  this.classList.remove("highlight");
  this.appendChild(draggingCard);
  dropzoneFromDraggingCard.appendChild(changedCard);
}

const createDropZonesToCards = () => {
  for (let i = 0; i < 9; i++) {
    const dropZone = document.createElement("div");
    dropZone.className = "dropZone";

    dropZones.push(dropZone);
    main.appendChild(dropZone);
  }
};

function dragStart() {
  this.classList.add("is-dragging");

  draggingCard = this;
  dropzoneFromDraggingCard = this.parentNode;

  dropZones.forEach((dropZone) => dropZone.classList.add("possibleToDrop"));
}
function dragEnd() {
  this.classList.remove("is-dragging");

  draggingCard = null;
  dropzoneFromDraggingCard = null;

  dropZones.forEach((dropZone) => dropZone.classList.remove("possibleToDrop"));
}

const createCardsToDrag = () => {
  for (let i = 0; i < 9; i++) {
    const card = document.createElement("div");

    card.className = "cards";
    card.innerHTML = i + 1;
    card.draggable = true;

    cards.push(card);

    dropZones[i].appendChild(card);
  }
};

const execution = () => {
  createDropZonesToCards();
  createCardsToDrag();

  dropZones.forEach((dropZone) => {
    dropZone.addEventListener("dragover", dragOver);
    dropZone.addEventListener("dragleave", dragLeave);
    dropZone.addEventListener("drop", drop);
  });

  cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
  });
};

execution();
