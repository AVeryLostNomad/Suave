// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Loading.css';

const { spawn } = require('child_process');

type Props = {};

export default class Loading extends Component<Props> {
  props: Props;

  constructor() {
    let i = 0;
    let direction = 1;
    const numberSteps = 5;

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
      pyvers.kill();
      this.stepTwo(numberSteps);
    });
    pyvers.stderr.on('data', () => {
      this.codeRef.current.innerText = 'sudo apt-get install python?';
      // TODO set colors to a reddish to show error, stop loading message.
      this.statusText.current.innerText = 'Python not installed / not on path. Please install.';
      pyvers.kill();
    });
  }

  stepTwo(numberSteps){
    const pyreqs = spawn('python', ['-m', 'pip', 'freeze']);

    pyreqs.stdout.on('data', (data) => {
      this.progressBarRef.current.value += (1 / numberSteps);
      this.statusText.current.innerText = 'Requirements distilled. Checking filesystem.';
      console.log(data);
      pyreqs.kill();
    });

    pyreqs.stderr.on('data', () => {

    });
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
