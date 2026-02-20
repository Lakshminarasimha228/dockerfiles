let board;
let score = 0;
let best = localStorage.getItem("bestScore") || 0;

window.onload = function() {
    document.getElementById("best").innerText = best;
    setGame();
    document.addEventListener("keyup", handleInput);
    addSwipeSupport();
}

function restartGame() {
    score = 0;
    document.getElementById("game-over").style.display = "none";
    setGame();
}

function setGame() {
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function renderBoard() {
    let grid = document.getElementById("grid-container");
    grid.innerHTML = "";
    document.getElementById("score").innerText = score;

    if(score > best){
        best = score;
        localStorage.setItem("bestScore", best);
        document.getElementById("best").innerText = best;
    }

    for (let r=0; r<4; r++) {
        for (let c=0; c<4; c++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");

            let value = board[r][c];
            if (value !== 0) {
                tile.innerText = value;
                tile.classList.add("tile-" + value);
            }
            grid.append(tile);
        }
    }

    if (isGameOver()) {
        document.getElementById("game-over").style.display = "flex";
    }
}

function addRandomTile() {
    let empty = [];
    for (let r=0; r<4; r++)
        for (let c=0; c<4; c++)
            if (board[r][c] === 0)
                empty.push({r, c});

    if (empty.length === 0) return;

    let spot = empty[Math.floor(Math.random() * empty.length)];
    board[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;
}

function handleInput(e) {
    move(e.key);
}

function move(direction){
    let oldBoard = JSON.stringify(board);

    if (direction === "ArrowLeft") slideLeft();
    if (direction === "ArrowRight") slideRight();
    if (direction === "ArrowUp") slideUp();
    if (direction === "ArrowDown") slideDown();

    if (JSON.stringify(board) !== oldBoard) {
        addRandomTile();
        renderBoard();
    }
}

function filterZero(row) {
    return row.filter(num => num !== 0);
}

function slide(row) {
    row = filterZero(row);

    for (let i=0; i<row.length-1; i++) {
        if (row[i] === row[i+1]) {
            row[i] *= 2;
            score += row[i];
            row[i+1] = 0;
        }
    }

    row = filterZero(row);
    while (row.length < 4) row.push(0);
    return row;
}

function slideLeft() {
    for (let r=0; r<4; r++)
        board[r] = slide(board[r]);
}

function slideRight() {
    for (let r=0; r<4; r++)
        board[r] = slide(board[r].reverse()).reverse();
}

function slideUp() {
    for (let c=0; c<4; c++) {
        let col = [board[0][c],board[1][c],board[2][c],board[3][c]];
        col = slide(col);
        for (let r=0; r<4; r++) board[r][c] = col[r];
    }
}

function slideDown() {
    for (let c=0; c<4; c++) {
        let col = [board[0][c],board[1][c],board[2][c],board[3][c]].reverse();
        col = slide(col).reverse();
        for (let r=0; r<4; r++) board[r][c] = col[r];
    }
}

function isGameOver() {
    for (let r=0; r<4; r++)
        for (let c=0; c<4; c++)
            if (board[r][c] === 0) return false;

    for (let r=0; r<4; r++)
        for (let c=0; c<3; c++)
            if (board[r][c] === board[r][c+1]) return false;

    for (let c=0; c<4; c++)
        for (let r=0; r<3; r++)
            if (board[r][c] === board[r+1][c]) return false;

    return true;
}

function addSwipeSupport() {
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener("touchstart", function(e){
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener("touchend", function(e){
        let dx = e.changedTouches[0].screenX - touchStartX;
        let dy = e.changedTouches[0].screenY - touchStartY;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30) move("ArrowRight");
            else if (dx < -30) move("ArrowLeft");
        } else {
            if (dy > 30) move("ArrowDown");
            else if (dy < -30) move("ArrowUp");
        }
    });
}