import xs from 'xstream';
import { div, button, h1, span } from '@cycle/dom';

export default ({ DOM }) => {
  const action$ = xs.merge(
    DOM.select('.increment').events('click').mapTo(1),
    DOM.select('.decrement').events('click').mapTo(-1),
  );

  const count$ = action$.fold((counter, delta) => counter + delta, 0);
  const vdom$ = count$
  .map(count =>
    div([
      h1('Counter Demo'),
      div([
        span('Value:'),
        span('.counter', String(count)),
      ]),
      div('.controls', [
        button('.increment', '+'),
        button('.decrement', '-'),
      ]),
    ]),
  );
  return {
    DOM: vdom$,
  };
};
