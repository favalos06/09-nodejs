const inq = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },
  {
    type: "input",
    name: "description",
    message:
      "Provide a short description explaining the what, why, and how of your project.",
  },
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions for use.",
  },
  {
    type: "list",
    choices: ["MIT License", "Apache License 2.0", "GNU GPLv3"],
    name: "license",
    message: "Choose applicable licenses.",
  },
  {
    type: "input",
    name: "contrib",
    message: "How can someone contribute to your project?",
  },
  {
    type: "input",
    name: "tests",
    message: "Provide an example of how to test your project.",
  },
  {
    type: "input",
    name: "gitHubUserName",
    message: "Please provide your GitHub username.",
  },
  {
    type: "input",
    name: "email",
    message: "Please provide your email address.",
  },
  {
    type: "input",
    name: "deployedLink",
    message: "What is the link to your deployed project?",
  },
];

function createdReadme(answers, badge) {
  fs.writeFileSync(
    "./README.md",
    `
# ${answers.title}

${badge}

## Description
${answers.description}

## Tablet of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)
- [Deployed Link](#deployed-link)

## Installation
${answers.installation}

## Usage
${answers.usage}
![Screenshot of Project](assets/images/screenshot.png)

## License
${answers.license}

## How to Contribute
${answers.contrib}

## Tests
${answers.tests}

## Questions
* Follow me on [GitHub](https://github.com/${answers.gitHubUserName})
* Ask me question at ${answers.email}

## Deployed Link
${answers.deployedLink}
  `
  );
}

function init() {
  inq
    .prompt(questions)
    .then((answers) => {
      let badge;
      if (answers.license === "MIT License") {
        badge =
          "![MIT License Badge](https://img.shields.io/badge/license-MIT-green)";
      } else if (answers.license === "Apache License 2.0") {
        badge =
          "![Apache License Badge](https://img.shields.io/badge/license-Apache-blue)";
      } else if (answers.license === "GNU GPLv3") {
        badge =
          "![GPL License Badge](https://img.shields.io/badge/license-GPL-blue)";
      }
      createdReadme(answers, badge);
      console.log("Successfully created README.md");
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompts could not be rendered in current environment!");
      } else {
        console.log(`Something went wrong!`, error);
      }
    });
}

init();