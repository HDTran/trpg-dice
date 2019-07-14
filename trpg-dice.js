/**
 * Tabletop RPG dice-roller with a multiple dice-types, rolling methods, minimum and maximum values, string output, and error-first callbacks.
 *
 * MIT License
 * Copyright (c) 2018 Huy Tran
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const DEFAULT_OPTIONS = {
  roll: 1
};

// TODO: Implement keep/drop
// const VALID_REGEX = /^[0-9d\+\-\/\(\)%fkhdl]*$/;
// const DICE_REGEX = /([0-9]+)?d([0-9]+|%|f)((k|kh|d|dl)([0-9]+))?/g;
const VALID_REGEX = /^[0-9d\+\-\/\(\)%f]*$/;
const DICE_REGEX = /([0-9]+)?d([0-9]+|%|f)/g;

/**
 * Error-first callback with object generated from the dice expression
 * @param {String} diceExpression - The dice-string to evaluate
 * @param {Object} options - (optional) Various flags to change rolling behavior
 * @param {Function} callback - The callback function to execute with error-first response
 */
function roll(diceExpression = `2d6+6`, options = DEFAULT_OPTIONS, callback) {
  if (typeof options === "function") {
    callback = options;
    options = DEFAULT_OPTIONS;
  }

  diceExpression = diceExpression.toLowerCase();

  /* test validity by only allowing certain characters */
  const validPattern = new RegExp(VALID_REGEX);
  if (!validPattern.test(diceExpression)) {
    return callback(
      new Error(
        `The dice expression includes characters that are not allowed.`
      ),
      null
    );
  }

  // TODO: Check diceExpression doesn't start with or ends with a weird operator

  /* replace d% with d100 */
  const originalDiceExpression = diceExpression;
  diceExpression = diceExpression.replace(/%/g, "100");

  const diceCodes = diceExpression.match(DICE_REGEX);
  let rolls = [];
  let min = null;
  let max = null;
  let avg = null;

  let minResultString = diceExpression;
  let maxResultString = diceExpression;
  let avgResultString = diceExpression;

  for (let diceCode of diceCodes) {
    let numberValues = diceCode.split("d");
    let numberOfDice = Number(numberValues[0]);
    let numberOfDiceToRoll = numberOfDice;
    let numberOfSides = numberValues[1];

    // normalize dice number
    if (numberValues[0] === "") {
      numberOfDice = 1;
      numberOfDiceToRoll = numberOfDice;
    }

    /* TODO: Implement drop/keep
    // check for keep and drop and calculate dice number
    let diceNumberModifier = 0;
    let diceNumberMax = null;
    if (numberValues[1].indexOf("kh") !== -1) {
      let diceNumberAndKeep = numberValues[1].split("kh");
      numberOfSides = diceNumberAndKeep[0];
      diceNumberMax = diceNumberAndKeep[1];
    } else if (numberValues[1].indexOf("k") !== -1) {
      let diceNumberAndKeep = numberValues[1].split("k");
      numberOfSides = diceNumberAndKeep[0];
      diceNumberMax = diceNumberAndKeep[1];
    } else if (numberValues[1].indexOf("dl") !== -1) {
      let diceNumberAndDrop = numberValues[1].split("dl");
      numberOfSides = diceNumberAndDrop[0];
      diceNumberModifier = diceNumberAndDrop[1] * -1;
    } else if (numberValues[1].indexOf("d") !== -1) {
      let diceNumberAndDrop = numberValues[1].split("d");
      numberOfSides = diceNumberAndDrop[0];
      diceNumberModifier = diceNumberAndDrop[1] * -1;
    }

    numberOfDice = Number(numberOfDice) + diceNumberModifier;

    // check first for keep/drop modifiers and modify multiple dice count
    numberOfDice = numberOfDice < 0 ? 0 : numberOfDice;
    if (
      diceNumberMax !== null &&
      diceNumberMax > -1 &&
      diceNumberMax < numberOfDice
    ) {
      numberOfDice = diceNumberMax;
    }
    */

    // 1 die assumption of lowest face equal 1 on normal numbered dice
    let minValue = 1;
    let maxValue;
    let avgValue;

    // fate/fudge dice
    if (numberValues[1] === "f") {
      minValue = -1;

      // fate/fudge dice, number of dice * 1 essentially
      maxValue = numberOfDice;

      // fate/fudge dice, blank face
      avgValue = 0;
    } else {
      maxValue = numberOfDice * Number(numberOfSides);

      // this even works for d1
      avgValue = numberOfDice * ((Number(numberOfSides) + 1) / 2);
    }

    // multiple dice
    if (numberOfDice !== "") {
      minValue = numberOfDice * minValue;
    }

    minResultString = minResultString.replace(diceCode, `(${minValue})`);
    maxResultString = maxResultString.replace(diceCode, `(${maxValue})`);
    avgResultString = avgResultString.replace(diceCode, `(${avgValue})`);
  }

  try {
    min = eval(minResultString);
    max = eval(maxResultString);
    avg = eval(avgResultString);
  } catch (err) {
    return callback(err, null);
  }

  /* calculate rolls */
  for (let i = 0; i < options.roll; i++) {
    let resultString = diceExpression;
    let condensedResultString = diceExpression;

    for (let diceCode of diceCodes) {
      let numberValues = diceCode.split("d");
      if (numberValues[0] === "") {
        numberValues[0] = 1;
      }
      let numberOfDice = numberValues[0];
      let numberOfDiceToRoll = numberOfDice;

      /* TODO: Implement drop/keep
      // check for keep and drop and calculate dice number
      let diceNumberModifier = 0;
      let diceNumberMax = null;
      if (numberValues[1].indexOf("kh") !== -1) {
        let diceNumberAndKeep = numberValues[1].split("kh");
        numberValues[1] = diceNumberAndKeep[0];
        diceNumberMax = diceNumberAndKeep[1];
      } else if (numberValues[1].indexOf("k") !== -1) {
        let diceNumberAndKeep = numberValues[1].split("k");
        numberValues[1] = diceNumberAndKeep[0];
        diceNumberMax = diceNumberAndKeep[1];
      } else if (numberValues[1].indexOf("dl") !== -1) {
        let diceNumberAndDrop = numberValues[1].split("dl");
        numberValues[1] = diceNumberAndDrop[0];
        diceNumberModifier = diceNumberAndDrop[1] * -1;
      } else if (numberValues[1].indexOf("d") !== -1) {
        let diceNumberAndDrop = numberValues[1].split("d");
        numberValues[1] = diceNumberAndDrop[0];
        diceNumberModifier = diceNumberAndDrop[1] * -1;
      }

      numberOfDice = Number(numberOfDice) + diceNumberModifier;

      // check first for keep/drop modifiers and modify multiple dice count
      numberOfDice = numberOfDice < 0 ? 0 : numberOfDice;
      if (
        diceNumberMax !== null &&
        diceNumberMax > -1 &&
        diceNumberMax < numberOfDice
      ) {
        numberOfDice = diceNumberMax;
      }
      */

      // iterate through all dice
      let diceCodeResult = "";
      let diceCodeValue = 0;
      for (let j = 0; j < numberOfDice; j++) {
        let diceValue = 0;

        if (numberValues[1] !== "f") {
          diceValue += Math.floor(Math.random() * numberValues[1]) + 1;
        } else {
          diceValue += Math.floor(Math.random() * 3) - 1; // fate/fudge
        }

        diceCodeValue += diceValue;
        if (diceCodeResult.length === 0 || diceValue < 0) {
          diceCodeResult += diceValue.toString();
        } else {
          diceCodeResult += `+${diceValue.toString()}`;
        }
      }
      resultString = resultString.replace(diceCode, `(${diceCodeResult})`);
      condensedResultString = condensedResultString.replace(
        diceCode,
        `(${diceCodeValue})`
      );
    }

    try {
      rolls.push({
        result: eval(resultString),
        resultString,
        condensedResultString
      });
    } catch (err) {
      return callback(err, null);
    }
  }

  return callback(null, {
    expression: originalDiceExpression,
    min,
    max,
    avg,
    rolls
  });
}

module.exports = {
  roll
};
