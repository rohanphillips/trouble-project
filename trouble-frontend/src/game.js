
class Game{
  constructor(id){
    this.gameid = id;
    this.board = {};
    this.players = {};
    this.inProgress = false;
    this.complete = false;
  }

  push(player){
    return this.players.push(player);
  }

  deletePlayerID(playerID){
    let myPointer = 0;
    for (let i=0; i < this.players.length; i++){
      let myPlayer = this.players[i];
      if (myPlayer.id === playerID){
        myPointer = i;
        break;
      }
    }
    this.players.splice(myPointer, 1);
  }

  get playerCount(){
    return this.players.length;
  }
}

function startNewGame(){
  console.log("Start new Game");
  newGameRequest(createNewGameObject());
}

function startGame(){
  currentGame.inProgress = true;
  toggleDisplay("start_game_button", "hidden")
  toggleDisplay("add_player_panel", "hidden");
  let bs = document.getElementsByClassName("player_button_show")
  for (let i = 0; i < bs.length; i++){
    bs[i].className = "player_button_hide"
  }

}

function initNewGame(game){
  toggleDisplay("new_game_button", "hidden");
  currentGame = new Game(game.data.id);
  toggleDisplay("add_player_panel", "display_inline");
}

function newGameRequest(configObj){
  return fetch(GAMES_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            initNewGame(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
}

function createNewGameObject(){
  let myGetObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };
  return myGetObject;
};