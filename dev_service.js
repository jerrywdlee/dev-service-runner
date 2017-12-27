#!/usr/bin/env node

'use strict';
const { spawn } = require('child_process');
const path = require("path");
const YAML = require('yamljs');
const colors = require('colors/safe');
const COLOR_ARRAY = [
  'black', 'red', 'green', 'yellow', 'blue',
  'magenta', 'cyan', 'white', 'gray', 'rainbow'
];
let CONF_PATHS = [
  path.resolve('dev-service.conf.yml'),
  path.resolve(__dirname, 'dev-service.conf.yml')
];

// console.log(process.argv);
if (process.argv[2]) {
  // CONF_PATHS.unshift(path.resolve(process.argv[2]));
  // force use argument
  CONF_PATHS = [path.resolve(process.argv[2])];
}

let devService = null;

for (const confPath of CONF_PATHS) {
  try {
    devService = YAML.load(confPath);
    if (devService) break;
  } catch (error) {}
}

if (!devService) {
  console.log(colors.bold.red(`Failed!`), `\nNo ${colors.bold.green('dev-service.conf.yml')} find under ${__dirname}`);
  process.exit(1);
}

const RUNNERS = [];

for (let i = 0; i < devService.length; i++) {
  let { nameTag, color, command } = devService[i];
  color = color || COLOR_ARRAY[parseInt(Math.random() * COLOR_ARRAY.length)]; // if no color defined, use random
  let params = command.trim().split(' ');
  command = params.shift();

  const runner = spawn(command, params);
  runner.stdout.on('data', (data) => {
    // console.log(data.toString());
    data.toString()
      .replace(/\n\r$|\n$/, '')
      .split(/\n\r|\n/)
      .forEach(row => {
      console.log(colors.bold[color](`[${nameTag}]`), row);
    });
  });

  runner.stderr.on('data', (data) => {
    data.toString()
      .replace(/\n\r$|\n$/, '')
      .split(/\n\r|\n/)
      .forEach(row => {
      console.log(colors.bold[color](`[${nameTag}]`), colors.red(row));
    });
  });

  runner.on('close', (code) => {
    console.log(colors.bold[color](`[${nameTag}]`), `exited with code ${code}`);
  });

  RUNNERS.push(runner);
}
