import xs from 'xstream'; // eslint-disable-line no-unused-vars
import { run } from '@cycle/xstream-run';
import { makeDOMDriver } from '@cycle/dom';
import counter from './app';

const drivers = {
  DOM: makeDOMDriver('#app'),
};

run(counter, drivers);
