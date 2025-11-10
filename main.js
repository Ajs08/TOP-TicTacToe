function createPlayer(name, marker, color) {
    let score = 0;

    const addPoint = () => score++;
    const resetScore = () => score = 0;
    const getScore = () => score;

    return { name, marker, color, addPoint, getScore, resetScore };
}

const GameController = (() => {
    const boardCells = document.querySelectorAll(".cell");
    const winnerLabel = document.querySelector("#winner");

    const playerXScore = document.querySelector("#playerx-score");
    const playerOScore = document.querySelector("#playero-score");
    const tieScore = document.querySelector("#tie-score");

    const newGameBtn = document.querySelector("#new-game");
    const resetBtn = document.querySelector("#reset-score");

    const playerX = createPlayer("Player X", "X", "red");
    const playerO = createPlayer("Player O", "O", "blue");
    const players = [playerX, playerO];
    let activePlayer = players[0];

    let board = {};

    const disableBoard = () => boardCells.forEach(cell => cell.style.pointerEvents = "none");

    const resetBoard = () => {
        boardCells.forEach(cell => {
            cell.textContent = "";
            cell.style.pointerEvents = "auto";
        });
        winnerLabel.textContent = "";
        setMarkers = 0;
        board = {};
        activePlayer = playerX;
    };

    const switchPlayer = () => {
        activePlayer = activePlayer === playerX ? playerO : playerX;
    };

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

    boardCells.forEach(cell => {
        cell.addEventListener("click", (evt) => {
            evt.target.style.pointerEvents = "none";

            const cellValue = evt.target.dataset.cellValue;
            evt.target.textContent = activePlayer.marker;
            evt.target.style.color = activePlayer.color;
            board[cellValue] = activePlayer.marker;

            const result = gameResult(board);

            if (result === "X") {
                playerX.addPoint();
                playerXScore.textContent = playerX.getScore();
                winnerLabel.textContent = `${playerX.name} Wins!`;
                disableBoard();
            } else if (result === "O") {
                playerO.addPoint();
                playerOScore.textContent = playerO.getScore();
                winnerLabel.textContent = `${playerO.name} Wins!`;
                disableBoard();
            } else if (result === "T") {
                tieScore.textContent = Number(tieScore.textContent) + 1;
                winnerLabel.textContent = "It's a Tie!";
                disableBoard();
            } else {
                switchPlayer();
            }
        });
    });

    newGameBtn.addEventListener("click", resetBoard);

    resetBtn.addEventListener("click", () => {
        resetBoard();
        playerX.resetScore();
        playerO.resetScore();
        tieScore.textContent = 0;
        playerXScore.textContent = 0;
        playerOScore.textContent = 0;
    });
})();
