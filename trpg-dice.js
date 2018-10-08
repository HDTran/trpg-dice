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

/**
 * Error-first callback with object generated from the dice expression
 * @param {String} diceExpression - The dice-string to evaluate
 * @param {Object} options - Various flags to change rolling behavior
 * @param {Function} callback - The callback function to execute with error-first response 
 */
function roll(diceExpression = `2d6+6`, options, callback) {
  // TODO: Check diceExpression for only valid characters
  // TODO: Check diceExpression doesn't start with or ends with a weird operator
  // TODO: Parse dice expression for dice rolls and apply main logic accordingly, try/catch eval
  callback(null, {
    min: 0,
    max: 1,
    avg: 13,
    rolls: [{
      result: 14,
      resultString: `[4]+[4]+6`
    }]
  });
}

module.exports = {
  roll
}