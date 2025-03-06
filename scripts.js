// Obtener los elementos del DOM que necesitamos

// Tablero donde se mostrarán las cartas
const board = document.getElementById("board");

// Mensaje que se mostrará al final del juego
const message = document.getElementById("message");

// Botón para jugar de nuevo
const playAgainButton = document.getElementById("play-again");

// Definir constantes para el juego

const intentosRestantes = document.querySelector("h1");
let intentos = 5;

// Total de cartas en el juego
const totalCards = 12;

// Números de las cartas ganadoras
const winningCards = [1, 2, 3];

// Definir variables para el estado del juego

// Cartas seleccionadas por el jugador
let selectedCards = [];

// Cartas que han sido reveladas
let revealedCards = [];

// Indica si el juego ha terminado
let gameOver = false;

// Modal
const modal = document.getElementById("modal");
const btnListo = document.getElementById("btn-listo");

btnListo.addEventListener("click", () => {
  modal.style.display = "none";
});

// Crear las cartas
// Crear un arreglo con números del 1 al total de cartas
const cards = Array.from({ length: totalCards }, (_, i) => i + 1);
// Mezclar las cartas
cards.sort(() => Math.random() - 0.5);

// Recorrer las cartas y crear los elementos DOM correspondientes
cards.forEach((number) => {
  // Crear un elemento div para la carta
  const card = document.createElement("div");
  // Agregar la clase "card" al elemento
  card.classList.add("card");

  // Crear un elemento div para la parte frontal de la carta
  const front = document.createElement("div");
  // Agregar la clase "front" al elemento
  front.classList.add("front");
  // Agregar un texto de interrogación a la parte frontal
  front.style.backgroundImage = "url('img/cartas.gif')";

  // Crear un elemento div para la parte trasera de la carta
  const back = document.createElement("div");
  // Agregar la clase "back" al elemento
  back.classList.add("back");
  // Agregar la imagen de fondo correspondiente a la carta
  // Verificar si la carta es una carta ganadora
  if (winningCards.includes(number)) {
    back.style.backgroundImage = `url('img/${number}.png')`;
  } else {
    back.style.backgroundImage = "url('img/no-ganadora.gif')";
  }

  // Agregar la parte frontal a la carta
  card.appendChild(front);
  // Agregar la parte trasera a la carta
  card.appendChild(back);

  // Agregar un evento de clic a la carta
  card.addEventListener("click", () => {
    if (gameOver || revealedCards.includes(card) || revealedCards.length >= 5) {
      // Si el juego ha terminado o la carta ya ha sido revelada, no hacer nada
      return;
    }

    intentos--;
    intentosRestantes.textContent = `Intentos Restantes: ${intentos}`;

    // Agregar la clase "flipped" a la carta para voltearla
    card.classList.add("flipped");

    // Agregar la carta a la lista de cartas reveladas
    revealedCards.push(card);
    // Agregar el número de la carta a la lista de cartas seleccionadas
    selectedCards.push(Number(number));

    // Verificar si las cartas ganadoras ya han sido seleccionadas
    if (winningCards.every((num) => selectedCards.includes(num))) {
      setTimeout(() => {
        checkWin();
      }, 300);
    } else if (revealedCards.length === 5) {
      // Si se han revelado 5 cartas, verificar si el jugador ha ganado
      setTimeout(() => {
        checkWin();
      }, 300);
    }
  });

  // Agregar la carta al tablero
  board.appendChild(card);
});

// Función para verificar si el jugador ha ganado
// Función para verificar si el jugador ha ganado
function checkWin() {
  // Verificar si el jugador ha seleccionado todas las cartas ganadoras
  const hasWon = winningCards.every((num) => selectedCards.includes(num));

  // Mostrar el mensaje correspondiente
  const gameOverMessage = document.getElementById("game-over-message");
  gameOverMessage.textContent = hasWon
    ? "¡Felicitaciones, Ganaste! Encontraste Todos los Logos"
    : "Perdiste, intenta de nuevo.";

  // Mostrar el modal de fin de juego
  const gameOverModal = document.getElementById("game-over-modal");
  gameOverModal.style.display = "block";

  // Agregar un evento de clic al botón para jugar de nuevo
  const playAgainButton = document.getElementById("play-again-button");
  playAgainButton.addEventListener("click", () => {
    // Recargar la página para iniciar un nuevo juego
    window.location.reload();
  });

  // Agregar el botón para dar vuelta todas las cartas si el jugador pierde
  // Agregar el botón para dar vuelta todas las cartas si el jugador pierde
  if (!hasWon) {
    const flipAllCardsButton = document.createElement("button");
    flipAllCardsButton.textContent = "Dar vuelta todas las cartas";
    flipAllCardsButton.classList.add("modal-boton");
    gameOverModal
      .querySelector(".modal-content")
      .appendChild(flipAllCardsButton);

    flipAllCardsButton.addEventListener("click", () => {
      // Ocultar el modal
      gameOverModal.style.display = "none";

      // Dar vuelta todas las cartas
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.classList.add("flipped");
      });

      // Eliminar el elemento h1 de intentos restantes
      const intentosRestantes = document.querySelector("h1");
      intentosRestantes.remove();

      // Crear el botón "Jugar de nuevo"
      const playAgainButton = document.createElement("button");
      playAgainButton.textContent = "Jugar de nuevo";
      playAgainButton.classList.add("modal-boton");

      // Agregar el botón en el lugar donde estaba el elemento h1
      const board = document.getElementById("board");
      board.parentNode.insertBefore(playAgainButton, board);

      // Agregar un evento de clic para recargar la página
      playAgainButton.addEventListener("click", () => {
        window.location.reload();
      });
    });
  }
}
