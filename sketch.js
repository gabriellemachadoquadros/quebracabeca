function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let puzzleImages = []; // Array de imagens, uma para cada nível
let gridSize = 4; // 4x4 grid
let grid = [];
let revealed = [];
let currentQuestion;
let level = 1;
let totalLevels = 10;
let currentPiece = 0;
let score = 0;
let inputBox;
let submitButton;

function preload() {
  // Carregue diferentes imagens para cada nível
  for (let i = 1; i <= totalLevels; i++) {
    puzzleImages.push(loadImage(`gatinhooo.jpg`, 'bebe.jpg', 'dengo.jpg', 'fofuuh.jpg', 'mimoh.jpg', 'moie.jpg', 'polaco.jpeg', 'primeirogato.jpg', 'stitch-1.jpg', 'stitch-2.jpg')); // Substitua com os nomes das suas imagens
  }
}

function setup() {
  createCanvas(400, 500);
  setupGrid();
  generateQuestion();

  // Cria o campo de entrada e botão
  inputBox = createInput('');
  inputBox.position(100, 470);
  inputBox.size(150);

  submitButton = createButton('Enviar');
  submitButton.position(260, 470);
  submitButton.mousePressed(checkAnswer);
}

function setupGrid() {
  let pieceWidth = width / gridSize;
  let pieceHeight = (height - 100) / gridSize;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid.push({
        x: x * pieceWidth,
        y: y * pieceHeight,
        w: pieceWidth,
        h: pieceHeight,
      });
      revealed.push(false);
    }
  }
}

function draw() {
  background(220);

  drawPuzzle();
  drawUI();

  if (currentPiece >= grid.length && level > totalLevels) {
    textAlign(CENTER, CENTER);
    fill(0, 200, 0);
    textSize(32);
    text('Parabéns! Você venceu!', width / 2, height / 2);
    noLoop();
  }
}

function drawPuzzle() {
  for (let i = 0; i < grid.length; i++) {
    let piece = grid[i];
    if (revealed[i]) {
      image(
        puzzleImages[level - 1], // Exibe a imagem do nível atual
        piece.x,
        piece.y,
        piece.w,
        piece.h,
        piece.x,
        piece.y,
        piece.w,
        piece.h
      );
    } else {
      fill(100);
      rect(piece.x, piece.y, piece.w, piece.h);
    }
  }
}

function drawUI() {
  fill(255);
  rect(0, 400, width, 100);

  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text(`Nível: ${level} / ${totalLevels}`, 10, 410);
  text(`Pontuação: ${score}`, 10, 440);

  textAlign(CENTER, CENTER);
  textSize(20);
  text(`Pergunta: ${currentQuestion.question}`, width / 2, 425);
}

function generateQuestion() {
  let a = int(random(10, 20)) * level; // Aumenta o intervalo com o nível
  let b = int(random(2, 10)) * level; // Números maiores para multiplicação e divisão
  let operations = ['+', '-', '*', '/'];
  let operation = random(operations);

  if (operation === '/') {
    a = a * b; // Garante divisão exata
    currentQuestion = {
      question: `${a} ÷ ${b}`,
      answer: a / b,
    };
  } else if (operation === '*') {
    currentQuestion = {
      question: `${a} × ${b}`,
      answer: a * b,
    };
  } else if (operation === '+') {
    currentQuestion = {
      question: `${a} + ${b}`,
      answer: a + b,
    };
  } else if (operation === '-') {
    currentQuestion = {
      question: `${a} - ${b}`,
      answer: a - b,
    };
  }
}

function checkAnswer() {
  let input = inputBox.value();
  if (input !== '' && int(input) === currentQuestion.answer) {
    revealed[currentPiece] = true;
    currentPiece++;
    score += 10;

    if (currentPiece % grid.length === 0) {
      level++;
      if (level > totalLevels) {
        return;
      }
      resetLevel(); // Reinicia o nível com nova imagem e perguntas mais difíceis
    }
    generateQuestion();
    inputBox.value(''); // Limpa o campo de entrada
  } else {
    alert('Resposta incorreta! Tente novamente.');
  }
}

function resetLevel() {
  // Reinicia o grid e as perguntas para o próximo nível
  grid = [];
  revealed = [];
  currentPiece = 0;
  setupGrid();
  generateQuestion();
}
