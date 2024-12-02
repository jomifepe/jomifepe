#! /usr/bin/env node

import { select as ask } from "@inquirer/prompts";
import chalk from "chalk";
import box from "boxen";
import open from "open";

process.on("SIGINT", bye);
process.on("SIGTERM", bye);
process.on("uncaughtException", (error) => {
  if (error.name === "ExitPromptError") {
    bye();
  } else {
    console.error(error);
    process.exit(1);
  }
});

const handle = "jomifepe";
export const info = {
  handle,
  name: "José Pereira",
  location: "Portugal",
  contact: `contact@${handle}.dev`,
  role: "Software Engineer",
  company: "Prismic",
  links: {
    web: `https://${handle}.dev`,
    github: `https://github.com/${handle}`,
    twitter: `https://twitter.com/${handle}`,
    npm: `https://npmjs.com/~${handle}`,
    linkedin: `https://linkedin.com/in/${handle}`,
    medium: `https://medium.com/@${handle}`,
    dev: `https://dev.to/${handle}`,
  },
  npx: `npx ${handle}`,
};

type Link = keyof typeof info.links;

const linkLabels: Record<Link, string> = {
  web: "Web",
  github: "GitHub",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  npm: "npm",
  medium: "Medium",
  dev: "Dev",
};

const card = `${chalk.white(`${chalk.bold(info.name)} / ${chalk.green(chalk.bold(info.handle))}`)}

   ${chalk.white(`Location:  ${tugaify(info.location)}`)}
       ${chalk.white(`Work:  ${info.role} at ${chalk.blueBright(chalk.bold(info.company))}`)}
   
        ${chalk.white(`${linkLabels.web}:  ${colorizeLink(info.links.web, "magenta")}`)}
     ${chalk.white(`${linkLabels.github}:  ${colorizeLink(info.links.github, "green")}`)}
    ${chalk.white(`${linkLabels.twitter}:  ${colorizeLink(info.links.twitter, "cyan")}`)}
   ${chalk.white(`${linkLabels.linkedin}:  ${colorizeLink(info.links.linkedin, "blue")}`)}
        ${chalk.white(`${linkLabels.npm}:  ${colorizeLink(info.links.npm, "red")}`)}
     ${chalk.white(`${linkLabels.medium}:  ${colorizeLink(info.links.medium, "white")}`)}
        ${chalk.white(`${linkLabels.dev}:  ${colorizeLink(info.links.dev, "white")}`)}
    
       ${chalk.white(`Card:  ${chalk.greenBright(info.npx)}`)}`;

console.info(
  box(card, {
    margin: { top: 1, bottom: 1 },
    padding: 1,
    borderStyle: "round",
    borderColor: "blue",
    width: 70,
  }),
);

const option = await ask({
  message: "What do you want to do?",
  choices: [
    { value: "email", name: "Send me an email" },
    { value: "link", name: "Open one of the links" },
    { value: "quit", name: "Quit" },
  ] as const,
});

switch (option) {
  case "email": {
    open(`mailto:${info.contact}`);
    console.log("\n📧 Looking forward to hearing from you!\n");
    break;
  }
  case "link": {
    const link = await ask({
      message: "Which link do you want to open?",
      choices: Object.keys(info.links).map((link) => ({
        value: link as Link,
        name: linkLabels[link as Link],
      })),
    });

    open(info.links[link]);
    bye();
    break;
  }
  case "quit": {
    bye();
    break;
  }
}

function colorizeLink(link: string, style: "red" | "green" | "blue" | "magenta" | "cyan" | "white") {
  return chalk.grey(link.replace(new RegExp(info.handle, "gi"), (match) => chalk[style](match)));
}

function tugaify(value: string) {
  return value.replace(/portugal/gi, (match) => {
    return match
      .replace(/po/gi, (match) => chalk.green(match))
      .replace(/rt/gi, (match) => chalk.yellow(match))
      .replace(/ugal/gi, (match) => chalk.red(match));
  });
}

function bye() {
  console.log("\n👋 See you around.\n");
  process.exit(0);
}
