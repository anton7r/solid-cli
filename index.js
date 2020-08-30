#!/usr/bin/env node
const degit = require("degit");
const templates = require("./templates");
const chalk = require("chalk");

console.log(chalk.cyanBright("solid-cli") + chalk.gray("@" + require("./package.json").version) + "\n")

const args = process.argv.splice(2);

const usages = {
    create: {
        command: "create [template] <app-name>",
        description: "creates a new project from a template"
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

    case "create": {
        const template = args.length === 2 ? undefined : args[1];
        const appName = args.length === 2 ? args[1] : args[2];

        if(!appName) {
            console.log(
                chalk.redBright("ERR:") + " Please give your project a name" +
                `\n\n` +
                `Usage: ${usages.create.command}`
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

        //gets the longest's repos name so that the text can be formatted correctly
        var spaces = 0;
        templates.forEach(template => {
            const len = template.repo.length;
            if(spaces < len) spaces = len;
        })

        spaces += 2;

        var rendered = "";

        templates.forEach(template => {
            rendered += `  ${template.repo}`;

            //format spaces
            var s = "";
            for(var i = 0; i < (spaces - template.repo.length); i++) s += " ";
            rendered += s

            rendered += template.description  + `\n`;

            //format spaces for features
            var s2 = "  ";
            for(var i = 0; i < spaces; i++) s2 += " ";

            template.features.forEach(feature => {
                rendered += s2 + " - " + feature + "\n";
            })
            rendered += "\n";
        });
        
        console.log(
            `Templates:` +
            `\n\n` +
            rendered
        )
        break;


    default:

        console.log(
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

