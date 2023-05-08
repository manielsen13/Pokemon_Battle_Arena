class Pokemon {

    constructor(name, moveSet, weaknesses, immunities, resistances) {
        
        //CAN ALSO RANDOMLY SET A LEVEL FOR THE ENEMY POKEMON LATER
        this.moveSet = moveSet
        this.maxHealth = this.generateHealth()
        this.health = this.maxHealth
        this.attack = this.generateAttack()
        this.defense = this.generateDefense()
        this.weakness_list = weaknesses
        this.immunities_list = immunities
        this.resistance_list = resistances
        this.name = name
        this.gender = Math.random() < 0.5 ? 'Male' : 'Female' //reset this for ditto and most ghost pokemon

        this.speed = generateSpeed()
        
        //Note, attack and defense calculations are fairly basic. There aren't any EVs or IVs or Sp. Attk or Sp. Defense
    }



    generateHealth() {
        Math.ceil(Math.random() * 65 + 350)
    }

    generateAttack() {
        Math.ceil(Math.random * 10 + 25)
    }

    generateDefense() {
        Math.ceil(Math.random * 10 + 25)
    }

    generateSpeed() {
        Math.ceil(Math.random() * 50)
    }



    //base this on the pokemon's defensive stat
    takeDamage(damage) { //I can redo the formulas for taking and dealing damage later. Just want to make the system work first.
        this.health += -damage + Math.round(this.defense / 100 * damage)
        return
    }

    calculateDamage(move) { //calculates damage for a given move given the pokemon's attack stat
        return this.attack + Math.round((move.power * this.attack / 100))
    }

    getMove(string) { //gets a move based on the string--pass move selection into this and it returns a move
        for (let move of this.moveSet) {
            if (move.name === string) {
                return move
            }
        }
        throw new Error(`${string} is not a part of this Pokemon's moveset`)
    }

    hasFainted() {
        if (this.health <= 0) {
            return true
        }
    }

    getPercentageHealth() {
        return this.health / this.maxHealth
    }

    consumePotion() { //going to need to flesh this out
        if (this.isAtFullHealth()) { //This is a double safety measure
            throw new Error ('Health already full')
        }

        if (this.health <= this.maxHealth - 50) {
            this.health += 50
        }
        else {
            this.health = this.maxHealth
        }
    }

    isAtFullHealth() {
        if (this.health >= this.maxHealth) {
            return true
        }
        return false
    }

}

class Move {


    /*
    Accuracy should not be more than 100. Whatever the value of accuracy out of 100 is the odds it connects
    */
    constructor(type, name, power, accuracy) {
        this.type = type
        this.name = name
        this.power = power
        this.accuracy = accuracy
    }

}

let move1 = new Move('Fire','Flamethrower',100,100)
let move2 = new Move('Normal','Tackle',100,100)
let move3 = new Move('Water','Watergun',100,100)
let move4 = new Move('Flying','Air Slash',100,100)
let move5 = new Move('Fire','Fire Fang',100,100)


let moveList1 = [move1, move2, move4, move5]
let moveList2 = [move2, move3]

let resistanceList1 = ['Fire', 'Grass']
let weaknessList1 = ['Water']
let immunitiesList1 = ['']

let resistanceList2 = ['Water', 'Fire']
let weaknessList2 = ['Electric', 'Grass']
let immunitiesList2 = ['']

let charizard = new Pokemon('Charizard', moveList1, weaknessList1, immunitiesList1,resistanceList1)
let blastoise = new Pokemon('Blastoise', moveList2,weaknessList2,immunitiesList2, resistanceList2)

export default {charizard, blastoise}