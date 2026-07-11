import { getHeapSpaceStatistics } from "node:v8";
import { getRandomInt, type State } from "./state.js";
import type { Stat, Pokemon } from "./pokeapi.js";

type BattleStats = {
    name: string,
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
    stunnedSpeed: number,
    defeated: boolean
}

function retrieveStat(pokemon: Pokemon, statName: string) {
    return pokemon.stats.find(stat => stat.stat.name === statName) as Stat
}

function battleRound(firstPokemonStats: BattleStats, secondPokemonStats: BattleStats) {
    firstPokemonStats.stunnedSpeed = firstPokemonStats.speed
    secondPokemonStats.stunnedSpeed = secondPokemonStats.speed
    if (getRandomInt(1, 6) > 5) {
            if (getRandomInt(1, 6) > 5) {
                console.log(`${firstPokemonStats.name} uses special attack for ${firstPokemonStats.specialAttack} damage!`);
                console.log(`${secondPokemonStats.name} uses special defense for ${secondPokemonStats.specialDefense} defense!`);
                if ((firstPokemonStats.specialAttack - secondPokemonStats.specialDefense) <= 0) {
                    console.log("Attack failed!");
                } else {
                    console.log(`${secondPokemonStats.name} takes ${(firstPokemonStats.specialAttack - secondPokemonStats.specialDefense)} damage and has ${secondPokemonStats.hp} HP left!`);
                    secondPokemonStats.hp -= (firstPokemonStats.specialAttack - secondPokemonStats.specialDefense);
                }
            } else {
                console.log(`${firstPokemonStats.name} uses special attack for ${firstPokemonStats.specialAttack} damage!`);
                console.log(`${secondPokemonStats.name} uses defense for ${secondPokemonStats.defense} defense!`);
                if ((firstPokemonStats.specialAttack - secondPokemonStats.defense) <= 0 ) {
                    console.log("Attack failed!");
                } else {
                    console.log(`${secondPokemonStats.name} takes ${(firstPokemonStats.specialAttack - secondPokemonStats.defense)} damage and has ${secondPokemonStats.hp} HP left!`);
                    console.log(`${secondPokemonStats.name} is stunned!`);
                    firstPokemonStats.stunnedSpeed -= 100;
                    secondPokemonStats.hp -= (firstPokemonStats.specialAttack - secondPokemonStats.defense);
                }
            }
        } else {
            if (getRandomInt(1, 6) > 5) {
                console.log(`${firstPokemonStats.name} uses attack for ${firstPokemonStats.attack} damage!`);
                console.log(`${secondPokemonStats.name} uses special defense for ${secondPokemonStats.specialDefense} defense!`);
                if ((firstPokemonStats.attack - secondPokemonStats.specialDefense) <= 0) {
                    console.log("Attack failed!");
                } else {
                    console.log(`${secondPokemonStats.name} takes ${(firstPokemonStats.attack - secondPokemonStats.specialDefense)} damage and has ${secondPokemonStats.hp} HP left!`);
                    console.log(`${firstPokemonStats.name} is stunned!`)
                    firstPokemonStats.stunnedSpeed -= 100;
                    secondPokemonStats.hp -= (firstPokemonStats.attack - secondPokemonStats.specialDefense);
                }
            } else {
                console.log(`${firstPokemonStats.name} uses attack for ${firstPokemonStats.attack} damage!`);
                console.log(`${secondPokemonStats.name} uses defense for ${secondPokemonStats.defense} defense!`);
                if ((firstPokemonStats.attack - secondPokemonStats.defense) <= 0) {
                    console.log("Attack failed!");
                } else {
                    console.log(`${secondPokemonStats.name} takes ${(firstPokemonStats.attack - secondPokemonStats.defense)} damage and has ${secondPokemonStats.hp} HP left!`);
                    secondPokemonStats.hp -= (firstPokemonStats.attack - secondPokemonStats.defense);
                }
            }
        }

        if (firstPokemonStats.hp <= 0) {
            firstPokemonStats.defeated = true;
            return
        } else if (secondPokemonStats.hp <= 0) {
            secondPokemonStats.defeated = true;
        } else {
            return
        }   
    }

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function commandBattle(state: State,  ...args: string[]) {
    const targetPokemonName = args[0];
    const playerPokemonName = args[1];
    const location = await state.pokeapi.fetchLocation(state, state.currentLocation as string)

    if (!state.pokedex[playerPokemonName]) {
        console.log("You don't have that Pokemon yet!")
        return
    } 
    if (!location.pokemon_encounters.find(target => target.pokemon.name === targetPokemonName)) {
        console.log("Pokemon not a valid target!");
        return
    } 
    if  (!targetPokemonName || !playerPokemonName) {
        console.log("Pokemon field missing or incorrect! Use 'battle <target pokemon> <pokedex pokemon>'!"); 
        return 
    }


    const targetPokemon = await state.pokeapi.fetchPokemon(targetPokemonName);
    const playerPokemon = await state.pokeapi.fetchPokemon(playerPokemonName);

    const pPBattleStats: BattleStats = {
        name: playerPokemonName,
        hp: retrieveStat(playerPokemon, "hp").base_stat,
        attack: retrieveStat(playerPokemon, "attack").base_stat,
        defense: retrieveStat(playerPokemon, "defense").base_stat,
        specialAttack: retrieveStat(playerPokemon, "special-attack").base_stat,
        specialDefense: retrieveStat(playerPokemon, "special-defense").base_stat,
        speed: retrieveStat(playerPokemon, "speed").base_stat,
        stunnedSpeed: retrieveStat(playerPokemon, "speed").base_stat,
        defeated: false
    }

    const tPBattleStats: BattleStats = {
        name: targetPokemonName,
        hp: retrieveStat(targetPokemon, "hp").base_stat,
        attack: retrieveStat(targetPokemon, "attack").base_stat,
        defense: retrieveStat(targetPokemon, "defense").base_stat,
        specialAttack: retrieveStat(targetPokemon, "special-attack").base_stat,
        specialDefense: retrieveStat(targetPokemon, "special-defense").base_stat,
        speed: retrieveStat(targetPokemon, "speed").base_stat,
        stunnedSpeed: retrieveStat(playerPokemon, "speed").base_stat,
        defeated: false
    }


    while (pPBattleStats.hp > 0 && tPBattleStats.hp > 0) {
        if (tPBattleStats.stunnedSpeed > pPBattleStats.stunnedSpeed) {
            battleRound(tPBattleStats, pPBattleStats)
            await delay(2500)
            battleRound(pPBattleStats, tPBattleStats)
            await delay(2500)
        } else {
            battleRound(pPBattleStats, tPBattleStats)
            await delay(2500)
            battleRound(tPBattleStats, pPBattleStats)
            await delay(2500)
        }


        if (pPBattleStats.defeated === true) {
            console.log(`${pPBattleStats.name} is recovering!`)
            return
        } 
        if (tPBattleStats.defeated === true) {
            console.log("Target weak! Throwing pokeball!")
            state.pokedex[targetPokemonName] = targetPokemon;
            console.log(`${targetPokemonName} was caught!`);
            console.log("You may now inspect it with the 'inspect' command.")
            return
        } 

    }
};