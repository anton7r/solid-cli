# solid-cli

A centralized list of solidjs project templates in neat cli-tool.

Setup solid-js apps with a lightweight wrapper around degit.

Note: You dont need to update this cli in order to be able to use new templates because the cli pulls the templates straight from this github repo and caches it on your local machine for 1 day.

## Usage

`solid templates` - prints all the available templates that you can choose from!

`solid init [template] <name>` - initializes a project with the given template into a new folder.

## How to add your template

1. Fork the repo

2. Add your own template into the templates.json file

3. Create a pull request.

### Rules

- If you are making a template which has

- Don't add a tag to your template. Since we take care of that

- Don't remove or replace other templates from the list without an explicit reason.

- Remember to take a look into the pull requests first before deciding to make a new template in order to reduce the amount of duplicate pull requests.

## License

MIT License
