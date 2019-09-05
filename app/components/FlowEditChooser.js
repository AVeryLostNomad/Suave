import React, { Component } from 'react';

import { CommandBar } from 'office-ui-fabric-react/dist/office-ui-fabric-react';

const fs = require("fs");
import {getFiles, homedir} from '../utils/fsutils';

export default class FlowEditChooser extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      discoveredFlows: []
    };

    this.findAllFlowsOnPath();
  }

  findAllFlowsOnPath(){
    const folder = `${homedir  }\\Documents\\Suave\\Flows`;
    if(!fs.existsSync(folder)){
      fs.mkdirSync(folder);
    }

    this.setState({
      discoveredFlows: getFiles(folder)
    });
  }

  render() {
    return (
      <div>
        Hi
      </div>
    );
  }
}
