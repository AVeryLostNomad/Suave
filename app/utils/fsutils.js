const fs = require("fs");
const os = require("os");

export const homedir = os.homedir();
const { join } = require('path');

export const isDirectory = source => fs.lstatSync(source).isDirectory();
export const isFile = source => fs.lstatSync(source).isFile();
export const getDirectories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory);
export const getFiles = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isFile);
