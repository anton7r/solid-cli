#!/usr/bin/env node
const degit = require("degit");
const templates = require("./templates");
const chalk = require("chalk");

console.log(chalk.cyanBright("solid-cli") + chalk.gray("@" + require("./package.json").version) + "\n")

const args = process.argv.splice(2);

const usages = {
    init: {
        command: "init [template] <app-name>",
        description: "initializes a new project from a template"
    }
}

function successMessage(appName, template) {
    console.log(
        `\n` + chalk.green("SUCCESS:") + ` The setup is now complete for '${appName}' with the '${template}' template` +
        `\n\n` +
        `You may now run the following commands:` +
        `\n\n` +
        `  cd ${appName}` +
        `\n` +
        `  npm start` +
        `\n\n\n\n` +
        `Happy coding!`
    );
}

switch (args[0]) {

    case "init": {
        const template = args.length === 2 ? undefined : args[1];
        const appName = args.length === 2 ? args[1] : args[2];

        if(!appName) {
            console.log(
                chalk.redBright("ERR:") + " Please give your project a name" +
                `\n\n` +
                `Usage: ${usages.init.command}`
            );
            return;
        }

        //checks wether the user inputted template exists in the templates
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


        emitter.clone(appName).then(() => successMessage(appName, template))

        break;
    
    }


    case "templates":

        var rendered = "";

        templates.forEach(template => {
            rendered += "\n";

            rendered += `  ${template.name}`;

            rendered += "  " + chalk.gray(template.description)  + `\n`;

            if(!template.features) return;

            template.features.forEach(feature => {
                rendered += "   - " + feature + "\n";
            })
        });
        
        console.log(
            `Templates:` +
            `\n` +
            rendered
        )
        break;


    default:

        console.log(
            `Usage: solid <command> [options]` +
            `\n\n` +
            `Commands:` +
            `\n` +
            `  ${usages.init.command}    ${usages.init.description}` +
            `\n` +
            `  templates                     shows the available templates`
        )
        break;
}

