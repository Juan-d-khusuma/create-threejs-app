#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

if (process.argv.length < 3) {
  console.log(
    chalk.bgRed.bold(" ERROR   ") +
      chalk.bold(" You have to provide a name for your app!")
  );
  console.log(
    chalk.bgBlue.bold(" Example ") +
      chalk.inverse(" npx create-my-boilerplate my-app         ")
  );
  process.exit(1);
}

const projectName = process.argv[2] || "test";
const useYarn = process.argv.includes("--yarn");
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/Juan-d-khusuma/threejs-starter.git";

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      chalk.bgRed.bold(" ERROR ") +
        chalk.inverse(
          `The file ${projectName} already exist in the current directory, please give it another name.`
        )
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log(chalk.bgBlue(" INFO ") + " Creating the starter template...");
    execSync(`git clone ${git_repo} ./${projectName}`);
    console.log("✅ Started Template Created");

    process.chdir(projectPath);

    useYarn && console.log(chalk.bold("Using Yarn..."));
    console.log(chalk.bgBlue(" INFO ") + " Installing dependencies...");
    execSync(useYarn ? "npm install" : "yarn");
    console.log("✅ Dependencies installed");

    console.log(chalk.bgBlue(" INFO ") + " Cleaning stuff up...");
    execSync("npx rimraf ./.git");
    console.log("✅ The project is clean");

    console.log(
      chalk.bgGreenBright(" SUCCESS ") +
        " The installation is done, this is ready to use ✅"
    );
  } catch (error) {
    console.log(error);
  }
}
main();
