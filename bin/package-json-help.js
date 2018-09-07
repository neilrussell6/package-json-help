#!/usr/bin/env node

const fs = require('fs')

require('dotenv').config()

//------------------------------
// vars
//------------------------------

// colors
const BLACK = 235
const LIME = 106
const LIGHT_BLUE = 74
const LIGHTER_GREY = 246
const PRIMARY_COLOR = process.env.PACKAGE_JSON_HELP_PRIMARY_COLOR ? process.env.PACKAGE_JSON_HELP_PRIMARY_COLOR : LIME
const SECONDARY_COLOR = process.env.PACKAGE_JSON_HELP_SECONDARY_COLOR ? process.env.PACKAGE_JSON_HELP_SECONDARY_COLOR : LIGHT_BLUE
const TERTIARY_COLOR = process.env.PACKAGE_JSON_HELP_TERTIARY_COLOR ? process.env.PACKAGE_JSON_HELP_TERTIARY_COLOR : LIGHTER_GREY

// color helpers
const RESET = "\033[0m"
const FG = "\033[38;5;"
const FGB = "\033[1;38;5;"
const BG = "\033[48;5;"

// ...
const PADDING = process.env.PACKAGE_JSON_HELP_PADDING ? process.env.PACKAGE_JSON_HELP_PADDING : 15

//------------------------------
// functions
//------------------------------

function printHeading(text) {
    console.log(`${BG}${BLACK}m${FGB}${PRIMARY_COLOR}m ${text} ${RESET}`)
}

function printOptions(a, b = '') {
    console.log(` ${FG}${SECONDARY_COLOR}m${a.padEnd(PADDING)}${FG}${TERTIARY_COLOR}m${b}${RESET}`)
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
