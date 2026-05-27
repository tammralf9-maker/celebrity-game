const celebrities = [
    { name: "Erki Nool", image: "images/erki-nool.jpg", aliases: ["nool", "erki"] },
    { name: "Alar Karis", image: "images/alar-karis.jpg", aliases: ["karis", "president karis"] },
    { name: "Gerd Kanter", image: "images/gerd-kanter.jpg", aliases: ["kanter", "gerd"] },
    { name: "Erika Salumäe", image: "images/erika-salumae.jpg", aliases: ["salumäe", "erika"] },
    { name: "Mait Malmsten", image: "images/mait-malmsten.jpg", aliases: ["malmsten", "mait"] },
    { name: "Ott Sepp", image: "images/ott-sepp.jpg", aliases: ["sepp", "ott"] },
    { name: "Marika Vaarik", image: "images/marika-vaarik.jpg", aliases: ["vaarik", "marika"] },
    { name: "Tanel Padar", image: "images/tanel-padar.jpg", aliases: ["padar", "tanel"] },
    { name: "Kristina Kallas", image: "images/kristina-kallas.jpg", aliases: ["kallas", "kristina"] },
    { name: "Lennart Meri", image: "images/lennart-meri.jpg", aliases: ["meri", "lennart"] },
    { name: "Arvo Pärt", image: "images/arvo-part.jpg", aliases: ["pärt", "arvo"] },
    { name: "Ursula von der Leyen", image: "images/ursula-von-der-leyen.jpg", aliases: ["ursula", "leyen"] },
    { name: "Mark Rutte", image: "images/mark-rutte.jpg", aliases: ["rutte", "mark"] }
];

let currentIndex = 0;
let score = 0;

let revealedCells = [];
let guessedCorrectly = [];

const grid = document.getElementById("grid");
const image = document.getElementById("celebrityImage");

const guessInput = document.getElementById("guessInput");
const checkBtn = document.getElementById("checkBtn");

const feedback = document.getElementById("feedback");

const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const revealBtn = document.getElementById("revealBtn");

function initGame() {

    revealedCells = celebrities.map(() => new Set());
    guessedCorrectly = celebrities.map(() => false);

    totalDisplay.textContent = celebrities.length;

    loadCelebrity();

    updateNavigation();
}

function createGrid() {

    grid.innerHTML = "";

    const cols = 3;

    for (let i = 0; i < cols * cols; i++) {

        const cell = document.createElement("div");

        cell.className = "grid-cell";

        const row = Math.floor(i / cols);
        const col = i % cols;

        cell.style.backgroundImage =
            `url('${celebrities[currentIndex].image}')`;

        // ÕIGE süsteem 3x3 jaoks
        cell.style.backgroundPosition =
            `${col * 50}% ${row * 50}%`;

        if (revealedCells[currentIndex].has(i)) {
            cell.classList.add("revealed");
        }

        cell.addEventListener("click", () => {

            if (!cell.classList.contains("revealed")) {

                cell.classList.add("revealed");

                revealedCells[currentIndex].add(i);
            }
        });

        grid.appendChild(cell);
    }
}

function loadCelebrity() {

    const celeb = celebrities[currentIndex];

    image.src = celeb.image;

    guessInput.value = "";

    feedback.textContent = "";

    if (guessedCorrectly[currentIndex]) {

        image.style.filter = "blur(0px)";

        guessInput.disabled = true;

        checkBtn.disabled = true;

        feedback.textContent =
            `✓ Õige! See on ${celeb.name}`;

        feedback.className = "correct";

    } else {

        image.style.filter = "blur(12px)";

        guessInput.disabled = false;

        checkBtn.disabled = false;
    }

    createGrid();
}

function checkGuess() {

    const guess =
        guessInput.value.trim().toLowerCase();

    const celeb = celebrities[currentIndex];

    const answers = [
        celeb.name.toLowerCase(),
        ...celeb.aliases.map(a => a.toLowerCase())
    ];

    const correct = answers.some(ans =>
        guess.includes(ans) || ans.includes(guess)
    );

    if (correct) {

        feedback.textContent =
            `✓ Õige! See on ${celeb.name}`;

        feedback.className = "correct";

        if (!guessedCorrectly[currentIndex]) {

            guessedCorrectly[currentIndex] = true;

            score++;

            scoreDisplay.textContent = score;
        }

        image.style.filter = "blur(0px)";

        document
            .querySelectorAll(".grid-cell")
            .forEach(cell => {
                cell.classList.add("revealed");
            });

        guessInput.disabled = true;

        checkBtn.disabled = true;

    } else {

        feedback.textContent =
            "✗ Vale vastus!";

        feedback.className = "wrong";
    }
}

function revealAnswer() {

    const celeb = celebrities[currentIndex];

    feedback.textContent =
        `See on ${celeb.name}`;

    image.style.filter = "blur(0px)";

    document
        .querySelectorAll(".grid-cell")
        .forEach(cell => {
            cell.classList.add("revealed");
        });

    guessInput.disabled = true;

    checkBtn.disabled = true;
}

function updateNavigation() {

    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled =
        currentIndex === celebrities.length - 1;
}

function goNext() {

    if (currentIndex < celebrities.length - 1) {

        currentIndex++;

        loadCelebrity();

        updateNavigation();
    }
}

function goPrev() {

    if (currentIndex > 0) {

        currentIndex--;

        loadCelebrity();

        updateNavigation();
    }
}

checkBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keypress", e => {

    if (e.key === "Enter") {
        checkGuess();
    }
});

nextBtn.addEventListener("click", goNext);

prevBtn.addEventListener("click", goPrev);

revealBtn.addEventListener("click", revealAnswer);

initGame();
