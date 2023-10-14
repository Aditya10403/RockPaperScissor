// main play function
const play = () => {
  // Buttons Show.
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
    let pScore = 0;
    let cScore = 0;
    const options = document.querySelectorAll(".options button");
    const playerhand = document.querySelector("#player-hand");
    const computerhand = document.querySelector("#computer-hand");
    const hands = document.querySelectorAll(".hands img");
    const choices = ["Rock", "Paper", "Scissor"];

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerOptions = Math.floor(Math.random() * 3);
        const computerChoice = choices[computerOptions];
        playerChoice = this.textContent;

        // calling compare with a delay
        setTimeout(() => {
          compare(playerChoice, computerChoice);
          // updating img after delay
          playerhand.src = `./icons/${playerChoice}.svg`;
          computerhand.src = `./icons/${computerChoice}.svg`;
        }, 2000);

        playerhand.style.animation = "shakePlayer 2s ease";
        computerhand.style.animation = "shakeComputer 2s ease";
      });
    });

    const setDefault = () => {
      pScore = 0;
      cScore = 0;
      document.querySelector("#player-score").textContent = pScore;
      document.querySelector("#computer-score").textContent = cScore;
    };

    const updateScore = () => {
      const playerScore = document.querySelector("#player-score");
      const computerScore = document.querySelector("#computer-score");
      playerScore.textContent = pScore;
      computerScore.textContent = cScore;
      if (pScore + cScore == 5) {
        options.style = `pointer-events:none`;
        limit();
      }
    };
    // Restarting after a limit
    const limit = () => {
      if (pScore > cScore) {
        document.querySelector(".winner").textContent = "Player is the Winner";
      } else {
        document.querySelector(".winner").textContent =
          "Computer is the Winner";
      }
      document.querySelector(".winner").style = "color: white";
      setTimeout(() => {
        setDefault(); // seting default 0 value
      }, 2000);

      // changing the restart display
      restartBtn.style = `
        display:flex;
        transition: display 2s ease;
        `;
      document.querySelector(".options").style = `
        display: none;
        `;
      return; // calling restart
    };

    // game logic
    const compare = (playerChoice, computerChoice) => {
      // Update with result
      const winner = document.querySelector(".winner");
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
  };

  // calling inner functions
  startgame();
  playing();
};

// // restarts the game
// on restart btn click
const restartBtn = document.querySelector(".restartBtn");
restartBtn.addEventListener("click", () => {
  document.querySelector(".options").style = `
    display: flex;
    transition: display 2s ease;
    `;
  restartBtn.style = `
    display:none;
    transition: display 2s ease;
    `;
  document.querySelector(".winner").textContent = "New Game";
  document.querySelector(".winner").style = "color:black";
});

// calling main game function
play();
