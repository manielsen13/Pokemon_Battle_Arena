import BattleConductor from "./battle_conductor.js";
import BattleUIController from "./battle_ui_controller.js";
import Pokemon from "./pokemon.js";
import Trainer from "./trainer.js";

class BattleLoader {
  constructor() {
    this.enemyPokemonImg = document.getElementById("enemyPokemon");
    this.enemyNameDisplay = document.getElementById("enemyNameDisplay");

    this.loadingScreen = document.getElementById("loadingScreen");

    this.enemyLevelDisplay = document.getElementById("enemyLevelDisplay");
  }

  async loadBattle() {
    let userTrainer = this.makeUserTrainer();
    let enemyTrainer = await this.makeEnemyTrainer();

    console.log(userTrainer.pokemon.moveSet);
    console.log(enemyTrainer.pokemon.moveSet);

    let bc = new BattleConductor(userTrainer, enemyTrainer);
    let buic = new BattleUIController();

    this.enemyLevelDisplay.innerText = "Lv" + this.generateEnemyLevel();

    buic.configureActionButtons(bc);
    buic.configureMoveButtons(bc);
    buic.configureBattleProgression(bc);
    buic.configureBackButton();

    bc.startBattle();

    this.loadingScreen.style.display = "none";
  }

  makeUserTrainer() {
    //FIX THIS

    let moveList = ["flamethrower", "tackle", "slash", "bite"];
    let typeList = ["fire", "flying"];
    let charizard = new Pokemon("Charizard", moveList, typeList);

    return new Trainer(charizard);
  }

  generateEnemyLevel() {
    let lvl = Math.floor(Math.random() * 10 + 66);
    return lvl;
  }

  async makeEnemyTrainer() {
    let enemyPokeData = await this.getRandomPokemon();
    let enemyPoke = new Pokemon(
      enemyPokeData.pokeName,
      enemyPokeData.pokeMoves,
      enemyPokeData.pokeTypes
    );

    return new Trainer(enemyPoke);
  }

  //sprites - front default will be the link to the sprite
  async getRandomPokemon() {
    let pokemonNum = Math.floor(Math.random() * 151 + 1);
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonNum}/`;
    let response = await fetch(url);
    const pokemonJsonData = await response.json();

    //get and capitalize name
    let nameStr = pokemonJsonData.name;
    if (nameStr == "nidoran-f") {
      nameStr = "nidoran";
    }
    const pokeName = nameStr.charAt(0).toUpperCase() + nameStr.slice(1);

    //get link to sprite image
    let pokeSpriteUrl = pokemonJsonData.sprites.front_default;

    //get the type of the pokemon
    let pokeTypes = [];
    if (pokemonJsonData.past_types.length > 0) {
      for (let type of pokemonJsonData.past_types[0].types) {
        pokeTypes.push(type.name);
      }
    } else {
      for (let packet of pokemonJsonData.types) {
        pokeTypes.push(packet.type.name);
      }
    }

    //get the list of moves it can learn
    let pokeMoves = [];
    for (let movePacket of pokemonJsonData.moves) {
      pokeMoves.push(movePacket.move.name.replace(/-/g, " "));
    }

    //can move this to separate fucntion
    this.enemyPokemonImg.src = pokeSpriteUrl;
    this.enemyNameDisplay.innerText = pokeName;

    return { pokeName, pokeTypes, pokeMoves, pokeSpriteUrl };
  }
}

export default new BattleLoader();
