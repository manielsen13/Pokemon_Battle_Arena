export default class Pokemon {

    /*
    Has moves, type, level,
    possibly an item, gender, base stats, a name.
    Just going to keep stats basic rather than having sp. attk and sp. def.
    
    Pokemon should be able to take damage, do damage, have status effects and heal 
    (Note - must account for moves that heal).

    have to have a typing system to determine if an attack is supereffective
    */

    //don't make attack or defense greater than 100 right now keep defense below 30
    constructor(moveSet, health, attack, defense, speed, weaknesses, immunities, resistances, name) {
        
        //basics (build out battle systems using these first)
        this.moveSet = moveSet
        this.health = health
        this.maxHealth = health
        this.attack = attack
        this.defense = defense
        this.weakness_list = weaknesses
        this.immunities_list = immunities
        this.resistance_list = resistances
        this.name = name
        this.gender = Math.random() < 0.5 ? 'Male' : 'Female'; //reset this for ditto and most ghost pokemon

        //build out battle systems using these last
        this.speed = speed

        
        //this.status = 'Neutral' if I wanted to include status effect
        //this.item = '' if I wanted to include items
        //Note, attack and defense calculations are fairly basic. There aren't any EVs or IVs or Sp. Attk or Sp. Defense
    }

    //base this on the pokemon's defensive stat
    takeDamage(damage) { //I can redo the formulas for taking and dealing damage later. Just want to make the system work first.
        this.health += -damage + Math.round(this.defense / 100 * damage)
        return
    }

    dealDamage(move) { //damage is based on the moves power and the attack-can redo formula later
        return this.attack + Math.round((move.power * this.attack / 100))
    }

    getMove(string) { //gets a move based on the string--pass move selection into this and it returns a move
        for (let move of this.moveSet) {
            if (move.name == string) {
                return move
            }
        }
        //could return something else here in case the move doesn't exist (someone messed with text content)
    }

    hasFainted() {
        if (this.health <= 0) {
            return true
        }
    }

    drinkPotion() { //going to need to flesh this out
       
    }

}

export class Move {


    /*
    Each move should have a type, damage, whether is is a status or damage move,
    chance to affect status, chance to crit (might just be built into battle)
    */
    constructor(type, name, power, accuracy) {
        this.type = type
        this.name = name
        this.power = power
        this.accuracy = accuracy
    }

}