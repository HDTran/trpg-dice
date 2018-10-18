# trpg-dice

[![Build Status](https://travis-ci.com/HDTran/trpg-dice.svg?branch=master)](https://travis-ci.com/HDTran/trpg-dice)
[![npm](https://img.shields.io/npm/v/trpg-dice.svg)](https://www.npmjs.com/package/trpg-dice)
![NpmLicense](https://img.shields.io/npm/l/trpg-dice.svg)


Tabletop RPG dice-roller with a multiple dice-types, rolling methods, minimum and maximum values, string output, and error-first callbacks.

## Installation
```sh
npm install trpg-dice 
```

## Usage
To use the library, import the module and call the ``roll()`` method with a dice expression, an optional ``options`` parameter, and a callback function. Dice expressions with standard ``<number of dice>d<number of sides>`` are all supported as well as simple math.

```javascript
const dice = require('trpg-dice');

dice.roll('2d6+10', callback);
dice.roll('d20+2', { roll: 10 }, callback); // will roll d20+2 for 10 times
```

The ``roll()`` method is an error-first callback that invokes the callback function with an error (or null if none) and an object with the original dice expression, minimum, maximum, average, and roll results.

```javascript
{
  expression: '2d6+2',
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
```

## Options
The following options are currently supported:

* **roll** - specifies the amount of times the dice expression should be rolled, increasing the number of roll results returned in the object
