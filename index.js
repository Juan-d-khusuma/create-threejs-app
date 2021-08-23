const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const projectName = process.argv[2] || "test";
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/Juan-d-khusuma/threejs-starter.git";

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
    console.log(chalk.bgBlue(" INFO ") + "Creating the starter template...");
    execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log(chalk.bgBlue(" INFO ") + "Installing dependencies...");
    execSync("npm install");

    console.log(chalk.bgBlue(" INFO ") + "Removing useless files");
    execSync("npx rimraf ./.git");
    fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

    console.log(
      chalk.bgGreenBright(" SUCCESS ") +
        "The installation is done, this is ready to use ✅"
    );
  } catch (error) {
    console.log(error);
  }
}
main();
