import React from 'react';

import Loading from '../components/Loading';
import Editor from '../components/Editor';

export default class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  handleDoneLoading(){
    console.log('Marked done!!');
    // Should trigger a reload of the state and change the window over
    this.setState({isLoading: false});
  }

  render() {
    const {isLoading} = this.state;

    return (
      <div>
        {isLoading ? <Loading onDone={() => this.handleDoneLoading()} /> : <Editor />}
      </div>
    );
  }
}
