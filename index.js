#!/usr/bin/env node
const degit = require("degit");
const templates = require("./templates");
const chalk = require("chalk");

console.log(chalk.cyanBright("solid-cli") + chalk.gray("@" + require("./package.json").version))

const args = process.argv.splice(2);

const usages = {
    create: {
        command: "create [template] <app-name>",
        description: "creates a new project from a template"
    }
}

switch (args[0]) {
    case "create": {
        const template = args.lenght === 2 ? undefined : args[1];
        const appName = args.lenght === 2 ? args[1] : args[2];

        if(!appName) {
            console.log(
                chalk.redBright("ERR:") + " Please give your project a name" +
                `\n\n` +
                `Usage: ${usages.create.command}`
            );
            return;
        }

        //TODO: if no template is provided show the user the form to create a custom setup
        if(!template) {
            
            return;
        }

        const isTemplateFound = templates.findIndex((val => {
            return val.repo === template
        }))

        //the template was not found
        if(isTemplateFound === -1) {
            console.log(chalk.redBright("ERR:") + ` template '${template}' was not found from the available templates`);
            return
        }

        //the template was found - continue
        const emitter = degit(template)


        break;
    
    }
    case "templates":
        console.log(
            `\n` +
            `Templates:`
        )
        break;

    default:
        console.log(
            `\n` +
            `Usage: solid <command> [options]` +
            `\n\n` +
            `Commands:` +
            `\n` +
            `  ${usages.create.command}  ${usages.create.description}` +
            `\n` +
            `  templates                     shows the available templates`
        )
        break;
}

