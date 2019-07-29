// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Loading.css';

type Props = {};

export default class Loading extends Component<Props> {
  props: Props;

  constructor() {
    super();

    console.log(
      'This is a console message from the constructor of the loading guy'
    );
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Loading</h2>
        <Link to={routes.COUNTER}>to Counter</Link>
        <x-box>
          <x-button>
            <x-label>Button</x-label>
          </x-button>

          <x-button>
            <x-label>Button</x-label>
          </x-button>
        </x-box>
      </div>
    );
  }
}
