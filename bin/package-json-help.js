#!/usr/bin/env node

const fs = require('fs')

//------------------------------
// vars
//------------------------------

// colors
const BLACK = 235
const LIME = 106
const LIGHTER_GREY = 246

// color helpers
const RESET = "\033[0m"
const FG = "\033[38;5;"
const FGB = "\033[1;38;5;"
const BG = "\033[48;5;"

//------------------------------
// functions
//------------------------------

function printHeading(text) {
    console.log(`${BG}${BLACK}m${FGB}${LIME}m ${text} ${RESET}`)
}

function printOptions(a, b = '') {
    console.log(` ${a.padEnd(10)}${FG}${LIGHTER_GREY}m${b}${RESET}`)
}

function read(filename, def = null) {
    try {
        const file = fs.readFileSync(filename)
        return JSON.parse(file)
    } catch (error) {
        return def
    }
}

const transformCommand = (config = {}) => command => [
    command,
    config.hasOwnProperty(command) ? config[command] : '',
]

function main() {
    // load
    const packageJson = read('package.json')
    const configJson = read('./help.json', {})

    if (!packageJson || !packageJson.hasOwnProperty('scripts')) {
        return
    }

    // transform
    const optionsOutput = Object
        .keys(packageJson['scripts'])
        .filter(x => x !== 'help' && x[0] !== '_')
        .map(transformCommand(configJson))

    // output
    printHeading("available commands ...")
    optionsOutput.map(([a, b]) => printOptions(a, b))
}

//------------------------------

main()
