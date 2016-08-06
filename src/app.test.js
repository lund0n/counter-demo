/* eslint-env mocha */
/* eslint import/no-extraneous-dependencies: ["error",{"devDependencies":true}] */
// import xs from 'xstream';
import { mockDOMSource } from '@cycle/dom';
import xstreamAdapter from '@cycle/xstream-adapter';
import fromDiagram from 'xstream/extra/fromDiagram';
import select from 'snabbdom-selector';
import assert from 'assert';
import app from './app';

describe('counter component', () => {
  it('should work', done => {
    // Increment five times, then decrement once.
    const DOM = mockDOMSource(xstreamAdapter, {
      '.increment': {
        click: fromDiagram('--c--c--c--c--c---|'),
      },
      '.decrement': {
        click: fromDiagram('-----------------c|'),
      },
    });
    const expected = [0, 1, 2, 3, 4, 5, 4];
    let index = 0;
    const sinks = app({ DOM });
    // TODO figure out a way to merge expected with actual to make test easier.
    const actual$ = sinks.DOM
      .map(vdom => select('.counter', vdom)[0].text);
    actual$.addListener({
      next: actual => {
        assert.equal(actual, expected[index]);
        index++;
      },
      error: err => done(err),
      complete: () => done(),
    });
  });
});
