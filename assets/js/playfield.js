const modal = document.querySelector('.modal')

const modes = {
    'Easy': 5,
    'Normal': 8,
    'Hard':12
}

const currentMines = modes[localStorage.getItem('mode')]

startGame(8, 8, currentMines);

function startGame(WIDTH, HEIGHT, BOMBS_COUNT ) {
const field = document.querySelector('.field');
const cellsCount = WIDTH * HEIGHT;
field.innerHTML = '<button></button>'.repeat(cellsCount);
const cells =[...field.children];

let closedCount = cellsCount;

const bombs = [...Array(cellsCount).keys()]
.sort(() => Math.random() - 0.5)
.slice(0, BOMBS_COUNT);

const audio = document.createElement('audio');
    audio.src = 'path_to_music_file.mp3';
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = 0.5;

   
    field.appendChild(audio);


field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
       return; 
    }

const index = cells.indexOf(event.target);
const column = index % WIDTH
const row = Math.floor(index / WIDTH);
open(row, column);
});

function isValid(row, column){
   return row >=0 
   && row < HEIGHT 
   && column >= 0
   && column < WIDTH;
}

function getCount(row, column) {
    let count = 0; 
    for (let x = -1; x <=1; x++) {
        for(let y= -1; y <=1; y++) {
            if (isBomb(row + y, column + x)) {
                count++;
            }
        }
    }
    return count;
}

function open(row, column) {
if (!isValid(row, column)) return;
    
const index = row * WIDTH + column;
const cell = cells[index];
if(cell.disabled === true) return;

cell.disabled = true;

if(isBomb(row, column)){
cell.innerHTML = "<img src='/assets/images/mine.webp' alt='Mine'>";
modal.classList.add('open')
return;
}

closedCount--;
if (closedCount <= BOMBS_COUNT){
    const modalTitle = document.querySelector('.modal_box h2')
    modalTitle.innerText = "YOU WON"
    modal.classList.add('open')
    return;
}
const count = getCount(row , column);
if (count !== 0) {
    cell.innerHTML = count;
    return;
}
for (let x = -1; x <=1; x++) {
    for(let y= -1; y <=1; y++) {
        open(row + y, column + x);
        }
    }
}

function isBomb(row, column) {
    if(!isValid(row, column)) return false; 
    const index = row * WIDTH + column;

    return bombs.includes(index);
}
}

