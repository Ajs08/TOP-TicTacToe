function checkWinner(a, b, c) {
    return [a, b, c].every(element => element === a && element !== undefined);
}

function gameResult(board) {
    if (checkWinner(board.one, board.two, board.three)) {
        alert(`Player ${board.one} wins.`);
    } else if (checkWinner(board.four, board.five, board.six)) {
        alert(`Player ${board.four} wins.`);
    } else if (checkWinner(board.seven, board.eight, board.nine)) {
        alert(`Player ${board.seven} wins.`);
    } else if (checkWinner(board.one, board.four, board.seven)) {
        alert(`Player ${board.one} wins.`);
    } else if (checkWinner(board.two, board.five, board.eight)) {
        alert(`Player ${board.two} wins.`);
    } else if (checkWinner(board.three, board.six, board.nine)) {
        alert(`Player ${board.three} wins.`);
    } else if (checkWinner(board.one, board.five, board.nine)) {
        alert(`Player ${board.one} wins.`);
    } else if (checkWinner(board.three, board.five, board.seven)) {
        alert(`Player ${board.three} wins.`);
    } else if (Object.values(board).length === 9 && Object.values(board).every(x => x !== "")) {
        alert("It's a tie, no one wins.");
    }
}

const boardCells = document.querySelectorAll(".cell");

let clicks = 0;
const board = {};

boardCells.forEach(
    cell => cell.addEventListener("click", (evt) => {
        evt.target.style.pointerEvents = "none";

        clicks += 1;

        evt.target.textContent = clicks % 2 !== 0 ? "X" : "O";
        evt.target.style.color = evt.target.textContent === "X" ? "red" : "blue";
        board[evt.target.dataset.cellValue] = evt.target.textContent;

        gameResult(board);
    })
);

