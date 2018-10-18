const dice = require('../trpg-dice');

test(`roll result of 2d6 between 2 and 12`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.rolls[0].result).toBeGreaterThanOrEqual(2);
    expect(data.rolls[0].result).toBeLessThanOrEqual(12);
    done();
  }

  dice.roll(`2d6`, callback);
});

test(`minimum of 2d6+2 equal to 4`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.min).toBe(4);
    done();
  }

  dice.roll(`2d6+2`, callback);
});

test(`maximum of 3d10+4 equal to 34`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.max).toBe(34);
    done();
  }

  dice.roll(`3d10+4`, callback);
});

test(`average of d20 equal to 10.5`, (done) => {
  function callback(err, data) {
    expect(err).toBeNull();
    expect(data.avg).toBe(10.5);
    done();
  }

  dice.roll(`d20`, callback);
});

test(`maximum of d100 equal to 100`, (done) => {
  function callback(err, data) {
    expect(data.max).toBe(100);
    done();
  }

  dice.roll(`d100`, callback);
});

test(`illegal characters return error`, (done) => {
  function callback(err, data) {
    expect(err).not.toBeNull();
    done();
  }

  dice.roll(`d20asdf`, callback);
});