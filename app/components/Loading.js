// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Loading.css';

const debug = true;

const { spawn } = require('child_process');
const fs = require("fs");

const homedir = require('os').homedir();
const { join } = require('path');

const isDirectory = source => fs.lstatSync(source).isDirectory();
const isFile = source => fs.lstatSync(source).isFile();
const getDirectories = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const getFiles = source =>
  fs.readdirSync(source).map(name => join(source, name)).filter(isFile);

type Props = {};

export default class Loading extends Component<Props> {
  props: Props;

  constructor() {
    let i = 0;
    let direction = 1;
    const numberSteps = 4;

    super();

    console.log(
      'This is a console message from the constructor of the loading guy'
    );

    this.progressRef = React.createRef();
    this.codeRef = React.createRef();
    this.progressBarRef = React.createRef();
    this.statusText = React.createRef();

    setInterval(() => {
      const element = this.progressRef.current;
      switch(i){
        case(0):{
          element.innerText = 'Loading';
          break;
        }
        case(1):{
          element.innerText = 'Loading.';
          break;
        }
        case(2):{
          element.innerText = 'Loading..';
          break;
        }
        default:
        case(3):{
          element.innerText = 'Loading...';
          break;
        }
      }
      if(i === 0){
        direction = 1;
      }
      if(i === 3){
        direction = -1;
      }
      i+=direction;
    }, 500);

    // Step one we need to run a python version check to make sure we have python
    // installed by running a python --version.
    const pyvers = spawn('python', ['--version']);

    pyvers.stdout.on('data', () => {
      this.progressBarRef.current.value += (1 / numberSteps);
      // We'll be moving to phase 2, which consists of building a list of installed packages
      this.codeRef.current.innerText = 'python -m pip freeze';
      this.statusText.current.innerText = 'Python installed. Checking available packages.';
      pyvers.kill('SIGINT');
      this.stepTwo(numberSteps);
    });
    pyvers.stderr.on('data', () => {
      this.codeRef.current.innerText = 'sudo apt-get install python?';
      // TODO set colors to a reddish to show error, stop loading message.
      this.statusText.current.innerText = 'Python not installed / not on path. Please install.';
      pyvers.kill('SIGINT');
    });
  }

  stepTwo(numberSteps){
    const pyreqs = spawn('python', ['-m', 'pip', 'freeze']);

    pyreqs.stdout.on('data', (data) => {
      const packages = data.toString();
      // If I ever need to ensure some basic plugins are present, do so here.
      window.packages = packages;
      this.progressBarRef.current.value += (1 / numberSteps);
      this.statusText.current.innerText = 'Requirements distilled. Checking filesystem.';
      this.codeRef.current.innerText = `touch ${  homedir  }\\Documents\\Suave`;
      pyreqs.kill('SIGINT');
      this.stepThree(numberSteps);
    });

    pyreqs.stderr.on('data', () => {
      // TODO error getting dependencies? Shouldn't happen, but we need an error message.
    });
  }

