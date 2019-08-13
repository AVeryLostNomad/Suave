import React, { Component } from 'react';
import {
  ColorClassNames,
  FontClassNames
} from '@uifabric/styling'
import styles from './Plugins.css';

const { shell } = require('electron');
const homedir = require('os').homedir();

type Props = {
  plugins: {}
};

export default class Plugins extends Component<Props> {
  props: Props;

  openPluginsFolder(){
    shell.openItem(`${homedir}\\Documents\\Suave\\Plugins`);
  }

  render() {
    return (
      <div className={FontClassNames.medium}>
        <h1 className={FontClassNames.xLarge}>Plugins</h1>
        <div>
          Here are all the plugins Suave was able to find and load. <a
            className={styles.mslink}
            role="button"
             tabIndex={0}
             onClick={() => {this.openPluginsFolder()}}
            onKeyPress={() => {this.openPluginsFolder()}}>
            Open your plugins folder?
          </a>
        </div>


      </div>
    );
  }
}
