// @flow
import React, { Component } from 'react';
import {Nav} from 'office-ui-fabric-react/lib/index'
import {
  ColorClassNames,
  FontClassNames
} from '@uifabric/styling'
import { initializeIcons  } from 'office-ui-fabric-react/lib/Icons'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

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
    };
  }

  render() {
    // const {plugins} = this.props;

    return (
      <div  className={styles.container}>
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
        <div className={styles.Appnav}>
          <Nav groups = {[
            {
              name: 'Test Group',
              links: [
                {
                  key: 'ActivityItem',
                  name: 'ActivityItem',
                  url: '#/examples/activityitem'
                },
                {
                  key: 'Breadcrumb',
                  name: 'Breadcrumb',
                  url: '#/examples/breadcrumb'
                }
              ]
            }
          ]}
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
