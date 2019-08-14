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

    return (<FlowCard collapsedCardColor="rgba(0, 119, 255, 0.15)" dotsColor="#0078d7"
      cardIconSVG="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PGRlZnMgaWQ9ImRlZnM5Ij48c3R5bGUgaWQ9InN0eWxlMiI+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojNzQyNzc0O30uIGNscy0ze29wYWNpdHk6MDttaXgtYmxlbmQtbW9kZTptdWx0aXBseTtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy00e2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjE2IiB4Mj0iMTYiIHkyPSIzMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzIzMWYyMCIgc3RvcC1vcGFjaXR5PSIwIiBpZD0ic3RvcDQiLz48c3RvcCBvZmZzZXQ9IjEiIGlkPSJzdG9wNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZSBpZD0idGl0bGUxMSI+ZGVzaWduZXIgaWNvbnM8L3RpdGxlPjxwYXRoIGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzA3ZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMCAwaDMydjMyaC0zMnoiLz48cGF0aCBkPSJNMTMuNzI5IDEzLjkzNHYtMy40MTljMC0xLjI2MiAxLjAyNC0yLjI4NiAyLjI4Ni0yLjI4NnMyLjI4NiAxLjAyNCAyLjI4NiAyLjI4NnYzLjQxOWMxLjEwNi0uNzQxIDEuODI5LTEuOTkzIDEuODI5LTMuNDE5IDAtMi4yNzctMS44MzgtNC4xMTQtNC4xMTQtNC4xMTQtMi4yNzcgMC00LjExNCAxLjgzOC00LjExNCA0LjExNCAwIDEuNDI2LjcyMiAyLjY3OSAxLjgyOSAzLjQxOXptOC45OTcgNC4yMzNsLTQuMTUxLTIuMDY2Yy0uMTU1LS4wNjQtLjMyLS4xMDEtLjQ5NC0uMTAxaC0uNjk1di01LjQ4NmMwLS43NTktLjYxMy0xLjM3MS0xLjM3MS0xLjM3MS0uNzU5IDAtMS4zNzEuNjEzLTEuMzcxIDEuMzcxdjkuODE5bC0zLjEzNi0uNjU4LS4yMTktLjAyN2MtLjI4MyAwLS41MzkuMTE5LS43MjIuMzAybC0uNzIyLjczMSA0LjUxNyA0LjUxN2MuMjQ3LjI0Ny41OTQuNDAyLjk2OS40MDJoNi4yMDhjLjY4NiAwIDEuMjE2LS41MDMgMS4zMTctMS4xN2wuNjg2LTQuODE4LjAxOC0uMTgzYzAtLjU2Ny0uMzQ3LTEuMDYxLS44MzItMS4yNjJ6IiBpZD0iU2hhcGUiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
      cardTitle="Manually trigger a flow"
      borderColorCode="rgb(0, 119, 255)"
    />)
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
