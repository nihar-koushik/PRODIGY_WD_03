const cells = document.querySelectorAll(".cell");
const reset = document.querySelector("#reset");
const message = document.createElement("h2");
document.body.appendChild(message);

let turn = true;
let gameOver = false;

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (gameOver || cell.innerText) return;

        cell.innerText = turn ? "X" : "O";
        cell.disabled = true;

        if (checkWin()) {
            message.innerText = `${turn ? "X" : "O"} wins!`;
            gameOver = true;
            cells.forEach(c => c.disabled = true);
        } else if ([...cells].every(c => c.innerText)) {
            message.innerText = "It's a draw!";
            gameOver = true;
        } else {
            turn = !turn;
        }
    });
});

reset.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.disabled = false;
        cell.style.background = "";
    });
    message.innerText = "";
    turn = true;
    gameOver = false;
});

function checkWin() {
    return winCombos.some(([a, b, c]) => {
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            [a, b, c].forEach(i => cells[i].style.background = "lightgreen");
            return true;
        }
        return false;
    });
}