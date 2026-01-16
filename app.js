let userSeq = [];
let gameSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let canStart = true;
let h2 = document.querySelector("h2");

function startGame(e) {
    if (e && e.target.classList.contains("btn")) return;

    if (!canStart) return;

    started = true;
    canStart = false;
    levelUp();
}

document.addEventListener("keydown", startGame);

document.addEventListener("touchstart", startGame);


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    document.body.style.backgroundColor = "white";

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Tap / Press any key to restart`;
        document.body.style.backgroundColor = "red";
        reset();
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    canStart = true;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
