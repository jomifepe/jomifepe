#! /usr/bin/env node

import { select } from "@inquirer/prompts";
import chalk from "chalk";
import boxen from "boxen";
import open from "open";

const handle = "jomifepe";
const location = `${chalk.green("Po")}${chalk.yellow("rt")}${chalk.red("ugal")}`;

const work = {
  company: "Prismic",
  role: "Software Engineer",
};

export const data = {
  handle,
  name: "José Pereira",
  contact: `contact@${handle}.dev`,
  tools: "TypeScript, React, Node.js",
  social: {
    web: `${chalk.grey("https://")}${chalk.magenta(handle)}${chalk.grey(".dev")}`,
    github: `${chalk.grey("https://github.com/")}${chalk.green(handle)}`,
    twitter: `${chalk.grey("https://twitter.com/")}${chalk.cyan(handle)}`,
    npm: `${chalk.grey("https://npmjs.com/~")}${chalk.red(handle)}`,
    linkedin: `${chalk.grey("https://linkedin.com/in/")}${chalk.blue(handle)}`,
    medium: `${chalk.grey("https://medium.com/@")}${chalk.white(handle)}`,
    dev: `${chalk.grey("https://dev.to/")}${chalk.white(handle)}`,
  },
  npx: `npx ${handle}`,
};

const me = boxen(
  [
    chalk.white(`${chalk.bold(data.name)} / ${chalk.green(chalk.bold(data.handle))}`),
    ``,
    `   ${chalk.white(`Location:  ${chalk.bold(location)}`)}`,
    `       ${chalk.white(`Work:  ${work.role} at ${chalk.blueBright(chalk.bold(work.company))}`)}`,
    ``,
    `        ${chalk.white(`Web:  ${data.social.web}`)}`,
    `     ${chalk.white(`GitHub:  ${data.social.github}`)}`,
    `    ${chalk.white(`Twitter:  ${data.social.twitter}`)}`,
    `   ${chalk.white(`LinkedIn:  ${data.social.linkedin}`)}`,
    `        ${chalk.white(`npm:  ${data.social.npm}`)}`,
    `     ${chalk.white(`Medium:  ${data.social.medium}`)}`,
    `        ${chalk.white(`Dev:  ${data.social.dev}`)}`,
    ``,
    `       ${chalk.white(`Card:  ${chalk.greenBright(data.npx)}`)}`,
  ].join("\n"),
  {
    margin: { top: 1, bottom: 1 },
    padding: 1,
    borderStyle: "single",
    borderColor: "blue",
    width: 70,
  }
);

console.info(me);

const option = await select<"email" | "quit">({
  message: "What do you want to do?",
  choices: [
    { value: "email", name: "Send me an email" },
    { value: "quit", name: "Quit" },
  ],
});

if (option === "email") {
  open(`mailto:${data.contact}`);
  console.log("Opening your email client 📧");
} else {
  console.log("See you 👋");
}

process.exit(0);
