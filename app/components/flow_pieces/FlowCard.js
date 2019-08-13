import React, { Component } from 'react';
import {
  ContextualMenu,
  Button,
  DirectionalHint
} from 'office-ui-fabric-react/lib/index'
import { Icon } from 'office-ui-fabric-react/lib/Icon'

import styles from './FlowCard.css';

type Props = {
  plugins: {},
  collapsedCardColor: "", // rgba(0, 119, 255, 0.15),
  dotsColor: "" // #0078d7
};

export default class Test extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      isContextMenuVisible: false
    };
  }

  clickContextDots(event: any){
    this.setState({target: {x: event.clientX, y: event.clientY}, isContextMenuVisible: true});
  }

  dismissContextDots(){
    this.setState({
      isContextMenuVisible: false
    });
  }

  renderContextDots(){
    const {isContextMenuVisible, target} = this.state;

    const {dotsColor} = this.props;

    const dotsStyle = {
      color: dotsColor
    };

    return (
      <div className={styles.card_context}>
      <button className={styles.context_button} onClick={(event) => {this.clickContextDots(event)}}>
        <Icon iconName="More" style={dotsStyle} />
      </button>
        {isContextMenuVisible ?
          (
            <ContextualMenu
              shouldFocusOnMount
              targetPoint={target}
              useTargetPoint
              onDismiss={() => this.dismissContextDots()}
              directionalHint={DirectionalHint.bottomLeftEdge}
              items={[
                {
                  key: 'rename',
                  name: 'Rename'
                },
                {
                  key: 'comment',
                  name: 'Add a comment'
                },
                {
                  key: 'settings',
                  name: 'Settings'
                },
                {
                  key: 'delete',
                  name: 'Delete'
                }
              ]}
            />
            ) : null}
      </div>
    );
  }

  renderCollapsedCard(){
    const {collapsedCardColor} = this.props;

    const cardHeaderStyle = {
      backgroundColor: collapsedCardColor
    };

    return (
      <div className={styles.card_header} draggable="false" style={cardHeaderStyle}>
        {/* Option menu */}
        <div className={styles.card_closed_content}>

        </div>
        {this.renderContextDots(collapsedCardColor)}
      </div>
    );
  }

  renderOpenedCard(){

  }

  render() {
    const { collapsed } = this.state;

    return (
      <div className={styles.card_caption}>
        <div className={styles.card}>
          {collapsed ? this.renderCollapsedCard() : this.renderOpenedCard()}
        </div>
      </div>
    );
  }
}
