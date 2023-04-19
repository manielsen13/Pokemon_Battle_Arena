export default class BattleController {

    constructor(userTrainer, cpuTrainer) {

        this.user = userTrainer
        this.cpu = cpuTrainer

        this.activeTrainer = userTrainer.pokemon.speed >= cpuTrainer.pokemon.speed ? this.user : this.cpu

    }

    runBattle() {

        while(1) {

            this.conductUserTurn()

            if (this.getBattleIsOver()) {
                this.endBattle()
                break
            }

            this.conductCpuTurn()

            if (this.getBattleIsOver()) {
                this.endBattle()
                break
            }

        }
    }


    conductUserTurn() {

        while (1) {

            
            let userCommand = prompt(`What would you like to do? Options are "Fight", "Run Away", "Heal", or "Use Pokeball"?`)

            switch (userCommand.toLowerCase()) {
                case 'fight':
                    console.log(`Great! Which move do you want to use? Just kidding. You can't pick right now.`)
                    this.user.useMove(this.cpu.pokemon, this.user.pickMove('Tackle'))
                    return

                case 'run away':
                    console.log(`You aren't allowed to run right now. I'm trying to test this code.`)
                    return
                
                case 'heal':
                    try {
                        this.user.usePotion()
                    } catch (err) {
                        continue
                    }
                    return
                
                case 'use pokeball':
                    console.log('Yeah, not gonna work. This command is just in this for show')
                    return

                default:
                    console.log(`That isn't a command. You lose a turn.`)
                    return

            }
        }

    }

    conductCpuTurn() {
        this.cpu.useMove(this.user.pokemon, this.cpu.pickMove('Tackle'))
    }

    changeTurns() {
        if (this.activeTrainer === this.user) {
            this.activeTrainer = this.cpu
            return
        }
        if (this.activeTrainer === this.cpu) {
            this.activeTrainer = this.user
            return
        }
    }

    getBattleIsOver() {
        if (this.getIsUserDefeated()) {
            return true
        }
        if (this.getIsCpuDefeated()) {
            return true
        }
    }

    getIsUserDefeated() {
        if(this.user.pokemon.hasFainted()) {
            return true
        }
    }

    getIsCpuDefeated() {
        if(this.cpu.pokemon.hasFainted()) {
            return true
        }
    }

    endBattle() {
        console.log(`The battle is over.`)
        //end the battle and send the user back to the main menu
        //call this if runaway is clicked and confirmed
    }

    waitForClick() {
        //after text pops up, maybe need to make the program wait for a click or button press to continue
    }

}


