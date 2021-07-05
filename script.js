// Etch-A-Sketch Script File - ODIN Project



// title fading in 
const title = document.querySelector('.title')
window.onload = () => {
    title.classList.toggle('fadeInText')
    createGrid()
}


const modeButtons = document.querySelectorAll('.mode')
let mode = 'black'

const gridContainer = document.querySelector('.grid-container')


// squares handling

function createGrid(dimension) {
    if (dimension != null) {
        gridContainer.style.setProperty('--grid-dimension', dimension)
    } else {
        dimension = 16
    }
    for (let i = 0; i < (dimension * dimension); i++) {
        let square = document.createElement("div")
        square.addEventListener('mouseover', colorSquare)
        gridContainer.appendChild(square).className = "grid-item"
    }
}



// selecting color function

function colorSquare() {
    switch (mode) {
        case 'eraser':
            Eraser()
            break;
        case 'black':
            blackPen()
            break;
        case 'rainbow':
            rainbowColor()
            break;
        default:
            blackPen()
            break;
    }

}


//color changing functions

// changing to white
function Eraser() {
    let squares = gridContainer.querySelectorAll('div')
    squares.forEach(sqr => sqr.addEventListener('mouseover', (e) => {
        if (e.target.style.backgroundColor != 'white') {
            e.target.style.backgroundColor = 'white'
        }
    }))
}

// changing to black 
function blackPen() {
    let squares = gridContainer.querySelectorAll('div')
    squares.forEach(sqr => sqr.addEventListener('mouseover', (e) => {
        if (e.target.style.backgroundColor != 'black') {
            e.target.style.backgroundColor = 'black'
        } else if ((e.target.style.backgroundColor == 'black') && (e.target.style.opacity != '1')) {
            e.target.style.opacity = '1'
        }

    }))
}

// random color changing  
function rainbowColor() {
    let squares = gridContainer.querySelectorAll('div')
    squares.forEach(sqr => sqr.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }))
}

// mode buttons 

// clear button 
const clear = document.querySelector('#clear')
clear.addEventListener('click', clearAll)

// clear all squares
function clearAll() {
    let squares = gridContainer.querySelectorAll('div')
    squares.forEach(sqr => sqr.style.backgroundColor = 'white')
}


// resizing button
const resize = document.querySelector('#resize')
resize.addEventListener('click', resizing)

// resize squares
function resizing() {
    // clearing 
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    //recreating
    newSize = prompt('Please give a number between 1 and 64 or nothing to just clear')
    if ((newSize < 1) || (newSize > 64)) {
        alert("you must give a number between 1-64")
    } else {
        createGrid(newSize)
    }
}

// selecting mode function - on button click
function changeMode(event) {
    console.log(event.target.id)
    switch (event.target.id) {
        case 'black':
            mode = 'black';
            break;
        case 'eraser':
            mode = 'eraser';
            break;
        case 'rainbow':
            mode = 'rainbow';
            break;
        default:
            mode = 'black';
            break;
    }
}


// Event Listeners
modeButtons.forEach(btn => btn.addEventListener('click', changeMode))