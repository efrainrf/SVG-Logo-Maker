const inquirer = require('inquirer');
const svgCaptcha = require('svg-captcha');
const fs = require('fs');

async function generateLogo() {
  // Prompt the user for input (text, colors, shape)
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):',
    },
  ]);

  // Generate the SVG logo
  const captcha = svgCaptcha.create({
    text: userInput.text,
    color: userInput.textColor,
    size: { width: 300, height: 200 },
    noise: 2,
    background: userInput.shapeColor,
  });

  // Save the SVG to a file
  fs.writeFileSync('logo.svg', captcha.data);

  console.log('Generated logo.svg');
}

generateLogo();
