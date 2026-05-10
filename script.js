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
    { name: "Lennart Meri", image: "images/lennart-meri.jpg", aliases: ["meri", "lennart", "president meri"] },
    { name: "Arvo Pärt", image: "images/arvo-part.jpg", aliases: ["pärt", "arvo"] },
    { name: "Ursula von der Leyen", image: "images/ursula-von-der-leyen.jpg", aliases: ["von der leyen", "ursula", "leyen"] },
    { name: "Mark Rutte", image: "images/mark-rutte.jpg", aliases: ["rutte", "mark"] }
];

let currentIndex = 0;
let score = 0;
let revealedCells = [];
let guessedCorrectly = [];

const grid = document.getElementById('grid');
const image = document.getElementById('celebrityImage');
const guessInput = document.getElementById('guessInput');
const checkBtn = document.getElementById('checkBtn');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score');
const totalDisplay = document.getElementById('total');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const revealBtn = document.getElementById('revealBtn');

function initGame() {
    celebrities.sort(() => Math.random() - 0.5);
    revealedCells = celebrities.map(() => new Set());
    guessedCorrectly = celebrities.map(() => false);
    
    currentIndex = 0;
    score = 0;
    scoreDisplay.textContent = score;
    totalDisplay.textContent = celebrities.length;
    
    loadCelebrity();
    updateNavigation();
}

function createGrid() {
    grid.innerHTML = '';
    const cols = 5;
    
    for (let i = 0; i < cols * cols; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;

        // Arvuta background position
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = col * 25;
        const y = row * 25;
        
        cell.style.backgroundImage = `url('${celebrities[currentIndex].image}')`;
        cell.style.backgroundPosition = `-${x}% -${y}%`;

        if (revealedCells[currentIndex].has(i)) {
            cell.classList.add('revealed');
        }

        cell.addEventListener('click', () => {
            if (!cell.classList.contains('revealed')) {
                cell.classList.add('revealed');
                revealedCells[currentIndex].add(i);
            }
        });

        grid.appendChild(cell);
    }
}

function loadCelebrity() {
    const celeb = celebrities[currentIndex];
    image.src = celeb.image;
    guessInput.value = '';
    feedback.textContent = '';
    
    if (guessedCorrectly[currentIndex]) {
        feedback.textContent = `✓ Õige! See on ${celeb.name}`;
        feedback.className = 'correct';
        guessInput.disabled = true;
        checkBtn.disabled = true;
        // Kogu pilt teravaks
        image.style.filter = 'blur(0)';
    } else {
        image.style.filter = 'blur(12px)';
        guessInput.disabled = false;
        checkBtn.disabled = false;
    }
    
    createGrid();
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const celeb = celebrities[currentIndex];
    const answers = [celeb.name.toLowerCase(), ...celeb.aliases.map(a => a.toLowerCase())];

    if (answers.some(ans => guess.includes(ans) || ans.includes(guess))) {
        feedback.textContent = `✓ Õige! See on ${celeb.name}`;
        feedback.className = 'correct';
        
        if (!guessedCorrectly[currentIndex]) {
            guessedCorrectly[currentIndex] = true;
            score++;
            scoreDisplay.textContent = score;
        }
        
        image.style.filter = 'blur(0)';
        document.querySelectorAll('.grid-cell').forEach(c => c.classList.add('revealed'));
        guessInput.disabled = true;
        checkBtn.disabled = true;
    } else {
        feedback.textContent = '✗ Vale, proovi uuesti!';
        feedback.className = 'wrong';
        guessInput.value = '';
        guessInput.focus();
    }
}

function revealAnswer() {
    const celeb = celebrities[currentIndex];
    feedback.textContent = `See on ${celeb.name}`;
    feedback.className = '';
    image.style.filter = 'blur(0)';
    document.querySelectorAll('.grid-cell').forEach(c => c.classList.add('revealed'));
    guessInput.disabled = true;
    checkBtn.disabled = true;
}

function updateNavigation() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === celebrities.length - 1;
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

// Event listeners
checkBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', e => { if (e.key === 'Enter') checkGuess(); });
nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);
revealBtn.addEventListener('click', revealAnswer);

// Start
initGame();