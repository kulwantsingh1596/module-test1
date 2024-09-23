class Game {
  constructor() {
    this.computerScore = document.querySelector(".computer-score");
    this.playerScore = document.querySelector(".player-score");
    this.playingZone = document.querySelector(".play-area");
    this.resultZone = document.querySelector(".result-area");
    this.winText = document.querySelector("#message-win");
    this.lostText = document.querySelector("#message-lose");
    this.tieText = document.querySelector("#message-tie");
    this.subText = document.querySelector(".sub-message");
    this.playAgainBtn = document.querySelector(".btn-play-again");
    this.replayBtn = document.querySelector(".btn-replay");
    this.userIcons = {
      rock: document.querySelector("#user-icon-rock"),
      paper: document.querySelector("#user-icon-paper"),
      scissor: document.querySelector("#user-icon-scissor")
    };
    this.pcIcons = {
      rock: document.querySelector("#pc-icon-rock"),
      paper: document.querySelector("#pc-icon-paper"),
      scissor: document.querySelector("#pc-icon-scissor")
    };
    this.userIconContainer = document.querySelector(".user-icons");
    this.pcIconContainer = document.querySelector(".pc-icons");
    this.keysArray = Array.from(document.querySelectorAll(".choice"));
    this.initialize();
  }

  initialize() {
    this.updateScoreDisplay();
    this.keysArray.forEach(key => key.addEventListener("click", this.keyClickHandler.bind(this)));
    this.replayBtn.addEventListener("click", this.playAgainHandler.bind(this));
    this.playAgainBtn.addEventListener("click", this.playAgainHandler.bind(this));
    document.querySelector(".btn-next").addEventListener("click", this.nextPageHandler.bind(this));
    document.querySelector(".btn-winner-play-again").addEventListener("click", this.playAgainHandler.bind(this));
    document.querySelector(".btn-rules").addEventListener("click", this.showRulesHandler.bind(this));
    document.querySelector(".close-button").addEventListener("click", this.removeRulesHandler.bind(this));
  }

  updateScoreDisplay() {
    const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };
    this.computerScore.innerText = scores.computer;
    this.playerScore.innerText = scores.user;
  }

  valueOfKey(name) {
    const values = { rock: 1, paper: 2, scissor: 3 };
    return values[name] || 0;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  playRockPaperScissors(userChoice, compChoice) {
    if (userChoice === compChoice) return "tie";
    if ((userChoice === 1 && compChoice === 3) || (userChoice === 2 && compChoice === 1) || (userChoice === 3 && compChoice === 2)) {
      return "user";
    }
    return "comp";
  }

  updateScores(result) {
    const scores = JSON.parse(localStorage.getItem("scores")) || { user: 0, computer: 0 };
    if (result === "user") scores.user += 1;
    else if (result === "comp") scores.computer += 1;

    localStorage.setItem("scores", JSON.stringify(scores));
    this.updateScoreDisplay();
  }

  updateResultSides(userChoice, compChoice) {
    const choices = ["rock", "paper", "scissor"];
    choices.forEach(choice => {
      this.userIcons[choice].style.display = (this.valueOfKey(choice) === userChoice) ? "flex" : "none";
      this.pcIcons[choice].style.display = (this.valueOfKey(choice) === compChoice) ? "flex" : "none";
    });
  }

  updateResultZone(result, userChoice, compChoice) {
    this.playingZone.style.display = "none";
    this.resultZone.style.display = "flex";

    const resultMessages = {
      tie: () => {
        this.winText.style.display = "none";
        this.lostText.style.display = "none";
        this.tieText.style.display = "block";
        this.subText.style.display = "none";
        this.playAgainBtn.style.display = "none";
        this.replayBtn.style.display = "block";
      },
      user: () => {
        this.winText.style.display = "block";
        this.lostText.style.display = "none";
        this.tieText.style.display = "none";
        this.subText.style.display = "block";
        this.playAgainBtn.style.display = "block";
        this.replayBtn.style.display = "none";
      },
      comp: () => {
        this.winText.style.display = "none";
        this.lostText.style.display = "block";
        this.tieText.style.display = "none";
        this.subText.style.display = "block";
        this.playAgainBtn.style.display = "block";
        this.replayBtn.style.display = "none";
      }
    };

    resultMessages[result]();
    this.updateResultSides(userChoice, compChoice);
    this.userIconContainer.classList.toggle("green-background", result === "user");
    this.pcIconContainer.classList.toggle("green-background", result === "comp");
  }

  keyClickHandler(event) {
    const keyClicked = event.target.closest(".choice").id;
    const userChoice = this.valueOfKey(keyClicked.split('-')[1]); // Get choice from id
    const compChoice = this.getRandomNumber();
    const result = this.playRockPaperScissors(userChoice, compChoice);

    this.updateScores(result);
    this.updateResultZone(result, userChoice, compChoice);
  }

  playAgainHandler() {
    this.playingZone.style.display = "flex";
    this.resultZone.style.display = "none";
  }

  nextPageHandler() {
    document.querySelector(".game-screen").style.display = "none";
    document.querySelector(".victory-screen").style.display = "flex";
  }

  showRulesHandler() {
    document.querySelector(".close-button").style.display = "flex";
    document.querySelector(".rules-section").style.display = "flex";
  }

  removeRulesHandler() {
    document.querySelector(".close-button").style.display = "none";
    document.querySelector(".rules-section").style.display = "none";
  }
}

new Game();
