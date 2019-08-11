// @flow
import React, { Component } from 'react';
import {Nav} from 'office-ui-fabric-react/lib/index'
import styles from './Editor.css';

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
        {/* Nav headers */}
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
        <div className={styles.Appcontent}>
          Walooyoo
        </div>
      </div>
    );
  }
}
