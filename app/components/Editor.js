// @flow
import React, { Component } from 'react';
import {Nav} from 'office-ui-fabric-react/lib/index'
import {
  ColorClassNames,
  FontClassNames
} from '@uifabric/styling'
import { initializeIcons  } from 'office-ui-fabric-react/lib/Icons'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import ReactDOM from "react-dom"

import styles from './Editor.css';

initializeIcons();

type Props = {
  plugins: {}
};

export default class Editor extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      visiblePage: 'dashboard'
    };
  }

  navLinkClick(e: React.MouseEvent<HTMLElement>, item: INavLink): void {
    console.log(item.key);
    this.setState({
      visiblePage: item.key
    });
  }

  render() {
    // const {plugins} = this.props;
    const {visiblePage} = this.state;

    return (
      <div className={styles.container}>
        {/* Header of the app */}
        <div className={styles.Appheader}>
          <div className={styles.Header}>
            <div className={`${styles.Headertitle} ${FontClassNames.xLarge} ${ColorClassNames.white}`}>
              <Icon iconName="AllApps" />
              <span>Suave Editor</span>
            </div>
          </div>
        </div>

        {/* Navigation block */}
        <div className={styles.Appnav} ref={c => {this.navarea = c}}>
          <Nav groups = {[
            {
              name: 'Basic Function',
              links: [
                {
                  key: 'dashboard',
                  name: 'Dashboard',
                  url: ''
                },
                {
                  key: 'plugins',
                  name: 'Plugins',
                  url: ''
                }
              ],
            }
          ]}
               onLinkClick={(e, item) => this.navLinkClick(e, item)}
               selectedKey={visiblePage}
          />
        </div>

        {/* Content */}
        <div className={styles.Appcontent}>
          Walooyoo
        </div>
      </div>
    );
  }
}
