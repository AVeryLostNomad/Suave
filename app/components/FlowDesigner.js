import React, { Component } from 'react';
import { FontClassNames } from '@uifabric/styling';

import {
  Button,
  ButtonType
} from 'office-ui-fabric-react/lib/index'

import FlowCard from './flow_pieces/FlowCard'


import styles from './FlowDesigner.css';

type Props = {
  plugins: {}
};

export default class FlowDesigner extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      saveAllowed: false,
      flowJson: {}
    };
  }

  renderComposableFlow(){
    const {flowJson} = this.state;

    return (<FlowCard collapsedCardColor="rgba(0, 119, 255, 0.15)" dotsColor="#0078d7"/>)
  }

  render() {
    const {saveAllowed} = this.state;

    return (
      <div className={`${FontClassNames.medium} ${styles.designer_container}`}>
        <div className={styles.designer_canvas}>
          <div className={styles.designer_canvas_parallel}>
            <div className={styles.card_container}>
              <div className={styles.card_flex}>
                <div className={styles.card_view_div}>
                  {this.renderComposableFlow()}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.actionpalette}>
            <div className={styles.buttonsrow}>
              <Button>+ New Step</Button>
              <Button disabled={!saveAllowed}>Save</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
