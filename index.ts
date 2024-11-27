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
  links: {
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

type Link = keyof typeof data.links;

const linkLabels: Record<Link, string> = {
  web: "Web",
  github: "GitHub",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  npm: "npm",
  medium: "Medium",
  dev: "Dev",
};

const me = boxen(
  [
    chalk.white(`${chalk.bold(data.name)} / ${chalk.green(chalk.bold(data.handle))}`),
    ``,
    `   ${chalk.white(`Location:  ${chalk.bold(location)}`)}`,
    `       ${chalk.white(`Work:  ${work.role} at ${chalk.blueBright(chalk.bold(work.company))}`)}`,
    ``,
    `        ${chalk.white(`${linkLabels.web}:  ${data.links.web}`)}`,
    `     ${chalk.white(`${linkLabels.github}:  ${data.links.github}`)}`,
    `    ${chalk.white(`${linkLabels.twitter}:  ${data.links.twitter}`)}`,
    `   ${chalk.white(`${linkLabels.linkedin}:  ${data.links.linkedin}`)}`,
    `        ${chalk.white(`${linkLabels.npm}:  ${data.links.npm}`)}`,
    `     ${chalk.white(`${linkLabels.medium}:  ${data.links.medium}`)}`,
    `        ${chalk.white(`${linkLabels.dev}:  ${data.links.dev}`)}`,
    ``,
    `       ${chalk.white(`Card:  ${chalk.greenBright(data.npx)}`)}`,
    ``,
  ].join("\n"),
  {
    margin: { top: 1, bottom: 1 },
    padding: 1,
    borderStyle: "single",
    borderColor: "blue",
    width: 70,
  },
);

console.info(me);

const option = await select<"email" | "link" | "quit">({
  message: "What do you want to do?",
  choices: [
    { value: "email", name: "Send me an email" },
    { value: "link", name: "Open one of the links" },
    { value: "quit", name: "Quit" },
  ],
});

type LinkChoice = {
  value: Link;
  name: string;
};

console.log();

if (option === "email") {
  open(`mailto:${data.contact}`);
  console.log("📧 Looking forward to hearing from you!");
} else if (option === "link") {
  const link = await select<Link>({
    message: "Which link do you want to open?",
    choices: Object.keys(data.links).map(
      (link): LinkChoice => ({
        value: link as Link,
        name: linkLabels[link as Link],
      }),
    ),
  });

  open(stripChalk(data.links[link]));
} else {
  console.log("👋 See you");
}

process.exit(0);

function stripChalk(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: 🤷
  return str.replace(/\u001B\[[0-9]{1,2}m/g, "");
}
