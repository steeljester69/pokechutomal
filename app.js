const attackOne = document.querySelector(".attack1");
const attackTwo = document.querySelector(".attack2");
const attackThree = document.querySelector(".attack3");
const attackFour = document.querySelector(".attack4");
const playerTwoHealthBar = document.querySelector(".p2-health");
const playerTwoHealthCount = document.querySelector(".health-count-p2");
const playerOneHealthBar = document.querySelector(".p1-health");
const playerOneHealthCount = document.querySelector(".health-count-p1");
const gameStateText = document.querySelector(".game-state");
const attackContainer = document.querySelector(".attack-container");
const simple = document.querySelector(".animado");
const restartBtn = document.querySelector(".restart-game");
let playerOneHealth = 70;
let playerTwoHealth = 70;
let starGme = true;
const playerTwoAttacks = ["Hoja afilada", "Placaje", "Muere Kevin", "Justo en el kevin"];

// Cambia de color la barra de vida 
const healthColor = (playerHealth, playerBar) => {
  if (playerHealth < 40 && playerHealth > 20) {
    playerBar.style.backgroundColor = "#cee809";
  } else if (playerHealth < 20) {
    playerBar.style.backgroundColor = "red";
  } else {
    playerBar.style.backgroundColor = "green";
  }
};

// Chequea quien putas gana 
const checkWinner = (name, playerBar, playerCount) => {
  gameStateText.innerText = `${name} gano! Presionar reiniciar para jugar denuevo!`;
  playerBar.style.width = "0%";
  gameStateText.style.display = "block";
  attackContainer.style.display = "none";
  playerCount.innerText = "0 / 70";
  restartBtn.style.display = "block";
  restartBtn.innerText = "Game over"
};
// LA PUTA QUE LO PARIO
   function animarElemento() {
       const circulo = document.getElementById('miCirculo');

      circulo.style.visibility = 'visible';
      circulo.classList.remove('animado');
      void circulo.offsetWidth; 
      circulo.classList.add('animado');

      setTimeout(() => {
        circulo.style.visibility = 'hidden';
        circulo.classList.remove('animado');
        circulo.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 1000);
    }

    function iniciarAnimacion() {
      animarElemento();

      setTimeout(() => {
        animarElemento();
      }, 2500);
    }

// Logica de que el poke que vaya primero
const playerOneAttack = (subtract, missCount, attackName) => {
  // Te da un numero random si fallo 
  const randomNumber = Math.floor(Math.random() * missCount) + 1;
  if (randomNumber !== 1) {
    // La wea que quita la vida fuck 
    playerTwoHealth -= subtract;
    if (playerTwoHealth <= 0) {
      checkWinner("charmeleon", playerTwoHealthBar, playerTwoHealthCount);
    } else if (playerOneHealth <= 0) {
      checkWinner("ivysaur", playerOneHealthBar, playerOneHealthCount);
    } else {
      intervalFunction();
      playerTwoHealthBar.style.width = `${playerTwoHealth}%`;
      playerTwoHealthBar.style.transition = "1.4s";
      playerTwoHealthCount.innerText = `${playerTwoHealth} / 70`;
      gameStateText.innerText = `charmeleon uso ${attackName}! Quito ${subtract} de HP!`;
      attackContainer.style.display = "none";
    }
    // Fallo el ataque
  } else {
    gameStateText.innerText = `charmeleon uso ${attackName}... Pero Fallo!`;
    intervalFunction();
  }
};

const playerTwoAttack = () => {
  let missCount;
  let subtractHealth;
  const randomAttackNum = Math.floor(Math.random() * 4) + 0;
  const randomAttack = playerTwoAttacks[randomAttackNum];
  if (randomAttack === "Hoja afilada") {
    missCount = 10;
    subtractHealth = 15;
  } else if (randomAttack === "Placaje") {
    missCount = 7;
    subtractHealth = 17;
  } else if (randomAttack === "Muere Kevin") {
    missCount = 4;
    subtractHealth = 20;
  } else {
    missCount = 2;
    subtractHealth = 32;
  }
  const randomNumber = Math.floor(Math.random() * missCount) + 1;
  if (randomNumber !== 1) {
    playerOneHealth -= subtractHealth;
    if (playerOneHealth <= 0) {
      checkWinner("ivysaur", playerOneHealthBar, playerOneHealthCount);
    } else {
      playerOneHealthBar.style.width = `${playerOneHealth}%`;
      playerOneHealthBar.style.transition = "1.4s";
      playerOneHealthCount.innerText = `${playerOneHealth} / 70`;
      gameStateText.innerText = `ivysaur uso ${randomAttack}! Quito ${subtractHealth} de HP!`;
      attackContainer.style.display = "none";
    }
  } else {
    gameStateText.innerText = `ivysaur uso ${randomAttack}... Pero Fallo!`;
  }
};

setInterval(() => {
  healthColor(playerOneHealth, playerOneHealthBar);
}, 500);
// Intervalo de texto -  tambien deberia funcionar para las animaciones creo 
const intervalFunction = () => {
  healthColor(playerTwoHealth, playerTwoHealthBar);
  const interval = setInterval(() => {
    gameStateText.style.display = "block";
    attackContainer.style.display = "none";
  }, 1);
  const intervalTwo = setInterval(() => {
    playerTwoAttack();
    clearInterval(intervalTwo);
  }, 2502);
  setTimeout(() => {
    clearInterval(interval);
    if (playerOneHealth >= 0) {
      gameStateText.style.display = "none";
      attackContainer.style.display = "grid";
    }
  }, 5004);
};

// Logica de reiniciar juego 
const restartGame = () => {
  if(starGme === true){
    restartBtn.style.display = "none";
    starGme = false
  }
  else {
    playerTwoHealthBar.style.width = "70%";
    gameStateText.style.display = "none";
    attackContainer.style.display = "grid";
    playerTwoHealthCount.innerText = "70 / 70";
    playerOneHealthBar.style.width = "70%";
    playerOneHealthBar.style.backgroundColor = "green";
    playerTwoHealthBar.style.backgroundColor = "green";
    playerOneHealthCount.innerText = "70 / 70";
    restartBtn.style.display = "none";
    playerOneHealth = 70;
    playerTwoHealth = 70;
  }
  
};

// La wea que dijo el man jsd 
restartBtn.addEventListener("click", () => restartGame());

// Eventitos 
attackOne.addEventListener("click", () => playerOneAttack(12, 18, "Corte"));
attackTwo.addEventListener("click", () =>
  playerOneAttack(20, 8, "Llamarada")
);
attackThree.addEventListener("click", () =>
  playerOneAttack(24, 4, "Cuchillada")
);
attackFour.addEventListener("click", () =>
  playerOneAttack(29, 2, "Lansallamas")
);