  stepThree(numberSteps){
    const subSteps = 3;
    const perSubstep = (1 / numberSteps) / subSteps;

    /*
    In step three we prep the file system.
    1) Is make sure the folder exists
    2) Is make sure the default builtin python files are in the plugin folder
    3) Is load all plugins
     */

    // 1)
    let path = `${homedir  }\\Documents\\Suave`;
    if(!fs.existsSync(path)){
      this.statusText.current.innerText = 'Creating documents folder.';
      fs.mkdirSync(path);
    }
    this.codeRef.current.innerText = `touch ${  homedir  }\\Documents\\Suave\\Plugins`;
    path = `${homedir}\\Documents\\Suave\\Plugins`;
    if(!fs.existsSync(path)){
      this.statusText.current.innerText = 'Creating plugins folder.';
      fs.mkdirSync(path);
    }
    this.statusText.current.innerText = 'Folders found. Checking default python utility files.';
    this.progressBarRef.current.value += perSubstep;

    // 2)
    this.codeRef.current.innerText = `touch ${  homedir  }\\Documents\\Suave\\Plugins\\plugin_base.py`;
    if(!fs.existsSync(`${path}\\plugin_base.py`)){
      const content = fs.readFileSync("app\\builtin\\plugin_base.py", "utf-8");
      this.statusText.current.innerText = 'Creating plugin_base.py.';
      fs.writeFileSync(`${path}\\plugin_base.py`, content);
    }
    this.codeRef.current.innerText = `touch ${  homedir  }\\Documents\\Suave\\Plugins\\explore_plugin_package.py`;
    if(!fs.existsSync(`${path}\\explore_plugin_package.py`)){
      const content = fs.readFileSync("app\\builtin\\explore_plugin_package.py", "utf-8");
      this.statusText.current.innerText = 'Creating explore_plugin_package.py.';
      fs.writeFileSync(`${path}\\explore_plugin_package.py`, content);
    }
    this.codeRef.current.innerText = `touch ${  homedir  }\\Documents\\Suave\\Plugins\\execute_and_receive.py`;
    if(!fs.existsSync(`${path}\\execute_and_receive.py`)){
      const content = fs.readFileSync("app\\builtin\\execute_and_receive.py", "utf-8");
      this.statusText.current.innerText = 'Creating execute_and_receive.py.';
      fs.writeFileSync(`${path}\\execute_and_receive.py`, content);
    }
    this.statusText.current.innerText = 'Default python utility files found. Checking for plugins.';
    this.progressBarRef.current.value += perSubstep;
    this.codeRef.current.innerText = 'python explore_plugin_package.py';

    // 3)
    const directoriesList = getDirectories(path);
    this.statusText.current.innerText = `Found ${directoriesList.length} plugins to explore.`;
    const perPlugin = perSubstep / directoriesList.length;
    const loaded = {};
    this.affected = false;
    for(let i = 0; i < directoriesList.length; i+=1){
      // Let's scope into that directory and see if we can figure out all the various triggers, actions, etc... within it. We need this information to know paths for when we actually
      const dirPath = directoriesList[i];
      if(debug){
        console.log(`Working on ${  dirPath}`);
      }
      const fileList = getFiles(dirPath);
      // We now have a list of all files within the directory. We are looking for the ones that end in .py
      for(let j = 0; j < fileList.length; j++){
        const thisFile = fileList[j];
        if(thisFile.endsWith('.py')){
          // This is a python file
          console.log(`Found python file: ${  thisFile}`);
          const child = spawn('python', [`${path  }\\explore_plugin_package.py`, thisFile]);

          const thisFileCopy = (` ${  dirPath}`).slice(1);
          this.statusText.current.innerText = `Exploring ${thisFileCopy}`;

          child.stdout.on('data', (data)=>{
            const string = data.toString();
            const arrayofLines=string.match(/[^\r\n]+/g);
            if(debug) console.log(arrayofLines[0].replace(new RegExp('\'', 'g'), "\"")); // triggers
            if(debug) console.log(arrayofLines[1].replace(new RegExp('\'', 'g'), "\"")); // actions
            if(debug) console.log(arrayofLines[2].replace(new RegExp('\'', 'g'), "\"")); // prelaunch

            const triggers = JSON.parse(arrayofLines[0].replace(new RegExp('\'', 'g'), "\""));
            const actions = JSON.parse(arrayofLines[1].replace(new RegExp('\'', 'g'), "\""));
            const prelaunch = JSON.parse(arrayofLines[2].replace(new RegExp('\'', 'g'), "\""));
            loaded[thisFileCopy] = {
              'pyfile': thisFile,
              'triggers': triggers,
              'actions': actions,
              'prelaunch': prelaunch
            };
            this.affected = true;
            child.kill('SIGINT');
            this.progressBarRef.current.value += perPlugin;
          });

          child.stderr.on('data', (data)=>{
            console.log(data.toString());
            child.kill('SIGINT');
          });
        }
      }
    }
    if(debug) console.log(loaded);
    window.loaded_plugins = loaded;

    const a = setInterval(() => {
      if(this.affected){
        this.statusText.current.innerText = 'All plugins loaded! Running any prelaunch procedures.';
        this.codeRef.current.innerText = 'suave prelaunch';

        // What else do I need to do?
        clearInterval(a);
        console.log('Going to step 4');
        this.stepFour(numberSteps);
      }
    }, 250);
  }

  stepFour(numberSteps){
    // We want to go through each plugin and see if it has any prelaunch commands. If so, we need to go ahead and run it.
    window.localStorage.setItem('loaded_plugins', JSON.stringify(window.loaded_plugins)); // TODO can remove this if it turns out to be unnecessary because window.loadedplugins presists anyway.
    const path = `${homedir}\\Documents\\Suave\\Plugins`;
    Object.keys(window.loaded_plugins).forEach((key) => {
      const value = window.loaded_plugins[key];
      if(debug) console.log(`Checking ${key}`);
      console.log(value);
      if('prelaunch' in value){
        // We might have some prelaunch operations
        const prelaunchArray = value.prelaunch;
        if(prelaunchArray.length > 0){
          // We actually have something to run
          prelaunchArray.forEach((command) => {
            // Execute this python code
            console.log(`Executing ${  command.codename}`);
            const child = spawn('python', [`${path}\\execute_and_receive.py`, `${value.pyfile}`, command.codename]);

            child.stdout.on('data', (data)=>{
              console.log(data.toString());
              child.kill('SIGINT')
            });

            child.stderr.on('data', (data)=>{
              console.log(data.toString());
              child.kill('SIGINT');
            });
          });
        }
      }
    });
    this.statusText.current.innerText = 'All prelaunch steps executed!';
    this.progressBarRef.current.value = 1;
    this.codeRef.current.innerText = 'suave itsgotime';
  }

  render() {
    return (
      <div className={styles.container}>
          <div className={styles.element}>
            <div>
              <h2 className={styles.loading_msg} ref={this.progressRef}>Loading...</h2>
              <p ref={this.statusText}>
                We&apos;re getting ready to start Suave. Hold on.
              </p>
              <xel-codeview ref={this.codeRef} class={styles.loading_codeview}>python --version</xel-codeview>

              <x-progressbar class={styles.loading_progress} ref={this.progressBarRef} value="0"/>
            </div>
          </div>
      </div>
    );
  }
}
