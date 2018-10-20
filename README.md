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

function callback (err, result) {
  if (err) {
    throw err;
  } else {
    console.log(result);
  }
}

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
    { result: 12, resultString: '(5+5)+2', condensedResultString: '(10)+2' },
    { result: 8, resultString: '(1+5)+2', condensedResultString: '(6)+2' },
    { result: 11, resultString: '(3+6)+2', condensedResultString: '(9)+2' },
    { result: 5, resultString: '(2+1)+2', condensedResultString: '(3)+2' },
    { result: 8, resultString: '(5+1)+2', condensedResultString: '(6)+2' },
    { result: 13, resultString: '(6+5)+2', condensedResultString: '(11)+2' },
    { result: 9, resultString: '(5+2)+2', condensedResultString: '(7)+2' },
    { result: 9, resultString: '(4+3)+2', condensedResultString: '(7)+2' },
    { result: 8, resultString: '(4+2)+2', condensedResultString: '(6)+2' },
    { result: 8, resultString: '(4+2)+2', condensedResultString: '(6)+2' }
  ]
}
```

## Options
The following options are currently supported:

* **roll** - specifies the amount of times the dice expression should be rolled, increasing the number of roll results returned in the object
