let restartBtn = document.querySelector(".restartBtn");
let pScore = 0;
let cScore = 0;
const play = () => {
  pScore = 0;
  cScore = 0;

  const startgame = () => {
    let playBtn = document.querySelector(".playBtn");
    let playIcons = document.querySelector(".playIcons");
    let match = document.querySelector(".match");
    // changing display with click
    playBtn.addEventListener("click", () => {
      playBtn.style = `
      visibility:hidden;
      `;
      playIcons.style = `
      display: none;
      transition: display 2s ease;
      `;
      match.style = `
      display: flex;
      flex-direction: column;
      transition: display 2s ease;
      `;
      document.querySelector(".options").style = `
      display: flex;
      transition: display 2s ease;
      `;
    });
  };

  const playing = () => {
    pScore = 0;
    cScore = 0;
    const options = document.querySelectorAll(".options button");
    const playerhand = document.querySelector("#player-hand");
    const computerhand = document.querySelector("#computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    const choices = ["Rock", "Paper", "Scissor"];
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerOptions = Math.floor(Math.random() * 3);
        const computerChoice = choices[computerOptions];
        playerChoice = this.textContent;

        // calling compare with a delay
        setTimeout(() => {
          compare(playerChoice, computerChoice);
          // Updating img
          playerhand.src = `./icons/${playerChoice}.svg`;
          computerhand.src = `./icons/${computerChoice}.svg`;
        }, 2000);

        playerhand.style.animation = "shakePlayer 2s ease";
        computerhand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  function setDefault() {
    pScore = 0;
    cScore = 0;
    document.querySelector("#player-score").textContent = pScore;
    document.querySelector("#computer-score").textContent = cScore;
  }

  // Restarting after a limit
  function limit() {
    if (pScore > cScore) {
      document.querySelector(".winner").textContent = "Player is the Winner";
    } else {
      document.querySelector(".winner").textContent = "Computer is the Winner";
    }
    setDefault();
    restartBtn.style = `
      display:flex;
      transition: display 2s ease;
      `;
    document.querySelector(".options").style = `
      display: none;
      `;
    restart();
  }

  const updateScore = () => {
    let playerScore = document.querySelector("#player-score");
    let computerScore = document.querySelector("#computer-score");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    if (pScore + cScore == 5) {
      limit();
    }
  };

  const compare = (playerChoice, computerChoice) => {
    // Update
    const winner = document.querySelector(".winner");
    // Game Logic
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a Tie";
      return;
    }
    if (playerChoice === "Rock") {
      if (computerChoice === "Scissor") {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      }
    }
    if (playerChoice === "Paper") {
      if (computerChoice === "Scissor") {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      }
    }
    if (playerChoice === "Scissor") {
      if (computerChoice === "Rock") {
        winner.textContent = "Computer wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Player wins";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  // restarts the game
  function restart() {
    // on restart btn click
    restartBtn.addEventListener("click", () => {
      setDefault();
      document.querySelector(".options").style = `
      display: flex;
      transition: display 2s ease;
      `;
      restartBtn.style = `
      display:none;
      transition: display 2s ease;
      `;
      setTimeout(() => {
        play();
      }, 2000);
    });
  }

  // calling inner functions
  startgame();
  playing();
};

// calling main game function
play();
