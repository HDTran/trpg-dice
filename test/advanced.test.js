const dice = require('../trpg-dice');

test(`maximum of d% equal to 100`, (done) => {
  function callback(err, data) {
    expect(data.max).toBe(100);
    done();
  }

  dice.roll(`d%`, callback);
});

test(`roll result of d% between 1 and 100`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls[0].result).toBeGreaterThanOrEqual(1);
    expect(data.rolls[0].result).toBeLessThanOrEqual(100);
    done();
  }

  dice.roll(`d%`, callback);
});

test(`roll result of 4d%-4 between 0 and 396`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls[0].result).toBeGreaterThanOrEqual(0);
    expect(data.rolls[0].result).toBeLessThanOrEqual(396);
    done();
  }

  dice.roll(`4d%-4`, callback);
});

test(`maximum of 4dF equal to 4`, (done) => {
  function callback(err, data) {
    expect(data.max).toBe(4);
    done();
  }

  dice.roll(`4dF`, callback);
});

test(`minimum of 2dF equal to -2`, (done) => {
  function callback(err, data) {
    expect(data.min).toBe(-2);
    done();
  }

  dice.roll(`2dF`, callback);
});

test(`roll result of 4dF between -4 and 4`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls[0].result).toBeGreaterThanOrEqual(-4);
    expect(data.rolls[0].result).toBeLessThanOrEqual(4);
    done();
  }

  dice.roll(`4dF`, callback);
});

test(`roll result of 2dF+2 between 0 and 4`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls[0].result).toBeGreaterThanOrEqual(0);
    expect(data.rolls[0].result).toBeLessThanOrEqual(4);
    done();
  }

  dice.roll(`2dF+2`, callback);
});