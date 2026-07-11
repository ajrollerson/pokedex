import { commandBattle } from "./command_battle.js";
import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandLoad } from "./command_load.js";
import { commandMap, commandMapb } from "./command_map.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandSave } from "./command_save.js";
import { commandWhere } from "./command_where.js";

import { type CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    save: {
      name: "save",
      description: "Save the game with 'save <filename>",
      callback: commandSave,
    },
    load: {
      name: "load",
      description: "Load a save file with 'load <filename>'",
      callback: commandLoad,
    },
    where: {
      name: "where",
      description: "Displays the current location",
      callback: commandWhere,
    },
    map: {
      name: "map",
      description: "Displays the next 20 locations of the Pokedex",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations of the Pokedex",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Explore a specific area using 'explore <location>'",
      callback: commandExplore,
    },
    battle: {
      name: "battle",
      description: "Battle a pokemon using 'battle <target pokemon> <pokedex pokemon>!'",
      callback: commandBattle,
    },
    catch: {
      name: "catch",
      description: "Catch a pokemon with 'catch <target pokemon>'",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Inspect a captured pokemon with 'inspect <pokedex pokemon>'",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "List all pokemon in the pokedex",
      callback: commandPokedex,
    },
    
  };
}