# trpg-dice
Tabletop RPG dice-roller with a multiple dice-types, rolling methods, minimum and maximum values, string output, and error-first callbacks.

## Usage
To use the library, import the module and call the ``roll()`` method with an optional ``options`` parameter and a callback function.

``
const dice = require('trpg-dice');

dice.roll('2d6+10', callback);
dice.roll('d20+2', { roll: 10 }, callback); // will roll d20+2 for 20 times
``

The ``roll()`` method is an error-first callback that invokes the callback function with an error (or null if none) and an object with the minimum, maximum, average, and roll results.
``
{
  min: 4,
  max: 14,
  avg: 9,
  rolls: [
    { result: 11, resultString: '[9]+2' },
    { result: 10, resultString: '[8]+2' },
    { result: 8, resultString: '[6]+2' },
    { result: 11, resultString: '[9]+2' },
    { result: 8, resultString: '[6]+2' },
    { result: 6, resultString: '[4]+2' },
    { result: 10, resultString: '[8]+2' },
    { result: 9, resultString: '[7]+2' },
    { result: 10, resultString: '[8]+2' },
    { result: 5, resultString: '[3]+2' }
  ]
}
``