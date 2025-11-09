function checkWinner(a, b, c) {
    return [a, b, c].every(element => element === a && element !== undefined);
}

function gameResult(board) {
    if (checkWinner(board.one, board.two, board.three)) {
        return board.one;
    } else if (checkWinner(board.four, board.five, board.six)) {
        return board.four;
    } else if (checkWinner(board.seven, board.eight, board.nine)) {
        return board.seven;
    } else if (checkWinner(board.one, board.four, board.seven)) {
        return board.one;
    } else if (checkWinner(board.two, board.five, board.eight)) {
        return board.two;
    } else if (checkWinner(board.three, board.six, board.nine)) {
        return board.three;
    } else if (checkWinner(board.one, board.five, board.nine)) {
        return board.one;
    } else if (checkWinner(board.three, board.five, board.seven)) {
        return board.three;
    } else if (Object.values(board).length === 9 && Object.values(board).every(x => x !== "")) {
        return "T";
    }
}

const boardCells = document.querySelectorAll(".cell");
const winnerLabel = document.querySelector("#winner");

const playerXScore = document.querySelector("#playerx-score");
const playerOScore = document.querySelector("#playero-score");
const tieScore = document.querySelector("#tie-score");

const newGameBtn = document.querySelector("#new-game");
const resetBtn = document.querySelector("#reset-score");

let clicks = 0;
const board = {};
const gameResults = {};

boardCells.forEach(
    cell => cell.addEventListener("click", (evt) => {
        evt.target.style.pointerEvents = "none";

        clicks += 1;

        evt.target.textContent = clicks % 2 !== 0 ? "X" : "O";
        evt.target.style.color = evt.target.textContent === "X" ? "red" : "blue";
        board[evt.target.dataset.cellValue] = evt.target.textContent;

        const result = gameResult(board);
        console.log(result);

        if (result === "X") {
            playerXScore.textContent = Number(playerXScore.textContent) + 1;
            boardCells.forEach(cell => cell.style.pointerEvents = "none");
        } else if (result === "O") {
            playerOScore.textContent = Number(playerOScore.textContent) + 1;
            boardCells.forEach(cell => cell.style.pointerEvents = "none");
        } else if (result === "T") {
            tieScore.textContent = Number(tieScore.textContent) + 1;
            boardCells.forEach(cell => cell.style.pointerEvents = "none");
        }
    })
);

newGameBtn.addEventListener("click", () => {
    boardCells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto"
    });

    clicks = 0;
    Object.keys(board).forEach(key => delete board[key]);
})

resetBtn.addEventListener("click", () => {
    boardCells.forEach(cell => {
        cell.textContent = "";
        cell.style.pointerEvents = "auto"
    });

    [playerOScore, playerXScore, tieScore].forEach(x => x.textContent = 0); 
});
