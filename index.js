// TODO: Include packages needed for this application
const inq = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is your project all about?',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How do you install your project?',
  },
  {
    type: 'input',
    name: 'deployedLink',
    message: 'What is the link to your deployed project?',
  },

];

// TODO: Create a function to write README file
function createdReadme(answers) {
  fs.writeFileSync('./README.md', `
# ${answers.title}
## Description
${answers.description}
## Installation Instructions
${answers.installation}
## Deployed Link
[deployed link]${answers.deployedLink}
  `)
}

// TODO: Create a function to initialize app
function init() {
  inq
  .prompt(questions)
  .then((answers) => {
    createdReadme(answers)
    console.log('Successfully created README.md')
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompts could not be rendered in current environment!')
    } else {
      console.log(`Something went wrong!`, error)
    }
  })
}

// Function call to initialize app
init();