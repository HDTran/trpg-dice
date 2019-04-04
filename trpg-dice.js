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

const VALID_REGEX = /^[0-9d+-\/\(\)%f]*$/;
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

  /* calculate minimum value */
  let minResultString = diceExpression;
  for (let diceCode of diceCodes) {
    let numberValues = diceCode.split("d");
    let minValue = 1; // 1 die assumption on normal numbered dice

    if (numberValues[1] === "f") {
      minValue = -1; // fate/fudge dice
    }

    // multiple dice
    if (numberValues[0] !== "") {
      minValue = numberValues[0] * minValue;
    }
    minResultString = minResultString.replace(diceCode, `(${minValue})`);
  }

  try {
    min = eval(minResultString);
  } catch (err) {
    return callback(err, null);
  }

  /* calculate maximum value */
  let maxResultString = diceExpression;
  for (let diceCode of diceCodes) {
    let numberValues = diceCode.split("d");
    if (numberValues[0] === "") {
      numberValues[0] = 1;
    }

    let maxValue;

    if (numberValues[1] !== "f") {
      maxValue = Number(numberValues[0]) * Number(numberValues[1]);
    } else {
      maxValue = Number(numberValues[0]); // fate/fudge dice, number of dice * 1 essentially
    }

    maxResultString = maxResultString.replace(diceCode, `(${maxValue})`);
  }

  try {
    max = eval(maxResultString);
  } catch (err) {
    return callback(err, null);
  }

  /* calculate average value */
  let avgResultString = diceExpression;
  for (let diceCode of diceCodes) {
    let numberValues = diceCode.split("d");
    if (numberValues[0] === "") {
      numberValues[0] = 1;
    }

    let avgValue;
    if (numberValues[1] !== "f") {
      avgValue = Number(numberValues[0]) * ((Number(numberValues[1]) + 1) / 2); // this even works for d1
    } else {
      avgValue = 0; // fate/fudge dice, blank face
    }
    avgResultString = avgResultString.replace(diceCode, `(${avgValue})`);
  }

  try {
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

      let diceCodeResult = "";
      let diceCodeValue = 0;
      for (let j = 0; j < numberValues[0]; j++) {
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
