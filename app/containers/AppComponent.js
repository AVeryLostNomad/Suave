import React from 'react';
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'

import Loading from '../components/Loading';
import Editor from '../components/Editor';

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      plugins: {}
    };
  }

  handleDoneLoading(plugins){
    console.log('Marked done!!');
    // Should trigger a reload of the state and change the window over
    this.setState({
      isLoading: false,
      plugins,
    });
  }

  render() {
    const {isLoading, plugins} = this.state;

    return (
      <Fabric >
        {/* eslint-disable-next-line no-shadow */}
        {isLoading ? <Loading onDone={(pl) => this.handleDoneLoading(pl)} /> : <Editor plugins={plugins} />}
      </Fabric>
    );
  }
}
