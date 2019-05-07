#!usr/bin/env node
'use strict';

let inquirer = require('inquirer');
let chalk = require('chalk');

let response = chalk.bold.yellow;

let resume = require('./resume.json');

let resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: "What do you want to know about me?",
    choices: [
        ...Object.keys(resume), 'Exit'
    ]
};

function main() {
    console.log("Greetings, my name is Oliver Carlos and welcome to my NPM Resume.");
    resumeHandler();
}

function resumeHandler() {
    inquirer.prompt(resumePrompts)
        .then(answer => {
            let option = answer.resumeOptions;
            if (option == 'Exit') {
                return;
            }
            console.log(response('---------------------------------------------------------------------'));
            resume[`${option}`].forEach(info => {
                console.log(response(`=> ${info}`));
            });

            console.log(response('---------------------------------------------------------------------'));
            inquirer.prompt({
                type: 'list',
                name: 'exitBack',
                message: 'Go back or Exit?',
                choices: ["Back", "Exit"]
            }).then(choice => {
                if (choice.exitBack == 'Back') {
                    resumeHandler();
                } else {
                    return;
                }
            });
        });
}


main();