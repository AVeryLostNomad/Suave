// @flow
import React, { Component } from 'react';
import Loading from '../components/Loading';

type Props = {};

export default class LoadingPage extends Component<Props> {
  props: Props;

  render() {
    return <Loading />;
  }
}
