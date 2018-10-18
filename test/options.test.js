const dice = require('../trpg-dice');

test(`roll 3 option rolls 3 times`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls.length).toBe(3);
    done();
  }

  dice.roll(`2d6`, { roll: 3 }, callback);
});